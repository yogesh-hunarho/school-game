import { cn } from "@/lib/utils"
import { Lock, ShieldAlert, Wifi, Cpu, Zap, Star, Info, FileQuestionMark, Video } from "lucide-react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import useSound from "@/hook/useSound"
import CyberpunkButton from "../cyber-button"
import HeaderCoin from "@/components/HeaderCoin"

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


    return (
        <div className={`relative group h-full p-4 transition-transform duration-500 backdrop-blur-xl bg-background/10`}>
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
                    <p className="text-white font-mono text-xs line-clamp-2 italic font-wider mb-2">
                        {module.description || "Initializing module protocols for advanced neural development and engineering training."}
                    </p>
                </div>

            </div>
            <div className="grid grid-cols-3 gap-2 mb-5 mt-5">
                {/* COINS */}
                <div className="flex items-center gap-3 border border-cyan-500/30 bg-slate-900/60 p-2 hover:border-cyan-400/60 transition">
                    <div className="p-1 bg-yellow-500/10">
                        <HeaderCoin />
                    </div>
                    <div className="font-mono">
                        <p className="font-bold text-[10px] text-slate-500 uppercase tracking-wide">
                            COIN EARN
                        </p>
                        <p className="font-black text-sm text-white">
                            {module.totalStars * 100}
                        </p>
                    </div>
                </div>

                {/* VIDEOS */}
                <div className="flex items-center gap-3 border border-cyan-500/30 bg-slate-900/60 p-2 hover:border-cyan-400/60 transition">
                    <div className="p-1.5 bg-yellow-500/10">
                        <Video className="w-4 h-4 text-cyan-400 animate-pulse" />
                    </div>
                    <div className="font-mono text-cyan-400">
                        <p className="font-bold text-[10px] text-slate-500 uppercase tracking-wide">
                            VIDEO
                        </p>
                        <p className="font-black text-sm text-white">
                            {module.videos}
                        </p>
                    </div>
                </div>

                {/* QUIZZES */}
                <div className="flex items-center gap-3 border border-cyan-500/30 bg-slate-900/60 p-2 hover:border-cyan-400/60 transition">
                    <div className="p-1.5 bg-yellow-500/10">
                        <FileQuestionMark className="w-4 h-4 text-cyan-400 animate-pulse" />
                    </div>
                    <div className="font-mono">
                        <p className="font-bold text-[10px] text-slate-500 uppercase tracking-wide">
                            QUIZZES
                        </p>
                        <p className="font-black text-sm text-white">
                            {module.quizzes}
                        </p>
                    </div>
                </div>
            </div>


            <CyberpunkButton
                variant="danger"
                onMouseEnter={() => setGlitch(true)}
                onMouseLeave={() => setGlitch(false)}
                onClick={() => playSound("disabled")}
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
