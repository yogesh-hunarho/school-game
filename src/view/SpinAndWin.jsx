import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Coins, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useLMSStore } from "@/store/lms-store";
import CyberpunkButton from "@/components/ui/cyber-button";
import JSConfetti from 'js-confetti';

const segments = [
    { id: 1, label: "T-Shirt", color: "#EF476F", icon: "👕", type: "prize" },
    { id: 2, label: "Try Again", color: "#118AB2", icon: "💫", type: "miss" },
    { id: 3, label: "Mug", color: "#06D6A0", icon: "☕", type: "prize" },
    { id: 4, label: "Try Again", color: "#FFD166", icon: "💫", type: "miss" },
    { id: 5, label: "Keychain", color: "#EF476F", icon: "🔑", type: "prize" },
    { id: 6, label: "Try Again", color: "#118AB2", icon: "💫", type: "miss" },
    { id: 7, label: "Science Kit", color: "#06D6A0", icon: "🔬", type: "prize" },
    { id: 8, label: "Try Again", color: "#FFD166", icon: "💫", type: "miss" },
];

const SPIN_COST = 100;

export default function SpinAndWin() {
    // Get store values
    const { player, updateCoins, addSpinResult } = useLMSStore();
    const [isSpinning, setIsSpinning] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [result, setResult] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const jsConfetti = new JSConfetti();

    const handleSpin = () => {
        if (player.coins < SPIN_COST || isSpinning) return;

        setIsSpinning(true);
        updateCoins(-SPIN_COST);
        setResult(null);

        // Determine result (random for now)
        // Adjust probabilities here if needed. currently uniform.
        const randomIndex = Math.floor(Math.random() * segments.length);
        const selectedSegment = segments[randomIndex];

        // Calculate rotation
        // Each segment is 45 degrees
        // Pointer is at Top (0 deg visual)
        // Segment 0 center is at 0 deg rotation.
        // To put Segment `i` at Top, we need effective rotation `R` such that:
        // (R_initial + R_delta) % 360  matches position of segment `i`.

        // Actually simpler:
        // Position of segment `i` relative to container is `i * 45`.
        // If container rotates by `R`, segment `i` moves to `i * 45 + R`.
        // We want `i * 45 + R = 0 (or 360)`. (Top position).
        // So `R = - (i * 45)`.
        // Or positive rotation `R = 360 - (i * 45)`.

        const currentRotation = rotation % 360;
        const targetRotationRelative = (360 - (randomIndex * segmentAngle)) % 360;

        // Calculate needed forward rotation to reach target
        let degreesNeeded = targetRotationRelative - currentRotation;
        if (degreesNeeded <= 0) {
            degreesNeeded += 360;
        }

        // Add extra spins
        const totalRotationToAdd = degreesNeeded + extraSpins;

        setRotation(prev => prev + totalRotationToAdd);

        setTimeout(() => {
            setIsSpinning(false);
            setResult(selectedSegment);
            addSpinResult({
                id: Date.now(),
                date: new Date().toISOString(),
                reward: selectedSegment
            });
            setShowModal(true);

            if (selectedSegment.type === "prize") {
                jsConfetti.addConfetti({
                    emojis: [selectedSegment.icon, '✨', '⚡'],
                    confettiNumber: 100,
                });
            }
        }, 5000); // 5s spin duration matching CSS transition
    };

    return (
        <div className="pt-5 max-w-7xl min-h-screen  overflow-hidden pb-20 mx-auto mt-20">



            {/* Content */}
            <div className="relative z-10 flex flex-col items-center w-full max-w-7xl">

                {/* Header */}
                <header className="flex w-full items-center justify-between mb-8">
                    <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                        <span>Back to Base</span>
                    </Link>

                    <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full">
                        <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-400">
                            <Coins className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg font-bold text-yellow-400">{(player?.coins || 0).toLocaleString()}</span>
                        </div>
                    </div>
                </header>

                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col md:flex-row items-center gap-10 justify-center w-full border"
                >
                    {/* Wheel Section */}
                    <div className="relative group">
                        {/* Pointer */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 z-20 w-8 h-10">
                            <motion.div
                                animate={{ y: [0, -5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="w-full h-full text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]"
                            >
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 22L2 2h20L12 22z" />
                                </svg>
                            </motion.div>
                        </div>

                        {/* Outer Glow */}
                        <div className="absolute -inset-4 bg-linear-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-1000 animate-pulse" />

                        {/* Wheel Container */}
                        <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-full border-4 border-white/10 bg-black/80 backdrop-blur-sm shadow-2xl overflow-hidden">
                            <motion.div
                                className="w-full h-full"
                                animate={{ rotate: rotation }}
                                transition={{ duration: 5, ease: [0.25, 0.1, 0.25, 1] }}
                            >
                                {segments.map((segment, index) => {
                                    const rotation = (360 / segments.length) * index;
                                    return (
                                        <div
                                            key={segment.id}
                                            className="absolute w-full h-full top-0 left-0"
                                            style={{
                                                transform: `rotate(${rotation}deg)`,
                                                transformOrigin: "center center"
                                            }}
                                        >
                                            <div
                                                className="absolute left-1/2 -translate-x-1/2 w-px h-1/2 origin-bottom bg-transparent"
                                            >
                                                <div
                                                    className="w-[200px] h-full absolute left-1/2 -translate-x-1/2"
                                                    style={{
                                                        background: `linear-gradient(to bottom, ${segment.color}, rgba(0,0,0,0.2))`,
                                                        clipPath: "polygon(50% 100%, 0 0, 100% 0)",
                                                        transformOrigin: "50% 100%",
                                                    }}
                                                />
                                                <div className="absolute top-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 -rotate-90 md:rotate-0" style={{ transform: `rotate(${-(rotation)}deg)` }}>
                                                    {/* Counter-rotate text so it's readable if desired, or keep radial. Let's keep radial but flip for readability */}
                                                    <span className="text-2xl drop-shadow-md filter">{segment.icon}</span>
                                                    <span className="text-[10px] mobile:hidden md:block font-bold uppercase tracking-wider text-white drop-shadow-md">{segment.label}</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </motion.div>

                            {/* Center Cap */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-linear-to-br from-gray-800 to-black rounded-full border-4 border-gray-700 shadow-xl flex items-center justify-center z-10">
                                <Sparkles className="w-8 h-8 text-yellow-400 animate-spin-slow" />
                            </div>
                        </div>
                    </div>

                    {/* Controls Side */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6">
                        <div>
                            <h1 className="text-5xl md:text-6xl font-black font-sans italic tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-yellow-400 via-orange-500 to-red-500 drop-shadow-sm">
                                SPIN & WIN
                            </h1>
                            <p className="text-gray-400 text-lg mt-2 max-w-sm">
                                Test your luck! Win amazing prizes like T-Shirts, Mugs, and Science Kits.
                            </p>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 w-full max-w-sm backdrop-blur-sm">
                            <div className="flex justify-between items-center mb-4 text-sm font-medium text-gray-300">
                                <span>Cost per spin</span>
                                <span className="text-yellow-400 font-bold">{SPIN_COST} Coins</span>
                            </div>

                            <CyberpunkButton
                                onClick={handleSpin}
                                disabled={isSpinning || player.coins < SPIN_COST}
                                className={`w-full py-4 text-xl ${player.coins < SPIN_COST ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {isSpinning ? "SPINNING..." : "SPIN NOW!"}
                            </CyberpunkButton>

                            {player.coins < SPIN_COST && (
                                <p className="text-red-400 text-xs mt-3 text-center">
                                    Not enough coins! complete more missions.
                                </p>
                            )}
                        </div>

                        {/* History Section */}
                        <div className="w-full bg-black/40 border border-white/5 rounded-xl overflow-hidden backdrop-blur-md">
                            <div className="p-3 border-b border-white/5 bg-white/5">
                                <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-yellow-500" />
                                    Recent Spins
                                </h3>
                            </div>
                            <div className="max-h-48 overflow-y-auto custom-scrollbar">
                                {(player.spinHistory || []).length === 0 ? (
                                    <div className="p-4 text-center text-xs text-gray-500 italic">
                                        No spins yet. Give it a try!
                                    </div>
                                ) : (
                                    <div className="divide-y divide-white/5">
                                        {player.spinHistory.map((spin, idx) => (
                                            <div key={spin.id || idx} className="flex items-center justify-between p-3 text-xs hover:bg-white/5 transition-colors">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-lg">{spin.reward.icon}</span>
                                                    <div className="flex flex-col">
                                                        <span className={`font-bold ${spin.reward.type === 'prize' ? 'text-green-400' : 'text-gray-400'}`}>
                                                            {spin.reward.label}
                                                        </span>
                                                        <span className="text-gray-500">
                                                            {new Date(spin.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="font-mono text-gray-500">
                                                    -{SPIN_COST}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Result Modal */}
            <AnimatePresence>
                {showModal && result && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        onClick={() => setShowModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.5, y: 50 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.5, y: 50 }}
                            className="bg-[#1a1b26] border-2 border-primary rounded-2xl p-8 max-w-md w-full text-center relative overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Background beams */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-linear-to-t from-primary/10 to-transparent pointer-events-none" />

                            <div className="relative z-10 flex flex-col items-center gap-4">
                                <div className="text-6xl mb-2 animate-bounce">
                                    {result.icon}
                                </div>

                                {result.type === 'prize' ? (
                                    <>
                                        <h2 className="text-3xl font-black text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-yellow-600">
                                            CONGRATULATIONS!
                                        </h2>
                                        <p className="text-gray-300">
                                            You won a <span className="font-bold text-white">{result.label}</span>!
                                        </p>
                                        <div className="bg-green-500/20 text-green-400 px-4 py-2 rounded-lg text-sm border border-green-500/30">
                                            Claim code: <span className="font-mono font-bold select-all">WIN-{Math.random().toString(36).substr(2, 6).toUpperCase()}</span>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <h2 className="text-3xl font-black text-gray-400">
                                            So Close!
                                        </h2>
                                        <p className="text-gray-400">
                                            Better luck next time, champion!
                                        </p>
                                    </>
                                )}

                                <CyberpunkButton
                                    className="mt-6 w-full"
                                    onClick={() => setShowModal(false)}
                                >
                                    {result.type === 'prize' ? 'AWESOME!' : 'TRY AGAIN'}
                                </CyberpunkButton>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
