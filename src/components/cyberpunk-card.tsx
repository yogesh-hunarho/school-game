import { Lock, CheckCircle2, Video, FileQuestionMark, Image } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import useSound from "@/hook/useSound";
import CyberpunkButton from "./ui/cyber-button";
import CyberpunkProgressBar from "./ui/cyber-component/cyberpunk-progress-bar";
import HeaderCoin from "./HeaderCoin";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"

interface Module {
    id: string;
    name: string;
    description?: string;
    image: string;
    totalStars: number;
    videos: number;
    quizzes: number;
    badges: string;
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
            className={cn(
                "relative cursor-pointer transition-all duration-300 group",
                isLocked && "opacity-80"
            )}
            data-instructor-target={isActive ? "active-mission" : undefined}
        >
            {/* Main Card Container */}
            <div className={cn(
                "relative backdrop-blur-3xl bg-background/10 transition-all duration-300 overflow-hidden",
                colors.glow
            )}>

                {/* Scanline pattern */}
                <div className="pointer-events-none absolute inset-0 z-20 opacity-[0.03] bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,255,255,0.1)_2px,rgba(0,255,255,0.1)_4px)]" />

                {/* Corner Decoration Brackets */}
                <div className={cn("absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 transition-colors z-30", colors.border)} />
                <div className={cn("absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 transition-colors z-30", colors.border)} />
                <div className={cn("absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 transition-colors z-30", colors.border)} />
                <div className={cn("absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 transition-colors z-30", colors.border)} />

                {/* Main Border */}
                <div className={cn(
                    "absolute inset-0 border transition-colors",
                    isActive ? "border-yellow-400/60 shadow-[inset_0_0_20px_rgba(250,204,21,0.1)]" :
                        isCompleted ? "border-emerald-400/60 shadow-[inset_0_0_20px_rgba(52,211,153,0.1)]" :
                            "border-cyan-400/20"
                )} />

                <div className="relative z-10 p-5 group">
                    <div className="flex items-start justify-between mb-4">
                        <div className="relative">
                            <motion.div
                                whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                                className={cn(
                                    "w-14 h-14 flex items-center justify-center text-3xl bg-slate-900/90 shadow-xl transition-all duration-500 overflow-hidden",
                                    isActive ? "border border-yellow-400/50 text-yellow-400" :
                                        isCompleted ? "border border-emerald-400/50 text-emerald-400" :
                                            "border border-cyan-400/30 text-cyan-400"
                                )}>
                                {isLocked ? (
                                    <Lock className="w-6 h-6 text-slate-600" />
                                ) : (
                                    <img
                                        src={module.image}
                                        alt={module.name}
                                        className="w-full h-full object-cover group-hover:grayscale-0 group-hover:-scale-x-100 transition-all duration-500"
                                    />
                                )}
                            </motion.div>
                            {/* Tech crosshairs */}
                            <div className={cn("absolute -top-1 -left-1 w-3 h-3 border-t border-l", colors.border)} />
                            <div className={cn("absolute -bottom-1 -right-1 w-3 h-3 border-b border-r", colors.border)} />
                        </div>

                        <div className={cn(
                            "px-3 py-1 text-[10px] font-bold tracking-[0.2em] uppercase border shadow-sm backdrop-blur-md",
                            isActive ? "border-yellow-400 text-yellow-400 bg-yellow-400/10 shadow-yellow-400/20" :
                                isCompleted ? "border-emerald-400 text-emerald-400 bg-emerald-400/10 shadow-emerald-400/20" :
                                    isCurrent ? "border-cyan-400 text-cyan-400 bg-cyan-400/10 shadow-cyan-400/20" :
                                        "border-slate-700 text-slate-500 bg-slate-900/50"
                        )}>
                            {getStatusText()}
                        </div>
                    </div>

