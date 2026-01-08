import { motion, AnimatePresence } from "framer-motion"
import CyberpunkButton from "@/components/ui/cyber-button"
import { Terminal, Shield, Zap, Target, Sparkles, Rocket, Star, Trophy, Gamepad2, Mail } from "lucide-react"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import FloatingLines from "@/components/floating-lines"
import TypeWriter from "@/components/typewritter"
import RotatingText from "@/components/RotatingText"
import HeaderCoin from "@/components/HeaderCoin"
import Counter from "@/components/counter"
import { useIsMobile } from "@/hook/use-mobile"
import { BorderBeam } from "@/components/BorderBeam"
import CharacterVideo from "@/components/CharacterVideo"

// Animated counter component
const AnimatedCounter = ({ value, suffix = "" }) => {
    const [count, setCount] = useState(0)

    useEffect(() => {
        const duration = 2000
        const steps = 60
        const increment = value / steps
        let current = 0
        const timer = setInterval(() => {
            current += increment
            if (current >= value) {
                setCount(value)
                clearInterval(timer)
            } else {
                setCount(Math.floor(current))
            }
        }, duration / steps)
        return () => clearInterval(timer)
    }, [value])

    return <span>{count.toLocaleString()}{suffix}</span>
}

export default function MainLayout() {
    const [isHovered, setIsHovered] = useState(false)
    const [colorPreset, setColorPreset] = useState(['#4E56C0', '#9B5DE0', '#D78FEE', '#FDCFFA']);
    const isMobile = useIsMobile()

    return (
        // <main className="relative w-full min-h-dvh flex items-center justify-center bg-cyan-300/25 overflow-hidden p-4 md:p-2">
        <main className={`relative w-full min-h-dvh flex bg-cyan-300/25 overflow-hidden p-4 md:p-2 ${isMobile ? "items-end" : "items-center justify-center"}`} >
            {/* Background Image */}
            <div className="absolute inset-0 ">
                {isMobile && (
                    <img
                        src="/assets/images/mobile-image.png"
                        alt="Background"
                        className="w-full h-full object-cover"
                    />
                )}
                <img
                    src="/assets/images/desktop-image.png"
                    alt="Background"
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-12 items-center">
                {/* Content Section */}
                <div className="hidden md:block" />
                <motion.div
                    className="flex flex-col space-y-5 sm:space-y-6 "
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    {/* Status indicator */}
                    <motion.div
                        className="flex items-center space-x-3"
                        animate={{ opacity: [0.7, 1, 0.7] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <motion.div
                            className="w-3 h-3 rounded-full bg-green-400"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            style={{ boxShadow: '0 0 10px #4ade80' }}
                        />
                    </motion.div>

                    <div className="space-y-2">
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-sans font-black uppercase leading-none">
                            <span className="text-foreground">Ready to be a </span>
                            <RotatingText
                                texts={['CHAMPION?', 'EXPERT?', 'SKILLED?', 'WIZARD?']}
                                mainClassName="text-secondary overflow-hidden py-0.5 sm:py-1 md:py-2 justify-start rounded-lg"
                                staggerFrom={"first"}
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                exit={{ y: "-120%" }}
                                staggerDuration={0.025}
                                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                                rotationInterval={5000}
                            />
                        </h1>
                        {/* <motion.h2
                            className="text-xl sm:text-2xl font-bold text-secondary"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            Welcome to <span className="italic text-primary">HUNARHO</span> 🚀
                        </motion.h2> */}
                    </div>

                    <motion.div
                        className="h-1 bg-linear-to-r from-primary via-secondary to-yellow-400 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: "60%" }}
                        transition={{ duration: 1, delay: 0.3 }}
                        style={{ boxShadow: '0 0 20px var(--primary)' }}
                    />

                    {/* Mission Card */}
                    <motion.div
                        className="relative bg-cyan-300/10 backdrop-blur-lg border border-cyan-300 p-4 sm:p-5 space-y-4 overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        whileHover={{
                            borderColor: 'var(--primary)',
                            boxShadow: '0 0 30px rgba(6,182,212,0.3)',
                        }}
                    >
                        {/* Decorative icons */}
                        <motion.div
                            className="absolute top-3 right-3"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        >
                            <Gamepad2 className="w-8 h-8 text-primary/20" />
                        </motion.div>

                        {/* Mission header */}
                        <div className="flex items-center gap-2">
                            <motion.div
                                animate={{ rotate: [0, 15, -15, 0] }}
                                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                            >
                                🚀
                            </motion.div>
                            <h2 className="text-sm md:text-lg font-mono uppercase tracking-widest text-white font-extrabold">
                                Welcome to <span className="italic text-secondary">HUNARHO</span>
                            </h2>
                        </div>

                        {/* Mission description */}
                        <div className="text-sm md:text-lg text-white font-mono leading-relaxed">
                            <TypeWriter
                                text="Hey Champion! 👋 Get ready to learn awesome stuff about ROBOTS! Complete missions, earn coins, and become a tech superhero! 🦸‍♂️"
                                delay={30}
                            />
                        </div>

                        {/* Stats grid */}
                        <div className="grid grid-cols-4 gap-3 mb-0">
                            <motion.div
                                className="text-center p-2 bg-primary/30 rounded-lg border border-primary/30"
                                whileHover={{ scale: 1.05, backgroundColor: 'rgba(6,182,212,0.2)' }}
                            >
                                <div className="flex items-center justify-center gap-1 text-yellow-400">
                                    <HeaderCoin size={24} className="group-hover:animate-pulse" />
                                    <span className="font-bold text-base sm:text-lg">
                                        <AnimatedCounter value={1000} />
                                    </span>
                                </div>
                            </motion.div>

                            {/* <motion.div
                                className="text-center p-2 bg-green-500/10 rounded-lg border border-green-500/30"
                                whileHover={{ scale: 1.05, backgroundColor: 'rgba(34,197,94,0.2)' }}
                            >
                                <div className="flex items-center justify-center gap-1 text-green-400">
                                    <span className="text-2xl animate-pulse">🎯</span>
                                    <span className="font-bold text-base sm:text-lg">EASY</span>
                                </div>
                                {/* <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">
                                    Level 🎯
                                </div> */}

                            <Link to="/spin-and-win">
                                <motion.div
                                    className="text-center p-2 bg-pink-500/10 rounded-lg border border-pink-500/30 cursor-pointer h-full flex flex-col justify-center"
                                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(236,72,153,0.2)' }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <div className="flex items-center justify-center gap-1 text-pink-400">
                                        <Sparkles className="w-4 h-4 animate-spin-slow" />
                                        <span className="font-bold text-base sm:text-lg">SPIN</span>
                                    </div>
                                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">
                                        WIN PRIZES!
                                    </div>
                                </motion.div>
                            </Link>
                        </div>
                        <BorderBeam duration={8} size={100} />
                    </motion.div>

                    {/* CTA Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="relative"
                    >
                        <CyberpunkButton
                            variant="secondary"
                            className="w-full max-w-sm relative text-base sm:text-lg"
                        >
                            <Link to="/missions" className="flex items-center justify-center gap-2">
                                <motion.span
                                    animate={{ rotate: [0, 15, -15, 0] }}
                                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                                >
                                    🚀
                                </motion.span>
                                Start Your Adventure!
                                <motion.span
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                >
                                    →
                                </motion.span>
                            </Link>
                        </CyberpunkButton>
                    </motion.div>

                </motion.div>
            </div>
        </main>
    )
}
