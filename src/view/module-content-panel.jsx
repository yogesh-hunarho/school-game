import { cn } from "@/lib/utils";
import { Play, CheckCircle2, ChevronRight, Zap, Lock, AlertCircle } from "lucide-react";
import { useLMSStore } from "@/store/lms-store";
import { modules } from "@/store/level-canvas-config";

export const ModuleContentPanel = () => {
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

    return (
        <div className="">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-700 p-4">
                <div className="flex items-center gap-3">
                    <div className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-xl text-2xl",
                        isLocked ? "bg-slate-700/50" : "bg-linear-to-br from-cyan-500/20 to-blue-600/20"
                    )}>
                        {currentModule.icon}
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="font-bold text-white">{currentModule.name}</h2>
                            {isLocked && (
                                <span className="flex items-center gap-1 rounded-full bg-slate-700 px-2 py-0.5 text-xs text-slate-400">
                                    <Lock className="h-3 w-3" />
                                    Locked
                                </span>
                            )}
                        </div>
                        <p className="text-xs text-slate-400">
                            {isLocked ? "Complete previous modules to unlock" : `${progress}% complete`}
                        </p>
                    </div>
                </div>
            </div>

            {/* Progress bar (hidden when locked) */}
            {!isLocked && (
                <div className="px-4 py-3">
                    <div className="h-2 overflow-hidden rounded-full bg-slate-700">
                        <div
                            className="h-full rounded-full bg-linear-to-r from-emerald-400 to-emerald-500 transition-all duration-500"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            )}

            {/* Locked module info banner */}
            {isLocked && (
                <div className="mx-4 mt-3 flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/10 p-3">
                    <AlertCircle className="h-5 w-5 shrink-0 text-amber-400" />
                    <div>
                        <p className="text-sm font-medium text-amber-300">Module Locked</p>
                        <p className="mt-1 text-xs text-slate-400">
                            {currentModule.description}. Complete the previous modules to unlock this content.
                        </p>
                    </div>
                </div>
            )}

            {/* Module stats */}
            {isLocked && moduleInfo && (
                <div className="mx-4 mt-3 grid grid-cols-3 gap-2">
                    {moduleInfo.videos > 0 && (
                        <div className="rounded-lg bg-slate-800/50 p-2 text-center">
                            <p className="text-lg font-bold text-slate-300">{moduleInfo.videos}</p>
                            <p className="text-xs text-slate-500">Videos</p>
                        </div>
                    )}
                    {moduleInfo.quizzes > 0 && (
                        <div className="rounded-lg bg-slate-800/50 p-2 text-center">
                            <p className="text-lg font-bold text-slate-300">{moduleInfo.quizzes}</p>
                            <p className="text-xs text-slate-500">Quizzes</p>
                        </div>
                    )}
                    {moduleInfo.totalStars > 0 && (
                        <div className="rounded-lg bg-slate-800/50 p-2 text-center">
                            <p className="text-lg font-bold text-amber-400">⭐ {moduleInfo.totalStars}</p>
                            <p className="text-xs text-slate-500">Stars</p>
                        </div>
                    )}
                </div>
            )}

            <div className="flex-1 overflow-y-auto p-4">
                {/* Videos section */}
                {content.videos.length > 0 && (
                    <div className="mb-6">
                        <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-400">
                            <Play className="h-4 w-4" />
                            Videos ({content.videos.length})
                        </h3>
                        <div className="space-y-2">
                            {content.videos.map((video, index) => {
                                const isWatched = isVideoWatched(moduleId, video.id);
                                return (
                                    <button
                                        key={video.id}
                                        onClick={() => !isLocked && openVideoModal(video)}
                                        disabled={isLocked}
                                        className={cn(
                                            "flex w-full items-center gap-3 rounded-xl p-3 text-left transition-all cursor-target",
                                            isLocked
                                                ? "cursor-not-allowed bg-slate-800/50 opacity-60"
                                                : isWatched
                                                    ? "bg-emerald-500/20 hover:bg-emerald-500/30"
                                                    : "bg-slate-800 hover:bg-slate-700"
                                        )}
                                    >
                                        {/* Thumbnail/Number */}
                                        <div
                                            className={cn(
                                                "flex h-10 w-10 items-center justify-center rounded-lg text-lg font-bold",
                                                isLocked
                                                    ? "bg-slate-700/50 text-slate-500"
                                                    : isWatched
                                                        ? "bg-emerald-500 text-white"
                                                        : "bg-slate-700 text-slate-300"
                                            )}
                                        >
                                            {isLocked ? (
                                                <Lock className="h-4 w-4" />
                                            ) : isWatched ? (
                                                <CheckCircle2 className="h-5 w-5" />
                                            ) : (
                                                index + 1
                                            )}
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1">
                                            <p
                                                className={cn(
                                                    "text-sm font-medium",
                                                    isLocked
                                                        ? "text-slate-400"
                                                        : isWatched
                                                            ? "text-emerald-300"
                                                            : "text-white"
                                                )}
                                            >
                                                {video.title}
                                            </p>
                                            <div className="mt-0.5 flex items-center gap-2 text-xs text-slate-400">
                                                <span>{video.duration}</span>
                                                <span>•</span>
                                                <span className="flex items-center gap-1">
                                                    <Zap className="h-3 w-3 text-amber-400" />
                                                    {video.xp} XP
                                                </span>
                                            </div>
                                        </div>

                                        {/* Play button */}
                                        <div
                                            className={cn(
                                                "flex h-8 w-8 items-center justify-center rounded-full",
                                                isLocked
                                                    ? "bg-slate-700/50"
                                                    : isWatched
                                                        ? "bg-emerald-500/30"
                                                        : "bg-emerald-500"
                                            )}
                                        >
                                            {isLocked ? (
                                                <Lock className="h-4 w-4 text-slate-500" />
                                            ) : (
                                                <Play
                                                    className={cn(
                                                        "h-4 w-4 fill-current",
                                                        isWatched ? "text-emerald-400" : "text-white"
                                                    )}
                                                />
                                            )}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Quizzes section */}
                {content.quizzes.length > 0 && (
                    <div className="mb-6">
                        <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-400">
                            📝 Quizzes ({content.quizzes.length})
                        </h3>
                        <div className="space-y-2">
                            {content.quizzes.map((quiz) => {
                                const isCompleted = isQuizCompleted(moduleId, quiz.id);
                                return (
                                    <button
                                        key={quiz.id}
                                        onClick={() => !isLocked && openQuizModal(quiz)}
                                        disabled={isLocked}
                                        className={cn(
                                            "flex w-full items-center gap-3 rounded-xl p-3 text-left transition-all cursor-target",
                                            isLocked
                                                ? "cursor-not-allowed bg-slate-800/50 opacity-60"
                                                : isCompleted
                                                    ? "bg-amber-500/20 hover:bg-amber-500/30"
                                                    : "bg-slate-800 hover:bg-slate-700"
                                        )}
                                    >
                                        {/* Icon */}
                                        <div
                                            className={cn(
                                                "flex h-10 w-10 items-center justify-center rounded-lg text-lg",
                                                isLocked
                                                    ? "bg-slate-700/50"
                                                    : isCompleted
                                                        ? "bg-amber-500 text-white"
                                                        : "bg-slate-700"
                                            )}
                                        >
                                            {isLocked ? (
                                                <Lock className="h-4 w-4 text-slate-500" />
                                            ) : isCompleted ? (
                                                <CheckCircle2 className="h-5 w-5" />
                                            ) : (
                                                "📝"
                                            )}
                                        </div>

                                        {/* Info */}
                                        <div className="flex-1">
                                            <p
                                                className={cn(
                                                    "text-sm font-medium",
                                                    isLocked
                                                        ? "text-slate-400"
                                                        : isCompleted
                                                            ? "text-amber-300"
                                                            : "text-white"
                                                )}
                                            >
                                                {quiz.title}
                                            </p>
                                            <div className="mt-0.5 flex items-center gap-2 text-xs text-slate-400">
                                                <span>{quiz.questions} questions</span>
                                                <span>•</span>
                                                <span className="flex items-center gap-1">
                                                    <Zap className="h-3 w-3 text-amber-400" />
                                                    {quiz.xp} XP
                                                </span>
                                            </div>
                                        </div>

                                        {/* Arrow */}
                                        {isLocked ? (
                                            <Lock className="h-4 w-4 text-slate-500" />
                                        ) : (
                                            <ChevronRight
                                                className={cn(
                                                    "h-5 w-5",
                                                    isCompleted ? "text-amber-400" : "text-slate-400"
                                                )}
                                            />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Assessments section */}
                {content.assessments?.length > 0 && (
                    <div>
                        <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-400">
                            🏆 Final Assessments ({content.assessments.length})
                        </h3>
                        <div className="space-y-2">
                            {content.assessments.map((assessment) => (
                                <button
                                    key={assessment.id}
                                    disabled={isLocked}
                                    className={cn(
                                        "flex w-full items-center gap-3 rounded-xl p-3 text-left transition-all cursor-target",
                                        isLocked
                                            ? "cursor-not-allowed bg-slate-800/50 opacity-60"
                                            : "bg-slate-800 hover:bg-slate-700"
                                    )}
                                >
                                    <div className={cn(
                                        "flex h-10 w-10 items-center justify-center rounded-lg text-lg",
                                        isLocked ? "bg-slate-700/50" : "bg-amber-500/20"
                                    )}>
                                        {isLocked ? <Lock className="h-4 w-4 text-slate-500" /> : "🏆"}
                                    </div>
                                    <div className="flex-1">
                                        <p className={cn(
                                            "text-sm font-medium",
                                            isLocked ? "text-slate-400" : "text-white"
                                        )}>
                                            {assessment.title}
                                        </p>
                                        <div className="mt-0.5 flex items-center gap-2 text-xs text-slate-400">
                                            <span>{assessment.questions} questions</span>
                                            <span>•</span>
                                            <span className="flex items-center gap-1">
                                                <Zap className="h-3 w-3 text-amber-400" />
                                                {assessment.xp} XP
                                            </span>
                                        </div>
                                    </div>
                                    {isLocked ? (
                                        <Lock className="h-4 w-4 text-slate-500" />
                                    ) : (
                                        <ChevronRight className="h-5 w-5 text-slate-400" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Empty state for locked modules with no content preview */}
                {isLocked && content.videos.length === 0 && content.quizzes.length === 0 && !content.assessments?.length && (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-800">
                            <Lock className="h-8 w-8 text-slate-500" />
                        </div>
                        <p className="text-sm text-slate-400">
                            Content will be available after unlocking this module
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};
