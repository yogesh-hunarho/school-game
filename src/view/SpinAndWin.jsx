import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { useLMSStore } from '../store/lms-store';
import { Sparkles, History, X, Zap, ArrowLeft, Gift, Trophy, Crosshair, CircuitBoard } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useNavigate } from 'react-router-dom';
import CyberpunkButton from '../components/ui/cyber-button';
import { cn } from '../lib/utils';
import Counter from '../components/counter';
import { useSound } from '../hook/useSound';
import { BorderBeam } from '../components/BorderBeam';

const PRIZES = [
    { id: 'tshirt', label: 'T-Shirt', img: '/assets/spin/tshirt.png', color: '#ff2d5b', type: 'goodie', probability: 0.008 },
    { id: 'mug', label: 'Mug', img: '/assets/spin/mug.png', color: '#ffc53a', type: 'goodie', probability: 0.007 },
    { id: 'keychain', label: 'Keychain', img: '/assets/spin/key.png', color: '#5c75ff', type: 'goodie', probability: 0.01 },
    { id: 'science', label: 'Project', img: '/assets/spin/project.png', color: '#00ff9f', type: 'goodie', probability: 0.005 },
    { id: 'better_luck', label: 'Next_Time', img: '/assets/spin/next_time.png', color: '#64748b', type: 'miss', probability: 0.97 },
];

const SPIN_COST = 1;

// Floating particle component
const FloatingParticle = ({ delay, duration, left, color = 'cyan' }) => (
    <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: "-100%", opacity: [0, 1, 1, 0] }}
        transition={{ duration, delay, repeat: Infinity, ease: "linear" }}
        className={`absolute w-1 h-1 ${color === 'cyan' ? 'bg-cyan-400' : color === 'pink' ? 'bg-pink-400' : 'bg-yellow-400'} rounded-full`}
        style={{ left: `${left}%` }}
    />
);

// Glitch text effect
const GlitchText = ({ children, className }) => (
    <span className={cn("relative inline-block", className)}>
        <span className="relative z-10">{children}</span>
        <span className="absolute top-0 left-0.5 text-cyan-400 opacity-70 animate-pulse" style={{ clipPath: 'inset(0 0 50% 0)' }}>{children}</span>
        <span className="absolute top-0 -left-0.5 text-pink-500 opacity-70 animate-pulse" style={{ clipPath: 'inset(50% 0 0 0)', animationDelay: '0.1s' }}>{children}</span>
    </span>
);

