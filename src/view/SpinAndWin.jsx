import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { useLMSStore } from '../store/lms-store';
import { Shirt, Coffee, Key, Frown, Coins, ArrowLeft, Atom, Sparkles, History, X, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useNavigate } from 'react-router-dom';
import CyberpunkButton from '../components/ui/cyber-button';
import HeaderCoin from '../components/HeaderCoin';
import { cn } from '../lib/utils';
import Counter from '../components/counter';
import { useSound } from '../hook/useSound';

const PRIZES = [
    { id: 'tshirt', label: 'T-Shirt', img: '/assets/spin/tshirt.png', color: '#36348E', type: 'goodie', probability: 0.008 },
    { id: 'mug', label: 'Mug', img: '/assets/spin/mug.png', color: '#ffc53a', type: 'goodie', probability: 0.007 },
    { id: 'keychain', label: 'Keychain', img: '/assets/spin/key.png', color: '#5c75ff', type: 'goodie', probability: 0.01 },
    { id: 'science', label: 'Project', img: '/assets/spin/project.png', color: '#297757', type: 'goodie', probability: 0.005 },
    { id: 'better_luck', label: 'Next_Time', img: '/assets/spin/next_time.png', color: '#94a3b8', type: 'miss', probability: 0.97 },
];

const SPIN_COST = 1;

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

        playClick(); // Start click
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

        // Calculate Center Angle of the selected segment
        // We want this angle to align with 0 degrees (top)
        const centerAngle = (selectedIndex * segmentAngle) + (segmentAngle / 2);
        const targetAngle = 360 - centerAngle;

        // Add random jitter (+/- 15 degrees)
        const jitter = (Math.random() * 30) - 15;

        // Calculate delta to reach target
        const currentRotation = rotation;
        const normalizedRotation = currentRotation % 360;
        let delta = (targetAngle + jitter) - normalizedRotation;

        // Ensure positive delta for clockwise forward rotation
        if (delta <= 0) {
            delta += 360;
        }

        // Add minimum spins (5 full rotations)
        const minSpins = 5 * 360;
        const newRotation = currentRotation + minSpins + delta;

        setRotation(newRotation);
    };

    const playTickSound = () => {
        // Animate pointer
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
        // Track segments passed.
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
        <div className="p-4 pt-5 max-w-7xl mx-auto mt-20 relative min-h-dvh font-mono text-cyan-50">

            {/* Back Button */}
            <button
                onClick={() => navigate('/')}
                className="mb-8 flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors uppercase font-bold tracking-widest text-xs"
            >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Dashboard</span>
            </button>

            {/* 3D Tilt Container */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="flex flex-col md:flex-row items-center justify-between min-h-[600px] bg-slate-900/20 border border-cyan-400/20 rounded-3xl p-8 relative overflow-hidden shadow-[0_0_50px_rgba(34,211,238,0.1)] gap-12 backdrop-blur-xl"
            >

                {/* Decorative background within container */}
                <div className="absolute inset-0 bg-cyan-900/5 pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_70%)] pointer-events-none" />

                {/* Left Column: Wheel */}
                <div className="relative z-10 scale-90 md:scale-100 flex-1 flex justify-center order-1 md:order-1" style={{ transform: "translateZ(50px)" }}>

                    {/* Pointer - Top Center */}
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-40 w-20 h-20 filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
                        <motion.div
                            animate={pointerControls}
                            className="w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[40px] border-t-yellow-500 mx-auto transform origin-top filter drop-shadow-[0_0_10px_rgba(234,179,8,0.8)]"
                        >
                            <div className="absolute -top-[42px] -left-[15px] w-[30px] h-[30px] bg-slate-800 rounded-full border-4 border-yellow-500 flex items-center justify-center">
                                <div className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse" />
                            </div>
                        </motion.div>
                    </div>

                    {/* Rotating Decorative Rings */}
                    <div className="absolute -inset-24 rounded-full border-2 border-cyan-500/20 border-dashed animate-[spin_60s_linear_infinite]" />
                    <div className="absolute -inset-16 rounded-full border border-cyan-400/10 animate-[spin_40s_linear_infinite_reverse]" />

                    {/* Outer Glow Ring */}
                    <div className="absolute -inset-10 rounded-full border border-cyan-500/20 opacity-50 blur-xl animate-pulse" />

                    {/* Main Wheel Container */}
                    <div className="relative w-[360px] h-[360px] md:w-[480px] md:h-[480px]">

                        {/* Ring Lights Background */}
                        <div className="absolute inset-0 rounded-full border-[16px] border-slate-900 bg-slate-900 shadow-[0_0_50px_rgba(0,0,0,0.8)]" />

                        {/* LED Lights Ring */}
                        <div className="absolute inset-0 rounded-full pointer-events-none z-20">
                            {[...Array(40)].map((_, i) => (
                                <div
                                    key={i}
                                    className="absolute inset-[4px]"
                                    style={{ transform: `rotate(${i * 9}deg)` }}
                                >
                                    <motion.div
                                        animate={{ opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 2, delay: i * 0.05, repeat: Infinity }}
                                        className={`w-1.5 h-1.5 rounded-full mx-auto ${i % 2 === 0 ? 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]' : 'bg-slate-700'}`}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Spinning Wheel */}
                        <div className="absolute inset-[16px] rounded-full overflow-hidden border-4 border-slate-800 bg-slate-900">
                            <motion.div
                                ref={wheelRef}
                                className="w-full h-full"
                                animate={{ rotate: rotation }}
                                transition={{ duration: 5, ease: [0.15, 0, 0.15, 1] }}
                                onUpdate={onWheelUpdate}
                                onAnimationComplete={onSpinComplete}
                            >
                                {/* Base Gradient Background */}
                                <div className="absolute inset-0 bg-slate-900" />

                                {/* Wedges */}
                                <div className="absolute inset-0 rounded-full" style={{
                                    background: `conic-gradient(
                                    ${PRIZES.map((p, i) => {
                                        const start = i * (100 / PRIZES.length);
                                        const end = (i + 1) * (100 / PRIZES.length);
                                        return `${p.color}cc ${start}%, ${p.color}55 ${end}%`;
                                    }).join(', ')}
                                )`
                                }} />

                                {/* Radial Overlay for Texture */}
                                <div className="absolute inset-0 bg-[radial-gradient(transparent_30%,#0f172a_100%)] opacity-50" />

                                {/* Separator Lines */}
                                {PRIZES.map((_, i) => (
                                    <div
                                        key={i}
                                        className="absolute top-0 left-1/2 w-[1px] h-1/2 bg-gradient-to-b from-white/50 to-transparent origin-bottom z-10"
                                        style={{ transform: `rotate(${i * (360 / PRIZES.length)}deg)` }}
                                    >
                                        <div className="absolute top-0 -translate-x-1/2 w-1.5 h-4 bg-slate-900 rounded-b-full border border-white/20" />
                                    </div>
                                ))}

                                {/* Content (Icons & Text) */}
                                {PRIZES.map((prize, index) => {
                                    const angle = (360 / PRIZES.length) * index + (360 / PRIZES.length / 2);
                                    return (
                                        <div key={prize.id} className="absolute top-0 left-0 w-full h-full flex justify-center pt-4 md:pt-5"
                                            style={{ transform: `rotate(${angle}deg)` }}>
                                            <div className="flex flex-col items-center transform -translate-y-2 z-20">
                                                {/* Glow behind icon */}
                                                <div className="relative group">
                                                    <div className="absolute inset-0 bg-white/30 blur-xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
                                                    <img
                                                        src={prize.img}
                                                        alt={prize.label}
                                                        className="w-8 h-8 md:w-24 md:h-24 mb-2 md:mb-1 relative z-10 drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] object-contain"
                                                    />
                                                </div>
                                                <span
                                                    className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-center px-2 py-0.5 rounded-sm bg-black/40 border border-white/10 backdrop-blur-sm text-white/90 shadow-sm"
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
                        <div className="absolute inset-[16px] rounded-full bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none z-10" />

                        {/* Center Hub (Cyberpunk Reactor) */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 md:w-32 md:h-32 bg-slate-900 rounded-full flex items-center justify-center z-30 shadow-[0_0_50px_rgba(0,0,0,0.9)]">
                            {/* Spinning dashed ring */}
                            <div className="absolute inset-2 border-2 border-dashed border-cyan-500/20 rounded-full animate-[spin_10s_linear_infinite]" />
                            <div className="absolute inset-2 border-2 border-cyan-500/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />

                            {/* Inner Core Housing */}
                            <div className="w-20 h-20 md:w-24 md:h-24 bg-slate-950 rounded-full border-4 border-slate-800 flex items-center justify-center relative shadow-[inset_0_0_20px_rgba(0,0,0,1)]">
                                {/* Energy Swirl */}
                                <div className="absolute inset-0 rounded-full bg-[conic-gradient(transparent_0deg,transparent_270deg,#22d3ee_360deg)] opacity-30 animate-spin" style={{ animationDuration: '3s' }} />

                                {/* Central Button/light */}
                                <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-cyan-600 to-blue-700 rounded-full flex items-center justify-center shadow-[0_0_30px_#06b6d4] z-10 relative">
                                    <div className="absolute inset-0 rounded-full bg-cyan-400 animate-ping opacity-20" />
                                    <Sparkles className="w-6 h-6 text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Header & Controls */}
                <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left z-10 w-full md:max-w-md order-2 md:order-2">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "circOut" }}
                        className="mb-12"
                    >
                        <motion.h1
                            initial={{ textShadow: "0 0 0px rgba(34,211,238,0)" }}
                            animate={{ textShadow: ["0 0 10px rgba(34,211,238,0.5)", "0 0 20px rgba(34,211,238,0.8)", "0 0 10px rgba(34,211,238,0.5)"] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-cyan-400 leading-tight"
                        >
                            SPIN & WIN
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="text-cyan-400/60 mt-4 text-sm md:text-base uppercase tracking-widest"
                        >
                            Test your luck • Win upgrades
                        </motion.p>
                    </motion.div>

                    <div className="flex flex-col items-center md:items-start gap-6 w-full">

                        <CyberpunkButton
                            onClick={handleSpin}
                            disabled={isSpinning || player.totalXP < SPIN_COST}
                            variant="primary"
                            className={cn(
                                "w-full h-16 text-xl font-bold tracking-widest",
                                (isSpinning || player.totalXP < SPIN_COST) && "opacity-50 cursor-not-allowed grayscale"
                            )}
                        >
                            {isSpinning ? "SPINNING..." : "SPIN NOW"}
                        </CyberpunkButton>

                        <div className="flex items-center gap-2 text-cyan-400/80 text-sm font-mono bg-black/20 px-4 py-2 rounded-lg border border-cyan-500/10 w-full justify-center md:justify-start">
                            <span>COST PER SPIN:</span>
                            <div className="flex items-center gap-1 text-yellow-400 font-bold">
                                <img src="/assets/icon/header_coin.png" alt="XP" className="w-5 h-5 object-contain" />
                                <span>{SPIN_COST} Coins</span>
                            </div>
                        </div>

                        {/* View Recent Spins Button */}
                        <button
                            onClick={() => setShowHistory(true)}
                            className="flex items-center gap-2 text-cyan-400 hover:text-white transition-colors uppercase font-bold tracking-widest text-xs mt-2"
                        >
                            <History className="w-4 h-4" />
                            VIEW RECENT SPINS
                        </button>

                        <div className="flex items-center gap-2 text-cyan-400/80 text-sm font-mono bg-black/20 px-4 py-2 rounded-lg border border-cyan-500/10 w-full justify-center md:justify-start mt-4">
                            <span>YOUR BALANCE:</span>
                            <div className="text-white font-bold flex items-center gap-1">
                                <img src="/assets/icon/header_coin.png" alt="XP" className="w-5 h-5 object-contain" />
                                <Counter value={player.totalXP} fontSize={20} gap={0} />
                                <span>Coins</span>
                            </div>
                        </div>


                        {player.totalXP < SPIN_COST && (
                            <p className="text-red-400 w-full text-center md:text-left font-mono text-xs animate-pulse bg-red-500/10 p-2 rounded border border-red-500/20">
                                ⚠ INSUFFICIENT XP. NEED {SPIN_COST - player.totalXP} MORE.
                            </p>
                        )}
                    </div>
                </div>
            </motion.div>

            {/* History Modal */}
            <AnimatePresence>
                {showHistory && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        onClick={() => setShowHistory(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-slate-950 border border-cyan-500/30 rounded-lg relative w-full max-w-lg shadow-[0_0_50px_rgba(6,182,212,0.15)] overflow-hidden max-h-[80vh] flex flex-col"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="p-6 border-b border-cyan-500/20 flex items-center justify-between bg-slate-900/50">
                                <h3 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
                                    <History className="w-5 h-5 text-cyan-400" />
                                    SPIN_LOGS
                                </h3>
                                <button onClick={() => setShowHistory(false)} className="text-cyan-400 hover:text-white transition-colors">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
                                {player.spinHistory && player.spinHistory.length > 0 ? (
                                    <div className="space-y-3">
                                        {player.spinHistory.map((spin, index) => {
                                            const prizeConfig = PRIZES.find(p => p.id === spin.prizeId);
                                            return (
                                                <div key={index} className="flex items-center justify-between p-3 rounded bg-slate-900/40 border border-cyan-500/10 hover:border-cyan-500/30 transition-colors">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${spin.type === 'goodie' ? 'bg-cyan-500/10' : 'bg-slate-800'}`}>
                                                            {prizeConfig ? (
                                                                <img src={prizeConfig.img} alt={spin.label} className="w-5 h-5 object-contain" />
                                                            ) : (
                                                                <Sparkles className="w-4 h-4 text-cyan-400" />
                                                            )}
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-bold text-white">{spin.label}</div>
                                                            <div className="text-xs text-slate-500">{new Date(spin.timestamp).toLocaleString()}</div>
                                                        </div>
                                                    </div>
                                                    <div className="text-xs font-mono text-cyan-400/60 flex items-center gap-1">-{spin.cost} <img src="/assets/icon/header_coin.png" alt="XP" className="w-4 h-4 object-contain" /> Coins</div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <div className="text-center text-slate-500 py-12">
                                        NO DATA FOUND. INITIATE SPIN SEQUENCE.
                                    </div>
                                )}
                            </div>
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
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        onClick={() => setShowResult(false)}
                    >
                        <motion.div
                            className="bg-slate-900 border border-cyan-500/30 rounded-none p-1 relative max-w-sm w-full shadow-[0_0_50px_rgba(6,182,212,0.15)] clip-path-[polygon(0_0,100%_0,100%_calc(100%-20px),calc(100%-20px)_100%,0_100%)]"
                            onClick={e => e.stopPropagation()}
                            layoutId={result.id}
                            initial={{ scale: 0.8, opacity: 0, rotateX: 20 }}
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
                            {/* Beams */}
                            {result.type === 'goodie' && (
                                <>
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-[200%] bg-cyan-400/50 blur-lg" />
                                    <div className="absolute top-1/2 left-0 -translate-y-1/2 h-1 w-[200%] bg-cyan-400/50 blur-lg" />
                                </>
                            )}

                            <div className="bg-slate-950 p-8 flex flex-col items-center text-center relative overflow-hidden">
                                {/* Background Grid */}
                                <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />

                                <div className="mb-6 relative z-10">
                                    <motion.div
                                        initial={{ scale: 0, rotate: -180 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        transition={{ delay: 0.2, type: 'spring' }}
                                        className="p-2 rounded-full bg-slate-900/50 ring-1 ring-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.2)]"
                                    >
                                        <img src={result.img} alt={result.label} className="w-24 h-24 object-contain" style={{ filter: `drop-shadow(0 0 10px ${result.color})` }} />
                                    </motion.div>
                                    {result.type === 'goodie' && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1.5, opacity: 0 }}
                                            transition={{ duration: 1, repeat: Infinity }}
                                            className="absolute inset-0 rounded-full border-2 border-cyan-400"
                                        />
                                    )}
                                </div>

                                <motion.h2
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-2xl font-black text-white mb-2 uppercase tracking-wide relative z-10"
                                >
                                    {result.type === 'goodie' ? 'System Success' : 'System Failure'}
                                </motion.h2>

                                <motion.p
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-cyan-400/80 text-lg mb-8 font-mono relative z-10"
                                >
                                    {result.type === 'goodie' ? `Acquired: ${result.label}` : result.label}
                                </motion.p>

                                <CyberpunkButton
                                    onClick={() => setShowResult(false)}
                                    className="w-full relative z-10 py-6"
                                    variant={result.type === 'goodie' ? 'primary' : 'destructive'}
                                >
                                    ACKNOWLEDGE
                                </CyberpunkButton>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
};
export default SpinAndWin;
