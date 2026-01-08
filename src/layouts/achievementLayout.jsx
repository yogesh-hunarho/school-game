// import { useLMSStore } from "@/store/lms-store";
// import { useSound } from "@/hook/useSound";
// import { motion } from "framer-motion";
// import {
//     Zap,
//     Award,
//     Lock,
//     User,
//     Gamepad2,
//     ArrowRight,
// } from "lucide-react";
// import { Link } from "react-router-dom";
// import { cn } from "@/lib/utils";
// import CyberpunkButton from "@/components/ui/cyber-button";

// // Badge definitions
// const badgeDefinitions = [
//     { id: "first-steps", name: "First Steps", icon: "🚀", description: "Complete your first video", requirement: (p) => p.totalXP > 0 },
//     { id: "quick-learner", name: "Quick Learner", icon: "⚡", description: "Complete 5 videos", requirement: (p) => Object.values(p.progress).reduce((acc, m) => acc + m.watchedVideos.length, 0) >= 5 },
//     { id: "quiz-master", name: "Quiz Master", icon: "🧠", description: "Complete 3 quizzes", requirement: (p) => Object.values(p.progress).reduce((acc, m) => acc + m.completedQuizzes.length, 0) >= 3 },
//     { id: "module-complete", name: "Module Champion", icon: "🏆", description: "Complete a full module", requirement: (p) => Object.values(p.moduleStatus).filter(s => s === "completed").length >= 1 },
//     { id: "xp-hunter", name: "Coin Hunter", icon: "💎", description: "Earn 100 Coin", requirement: (p) => p.totalXP >= 100 },
//     { id: "xp-master", name: "Coin Master", icon: "👑", description: "Earn 500 Coin", requirement: (p) => p.totalXP >= 500 },
//     { id: "dedicated", name: "Dedicated Learner", icon: "📚", description: "Complete 2 modules", requirement: (p) => Object.values(p.moduleStatus).filter(s => s === "completed").length >= 2 },
//     { id: "pro-gamer", name: "Pro Gamer", icon: "🎮", description: "Complete 5 modules", requirement: (p) => Object.values(p.moduleStatus).filter(s => s === "completed").length >= 5 },
// ];

// const AchievementLayout = () => {
//     const { player, getModuleProgress } = useLMSStore();
//     const { playClick } = useSound();

//     const earnedBadges = badgeDefinitions.filter((b) => b.requirement(player));
//     return (
//         <div className="min-h-full p-4 md:p-6 lg:p-8 relative mt-20">
//             <div className="max-w-5xl mx-auto space-y-6 relative z-10">
//                 <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.4 }}
//                     className="relative bg-slate-950/95 border border-yellow-400/20"
//                 >
//                     {/* Corner brackets */}
//                     <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-yellow-400" />
//                     <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-yellow-400" />
//                     <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-yellow-400" />
//                     <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-yellow-400" />

//                     <div className="p-6">
//                         <div className="flex items-center justify-between mb-8">
//                             <div>
//                                 <h2 className="text-sm font-bold text-yellow-400 flex items-center gap-2 uppercase tracking-widest">
//                                     <Award className="w-4 h-4 animate-bounce" />
//                                     OPERATIVE ACHIEVEMENTS
//                                 </h2>
//                                 <div className="text-[10px] text-slate-500 font-mono mt-1 tracking-wider">
//                                     LEVEL_UNLOCKED: {earnedBadges.length} OF {badgeDefinitions.length}
//                                 </div>
//                             </div>
//                             <div className="text-right hidden sm:block">
//                                 <div className="text-[10px] text-yellow-400/60 uppercase tracking-widest font-mono">STATUS</div>
//                                 <div className="text-sm font-bold text-cyan-400 font-mono">AUTHORIZED</div>
//                             </div>
//                         </div>

