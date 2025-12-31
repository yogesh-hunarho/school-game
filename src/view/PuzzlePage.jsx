import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Gamepad2, Info, Trophy, Target, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import PuzzleGame from '@/components/PuzzleGame';

const PuzzlePage = () => {
    return (
        <div className="min-h-screen bg-[#020617] relative overflow-hidden flex flex-col pt-5 pb-10 px-4 md:px-8">
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[50%] bg-cyan-500/10 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[50%] bg-purple-500/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />

                {/* Grid pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,38,0.1)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(18,24,38,0.1)_1.5px,transparent_1.5px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />
            </div>

            <div className="max-w-6xl mx-auto w-full relative z-10 flex flex-col gap-8">
                <div className="grid gap-8 items-start">
                    {/* Left Side: Game Rules & Info */}
                    {/* <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-4 space-y-6"
                    >
                        <div className="bg-slate-900/40 border border-slate-800/50 p-6 rounded-3xl backdrop-blur-md relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Info className="w-20 h-20 text-cyan-400" />
                            </div>

                            <h3 className="text-cyan-400 font-black text-sm uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Info className="w-4 h-4" />
                                Protocol Manual
                            </h3>

                            <ul className="space-y-4 relative z-10">
                                <li className="flex gap-3">
                                    <div className="w-6 h-6 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center text-xs font-bold shrink-0">1</div>
                                    <p className="text-xs text-slate-300 leading-relaxed font-mono">Memorize the source visual data within the 5-second initialization window.</p>
                                </li>
                                <li className="flex gap-3">
                                    <div className="w-6 h-6 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center text-xs font-bold shrink-0">2</div>
                                    <p className="text-xs text-slate-300 leading-relaxed font-mono">Choose two sectors to swap their positions until the data is perfectly reconstructed.</p>
                                </li>
                                <li className="flex gap-3">
                                    <div className="w-6 h-6 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center text-xs font-bold shrink-0">3</div>
                                    <p className="text-xs text-slate-300 leading-relaxed font-mono">Request a 'Hint' if your sync-levels drop. Warning: Hints reduce your star rating.</p>
                                </li>
                            </ul>
                        </div>
                    </motion.div> */}

                    {/* Right Side: The Game */}
                    <div className="lg:col-span-8">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <PuzzleGame />
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PuzzlePage;
