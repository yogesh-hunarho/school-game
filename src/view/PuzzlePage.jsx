import { motion } from "framer-motion"
import PuzzleGame from "@/components/PuzzleGame"

const PuzzlePage = () => {
    return (
        <div className="relative min-h-screen overflow-hidden bg-linear-to-br from-slate-950 via-slate-900 to-slate-950">
            {/* Radial gradient background */}
            <div className="fixed inset-0 opacity-40 pointer-events-none z-0">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at 15% 30%, rgba(6, 182, 212, 0.15) 0%, transparent 45%), radial-gradient(circle at 85% 70%, rgba(168, 85, 247, 0.15) 0%, transparent 45%), radial-gradient(circle at 50% 100%, rgba(236, 72, 153, 0.1) 0%, transparent 40%)",
                    }}
                ></div>
            </div>

            {/* Animated grid background */}
            <div className="fixed inset-0 opacity-[0.06] pointer-events-none z-0">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage:
                            "linear-gradient(0deg, transparent 24%, rgba(6, 182, 212, 0.15) 25%, rgba(6, 182, 212, 0.15) 26%, transparent 27%, transparent 74%, rgba(6, 182, 212, 0.15) 75%, rgba(6, 182, 212, 0.15) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(6, 182, 212, 0.15) 25%, rgba(6, 182, 212, 0.15) 26%, transparent 27%, transparent 74%, rgba(6, 182, 212, 0.15) 75%, rgba(6, 182, 212, 0.15) 76%, transparent 77%, transparent)",
                        backgroundSize: "60px 60px",
                        animation: "gridScan 10s linear infinite",
                    }}
                ></div>
            </div>

            {/* Floating particles decoration */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-cyan-400/30 rounded-full"
                        style={{
                            left: `${10 + i * 12}%`,
                            top: `${20 + (i % 3) * 25}%`,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            opacity: [0.3, 0.7, 0.3],
                            scale: [1, 1.3, 1],
                        }}
                        transition={{
                            duration: 3 + i * 0.5,
                            repeat: Infinity,
                            delay: i * 0.3,
                        }}
                    />
                ))}
            </div>

            {/* Main game content */}
            <motion.div
                className="relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <PuzzleGame />
            </motion.div>

            {/* CSS for grid animation */}
            <style>{`
                @keyframes gridScan {
                    0% {
                        background-position: 0 0;
                    }
                    100% {
                        background-position: 60px 60px;
                    }
                }
            `}</style>
        </div>
    )
}

export default PuzzlePage