const SpinAndWin = () => {
    const navigate = useNavigate();
    const { player, addSpinResult } = useLMSStore();
    const { playSound, playClick } = useSound();
    const [isSpinning, setIsSpinning] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const [result, setResult] = useState(null);
    const wheelRef = useRef(null);
    const [rotation, setRotation] = useState(0);
    const tickRef = useRef(null);

    // Animation Controls
    const pointerControls = useAnimation();
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useTransform(mouseY, [-300, 300], [5, -5]);
    const rotateY = useTransform(mouseX, [-300, 300], [-5, 5]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set(e.clientX - centerX);
        mouseY.set(e.clientY - centerY);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    // Cleanup interval on unmount
    useEffect(() => {
        return () => {
            if (tickRef.current) clearInterval(tickRef.current);
        };
    }, []);

    const handleSpin = () => {
        if (player.totalXP < SPIN_COST) {
            return;
        }

        if (isSpinning) return;

        playClick();
        setIsSpinning(true);
        setShowResult(false);
        setShowHistory(false);

        // Weighted random selection based on prizes...
        const rand = Math.random();
        let cumulativeProbability = 0;
        let selectedPrize = PRIZES[PRIZES.length - 1];

        for (const prize of PRIZES) {
            cumulativeProbability += prize.probability;
            if (rand <= cumulativeProbability) {
                selectedPrize = prize;
                break;
            }
        }
        setResult(selectedPrize);

        const selectedIndex = PRIZES.findIndex(p => p.id === selectedPrize.id);
        const segmentAngle = 360 / PRIZES.length;

        const centerAngle = (selectedIndex * segmentAngle) + (segmentAngle / 2);
        const targetAngle = 360 - centerAngle;

        const jitter = (Math.random() * 30) - 15;

        const currentRotation = rotation;
        const normalizedRotation = currentRotation % 360;
        let delta = (targetAngle + jitter) - normalizedRotation;

        if (delta <= 0) {
            delta += 360;
        }

        const minSpins = 5 * 360;
        const newRotation = currentRotation + minSpins + delta;

        setRotation(newRotation);
    };

    const playTickSound = () => {
        pointerControls.start({
            rotate: [0, -20, 0],
            transition: { duration: 0.15, ease: "backOut" }
        });

        const audio = new Audio('/audio/click.wav');
        audio.volume = 0.2;
        audio.play().catch(() => { });
    };

    const onWheelUpdate = (latest) => {
        const r = latest.rotate;
        const segmentAngle = 360 / PRIZES.length;
        const currentTick = Math.floor(r / segmentAngle);

        if (tickRef.current !== currentTick) {
            playTickSound();
            tickRef.current = currentTick;
        }
    };

    const onSpinComplete = () => {
        setIsSpinning(false);
        setShowResult(true);

        if (result) {
            addSpinResult({
                prizeId: result.id,
                label: result.label,
                timestamp: new Date().toISOString(),
                cost: SPIN_COST,
                type: result.type
            });

            if (result.type === 'goodie') {
                playSound('success');
                triggerConfetti();
            }
        }
    };

    const triggerConfetti = () => {
        const duration = 3000;
        const end = Date.now() + duration;

        const frame = () => {
            if (!result) return;
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: [result.color || '#fff', '#22d3ee', '#facc15']
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: [result.color || '#fff', '#22d3ee', '#facc15']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };
        frame();

        confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 },
            scalar: 1.2,
            colors: [result?.color || '#fff', '#ffffff']
        });
    };

    return (
        <div className="relative min-h-dvh font-mono text-cyan-50 overflow-hidden">
            <div className="relative z-10 max-w-7xl mx-auto pt-20">
                <motion.div className="relative flex flex-col lg:flex-row items-center justify-between min-h-[560px] bg-slate-900/30 border border-cyan-400/20 px-6 md:px-8 py-8 overflow-hidden shadow-[0_0_80px_rgba(34,211,238,0.1)] gap-12 backdrop-blur-xl">
                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-cyan-400/50" />
                    <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-pink-500/50" />
                    <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-pink-500/50" />
                    <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-cyan-400/50" />

                    {/* Decorative background within container */}
                    <div className="absolute inset-0 bg-cyan-900/5 pointer-events-none" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_70%)] pointer-events-none" />

                    {/* Circuit pattern overlay */}
                    <div className="absolute inset-0 opacity-5 pointer-events-none">
                        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                                    <path d="M0 50h40M60 50h40M50 0v40M50 60v40" stroke="currentColor" strokeWidth="1" fill="none" className="text-cyan-400" />
                                    <circle cx="50" cy="50" r="4" fill="currentColor" className="text-cyan-400" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#circuit)" />
                        </svg>
                    </div>

                    {/* Left Column: Wheel */}
                    <div className="relative z-10 scale-90 md:scale-100 flex-1 flex justify-center order-1 lg:order-1" style={{ transform: "translateZ(50px)" }}>

                        {/* Pointer - Top Center */}
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-40 w-20 h-20 filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
                            <motion.div
                                animate={pointerControls}
                                className="w-0 h-0 border-l-18 border-l-transparent border-r-18 border-r-transparent border-t-45 border-t-pink-500 mx-auto transform origin-top filter drop-shadow-[0_0_15px_rgba(236,72,153,0.8)]"
                            >
                                <div className="absolute -top-[47px] -left-[18px] w-[36px] h-[36px] bg-slate-900 rounded-full border-4 border-pink-500 flex items-center justify-center shadow-[0_0_20px_rgba(236,72,153,0.6)]">
                                    <motion.div
                                        animate={{ scale: [1, 1.3, 1] }}
                                        transition={{ duration: 1, repeat: Infinity }}
                                        className="w-3 h-3 bg-pink-400 rounded-full"
                                    />
                                </div>
                            </motion.div>
                        </div>

                        {/* Rotating Decorative Rings */}
                        <div className="absolute -inset-28 rounded-full border-2 border-cyan-500/15 border-dashed animate-[spin_60s_linear_infinite]" />
                        <div className="absolute -inset-20 rounded-full border border-pink-400/10 animate-[spin_40s_linear_infinite_reverse]" />
                        <div className="absolute -inset-12 rounded-full border border-yellow-400/5 animate-[spin_30s_linear_infinite]" />

                        {/* Outer Glow Ring */}
                        <div className="absolute -inset-10 rounded-full border border-cyan-500/20 opacity-50 blur-xl animate-pulse" />

                        {/* Main Wheel Container */}
                        <div className="relative w-[340px] h-[340px] md:w-[440px] md:h-[440px]">

                            {/* Ring Lights Background */}
                            <div className="absolute inset-0 rounded-full border-20 border-slate-900 bg-slate-900 shadow-[0_0_60px_rgba(0,0,0,0.9),inset_0_0_30px_rgba(0,0,0,0.5)]" />

                            {/* Neon outline */}
                            <div className="absolute -inset-1 rounded-full bg-linear-to-r from-cyan-500 via-pink-500 to-cyan-500 opacity-50 blur-sm animate-pulse" />

                            {/* LED Lights Ring */}
                            <div className="absolute inset-0 rounded-full pointer-events-none z-20">
                                {[...Array(48)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="absolute inset-[4px]"
                                        style={{ transform: `rotate(${i * 7.5}deg)` }}
                                    >
                                        <motion.div
                                            animate={{ opacity: [0.4, 1, 0.4] }}
                                            transition={{ duration: 1.5, delay: i * 0.03, repeat: Infinity }}
                                            className={`w-2 h-2 rounded-full mx-auto ${i % 3 === 0 ? 'bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.9)]' : i % 3 === 1 ? 'bg-pink-400 shadow-[0_0_10px_rgba(236,72,153,0.9)]' : 'bg-slate-700'}`}
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Spinning Wheel */}
                            <div className="absolute inset-[20px] rounded-full overflow-hidden border-4 border-slate-800 bg-slate-900">
                                <motion.div
                                    ref={wheelRef}
                                    className="w-full h-full"
                                    animate={{ rotate: rotation }}
                                    transition={{ duration: 5, ease: [0.15, 0, 0.15, 1] }}
                                    onUpdate={onWheelUpdate}
                                    onAnimationComplete={onSpinComplete}
                                >
                                    {/* Base Gradient Background */}
                                    <div className="absolute inset-0 bg-slate-950" />

                                    {/* Wedges */}
                                    <div className="absolute inset-0 rounded-full" style={{
                                        background: `conic-gradient(
                                        ${PRIZES.map((p, i) => {
                                            const start = i * (100 / PRIZES.length);
                                            const end = (i + 1) * (100 / PRIZES.length);
                                            return `${p.color}dd ${start}%, ${p.color}66 ${end}%`;
                                        }).join(', ')}
                                    )`
                                    }} />

                                    {/* Radial Overlay for Texture */}
                                    <div className="absolute inset-0 bg-[radial-gradient(transparent_30%,#0f172a_100%)] opacity-60" />

                                    {/* Separator Lines */}
                                    {PRIZES.map((_, i) => (
                                        <div
                                            key={i}
                                            className="absolute top-0 left-1/2 w-[2px] h-1/2 bg-linear-to-b from-white/70 via-white/30 to-transparent origin-bottom z-10"
                                            style={{ transform: `rotate(${i * (360 / PRIZES.length)}deg)` }}
                                        >
                                            <div className="absolute top-0 -translate-x-1/2 w-2 h-5 bg-slate-900 rounded-b-full border border-white/30" />
                                        </div>
                                    ))}

                                    {/* Content (Icons & Text) */}
                                    {PRIZES.map((prize, index) => {
                                        const angle = (360 / PRIZES.length) * index + (360 / PRIZES.length / 2);
                                        return (
                                            <div key={prize.id} className="absolute top-0 left-0 w-full h-full flex justify-center pt-5 md:pt-6"
                                                style={{ transform: `rotate(${angle}deg)` }}>
                                                <div className="flex flex-col items-center transform -translate-y-2 z-20">
                                                    {/* Glow behind icon */}
                                                    <div className="relative group">
                                                        <div className="absolute inset-0 bg-white/40 blur-xl rounded-full opacity-60" style={{ boxShadow: `0 0 30px ${prize.color}` }} />
                                                        <img
                                                            src={prize.img}
                                                            alt={prize.label}
                                                            className="w-10 h-10 md:w-20 md:h-20 mb-2 md:mb-1 relative z-10 drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)] object-contain"
                                                        />
                                                    </div>
                                                    <span
                                                        className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-center px-2 py-0.5 bg-black/60 border border-white/20 backdrop-blur-sm text-white shadow-lg"
                                                        style={{ textShadow: `0 0 10px ${prize.color}` }}
                                                    >
                                                        {prize.label}
                                                    </span>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </motion.div>
                            </div>

                            {/* Glass Reflection Overlay */}
                            <div className="absolute inset-[20px] rounded-full bg-linear-to-tr from-white/10 via-transparent to-transparent pointer-events-none z-10" />

                            {/* Center Hub (Cyberpunk Reactor) */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 md:w-32 md:h-32 bg-slate-950 rounded-full flex items-center justify-center z-30 shadow-[0_0_50px_rgba(0,0,0,0.9)]">
                                {/* Spinning dashed ring */}
                                <div className="absolute inset-2 border-2 border-dashed border-cyan-500/30 rounded-full animate-[spin_10s_linear_infinite]" />
                                <div className="absolute inset-2 border-2 border-pink-500/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />

                                {/* Inner Core Housing */}
                                <div className="w-20 h-20 md:w-24 md:h-24 bg-slate-950 rounded-full border-4 border-slate-800 flex items-center justify-center relative shadow-[inset_0_0_30px_rgba(0,0,0,1)]">
                                    {/* Energy Swirl */}
                                    <div className="absolute inset-0 rounded-full bg-[conic-gradient(transparent_0deg,transparent_270deg,#ec4899_360deg)] opacity-40 animate-spin" style={{ animationDuration: '3s' }} />

                                    {/* Central Button/light */}
                                    <div className="w-12 h-12 md:w-14 md:h-14 bg-linear-to-br from-pink-500 to-purple-700 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(236,72,153,0.6)] z-10 relative">
                                        <div className="absolute inset-0 rounded-full bg-pink-400 animate-ping opacity-20" />
                                        <Sparkles className="w-6 h-6 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Header & Controls */}
                    <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left z-10 w-full lg:max-w-md order-2 lg:order-2 gap-6">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "circOut" }}
                            className="space-y-4"
                        >
                            <div className="flex items-center gap-3">
                                <Gift className="w-8 h-8 text-yellow-400" />
                                <span className="text-xs uppercase tracking-widest text-cyan-400/60 font-bold">Prize Wheel</span>
                            </div>

                            <motion.h1
                                initial={{ textShadow: "0 0 0px rgba(34,211,238,0)" }}
                                animate={{ textShadow: ["0 0 10px rgba(34,211,238,0.5)", "0 0 30px rgba(34,211,238,0.8)", "0 0 10px rgba(34,211,238,0.5)"] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                className="text-2xl md:text-5xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-white to-pink-400 leading-tight"
                            >
                                TEST YOUR {" "}
                                <span className="text-pink-500">LUCK</span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6, duration: 0.8 }}
                                className="text-slate-400 text-sm md:text-base uppercase tracking-widest"
                            >
                                Spin the wheel • Win exclusive upgrades
                            </motion.p>
                        </motion.div>

                        <div className="flex flex-col gap-5 w-full">
                            {/* Spin Button */}
                            <CyberpunkButton
                                onClick={handleSpin}
                                disabled={isSpinning || player.totalXP < SPIN_COST}
                                variant="primary"
                                className={cn(
                                    "w-full h-12 text-sm text-white font-bold tracking-widest bg-yellow-500 hover:bg-yellow-600",
                                    (isSpinning || player.totalXP < SPIN_COST) && "opacity-50 cursor-not-allowed grayscale"
                                )}
                            >
                                <Zap className="w-5 h-5 mr-2" />
                                {isSpinning ? "SPINNING..." : "SPIN NOW"}
                            </CyberpunkButton>

                            {/* Cost Display */}
                            <div className="relative flex items-center justify-between bg-slate-950/60 px-5 py-3 border border-cyan-500/20 w-full overflow-hidden">
                                <div className="absolute inset-0 bg-linear-to-r from-cyan-500/5 to-transparent pointer-events-none" />
                                <span className="text-cyan-400/80 text-sm font-mono uppercase tracking-wider relative z-10">Cost per spin</span>
                                <div className="flex items-center gap-2 text-yellow-400 font-bold relative z-10">
                                    <img src="/assets/icon/header_coin.png" alt="XP" className="w-5 h-5 object-contain" />
                                    <span className="text-lg">{SPIN_COST}</span>
                                    <span className="text-yellow-400/70 text-sm">COINS</span>
                                </div>
                            </div>

                            {/* History Button */}
                            <button
                                onClick={() => setShowHistory(true)}
                                className="flex items-center justify-center gap-2 text-cyan-400 hover:text-white transition-colors uppercase font-bold tracking-widest text-xs py-3 border border-transparent hover:border-cyan-500/30 hover:bg-cyan-500/5"
                            >
                                <History className="w-4 h-4" />
                                VIEW SPIN HISTORY
                            </button>

                            {player.totalXP < SPIN_COST && (
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-red-400 w-full text-center font-mono text-xs bg-red-500/10 p-3 border border-red-500/30"
                                >
                                    <span className="text-red-500 font-bold">⚠ INSUFFICIENT FUNDS</span>
                                    <br />
                                    <span className="text-red-400/80">Need {SPIN_COST - player.totalXP} more coins</span>
                                </motion.p>
                            )}
                        </div>
                    </div>

                    <BorderBeam duration={10} size={120} />
                </motion.div>
            </div>

            {/* History Modal */}
            <AnimatePresence>
                {showHistory && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
                        onClick={() => setShowHistory(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 30 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 30 }}
                            className="relative bg-slate-950 border border-cyan-500/30 w-full max-w-lg shadow-[0_0_80px_rgba(6,182,212,0.2)] overflow-hidden max-h-[80vh] flex flex-col"
                            onClick={e => e.stopPropagation()}
                        >
                            {/* Corner accents */}
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400" />
                            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400" />
                            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-400" />
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400" />

                            {/* Scanline overlay */}
                            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-size-[100%_4px] pointer-events-none opacity-30" />

                            <div className="p-6 border-b border-cyan-500/20 flex items-center justify-between bg-linear-to-r from-slate-900 to-slate-950">
                                <h3 className="text-xl font-black text-white uppercase tracking-wider flex items-center gap-3">
                                    <div className="p-2 bg-cyan-500/20 rounded">
                                        <History className="w-5 h-5 text-cyan-400" />
                                    </div>
                                    <span>
                                        <GlitchText>SPIN_LOGS</GlitchText>
                                    </span>
                                </h3>
                                <button onClick={() => setShowHistory(false)} className="p-2 text-cyan-400 hover:text-white hover:bg-cyan-500/10 transition-all border border-transparent hover:border-cyan-500/30">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
                                {player.spinHistory && player.spinHistory.length > 0 ? (
                                    <div className="space-y-3">
                                        {player.spinHistory.map((spin, index) => {
                                            const prizeConfig = PRIZES.find(p => p.id === spin.prizeId);
                                            return (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.05 }}
                                                    className={cn(
                                                        "flex items-center justify-between p-4 border transition-all",
                                                        spin.type === 'goodie'
                                                            ? "bg-linear-to-r from-cyan-500/10 to-transparent border-cyan-500/30 hover:border-cyan-400/50"
                                                            : "bg-slate-900/40 border-slate-700/30 hover:border-slate-600/50"
                                                    )}
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className={cn(
                                                            "w-12 h-12 flex items-center justify-center",
                                                            spin.type === 'goodie' ? "bg-cyan-500/20" : "bg-slate-800"
                                                        )}>
                                                            {prizeConfig ? (
                                                                <img src={prizeConfig.img} alt={spin.label} className="w-8 h-8 object-contain" />
                                                            ) : (
                                                                <Sparkles className="w-5 h-5 text-cyan-400" />
                                                            )}
                                                        </div>
                                                        <div>
                                                            <div className={cn(
                                                                "text-sm font-bold uppercase",
                                                                spin.type === 'goodie' ? "text-cyan-400" : "text-slate-400"
                                                            )}>
                                                                {spin.label}
                                                            </div>
                                                            <div className="text-xs text-slate-500 font-mono">
                                                                {new Date(spin.timestamp).toLocaleString()}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-xs font-mono text-yellow-400/80 flex items-center gap-1 bg-yellow-500/10 px-2 py-1">
                                                        -{spin.cost}
                                                        <img src="/assets/icon/header_coin.png" alt="XP" className="w-4 h-4 object-contain" />
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="text-center py-16">
                                        <CircuitBoard className="w-16 h-16 text-slate-700 mx-auto mb-4" />
                                        <p className="text-slate-500 uppercase tracking-wider font-mono text-sm">
                                            No data found
                                        </p>
                                        <p className="text-slate-600 text-xs mt-1">
                                            Initiate spin sequence to begin
                                        </p>
                                    </div>
                                )}
                            </div>

                            <BorderBeam duration={6} size={80} />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Result Modal */}
            <AnimatePresence>
                {showResult && result && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
                        onClick={() => setShowResult(false)}
                    >
                        <motion.div
                            className="relative bg-slate-950 border-2 p-1 max-w-md w-full shadow-[0_0_100px_rgba(6,182,212,0.3)] overflow-hidden"
                            style={{ borderColor: result.type === 'goodie' ? result.color : '#475569' }}
                            onClick={e => e.stopPropagation()}
                            layoutId={result.id}
                            initial={{ scale: 0.8, opacity: 0, rotateX: 30 }}
                            animate={{
                                scale: 1,
                                opacity: 1,
                                rotateX: 0,
                                transition: {
                                    type: 'spring',
                                    stiffness: 300,
                                    damping: 20
                                }
                            }}
                            exit={{ scale: 0.8, opacity: 0 }}
                        >
                            {/* Corner accents */}
                            <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2" style={{ borderColor: result.color }} />
                            <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2" style={{ borderColor: result.color }} />
                            <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2" style={{ borderColor: result.color }} />
                            <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2" style={{ borderColor: result.color }} />

                            {/* Beams */}
                            {result.type === 'goodie' && (
                                <>
                                    <motion.div
                                        animate={{ opacity: [0.3, 0.7, 0.3] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-[200%] blur-lg"
                                        style={{ backgroundColor: result.color }}
                                    />
                                    <motion.div
                                        animate={{ opacity: [0.3, 0.7, 0.3] }}
                                        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                                        className="absolute top-1/2 left-0 -translate-y-1/2 h-1 w-[200%] blur-lg"
                                        style={{ backgroundColor: result.color }}
                                    />
                                </>
                            )}

                            {/* Scanline overlay */}
                            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-size-[100%_4px] pointer-events-none opacity-30" />

                            <div className="bg-slate-950 p-10 flex flex-col items-center text-center relative overflow-hidden">
                                {/* Background Grid */}
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-size-[20px_20px]" />

                                {/* Status badge */}
                                <motion.div
                                    initial={{ y: -20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                    className={cn(
                                        "mb-6 px-4 py-1 text-xs font-black uppercase tracking-widest border relative z-10",
                                        result.type === 'goodie'
                                            ? "text-cyan-400 border-cyan-500/50 bg-cyan-500/10"
                                            : "text-slate-400 border-slate-600/50 bg-slate-700/10"
                                    )}
                                >
                                    {result.type === 'goodie' ? '✓ ACQUISITION COMPLETE' : '✗ NO PRIZE'}
                                </motion.div>

                                <div className="mb-6 relative z-10">
                                    <motion.div
                                        initial={{ scale: 0, rotate: -180 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        transition={{ delay: 0.2, type: 'spring' }}
                                        className="relative p-4 bg-slate-900/80 ring-2 ring-offset-4 ring-offset-slate-950"
                                        style={{ ringColor: result.color, boxShadow: `0 0 40px ${result.color}40` }}
                                    >
                                        <img
                                            src={result.img}
                                            alt={result.label}
                                            className="w-28 h-28 object-contain"
                                            style={{ filter: `drop-shadow(0 0 20px ${result.color})` }}
                                        />
                                    </motion.div>
                                    {result.type === 'goodie' && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1.8, opacity: 0 }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                            className="absolute inset-0 rounded-lg border-2"
                                            style={{ borderColor: result.color }}
                                        />
                                    )}
                                </div>

                                <motion.h2
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-3xl font-black text-white mb-2 uppercase tracking-wider relative z-10"
                                >
                                    <GlitchText>
                                        {result.type === 'goodie' ? 'JACKPOT!' : 'TRY AGAIN'}
                                    </GlitchText>
                                </motion.h2>

                                <motion.p
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-lg mb-8 font-mono relative z-10"
                                    style={{ color: result.color }}
                                >
                                    {result.type === 'goodie' ? `You won: ${result.label}` : 'Better luck next time!'}
                                </motion.p>

                                <CyberpunkButton
                                    onClick={() => setShowResult(false)}
                                    className="w-full relative z-10 py-6"
                                    variant={result.type === 'goodie' ? 'primary' : 'destructive'}
                                >
                                    {result.type === 'goodie' ? 'CLAIM REWARD' : 'ACKNOWLEDGE'}
                                </CyberpunkButton>
                            </div>

                            <BorderBeam duration={4} size={100} />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
export default SpinAndWin;