//                         <motion.div
//                             className="grid grid-cols-2 md:grid-cols-4 gap-4"
//                             initial="hidden"
//                             animate="visible"
//                             variants={{
//                                 visible: {
//                                     transition: {
//                                         staggerChildren: 0.1
//                                     }
//                                 }
//                             }}
//                         >
//                             {badgeDefinitions.map((badge) => {
//                                 const isEarned = earnedBadges.includes(badge);
//                                 return (
//                                     <motion.div
//                                         key={badge.id}
//                                         variants={{
//                                             hidden: { opacity: 0, scale: 0.9, y: 10 },
//                                             visible: { opacity: 1, scale: 1, y: 0 }
//                                         }}
//                                         whileHover={{ y: -5 }}
//                                         className={cn(
//                                             "group relative p-5 h-32 flex items-center justify-center transition-all duration-300 overflow-hidden",
//                                             isEarned
//                                                 ? "bg-yellow-400/5 border border-yellow-400/30 shadow-[0_0_15px_rgba(250,204,21,0.05)]"
//                                                 : "bg-slate-900/40 border border-slate-800 opacity-40 grayscale"
//                                         )}
//                                     >
//                                         {/* Earned Glow Effect */}
//                                         {isEarned && (
//                                             <div className="absolute inset-0 bg-yellow-400/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
//                                         )}

//                                         {/* Corner Accents */}
//                                         <div className={cn(
//                                             "absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 transition-colors",
//                                             isEarned ? "border-yellow-400" : "border-slate-700"
//                                         )} />
//                                         <div className={cn(
//                                             "absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 transition-colors",
//                                             isEarned ? "border-yellow-400" : "border-slate-700"
//                                         )} />

//                                         {/* Animated Content Wrapper */}
//                                         <div className="relative flex items-center gap-4 w-full h-full">
//                                             {/* Icon with Background */}
//                                             <div className={cn(
//                                                 "w-16 h-16 flex items-center justify-center rounded-xl transition-all duration-500 ease-out z-10 shadow-lg",
//                                                 "absolute left-1/2 -translate-x-1/2 group-hover:left-0 group-hover:translate-x-0 group-hover:scale-110",
//                                                 isEarned
//                                                     ? "bg-linear-to-br from-yellow-400/20 to-yellow-600/5 border border-yellow-400/30"
//                                                     : "bg-slate-800/50 border border-slate-700/50",
//                                                 !isEarned && "opacity-50"
//                                             )}>
//                                                 <div className="text-3xl filter drop-shadow-[0_0_8px_rgba(250,204,21,0.3)]">
//                                                     {badge.icon}
//                                                 </div>

//                                                 <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-yellow-400/50 opacity-0 group-hover:opacity-100 transition-opacity" />
//                                                 <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-yellow-400/50 opacity-0 group-hover:opacity-100 transition-opacity" />
//                                             </div>

//                                             {/* Text Content */}
//                                             <div className="flex-1 opacity-0 group-hover:opacity-100 translate-x-12 group-hover:translate-x-20 transition-all duration-500 ease-out">
//                                                 <div className={cn(
//                                                     "text-[12px] font-black uppercase tracking-wider text-nowrap mb-1",
//                                                     isEarned ? "text-yellow-400" : "text-slate-500"
//                                                 )}>
//                                                     {badge.name}
//                                                 </div>
//                                                 <div className="text-[10px] text-slate-400 font-mono leading-tight max-w-[140px]">
//                                                     {badge.description}
//                                                 </div>
//                                             </div>

