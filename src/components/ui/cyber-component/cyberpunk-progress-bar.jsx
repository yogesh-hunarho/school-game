import React, { useEffect, useState } from 'react';
import { motion, animate } from 'framer-motion';

const CyberpunkProgressBar = ({ progress = 0, label = "LOADING", color = "cyan", hideLabel = false }) => {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        const controls = animate(0, progress, {
            duration: 1.2,
            ease: "circOut",
            onUpdate: (value) => setDisplayValue(Math.floor(value)),
        });
        return () => controls.stop();
    }, [progress]);

    const colors = {
        cyan: {
            gradient: "from-cyan-500 via-blue-500 to-purple-600",
            glow: "shadow-[0_0_15px_rgba(6,182,212,0.5)]",
            text: "text-cyan-400",
            indicator: "bg-cyan-400 shadow-[0_0_8px_cyan]"
        },
        orange: {
            gradient: "from-orange-500 via-red-500 to-rose-600",
            glow: "shadow-[0_0_15px_rgba(249,115,22,0.5)]",
            text: "text-orange-400",
            indicator: "bg-orange-400 shadow-[0_0_8px_orange]"
        },
        green: {
            gradient: "from-emerald-400 via-green-500 to-teal-600",
            glow: "shadow-[0_0_15px_rgba(52,211,153,0.5)]",
            text: "text-emerald-400",
            indicator: "bg-emerald-400 shadow-[0_0_8px_emerald]"
        },
    };

    const scheme = colors[color] || colors.cyan;

    return (
        <div className="w-full font-mono select-none overflow-hidden p-1">
            <div className="flex justify-between items-end mb-2 px-1">
                {!hideLabel && <motion.div className={`text-[10px] font-black tracking-[0.3em] ${scheme.text} flex items-center gap-2.5`}>
                    <motion.div
                        animate={{
                            scale: [1, 1.3, 1],
                            rotate: [45, 135, 45],
                            opacity: [0.5, 1, 0.5]
                        }}
                        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                        className={`w-2 h-2 ${scheme.indicator}`}
                    />
                    <span className="">{label}</span>
                </motion.div>}

                {!hideLabel && <div className="flex items-baseline gap-1">
                    <motion.span
                        key={displayValue}
                        initial={{ opacity: 0.5, y: -2 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-lg font-black tracking-tighter text-white tabular-nums drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                    >
                        {displayValue}
                    </motion.span>
                    <span className="text-[10px] font-bold text-slate-500 mb-0.5">%</span>
                </div>}
            </div>

            <div className="relative h-5 w-full bg-slate-900/80 border border-white/5 -skew-x-12 group">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_50%,rgba(0,0,0,0.4)_50%)] bg-size-[4px_100%] opacity-40 z-10 pointer-events-none" />

                {/* Filling Bar */}
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1.2, ease: "circOut" }}
                    className={`h-full bg-linear-to-r ${scheme.gradient} ${scheme.glow} relative flex items-center overflow-hidden`}
                >
                    {/* Scanning Glint */}
                    <motion.div
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 w-1/3 bg-linear-to-r from-transparent via-white/50 to-transparent skew-x-20"
                    />

                    {/* Micro-tech readouts (visible if progress is high enough) */}
                    {progress > 30 && (
                        <div className="absolute right-4 hidden md:flex gap-1.5 opacity-40">
                            {[...Array(3)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={{ opacity: [0.2, 1, 0.2] }}
                                    transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                                    className="w-1 h-1 bg-white rounded-full"
                                />
                            ))}
                        </div>
                    )}

                    {/* Leading Edge Glow */}
                    <motion.div
                        animate={{ opacity: [0.3, 0.8, 0.3] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        className="absolute right-0 top-0 bottom-0 w-1 bg-white blur-[2px] z-20"
                    />
                </motion.div>

                {/* Decorative End Markers */}
                <div className="absolute inset-x-0 bottom-0 flex justify-between px-1 opacity-20">
                    {[...Array(10)].map((_, i) => (
                        <div key={i} className="w-px h-1 bg-white/40" />
                    ))}
                </div>
            </div>

            {/* Status Ghost Bar (subtle tail) */}
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 2, ease: "circOut" }}
                className={`h-0.5 mt-1 opacity-20 bg-linear-to-r ${scheme.gradient} blur-[1px] rounded-full`}
            />
        </div>
    );
};

export default CyberpunkProgressBar;
