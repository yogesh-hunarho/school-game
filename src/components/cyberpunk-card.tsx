import { Lock, Star, Zap, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { type ReactNode } from "react"
import useSound from "@/hook/useSound";

interface Module {
    id: string;
    name: string;
    icon: ReactNode;
    totalStars: number;
    videos: number;
    quizzes: number;
}

interface CyberpunkCardProps {
    module: Module;
    isLocked: boolean;
    isCurrent: boolean;
    isCompleted: boolean;
    isActive: boolean;
    progress: number;
    handleModuleSelect: (moduleId: string) => void;
}

export function CyberpunkCard({
    module,
    isLocked,
    isCurrent,
    isCompleted,
    isActive,
    progress,
    handleModuleSelect
}: CyberpunkCardProps) {
    const { playSound } = useSound()
    // Color scheme based on state
    const getColors = () => {
        if (isCompleted) return {
            border: "border-emerald-400",
            text: "text-emerald-400",
            bg: "bg-emerald-400",
            glow: "shadow-[0_0_5px_rgba(52,211,153,0.3)]"
        };
        if (isActive) return {
            border: "border-yellow-400",
            text: "text-yellow-400",
            bg: "bg-yellow-400",
            glow: "shadow-[0_0_5px_rgba(250,204,21,0.4)]"
        };
        if (isCurrent) return {
            border: "border-cyan-400",
            text: "text-cyan-400",
            bg: "bg-cyan-400",
            glow: "shadow-[0_0_5px_rgba(34,211,238,0.3)]"
        };
        return {
            border: "border-cyan-400/40",
            text: "text-cyan-400/70",
            bg: "bg-cyan-400/40",
            glow: ""
        };
    };

    const colors = getColors();

    const getStatusText = () => {
        if (isCompleted) return "COMPLETE";
        if (isActive) return "ACTIVE";
        if (isCurrent) return "READY";
        if (isLocked) return "LOCKED";
        return "STANDBY";
    };

    const playaudioForModuleSelect = (id: string) => {
        if (isLocked) {
            playSound("disabled");
            return;
        }
        playSound("click");
        handleModuleSelect(id)
    }

    return (
        <motion.div
            whileTap={{ scale: 0.98 }}
            onClick={() => playaudioForModuleSelect(module.id)}
            className={cn(
                "cursor-pointer transition-all duration-300 group",
                isLocked && "opacity-80"
            )}
        >
            {/* Main Card Container */}
            <div className={cn(
                "relative bg-slate-950/95 transition-all duration-300",
                colors.glow
            )}>
                <div className="pointer-events-none absolute inset-0 z-20 opacity-[0.03] bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,255,255,0.1)_2px,rgba(0,255,255,0.1)_4px)]" />

                <div className={cn("absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 transition-colors", colors.border)} />
                <div className={cn("absolute top-0 left-4 w-3 h-[2px] transition-colors", colors.bg)} />
                <div className={cn("absolute top-4 left-0 w-[2px] h-3 transition-colors", colors.bg)} />

                <div className={cn("absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 transition-colors", colors.border)} />
                <div className={cn("absolute top-0 right-4 w-3 h-[2px] transition-colors", colors.bg)} />
                <div className={cn("absolute top-4 right-0 w-[2px] h-3 transition-colors", colors.bg)} />

                <div className={cn("absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 transition-colors", colors.border)} />
                <div className={cn("absolute bottom-0 left-4 w-3 h-[2px] transition-colors", colors.bg)} />
                <div className={cn("absolute bottom-4 left-0 w-[2px] h-3 transition-colors", colors.bg)} />

                <div className={cn("absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 transition-colors", colors.border)} />
                <div className={cn("absolute bottom-0 right-4 w-3 h-[2px] transition-colors", colors.bg)} />
                <div className={cn("absolute bottom-4 right-0 w-[2px] h-3 transition-colors", colors.bg)} />

                <div className={cn(
                    "absolute inset-0 border transition-colors",
                    isActive ? "border-yellow-400/60" : isCompleted ? "border-emerald-400/60" : "border-cyan-400/20"
                )} />

                <div className="relative z-10 p-4 group overflow-hidden">
                    <div className="flex items-start justify-between mb-3">
                        <div className="relative group-hover:scale-150 group-hover:-translate-y-4 group-hover:-translate-x-3 duration-500">
                            <div className={cn(
                                "w-12 h-12 flex items-center justify-center text-2xl bg-slate-900/80 transition-colors",
                                isActive ? "border border-yellow-400/50" : isCompleted ? "border border-emerald-400/50" : "border border-cyan-400/30"
                            )}>
                                {isLocked ? <Lock className="w-5 h-5 text-slate-500 " /> : module.icon}
                            </div>
                            <div className={cn("absolute -top-0.5 -left-0.5 w-2 h-2 border-t border-l", colors.border)} />
                            <div className={cn("absolute -bottom-0.5 -right-0.5 w-2 h-2 border-b border-r", colors.border)} />
                        </div>
                        <div className={cn(
                            "px-2 py-1 text-[10px] font-bold tracking-widest uppercase border",
                            isActive ? "border-yellow-400 text-yellow-400 bg-yellow-400/10" :
                                isCompleted ? "border-emerald-400 text-emerald-400 bg-emerald-400/10" :
                                    isCurrent ? "border-cyan-400 text-cyan-400 bg-cyan-400/10" :
                                        "border-slate-600 text-slate-500 bg-slate-800/50"
                        )}>
                            {getStatusText()}
                        </div>
                    </div>

                    <h3 className={cn(
                        "font-bold text-base uppercase tracking-wide mb-1 line-clamp-2 transition-colors",
                        isActive ? "text-yellow-400" : isCompleted ? "text-emerald-400" : "text-cyan-50"
                    )}>
                        {module.name}
                    </h3>

                    <p className="font-mono text-[10px] text-slate-500 mb-4 tracking-wider">
                        ID: {module.id.toUpperCase().replace(/-/g, '_')}
                    </p>
                    <div className="relative h-px mb-4">
                        <div className={cn("absolute inset-0 transition-colors", isActive ? "bg-yellow-400/30" : "bg-cyan-400/20")} />
                        <div className={cn("absolute left-0 top-0 w-8 h-full transition-colors", colors.bg, "opacity-60")} />
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="relative p-2 bg-slate-900/60 border border-cyan-400/20">
                            <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-cyan-400/50" />
                            <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-cyan-400/50" />
                            <div className="flex items-center gap-2">
                                <Star className="w-3.5 h-3.5 text-yellow-400" />
                                <div className="font-mono">
                                    <p className="font-bold text-[9px] text-slate-500 uppercase">XP</p>
                                    <p className="font-bold text-sm text-cyan-50">{module.totalStars}00</p>
                                </div>
                            </div>
                        </div>

                        <div className="relative p-2 bg-slate-900/60 border border-cyan-400/20">
                            <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-cyan-400/50" />
                            <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-cyan-400/50" />
                            <div className="flex items-center gap-2">
                                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                                <div className="font-mono">
                                    <p className="font-bold text-[9px] text-slate-500 uppercase">SEQ</p>
                                    <p className="font-bold text-sm text-cyan-50">{module.videos + module.quizzes}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-4">
                        <div className="flex items-center justify-between mb-1.5">
                            <span className="font-mono text-[10px] text-slate-500 uppercase tracking-wider">DATA SYNC</span>
                            <span className={cn(
                                "font-mono text-xs font-bold",
                                progress === 100 ? "text-emerald-400" : isActive ? "text-yellow-400" : "text-cyan-400"
                            )}>{progress}%</span>
                        </div>
                        <div className="relative h-1.5 bg-slate-800 overflow-hidden">
                            <div className="absolute inset-0 flex gap-px">
                                {Array.from({ length: 20 }).map((_, i) => (
                                    <div key={i} className="flex-1 bg-slate-700/50" />
                                ))}
                            </div>
                            <div
                                className={cn(
                                    "absolute top-0 left-0 h-full transition-all duration-500",
                                    progress === 100 ? "bg-emerald-400" : isActive ? "bg-yellow-400" : "bg-cyan-400"
                                )}
                                style={{ width: `${progress}%` }}
                            />
                            <div
                                className={cn(
                                    "absolute top-0 left-0 h-full blur-sm transition-all duration-500",
                                    progress === 100 ? "bg-emerald-400/50" : isActive ? "bg-yellow-400/50" : "bg-cyan-400/50"
                                )}
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>

                    {isLocked ? (
                        <div className="relative group/lock">
                            <button
                                disabled
                                className="w-full py-4 font-bold text-sm uppercase tracking-widest bg-red-950/30 border border-red-900/50 text-red-700 cursor-not-allowed flex items-center justify-center gap-2 transition-all duration-300 group-hover/lock:bg-red-950/50 group-hover/lock:text-red-500 group-hover/lock:border-red-500/50"
                            >
                                <Lock className="w-5 h-5" />
                                ACCESS DENIED
                            </button>
                            <div className="absolute inset-0 bg-red-500/10 opacity-0 group-hover/lock:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        </div>
                    ) : isCompleted ? (
                        <button className="w-full py-2.5 font-bold text-xs uppercase tracking-widest bg-emerald-400/10 border border-emerald-400 text-emerald-400 hover:bg-emerald-400/20 transition-colors">
                            <CheckCircle2 className="w-3.5 h-3.5 inline-block mr-2 -mt-0.5" />
                            REVIEW
                        </button>
                    ) : isActive ? (
                        <button className="w-full py-2.5 font-bold text-xs uppercase tracking-widest bg-yellow-400 text-slate-900 hover:bg-yellow-300 transition-colors shadow-[0_0_20px_rgba(250,204,21,0.3)]">
                            INITIALIZE
                        </button>
                    ) : (
                        <button className="w-full py-2.5 font-bold text-xs uppercase tracking-widest bg-cyan-400/10 border border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/20 hover:border-cyan-400 transition-colors">
                            ACCESS
                        </button>
                    )}
                </div>

                <div className={cn(
                    "absolute bottom-0 left-4 right-4 h-0.5 transition-colors",
                    isActive ? "bg-yellow-400" : isCompleted ? "bg-emerald-400" : "bg-cyan-400/30"
                )} />
            </div>
        </motion.div>
    )
}
