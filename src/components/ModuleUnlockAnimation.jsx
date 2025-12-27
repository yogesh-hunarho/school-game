import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useLMSStore } from "@/store/lms-store";
import { modules } from "@/store/level-canvas-config";
import { CheckCircle2, Unlock, ChevronRight } from "lucide-react";

export const ModuleUnlockAnimation = () => {
    const { lastCompletedModuleId, showConfetti, hideConfetti } = useLMSStore();
    const [phase, setPhase] = useState(0); // 0: hidden, 1: access granted, 2: module name, 3: next module

    // Find module info
    const completedModule = modules.find(m => m.id === lastCompletedModuleId);
    const nextModuleIndex = modules.findIndex(m => m.id === lastCompletedModuleId) + 1;
    const nextModule = modules[nextModuleIndex];

    useEffect(() => {
        if (showConfetti && lastCompletedModuleId) {
            setPhase(1);

            // Phase 2: Show module name after 1s
            const timer1 = setTimeout(() => setPhase(2), 1000);

            // Phase 3: Show next module after 2.5s
            const timer2 = setTimeout(() => setPhase(3), 2500);

            // Auto-close after 5 seconds
            const timer3 = setTimeout(() => {
                setPhase(0);
                hideConfetti();
            }, 5000);

            return () => {
                clearTimeout(timer1);
                clearTimeout(timer2);
                clearTimeout(timer3);
            };
        }
    }, [showConfetti, lastCompletedModuleId, hideConfetti]);

    return (
        <AnimatePresence>
            {showConfetti && lastCompletedModuleId && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
                >
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-slate-950/95" />

                    {/* Scanline overlay */}
                    <div className="absolute inset-0 opacity-[0.03] bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,255,255,0.1)_2px,rgba(0,255,255,0.1)_4px)]" />

                    {/* Main content */}
                    <div className="relative z-10 max-w-xl w-full mx-4">
                        {/* ACCESS GRANTED Phase */}
                        <AnimatePresence mode="wait">
                            {phase >= 1 && (
                                <motion.div
                                    key="access-granted"
                                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 1.1 }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                    className="text-center mb-8"
                                >
                                    {/* Glowing icon */}
                                    <motion.div
                                        className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-emerald-400/20 border-2 border-emerald-400 relative"
                                        initial={{ scale: 0, rotate: -180 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                    >
                                        <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-emerald-400" />
                                        <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-emerald-400" />
                                        <CheckCircle2 className="w-10 h-10 text-emerald-400" />

                                        {/* Pulse ring */}
                                        <motion.div
                                            className="absolute inset-0 border-2 border-emerald-400"
                                            initial={{ scale: 1, opacity: 1 }}
                                            animate={{ scale: 1.5, opacity: 0 }}
                                            transition={{ duration: 1, repeat: Infinity }}
                                        />
                                    </motion.div>

                                    {/* ACCESS GRANTED text */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        <h1 className="text-4xl md:text-5xl font-bold text-emerald-400 uppercase tracking-[0.3em] mb-2">
                                            ACCESS
                                        </h1>
                                        <h1 className="text-4xl md:text-5xl font-bold text-emerald-400 uppercase tracking-[0.3em]">
                                            GRANTED
                                        </h1>
                                    </motion.div>

                                    {/* Decorative line */}
                                    <motion.div
                                        className="mt-6 mx-auto h-0.5 bg-emerald-400"
                                        initial={{ width: 0 }}
                                        animate={{ width: "60%" }}
                                        transition={{ delay: 0.6, duration: 0.5 }}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Completed Module Phase */}
                        <AnimatePresence>
                            {phase >= 2 && completedModule && (
                                <motion.div
                                    key="module-complete"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="relative p-6 bg-slate-900/80 border border-emerald-400/30 mb-4"
                                >
                                    {/* Corner brackets */}
                                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-emerald-400" />
                                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-emerald-400" />
                                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-emerald-400" />
                                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-emerald-400" />

                                    <div className="flex items-center gap-4">
                                        <div className="text-4xl">{completedModule.icon}</div>
                                        <div>
                                            <p className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold mb-1">
                                                MODULE COMPLETE
                                            </p>
                                            <h2 className="text-xl font-bold text-cyan-50 uppercase tracking-wide">
                                                {completedModule.name}
                                            </h2>
                                            <p className="text-[11px] text-slate-500 font-mono mt-1">
                                                100% DATA SYNCHRONIZED
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Next Module Unlocked Phase */}
                        <AnimatePresence>
                            {phase >= 3 && nextModule && (
                                <motion.div
                                    key="next-module"
                                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ type: "spring", stiffness: 200 }}
                                    className="relative p-6 bg-slate-900/80 border border-yellow-400/30"
                                >
                                    {/* Corner brackets */}
                                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-yellow-400" />
                                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-yellow-400" />
                                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-yellow-400" />
                                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-yellow-400" />

                                    <div className="flex items-center gap-4">
                                        <motion.div
                                            className="relative w-14 h-14 bg-yellow-400/20 flex items-center justify-center border border-yellow-400/50"
                                            initial={{ rotate: -10 }}
                                            animate={{ rotate: 0 }}
                                        >
                                            <div className="absolute -top-0.5 -left-0.5 w-2 h-2 border-t border-l border-yellow-400" />
                                            <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 border-b border-r border-yellow-400" />
                                            <Unlock className="w-6 h-6 text-yellow-400" />
                                        </motion.div>

                                        <div className="flex-1">
                                            <p className="text-[10px] text-yellow-400 uppercase tracking-widest font-bold mb-1 flex items-center gap-2">
                                                <motion.span
                                                    animate={{ opacity: [1, 0.5, 1] }}
                                                    transition={{ duration: 1, repeat: Infinity }}
                                                >
                                                    ●
                                                </motion.span>
                                                NEW LEVEL UNLOCKED
                                            </p>
                                            <h2 className="text-xl font-bold text-cyan-50 uppercase tracking-wide flex items-center gap-2">
                                                <span className="text-2xl">{nextModule.icon}</span>
                                                {nextModule.name}
                                            </h2>
                                        </div>

                                        <ChevronRight className="w-6 h-6 text-yellow-400" />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Decorative corner elements on screen */}
                    <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-cyan-400/30" />
                    <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-cyan-400/30" />
                    <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-cyan-400/30" />
                    <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-cyan-400/30" />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ModuleUnlockAnimation;