                    <div className="mb-2">
                        <motion.h3
                            className={cn(
                                "font-black text-lg uppercase tracking-wider mb-0.5 line-clamp-1 transition-all duration-300",
                                isActive ? "text-yellow-400" : isCompleted ? "text-emerald-400" : "text-white"
                            )}
                        >
                            {module.name}
                        </motion.h3>
                        <div className="flex items-center gap-2">
                            <div className={cn("h-0.5 w-8 animate-pulse", colors.bg)} />
                        </div>
                    </div>
                    <HoverCard>
                        <HoverCardTrigger className=" text-sm font-mono tracking-tight line-clamp-2 cursor-pointer mb-2">
                            {module.description ||
                                "Initializing module protocols for advanced neural development and engineering training."}
                        </HoverCardTrigger>

                        <HoverCardContent className="w-96 text-sm leading-relaxed font-mono bg-slate-600">
                            {module.description ||
                                "Initializing module protocols for advanced neural development and engineering training."}
                        </HoverCardContent>
                    </HoverCard>

                    <div className="grid grid-cols-4 gap-2 mb-4 mt-4">
                        {/* COINS */}
                        <div className="group relative bg-slate-950/20 backdrop-blur-md border-l border-r border-yellow-500/20 hover:border-yellow-500/60 transition-all duration-300">
                            {/* Tech Corners */}
                            <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-yellow-500/40 group-hover:border-yellow-400 transition-colors" />
                            <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-yellow-500/40 group-hover:border-yellow-400 transition-colors" />

                            <div className="relative p-2 flex flex-row items-center justify-center gap-3 group-hover:bg-yellow-500/5 transition-colors">
                                <div className="flex items-center justify-center p-1.5 rounded bg-yellow-950/30 border border-yellow-500/20 shadow-[0_0_10px_-3px_rgba(234,179,8,0.3)] group-hover:shadow-yellow-500/40 transition-all">
                                    <HeaderCoin className="w-3 h-3 text-yellow-500" size={14} />
                                </div>
                                <div className="flex flex-col items-start">
                                    <span className="text-[8px] font-mono font-bold text-yellow-500/60 uppercase tracking-widest group-hover:text-yellow-400 transition-colors">XP_NET</span>
                                    <span className="text-sm font-mono font-black text-white leading-none shadow-[0_0_10px_-5px_rgba(255,255,255,0.5)]">{module.totalStars * 100}</span>
                                </div>
                            </div>
                        </div>

                        {/* VIDEOS */}
                        <div className="group relative bg-slate-950/20 backdrop-blur-md border-l border-r border-cyan-500/20 hover:border-cyan-500/60 transition-all duration-300">
                            {/* Tech Corners */}
                            <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-cyan-500/40 group-hover:border-cyan-400 transition-colors" />
                            <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-cyan-500/40 group-hover:border-cyan-400 transition-colors" />

                            <div className="relative p-2 flex flex-row items-center justify-center gap-3 group-hover:bg-cyan-500/5 transition-colors">
                                <div className="flex items-center justify-center p-1.5 rounded bg-cyan-950/30 border border-cyan-500/20 shadow-[0_0_10px_-3px_rgba(6,182,212,0.3)] group-hover:shadow-cyan-500/40 transition-all">
                                    <Video className="w-3.5 h-3.5 text-cyan-400" />
                                </div>
                                <div className="flex flex-col items-start">
                                    <span className="text-[8px] font-mono font-bold text-cyan-500/60 uppercase tracking-widest group-hover:text-cyan-400 transition-colors">DATA</span>
                                    <span className="text-sm font-mono font-black text-white leading-none shadow-[0_0_10px_-5px_rgba(255,255,255,0.5)]">{module.videos}</span>
                                </div>
                            </div>
                        </div>

                        {/* QUIZZES */}
                        <div className="group relative bg-slate-950/20 backdrop-blur-md border-l border-r border-purple-500/20 hover:border-purple-500/60 transition-all duration-300">
                            {/* Tech Corners */}
                            <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-purple-500/40 group-hover:border-purple-400 transition-colors" />
                            <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-purple-500/40 group-hover:border-purple-400 transition-colors" />

