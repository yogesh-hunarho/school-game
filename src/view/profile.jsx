import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Star,
    Zap,
    Trophy,
    Video,
    Target,
    ChevronLeft,
    User,
    Gamepad2,
    Sparkles,
    Puzzle,
    Coins,
    Lock,
    TrendingUp,
    Award,
    Play,
    CheckCircle2,
    Clock,
    Medal,
    Gift,
    Crown,
    Swords,
    MapPin,
    ArrowLeft
} from 'lucide-react';
import { useLMSStore } from '@/store/lms-store';
import HeaderCoin from '@/components/HeaderCoin';
import CyberpunkProgressBar from '@/components/ui/cyber-component/cyberpunk-progress-bar';
import DecryptedText from '@/components/DecryptedText';

// Mock data - replace with your actual store data
const mockPlayer = {
    name: "CyberNinja",
    totalXP: 1250,
    videosWatched: 24,
    quizzesCompleted: 18,
    perfectScores: 5,
    currentStreak: 7,
    longestStreak: 12,
    missionsCompleted: 8,
    totalMissions: 12
};

const calculateLevel = (xp) => Math.floor(xp / 200) + 1;

const getXPToNextLevel = (xp) => {
    const level = calculateLevel(xp);
    const xpForCurrentLevel = (level - 1) * 200;
    const xpForNextLevel = level * 200;
    const current = xp - xpForCurrentLevel;
    const required = xpForNextLevel - xpForCurrentLevel;
    return {
        current,
        required,
        percentage: (current / required) * 100
    };
};

const rankTitles = [
    { title: "Netrunner Rookie", desc: "Just getting started", color: "from-gray-400 to-gray-600" },
    { title: "Street Kid Hacker", desc: "Learning the ropes", color: "from-blue-400 to-cyan-500" },
    { title: "Chrome Agent", desc: "Making progress", color: "from-cyan-400 to-teal-500" },
    { title: "Data Samurai", desc: "Skilled operative", color: "from-purple-400 to-pink-500" },
    { title: "Fixer Elite", desc: "Master of missions", color: "from-yellow-400 to-orange-500" },
    { title: "Night City Legend", desc: "Ultimate champion", color: "from-red-500 to-pink-600" },
];

const getRankInfo = (level) => {
    const index = Math.min(Math.floor((level - 1) / 2), rankTitles.length - 1);
    return rankTitles[index];
};

