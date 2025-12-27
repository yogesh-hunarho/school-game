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
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

// Badge definitions
const badgeDefinitions = [
    { id: "first-steps", name: "First Steps", icon: "🚀", description: "Complete your first video", requirement: (p) => p.totalXP > 0 },
    { id: "quick-learner", name: "Quick Learner", icon: "⚡", description: "Complete 5 videos", requirement: (p) => Object.values(p.progress).reduce((acc, m) => acc + m.watchedVideos.length, 0) >= 5 },
    { id: "quiz-master", name: "Quiz Master", icon: "🧠", description: "Complete 3 quizzes", requirement: (p) => Object.values(p.progress).reduce((acc, m) => acc + m.completedQuizzes.length, 0) >= 3 },
    { id: "module-complete", name: "Module Champion", icon: "🏆", description: "Complete a full module", requirement: (p) => Object.values(p.moduleStatus).filter(s => s === "completed").length >= 1 },
    { id: "xp-hunter", name: "XP Hunter", icon: "💎", description: "Earn 100 XP", requirement: (p) => p.totalXP >= 100 },
    { id: "xp-master", name: "XP Master", icon: "👑", description: "Earn 500 XP", requirement: (p) => p.totalXP >= 500 },
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
        <div className="min-h-full p-4 md:p-6 lg:p-8 relative">
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
                    RETURN TO DASHBOARD
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
                                    LVL {level}
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

                                {/* XP Progress */}
                                <div className="max-w-md">
                                    <div className="flex justify-between text-[11px] mb-2 font-mono uppercase tracking-wider">
                                        <span className="text-yellow-400 font-bold flex items-center gap-1">
                                            <Star className="w-3.5 h-3.5 fill-yellow-400" />
                                            {player.totalXP.toLocaleString()} XP
                                        </span>
                                        <span className="text-slate-500">
                                            {Math.round(xpProgress.required - xpProgress.current)} XP TO LVL {level + 1}
                                        </span>
                                    </div>
                                    <div className="relative h-2 bg-slate-800 overflow-hidden">
                                        <div className="absolute inset-0 flex gap-px">
                                            {Array.from({ length: 20 }).map((_, i) => (
                                                <div key={i} className="flex-1 bg-slate-700/30" />
                                            ))}
                                        </div>
                                        <motion.div
                                            className="absolute top-0 left-0 h-full bg-yellow-400"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${Math.min(xpProgress.percentage, 100)}%` }}
                                            transition={{ duration: 1, ease: "easeOut" }}
                                        />
                                        <motion.div
                                            className="absolute top-0 left-0 h-full bg-yellow-400/50 blur-sm"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${Math.min(xpProgress.percentage, 100)}%` }}
                                            transition={{ duration: 1, ease: "easeOut" }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom accent */}
                    <div className="absolute bottom-0 left-8 right-8 h-0.5 bg-cyan-400/30" />
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                        { icon: Star, label: "TOTAL XP", value: player.totalXP, color: "yellow" },
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

                {/* Course Progress */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="relative bg-slate-950/95 border border-cyan-400/20"
                >
                    {/* Corner brackets */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />

                    <div className="p-6">
                        <h2 className="text-sm font-bold text-cyan-400 mb-4 flex items-center gap-2 uppercase tracking-widest">
                            <Target className="w-4 h-4" />
                            MODULE PROGRESS
                        </h2>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="relative">
                                <div className="text-4xl font-bold text-yellow-400">
                                    {completedModules}
                                </div>
                                <div className="text-[10px] text-slate-500 font-mono">/{modules.length}</div>
                            </div>
                            <div className="flex-1">
                                <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1 font-mono">
                                    COMPLETION RATE
                                </div>
                                <div className="relative h-3 bg-slate-800 overflow-hidden">
                                    <div className="absolute inset-0 flex gap-px">
                                        {Array.from({ length: modules.length }).map((_, i) => (
                                            <div key={i} className="flex-1 bg-slate-700/30" />
                                        ))}
                                    </div>
                                    <motion.div
                                        className="absolute top-0 left-0 h-full bg-cyan-400"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(completedModules / modules.length) * 100}%` }}
                                        transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Module List */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                            {modules.map((module) => {
                                const status = player.moduleStatus[module.id] || "locked";
                                const progress = getModuleProgress(module.id);
                                const isCompleted = status === "completed";
                                const isLocked = status === "locked";

                                return (
                                    <div
                                        key={module.id}
                                        className={cn(
                                            "relative p-3 flex items-center gap-3 transition-colors",
                                            isCompleted && "bg-emerald-400/5 border border-emerald-400/30",
                                            isLocked && "bg-slate-900/50 border border-slate-700 opacity-50",
                                            !isCompleted && !isLocked && "bg-cyan-400/5 border border-cyan-400/30"
                                        )}
                                    >
                                        <div className={cn(
                                            "absolute top-0 left-0 w-1.5 h-1.5 border-t border-l",
                                            isCompleted ? "border-emerald-400" : isLocked ? "border-slate-600" : "border-cyan-400"
                                        )} />
                                        <div className={cn(
                                            "absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r",
                                            isCompleted ? "border-emerald-400" : isLocked ? "border-slate-600" : "border-cyan-400"
                                        )} />

                                        <div className={cn(
                                            "w-8 h-8 flex items-center justify-center text-lg",
                                            isCompleted && "bg-emerald-400/20",
                                            isLocked && "bg-slate-800",
                                            !isCompleted && !isLocked && "bg-cyan-400/20"
                                        )}>
                                            {isLocked ? <Lock className="w-3.5 h-3.5 text-slate-500" /> : module.icon}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-xs font-medium text-cyan-50 truncate uppercase tracking-wide">{module.name}</div>
                                            <div className="flex items-center gap-2 mt-1">
                                                <div className="flex-1 h-1 bg-slate-700 overflow-hidden">
                                                    <div
                                                        className={cn(
                                                            "h-full",
                                                            isCompleted ? "bg-emerald-400" : "bg-cyan-400"
                                                        )}
                                                        style={{ width: `${progress}%` }}
                                                    />
                                                </div>
                                                <span className="text-[10px] text-slate-500 font-mono">{progress}%</span>
                                            </div>
                                        </div>
                                        {isCompleted && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>

                {/* Badges Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="relative bg-slate-950/95 border border-yellow-400/20"
                >
                    {/* Corner brackets */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-yellow-400" />
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-yellow-400" />
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-yellow-400" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-yellow-400" />

                    <div className="p-6">
                        <h2 className="text-sm font-bold text-yellow-400 mb-4 flex items-center gap-2 uppercase tracking-widest">
                            <Award className="w-4 h-4" />
                            ACHIEVEMENTS
                            <span className="text-[10px] font-normal text-slate-500 font-mono">
                                ({earnedBadges.length}/{badgeDefinitions.length})
                            </span>
                        </h2>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {badgeDefinitions.map((badge) => {
                                const isEarned = earnedBadges.includes(badge);
                                return (
                                    <motion.div
                                        key={badge.id}
                                        whileHover={{ scale: isEarned ? 1.02 : 1 }}
                                        className={cn(
                                            "relative p-4 text-center transition-all",
                                            isEarned
                                                ? "bg-yellow-400/5 border border-yellow-400/30"
                                                : "bg-slate-900/50 border border-slate-700 opacity-40 grayscale"
                                        )}
                                    >
                                        <div className={cn(
                                            "absolute top-0 left-0 w-1.5 h-1.5 border-t border-l",
                                            isEarned ? "border-yellow-400" : "border-slate-600"
                                        )} />
                                        <div className={cn(
                                            "absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r",
                                            isEarned ? "border-yellow-400" : "border-slate-600"
                                        )} />

                                        <div className="text-3xl mb-2">{badge.icon}</div>
                                        <div className={cn(
                                            "text-[11px] font-bold mb-1 uppercase tracking-wide",
                                            isEarned ? "text-cyan-50" : "text-slate-500"
                                        )}>
                                            {badge.name}
                                        </div>
                                        <div className="text-[10px] text-slate-500 font-mono">{badge.description}</div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