                            <div className="relative p-2 flex flex-row items-center justify-center gap-3 group-hover:bg-purple-500/5 transition-colors">
                                <div className="flex items-center justify-center p-1.5 rounded bg-purple-950/30 border border-purple-500/20 shadow-[0_0_10px_-3px_rgba(168,85,247,0.3)] group-hover:shadow-purple-500/40 transition-all">
                                    <FileQuestionMark className="w-3.5 h-3.5 text-purple-400" />
                                </div>
                                <div className="flex flex-col items-start">
                                    <span className="text-[8px] font-mono font-bold text-purple-500/60 uppercase tracking-widest group-hover:text-purple-400 transition-colors">QUIZ</span>
                                    <span className="text-sm font-mono font-black text-white leading-none shadow-[0_0_10px_-5px_rgba(255,255,255,0.5)]">{module.quizzes}</span>
                                </div>
                            </div>
                        </div>
                        {/* Badges */}
                        <div className="group relative bg-slate-950/20 backdrop-blur-md border-l border-r border-emerald-500/20 hover:border-emerald-500/60 transition-all duration-300">
                            {/* Tech Corners */}
                            <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-emerald-500/40 group-hover:border-emerald-400 transition-colors" />
                            <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-emerald-500/40 group-hover:border-emerald-400 transition-colors" />

                            <HoverCard>
                                <HoverCardTrigger asChild>
                                    <div className="relative p-2 flex flex-row items-center justify-center gap-3 group-hover:bg-emerald-500/5 transition-colors">
                                        <div className="flex items-center justify-center p-1.5 rounded bg-emerald-950/30 border border-emerald-500/20 shadow-[0_0_10px_-3px_rgba(168,85,247,0.3)] group-hover:shadow-emerald-500/40 transition-all">
                                            <Image className="w-3.5 h-3.5 text-emerald-400" />
                                        </div>
                                        <div className="flex flex-col items-start">
                                            <span className="text-[8px] font-mono font-bold text-emerald-500/60 uppercase tracking-widest group-hover:text-emerald-400 transition-colors">Badge</span>
                                            <span className="text-sm font-mono font-black text-white leading-none shadow-[0_0_10px_-5px_rgba(255,255,255,0.5)]">1 </span>
                                        </div>
                                    </div>
                                </HoverCardTrigger>

                                <HoverCardContent className="w-40 h-40 p-0 border border-emerald-500/20 rounded-none" align="end">
                                    <img src={"/assets/achievements/1.jpeg"} className="w-full h-full object-cover" />
                                </HoverCardContent>
                            </HoverCard>

                        </div>
                    </div>

                    <div className="mb-6">
                        <CyberpunkProgressBar
                            progress={progress}
                            label="Progress"
                            color={progress === 100 ? "green" : isActive ? "cyan" : "orange"}
                        />
                    </div>

                    <div className="relative">
                        {isLocked ? (
                            <CyberpunkButton variant="danger" className="w-full">
                                <div className="flex items-center gap-2">
                                    <Lock className="w-4 h-4" />
                                    <span>LOCKED_ACCESS</span>
                                </div>
                            </CyberpunkButton>
                        ) : (
                            <motion.div whileHover={{ x: 2 }} onClick={() => playaudioForModuleSelect(module.id)}>
                                <CyberpunkButton
                                    variant={isCompleted ? "secondary" : isActive ? "outline" : "secondary"}
                                    className="w-full"
                                >
                                    <div className="flex items-center gap-2">
                                        {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : null}
                                        <span>{isCompleted ? "REVIEW_MISSION" : isActive ? "START_MISSION" : "START_MISSION"}</span>
                                    </div>
                                </CyberpunkButton>
                            </motion.div>
                        )}

                        <div className={cn(
                            "absolute -bottom-5 left-1/2 -translate-x-1/2 w-3/4 h-px transition-all opacity-50",
                            colors.bg
                        )} />
                    </div>
                </div>

                <div className={cn(
                    "absolute bottom-0 left-4 right-4 h-0.5 transition-colors",
                    isActive ? "bg-yellow-400" : isCompleted ? "bg-emerald-400" : "bg-cyan-400/30"
                )} />
            </div>
        </motion.div>
    )
}
