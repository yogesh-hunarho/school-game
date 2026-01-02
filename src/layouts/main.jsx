import { motion, AnimatePresence } from "framer-motion"
import CyberpunkButton from "@/components/ui/cyber-button"
import { Terminal, Shield, Zap, Target, Sparkles, Rocket, Star, Trophy, Gamepad2 } from "lucide-react"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

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

// Floating particles component
const FloatingParticles = () => {
    const particles = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        size: Math.random() * 6 + 4,
        x: Math.random() * 100,
        delay: Math.random() * 5,
        duration: Math.random() * 10 + 15,
    }))

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full"
                    style={{
                        width: particle.size,
                        height: particle.size,
                        left: `${particle.x}%`,
                        bottom: '-10%',
                        background: `linear-gradient(135deg, 
                            ${particle.id % 3 === 0 ? 'var(--primary)' :
                                particle.id % 3 === 1 ? 'var(--secondary)' : '#fbbf24'})`,
                        boxShadow: `0 0 ${particle.size * 2}px ${particle.id % 3 === 0 ? 'var(--primary)' :
                            particle.id % 3 === 1 ? 'var(--secondary)' : '#fbbf24'}`,
                    }}
                    animate={{
                        y: [0, -800],
                        opacity: [0, 1, 1, 0],
                        scale: [0.5, 1, 1, 0.5],
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        delay: particle.delay,
                        ease: "linear",
                    }}
                />
            ))}
        </div>
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

// Typing effect component
const TypeWriter = ({ text, delay = 50 }) => {
    const [displayText, setDisplayText] = useState("")
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayText(prev => prev + text[currentIndex])
                setCurrentIndex(prev => prev + 1)
            }, delay)
            return () => clearTimeout(timeout)
        }
    }, [currentIndex, text, delay])

    return (
        <span>
            {displayText}
            <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="text-primary"
            >
                |
            </motion.span>
        </span>
    )
}

