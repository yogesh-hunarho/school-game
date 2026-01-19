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
    ArrowLeft,
    Shield,
    Flame,
    Eye
} from 'lucide-react';
import { useLMSStore } from '@/store/lms-store';
import HeaderCoin from '@/components/HeaderCoin';
import CyberpunkProgressBar from '@/components/ui/cyber-component/cyberpunk-progress-bar';
import DecryptedText from '@/components/DecryptedText';
import { calculateLevel, getLevelProgress } from '@/components/Header';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { getInitials } from '@/lib/utils';
import { BorderBeam } from '@/components/BorderBeam';
import { Link, useNavigate, useRoutes } from 'react-router-dom';
import CyberpunkButton from '@/components/ui/cyber-button';

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


const rankTitles = [
    { title: "Netrunner Rookie", desc: "Just getting started", color: "from-gray-400 to-gray-600", glow: "shadow-gray-500/30" },
    { title: "Street Kid Hacker", desc: "Learning the ropes", color: "from-blue-400 to-cyan-500", glow: "shadow-cyan-500/30" },
    { title: "Chrome Agent", desc: "Making progress", color: "from-cyan-400 to-teal-500", glow: "shadow-teal-500/30" },
    { title: "Data Samurai", desc: "Skilled operative", color: "from-purple-400 to-pink-500", glow: "shadow-purple-500/30" },
    { title: "Fixer Elite", desc: "Master of missions", color: "from-yellow-400 to-orange-500", glow: "shadow-orange-500/30" },
    { title: "Night City Legend", desc: "Ultimate champion", color: "from-red-500 to-pink-600", glow: "shadow-pink-500/30" },
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

// Floating particle component
const FloatingParticle = ({ delay, duration, left }) => (
    <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: "-100%", opacity: [0, 1, 1, 0] }}
        transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
        className="absolute w-1 h-1 bg-cyan-400 rounded-full"
        style={{ left: `${left}%` }}
    />
);

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState('overview');
    const [hoveredBadge, setHoveredBadge] = useState(null);
    const storePlayer = useLMSStore((state) => state.player);
    const getModuleProgress = useLMSStore((state) => state.getModuleProgress);
    const navigate = useNavigate()

    // Merge mock statistics with real player data
    const player = {
        ...mockPlayer,
        name: storePlayer.name,
        totalXP: storePlayer.totalXP,
        profileImage: storePlayer.profileImage,
        missionsCompleted: Object.keys(storePlayer.progress).filter(id => getModuleProgress(id) === 100).length,
    };

    const level = calculateLevel(storePlayer);
    const totalMissions = Object.keys(storePlayer.moduleStatus).length;
    const xpProgress = getLevelProgress(storePlayer, getModuleProgress);
    const rankInfo = getRankInfo(level);

    const earnedBadges = badgeDefinitions.filter(b => b.earned);
    const lockedBadges = badgeDefinitions.filter(b => !b.earned);
    const puzzlePiecesCollected = storePlayer.unlockedPuzzleCount;
    const totalPuzzlePieces = 9;

    const handleBack = () => {
        window.history.back();
    };

    return (
        <div className="min-h-screen py-16 md:py-20 text-white relative overflow-hidden">
            {/* Animated Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                {/* Horizontal Scanline */}
                <motion.div
                    animate={{ top: ["0%", "100%"] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 right-0 h-0.5 bg-cyan-500/20 blur-sm z-0"
                />

                {/* Data Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-size-[40px_40px]" />

                {/* Glowing orbs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 blur-[150px] rounded-full" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 blur-[150px] rounded-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-emerald-500/5 blur-[200px] rounded-full" />

                {/* Floating particles */}
                {[...Array(8)].map((_, i) => (
                    <FloatingParticle key={i} delay={i * 0.5} duration={4 + i * 0.5} left={10 + i * 12} />
                ))}
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Holographic Header */}
                <motion.header
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative flex flex-col bg-transparent backdrop-blur-xl border md:flex-row md:items-center justify-between mb-4 gap-6 p-2 md:p-4"
                >
                    <div className="relative flex items-center gap-4">
                        <motion.button
                            onClick={handleBack}
                            whileHover={{ scale: 1.1, x: -3 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative p-2 border border-cyan-500/30 hover:border-cyan-400 transition-all group"
                        >
                            <ArrowLeft className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300" />
                        </motion.button>

                        <div className="flex items-center gap-3 justify-between">
                            <h1 className="text-xl md:text-2xl font-black uppercase ">
                                PROFILE
                            </h1>
                        </div>
                    </div>
                    <CyberpunkButton variant='puzzle' onClick={()=>navigate('/spin-and-win')}>Spin And Win</CyberpunkButton>
                </motion.header>

                {/* Hero Profile Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="relative mb-8"
                >
                    <div className="relative backdrop-blur-xl border border-emerald-400/30 p-6 sm:p-8 overflow-hidden">
                        <div className="relative flex flex-col lg:flex-row items-center gap-8">
                            {/* Avatar Section */}
                            <div className="relative shrink-0">
                                <div className="relative w-40 h-40 sm:w-48 sm:h-48">
                                    {/* Outer rotating rings */}
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-0 rounded-full"
                                        style={{
                                            background: "conic-gradient(from 0deg, transparent, rgba(6,182,212,0.5), transparent, rgba(168,85,247,0.5), transparent)"
                                        }}
                                    />
                                    <motion.div
                                        animate={{ rotate: -360 }}
                                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                        className="absolute inset-2 rounded-full"
                                        style={{
                                            background: "conic-gradient(from 180deg, transparent, rgba(16,185,129,0.4), transparent, rgba(236,72,153,0.4), transparent)"
                                        }}
                                    />

                                    {/* Inner glow ring */}
                                    <div className="absolute inset-2 rounded-full bg-linear-to-br from-cyan-500/20 to-purple-500/20 p-1">
                                        <div className="w-full h-full rounded-full bg-slate-900/80 backdrop-blur-sm border-2 border-slate-700 shadow-2xl shadow-cyan-500/20 overflow-hidden flex items-center justify-center">
                                            <Avatar className="h-full w-full object-cover">
                                                <AvatarImage src={player.profileImage} alt={player.name} />
                                                <AvatarFallback className='text-3xl font-black bg-linear-to-br from-slate-800 to-slate-900 text-cyan-400'>
                                                    {getInitials(player.name)}
                                                </AvatarFallback>
                                            </Avatar>
                                        </div>
                                    </div>

                                    {/* Level Badge with pulse effect */}
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                                        className="absolute -bottom-3 left-1/2 -translate-x-1/2"
                                    >
                                        <div className="relative">
                                            <motion.div
                                                animate={{ scale: [1, 1.2, 1] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                                className="absolute inset-0 bg-linear-to-r from-yellow-400 to-orange-500 blur-md opacity-50"
                                            />
                                            <div className="relative px-5 py-2 bg-linear-to-r from-yellow-400 via-amber-500 to-orange-500 text-slate-900 font-black text-sm border-2 border-yellow-300/50 shadow-lg shadow-orange-500/30">
                                                <span className="flex items-center gap-1">
                                                    LVL {level}
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>

                            {/* Player Info */}
                            <div className="flex-1 w-full text-center lg:text-left space-y-6">
                                <div>
                                    <motion.h2
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="text-3xl sm:text-4xl lg:text-5xl font-black mb-3"
                                    >
                                        <DecryptedText
                                            text={player.name}
                                            animateOn="view"
                                            revealDirection="center"
                                        />
                                    </motion.h2>
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="flex items-center gap-3 justify-center lg:justify-start flex-wrap"
                                    >
                                        <div className={`relative px-4 py-2 bg-linear-to-r ${rankInfo.color} font-bold text-sm font-mono text-white shadow-lg ${rankInfo.glow} overflow-hidden`}>
                                            <motion.div
                                                animate={{ x: ["-100%", "100%"] }}
                                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                                className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent"
                                            />
                                            <span className="relative flex items-center gap-2">
                                                <Shield className="w-4 h-4" />
                                                {rankInfo.title}
                                            </span>
                                        </div>
                                        <span className="text-white text-sm font-mono italic">{rankInfo.desc}</span>
                                    </motion.div>
                                </div>

                                {/* Stats Row */}
                                <div className="flex flex-wrap items-center gap-4 justify-center lg:justify-start">
                                    {/* Coins */}
                                    <motion.div
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        className="relative group flex items-center gap-3 bg-linear-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 hover:border-yellow-400/60 px-5 py-4 transition-all"
                                    >
                                        <div className="absolute inset-0 bg-linear-to-r from-yellow-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <HeaderCoin isAnimate={false} />
                                        <div className="relative">
                                            <div className="text-3xl font-black bg-linear-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                                                {player.totalXP.toLocaleString()}
                                            </div>
                                            <div className="text-[10px] text-yellow-300 uppercase font-bold tracking-wider">Coins</div>
                                        </div>
                                    </motion.div>

                                    {/* Missions Progress */}
                                    <motion.div
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        className="relative group flex items-center gap-3 bg-linear-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 hover:border-cyan-400/60 px-5 py-4 transition-all"
                                    >
                                        <div className="absolute inset-0 bg-linear-to-r from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <div className="relative p-2 bg-cyan-500/20 rounded-lg">
                                            <MapPin className="w-6 h-6 text-cyan-400" />
                                        </div>
                                        <div className="relative">
                                            <div className="text-2xl font-black text-cyan-400">
                                                {level}<span >/{totalMissions}</span>
                                            </div>
                                            <div className="text-[10px] text-cyan-300 uppercase font-bold tracking-wider">Missions</div>
                                        </div>
                                    </motion.div>

                                    {/* Puzzle Progress */}
                                    <motion.div
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        className="relative group flex items-center gap-3 bg-linear-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 hover:border-purple-400/60 px-5 py-4 transition-all"
                                    >
                                        <div className="absolute inset-0 bg-linear-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <div className="relative p-2 bg-purple-500/20 rounded-lg">
                                            <Puzzle className="w-6 h-6 text-purple-400" />
                                        </div>
                                        <div className="relative">
                                            <div className="text-2xl font-black text-purple-400">
                                                {puzzlePiecesCollected || 0}<span >/{totalPuzzlePieces}</span>
                                            </div>
                                            <div className="text-[10px] text-purple-300 uppercase font-bold tracking-wider">Pieces</div>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Level Progress */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="space-y-3 bg-slate-800/30 p-4 border border-slate-700/50"
                                >
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-white font-medium flex items-center gap-2">
                                            <TrendingUp className="w-4 h-4 text-emerald-400" />
                                            {level < totalMissions ? `Progress to Level ${level + 1}` : 'Maximum Level Reached'}
                                        </span>
                                        <div className="text-xs font-mono text-emerald-400">
                                            {level < totalMissions ? `${Math.round(xpProgress.percentage)}%` : '100%'}
                                        </div>
                                    </div>
                                    <CyberpunkProgressBar hideLabel progress={xpProgress.percentage} />
                                </motion.div>
                            </div>
                        </div>
                        <BorderBeam duration={8} size={100} />
                    </div>
                </motion.div>

                {/* Stats Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
                >
                    {[
                        { icon: Video, label: "Videos Watched", value: player.videosWatched, gradient: "from-cyan-500 to-blue-600", borderColor: "border-cyan-500/30", hoverBorder: "hover:border-cyan-400/60", iconBg: "bg-cyan-500/20", glowColor: "cyan" },
                        { icon: Target, label: "Quizzes Aced", value: player.quizzesCompleted, gradient: "from-pink-500 to-purple-600", borderColor: "border-pink-500/30", hoverBorder: "hover:border-pink-400/60", iconBg: "bg-pink-500/20", glowColor: "pink" },
                        { icon: Puzzle, label: "Puzzle Unlocked", value: puzzlePiecesCollected, gradient: "from-yellow-500 to-orange-600", borderColor: "border-yellow-500/30", hoverBorder: "hover:border-yellow-400/60", iconBg: "bg-yellow-500/20", glowColor: "yellow" },
                        { icon: Trophy, label: "Badges Earned", value: earnedBadges.length, gradient: "from-purple-500 to-indigo-600", borderColor: "border-purple-500/30", hoverBorder: "hover:border-purple-400/60", iconBg: "bg-purple-500/20", glowColor: "purple" },
                    ].map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * i + 0.3 }}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="relative group"
                        >
                            {/* Hover glow */}
                            <div className={`absolute -inset-1  opacity-0 group-hover:opacity-20 blur-xl transition-all duration-300`} />

                            <div className={`relative h-full bg-background/20 backdrop-blur-3xl border ${stat.borderColor} ${stat.hoverBorder} p-6 text-center transition-all duration-300`}>
                                {/* Top accent line */}
                                <div className={`absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r ${stat.gradient} opacity-50 group-hover:opacity-100 transition-opacity`} />

                                {/* Icon container */}
                                <motion.div
                                    whileHover={{ rotate: [0, -10, 10, 0] }}
                                    transition={{ duration: 0.5 }}
                                    className={`inline-flex items-center justify-center w-16 h-16 ${stat.iconBg} mb-4 border border-white/10`}
                                >
                                    <stat.icon className="w-8 h-8 text-white" />
                                </motion.div>

                                {/* Value with gradient */}
                                <div className={`text-4xl sm:text-5xl font-black bg-linear-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}>
                                    {stat.value}
                                </div>

                                {/* Label */}
                                <div className="text-xs uppercase font-mono text-white font-bold">{stat.label}</div>

                                {/* Bottom decorative line */}
                                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-linear-to-r from-transparent via-gray-600 to-transparent" />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
