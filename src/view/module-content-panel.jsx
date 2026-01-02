import { cn } from "@/lib/utils";
import { Play, CheckCircle2, ChevronRight, Zap, Lock, AlertCircle, BookCheck } from "lucide-react";
import { useLMSStore } from "@/store/lms-store";
import { modules } from "@/store/level-canvas-config";
import useSound from "@/hook/useSound";

import { useState } from "react";

export const ModuleContentPanel = () => {
    const [shakingId, setShakingId] = useState(null);
    const {
        player,
        getCurrentModuleContent,
        isVideoWatched,
        isQuizCompleted,
        openVideoModal,
        openQuizModal,
        closeContentPanel,
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
        playClick();
        action();
    };

    return (
        <div className="relative bg-slate-950/95 shadow-xl border">
            <div className="pointer-events-none absolute inset-0 z-20 opacity-[0.02] bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,255,255,0.1)_2px,rgba(0,255,255,0.1)_4px)]" />

            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />
            <div className="relative z-10 border-b border-cyan-400/20 p-4">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className={cn(
                            "flex h-12 w-12 items-center justify-center text-2xl bg-slate-900/80 border",
                            isLocked ? "border-slate-600" : "border-cyan-400/50"
                        )}>
                            {currentModule.icon}
                        </div>
                        <div className="absolute -top-0.5 -left-0.5 w-2 h-2 border-t border-l border-cyan-400/70" />
                        <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 border-b border-r border-cyan-400/70" />
                    </div>

                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <h2 className="font-bold text-cyan-50 uppercase tracking-wide">{currentModule.name}</h2>
                            {isLocked && (
                                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border border-yellow-500 text-yellow-400 ">
                                    <Lock className="h-2.5 w-2.5 inline mr-1" />
                                    LOCKED
                                </span>
                            )}
                        </div>
                        <p className="text-[11px] text-slate-500 font-mono uppercase tracking-wider mt-0.5">
                            {isLocked ? "COMPLETE PREVIOUS TO UNLOCK" : `SYNC: ${progress}%`}
                        </p>
                    </div>
                </div>
            </div>

            {!isLocked && (
                <div className="px-4 py-3 border-b border-cyan-400/10">
                    <div className="relative h-1.5 bg-slate-800 overflow-hidden">
                        <div className="absolute inset-0 flex gap-px">
                            {Array.from({ length: 20 }).map((_, i) => (
                                <div key={i} className="flex-1 bg-slate-700/30" />
                            ))}
                        </div>
                        <div
                            className="absolute top-0 left-0 h-full bg-cyan-400 transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        />
                        <div
                            className="absolute top-0 left-0 h-full bg-cyan-400/50 blur-sm transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            )}

            {isLocked && (
                <div className="mx-4 mt-3 relative border border-yellow-500/30 bg-yellow-500/5 p-3">
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-yellow-400" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-yellow-400" />
                    <div className="flex items-start gap-3">
                        <AlertCircle className="h-4 w-4 shrink-0 text-yellow-400 mt-0.5" />
                        <div>
                            <p className="text-xs font-bold text-yellow-400 uppercase tracking-wider">ACCESS RESTRICTED</p>
                            <p className="mt-1 text-[11px] text-slate-400 tracking-wide">
                                {currentModule.description}. Complete previous modules to unlock.
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {isLocked && moduleInfo && (
                <div className="mx-4 mt-3 grid grid-cols-3 gap-2">
                    {moduleInfo.videos > 0 && (
                        <div className="relative p-2 text-center border border-cyan-400/20 bg-slate-900/60">
                            <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-cyan-400/50" />
                            <p className="text-lg font-bold text-cyan-50">{moduleInfo.videos}</p>
                            <p className="text-[9px] text-slate-500 uppercase tracking-wider">VIDS</p>
                        </div>
                    )}
                    {moduleInfo.quizzes > 0 && (
                        <div className="relative p-2 text-center border border-cyan-400/20 bg-slate-900/60">
                            <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-cyan-400/50" />
                            <p className="text-lg font-bold text-cyan-50">{moduleInfo.quizzes}</p>
                            <p className="text-[9px] text-slate-500 uppercase tracking-wider">QUIZ</p>
                        </div>
                    )}
                    {moduleInfo.totalStars > 0 && (
                        <div className="relative p-2 text-center border border-yellow-400/20 bg-slate-900/60">
                            <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-yellow-400/50" />
                            <p className="text-lg font-bold text-yellow-400">{moduleInfo.totalStars}00</p>
                            <p className="text-[9px] text-slate-500 uppercase tracking-wider">Coin</p>
                        </div>
                    )}
                </div>
            )}

            <div onClick={playClick} className="flex-1 overflow-y-auto p-4 pb-20">
                {/* Videos section */}
                {content.videos.length > 0 && (
                    <div className="mb-6">
                        <h3 className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-cyan-400">
                            <Play className="h-8 w-8 border border-cyan-400/20 p-2 rounded-full" />
                            DATA STREAMS ({content.videos.length})
                        </h3>
                        <div className="space-y-2">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                {content.videos.map((video, index) => {
                                    const isWatched = isVideoWatched(moduleId, video.id);
                                    return (
                                        <button
                                            key={video.id}
                                            onClick={(e) => handleItemClick(e, video.id, isLocked, () => openVideoModal(video))}
                                            className={cn(
                                                "relative w-full flex items-center gap-3 p-3 text-left transition-all cursor-target group overflow-hidden",
                                                shakingId === video.id && "animate-shake",
                                                isLocked
                                                    ? "bg-slate-900/40 border border-slate-800 opacity-60 hover:border-cyan-400/30 cursor-not-allowed"
                                                    : isWatched
                                                        ? "bg-emerald-500/10 border border-emerald-400/30 hover:border-emerald-400/50"
                                                        : "bg-slate-900/60 border border-cyan-400/20 hover:border-cyan-400/50"
                                            )}
                                        >
                                            {/* Corner accents */}
                                            <div className={cn(
                                                "absolute top-0 left-0 w-2 h-2 border-t border-l transition-colors",
                                                isWatched ? "border-emerald-400" : "border-cyan-400/50 group-hover:border-cyan-400"
                                            )} />
                                            <div className={cn(
                                                "absolute bottom-0 right-0 w-2 h-2 border-b border-r transition-colors",
                                                isWatched ? "border-emerald-400" : "border-cyan-400/50 group-hover:border-cyan-400"
                                            )} />

                                            {/* Number/Status */}
                                            <div className={cn(
                                                "relative z-10 flex h-8 w-8 items-center justify-center text-sm font-bold transition-all duration-500",
                                                !isLocked && "group-hover:scale-150 group-hover:-translate-y-6 group-hover:-translate-x-2.5",
                                                isLocked
                                                    ? "text-slate-500"
                                                    : isWatched
                                                        ? "text-emerald-500"
                                                        : "text-cyan-400"
                                            )}>
                                                {isLocked ? (
                                                    <Lock className="h-8 w-8 border border-cyan-400/20 p-2 rounded-full" />
                                                ) : isWatched ? (
                                                    <CheckCircle2 className="h-8 w-8 border border-cyan-400/20 p-2 rounded-full" />
                                                ) : (
                                                    String(index + 1).padStart(2, '0')
                                                )}
                                            </div>

                                            {/* Info */}
                                            <div className="flex-1">
                                                <p className={cn(
                                                    isLocked ? "text-slate-400" : isWatched ? "text-emerald-400" : "text-cyan-50"
                                                )}>
                                                    {video.title}
                                                </p>
                                                <div className="mt-0.5 flex items-center gap-2 text-[10px] text-slate-500 font-mono">
                                                    <span>{video.duration}</span>
                                                    <span>•</span>
                                                    <span className="flex items-center gap-1 text-yellow-400">
                                                        <Zap className="h-2.5 w-2.5" />
                                                        {video.xp} Coin
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Play indicator */}
                                            <div className={cn(
                                                "flex h-8 w-8 items-center justify-center transition-colors",
                                                isLocked ? "text-slate-600" : isWatched ? "text-emerald-400 cursor-pointer" : "text-cyan-400 cursor-pointer"
                                            )}>
                                                {isLocked ? (
                                                    <Lock className="h-8 w-8 border border-cyan-400/20 p-2 rounded-full" />
                                                ) : (
                                                    <Play className="h-8 w-8 fill-current border border-cyan-400/20 p-1.5 rounded-full" />
                                                )}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}

                {/* Quizzes section */}
                {content.quizzes.length > 0 && (
                    <div className="mb-6">
                        <h3 className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-yellow-400">
                            📝 NEURAL TESTS ({content.quizzes.length})
                        </h3>
                        <div className="space-y-2">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                {content.quizzes.map((quiz) => {
                                    const isCompleted = isQuizCompleted(moduleId, quiz.id);
                                    return (
                                        <button
                                            key={quiz.id}
                                            onClick={(e) => handleItemClick(e, quiz.id, isLocked, () => openQuizModal(quiz))}
                                            className={cn("relative w-full cursor-pointer border border-yellow-400/20 hover:border-yellow-400/50 overflow-hidden flex items-center gap-3 p-3 text-left transition-all duration-500 cursor-target group",
                                                shakingId === quiz.id && "animate-shake",
                                                isLocked && "cursor-not-allowed opacity-60"

                                            )}
                                        >
                                            {!isLocked && (
                                                <div
                                                    className={cn(
                                                        "absolute top-0 left-0 w-full h-2 transition-all duration-500",
                                                        isCompleted
                                                            ? "bg-linear-gradient-to-r from-yellow-400 to-orange-500"
                                                            : "bg-linear-gradient-to-r from-cyan-400 to-yellow-400",
                                                        "group-hover:h-16 group-hover:rounded-b-xl"
                                                    )}
                                                />
                                            )}

                                            {/* Corner accents */}
                                            <div className={cn(
                                                "absolute top-0 left-0 w-2 h-2 border-t border-l transition-colors",
                                                isCompleted ? "border-yellow-400" : "border-yellow-400/50 group-hover:border-yellow-400"
                                            )} />
                                            <div className={cn(
                                                "absolute bottom-0 right-0 w-2 h-2 border-b border-r transition-colors",
                                                isCompleted ? "border-yellow-400" : "border-yellow-400/50 group-hover:border-yellow-400"
                                            )} />

                                            {/* Icon */}
                                            <div
                                                className={cn(
                                                    "relative z-10 flex h-8 w-8 items-center justify-center bg-yellow-500 group-hover:bg-transparent text-black group-hover:text-yellow-500 text-lg rounded-full transition-all duration-500",
                                                    !isLocked && "group-hover:scale-150 group-hover:-translate-y-6 group-hover:-translate-x-3",
                                                    isLocked
                                                        ? "bg-yellow-800"
                                                        : isCompleted
                                                            ? "text-black group-hover:text-white "
                                                            : "text-black"
                                                )}
                                            >
                                                {isLocked ? (
                                                    <Lock className="h-8 w-8 border border-cyan-400/20 p-2 rounded-full" />
                                                ) : isCompleted ? (
                                                    <CheckCircle2 className="h-8 w-8 border border-cyan-400/20 p-2 rounded-full" />
                                                ) : (
                                                    <BookCheck className="h-8 w-8 border border-cyan-400/20 p-2 rounded-full" />
                                                )}
                                            </div>

                                            {/* Info */}
                                            <div className="relative z-10 flex-1 transition-all duration-500 group-hover:-translate-y-2">
                                                <p className={cn(
                                                    "text-sm font-medium uppercase tracking-wide",
                                                    isLocked ? "text-slate-500" : isCompleted ? "text-yellow-400" : "text-cyan-50"
                                                )}>
                                                    {quiz.title}
                                                </p>
                                                <div className="mt-0.5 flex items-center gap-2 text-[10px] text-slate-500 font-mono">
                                                    <span>{quiz.questions} QUESTIONS</span>
                                                    <span>•</span>
                                                    <span className="flex items-center gap-1 text-yellow-400">
                                                        <Zap className="h-2.5 w-2.5" />
                                                        {quiz.xp} Coin
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Arrow */}
                                            {isLocked ? (
                                                <Lock className="h-8 w-8 border border-cyan-400/20 p-2 rounded-full" />
                                            ) : (
                                                <ChevronRight
                                                    className={cn(
                                                        "h-8 w-8 border border-cyan-400/20 p-2 rounded-full transition-all duration-500",
                                                        !isLocked && "group-hover:translate-x-1 group-hover:text-yellow-400",
                                                        isCompleted ? "text-yellow-400" : "text-slate-500"
                                                    )}
                                                />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}

                {/* Assessments section */}
                {content.assessments?.length > 0 && (
                    <div>
                        <h3 className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-emerald-400">
                            🏆 FINAL PROTOCOLS ({content.assessments.length})
                        </h3>
                        <div className="space-y-2">
                            {content.assessments.map((assessment) => (
                                <button
                                    key={assessment.id}
                                    onClick={(e) => handleItemClick(e, assessment.id, isLocked, () => { })}
                                    className={cn(
                                        "relative w-full flex items-center gap-3 p-3 text-left transition-all cursor-target group overflow-hidden",
                                        shakingId === assessment.id && "animate-shake",
                                        isLocked
                                            ? "cursor-not-allowed opacity-50 border border-cyan-400/20"
                                            : "bg-slate-900/60 border border-cyan-400/20 hover:border-emerald-400/50"
                                    )}
                                >
                                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-400/50 group-hover:border-emerald-400" />
                                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-400/50 group-hover:border-emerald-400" />

                                    <div className={cn(
                                        "relative z-10 flex h-8 w-8 items-center justify-center text-lg transition-all duration-500",
                                        !isLocked && "group-hover:scale-150 group-hover:-translate-y-6 group-hover:-translate-x-4",
                                        isLocked ? "bg-slate-800" : "bg-emerald-400/20"
                                    )}>
                                        {isLocked ? <Lock className="h-8 w-8 border border-cyan-400/20 p-2 rounded-full" /> : "🏆"}
                                    </div>
                                    <div className="flex-1">
                                        <p className={cn(
                                            "text-sm font-medium uppercase tracking-wide",
                                            isLocked ? "text-slate-500" : "text-cyan-50"
                                        )}>
                                            {assessment.title}
                                        </p>
                                        <div className="mt-0.5 flex items-center gap-2 text-[10px] text-slate-500 font-mono">
                                            <span>{assessment.questions} QUESTIONS</span>
                                            <span>•</span>
                                            <span className="flex items-center gap-1 text-yellow-400">
                                                <Zap className="h-2.5 w-2.5" />
                                                {assessment.xp} Coin
                                            </span>
                                        </div>
                                    </div>
                                    {isLocked ? (
                                        <Lock className="h-8 w-8 border border-cyan-400/20 p-2 rounded-full" />
                                    ) : (
                                        <ChevronRight className="h-4 w-4 text-slate-500 group-hover:text-emerald-400" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Empty state for locked modules */}
                {isLocked && content.videos.length === 0 && content.quizzes.length === 0 && !content.assessments?.length && (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                        <div className="relative mb-4 flex h-16 w-16 items-center justify-center bg-slate-900 border border-cyan-400/20">
                            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-400" />
                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-400" />
                            <Lock className="h-6 w-6 text-slate-500" />
                        </div>
                        <p className="text-[11px] text-slate-500 uppercase tracking-wider">
                            CONTENT ENCRYPTED
                        </p>
                        <p className="text-[10px] text-slate-600 mt-1">
                            Unlock module to access data
                        </p>
                    </div>
                )}
            </div>

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-cyan-400/30" />
        </div>
    );
};
