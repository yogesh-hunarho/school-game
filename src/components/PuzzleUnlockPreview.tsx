import type React from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Lock, Sparkles, Zap } from "lucide-react"
import { useLMSStore } from "../store/lms-store"
import { useNavigate } from "react-router-dom";
import CyberpunkProgressBar from "./ui/cyber-component/cyberpunk-progress-bar";
import CyberpunkButton from "./ui/cyber-button";

const TOTAL_TILES = 9
const IMAGE_URL = "/assets/puzzle/cyberpunk-student.png"

interface PuzzleUnlockPreviewProps {
    onStartGame: () => void
}

const PuzzleUnlockPreview: React.FC<PuzzleUnlockPreviewProps> = ({ onStartGame }) => {
    const { player } = useLMSStore()
    const unlockedCount = player?.unlockedPuzzleCount || 0
    const allUnlocked = unlockedCount >= 9

    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="relative min-h-screen text-white overflow-hidden mb-28">
            {/* Background Grid & Effects */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[50px_50px]" />
                <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-500/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-yellow-500/5 blur-[120px] rounded-full" />
            </div>

            <div className="relative xl:max-w-7xl lg:max-w-6xl md:max-w-5xl max-w-4xl mx-auto flex flex-col pt-10">
                <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6 p-4 bg-black/40 backdrop-blur-xl border border-white/5 shadow-2xl">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleBack}
                            className="p-2 hover:bg-white/10 rounded-xl transition-colors text-zinc-400 hover:text-white"
                        >
                            <ArrowLeft className="w-6 h-6" />
                        </button>
                        <h1 className="text-md md:text-lg font-black tracking-wider italic uppercase text-white">
                            PUZZLE
                        </h1>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 md:gap-8">
                        <div className="flex flex-col gap-1.5 min-w-[200px]">
                            <p className="text-cyan-300/80 text-xs max-w-md mx-auto font-mono mb-0">
                                {allUnlocked
                                    ? "🎉 All pieces unlocked! You can now play the puzzle game!"
                                    : `Complete missions to unlock puzzle pieces! (${unlockedCount}/${TOTAL_TILES})`}
                            </p>
                            <div className="h-4 flex items-center">
                                <CyberpunkProgressBar height="4" hideLabel progress={(unlockedCount / TOTAL_TILES || 0) * 100} />
                            </div>
                        </div>
                    </div>
                </header>
                <div className="flex-1 flex flex-col items-center justify-center">
                    {/* Centered Content Container */}
                    <div className="w-full max-w-6xl flex flex-col items-center gap-3">
                        <div className="flex gap-3 w-full overflow-x-auto scrollbar-hide py-2 px-1">
                            {Array.from({ length: TOTAL_TILES }, (_, index) => {
                                const isUnlocked = index < unlockedCount
                                const positionX = (index / (TOTAL_TILES - 1)) * 100

                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ scale: 0.85, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: index * 0.05 }}
                                        className={`
                                        relative shrink-0
                                        w-24 h-24
                                        sm:w-24 sm:h-24
                                        md:w-28 md:h-28
                                        rounded-sm overflow-hidden
                                        transition-all duration-500
                                        ${isUnlocked
                                                ? "ring-2 ring-cyan-500/40"
                                                : "ring-1 ring-white/10 grayscale"}
                                    `}
                                    >
                                        {/* IMAGE SLICE */}
                                        <div
                                            className="absolute inset-0 bg-cover transition-transform duration-700 group-hover:scale-110"
                                            style={{
                                                backgroundImage: `url(${IMAGE_URL})`,
                                                backgroundSize: `${TOTAL_TILES * 100}% 100%`,
                                                backgroundPosition: `${positionX}% center`,
                                                opacity: isUnlocked ? 1 : 0.35,
                                            }}
                                        />

                                        {/* LOCK OVERLAY */}
                                        {!isUnlocked && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md">
                                                <Lock className="w-6 h-6 text-white" />
                                            </div>
                                        )}

                                        {/* TILE INDEX */}
                                        <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded-md bg-black/70 text-[10px] font-mono text-zinc-400">
                                            {(index + 1).toString().padStart(2, "0")}
                                        </div>

                                        {/* UNLOCK PULSE */}
                                        {isUnlocked && (
                                            <div className="absolute inset-0 ring-1 ring-cyan-400/30 animate-pulse pointer-events-none" />
                                        )}
                                    </motion.div>
                                )
                            })}

                        </div>

                        <CyberpunkButton
                            disabled={!allUnlocked}
                            className={"text-white"}
                            variant="primary"
                            onClick={onStartGame}
                        >
                            {allUnlocked ? <Zap className="w-6 h-6 fill-current" /> : <Lock className="w-6 h-6" />}
                            <span className="relative z-10">{allUnlocked ? "INITIALIZE CHALLENGE" : "CORE DECODING REQUIRED"}</span>
                            {allUnlocked && <Sparkles className="w-6 h-6 animate-pulse" />}
                        </CyberpunkButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PuzzleUnlockPreview