const badgeDefinitions = [
    { id: "first-mission", name: "First Steps", icon: "🚀", desc: "Complete your first mission video", earned: true },
    { id: "quiz-ace", name: "Quiz Genius", icon: "🧠", desc: "Score 100% on 3 quizzes", earned: true },
    { id: "coin-hunter", name: "Coin Collector", icon: "💰", desc: "Collect 200 Coins", earned: true },
    { id: "puzzle-master", name: "Puzzle Pro", icon: "🧩", desc: "Collect 10 puzzle pieces", earned: true },
    { id: "video-binge", name: "Mission Master", icon: "🎬", desc: "Watch 20 mission videos", earned: false },
    { id: "streak", name: "On Fire!", icon: "🔥", desc: "7 day streak", earned: true },
    { id: "perfectionist", name: "Perfectionist", icon: "⭐", desc: "5 perfect quiz scores", earned: true },
    { id: "legend", name: "Legend", icon: "👑", desc: "Reach Level 10", earned: false },
];

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState('overview');
    const storePlayer = useLMSStore((state) => state.player);
    const getModuleProgress = useLMSStore((state) => state.getModuleProgress);

    // Merge mock statistics with real player data
    const player = {
        ...mockPlayer,
        name: storePlayer.name,
        totalXP: storePlayer.totalXP,
        profileImage: storePlayer.profileImage,
        missionsCompleted: Object.keys(storePlayer.progress).filter(id => getModuleProgress(id) === 100).length,
    };

    const level = calculateLevel(player.totalXP);
    const xpProgress = getXPToNextLevel(player.totalXP);
    const rankInfo = getRankInfo(level);

    const earnedBadges = badgeDefinitions.filter(b => b.earned);
    const lockedBadges = badgeDefinitions.filter(b => !b.earned);
    const puzzlePiecesCollected = storePlayer.unlockedPuzzleCount;
    const totalPuzzlePieces = 9;

    const handleBack = () => {
        window.history.back();
    };

    return (
        <div className="min-h-screen py-20 text-white relative overflow-hidden ">
            <div className="relative z-10 max-w-7xl mx-auto">
                <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6 bg-black/40 backdrop-blur-xl p-4 md:p-6 border border-white/5 shadow-2xl">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleBack}
                            className="p-2 hover:bg-white/10 rounded-xl transition-colors text-zinc-400 hover:text-white"
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </button>
                        <h1 className="text-2xl md:text-3xl font-black tracking-tighter italic uppercase text-white">
                            PROFILE
                        </h1>
                    </div>
                </header>

                {/* Hero Profile Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative mb-8"
                >
                    {/* <div className="absolute inset-0 bg-linear-to-r from-cyan-500/20 to-purple-500/20 blur-xl" /> */}
                    <div className="relative bg-linear-to-br bg-transparent backdrop-blur-sm border-2 border-cyan-400/30 p-6 sm:p-8 overflow-hidden">
                        {/* Corner Accents */}
                        <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-cyan-400/50 rounded-tl" />
                        <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-purple-400/50 rounded-br" />

                        <div className="flex flex-col lg:flex-row items-center gap-8">
                            {/* Avatar Section */}
                            <div className="relative shrink-0">
                                <div className="relative w-36 h-36 sm:w-40 sm:h-40">
                                    {/* Rotating Ring */}
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-0 rounded-full border-4 border-transparent border-t-cyan-400 border-r-purple-400"
                                    />

                                    {/* Avatar */}
                                    <div className="absolute inset-2 rounded-full bg-linear-to-br from-cyan-500/30 to-purple-500/30 border-4 border-gray-800 shadow-2xl shadow-cyan-400/30 flex items-center justify-center overflow-hidden">
                                        {player.profileImage ? (
                                            <img src={player.profileImage} alt="Avatar" className="h-full w-full object-cover" />
                                        ) : (
                                            <User className="w-16 h-16 text-cyan-300" />
                                        )}
                                        <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
                                    </div>

                                    {/* Level Badge */}
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.3, type: "spring" }}
                                        className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-2 bg-linear-to-r from-yellow-400 to-orange-500 text-black font-black text-sm rounded-full shadow-lg border-2 border-yellow-300"
                                    >
                                        LVL {level}
                                    </motion.div>
                                </div>
                            </div>

                            {/* Player Info */}
                            <div className="flex-1 w-full text-center lg:text-left space-y-6">
                                <div>
                                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black bg-linear-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                                        <DecryptedText
                                            text={player.name}
                                            animateOn="view"
                                            revealDirection="center"
                                        />
                                    </h2>
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 }}
                                        className="flex items-center gap-3 mt-4 justify-center lg:justify-start flex-wrap"
                                    >
                                        <div className={`px-4 py-2 bg-linear-to-r ${rankInfo.color} font-bold text-sm text-white shadow-lg`}>
                                            {rankInfo.title}
                                        </div>
                                        <span className="text-gray-400 text-sm">{rankInfo.desc}</span>
                                    </motion.div>
                                </div>

                                {/* Stats Row */}
                                <div className="flex flex-wrap items-center gap-6 justify-center lg:justify-start">
                                    {/* Coins */}
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        className="flex items-center gap-3 bg-linear-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 px-5 py-3"
                                    >
                                        <HeaderCoin />
                                        <div>
                                            <div className="text-3xl font-black text-yellow-400">
                                                {player.totalXP.toLocaleString()}
                                            </div>
                                            <div className="text-xs text-yellow-300/70 uppercase font-bold">Coins</div>
                                        </div>
                                    </motion.div>

                                    {/* Missions Progress */}
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        className="flex items-center gap-3 bg-linear-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 px-5 py-3"
                                    >
                                        <MapPin className="w-8 h-8 text-cyan-400" />
                                        <div>
                                            <div className="text-2xl font-black text-cyan-400">
                                                {player.missionsCompleted}/{player.totalMissions}
                                            </div>
                                            <div className="text-xs text-cyan-300/70 uppercase font-bold">Missions</div>
                                        </div>
                                    </motion.div>

                                    {/* Puzzle Progress */}
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        className="flex items-center gap-3 bg-linear-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 px-5 py-3"
                                    >
                                        <Puzzle className="w-8 h-8 text-purple-400" />
                                        <div>
                                            <div className="text-2xl font-black text-purple-400">
                                                {puzzlePiecesCollected}/{totalPuzzlePieces}
                                            </div>
                                            <div className="text-xs text-purple-300/70 uppercase font-bold">Pieces</div>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Level Progress */}
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between text-sm mb-0">
                                        <span className="text-gray-400 font-medium">
                                            Progress to Level {level + 1}
                                        </span>
                                        <div className="text-xs text-right text-mono">
                                            {Math.round(xpProgress.required - xpProgress.current)} coins to next level
                                        </div>
                                    </div>
                                    <CyberpunkProgressBar hideLabel progress={xpProgress.percentage} />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {[
                        { icon: Video, label: "Videos Watched", value: player.videosWatched, color: "cyan", gradient: "from-cyan-500 to-blue-500" },
                        { icon: Target, label: "Quizzes Aced", value: player.quizzesCompleted, color: "pink", gradient: "from-pink-500 to-purple-500" },
                        { icon: Award, label: "Perfect Scores", value: player.perfectScores, color: "yellow", gradient: "from-yellow-500 to-orange-500" },
                        { icon: Trophy, label: "Badges Earned", value: earnedBadges.length, color: "purple", gradient: "from-purple-500 to-indigo-500" },
                    ].map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * i }}
                            whileHover={{ y: -5 }}
                            className="relative group"
                        >
                            {/* <div className={`absolute inset-0 bg-linear-to-br ${stat.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity`} /> */}
                            <div className="relative  backdrop-blur border-2 border-cyan-500/30 group-hover:border-cyan-600 p-6 text-center transition-all">
                                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-full bg-linear-to-br ${stat.gradient} mb-4 shadow-lg`}>
                                    <stat.icon className="w-7 h-7 text-white" />
                                </div>
                                <div className="text-3xl sm:text-4xl font-black text-white mb-2">{stat.value}</div>
                                <div className="text-xs uppercase tracking-wider text-gray-400 font-bold">{stat.label}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