//                                             {/* Initial Title (Centered, fades out on hover) */}
//                                             <div className={cn(
//                                                 "absolute inset-x-0 -bottom-2 flex flex-col items-center transition-all duration-300 group-hover:opacity-0 group-hover:translate-y-[-10px]",
//                                                 isEarned ? "text-yellow-400" : "text-slate-500"
//                                             )}>
//                                                 <div className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">
//                                                     {badge.name}
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         {!isEarned && (
//                                             <div className="absolute top-2 right-2">
//                                                 <Lock className="w-3 h-3 text-slate-700" />
//                                             </div>
//                                         )}

//                                         {isEarned && (
//                                             <div className="absolute top-2 right-2">
//                                                 <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse shadow-[0_0_5px_rgba(250,204,21,1)]" />
//                                             </div>
//                                         )}
//                                     </motion.div>
//                                 );
//                             })}
//                         </motion.div>
//                     </div>

//                 </motion.div>

//                 <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.5 }}
//                     className="relative"
//                 >
//                     <div className="flex items-center gap-2 mb-4 px-2">
//                         <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
//                         <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-[0.3em]">
//                             NEURAL_RECONSTRUCTION_TASK
//                         </h2>
//                     </div>

//                     <Link to="/puzzle" onClick={playClick} className="block group mb-20">
//                         <div className="relative bg-slate-900/60 border border-cyan-400/20 p-8 overflow-hidden transition-all duration-500 hover:border-cyan-400/40 hover:bg-slate-900/80 group-hover:shadow-[0_0_40px_rgba(6,182,212,0.1)]">
//                             {/* Decorative background elements */}
//                             <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-cyan-400/10 transition-colors" />
//                             <div className="absolute -bottom-8 -left-8 w-32 h-32 border border-cyan-400/10 rounded-full group-hover:scale-150 transition-transform duration-700" />

//                             <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
//                                 <div className="relative">
//                                     <div className="w-24 h-24 bg-slate-950 border border-cyan-400/30 flex items-center justify-center rounded-2xl overflow-hidden group-hover:border-cyan-400/60 transition-colors shadow-2xl">
//                                         <img src="/assets/puzzle/cyberpunk-student.png" alt="Puzzle Preview" className="w-full h-full object-cover opacity-40 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110" />
//                                         <div className="absolute inset-0 bg-cyan-500/10 group-hover:bg-transparent transition-colors" />
//                                         <Gamepad2 className="absolute w-8 h-8 text-white drop-shadow-lg group-hover:scale-0 transition-transform" />
//                                     </div>
//                                     <div className="absolute -top-2 -right-2 bg-yellow-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded flex items-center gap-1 shadow-lg">
//                                         <Zap className="w-3 h-3 fill-slate-950" />
//                                         +50 Coin
//                                     </div>
//                                 </div>

//                                 <div className="flex-1 text-center md:text-left space-y-2">
//                                     <h3 className="text-2xl font-black text-white uppercase tracking-tight group-hover:text-cyan-400 transition-colors">
//                                         Neural Link <span className="text-cyan-400 group-hover:text-white transition-colors">Reconstruction</span>
//                                     </h3>
//                                     <p className="text-slate-400 text-sm font-mono max-w-lg leading-relaxed">
//                                         Reassemble encrypted visual data shards to earn points and level up. Training protocol PX-303 is now authorized.
//                                     </p>
//                                 </div>

//                                 <div className="w-full md:w-auto">
//                                     <CyberpunkButton>
//                                         <span className="tracking-widest uppercase text-sm">Play Puzzle</span>
//                                         <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
//                                     </CyberpunkButton>
//                                 </div>
//                             </div>

//                             {/* Corner bracket decorative elements */}
//                             <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-cyan-400/30 group-hover:border-cyan-400 transition-colors" />
//                             <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-cyan-400/30 group-hover:border-cyan-400 transition-colors" />
//                         </div>
//                     </Link>
//                 </motion.div>
//             </div>

//         </div>
//     );
// };

// export default AchievementLayout;





import { motion } from "framer-motion"
import { ChevronLeft } from "lucide-react"
import { Link } from "react-router-dom"
import { Video, Target, Puzzle, Trophy, Gamepad2, Zap, Sparkles, Lock, CheckCircle, Circle, User, Coins, } from "lucide-react"
import { cn } from "@/lib/utils"

const mockBadges = [
    { id: "first-mission", name: "First Step", icon: "🚀", description: "Complete your first video", unlocked: true },
    { id: "quiz-ace", name: "Quiz Ace", icon: "🧠", description: "Score 100% on 3 quizzes", unlocked: true },
    { id: "coin-hunter", name: "Coin Hunter", icon: "💰", description: "Collect 200 Coins", unlocked: true },
    { id: "puzzle-master", name: "Puzzle Master", icon: "🧩", description: "Collect 10 puzzle pieces", unlocked: true },
    { id: "video-binge", name: "Video Binge", icon: "🎬", description: "Watch 20 videos", unlocked: false },
    { id: "legend", name: "Legend", icon: "⭐", description: "Reach Level 10", unlocked: false },
]

const mockMissions = [
    { id: 1, name: "JavaScript Basics", status: "completed", progress: 100 },
    { id: 2, name: "Web Design", status: "completed", progress: 100 },
    { id: 3, name: "React Fundamentals", status: "current", progress: 65 },
    { id: 4, name: "Advanced Styling", status: "locked" },
    { id: 5, name: "API Integration", status: "locked" },
    { id: 6, name: "Final Project", status: "locked" },
]

function StatsGrid({ stats }) {
    const colorMap = {
        cyan: "from-[#00D9FF]/10 to-[#00D9FF]/5 border-[#00D9FF]/40 hover:from-[#00D9FF]/20",
        pink: "from-[#FF006E]/10 to-[#FF006E]/5 border-[#FF006E]/40 hover:from-[#FF006E]/20",
        purple: "from-[#7C3AED]/10 to-[#7C3AED]/5 border-[#7C3AED]/40 hover:from-[#7C3AED]/20",
        yellow: "from-[#FFD700]/10 to-[#FFD700]/5 border-[#FFD700]/40 hover:from-[#FFD700]/20",
    }

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => {
                const colorKey = stat.color.split("-")[1]
                const bgGradient = colorMap[colorKey] || colorMap.cyan

                return (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className={cn(
                            "relative group cyber-card backdrop-blur",
                            "bg-linear-to-br border transition-all duration-300",
                            bgGradient,
                        )}
                    >
                        {/* Hover glow */}
                        <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-linear-to-br rounded-lg blur-xl"
                            style={{ filter: "blur(20px)" }}
                        />

                        <div className="relative z-10 text-center space-y-3">
                            <motion.div
                                whileHover={{ scale: 1.2, rotate: 10 }}
                                className={cn(
                                    "w-12 h-12 mx-auto p-2.5 rounded-lg bg-black/30 flex items-center justify-center border",
                                    stat.color,
                                )}
                            >
                                <stat.icon className="w-6 h-6" />
                            </motion.div>

                            <div className="space-y-1">
                                <div className="text-3xl md:text-4xl font-black text-foreground">{stat.value}</div>
                                <div className="text-xs uppercase tracking-widest font-bold text-muted-foreground">{stat.label}</div>
                            </div>
                        </div>

                        {/* Bottom accent line */}
                        <div
                            className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r opacity-0 group-hover:opacity-100 transition-opacity"
                            style={{
                                backgroundImage: `linear-gradient(to right, transparent, var(--neon-cyan), transparent)`,
                            }}
                        />
                    </motion.div>
                )
            })}
        </div>
    )
}


