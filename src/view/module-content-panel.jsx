import { cn } from "@/lib/utils";
import { Play, CheckCircle2, ChevronRight, Zap, Lock, AlertCircle, BookCheck, Clock, Sparkles } from "lucide-react";
import { useLMSStore } from "@/store/lms-store";
import { modules } from "@/store/level-canvas-config";
import useSound from "@/hook/useSound";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import CyberpunkProgressBar from "@/components/ui/cyber-component/cyberpunk-progress-bar";
import TypeWriter from "@/components/typewritter";
import DecryptedText from "@/components/DecryptedText";
import HeaderCoin from "@/components/HeaderCoin";
import { Separator } from "@/components/ui/separator";

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
        "innovators-mind": { name: "Innovators Mind", image: "/assets/images/icons/Grade6_IM.png", description: "Learn the fundamentals of design thinking and innovation" },
        "trebuchet": { name: "Project Trebuchet", image: "/assets/images/icons/Grade6_Trebuchet.png", description: "Build and understand medieval engineering" },
        "motor-robot": { name: "Motor Robot", image: "/assets/images/icons/Grade6_MotorRobot.png", description: "Create your own motor-powered robot" },
        "tetris": { name: "Project Tetris", image: "/assets/images/icons/Grade6_Tetris.png", description: "Learn programming through the classic game" },
        "aqua-bridge": { name: "Aqua Bridge", image: "/assets/images/icons/Grade6_AquaBridge.png", description: "Design bridges that can withstand water pressure" },
        "drawing-bot": { name: "Drawing Bot", image: "/assets/images/icons/Grade6_DrawingBot.png", description: "Build an AI-powered drawing machine" },
        "soil-monitoring": { name: "Soil Monitoring", image: "/assets/images/icons/Grade6_SoilMonitoring.png", description: "Create smart sensors for agriculture" },
        "homopolar-motor": { name: "Homopolar Motor", image: "/assets/images/icons/Grade6_HomopolarMotor.png", description: "Quick experiment with electromagnetic motors" },
        "final-assessment": { name: "Final Assessment", image: "/assets/images/icons/Grade6_Assessment.png", description: "Complete your Grade 6 journey" },
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
                            {isLocked ? <Lock className="w-5 h-5 text-slate-600" /> : <img src={currentModule.image} alt={currentModule.name} />}
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
                                <DecryptedText
                                    text={currentModule.name}
                                    animateOn="view"
                                    revealDirection="center"
                                />
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
                            <div className="italic text-lime-300">
                                <TypeWriter
                                    text={`Finish the Videos, Claim Your Coins (${content.videos.length})`}
                                    delay={30}
                                />
                            </div>
                        </h3>
                        <motion.div
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ staggerChildren: 0.08 }}
                        >
                            {content.videos.map((video, index) => {
                                const isWatched = isVideoWatched(moduleId, video.id);
                                const isClicked = clickedId === video.id;

                                return (
                                    <motion.button
                                        key={video.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                        whileHover={!isLocked ? { y: -6 } : {}}
                                        whileTap={!isLocked ? { scale: 0.98 } : {}}
                                        onClick={(e) => handleItemClick(e, video.id, isLocked, () => openVideoModal(video))}
                                        disabled={isLocked}
                                        className={cn(
                                            "relative w-full group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50  overflow-hidden",
                                            "transition-all duration-500",
                                            shakingId === video.id && "animate-shake",
                                            isClicked && "scale-95",
                                            isLocked && "cursor-not-allowed opacity-80"
                                        )}
                                        aria-label={`${isLocked ? 'Locked' : isWatched ? 'Watched' : 'Watch'} video: ${video.title}`}
                                    >
                                        {/* Background Layer */}
                                        <div className="absolute inset-0">
                                            <div className={cn(
                                                "absolute inset-0 transition-all duration-700",
                                                isLocked
                                                    ? "bg-linear-to-br from-slate-900/90 to-slate-950/90"
                                                    : isWatched
                                                        ? "bg-linear-to-br from-emerald-950/60 via-emerald-900/30 to-slate-950/80"
                                                        : "bg-linear-to-br from-slate-900/90 via-slate-800/70 to-slate-950/90"
                                            )} />

                                            {/* Subtle hover glow */}
                                            {!isLocked && (
                                                <motion.div
                                                    className={cn(
                                                        "absolute inset-0 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700",
                                                        isWatched ? "bg-emerald-500/20" : "bg-cyan-500/25"
                                                    )}
                                                />
                                            )}
                                        </div>

                                        {/* Card Content */}
                                        <div className="relative p-6 flex flex-col h-full border border-b-0 rounded-b-sm">
                                            {/* Header: Badge + Play Button */}
                                            <div className="flex items-start justify-between mb-5">
                                                {/* Number / Status Badge */}
                                                <motion.div
                                                    className={cn(
                                                        "flex h-12 w-12 items-center justify-center backdrop-blur-md font-bold text-sm tracking-wider",
                                                        "border transition-all duration-500",
                                                        isLocked
                                                            ? "bg-slate-800/70 border-slate-700/50 text-slate-500"
                                                            : isWatched
                                                                ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300 shadow-lg shadow-emerald-500/20"
                                                                : "bg-cyan-500/10 border-cyan-500/30 text-cyan-300 group-hover:bg-cyan-500/20 group-hover:border-cyan-400/60"
                                                    )}
                                                    whileHover={!isLocked ? { scale: 1.1, rotate: 6 } : {}}
                                                >
                                                    {isLocked ? (
                                                        <Lock className="h-5 w-5" />
                                                    ) : isWatched ? (
                                                        <CheckCircle2 className="h-6 w-6" />
                                                    ) : (
                                                        String(index + 1).padStart(2, '0')
                                                    )}
                                                </motion.div>

                                                {/* Play Icon */}
                                                <motion.div
                                                    className={cn(
                                                        "flex h-14 w-14 items-center justify-center  backdrop-blur-md",
                                                        "transition-all duration-500 shadow-lg",
                                                        isLocked
                                                            ? "bg-slate-800/60 text-slate-600 border border-slate-700/50"
                                                            : isWatched
                                                                ? "bg-emerald-500/25 text-emerald-300 border border-emerald-500/40 group-hover:bg-emerald-500/35"
                                                                : "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 group-hover:bg-cyan-500/25 group-hover:scale-110"
                                                    )}
                                                    whileHover={!isLocked ? { scale: 1.15, rotate: 8 } : {}}
                                                    whileTap={!isLocked ? { scale: 0.95 } : {}}
                                                >
                                                    {isLocked ? (
                                                        <Lock className="h-5 w-5" />
                                                    ) : (
                                                        <Play className="h-6 w-6 fill-current ml-1" />
                                                    )}
                                                </motion.div>
                                            </div>

                                            {/* Title */}
                                            <h4 className={cn(
                                                "font-semibold text-start text-lg leading-tight mb-2 line-clamp-2 transition-colors duration-500",
                                                isLocked
                                                    ? "text-slate-500"
                                                    : isWatched
                                                        ? "text-emerald-200 group-hover:text-emerald-100"
                                                        : "text-white group-hover:text-cyan-50"
                                            )}>
                                                {video.title}
                                            </h4>
                                            <Separator className="mb-2" />

                                            {/* Metadata */}
                                            <div className="mt-auto flex items-center justify-between text-sm">
                                                <span className={cn(
                                                    "flex items-center gap-2 font-medium",
                                                    isLocked ? "text-slate-600" : "text-slate-400"
                                                )}>
                                                    <Clock className="h-4 w-4" />
                                                    {video.duration}
                                                </span>

                                                <span className="flex items-center gap-2 text-amber-400 font-semibold">
                                                    <HeaderCoin className="h-4 w-4" />
                                                    {video.xp} Coins
                                                </span>
                                            </div>

                                            {/* Progress Bar for Watched */}
                                            {isWatched && !isLocked && (
                                                <motion.div
                                                    className="absolute bottom-0 left-0 right-0 h-1.5 bg-linear-to-r from-emerald-500 via-emerald-400 to-emerald-600 rounded-b-2xl"
                                                    initial={{ scaleX: 0 }}
                                                    animate={{ scaleX: 1 }}
                                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                                    style={{ originX: 0 }}
                                                />
                                            )}
                                        </div>
                                        {!isLocked && (
                                            <>
                                                <motion.div
                                                    className={cn(
                                                        "absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 transition-colors duration-500",
                                                        isWatched
                                                            ? "border-emerald-400/60 group-hover:border-emerald-300"
                                                            : "border-cyan-400/40 group-hover:border-cyan-300"
                                                    )}
                                                    initial={{ opacity: 0, scale: 0 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: 0.2 }}
                                                />
                                                <motion.div
                                                    className={cn(
                                                        "absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 transition-colors duration-500",
                                                        isWatched
                                                            ? "border-emerald-400/60 group-hover:border-emerald-300"
                                                            : "border-cyan-400/40 group-hover:border-cyan-300"
                                                    )}
                                                    initial={{ opacity: 0, scale: 0 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: 0.3 }}
                                                />
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
                    <motion.section
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mb-12"
                    >
                        <h3 className="mb-6 flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-amber-400 ">
                            <div className="p-3 bg-amber-400/10 border border-amber-400/30 ">
                                <BookCheck className="h-5 w-5" />
                            </div>
                            <span className="italic">
                                Test Your Knowledge • Earn Your Coins ({content.quizzes.length})
                            </span>
                        </h3>

                        <motion.div
                            variants={{
                                visible: { transition: { staggerChildren: 0.08 } }
                            }}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 "
                        >
                            {content.quizzes.map((quiz, index) => {
                                const isCompleted = isQuizCompleted(moduleId, quiz.id);
                                const isClicked = clickedId === quiz.id;

                                return (
                                    <motion.button
                                        key={quiz.id}
                                        variants={cardVariants}
                                        whileHover={!isLocked ? { y: -8 } : {}}
                                        whileTap={!isLocked ? { scale: 0.97 } : {}}
                                        onClick={(e) => handleItemClick(e, quiz.id, isLocked, () => openQuizModal(quiz))}
                                        disabled={isLocked}
                                        className={cn(
                                            "relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50  overflow-hidden",
                                            "transition-all duration-500",
                                            shakingId === quiz.id && "animate-shake",
                                            isClicked && "scale-95",
                                            isLocked && "cursor-not-allowed opacity-70"
                                        )}
                                        aria-label={`${isLocked ? 'Locked' : isCompleted ? 'Completed' : 'Start'} quiz: ${quiz.title}`}
                                    >
                                        {/* Background */}
                                        <div className="absolute inset-0">
                                            <div className={cn(
                                                "absolute inset-0 transition-all duration-700",
                                                isLocked
                                                    ? "bg-linear-to-br from-slate-900/90 to-slate-950/90"
                                                    : isCompleted
                                                        ? "bg-linear-to-br from-amber-950/70 via-orange-900/40 to-slate-950/80"
                                                        : "bg-linear-to-br from-slate-900/90 via-purple-900/30 to-slate-950/90"
                                            )} />

                                            {/* Subtle hover glow */}
                                            {!isLocked && (
                                                <motion.div
                                                    className="absolute inset-0 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                                                    style={{ background: isCompleted ? "rgba(251, 146, 60, 0.25)" : "rgba(168, 85, 247, 0.2)" }}
                                                />
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="relative p-6 flex flex-col h-full border border-amber-400/20 border-b-0 rounded-b-sm">
                                            <div className="flex items-start justify-between mb-5">
                                                {/* Status Badge */}
                                                <motion.div
                                                    className={cn(
                                                        "flex h-12 w-12 items-center justify-center backdrop-blur-md font-bold",
                                                        "border transition-all duration-500 shadow-lg",
                                                        isLocked
                                                            ? "bg-slate-800/70 border-slate-700/50 text-slate-500"
                                                            : isCompleted
                                                                ? "bg-linear-to-br from-amber-500 to-orange-500 text-black border-amber-500/50 shadow-amber-500/30"
                                                                : "bg-linear-to-br from-purple-500/20 to-amber-500/15 border-amber-500/30 text-amber-300 group-hover:border-amber-400/60"
                                                    )}
                                                    whileHover={!isLocked ? { scale: 1.1, rotate: -6 } : {}}
                                                >
                                                    {isLocked ? (
                                                        <Lock className="h-5 w-5" />
                                                    ) : isCompleted ? (
                                                        <CheckCircle2 className="h-6 w-6" />
                                                    ) : (
                                                        <BookCheck className="h-6 w-6" />
                                                    )}
                                                </motion.div>

                                                {/* Action Arrow */}
                                                <motion.div
                                                    className={cn(
                                                        "flex h-14 w-14 items-center justify-center backdrop-blur-md shadow-lg",
                                                        "transition-all duration-500",
                                                        isLocked
                                                            ? "bg-slate-800/60 text-slate-600"
                                                            : isCompleted
                                                                ? "bg-amber-500/25 text-amber-300 border border-amber-500/40 group-hover:bg-amber-500/35"
                                                                : "bg-purple-500/15 text-purple-300 border border-purple-500/30 group-hover:bg-amber-500/20 group-hover:text-amber-300 group-hover:scale-110"
                                                    )}
                                                    whileHover={!isLocked ? { x: 6, rotate: 12 } : {}}
                                                    whileTap={!isLocked ? { scale: 0.9 } : {}}
                                                >
                                                    {isLocked ? <Lock className="h-5 w-5" /> : <ChevronRight className="h-7 w-7" />}
                                                </motion.div>
                                            </div>

                                            <h4 className={cn(
                                                "font-semibold text-lg text-start leading-tight mb-2 uppercase tracking-wider line-clamp-2 transition-colors duration-500",
                                                isLocked
                                                    ? "text-slate-500"
                                                    : isCompleted
                                                        ? "text-amber-200 group-hover:text-amber-100"
                                                        : "text-white group-hover:text-amber-50"
                                            )}>
                                                {quiz.title}
                                            </h4>
                                            <Separator className="mb-2 bg-amber-200" />

                                            <div className="mt-auto flex items-center justify-between text-sm">
                                                <span className={cn(
                                                    "font-medium uppercase tracking-wide",
                                                    isLocked ? "text-slate-600" : "text-slate-400"
                                                )}>
                                                    {quiz.questions} Questions
                                                </span>

                                                <span className="flex items-center gap-2 text-amber-400 font-bold">
                                                    <Zap className="h-4 w-4 fill-current" />
                                                    {quiz.xp} Coins
                                                </span>
                                            </div>

                                            {/* Completion Bar */}
                                            {isCompleted && !isLocked && (
                                                <motion.div
                                                    className="absolute bottom-0 left-0 right-0 h-1.5 bg-linear-to-r from-amber-500 via-orange-400 to-amber-600 rounded-b-2xl"
                                                    initial={{ scaleX: 0 }}
                                                    animate={{ scaleX: 1 }}
                                                    transition={{ duration: 0.9, ease: "easeOut" }}
                                                    style={{ originX: 0 }}
                                                />
                                            )}
                                        </div>

                                        {/* Corner Accents */}
                                        {!isLocked && (
                                            <>
                                                <motion.div
                                                    className={cn(
                                                        "absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 rounded-tl transition-colors duration-500",
                                                        isCompleted
                                                            ? "border-amber-400/60 group-hover:border-amber-300"
                                                            : "border-purple-400/40 group-hover:border-amber-300"
                                                    )}
                                                    initial={{ opacity: 0, scale: 0 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: 0.2 + index * 0.05 }}
                                                />
                                                <motion.div
                                                    className={cn(
                                                        "absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 rounded-br transition-colors duration-500",
                                                        isCompleted
                                                            ? "border-amber-400/60 group-hover:border-amber-300"
                                                            : "border-purple-400/40 group-hover:border-amber-300"
                                                    )}
                                                    initial={{ opacity: 0, scale: 0 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: 0.3 + index * 0.05 }}
                                                />
                                            </>
                                        )}
                                    </motion.button>
                                );
                            })}
                        </motion.div>
                    </motion.section>
                )}

                {/* Assessments Section */}
                {content.assessments?.length > 0 && (
                    <motion.section
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="mb-12"
                    >
                        <h3 className="mb-6 flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-emerald-400">
                            <div className="p-3 bg-emerald-400/10 border border-emerald-400/30 ">
                                <Trophy className="h-5 w-5" />
                            </div>
                            <span>Final Assessments ({content.assessments.length})</span>
                        </h3>

                        <motion.div
                            variants={{
                                visible: { transition: { staggerChildren: 0.08 } }
                            }}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {content.assessments.map((assessment, index) => {
                                return (
                                    <motion.button
                                        key={assessment.id}
                                        variants={cardVariants}
                                        whileHover={!isLocked ? { y: -8 } : {}}
                                        whileTap={!isLocked ? { scale: 0.97 } : {}}
                                        onClick={(e) => handleItemClick(e, assessment.id, isLocked, () => openAssessmentModal?.(assessment))}
                                        disabled={isLocked}
                                        className={cn(
                                            "relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50  overflow-hidden",
                                            "transition-all duration-500",
                                            shakingId === assessment.id && "animate-shake",
                                            isLocked && "cursor-not-allowed opacity-70"
                                        )}
                                        aria-label={`${isLocked ? 'Locked' : 'Start'} final assessment: ${assessment.title}`}
                                    >
                                        {/* Background */}
                                        <div className="absolute inset-0">
                                            <div className={cn(
                                                "absolute inset-0 transition-all duration-700",
                                                isLocked
                                                    ? "bg-linear-to-br from-slate-900/90 to-slate-950/90"
                                                    : "bg-linear-to-br from-slate-900/90 via-emerald-900/30 to-slate-950/90"
                                            )} />

                                            {!isLocked && (
                                                <motion.div
                                                    className="absolute inset-0 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-emerald-500/25"
                                                />
                                            )}
                                        </div>

                                        <div className="relative p-6 flex flex-col h-full">
                                            <div className="flex items-start justify-between mb-5">
                                                <motion.div
                                                    className={cn(
                                                        "flex h-12 w-12 items-center justify-center backdrop-blur-md text-2xl",
                                                        "border transition-all duration-500 shadow-lg",
                                                        isLocked
                                                            ? "bg-slate-800/70 border-slate-700/50 text-slate-500"
                                                            : "bg-linear-to-br from-emerald-500/20 to-teal-500/20 border-emerald-500/40 text-emerald-300 shadow-emerald-500/20"
                                                    )}
                                                    whileHover={!isLocked ? { scale: 1.1, rotate: 12 } : {}}
                                                >
                                                    {isLocked ? <Lock className="h-5 w-5" /> : <Trophy className="h-7 w-7" />}
                                                </motion.div>

                                                <motion.div
                                                    className={cn(
                                                        "flex h-14 w-14 items-center justify-center  backdrop-blur-md shadow-lg",
                                                        "transition-all duration-500",
                                                        isLocked
                                                            ? "bg-slate-800/60 text-slate-600"
                                                            : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 group-hover:bg-emerald-500/30 group-hover:scale-110"
                                                    )}
                                                    whileHover={!isLocked ? { x: 6 } : {}}
                                                >
                                                    {isLocked ? <Lock className="h-5 w-5" /> : <ChevronRight className="h-7 w-7" />}
                                                </motion.div>
                                            </div>

                                            <h4 className={cn(
                                                "font-semibold text-lg leading-tight mb-4 uppercase tracking-wider line-clamp-2 transition-colors duration-500",
                                                isLocked ? "text-slate-500" : "text-white group-hover:text-emerald-50"
                                            )}>
                                                {assessment.title}
                                            </h4>

                                            <div className="mt-auto flex items-center justify-between text-sm">
                                                <span className={cn(
                                                    "font-medium uppercase tracking-wide",
                                                    isLocked ? "text-slate-600" : "text-slate-400"
                                                )}>
                                                    {assessment.questions} Questions
                                                </span>

                                                <span className="flex items-center gap-2 text-amber-400 font-bold">
                                                    <Zap className="h-4 w-4 fill-current" />
                                                    {assessment.xp} Coins
                                                </span>
                                            </div>
                                        </div>

                                        {/* Corner Accents */}
                                        {!isLocked && (
                                            <>
                                                <motion.div
                                                    className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-emerald-400/50 rounded-tl group-hover:border-emerald-300 transition-colors duration-500"
                                                    initial={{ opacity: 0, scale: 0 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: 0.2 + index * 0.05 }}
                                                />
                                                <motion.div
                                                    className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-emerald-400/50 rounded-br group-hover:border-emerald-300 transition-colors duration-500"
                                                    initial={{ opacity: 0, scale: 0 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: 0.3 + index * 0.05 }}
                                                />
                                            </>
                                        )}
                                    </motion.button>
                                );
                            })}
                        </motion.div>
                    </motion.section>
                )}

                {/* Locked Empty State - Enhanced */}
                {isLocked && content.videos.length === 0 && content.quizzes.length === 0 && !content.assessments?.length && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="flex flex-col items-center justify-center py-24 text-center"
                    >
                        <motion.div
                            className="relative mb-8 flex h-32 w-32 items-center justify-center rounded-3xl bg-linear-to-br from-slate-900 to-slate-950 border-2 border-dashed border-cyan-400/30"
                            animate={{
                                boxShadow: [
                                    "0 0 30px rgba(34,211,238,0.15)",
                                    "0 0 60px rgba(34,211,238,0.25)",
                                    "0 0 30px rgba(34,211,238,0.15)"
                                ]
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                        >
                            <div className="absolute inset-4 bg-linear-to-br from-cyan-500/5 to-transparent blur-xl" />
                            <Lock className="h-16 w-16 text-cyan-400/60" />
                        </motion.div>

                        <p className="text-xl font-bold uppercase tracking-widest text-slate-300 mb-2">
                            Module Locked
                        </p>
                        <p className="text-sm text-slate-500 uppercase tracking-wider">
                            Complete previous modules to unlock encrypted content
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    );
};
