import { motion, AnimatePresence } from "framer-motion"
import CyberpunkButton from "@/components/ui/cyber-button"
import { Terminal, Shield, Zap, Target, Sparkles, Rocket, Star, Trophy, Gamepad2, Mail } from "lucide-react"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import FloatingLines from "@/components/floating-lines"
import TypeWriter from "@/components/typewritter"
import { AmbientFloat, } from "@/components/FloatingAround"

// Glitch text animation component
const GlitchText = ({ children, className }) => {
    return (
        <motion.span
            className={`relative inline-block ${className}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <span className="relative z-10">{children}</span>
            <motion.span
                className="absolute inset-0 text-secondary opacity-70"
                animate={{
                    x: [0, -2, 2, 0],
                    opacity: [0.7, 0.4, 0.7, 0.7],
                }}
                transition={{
                    duration: 0.3,
                    repeat: Infinity,
                    repeatDelay: 3,
                }}
                style={{ clipPath: 'inset(0 0 50% 0)' }}
            >
                {children}
            </motion.span>
            <motion.span
                className="absolute inset-0 text-primary opacity-70"
                animate={{
                    x: [0, 2, -2, 0],
                    opacity: [0.7, 0.4, 0.7, 0.7],
                }}
                transition={{
                    duration: 0.3,
                    repeat: Infinity,
                    repeatDelay: 3,
                    delay: 0.1,
                }}
                style={{ clipPath: 'inset(50% 0 0 0)' }}
            >
                {children}
            </motion.span>
        </motion.span>
    )
}


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

    return (
        <main className="relative w-full min-h-dvh flex items-center justify-center overflow-hidden p-4 md:p-2">
            <div className="absolute inset-0 z-0">
                <FloatingLines
                    linesGradient={colorPreset}
                    enabledWaves={["bottom", "middle", "top"]}
                    lineCount={[4, 6, 3]}
                    lineDistance={[8, 5, 10]}
                    animationSpeed={0.8}
                    interactive={true}
                    bendRadius={5.0}
                    bendStrength={-0.5}
                    mouseDamping={0.05}
                    parallax={true}
                    parallaxStrength={0.15}
                    mixBlendMode="screen"
                />
            </div>

            <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-12 items-center">
                {/* Character Section */}
                <motion.div
                    className="relative flex justify-center items-center"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div
                        className="relative"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        {/* Character glow effect */}
                        <motion.div
                            className="absolute inset-0 blur-3xl opacity-30"
                            style={{
                                background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)',
                            }}
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.2, 0.4, 0.2],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        />

                        {/* Floating sparkles around character */}
                        <AnimatePresence>
                            {isHovered && (
                                <>
                                    {[...Array(6)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className="absolute"
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{
                                                opacity: [0, 1, 0],
                                                scale: [0, 1, 0],
                                                x: Math.cos(i * 60 * Math.PI / 180) * 120,
                                                y: Math.sin(i * 60 * Math.PI / 180) * 120 - 200,
                                            }}
                                            exit={{ opacity: 0 }}
                                            transition={{
                                                duration: 1.5,
                                                repeat: Infinity,
                                                delay: i * 0.2,
                                            }}
                                            style={{
                                                left: '50%',
                                                top: '50%',
                                            }}
                                        >
                                            <Sparkles className="w-5 h-5 text-yellow-400" />
                                        </motion.div>
                                    ))}
                                </>
                            )}
                        </AnimatePresence>

                        {/* Character image with floating animation */}
                        <motion.div
                            className="relative w-full max-w-[260px] sm:max-w-sm"
                            animate={{
                                y: [0, -15, 0],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            <motion.img
                                src="/peep-standing-15.png"
                                alt="Your Avatar"
                                className="w-full h-[250px] md:h-[450px] object-contain drop-shadow-2xl"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            />

                            <motion.div
                                animate={{
                                    opacity: [0.6, 1, 0.6],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            >
                                <AmbientFloat baseX={0} baseY={-180}>
                                    <Sparkles className="w-6 h-6 text-yellow-400" />
                                </AmbientFloat>

                                {/* LEFT */}
                                <AmbientFloat baseX={-160} baseY={-40}>
                                    <Star className="w-6 h-6 text-purple-400" />
                                </AmbientFloat>

                                {/* RIGHT */}
                                <AmbientFloat baseX={160} baseY={-20}>
                                    <Zap className="w-6 h-6 text-blue-400" />
                                </AmbientFloat>

                                {/* BOTTOM */}
                                <AmbientFloat baseX={40} baseY={-140}>
                                    <Mail className="w-6 h-6 text-red-400" />
                                </AmbientFloat>

                            </motion.div>


                        </motion.div>
                    </div>
                </motion.div>

                {/* Content Section */}
                <motion.div
                    className="flex flex-col space-y-5 sm:space-y-6"
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

                    <div className="space-y-2 hidden md:block">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-sans font-black uppercase leading-none">
                            <span className="text-foreground">Ready to be a </span>
                            <GlitchText className="text-primary">CHAMPION? </GlitchText>
                            <span className="text-foreground">?</span>
                        </h1>
                        <motion.h2
                            className="text-xl sm:text-2xl font-bold text-secondary"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            Welcome to <span className="italic text-primary">HUNARHO</span> 🚀
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            The Ultimate Playground for AI, Innovation, and Financial Wisdom.
                        </motion.p>
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
                        className="relative bg-background border border-primary/30 p-4 sm:p-5 space-y-4 overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        whileHover={{
                            borderColor: 'var(--primary)',
                            boxShadow: '0 0 30px rgba(6,182,212,0.3)',
                        }}
                    >
                        {/* Card glow effect */}
                        <motion.div
                            className="absolute -top-20 -right-20 w-40 h-40 opacity-20"
                            style={{ background: 'radial-gradient(circle, var(--secondary) 0%, transparent 70%)' }}
                            animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.3, 0.1] }}
                            transition={{ duration: 4, repeat: Infinity }}
                        />

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
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <Rocket className="w-5 h-5 text-yellow-400" />
                            </motion.div>
                            <h2 className="text-sm sm:text-base font-mono uppercase tracking-widest text-secondary font-bold">
                                🎮 Your First Quest!
                            </h2>
                        </div>

                        {/* Mission description */}
                        <div className="text-xs sm:text-sm text-muted-foreground font-mono leading-relaxed">
                            <TypeWriter
                                text="Hey Champion! 👋 Get ready to learn awesome stuff about ROBOTS! Complete missions, earn coins, and become a tech superhero! 🦸‍♂️"
                                delay={30}
                            />
                        </div>

                        {/* Stats grid */}
                        <div className="grid grid-cols-3 gap-3 pt-2">
                            <motion.div
                                className="text-center p-2 bg-primary/10 rounded-lg border border-primary/30"
                                whileHover={{ scale: 1.05, backgroundColor: 'rgba(6,182,212,0.2)' }}
                            >
                                <div className="flex items-center justify-center gap-1 text-yellow-400">
                                    <Zap className="w-4 h-4" />
                                    <span className="font-bold text-base sm:text-lg">
                                        <AnimatedCounter value={1000} />
                                    </span>
                                </div>
                                <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">
                                    Coins 💰
                                </div>
                            </motion.div>

                            <motion.div
                                className="text-center p-2 bg-secondary/10 rounded-lg border border-secondary/30"
                                whileHover={{ scale: 1.05, backgroundColor: 'rgba(168,85,247,0.2)' }}
                            >
                                <div className="flex items-center justify-center gap-1 text-secondary">
                                    <Trophy className="w-4 h-4" />
                                    <span className="font-bold text-base sm:text-lg">
                                        <AnimatedCounter value={500} />
                                    </span>
                                </div>
                                <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">
                                    XP ⭐
                                </div>
                            </motion.div>

                            <motion.div
                                className="text-center p-2 bg-green-500/10 rounded-lg border border-green-500/30"
                                whileHover={{ scale: 1.05, backgroundColor: 'rgba(34,197,94,0.2)' }}
                            >
                                <div className="flex items-center justify-center gap-1 text-green-400">
                                    <Target className="w-4 h-4" />
                                    <span className="font-bold text-base sm:text-lg">EASY</span>
                                </div>
                                <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">
                                    Level 🎯
                                </div>
                            </motion.div>
                        </div>
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
                            className="w-full max-w-sm relative text-base sm:text-lg py-4"
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