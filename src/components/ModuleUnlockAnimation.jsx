import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useLMSStore } from "@/store/lms-store";
import { modules } from "@/store/level-canvas-config";
import { CheckCircle2, Unlock, ChevronRight } from "lucide-react";
import DecryptedText from "./DecryptedText";

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
            const timer2 = setTimeout(() => setPhase(3), 5500);

            // Auto-close after 5 seconds and open mission transition
            const timer3 = setTimeout(() => {
                console.log("ANIMATION: Timer3 finished. Opening transition...");
                setPhase(0);
                // Open new modal FIRST
                useLMSStore.getState().openMissionTransition();
                // Then hide confetti
                hideConfetti();
            }, 10000);

            return () => {
                clearTimeout(timer1);
                clearTimeout(timer2);
                clearTimeout(timer3);
            };
        }
    }, [showConfetti, lastCompletedModuleId, hideConfetti]);

    const EASE = [0.16, 1, 0.3, 1];
    return (
        <AnimatePresence>
            {showConfetti && lastCompletedModuleId && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="fixed inset-0 z-200 flex items-center justify-center pointer-events-none"
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
                                    </motion.div>

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
                                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-emerald-400" />
                                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-emerald-400" />
                                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-emerald-400" />
                                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-emerald-400" />
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1.2 }}
                                        className="bg-black/60 border border-cyan-400/30 p-4 font-mono text-[12px] text-cyan-400"
                                    >
                                        <p>MISSION COMPLETE: {completedModule.name}</p>
                                        <p>DATA SYNC: 100%</p>
                                        <p>ESTABLISHING LINK TO NEXT MISSION…</p>
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>

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

                                        <motion.div
                                            initial={{ opacity: 0, y: 40, scale: 0.9 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            transition={{ delay: 2.2, type: "spring", stiffness: 180 }}
                                            className="relative p-6 w-full border border-yellow-400/40 bg-yellow-400/10"
                                        >
                                            <div className="flex items-center gap-4">
                                                <Unlock className="text-yellow-400 w-8 h-8" />
                                                <div>
                                                    <p className="text-yellow-400 text-xs uppercase tracking-widest">
                                                        <DecryptedText
                                                            text={"New Mission Unlocked"}
                                                            animateOn="view"
                                                            revealDirection="center"
                                                        />
                                                    </p>
                                                    <h2 className="text-xl text-white font-bold">
                                                        <DecryptedText
                                                            text={nextModule.name}
                                                            animateOn="view"
                                                            revealDirection="center"
                                                        />
                                                    </h2>
                                                </div>
                                            </div>
                                        </motion.div>


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
