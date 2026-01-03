import { useLMSStore } from "@/store/lms-store";
import { useSound } from "@/hook/useSound";
import { motion } from "framer-motion";
import {
    Zap,
    Award,
    Lock,
    User,
    Gamepad2,
    ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
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

const AchievementLayout = () => {
    const { player, getModuleProgress } = useLMSStore();
    const { playClick } = useSound();

    const earnedBadges = badgeDefinitions.filter((b) => b.requirement(player));
    return (
        <div className="min-h-full p-4 md:p-6 lg:p-8 relative mt-20">
            <div className="max-w-5xl mx-auto space-y-6 relative z-10">
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
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-sm font-bold text-yellow-400 flex items-center gap-2 uppercase tracking-widest">
                                    <Award className="w-4 h-4 animate-bounce" />
                                    OPERATIVE ACHIEVEMENTS
                                </h2>
                                <div className="text-[10px] text-slate-500 font-mono mt-1 tracking-wider">
                                    LEVEL_UNLOCKED: {earnedBadges.length} OF {badgeDefinitions.length}
                                </div>
                            </div>
                            <div className="text-right hidden sm:block">
                                <div className="text-[10px] text-yellow-400/60 uppercase tracking-widest font-mono">STATUS</div>
                                <div className="text-sm font-bold text-cyan-400 font-mono">AUTHORIZED</div>
                            </div>
                        </div>

                        <motion.div
                            className="grid grid-cols-2 md:grid-cols-4 gap-4"
                            initial="hidden"
                            animate="visible"
                            variants={{
                                visible: {
                                    transition: {
                                        staggerChildren: 0.1
                                    }
                                }
                            }}
                        >
                            {badgeDefinitions.map((badge) => {
                                const isEarned = earnedBadges.includes(badge);
                                return (
                                    <motion.div
                                        key={badge.id}
                                        variants={{
                                            hidden: { opacity: 0, scale: 0.9, y: 10 },
                                            visible: { opacity: 1, scale: 1, y: 0 }
                                        }}
                                        whileHover={{ y: -5 }}
                                        className={cn(
                                            "group relative p-5 h-32 flex items-center justify-center transition-all duration-300 overflow-hidden",
                                            isEarned
                                                ? "bg-yellow-400/5 border border-yellow-400/30 shadow-[0_0_15px_rgba(250,204,21,0.05)]"
                                                : "bg-slate-900/40 border border-slate-800 opacity-40 grayscale"
                                        )}
                                    >
                                        {/* Earned Glow Effect */}
                                        {isEarned && (
                                            <div className="absolute inset-0 bg-yellow-400/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                        )}

                                        {/* Corner Accents */}
                                        <div className={cn(
                                            "absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 transition-colors",
                                            isEarned ? "border-yellow-400" : "border-slate-700"
                                        )} />
                                        <div className={cn(
                                            "absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 transition-colors",
                                            isEarned ? "border-yellow-400" : "border-slate-700"
                                        )} />

                                        {/* Animated Content Wrapper */}
                                        <div className="relative flex items-center gap-4 w-full h-full">
                                            {/* Icon with Background */}
                                            <div className={cn(
                                                "w-16 h-16 flex items-center justify-center rounded-xl transition-all duration-500 ease-out z-10 shadow-lg",
                                                "absolute left-1/2 -translate-x-1/2 group-hover:left-0 group-hover:translate-x-0 group-hover:scale-110",
                                                isEarned
                                                    ? "bg-linear-to-br from-yellow-400/20 to-yellow-600/5 border border-yellow-400/30"
                                                    : "bg-slate-800/50 border border-slate-700/50",
                                                !isEarned && "opacity-50"
                                            )}>
                                                <div className="text-3xl filter drop-shadow-[0_0_8px_rgba(250,204,21,0.3)]">
                                                    {badge.icon}
                                                </div>

                                                <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-yellow-400/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-yellow-400/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>

                                            {/* Text Content */}
                                            <div className="flex-1 opacity-0 group-hover:opacity-100 translate-x-12 group-hover:translate-x-20 transition-all duration-500 ease-out">
                                                <div className={cn(
                                                    "text-[12px] font-black uppercase tracking-wider text-nowrap mb-1",
                                                    isEarned ? "text-yellow-400" : "text-slate-500"
                                                )}>
                                                    {badge.name}
                                                </div>
                                                <div className="text-[10px] text-slate-400 font-mono leading-tight max-w-[140px]">
                                                    {badge.description}
                                                </div>
                                            </div>

                                            {/* Initial Title (Centered, fades out on hover) */}
                                            <div className={cn(
                                                "absolute inset-x-0 -bottom-2 flex flex-col items-center transition-all duration-300 group-hover:opacity-0 group-hover:translate-y-[-10px]",
                                                isEarned ? "text-yellow-400" : "text-slate-500"
                                            )}>
                                                <div className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">
                                                    {badge.name}
                                                </div>
                                            </div>
                                        </div>

                                        {!isEarned && (
                                            <div className="absolute top-2 right-2">
                                                <Lock className="w-3 h-3 text-slate-700" />
                                            </div>
                                        )}

                                        {isEarned && (
                                            <div className="absolute top-2 right-2">
                                                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse shadow-[0_0_5px_rgba(250,204,21,1)]" />
                                            </div>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </div>

                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="relative"
                >
                    <div className="flex items-center gap-2 mb-4 px-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                        <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-[0.3em]">
                            NEURAL_RECONSTRUCTION_TASK
                        </h2>
                    </div>

                    <Link to="/puzzle" onClick={playClick} className="block group mb-20">
                        <div className="relative bg-slate-900/60 border border-cyan-400/20 p-8 overflow-hidden transition-all duration-500 hover:border-cyan-400/40 hover:bg-slate-900/80 group-hover:shadow-[0_0_40px_rgba(6,182,212,0.1)]">
                            {/* Decorative background elements */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-cyan-400/10 transition-colors" />
                            <div className="absolute -bottom-8 -left-8 w-32 h-32 border border-cyan-400/10 rounded-full group-hover:scale-150 transition-transform duration-700" />

                            <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                                <div className="relative">
                                    <div className="w-24 h-24 bg-slate-950 border border-cyan-400/30 flex items-center justify-center rounded-2xl overflow-hidden group-hover:border-cyan-400/60 transition-colors shadow-2xl">
                                        <img src="/assets/puzzle/cyberpunk-student.png" alt="Puzzle Preview" className="w-full h-full object-cover opacity-40 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-cyan-500/10 group-hover:bg-transparent transition-colors" />
                                        <Gamepad2 className="absolute w-8 h-8 text-white drop-shadow-lg group-hover:scale-0 transition-transform" />
                                    </div>
                                    <div className="absolute -top-2 -right-2 bg-yellow-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded flex items-center gap-1 shadow-lg">
                                        <Zap className="w-3 h-3 fill-slate-950" />
                                        +50 Coin
                                    </div>
                                </div>

                                <div className="flex-1 text-center md:text-left space-y-2">
                                    <h3 className="text-2xl font-black text-white uppercase tracking-tight group-hover:text-cyan-400 transition-colors">
                                        Neural Link <span className="text-cyan-400 group-hover:text-white transition-colors">Reconstruction</span>
                                    </h3>
                                    <p className="text-slate-400 text-sm font-mono max-w-lg leading-relaxed">
                                        Reassemble encrypted visual data shards to earn points and level up. Training protocol PX-303 is now authorized.
                                    </p>
                                </div>

                                <div className="w-full md:w-auto">
                                    <CyberpunkButton>
                                        <span className="tracking-widest uppercase text-sm">Play Puzzle</span>
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </CyberpunkButton>
                                </div>
                            </div>

                            {/* Corner bracket decorative elements */}
                            <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-cyan-400/30 group-hover:border-cyan-400 transition-colors" />
                            <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-cyan-400/30 group-hover:border-cyan-400 transition-colors" />
                        </div>
                    </Link>
                </motion.div>
            </div>

        </div>
    );
};

export default AchievementLayout;