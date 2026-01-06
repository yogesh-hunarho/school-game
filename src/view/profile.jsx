import { useLMSStore } from "@/store/lms-store";
import { modules } from "@/store/level-canvas-config";
import { calculateLevel, getXPToNextLevel } from "@/components/Header";
import { useSound } from "@/hook/useSound";
import { motion } from "framer-motion";
import {
    Star,
    Zap,
    Trophy,
    BookOpen,
    Video,
    Award,
    Target,
    ChevronLeft,
    CheckCircle2,
    Lock,
    User,
    Gamepad2,
    ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import CyberpunkProgressBar from "@/components/ui/cyber-component/cyberpunk-progress-bar";
import PuzzleGame from "@/components/PuzzleGame";
import CyberpunkButton from "@/components/ui/cyber-button";

// Badge definitions
const badgeDefinitions = [
    { id: "first-steps", name: "First Steps", icon: "🚀", description: "Complete your first video", requirement: (p) => p.totalXP > 0 },
    { id: "quick-learner", name: "Quick Learner", icon: "⚡", description: "Complete 5 videos", requirement: (p) => Object.values(p.progress).reduce((acc, m) => acc + m.watchedVideos.length, 0) >= 5 },
    { id: "quiz-master", name: "Quiz Master", icon: "🧠", description: "Complete 3 quizzes", requirement: (p) => Object.values(p.progress).reduce((acc, m) => acc + m.completedQuizzes.length, 0) >= 3 },
    { id: "module-complete", name: "Module Champion", icon: "🏆", description: "Complete a full module", requirement: (p) => Object.values(p.moduleStatus).filter(s => s === "completed").length >= 1 },
    { id: "xp-hunter", name: "Coin Hunter", icon: "💎", description: "Earn 100 Coin", requirement: (p) => p.totalXP >= 100 },
    { id: "xp-master", name: "Coin Master", icon: "👑", description: "Earn 500 Coin", requirement: (p) => p.totalXP >= 500 },
    { id: "dedicated", name: "Dedicated Learner", icon: "📚", description: "Complete 2 modules", requirement: (p) => Object.values(p.moduleStatus).filter(s => s === "completed").length >= 2 },
    { id: "pro-gamer", name: "Pro Gamer", icon: "🎮", description: "Complete 5 modules", requirement: (p) => Object.values(p.moduleStatus).filter(s => s === "completed").length >= 5 },
];

export default function ProfilePage() {
    const { player, getModuleProgress } = useLMSStore();
    const { playClick } = useSound();

    const level = calculateLevel(player.totalXP);
    const xpProgress = getXPToNextLevel(player.totalXP);

    // Calculate stats
    const totalVideosWatched = Object.values(player.progress).reduce(
        (acc, m) => acc + m.watchedVideos.length,
        0
    );
    const totalQuizzesCompleted = Object.values(player.progress).reduce(
        (acc, m) => acc + m.completedQuizzes.length,
        0
    );
    const completedModules = Object.values(player.moduleStatus).filter(
        (s) => s === "completed"
    ).length;

    // Get earned badges
    const earnedBadges = badgeDefinitions.filter((b) => b.requirement(player));

    return (
        <div className="min-h-full p-4 md:p-6 lg:p-8 relative mt-20">
            {/* Background scanlines */}
            <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.015] bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,255,255,0.1)_2px,rgba(0,255,255,0.1)_4px)]" />

            <div className="max-w-5xl mx-auto space-y-6 relative z-10">
                {/* Back Button */}
                <Link
                    to="/"
                    onClick={playClick}
                    className="inline-flex items-center gap-2 text-[11px] text-cyan-400 hover:text-yellow-400 transition-colors group uppercase tracking-widest font-bold"
                >
                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    RETURN TO MISSION
                </Link>

                {/* Profile Header Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative bg-slate-950/95"
                >
                    {/* Main border */}
                    <div className="absolute inset-0 border border-cyan-400/30" />

                    {/* Corner brackets */}
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-400" />
                    <div className="absolute top-0 left-6 w-4 h-[2px] bg-cyan-400" />
                    <div className="absolute top-6 left-0 w-[2px] h-4 bg-cyan-400" />

                    <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-cyan-400" />
                    <div className="absolute top-0 right-6 w-4 h-[2px] bg-cyan-400" />
                    <div className="absolute top-6 right-0 w-[2px] h-4 bg-cyan-400" />

                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-cyan-400" />
                    <div className="absolute bottom-0 left-6 w-4 h-[2px] bg-cyan-400" />
                    <div className="absolute bottom-6 left-0 w-[2px] h-4 bg-cyan-400" />

                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-400" />
                    <div className="absolute bottom-0 right-6 w-4 h-[2px] bg-cyan-400" />
                    <div className="absolute bottom-6 right-0 w-[2px] h-4 bg-cyan-400" />

                    <div className="relative z-10 p-6 md:p-8">
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            {/* Avatar */}
                            <div className="relative">
                                <div className="relative w-24 h-24 bg-slate-900 border border-cyan-400/50 flex items-center justify-center">
                                    <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
                                    <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />
                                    <User className="w-12 h-12 text-cyan-400/50" />
                                </div>
                                {/* Level badge */}
                                <div className="absolute -bottom-2 -right-2 px-3 py-1 bg-yellow-400 text-slate-900 text-xs font-bold uppercase tracking-wider">
                                    MISSION {level}
                                </div>
                            </div>

                            {/* Info */}
                            <div className="flex-1 text-center md:text-left">
                                <h1 className="text-2xl md:text-3xl font-bold text-cyan-50 mb-1 uppercase tracking-wide">
                                    {player.name}
                                </h1>
                                <p className="text-[11px] text-slate-500 mb-4 uppercase tracking-widest font-mono">
                                    CYBER LEARNER • ACTIVE OPERATIVE
                                </p>

                                {/* Coin Progress */}
                                <div className="flex justify-between text-[11px] font-mono uppercase tracking-wider">
                                    <span className="text-yellow-400 font-bold flex items-center gap-1">
                                        <Star className="w-3.5 h-3.5 fill-yellow-400" />
                                        {player.totalXP.toLocaleString()} Coin
                                    </span>
                                    <span className="text-slate-500">
                                        {Math.round(xpProgress.required - xpProgress.current)} Coin TO MISSION {level + 1}
                                    </span>
                                </div>
                                <CyberpunkProgressBar
                                    progress={xpProgress.percentage}
                                    color={Math.min(xpProgress.percentage, 100) === 100 ? "green" : xpProgress.percentage > 0 ? "cyan" : "orange"}
                                    hideLabel={true}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Bottom accent */}
                    <div className="absolute bottom-0 left-8 right-8 h-0.5 bg-cyan-400/30" />
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                        { icon: Star, label: "TOTAL Coin", value: player.totalXP, color: "yellow" },
                        { icon: Zap, label: "LEVEL", value: level, color: "cyan" },
                        { icon: Video, label: "STREAMS", value: totalVideosWatched, color: "cyan" },
                        { icon: BookOpen, label: "TESTS", value: totalQuizzesCompleted, color: "emerald" },
                    ].map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="relative p-4 bg-slate-950/95 border border-cyan-400/20"
                        >
                            {/* Corner accents */}
                            <div className={cn(
                                "absolute top-0 left-0 w-2 h-2 border-t border-l",
                                stat.color === "yellow" && "border-yellow-400",
                                stat.color === "cyan" && "border-cyan-400",
                                stat.color === "emerald" && "border-emerald-400"
                            )} />
                            <div className={cn(
                                "absolute bottom-0 right-0 w-2 h-2 border-b border-r",
                                stat.color === "yellow" && "border-yellow-400",
                                stat.color === "cyan" && "border-cyan-400",
                                stat.color === "emerald" && "border-emerald-400"
                            )} />

                            <stat.icon className={cn(
                                "w-5 h-5 mb-2",
                                stat.color === "yellow" && "text-yellow-400",
                                stat.color === "cyan" && "text-cyan-400",
                                stat.color === "emerald" && "text-emerald-400"
                            )} />
                            <div className="text-2xl font-bold text-cyan-50">{stat.value}</div>
                            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                {/* <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="relative bg-slate-950/95 border border-cyan-400/20"
                >
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />

                    <div className="p-6">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                            <div>
                                <h2 className="text-sm font-bold text-cyan-400 mb-6 flex items-center gap-2 uppercase tracking-widest">
                                    <Target className="w-4 h-4 animate-pulse" />
                                    MODULE PROGRESSION STATUS
                                </h2>
                                <div className="flex items-center gap-6">
                                    <div className="relative group">
                                        <div className="absolute -inset-2 bg-yellow-400/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <div className="relative text-5xl font-black text-yellow-400 leading-none">
                                            {completedModules}
                                            <span className="text-xs text-slate-500 font-sans absolute -top-1 -right-4">/{modules.length}</span>
                                        </div>
                                    </div>
                                    <div className="h-10 w-px bg-slate-800 hidden md:block" />
                                    <div>
                                        <div className="text-[10px] text-slate-500 uppercase tracking-[0.2em] mb-1 font-mono">
                                            SYNERGY_COEFFICIENT
                                        </div>
                                        <div className="text-xl font-mono text-cyan-400">
                                            {Math.round((completedModules / modules.length) * 100)}%
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 max-w-md">
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-[10px] text-cyan-400/60 uppercase tracking-widest font-mono">SYSTEM_COMPLETION</span>
                                    <span className="text-[10px] text-slate-500 font-mono">PHASE_0{completedModules + 1}</span>
                                </div>
                                <CyberpunkProgressBar
                                    progress={(completedModules / modules.length) * 100}
                                    color={Math.min((completedModules / modules.length) * 100, 100) === 100 ? "green" : (completedModules / modules.length) * 100 > 0 ? "cyan" : "orange"}
                                    hideLabel={true}
                                />
                            </div>
                        </div>

                        <div className="relative">
                            <motion.div
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
                                initial="hidden"
                                animate="visible"
                                variants={{
                                    visible: {
                                        transition: {
                                            staggerChildren: 0.05
                                        }
                                    }
                                }}
                            >
                                {modules.map((module) => {
                                    const status = player.moduleStatus[module.id] || "locked";
                                    const progress = getModuleProgress(module.id);
                                    const isCompleted = status === "completed";
                                    const isLocked = status === "locked";

                                    return (
                                        <motion.div
                                            key={module.id}
                                            variants={{
                                                hidden: { opacity: 0, x: -10 },
                                                visible: { opacity: 1, x: 0 }
                                            }}
                                            whileHover={{ scale: isLocked ? 1 : 1.02, x: isLocked ? 0 : 4 }}
                                            onClick={() => !isLocked && playClick()}
                                            className={cn(
                                                "group relative p-4 flex items-center gap-4 transition-all duration-300",
                                                isCompleted && "bg-emerald-400/5 border border-emerald-400/30",
                                                isLocked && "bg-slate-900/40 border border-slate-800 opacity-60",
                                                !isCompleted && !isLocked && "bg-cyan-400/5 border border-cyan-400/30 hover:bg-cyan-400/10"
                                            )}
                                        >
                                            <div className={cn(
                                                "absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 opacity-0 group-hover:opacity-100 transition-opacity",
                                                isCompleted ? "border-emerald-400" : "border-cyan-400"
                                            )} />
                                            <div className={cn(
                                                "absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 opacity-0 group-hover:opacity-100 transition-opacity",
                                                isCompleted ? "border-emerald-400" : "border-cyan-400"
                                            )} />

                                            <div className={cn(
                                                "relative w-10 h-10 flex items-center justify-center text-xl transition-all duration-300",
                                                isCompleted && "bg-emerald-400/20 text-emerald-400",
                                                isLocked && "bg-slate-800 text-slate-600",
                                                !isCompleted && !isLocked && "bg-cyan-400/20 text-cyan-400 group-hover:scale-110"
                                            )}>
                                                {isLocked ? <Lock className="w-4 h-4" /> : module.icon}
                                                {!isLocked && !isCompleted && (
                                                    <div className="absolute -inset-1 border border-cyan-400/30 animate-pulse" />
                                                )}
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className={cn(
                                                    "text-[11px] font-bold truncate uppercase tracking-wider mb-1",
                                                    isLocked ? "text-slate-500" : "text-cyan-50"
                                                )}>
                                                    {module.name}
                                                </div>

                                                <div className="space-y-1">
                                                    <div className="h-1 bg-slate-800/50 rounded-full overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${progress}%` }}
                                                            className={cn(
                                                                "h-full relative",
                                                                isCompleted ? "bg-emerald-400" : "bg-cyan-400"
                                                            )}
                                                        >
                                                            {!isLocked && !isCompleted && (
                                                                <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.4)_50%,transparent_100%)] animate-[scan_2s_linear_infinite] w-8" />
                                                            )}
                                                        </motion.div>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-[9px] text-slate-500 font-mono uppercase tracking-tighter">
                                                            {isLocked ? "ACCESS_RESTRICTED" : isCompleted ? "VERIFIED" : "IN_PROGRESS"}
                                                        </span>
                                                        <span className="text-[9px] text-slate-400 font-mono">{progress}%</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {isCompleted && (
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    className="bg-emerald-400/20 p-1 rounded-full"
                                                >
                                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                                </motion.div>
                                            )}
                                        </motion.div>
                                    );
                                })}
                            </motion.div>
                        </div>
                    </div>
                </motion.div> */}


            </div>
        </div>
    );
}
