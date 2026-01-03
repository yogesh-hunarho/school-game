import { cn } from "@/lib/utils";
import { Play, CheckCircle2, ChevronRight, Zap, Lock, AlertCircle, BookCheck, Clock, Sparkles } from "lucide-react";
import { useLMSStore } from "@/store/lms-store";
import { modules } from "@/store/level-canvas-config";
import useSound from "@/hook/useSound";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import CyberpunkProgressBar from "@/components/ui/cyber-component/cyberpunk-progress-bar";
import TypeWriter from "@/components/typewritter";


const cardVariants = {
    hidden: {
        opacity: 0,
        y: 20,
        scale: 0.95
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 24
        }
    }
};

// Glow pulse animation for cards
const glowVariants = {
    initial: { opacity: 0 },
    hover: {
        opacity: 1,
        transition: { duration: 0.3 }
    }
};

// Border gradient animation
const borderGradientVariants = {
    initial: {
        backgroundPosition: "0% 50%"
    },
    hover: {
        backgroundPosition: "100% 50%",
        transition: {
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse"
        }
    }
};

export const ModuleContentPanel = () => {
    const [shakingId, setShakingId] = useState(null);
    const [clickedId, setClickedId] = useState(null);
    const {
        player,
        getCurrentModuleContent,
        isVideoWatched,
        isQuizCompleted,
        openVideoModal,
        openQuizModal,
        getModuleProgress,
    } = useLMSStore();
    const { playSound, playClick } = useSound();

    const content = getCurrentModuleContent();
    const moduleId = player.currentModuleId;
    const progress = getModuleProgress(moduleId);

    // Check if module is locked
    const moduleStatus = player.moduleStatus[moduleId] || "locked";
    const isLocked = moduleStatus === "locked";

    // Find module info from config
    const moduleInfo = modules.find(m => m.id === moduleId) || {};

    // Module display names and icons
    const moduleNames = {
        "innovators-mind": { name: "Innovators Mind", icon: "💡", description: "Learn the fundamentals of design thinking and innovation" },
        "trebuchet": { name: "Project Trebuchet", icon: "🏰", description: "Build and understand medieval engineering" },
        "motor-robot": { name: "Motor Robot", icon: "🤖", description: "Create your own motor-powered robot" },
        "tetris": { name: "Project Tetris", icon: "🧱", description: "Learn programming through the classic game" },
        "aqua-bridge": { name: "Aqua Bridge", icon: "🌊", description: "Design bridges that can withstand water pressure" },
        "drawing-bot": { name: "Drawing Bot", icon: "🎨", description: "Build an AI-powered drawing machine" },
        "soil-monitoring": { name: "Soil Monitoring", icon: "🌱", description: "Create smart sensors for agriculture" },
        "homopolar-motor": { name: "Homopolar Motor", icon: "⚡", description: "Quick experiment with electromagnetic motors" },
        "final-assessment": { name: "Final Assessment", icon: "🏆", description: "Complete your Grade 6 journey" },
    };

    const currentModule = moduleNames[moduleId] || { name: "Module", icon: "📚", description: "Learn something new" };

    const handleItemClick = (e, id, locked, action) => {
        e.stopPropagation();
        if (locked) {
            setShakingId(id);
            playSound("disabled");
            setTimeout(() => setShakingId(null), 500);
            return;
        }
        setClickedId(id);
        playClick();
        setTimeout(() => {
            setClickedId(null);
            action();
        }, 150);
    };

    return (
        <div className="relative bg-linear-to-br from-slate-950 via-slate-900/98 to-slate-950 shadow-2xl">
            {/* Ambient background effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
            </div>

            {/* Scanline overlay */}
            <div className="pointer-events-none absolute inset-0 z-20 opacity-[0.015] bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,255,255,0.1)_2px,rgba(0,255,255,0.1)_4px)]" />

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-400/80" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-cyan-400/80" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-cyan-400/80" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-400/80" />

            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 border-b border-cyan-400/20 p-6"
            >
                <div className="flex items-center gap-4">
                    <motion.div
                        className="relative"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400 }}
                    >
                        <div className={cn(
                            "flex h-16 w-16 items-center justify-center text-3xl bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 border-2",
                            isLocked ? "border-slate-600" : "border-cyan-400/60"
                        )}>
                            {currentModule.icon}
                        </div>
                        {!isLocked && (
                            <motion.div
                                className="absolute -inset-1 bg-linear-to-r from-cyan-400/20 via-purple-500/20 to-cyan-400/20 blur-sm -z-10"
                                animate={{
                                    opacity: [0.5, 0.8, 0.5],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                        )}
                        <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-cyan-400/80 rounded-tl" />
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-cyan-400/80 rounded-br" />
                    </motion.div>

                    <div className="flex-1">
                        <div className="flex items-center gap-3">
                            <h2 className="text-xl font-bold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-cyan-300 to-cyan-400 uppercase tracking-wider">
                                {currentModule.name}
                            </h2>
                            {isLocked && (
                                <motion.span
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider border border-amber-500/50 bg-amber-500/10 text-amber-400 rounded flex items-center gap-1.5"
                                >
                                    <Lock className="h-3 w-3" />
                                    LOCKED
                                </motion.span>
                            )}
                        </div>
                        <p className="text-xs text-slate-400 font-mono uppercase tracking-wider mt-1 flex items-center gap-2">
                            {isLocked ? (
                                <>
                                    <AlertCircle className="h-3 w-3 text-amber-400" />
                                    COMPLETE PREVIOUS TO UNLOCK
                                </>
                            ) : (
                                <>
                                    <Sparkles className="h-3 w-3 text-cyan-400" />
                                    SYNC: {progress}%
                                </>
                            )}
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Progress Bar */}
            {!isLocked && progress > 0 && (
                <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="px-6 py-4 border-b border-cyan-400/10 origin-left"
                >
                    <CyberpunkProgressBar
                        progress={progress}
                        hideLabel={true}
                    />
                </motion.div>
            )}

            {/* Locked Warning Banner */}
            {isLocked && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="mx-6 mt-4 relative overflow-hidden"
                >
                    <div className="relative border border-amber-500/30 bg-linear-to-r from-amber-500/10 via-amber-500/5 to-amber-500/10 backdrop-blur-sm p-4">
                        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-amber-400 rounded-tl" />
                        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-amber-400 rounded-br" />
                        <div className="flex items-start gap-4">
                            <motion.div
                                animate={{ rotate: [0, 5, -5, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <AlertCircle className="h-5 w-5 shrink-0 text-amber-400" />
                            </motion.div>
                            <div>
                                <p className="text-sm font-bold text-amber-400 uppercase tracking-wider">ACCESS RESTRICTED</p>
                                <p className="mt-1.5 text-xs text-slate-400 tracking-wide leading-relaxed">
                                    {currentModule.description}. Complete previous modules to unlock this content.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Module Stats Grid (for locked modules) */}
            {isLocked && moduleInfo && (
                <motion.div
                    initial="hidden"
                    animate="visible"
                    className="mx-6 mt-4 grid grid-cols-3 gap-3"
                >
                    {moduleInfo.videos > 0 && (
                        <motion.div
                            variants={cardVariants}
                            className="relative p-4 text-center border border-cyan-400/20 bg-linear-to-br from-slate-900/80 to-slate-800/40 backdrop-blur-sm group hover:border-cyan-400/40 transition-colors duration-300"
                        >
                            <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <p className="text-2xl font-bold text-cyan-400">{moduleInfo.videos}</p>
                            <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">VIDEOS</p>
                        </motion.div>
                    )}
                    {moduleInfo.quizzes > 0 && (
                        <motion.div
                            variants={cardVariants}
                            className="relative p-4 text-center border border-purple-400/20 bg-linear-to-br from-slate-900/80 to-slate-800/40 backdrop-blur-sm  group hover:border-purple-400/40 transition-colors duration-300"
                        >
                            <div className="absolute inset-0 bg-linear-to-br from-purple-500/5 to-transparent  opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <p className="text-2xl font-bold text-purple-400">{moduleInfo.quizzes}</p>
                            <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">QUIZZES</p>
                        </motion.div>
                    )}
                    {moduleInfo.totalStars > 0 && (
                        <motion.div
                            variants={cardVariants}
                            className="relative p-4 text-center border border-amber-400/20 bg-linear-to-br from-slate-900/80 to-slate-800/40 backdrop-blur-sm  group hover:border-amber-400/40 transition-colors duration-300"
                        >
                            <div className="absolute inset-0 bg-linear-to-br from-amber-500/5 to-transparent  opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <p className="text-2xl font-bold text-amber-400">{moduleInfo.totalStars}00</p>
                            <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">COINS</p>
                        </motion.div>
                    )}
                </motion.div>
            )}

            {/* Content Grid */}
            <div onClick={playClick} className="flex-1 overflow-y-auto p-6">
                {/* Videos Section */}
                {content.videos.length > 0 && (
                    <motion.div className="mb-8">
                        <h3 className="mb-5 flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-lime-300">
                            <div className="p-2.5 bg-lime-300/10 border border-lime-300/30 ">
                                <Play className="h-4 w-4" />
                            </div>
                            {/* { text: "Finish the Videos, Claim Your Coins" } */}
                            <div className="italic text-lime-300">
                                <TypeWriter
                                    text={`Finish the Videos, Claim Your Coins (${content.videos.length})`}
                                    delay={30}
                                />
                            </div>
                        </h3>

                        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {content.videos.map((video, index) => {
                                const isWatched = isVideoWatched(moduleId, video.id);
                                const isClicked = clickedId === video.id;

                                return (
                                    <motion.button
                                        key={video.id}
                                        whileHover={{
                                            scale: isLocked ? 1 : 1.02,
                                            y: isLocked ? 0 : -4
                                        }}
                                        whileTap={{ scale: isLocked ? 1 : 0.98 }}
                                        onClick={(e) => handleItemClick(e, video.id, isLocked, () => openVideoModal(video))}
                                        className={cn(
                                            "relative w-full text-left overflow-hidden transition-all duration-300 group",
                                            shakingId === video.id && "animate-shake",
                                            isClicked && "scale-95"
                                        )}
                                    >
                                        {/* Card Background */}
                                        <div className={cn(
                                            "absolute inset-0 transition-all duration-300",
                                            isLocked
                                                ? "bg-slate-900/60 border border-slate-700/50"
                                                : isWatched
                                                    ? "bg-linear-to-br from-emerald-950/80 via-emerald-900/40 to-slate-900/80 border border-emerald-500/30"
                                                    : "bg-linear-to-br from-slate-900/80 via-slate-800/60 to-slate-900/80 border border-cyan-500/20 group-hover:border-cyan-400/50"
                                        )} />

                                        {/* Hover Glow Effect */}
                                        {!isLocked && (
                                            <motion.div
                                                className={cn(
                                                    "absolute inset-0 blur-xl -z-10",
                                                    isWatched
                                                        ? "bg-emerald-500/10"
                                                        : "bg-cyan-500/10"
                                                )}
                                                initial={{ opacity: 0 }}
                                                whileHover={{ opacity: 1 }}
                                            />
                                        )}

                                        {/* Card Content */}
                                        <div className="relative p-5">
                                            {/* Top Row: Number Badge & Status */}
                                            <div className="flex items-start justify-between mb-4">
                                                <motion.div
                                                    className={cn(
                                                        "flex h-10 w-10 items-center justify-center text-sm font-bold  transition-all duration-300",
                                                        isLocked
                                                            ? "bg-slate-800/80 text-slate-500 border border-slate-700"
                                                            : isWatched
                                                                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                                                : "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 group-hover:bg-cyan-500/20"
                                                    )}
                                                    whileHover={!isLocked ? { scale: 1.1, rotate: 5 } : {}}
                                                >
                                                    {isLocked ? (
                                                        <Lock className="h-4 w-4" />
                                                    ) : isWatched ? (
                                                        <CheckCircle2 className="h-5 w-5" />
                                                    ) : (
                                                        String(index + 1).padStart(2, '0')
                                                    )}
                                                </motion.div>

                                                {/* Play Button */}
                                                <motion.div
                                                    className={cn(
                                                        "flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300",
                                                        isLocked
                                                            ? "bg-slate-800/50 text-slate-600"
                                                            : isWatched
                                                                ? "bg-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500/30"
                                                                : "bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20 group-hover:scale-110"
                                                    )}
                                                    whileHover={!isLocked ? { scale: 1.15 } : {}}
                                                    whileTap={!isLocked ? { scale: 0.9 } : {}}
                                                >
                                                    {isLocked ? (
                                                        <Lock className="h-4 w-4" />
                                                    ) : (
                                                        <Play className="h-4 w-4 fill-current ml-0.5" />
                                                    )}
                                                </motion.div>
                                            </div>

                                            {/* Title */}
                                            <h4 className={cn(
                                                "font-semibold text-base mb-2 line-clamp-2 transition-colors duration-300",
                                                isLocked
                                                    ? "text-slate-500"
                                                    : isWatched
                                                        ? "text-emerald-300 group-hover:text-emerald-200"
                                                        : "text-cyan-50 group-hover:text-white"
                                            )}>
                                                {video.title}
                                            </h4>

                                            {/* Meta Info */}
                                            <div className="flex items-center gap-3 text-xs">
                                                <span className={cn(
                                                    "flex items-center gap-1.5 font-mono",
                                                    isLocked ? "text-slate-600" : "text-slate-400"
                                                )}>
                                                    <Clock className="h-3 w-3" />
                                                    {video.duration}
                                                </span>
                                                <span className="flex items-center gap-1.5 text-amber-400 font-medium">
                                                    <Zap className="h-3 w-3" />
                                                    {video.xp} Coins
                                                </span>
                                            </div>

                                            {/* Progress indicator for watched videos */}
                                            {isWatched && !isLocked && (
                                                <motion.div
                                                    initial={{ scaleX: 0 }}
                                                    animate={{ scaleX: 1 }}
                                                    className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-emerald-500 via-emerald-400 to-emerald-500 rounded-b-xl origin-left"
                                                />
                                            )}
                                        </div>

                                        {/* Corner Accents */}
                                        {!isLocked && (
                                            <>
                                                <div className={cn(
                                                    "absolute top-2 left-2 w-2 h-2 border-t border-l transition-all duration-300",
                                                    isWatched ? "border-emerald-400/50 group-hover:border-emerald-400" : "border-cyan-400/30 group-hover:border-cyan-400"
                                                )} />
                                                <div className={cn(
                                                    "absolute bottom-2 right-2 w-2 h-2 border-b border-r transition-all duration-300",
                                                    isWatched ? "border-emerald-400/50 group-hover:border-emerald-400" : "border-cyan-400/30 group-hover:border-cyan-400"
                                                )} />
                                            </>
                                        )}
                                    </motion.button>
                                );
                            })}
                        </motion.div>
                    </motion.div>
                )}

                {/* Quizzes Section */}
                {content.quizzes.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mb-8"
                    >
                        <h3 className="mb-5 flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-amber-400">
                            <div className="p-2.5 bg-amber-400/10 border border-amber-400/30 ">
                                <BookCheck className="h-4 w-4" />
                            </div>
                            <div className="italic text-amber-400">
                                <TypeWriter
                                    text={`Test Your Knowledge, Collect Your Coins (${content.quizzes.length})`}
                                    delay={30}
                                />
                            </div>
                        </h3>

                        <motion.div
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                        >
                            {content.quizzes.map((quiz) => {
                                const isCompleted = isQuizCompleted(moduleId, quiz.id);
                                const isClicked = clickedId === quiz.id;

                                return (
                                    <motion.button
                                        key={quiz.id}
                                        variants={cardVariants}
                                        whileHover={{
                                            scale: isLocked ? 1 : 1.02,
                                            y: isLocked ? 0 : -4
                                        }}
                                        whileTap={{ scale: isLocked ? 1 : 0.98 }}
                                        onClick={(e) => handleItemClick(e, quiz.id, isLocked, () => openQuizModal(quiz))}
                                        className={cn(
                                            "relative w-full text-left overflow-hidden   transition-all duration-300 group",
                                            shakingId === quiz.id && "animate-shake",
                                            isClicked && "scale-95"
                                        )}
                                    >
                                        {/* Card Background */}
                                        <div className={cn(
                                            "absolute inset-0    transition-all duration-300",
                                            isLocked
                                                ? "bg-slate-900/60 border border-slate-700/50"
                                                : isCompleted
                                                    ? "bg-linear-to-br from-amber-950/80 via-orange-900/40 to-slate-900/80 border border-amber-500/30"
                                                    : "bg-linear-to-br from-slate-900/80 via-purple-900/20 to-slate-900/80 border border-purple-500/20 group-hover:border-amber-400/50"
                                        )} />

                                        {/* Animated gradient border on hover */}
                                        {!isLocked && !isCompleted && (
                                            <motion.div
                                                className="absolute inset-0  opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                style={{
                                                    background: "linear-gradient(90deg, transparent, rgba(251, 191, 36, 0.1), transparent)",
                                                    backgroundSize: "200% 100%",
                                                }}
                                                animate={{
                                                    backgroundPosition: ["0% 0%", "200% 0%"]
                                                }}
                                                transition={{
                                                    duration: 1.5,
                                                    repeat: Infinity,
                                                    ease: "linear"
                                                }}
                                            />
                                        )}

                                        {/* Hover Glow Effect */}
                                        {!isLocked && (
                                            <motion.div
                                                className="absolute inset-0  bg-amber-500/10 blur-xl -z-10"
                                                initial={{ opacity: 0 }}
                                                whileHover={{ opacity: 1 }}
                                            />
                                        )}

                                        {/* Card Content */}
                                        <div className="relative p-5">
                                            {/* Top Row: Icon & Arrow */}
                                            <div className="flex items-start justify-between mb-4">
                                                <motion.div
                                                    className={cn(
                                                        "flex h-10 w-10 items-center justify-center  transition-all duration-300",
                                                        isLocked
                                                            ? "bg-slate-800/80 text-slate-500 border border-slate-700"
                                                            : isCompleted
                                                                ? "bg-linear-to-br from-amber-500 to-orange-500 text-black"
                                                                : "bg-linear-to-br from-purple-500/20 to-amber-500/20 text-amber-400 border border-amber-500/30 group-hover:from-amber-500/30 group-hover:to-orange-500/30"
                                                    )}
                                                    whileHover={!isLocked ? { scale: 1.1, rotate: -5 } : {}}
                                                >
                                                    {isLocked ? (
                                                        <Lock className="h-4 w-4" />
                                                    ) : isCompleted ? (
                                                        <CheckCircle2 className="h-5 w-5" />
                                                    ) : (
                                                        <BookCheck className="h-5 w-5" />
                                                    )}
                                                </motion.div>

                                                {/* Arrow Button */}
                                                <motion.div
                                                    className={cn(
                                                        "flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300",
                                                        isLocked
                                                            ? "bg-slate-800/50 text-slate-600"
                                                            : isCompleted
                                                                ? "bg-amber-500/20 text-amber-400 group-hover:bg-amber-500/30"
                                                                : "bg-purple-500/10 text-purple-400 group-hover:bg-amber-500/20 group-hover:text-amber-400"
                                                    )}
                                                    whileHover={!isLocked ? { x: 4 } : {}}
                                                >
                                                    {isLocked ? (
                                                        <Lock className="h-4 w-4" />
                                                    ) : (
                                                        <ChevronRight className="h-5 w-5" />
                                                    )}
                                                </motion.div>
                                            </div>

                                            {/* Title */}
                                            <h4 className={cn(
                                                "font-semibold text-base mb-2 uppercase tracking-wide line-clamp-2 transition-colors duration-300",
                                                isLocked
                                                    ? "text-slate-500"
                                                    : isCompleted
                                                        ? "text-amber-300 group-hover:text-amber-200"
                                                        : "text-cyan-50 group-hover:text-white"
                                            )}>
                                                {quiz.title}
                                            </h4>

                                            {/* Meta Info */}
                                            <div className="flex items-center gap-3 text-xs">
                                                <span className={cn(
                                                    "font-mono uppercase",
                                                    isLocked ? "text-slate-600" : "text-slate-400"
                                                )}>
                                                    {quiz.questions} Questions
                                                </span>
                                                <span className="flex items-center gap-1.5 text-amber-400 font-medium">
                                                    <Zap className="h-3 w-3" />
                                                    {quiz.xp} Coins
                                                </span>
                                            </div>

                                            {/* Progress indicator for completed quizzes */}
                                            {isCompleted && !isLocked && (
                                                <motion.div
                                                    initial={{ scaleX: 0 }}
                                                    animate={{ scaleX: 1 }}
                                                    className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-amber-500 via-orange-400 to-amber-500 rounded-b-xl origin-left"
                                                />
                                            )}
                                        </div>

                                        {/* Corner Accents */}
                                        {!isLocked && (
                                            <>
                                                <div className={cn(
                                                    "absolute top-2 left-2 w-2 h-2 border-t border-l transition-all duration-300",
                                                    isCompleted ? "border-amber-400/50 group-hover:border-amber-400" : "border-purple-400/30 group-hover:border-amber-400"
                                                )} />
                                                <div className={cn(
                                                    "absolute bottom-2 right-2 w-2 h-2 border-b border-r transition-all duration-300",
                                                    isCompleted ? "border-amber-400/50 group-hover:border-amber-400" : "border-purple-400/30 group-hover:border-amber-400"
                                                )} />
                                            </>
                                        )}
                                    </motion.button>
                                );
                            })}
                        </motion.div>
                    </motion.div>
                )}

                {/* Assessments Section */}
                {content.assessments?.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <h3 className="mb-5 flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-emerald-400">
                            <div className="p-2.5 bg-emerald-400/10 border border-emerald-400/30 ">
                                🏆
                            </div>
                            <span>Final Protocols</span>
                            <span className="text-slate-500">({content.assessments.length})</span>
                        </h3>

                        <motion.div
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                        >
                            {content.assessments.map((assessment) => (
                                <motion.button
                                    key={assessment.id}
                                    variants={cardVariants}
                                    whileHover={{
                                        scale: isLocked ? 1 : 1.02,
                                        y: isLocked ? 0 : -4
                                    }}
                                    whileTap={{ scale: isLocked ? 1 : 0.98 }}
                                    onClick={(e) => handleItemClick(e, assessment.id, isLocked, () => { })}
                                    className={cn(
                                        "relative w-full text-left overflow-hidden   transition-all duration-300 group",
                                        shakingId === assessment.id && "animate-shake"
                                    )}
                                >
                                    {/* Card Background */}
                                    <div className={cn(
                                        "absolute inset-0    transition-all duration-300",
                                        isLocked
                                            ? "bg-slate-900/60 border border-slate-700/50"
                                            : "bg-linear-to-br from-slate-900/80 via-emerald-900/20 to-slate-900/80 border border-emerald-500/20 group-hover:border-emerald-400/50"
                                    )} />

                                    {/* Hover Glow Effect */}
                                    {!isLocked && (
                                        <motion.div
                                            className="absolute inset-0  bg-emerald-500/10 blur-xl -z-10"
                                            initial={{ opacity: 0 }}
                                            whileHover={{ opacity: 1 }}
                                        />
                                    )}

                                    {/* Card Content */}
                                    <div className="relative p-5">
                                        {/* Top Row: Icon & Arrow */}
                                        <div className="flex items-start justify-between mb-4">
                                            <motion.div
                                                className={cn(
                                                    "flex h-10 w-10 items-center justify-center text-xl  transition-all duration-300",
                                                    isLocked
                                                        ? "bg-slate-800/80 border border-slate-700"
                                                        : "bg-linear-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30"
                                                )}
                                                whileHover={!isLocked ? { scale: 1.1, rotate: 10 } : {}}
                                            >
                                                {isLocked ? <Lock className="h-4 w-4 text-slate-500" /> : "🏆"}
                                            </motion.div>

                                            <motion.div
                                                className={cn(
                                                    "flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300",
                                                    isLocked
                                                        ? "bg-slate-800/50 text-slate-600"
                                                        : "bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20"
                                                )}
                                                whileHover={!isLocked ? { x: 4 } : {}}
                                            >
                                                {isLocked ? (
                                                    <Lock className="h-4 w-4" />
                                                ) : (
                                                    <ChevronRight className="h-5 w-5" />
                                                )}
                                            </motion.div>
                                        </div>

                                        {/* Title */}
                                        <h4 className={cn(
                                            "font-semibold text-base mb-2 uppercase tracking-wide line-clamp-2 transition-colors duration-300",
                                            isLocked ? "text-slate-500" : "text-cyan-50 group-hover:text-white"
                                        )}>
                                            {assessment.title}
                                        </h4>

                                        {/* Meta Info */}
                                        <div className="flex items-center gap-3 text-xs">
                                            <span className={cn(
                                                "font-mono uppercase",
                                                isLocked ? "text-slate-600" : "text-slate-400"
                                            )}>
                                                {assessment.questions} Questions
                                            </span>
                                            <span className="flex items-center gap-1.5 text-amber-400 font-medium">
                                                <Zap className="h-3 w-3" />
                                                {assessment.xp} Coins
                                            </span>
                                        </div>
                                    </div>

                                    {/* Corner Accents */}
                                    {!isLocked && (
                                        <>
                                            <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-emerald-400/30 group-hover:border-emerald-400 transition-all duration-300" />
                                            <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-emerald-400/30 group-hover:border-emerald-400 transition-all duration-300" />
                                        </>
                                    )}
                                </motion.button>
                            ))}
                        </motion.div>
                    </motion.div>
                )}

                {/* Empty State for Locked Modules */}
                {isLocked && content.videos.length === 0 && content.quizzes.length === 0 && !content.assessments?.length && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center justify-center py-16 text-center"
                    >
                        <motion.div
                            className="relative mb-6 flex h-20 w-20 items-center justify-center bg-linear-to-br from-slate-900 to-slate-800 border-2 border-cyan-400/20 "
                            animate={{
                                boxShadow: ["0 0 20px rgba(34,211,238,0.1)", "0 0 40px rgba(34,211,238,0.2)", "0 0 20px rgba(34,211,238,0.1)"]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400/60 rounded-tl" />
                            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400/60 rounded-br" />
                            <Lock className="h-8 w-8 text-slate-500" />
                        </motion.div>
                        <p className="text-sm text-slate-400 uppercase tracking-widest font-semibold">
                            CONTENT ENCRYPTED
                        </p>
                        <p className="text-xs text-slate-600 mt-2 max-w-[200px]">
                            Unlock this module to access all learning materials
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};
