import { cn } from "@/lib/utils";
import { Play, CheckCircle2, ChevronRight, Zap, Lock, AlertCircle, BookCheck, Clock, Sparkles, Trophy, ShieldQuestionMark } from "lucide-react";
import { useLMSStore } from "@/store/lms-store";
import { modules } from "@/store/level-canvas-config";
import { instructorConfig, walkthroughDialogues } from "@/config/instructor-config";
import useSound from "@/hook/useSound";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import CyberpunkProgressBar from "@/components/ui/cyber-component/cyberpunk-progress-bar";
import TypeWriter from "@/components/typewritter";
import DecryptedText from "@/components/DecryptedText";
import HeaderCoin from "@/components/HeaderCoin";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import CyberpunkButton from "@/components/ui/cyber-button";
import { useInstructor } from "@/provider/InstructorProvider";

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
    const [glitch, setGlitch] = useState(false)
    const {
        player,
        getCurrentModuleContent,
        isVideoWatched,
        isQuizCompleted,
        openVideoModal,
        openQuizModal,
        openAssessmentModal,
        getModuleProgress,
    } = useLMSStore();
    const { playSound, playClick } = useSound();
    const { showWalkthrough } = useInstructor();

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

    const handleItemClick = (e, type, id, locked, action) => {
        e.stopPropagation();
        if (locked) {
            setShakingId(id);
            playSound("disabled");
            // if (type === "video") {
            //     showWalkthrough(walkthroughDialogues['locked-video']);
            // } else if (type === "quiz") {
            //     showWalkthrough(walkthroughDialogues['locked-quiz'](id === 'q1'));
            // } else if (type === "assessment") {
            //     showWalkthrough(walkthroughDialogues['locked-assessment']);
            // }
            setTimeout(() => setShakingId(null), 500);
            return;
        } else {
            // if (type === "video") {
            //     showWalkthrough(walkthroughDialogues['video']);
            // }
            setClickedId(id);
            playClick();
            setTimeout(() => {
                setClickedId(null);
                action();
            }, 150);
        }
    };

    return (
        <div className="relative backdrop-blur-xl bg-background/10">
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
                                    Progress: {progress}%
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

                                // Sequential logic:
                                // 1. Module must be unlocked
                                // 2. First video is always unlocked if module is unlocked
                                // 3. Subsequent videos are unlocked only if the previous video is watched
                                const isModuleLocked = moduleStatus === "locked";
                                const isPreviousWatched = index === 0 || isVideoWatched(moduleId, content.videos[index - 1].id);
                                const isVideoLocked = isModuleLocked || !isPreviousWatched;
                                const isActive = !isWatched && !isVideoLocked;

                                let color = "slate-500";
                                let badgeText = "Locked";

                                if (isWatched) {
                                    color = "emerald-500";
                                    badgeText = "Finished";
                                } else if (isActive) {
                                    color = "green-600";
                                    badgeText = "Currently Playing";
                                } else if (isVideoLocked) {
                                    color = "red-500";
                                    badgeText = "Pending";
                                }


                                return (
                                    <motion.div
                                        key={video.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                        whileHover={!isVideoLocked ? { y: -6 } : {}}
                                        whileTap={!isVideoLocked ? { scale: 0.98 } : {}}
                                        onClick={(e) => handleItemClick(e, "video", video.id, isVideoLocked, () => openVideoModal(video))}
                                        // disabled={isVideoLocked}
                                        data-instructor-target="mission-progress"
                                        className={cn(
                                            "relative w-full group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 overflow-hidden",
                                            "transition-all duration-500",
                                            shakingId === video.id && "animate-shake",
                                            isClicked && "scale-95",
                                            isVideoLocked && "cursor-not-allowed opacity-80"
                                        )}
                                        aria-label={`${isVideoLocked ? 'Locked' : isWatched ? 'Watched' : 'Watch'} video: ${video.title}`}
                                    >
                                        {/* Thumbnail Section */}
                                        <div className="relative w-full aspect-video overflow-hidden">
                                            {/* Thumbnail Image */}
                                            <img
                                                src={`/assets/thumb.jpeg`}
                                                alt={video.title}
                                                className={cn(
                                                    "w-full h-full object-cover transition-all duration-700",
                                                    isVideoLocked && "grayscale",
                                                    isActive && "animate-pulse",
                                                    !isVideoLocked && "group-hover:scale-110"
                                                )}
                                            />

                                            {/* Gradient Overlay */}
                                            <div className={cn(
                                                "absolute inset-0 transition-all duration-700",
                                                isVideoLocked
                                                    ? "bg-linear-to-t from-slate-950/95 via-slate-900/70 to-slate-900/50"
                                                    : isWatched
                                                        ? "bg-linear-to-t from-emerald-950/80 via-slate-900/40 to-transparent group-hover:from-emerald-950/90"
                                                        : "bg-linear-to-t from-slate-950/80 via-slate-900/40 to-transparent group-hover:from-slate-950/90"
                                            )} />
                                            <div className="absolute top-3 right-3">
                                                <div
                                                    className={cn(
                                                        "relative group font-mono font-normal text-xs px-3 py-1 backdrop-blur-xl",
                                                        `bg-${color}`,
                                                        "transition-all duration-200 ease-out",
                                                        "disabled:opacity-50 disabled:cursor-not-allowed",
                                                        "clip-path-slant"
                                                    )}
                                                    style={{
                                                        clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)'
                                                    }}
                                                >
                                                    <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-in-out skew-x-12 pointer-events-none" />

                                                    <span className="relative text-center z-10 flex items-center justify-center gap-2">
                                                        {badgeText}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Glassmorphic Play Button Overlay */}
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <motion.div
                                                    className={cn(
                                                        "relative flex items-center justify-center",
                                                        isVideoLocked
                                                            ? " border-slate-700/50"
                                                            : isWatched
                                                                ? "bg-emerald-500/20 rounded-full backdrop-blur-3xl"
                                                                : ""
                                                    )}
                                                    whileHover={!isVideoLocked ? { scale: 1.15 } : {}}
                                                    whileTap={!isVideoLocked ? { scale: 0.95 } : {}}
                                                >
                                                    {/* Inner glow effect */}
                                                    {!isVideoLocked && (
                                                        <motion.div
                                                            className={cn(
                                                                "absolute inset-0 blur-xl opacity-50",
                                                            )}
                                                            animate={{
                                                                scale: [1, 1.2, 1],
                                                                opacity: [0.5, 0.7, 0.5]
                                                            }}
                                                            transition={{
                                                                duration: 2,
                                                                repeat: Infinity,
                                                                ease: "easeInOut"
                                                            }}
                                                        />
                                                    )}

                                                    {isVideoLocked ? (
                                                        <Lock className="h-8 w-8 text-slate-500 relative z-10" />
                                                    ) : isWatched ? (
                                                        <CheckCircle2 className="h-10 w-10 text-emerald-300 relative z-10" />
                                                    ) : (
                                                        <div className="flex items-center gap-1 text-white border border-white/50 bg-[#153543] transition-all duration-500 px-2 py-2 rounded-2xl">
                                                            <Play className="h-4 w-4  fill-current relative z-10 transition-colors ml-1" /> Play Video
                                                        </div>
                                                    )}
                                                </motion.div>
                                            </div>

                                            {/* Video Number Badge */}
                                            <motion.div
                                                className={cn(
                                                    "absolute top-3 left-3 flex h-10 w-10 items-center justify-center backdrop-blur-md font-bold text-sm tracking-wider",
                                                    "border-2 transition-all duration-500 z-10",
                                                    isVideoLocked
                                                        ? "bg-slate-900/70 border-slate-700/50 text-slate-500"
                                                        : isWatched
                                                            ? "bg-emerald-500/25 border-emerald-500/50 text-emerald-300 shadow-lg shadow-emerald-500/20"
                                                            : "bg-cyan-500/15 border-cyan-500/40 text-cyan-300 group-hover:bg-cyan-500/25 group-hover:border-cyan-400/70"
                                                )}
                                            >
                                                {String(index + 1).padStart(2, '0')}
                                            </motion.div>

                                            {/* Duration Badge */}
                                            <div className={cn(
                                                "absolute bottom-3 right-3 px-3 py-1.5 backdrop-blur-md font-medium text-xs tracking-wide",
                                                "border transition-all duration-500 flex items-center gap-1.5 z-10",
                                                isVideoLocked
                                                    ? "bg-slate-900/70 border-slate-700/50 text-slate-400"
                                                    : "bg-slate-900/80 border-slate-700/60 text-slate-300"
                                            )}>
                                                <Clock className="h-3 w-3" />
                                                {video.duration}
                                            </div>

                                            {/* Watched Progress Bar */}
                                            {isWatched && !isVideoLocked && (
                                                <motion.div
                                                    className="absolute bottom-0 left-0 right-0 bg-linear-to-r from-emerald-500 via-emerald-400 to-emerald-600 z-10"
                                                    initial={{ scaleX: 0 }}
                                                    animate={{ scaleX: 1 }}
                                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                                    style={{ originX: 0 }}
                                                />
                                            )}
                                        </div>

                                        {/* Content Section */}
                                        <div className="relative p-5 flex flex-col border-x border-b">
                                            <div className="absolute inset-0">
                                                <div className={cn(
                                                    "absolute inset-0 transition-all duration-700",
                                                    isVideoLocked
                                                        ? "bg-linear-to-br from-slate-900/90 to-slate-950/90"
                                                        : isWatched
                                                            ? "bg-linear-to-br from-emerald-950/60 via-emerald-900/30 to-slate-950/80"
                                                            : "bg-linear-to-br from-slate-900/90 via-slate-800/70 to-slate-950/90"
                                                )} />
                                            </div>

                                            <h4 className={cn(
                                                "relative font-semibold text-start text-base leading-tight mb-3 line-clamp-2 transition-colors duration-500",
                                                isVideoLocked
                                                    ? "text-slate-500"
                                                    : isWatched
                                                        ? "text-emerald-200 group-hover:text-emerald-100"
                                                        : "text-white group-hover:text-cyan-50"
                                            )}>
                                                {video.title}
                                            </h4>

                                            <Separator className="mb-3 relative" />

                                            <div className="relative flex items-center justify-between text-sm">
                                                <span className="flex items-center gap-2 text-amber-400 font-semibold">
                                                    <HeaderCoin className="h-4 w-4" />
                                                    {video.xp} Coins
                                                </span>
                                            </div>
                                        </div>

                                        {/* Corner Accents */}
                                        {!isVideoLocked && (
                                            <>
                                                <motion.div
                                                    className={cn(
                                                        "absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 transition-colors duration-500 z-20",
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
                                                        "absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 transition-colors duration-500 z-20",
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
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </motion.div>
                )}
                {/* Quizzes Section */}
                {content.quizzes.length > 0 && (
                    <motion.section
                        className={"mb-12"}
                    >
                        <h3 className={cn("mb-6 flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-lime-300")}>
                            <div className="p-3 bg-lime-400/10 border border-lime-400/30 ">
                                <ShieldQuestionMark className="h-5 w-5" />
                            </div>
                            <div className="italic text-lime-300">
                                <TypeWriter
                                    text={`Test Your Knowledge, Collect Your Coins (${content.quizzes.length})`}
                                    delay={30}
                                />
                            </div>
                        </h3>

                        <motion.div
                            className={cn("grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6", glitch && "animate-glitch")}
                        >
                            {content.quizzes.map((quiz, index) => {
                                const isCompleted = isQuizCompleted(moduleId, quiz.id);
                                const isClicked = clickedId === quiz.id;

                                // Sequential logic for quizzes:
                                // 1. All videos in module must be watched
                                // 2. Quizzes must be completed in order
                                const allVideosWatched = content.videos.every(v => isVideoWatched(moduleId, v.id));
                                const previousQuizzesCompleted = index === 0 || isQuizCompleted(moduleId, content.quizzes[index - 1].id);
                                const isQuizLocked = moduleStatus === "locked" || !allVideosWatched || !previousQuizzesCompleted;
                                const isQuizActive = !isQuizLocked && !isCompleted;

                                return (
                                    <motion.div
                                        key={quiz.id}
                                        variants={cardVariants}
                                        onMouseEnter={() => setGlitch(true)}
                                        onMouseLeave={() => setGlitch(false)}
                                        className={cn(
                                            "relative flex flex-col w-full group overflow-hidden border border-cyan-500/20 bg-slate-900/40 backdrop-blur-md transition-all duration-500",
                                            shakingId === quiz.id && "animate-shake",
                                            isClicked && "scale-[0.98]",
                                            isQuizLocked && "opacity-60 grayscale-[0.8]",
                                            !isQuizLocked && "hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.1)]"
                                        )}
                                    >
                                        {/* Image Header Area */}
                                        <div className="relative aspect-video w-full overflow-hidden bg-slate-950/50">
                                            {/* Top Gradient Overlay */}
                                            <div className="absolute inset-0 bg-linear-to-b from-slate-950/60 via-transparent to-transparent z-10" />

                                            {/* Quiz Icon/Character */}
                                            <div className="absolute inset-0 w-full">
                                                <motion.img
                                                    src={`/assets/icon/question-${index + 1}.png`}
                                                    alt=""
                                                    className="z-10 h-72 w-full transition-all duration-700 animate-pulse"

                                                />
                                            </div>

                                            {/* Grid Background Effect */}
                                            <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.05)_1px,transparent_1px)] bg-size-[20px_20px] mask-[radial-gradient(ellipse_at_center,black,transparent_70%)]" />

                                            {/* Status Badge */}
                                            <div className="absolute top-3 left-3 z-20">
                                                <div className={cn(
                                                    "px-3 py-1 text-[10px] font-bold uppercase tracking-widest border backdrop-blur-md",
                                                    isCompleted
                                                        ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400"
                                                        : isQuizLocked
                                                            ? "border-slate-500/50 bg-slate-500/10 text-slate-400"
                                                            : "border-cyan-500/50 bg-cyan-500/10 text-cyan-400"
                                                )}>
                                                    {isCompleted ? "Completed" : isQuizLocked ? "Locked" : "Available"}
                                                </div>
                                            </div>

                                            {/* Questions Count Badge */}
                                            <div className="absolute bottom-3 right-3 z-20">
                                                <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border rounded-md border-emerald-500/50 text-[10px] font-mono text-emerald-400">
                                                    <HeaderCoin />
                                                    <span className="text-xl font-black leading-none">{quiz.xp}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Info Row (Title & Coins) */}
                                        <div className="p-5 flex items-center justify-between border-t border-cyan-500/10">
                                            <div className="flex-1 pr-4">
                                                <h4 className="text-lg font-black text-white uppercase tracking-wider leading-tight italic truncate">
                                                    {quiz.title}
                                                </h4>
                                            </div>
                                        </div>

                                        {/* Action Button Section */}
                                        <div className="mt-auto p-4 pt-0">
                                            <motion.div
                                                className={cn(
                                                    "relative w-full group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 overflow-hidden",
                                                    "transition-all duration-500",
                                                    isClicked && "scale-95",
                                                    isQuizLocked && "cursor-not-allowed animate-shake opacity-80"
                                                )}

                                                onClick={(e) => handleItemClick(e, "quiz", quiz.id, isQuizLocked, () => openQuizModal(quiz))}
                                            >
                                                <CyberpunkButton
                                                    variant={isQuizLocked ? "danger" : "secondary"}
                                                    className="w-full text-center relative group/btn overflow-hidden"
                                                >
                                                    <span className={cn(
                                                        "text-xs font-black font-mono",
                                                        isQuizLocked ? "text-slate-500" : "text-white"
                                                    )}>
                                                        {isCompleted ? "RETAKE QUIZ" : isQuizLocked ? "ACCESS DENIED" : "START QUIZ"}
                                                    </span>
                                                    {!isQuizLocked && (
                                                        <ChevronRight className={cn(
                                                            "h-4 w-4 transition-transform group-hover/btn:translate-x-1",
                                                            isCompleted ? "text-indigo-400" : "text-cyan-400"
                                                        )} />
                                                    )}
                                                    {isQuizLocked && <Lock className="h-3.5 w-3.5 text-slate-600" />}
                                                </CyberpunkButton>

                                                {/* Hover Glow */}
                                                {!isQuizLocked && (
                                                    <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity bg-linear-to-r from-transparent via-white/10 to-transparent skew-x-12 -translate-x-full animate-shimmer" />
                                                )}
                                            </motion.div>
                                        </div>

                                        {/* Corner Accents */}
                                        {!isQuizLocked && (
                                            <>
                                                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-400/40" />
                                                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-400/40" />
                                                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-400/40" />
                                                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-400/40" />
                                            </>
                                        )}
                                    </motion.div>

                                );
                            })}
                        </motion.div>
                    </motion.section>
                )}

                {/* Assessments Section */}
                {content.assessments?.length > 0 && (
                    <motion.section
                        className={"mb-12"}
                    >
                        <h3 className={cn("mb-6 flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-emerald-300")}>
                            <div className="p-3 bg-emerald-400/10 border border-emerald-400/30 ">
                                <Trophy className="h-5 w-5" />
                            </div>
                            <div className="italic text-emerald-300">
                                <TypeWriter
                                    text={`Final Assessments, Claim Your Certification (${content.assessments.length})`}
                                    delay={30}
                                />
                            </div>
                        </h3>

                        <motion.div
                            variants={{
                                visible: { transition: { staggerChildren: 0.1 } }
                            }}
                            initial="hidden"
                            animate="visible"
                            className={cn("grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6", glitch && "animate-glitch")}
                        >
                            {content.assessments.map((assessment, index) => {
                                const isCompleted = player.progress[moduleId]?.completedAssessments?.includes(assessment.id) || false;
                                const isClicked = clickedId === assessment.id;

                                // Sequential logic for assessments:
                                // 1. All quizzes in module must be completed
                                const allQuizzesCompleted = content.quizzes.every(q => isQuizCompleted(moduleId, q.id));
                                const isAssessmentLocked = moduleStatus === "locked" || !allQuizzesCompleted;

                                return (
                                    <motion.div
                                        key={assessment.id}
                                        variants={cardVariants}
                                        onMouseEnter={() => setGlitch(true)}
                                        onMouseLeave={() => setGlitch(false)}
                                        className={cn(
                                            "relative flex flex-col w-full group overflow-hidden border border-emerald-500/20 bg-slate-900/40 backdrop-blur-md transition-all duration-500",
                                            shakingId === assessment.id && "animate-shake",
                                            isClicked && "scale-[0.98]",
                                            isAssessmentLocked && "opacity-60 grayscale-[0.8]",
                                            !isAssessmentLocked && "hover:border-emerald-400/50 hover:shadow-[0_0_30px_rgba(52,211,153,0.1)]"
                                        )}
                                    >
                                        {/* Image Header Area */}
                                        <div className="relative aspect-video w-full overflow-hidden bg-slate-950/50">
                                            {/* Top Gradient Overlay */}
                                            <div className="absolute inset-0 bg-linear-to-b from-slate-950/60 via-transparent to-transparent z-10" />

                                            {/* Assessment Icon/Character */}
                                            <div className="absolute inset-0 w-full">
                                                <motion.img
                                                    src={`/assets/icon/question-${(index % 3) + 1}.png`}
                                                    alt=""
                                                    className="z-10 h-72 w-full transition-all duration-700 animate-pulse"
                                                />
                                            </div>

                                            {/* Grid Background Effect */}
                                            <div className="absolute inset-0 bg-[linear-gradient(rgba(52,211,153,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(52,211,153,0.05)_1px,transparent_1px)] bg-size-[20px_20px] mask-[radial-gradient(ellipse_at_center,black,transparent_70%)]" />

                                            {/* Status Badge */}
                                            <div className="absolute top-3 left-3 z-20">
                                                <div className={cn(
                                                    "px-3 py-1 text-[10px] font-bold uppercase tracking-widest border backdrop-blur-md",
                                                    isCompleted
                                                        ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400"
                                                        : isAssessmentLocked
                                                            ? "border-slate-500/50 bg-slate-500/10 text-slate-400"
                                                            : "border-emerald-500/50 bg-emerald-500/10 text-emerald-400"
                                                )}>
                                                    {isCompleted ? "Completed" : isAssessmentLocked ? "Locked" : "Available"}
                                                </div>
                                            </div>

                                            {/* XP Badge */}
                                            <div className="absolute bottom-3 right-3 z-20">
                                                <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border rounded-md border-emerald-500/50 text-[10px] font-mono text-emerald-400">
                                                    <HeaderCoin />
                                                    <span className="text-xl font-black leading-none">{assessment.xp}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Info Row (Title) */}
                                        <div className="p-5 flex items-center justify-between border-t border-emerald-500/10">
                                            <div className="flex-1 pr-4">
                                                <h4 className="text-lg font-black text-white uppercase tracking-wider leading-tight italic truncate">
                                                    {assessment.title}
                                                </h4>
                                            </div>
                                        </div>

                                        {/* Action Button Section */}
                                        <div className="mt-auto p-4 pt-0">
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.4, ease: "easeOut" }}
                                                whileHover={!isAssessmentLocked ? { y: -6 } : {}}
                                                whileTap={!isAssessmentLocked ? { scale: 0.98 } : {}}
                                                className={cn(
                                                    "relative w-full group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50 overflow-hidden",
                                                    "transition-all duration-500",
                                                    isClicked && "scale-95",
                                                    isAssessmentLocked && "cursor-not-allowed animate-shake opacity-80"
                                                )}
                                                onClick={(e) => handleItemClick(e, "assessment", assessment.id, isAssessmentLocked, () => openAssessmentModal(assessment))}
                                            >
                                                <CyberpunkButton
                                                    variant={isAssessmentLocked ? "danger" : "secondary"}
                                                    className="w-full text-center relative group/btn overflow-hidden"
                                                >
                                                    <span className={cn(
                                                        "text-xs font-black font-mono",
                                                        isAssessmentLocked ? "text-slate-500" : "text-white"
                                                    )}>
                                                        {isCompleted ? "RETAKE ASSESSMENT" : isAssessmentLocked ? "ACCESS DENIED" : "START ASSESSMENT"}
                                                    </span>
                                                    {!isAssessmentLocked && (
                                                        <ChevronRight className={cn(
                                                            "h-4 w-4 transition-transform group-hover/btn:translate-x-1",
                                                            isCompleted ? "text-indigo-400" : "text-emerald-400"
                                                        )} />
                                                    )}
                                                    {isAssessmentLocked && <Lock className="h-3.5 w-3.5 text-slate-600" />}
                                                </CyberpunkButton>

                                                {/* Hover Glow */}
                                                {!isAssessmentLocked && (
                                                    <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity bg-linear-to-r from-transparent via-white/10 to-transparent skew-x-12 -translate-x-full animate-shimmer" />
                                                )}
                                            </motion.div>
                                        </div>

                                        {/* Corner Accents */}
                                        {!isAssessmentLocked && (
                                            <>
                                                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-emerald-400/40" />
                                                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-emerald-400/40" />
                                                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-emerald-400/40" />
                                                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-emerald-400/40" />
                                            </>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </motion.section>
                )
                }

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