function PuzzlePieces({ collected, total }) {
    const pieces = Array.from({ length: total }, (_, i) => i < collected)

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="cyber-card space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Puzzle className="w-7 h-7 text-[#7C3AED]" />
                    <h2 className="text-2xl font-black text-[#00D9FF] uppercase tracking-wider">Puzzle Collection</h2>
                </div>
                <div className="text-2xl font-black text-[#FF006E]">
                    {collected}/{total}
                </div>
            </div>

            {/* Progress bar */}
            <div className="space-y-2">
                <div className="h-4 bg-slate-800 border border-[#7C3AED]/30 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(collected / total) * 100}%` }}
                        transition={{ duration: 1 }}
                        className="h-full bg-linear-to-r from-[#7C3AED] to-[#FF006E] shadow-lg shadow-[#7C3AED]/50"
                    />
                </div>
                <div className="text-xs text-slate-400 text-right">
                    {total - collected} pieces remaining to complete the puzzle
                </div>
            </div>

            {/* Puzzle Grid */}
            <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
                {pieces.map((isCollected, i) => (
                    <motion.div
                        key={i}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: i * 0.05, type: "spring" }}
                        whileHover={isCollected ? { scale: 1.15, rotate: 5 } : {}}
                        className={cn(
                            "aspect-square rounded-lg border-2 flex items-center justify-center font-bold text-lg transition-all cursor-pointer",
                            isCollected
                                ? "bg-linear-to-br from-[#7C3AED]/30 to-[#FF006E]/30 border-[#7C3AED] shadow-lg shadow-[#7C3AED]/30 text-[#00D9FF]"
                                : "bg-slate-900/50 border-slate-700/50 text-slate-700",
                        )}
                    >
                        {isCollected ? (
                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}>
                                ◆
                            </motion.div>
                        ) : (
                            <Lock className="w-5 h-5" />
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Reward hint */}
            {collected === total && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-4 bg-linear-to-r from-[#FFD700]/20 to-[#FF006E]/20 border border-[#FFD700] rounded-lg text-center"
                >
                    <p className="font-bold text-[#FFD700] uppercase tracking-wider">🎉 Puzzle Complete! Claim Your Reward</p>
                </motion.div>
            )}
        </motion.div>
    )
}

function PlayerHero({ name, level, rankTitle, coins, xpProgress }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
        >
            {/* Animated background grid */}
            <div className="absolute inset-0 opacity-10 cyber-grid rounded-2xl" />

            <div className="relative bg-linear-to-r from-slate-900/80 via-slate-800/80 to-slate-900/80 backdrop-blur-md border-2 border-[#00D9FF]/40 rounded-2xl p-8 md:p-12 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#00D9FF]/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#FF006E]/10 rounded-full blur-3xl animate-pulse" />

                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
                    {/* Avatar Section */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="shrink-0"
                    >
                        <div className="relative">
                            {/* Avatar circle with neon glow */}
                            <div className="w-40 h-40 rounded-full bg-linear-to-br from-[#00D9FF]/20 via-[#7C3AED]/20 to-[#FF006E]/20 border-4 border-[#00D9FF] shadow-2xl shadow-[#00D9FF]/50 flex items-center justify-center relative group">
                                <User className="w-20 h-20 text-[#00D9FF]" />
                                {/* Animated ring */}
                                <div
                                    className="absolute inset-0 rounded-full border-2 border-[#00D9FF]/30 group-hover:animate-spin"
                                    style={{ animationDuration: "3s" }}
                                />
                            </div>

                            {/* Level badge */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.4, type: "spring" }}
                                className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-2 py-2 bg-linear-to-r from-[#FFD700] to-[#FF006E] text-black font-black text-sm rounded-full shadow-xl border-2 border-[#FFD700]"
                            >
                                LEV {level}
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Player Info Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="flex-1 text-center md:text-left space-y-6"
                    >
                        {/* Name and Rank */}
                        <div>
                            <h1 className="text-4xl md:text-6xl font-black tracking-tighter glitch mb-2" data-text={name}>
                                {name}
                            </h1>
                            <p className="text-2xl font-bold text-[#FFD700] tracking-widest uppercase">◆ {rankTitle} ◆</p>
                        </div>

                        {/* Coins Display */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 }}
                            className="flex items-center gap-4 justify-center md:justify-start"
                        >
                            <div className="relative">
                                <Coins className="w-12 h-12 text-[#FFD700] animate-bounce" />
                                <div className="absolute inset-0 animate-ping opacity-20">
                                    <Coins className="w-12 h-12 text-[#FFD700]" />
                                </div>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <motion.span
                                    key={coins}
                                    initial={{ scale: 1.3, y: -10 }}
                                    animate={{ scale: 1, y: 0 }}
                                    className="text-5xl font-black text-[#FFD700]"
                                >
                                    {coins.toLocaleString()}
                                </motion.span>
                                <span className="text-xl font-bold text-[#00D9FF] uppercase tracking-widest">COINS</span>
                            </div>
                        </motion.div>

                        {/* XP Progress Bar */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="space-y-3"
                        >
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-[#00D9FF] font-bold uppercase tracking-wider">NEXT LEVEL PROGRESS</span>
                                <span className="text-[#FF006E] font-bold">{Math.round(xpProgress.percentage)}%</span>
                            </div>

                            {/* Animated progress bar */}
                            <div className="relative h-3 bg-slate-800 border border-[#00D9FF]/20 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${xpProgress.percentage}%` }}
                                    transition={{ duration: 1, delay: 0.6 }}
                                    className="h-full bg-linear-to-r from-[#00D9FF] via-[#7C3AED] to-[#FF006E] rounded-full shadow-lg shadow-[#00D9FF]/50"
                                />
                                {/* Glow effect */}
                                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white to-transparent opacity-30 animate-pulse" />
                            </div>

                            <div className="flex justify-between text-xs text-slate-400">
                                <span>
                                    {xpProgress.current} / {xpProgress.required} XP
                                </span>
                                <span className="text-[#00D9FF]">{xpProgress.required - xpProgress.current} to next level</span>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    )
}

function MissionTimeline({ missions, currentMission }) {
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="cyber-card space-y-6">
            <div className="flex items-center gap-3">
                <Zap className="w-7 h-7 text-[#FFD700]" />
                <h2 className="text-2xl font-black text-[#00D9FF] uppercase tracking-wider">Mission Progress</h2>
            </div>

            {/* Timeline */}
            <div className="space-y-4">
                {missions.map((mission, index) => (
                    <motion.div
                        key={mission.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-4 group"
                    >
                        {/* Status Icon */}
                        <div className="shrink-0">
                            {mission.status === "completed" && (
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="relative">
                                    <CheckCircle className="w-8 h-8 text-[#00D9FF]" />
                                    <div className="absolute inset-0 animate-pulse">
                                        <CheckCircle className="w-8 h-8 text-[#00D9FF]" style={{ opacity: 0.3 }} />
                                    </div>
                                </motion.div>
                            )}
                            {mission.status === "current" && (
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                                    className="relative"
                                >
                                    <Circle className="w-8 h-8 text-[#FFD700]" fill="currentColor" />
                                    <Zap className="w-4 h-4 text-black absolute inset-2" />
                                </motion.div>
                            )}
                            {mission.status === "locked" && <Lock className="w-8 h-8 text-slate-600" />}
                        </div>

                        {/* Mission Content */}
                        <motion.div className="flex-1 group-hover:translate-x-2 transition-transform">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p
                                        className={cn(
                                            "font-bold uppercase tracking-wider",
                                            mission.status === "completed"
                                                ? "text-[#00D9FF]"
                                                : mission.status === "current"
                                                    ? "text-[#FFD700]"
                                                    : "text-slate-600",
                                        )}
                                    >
                                        Mission {mission.id}: {mission.name}
                                    </p>
                                    {mission.progress !== undefined && mission.status === "current" && (
                                        <div className="mt-2 w-40 h-2 bg-slate-800 rounded-full overflow-hidden border border-[#FFD700]/30">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${mission.progress}%` }}
                                                transition={{ duration: 0.8 }}
                                                className="h-full bg-linear-to-r from-[#FFD700] to-[#FF006E]"
                                            />
                                        </div>
                                    )}
                                </div>
                                {mission.status === "completed" && (
                                    <span className="text-xs font-bold text-[#00D9FF] bg-[#00D9FF]/10 px-3 py-1 rounded-full">DONE</span>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}

function CTASection({ onSpinClick, coinsAvailable }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-2 gap-6"
        >
            {/* Spin to Win Card */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onSpinClick}
                className="relative group overflow-hidden rounded-xl p-8 text-center transition-all"
            >
                {/* Animated background */}
                <div className="absolute inset-0 bg-linear-to-r from-[#FFD700]/30 via-[#FF006E]/30 to-[#00D9FF]/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute -inset-1 bg-linear-to-r from-[#FFD700] via-[#FF006E] to-[#00D9FF] rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-1000 animate-pulse" />

                <div className="relative z-10 space-y-4">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                        className="flex justify-center"
                    >
                        <Gamepad2 className="w-16 h-16 text-[#FFD700]" />
                    </motion.div>

                    <div>
                        <h3 className="text-2xl font-black text-[#FFD700] uppercase tracking-widest mb-2">Spin to Win</h3>
                        <p className="text-sm text-[#00D9FF] font-bold uppercase">Spend coins for epic rewards</p>
                    </div>

                    <div className="pt-4 border-t border-[#FFD700]/30">
                        <p className="text-lg font-black text-[#FF006E]">{coinsAvailable} Coins Ready</p>
                    </div>
                </div>
            </motion.button>

            {/* Next Mission Card */}
            <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative group overflow-hidden rounded-xl p-8 border-2 border-[#00D9FF]/40 bg-linear-to-br from-[#00D9FF]/10 to-[#7C3AED]/10 text-center"
            >
                <div className="relative z-10 space-y-4">
                    <motion.div
                        animate={{ y: [-5, 5, -5] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        className="flex justify-center"
                    >
                        <Zap className="w-16 h-16 text-[#00D9FF]" />
                    </motion.div>

                    <div>
                        <h3 className="text-2xl font-black text-[#00D9FF] uppercase tracking-widest mb-2">Ready for More?</h3>
                        <p className="text-sm text-[#FF006E] font-bold uppercase">Start your next mission now</p>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-4 px-6 py-3 bg-linear-to-r from-[#00D9FF] to-[#7C3AED] text-black font-black uppercase tracking-widest rounded-lg hover:shadow-lg hover:shadow-[#00D9FF]/50 transition-all"
                    >
                        Continue
                    </motion.button>
                </div>
            </motion.div>
        </motion.div>
    )
}

function BadgesShowcase({ badges }) {
    const unlockedCount = badges.filter((b) => b.unlocked).length

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="cyber-card space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Sparkles className="w-7 h-7 text-[#FFD700] animate-spin" style={{ animationDuration: "3s" }} />
                    <h2 className="text-2xl font-black text-[#00D9FF] uppercase tracking-wider">Achievements</h2>
                </div>
                <div className="text-lg font-bold text-[#FF006E]">
                    {unlockedCount}/{badges.length}
                </div>
            </div>

            {/* Badge Grid */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                {badges.map((badge, index) => (
                    <motion.div
                        key={badge.id}
                        initial={{ opacity: 0, scale: 0.5, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: index * 0.08 }}
                        whileHover={badge.unlocked ? { scale: 1.15, rotateY: 10 } : {}}
                        className="group relative"
                    >
                        {/* Badge Card */}
                        <div
                            className={cn(
                                "aspect-square rounded-lg border-2 flex flex-col items-center justify-center gap-2 p-3 transition-all cursor-pointer relative overflow-hidden",
                                badge.unlocked
                                    ? "bg-linear-to-br from-[#7C3AED]/30 via-[#FF006E]/20 to-[#00D9FF]/30 border-[#FF006E] shadow-lg shadow-[#FF006E]/40"
                                    : "bg-slate-900/60 border-slate-700 opacity-60",
                            )}
                        >
                            {/* Glow background for unlocked */}
                            {badge.unlocked && (
                                <div className="absolute inset-0 bg-linear-to-br from-[#FF006E]/0 to-[#00D9FF]/0 group-hover:from-[#FF006E]/10 group-hover:to-[#00D9FF]/10 transition-all" />
                            )}

                            {/* Icon or Lock */}
                            <div className="relative z-10 text-3xl">
                                {badge.unlocked ? badge.icon : <Lock className="w-6 h-6 text-slate-600" />}
                            </div>

                            {/* Badge name */}
                            <p
                                className={cn(
                                    "text-xs font-bold uppercase tracking-widest text-center leading-tight",
                                    badge.unlocked ? "text-[#00D9FF]" : "text-slate-600",
                                )}
                            >
                                {badge.name}
                            </p>
                        </div>

                        {/* Tooltip on hover */}
                        {badge.unlocked && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileHover={{ opacity: 1, y: -10 }}
                                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-slate-950 border border-[#FF006E] rounded-lg text-xs font-bold text-[#FF006E] whitespace-nowrap pointer-events-none z-50"
                            >
                                {badge.description}
                            </motion.div>
                        )}
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}

const AchievementLayout = () => {
    const playerStats = {
        name: "Neo_Hacker",
        level: 5,
        rankTitle: "Chrome Agent",
        coins: 2450,
        xpProgress: {
            percentage: 65,
            current: 650,
            required: 1000,
        },
    }

    const stats = [
        { label: "Videos Watched", value: 24, icon: Video, color: "border-[#00D9FF] text-[#00D9FF]" },
        { label: "Quizzes Cracked", value: 18, icon: Target, color: "border-[#FF006E] text-[#FF006E]" },
        { label: "Puzzle Pieces", value: "7/12", icon: Puzzle, color: "border-[#7C3AED] text-[#7C3AED]" },
        { label: "Badges Earned", value: 4, icon: Trophy, color: "border-[#FFD700] text-[#FFD700]" },
    ]

    return (
        <div className="min-h-screen bg-linear-to-b from-[#0F0F23] to-[#1a1a3e] cyber-grid relative overflow-hidden">
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    className="absolute top-0 right-0 w-96 h-96 bg-[#00D9FF]/10 rounded-full blur-3xl"
                    animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
                    transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY }}
                />
                <motion.div
                    className="absolute bottom-0 left-0 w-96 h-96 bg-[#FF006E]/10 rounded-full blur-3xl"
                    animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
                    transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY }}
                />
            </div>

            <div className="relative z-10 min-h-screen p-4 md:p-8 lg:p-12">
                <div className="max-w-6xl mx-auto space-y-8 md:space-y-12">
                    {/* Header with back button */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-between"
                    >
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 text-[#00D9FF] hover:text-[#FFD700] transition-colors group font-bold uppercase tracking-widest text-sm"
                        >
                            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            Back to Hub
                        </Link>

                        <div className="text-right">
                            <p className="text-xs text-slate-500 uppercase tracking-widest">LOGGED IN AS</p>
                            <p className="text-lg font-black text-[#FF006E]">{playerStats.name}</p>
                        </div>
                    </motion.div>

                    {/* Hero Section */}
                    <PlayerHero
                        name={playerStats.name}
                        level={playerStats.level}
                        rankTitle={playerStats.rankTitle}
                        coins={playerStats.coins}
                        xpProgress={playerStats.xpProgress}
                    />

                    {/* Stats Grid */}
                    <div>
                        <h2 className="text-xl font-black text-[#00D9FF] uppercase tracking-widest mb-6">Your Stats</h2>
                        <StatsGrid stats={stats} />
                    </div>

                    {/* Two Column Section */}
                    <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                        {/* Left Column */}
                        <div className="space-y-6 lg:space-y-8">
                            <MissionTimeline missions={mockMissions} currentMission={3} />
                            <PuzzlePieces collected={7} total={12} />
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6 lg:space-y-8">
                            <BadgesShowcase badges={mockBadges} />
                        </div>
                    </div>

                    {/* CTA Section */}
                    <CTASection coinsAvailable={playerStats.coins} onSpinClick={() => console.log("Spin clicked")} />

                    {/* Footer spacing */}
                    <div className="h-12" />
                </div>
            </div>
        </div>
    )
}

export default AchievementLayout;