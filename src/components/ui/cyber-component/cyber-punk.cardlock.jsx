import { cn } from "@/lib/utils"
import { Lock, ShieldAlert, Wifi, Cpu, Zap, Star, Info, FileQuestionMark, Video, Image } from "lucide-react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import useSound from "@/hook/useSound"
import CyberpunkButton from "../cyber-button"
import HeaderCoin from "@/components/HeaderCoin"
import { useInstructor } from "@/provider/InstructorProvider"
import { walkthroughDialogues } from "@/config/instructor-config"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../hover-card"

export function CyberpunkLock({
    module,
    isLocked,
    isCurrent,
    isCompleted,
    isActive,
    progress,
    handleModuleSelect
}) {
    const { playSound } = useSound()
    const [glitch, setGlitch] = useState(false)
    const { showWalkthrough } = useInstructor();

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

    const handleLockedMission = () => {
        playSound("disabled")
        showWalkthrough(walkthroughDialogues['locked-mission'])
    }


    return (
        <div
            data-instructor-target={"inactive-mission"}
            className={`relative group h-full p-4 transition-transform duration-500 backdrop-blur-xl bg-background/10`}>
            <div className="pointer-events-none absolute inset-0 z-20 opacity-[0.03] bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,255,255,0.1)_2px,rgba(0,255,255,0.1)_4px)]" />

            {/* Corner Decoration Brackets */}
            <div className={cn("absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 transition-colors z-30", colors.border)} />
            <div className={cn("absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 transition-colors z-30", colors.border)} />
            <div className={cn("absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 transition-colors z-30", colors.border)} />
            <div className={cn("absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 transition-colors z-30", colors.border)} />
            <div className={cn(
                "absolute inset-0 border transition-colors",
                isActive ? "border-yellow-400/60 shadow-[inset_0_0_20px_rgba(250,204,21,0.1)]" :
                    isCompleted ? "border-emerald-400/60 shadow-[inset_0_0_20px_rgba(52,211,153,0.1)]" :
                        "border-cyan-400/20"
            )} />

            <div className="relative z-10 flex flex-col items-center justify-between overflow-hidden">

                <div className="mt-6">
                    <div className="relative mt-5">
                        {/* Animated rings around the lock */}
                        <div className="absolute inset-0 -m-8 border border-cyan-500/30 rounded-full animate-[spin_10s_linear_infinite]" />
                        <div className="absolute inset-0 -m-12 border border-dashed border-yellow-500/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />

                        <div className="relative w-32 h-32 flex items-center justify-center rounded-full bg-linear-to-br from-cyan-500/20 to-transparent border border-cyan-400/50 shadow-[0_0_30px_rgba(34,211,238,0.3)]">
                            <Lock size={64} className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] animate-pulse" />

                            {/* Inner Glitch Layer */}
                            <Lock
                                size={64}
                                className="absolute text-yellow-400 opacity-0 group-hover:opacity-40 group-hover:translate-x-1 transition-all duration-75"
                            />
                            <Lock
                                size={64}
                                className="absolute text-red-500 opacity-0 group-hover:opacity-40 group-hover:-translate-x-1 transition-all duration-75"
                            />
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="text-center space-y-2">
                    <motion.h3
                        className={cn(
                            "font-black text-lg uppercase tracking-wider mb-0.5 line-clamp-1 transition-all duration-300",
                            isActive ? "text-yellow-400" : isCompleted ? "text-emerald-400" : "text-white"
                        )}
                    >
                        {module.name}
                    </motion.h3>
                    <p className="text-white font-mono text-sm line-clamp-2 font-wider mb-2">
                        {module.description || "Initializing module protocols for advanced neural development and engineering training."}
                    </p>
                </div>

            </div>
            <div className="grid grid-cols-4 gap-2 mb-4 mt-4">
                {/* COINS */}
                <div className="group relative bg-slate-950/20 backdrop-blur-md border-l border-r border-yellow-500/20 hover:border-yellow-500/60 transition-all duration-300">
                    {/* Tech Corners */}
                    <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-yellow-500/40 group-hover:border-yellow-400 transition-colors" />
                    <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-yellow-500/40 group-hover:border-yellow-400 transition-colors" />

                    <div className="relative p-2 flex flex-row items-center justify-center gap-3 group-hover:bg-yellow-500/5 transition-colors">
                        <div className="flex items-center justify-center p-1.5 rounded bg-yellow-950/30 border border-yellow-500/20 shadow-[0_0_10px_-3px_rgba(234,179,8,0.3)] group-hover:shadow-yellow-500/40 transition-all">
                            <HeaderCoin className="w-3 h-3 text-yellow-500" size={14} isAnimate={false} />
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
                                    <span className="text-[8px] font-mono font-bold text-emerald-500/60 uppercase tracking-widest group-hover:text-emerald-400 transition-colors">PUZZLE</span>
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


            <CyberpunkButton
                variant="danger"
                onMouseEnter={() => setGlitch(true)}
                onMouseLeave={() => setGlitch(false)}
                onClick={handleLockedMission}
                className={cn("w-full", glitch ? "animate-shake" : "")}
            >
                <div className="flex items-center gap-2">
                    <Lock size={16} />
                    <span>ACCESS_DENIED</span>
                </div>
            </CyberpunkButton>
        </div>
    )
}
