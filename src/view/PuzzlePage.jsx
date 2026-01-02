import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Gamepad2, Info, Trophy, Target, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import PuzzleGame from '@/components/PuzzleGame';

const PuzzlePage = () => {
    return (
        <div className="min-h-screen bg-[#020617] relative overflow-hidden flex flex-col pt-5 pb-10 px-4 md:px-8">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[50%] bg-cyan-500/10 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[50%] bg-purple-500/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,24,38,0.1)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(18,24,38,0.1)_1.5px,transparent_1.5px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />
            </div>

            <div className="max-w-6xl mx-auto w-full relative z-10 flex flex-col gap-8">
                <div className="grid gap-8 items-start">
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
