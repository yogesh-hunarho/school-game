import { useLMSStore } from "@/store/lms-store";
import { useSound } from "@/hook/useSound";
import { Star, Zap, User, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Level calculation helper
const calculateLevel = (xp) => {
    // Level thresholds: 0-99=1, 100-249=2, 250-499=3, 500-999=4, 1000+=5
    if (xp >= 1000) return Math.floor(5 + (xp - 1000) / 500);
    if (xp >= 500) return 4;
    if (xp >= 250) return 3;
    if (xp >= 100) return 2;
    return 1;
};

const getXPForLevel = (level) => {
    if (level <= 1) return 0;
    if (level === 2) return 100;
    if (level === 3) return 250;
    if (level === 4) return 500;
    if (level === 5) return 1000;
    return 1000 + (level - 5) * 500;
};

const getXPToNextLevel = (xp) => {
    const level = calculateLevel(xp);
    const nextLevelXP = getXPForLevel(level + 1);
    const currentLevelXP = getXPForLevel(level);
    return {
        current: xp - currentLevelXP,
        required: nextLevelXP - currentLevelXP,
        percentage: ((xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100,
    };
};

export default function Header() {
    const { player } = useLMSStore();
    const { playClick } = useSound();
    const level = calculateLevel(player.totalXP);
    const xpProgress = getXPToNextLevel(player.totalXP);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-slate-950/80 backdrop-blur-xl border-b border-cyan-500/20">
            {/* Scanline overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-10 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,255,255,0.03)_2px,rgba(0,255,255,0.03)_4px)]" />

            {/* Glow line at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-cyan-500/50 to-transparent" />

            <div className="relative h-full max-w-screen-2xl mx-auto px-4 flex items-center justify-between">
                {/* Left: Logo */}
                <Link
                    to="/"
                    onClick={playClick}
                    className="flex items-center gap-3 group"
                >
                    <div className="relative">
                        {/* Glow effect behind logo */}
                        <div className="absolute inset-0 bg-cyan-500/30 blur-lg rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <img
                            src="/hunarho_small_logo.png"
                            alt="Hunarho"
                            className="relative h-10 w-auto drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] group-hover:drop-shadow-[0_0_12px_rgba(34,211,238,0.8)] transition-all duration-300"
                        />
                    </div>
                    <span className="hidden sm:block text-lg font-bold bg-linear-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent tracking-wider">
                        HUNARHO
                    </span>
                </Link>

                {/* Right: Profile Section */}
                <Link
                    to="/profile"
                    onClick={playClick}
                    className="flex items-center gap-4 group"
                >
                    {/* XP and Level Stats */}
                    <div className="hidden md:flex items-center gap-4">
                        {/* Level Badge */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-linear-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30"
                        >
                            <Zap className="w-4 h-4 text-purple-400" />
                            <span className="text-sm font-bold text-purple-400">LVL {level}</span>
                        </motion.div>

                        {/* XP Counter */}
                        <div className="flex flex-col items-end gap-0.5">
                            <div className="flex items-center gap-1.5">
                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                <span className="text-sm font-bold text-yellow-400 tabular-nums">
                                    {player.totalXP.toLocaleString()} XP
                                </span>
                            </div>
                            {/* XP Progress bar */}
                            <div className="w-24 h-1 bg-slate-800 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-linear-to-r from-yellow-400 to-orange-500 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${Math.min(xpProgress.percentage, 100)}%` }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Avatar */}
                    <div className="relative">
                        {/* Neon ring */}
                        <div className="absolute -inset-1 rounded-full opacity-70 blur-sm group-hover:opacity-100 transition-opacity" />
                        <div className="relative w-10 h-10 rounded-full bg-slate-900 border-2 border-cyan-500/50 flex items-center justify-center overflow-hidden group-hover:border-cyan-400 transition-colors">
                            <User className="w-5 h-5 text-cyan-400" />
                        </div>
                        {/* Online indicator */}
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-950" />
                    </div>

                    {/* Arrow for navigation hint */}
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                </Link>
            </div>
        </header>
    );
}

export { calculateLevel, getXPForLevel, getXPToNextLevel };