export default function MainLayout() {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <main className="relative w-full flex items-center justify-center overflow-hidden mt-6 p-4 md:p-2 mb-5">
            {/* Floating particles background */}
            <FloatingParticles />

            {/* Animated grid background */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0"
                    style={{
                        backgroundImage: `
                            linear-gradient(var(--primary) 1px, transparent 1px),
                            linear-gradient(90deg, var(--primary) 1px, transparent 1px)
                        `,
                        backgroundSize: '50px 50px',
                    }}
                />
            </div>

            <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center">
                {/* Character Section */}
                <motion.div
                    className="relative flex justify-center items-end"
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
                                className="w-full h-[450px] sm:h-[500px] object-contain drop-shadow-2xl"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            />
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

                    {/* Main title */}
                    <div className="space-y-2">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-sans font-black uppercase leading-none">
                            <span className="text-foreground">Ready to be a </span>
                            <GlitchText className="text-primary">LEGEND</GlitchText>
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
                    </div>

                    {/* Animated divider */}
                    <motion.div
                        className="h-1 bg-linear-to-r from-primary via-secondary to-yellow-400 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: "60%" }}
                        transition={{ duration: 1, delay: 0.3 }}
                        style={{ boxShadow: '0 0 20px var(--primary)' }}
                    />

                    {/* Mission Card */}
                    <motion.div
                        className="relative bg-linear-to-br from-muted/40 to-muted/20 border border-primary/30 p-4 sm:p-5 space-y-4 overflow-hidden"
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
                            <Link to="/courses" className="flex items-center justify-center gap-2">
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



// import { motion, AnimatePresence } from "framer-motion"
// import CyberpunkButton from "@/components/ui/cyber-button"
// import { Terminal, Shield, Zap, Target, Sparkles, Rocket, Star, Trophy, Gamepad2, Bot } from "lucide-react"
// import { Link } from "react-router-dom"
// import { useState, useEffect } from "react"




// const TypeWriter = ({ text, delay = 50 }) => {
//     const [displayText, setDisplayText] = useState("")
//     const [currentIndex, setCurrentIndex] = useState(0)

//     useEffect(() => {
//         if (currentIndex < text.length) {
//             const timeout = setTimeout(() => {
//                 setDisplayText(prev => prev + text[currentIndex])
//                 setCurrentIndex(prev => prev + 1)
//             }, delay)
//             return () => clearTimeout(timeout)
//         }
//     }, [currentIndex, text, delay])

//     return (
//         <span>
//             {displayText}
//             <motion.span
//                 animate={{ opacity: [1, 0] }}
//                 transition={{ duration: 0.5, repeat: Infinity }}
//                 className="text-primary"
//             >
//                 |
//             </motion.span>
//         </span>
//     )
// }

// const AnimatedCounter = ({ value, suffix = "" }) => {
//     const [count, setCount] = useState(0)

//     useEffect(() => {
//         const duration = 2000
//         const steps = 60
//         const increment = value / steps
//         let current = 0
//         const timer = setInterval(() => {
//             current += increment
//             if (current >= value) {
//                 setCount(value)
//                 clearInterval(timer)
//             } else {
//                 setCount(Math.floor(current))
//             }
//         }, duration / steps)
//         return () => clearInterval(timer)
//     }, [value])

//     return <span>{count.toLocaleString()}{suffix}</span>
// }
// // Enhanced GlitchText with stronger cyberpunk effect
// const GlitchText = ({ children, className = "" }) => {
//     return (
//         <motion.span className={`relative inline-block ${className}`}>
//             <span className="relative z-10">{children}</span>
//             <motion.span className="absolute inset-0 text-cyan-400 opacity-80" animate={{ x: [-3, 3, -3], y: [2, -2, 2] }} transition={{ duration: 0.15, repeat: Infinity, repeatDelay: 4 }}>
//                 {children}
//             </motion.span>
//             <motion.span className="absolute inset-0 text-pink-500 opacity-80" animate={{ x: [3, -3, 3], y: [-2, 2, -2] }} transition={{ duration: 0.15, repeat: Infinity, repeatDelay: 4, delay: 0.05 }}>
//                 {children}
//             </motion.span>
//         </motion.span>
//     )
// }


// // CSS Variables in your global CSS (tailwind.config or index.css)
// const cyberTheme = {
//     '--cyan': '#00FFFF',
//     '--pink': '#FF00FF',
//     '--yellow': '#FFFF00',
//     '--bg': '#0a0a1f',
// }

// export default function ProductionLanding() {
//     return (
//         <main className="relative overflow-hidden max-h-screen">
//             {/* Subtle Background */}
//             <div
//                 className="absolute inset-0 bg-cover bg-center opacity-30"
//                 style={{ backgroundImage: "url('https://images.alphacoders.com/135/1355218.jpg')" }} // High-quality neon city
//             />


//             {/* Content */}
//             <div className="relative z-10 container mx-auto px-6 pt-10">
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
//                     <motion.div
//                         className="flex justify-center"
//                         initial={{ opacity: 0, y: 50 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.8 }}
//                     >

//                     </motion.div>
//                     <div className="space-y-6">
//                         <motion.div
//                             className="space-y-4"
//                             initial={{ opacity: 0, x: -50 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{ duration: 0.8, delay: 0.4 }}
//                         >
//                             <h1 className="text-3xl md:text-5xl font-black uppercase leading-tight">
//                                 <span className="text-white">Ready to</span>{' '}
//                                 <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-pink-500">Hack the Future</span>
//                                 <span className="text-white">?</span>
//                             </h1>
//                             <h2 className="text-3xl md:text-4xl font-bold text-pink-400">
//                                 Welcome to <span className="text-yellow-400">HUNARHO</span> 🚀
//                             </h2>
//                         </motion.div>

//                         {/* Divider */}
//                         <motion.div
//                             className="h-1 w-64 bg-linear-to-r from-cyan-400 via-pink-500 to-yellow-400 rounded-full"
//                             initial={{ scaleX: 0 }}
//                             animate={{ scaleX: 1 }}
//                             transition={{ duration: 1, delay: 0.8 }}
//                         />

//                         {/* Mission Card - Holographic Style */}
//                         <motion.div
//                             className="relative bg-linear-to-br from-white/5 to-white/10 backdrop-blur-xl border border-cyan-400/30 p-5"
//                             initial={{ opacity: 0, y: 30 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ delay: 0.6 }}
//                             whileHover={{ borderColor: '#FF00FF', scale: 1.02 }}
//                         >
//                             <div className="flex items-center gap-4 mb-6">
//                                 <Rocket className="w-10 h-10 text-yellow-400" />
//                                 <h3 className="text-2xl font-mono uppercase text-cyan-400">First Quest Unlocked!</h3>
//                             </div>

//                             <p className="text-lg text-gray-200 mb-8 leading-relaxed">
//                                 Hey Champion! 👾 Master robots, code your future, complete missions, and become a tech legend in the neon world!
//                             </p>

//                             <div className="grid grid-cols-3 gap-6">
//                                 <div className="text-center">
//                                     <Zap className="w-8 h-8 mx-auto text-yellow-400 mb-2" />
//                                     <p className="text-2xl font-bold text-yellow-400">1,000</p>
//                                     <p className="text-sm uppercase text-gray-400">Coins</p>
//                                 </div>
//                                 <div className="text-center">
//                                     <Trophy className="w-8 h-8 mx-auto text-pink-500 mb-2" />
//                                     <p className="text-2xl font-bold text-pink-500">500</p>
//                                     <p className="text-sm uppercase text-gray-400">XP</p>
//                                 </div>
//                                 <div className="text-center">
//                                     <Target className="w-8 h-8 mx-auto text-cyan-400 mb-2" />
//                                     <p className="text-2xl font-bold text-cyan-400">EASY</p>
//                                     <p className="text-sm uppercase text-gray-400">Level</p>
//                                 </div>
//                             </div>
//                         </motion.div>

//                         {/* CTA */}
//                         <CyberpunkButton
//                             variant="primary"
//                             className="w-full mb-2 max-w-sm relative text-base sm:text-lg py-4 bg-linear-to-br from-white/5 to-white/10"
//                         >
//                             <Link to="/courses" className="flex items-center justify-center gap-2">
//                                 <motion.span
//                                     animate={{ rotate: [0, 15, -15, 0] }}
//                                     transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
//                                 >
//                                     🚀
//                                 </motion.span>
//                                 Start Your Adventure!
//                                 <motion.span
//                                     animate={{ x: [0, 5, 0] }}
//                                     transition={{ duration: 1, repeat: Infinity }}
//                                 >
//                                     →
//                                 </motion.span>
//                             </Link>
//                         </CyberpunkButton>
//                         {/* <motion.div
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             transition={{ delay: 1 }}
//                         >
//                             <Link to="/courses">
//                                 <button className="group relative w-full md:w-auto px-12 py-6 text-xl font-bold uppercase tracking-wider bg-gradient-to-r from-cyan-500 to-pink-500 rounded-xl shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300">
//                                     <span className="relative z-10 flex items-center justify-center gap-4">
//                                         <Rocket className="w-8 h-8 group-hover:rotate-12 transition" />
//                                         Start Your Adventure
//                                         <span className="group-hover:translate-x-2 transition">→</span>
//                                     </span>
//                                 </button>
//                             </Link>
//                         </motion.div> */}
//                     </div>
//                 </div>
//             </div>
//         </main>
//     )
// }