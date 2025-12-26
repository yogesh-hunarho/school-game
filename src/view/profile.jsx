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
    Flame,
    ChevronLeft,
    CheckCircle2,
    Lock,
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
        <div className="min-h-full p-4 md:p-6 lg:p-8">
            <div className="max-w-5xl mx-auto space-y-6">
                {/* Back Button */}
                <Link
                    to="/"
                    onClick={playClick}
                    className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors group"
                >
                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Dashboard
                </Link>

                {/* Profile Header Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative rounded-2xl overflow-hidden"
                >
                    <div className="absolute inset-0 bg-linear-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-50" />
                    <div className="relative m-px bg-slate-950/95 rounded-2xl p-6 md:p-8">
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            {/* Avatar */}
                            <div className="relative">
                                <div className="absolute -inset-2 bg-linear-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full opacity-70" />
                                <div className="relative w-28 h-28 rounded-full bg-slate-900 border-4 border-cyan-500/50 flex items-center justify-center text-5xl">
                                    👤
                                </div>
                                {/* Level badge */}
                                <div className="absolute -bottom-1 -right-1 px-3 py-1 rounded-full bg-purple-500 text-white text-sm font-bold border-2 border-slate-950">
                                    LVL {level}
                                </div>
                            </div>

                            {/* Info */}
                            <div className="flex-1 text-center md:text-left">
                                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                    {player.name}
                                </h1>
                                <p className="text-slate-400 mb-4">Cyber Learner • Active Student</p>

                                {/* XP Progress */}
                                <div className="max-w-md">
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-yellow-400 font-bold flex items-center gap-1">
                                            <Star className="w-4 h-4 fill-yellow-400" />
                                            {player.totalXP.toLocaleString()} XP
                                        </span>
                                        <span className="text-slate-500">
                                            {Math.round(xpProgress.required - xpProgress.current)} XP to Level {level + 1}
                                        </span>
                                    </div>
                                    <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-linear-to-r from-yellow-400 via-orange-500 to-pink-500 rounded-full"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${Math.min(xpProgress.percentage, 100)}%` }}
                                            transition={{ duration: 1, ease: "easeOut" }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { icon: Star, label: "Total XP", value: player.totalXP, color: "yellow" },
                        { icon: Zap, label: "Level", value: level, color: "purple" },
                        { icon: Video, label: "Videos", value: totalVideosWatched, color: "cyan" },
                        { icon: BookOpen, label: "Quizzes", value: totalQuizzesCompleted, color: "green" },
                    ].map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className={cn(
                                "p-4 rounded-xl border bg-slate-900/50 backdrop-blur-sm",
                                stat.color === "yellow" && "border-yellow-500/30",
                                stat.color === "purple" && "border-purple-500/30",
                                stat.color === "cyan" && "border-cyan-500/30",
                                stat.color === "green" && "border-green-500/30"
                            )}
                        >
                            <stat.icon className={cn(
                                "w-6 h-6 mb-2",
                                stat.color === "yellow" && "text-yellow-400",
                                stat.color === "purple" && "text-purple-400",
                                stat.color === "cyan" && "text-cyan-400",
                                stat.color === "green" && "text-green-400"
                            )} />
                            <div className="text-2xl font-bold text-white">{stat.value}</div>
                            <div className="text-sm text-slate-400">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Course Progress */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="rounded-2xl border border-cyan-500/20 bg-slate-900/50 backdrop-blur-sm p-6"
                >
                    <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Target className="w-5 h-5 text-cyan-400" />
                        Course Progress
                    </h2>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="text-4xl font-bold text-cyan-400">
                            {completedModules}/{modules.length}
                        </div>
                        <div className="text-slate-400">
                            Modules<br />Completed
                        </div>
                        <div className="flex-1 h-4 bg-slate-800 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-linear-to-r from-cyan-500 to-purple-500 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${(completedModules / modules.length) * 100}%` }}
                                transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                            />
                        </div>
                    </div>

                    {/* Module List */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {modules.map((module) => {
                            const status = player.moduleStatus[module.id] || "locked";
                            const progress = getModuleProgress(module.id);
                            const isCompleted = status === "completed";
                            const isLocked = status === "locked";

                            return (
                                <div
                                    key={module.id}
                                    className={cn(
                                        "p-3 rounded-lg border flex items-center gap-3",
                                        isCompleted && "border-green-500/30 bg-green-500/5",
                                        isLocked && "border-slate-700 bg-slate-800/30 opacity-50",
                                        !isCompleted && !isLocked && "border-cyan-500/30 bg-cyan-500/5"
                                    )}
                                >
                                    <div className={cn(
                                        "w-10 h-10 rounded-lg flex items-center justify-center text-xl",
                                        isCompleted && "bg-green-500/20",
                                        isLocked && "bg-slate-700",
                                        !isCompleted && !isLocked && "bg-cyan-500/20"
                                    )}>
                                        {isLocked ? <Lock className="w-4 h-4 text-slate-500" /> : module.icon}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm font-medium text-white truncate">{module.name}</div>
                                        <div className="flex items-center gap-2">
                                            <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                                <div
                                                    className={cn(
                                                        "h-full rounded-full",
                                                        isCompleted ? "bg-green-500" : "bg-cyan-500"
                                                    )}
                                                    style={{ width: `${progress}%` }}
                                                />
                                            </div>
                                            <span className="text-xs text-slate-400">{progress}%</span>
                                        </div>
                                    </div>
                                    {isCompleted && <CheckCircle2 className="w-5 h-5 text-green-400" />}
                                </div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Badges Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="rounded-2xl border border-purple-500/20 bg-slate-900/50 backdrop-blur-sm p-6"
                >
                    <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <Award className="w-5 h-5 text-purple-400" />
                        Earned Badges
                        <span className="text-sm font-normal text-slate-400">
                            ({earnedBadges.length}/{badgeDefinitions.length})
                        </span>
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {badgeDefinitions.map((badge) => {
                            const isEarned = earnedBadges.includes(badge);
                            return (
                                <motion.div
                                    key={badge.id}
                                    whileHover={{ scale: isEarned ? 1.05 : 1 }}
                                    className={cn(
                                        "p-4 rounded-xl border text-center transition-all",
                                        isEarned
                                            ? "border-purple-500/50 bg-purple-500/10"
                                            : "border-slate-700 bg-slate-800/30 opacity-40 grayscale"
                                    )}
                                >
                                    <div className="text-4xl mb-2">{badge.icon}</div>
                                    <div className={cn(
                                        "text-sm font-medium mb-1",
                                        isEarned ? "text-white" : "text-slate-500"
                                    )}>
                                        {badge.name}
                                    </div>
                                    <div className="text-xs text-slate-500">{badge.description}</div>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
