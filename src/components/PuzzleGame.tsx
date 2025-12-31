import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, RefreshCw, Eye, Star, Trophy, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Tile {
    id: number;
    correctPos: number;
    currentPos: number;
}

const GRID_SIZE = 3;
const TOTAL_TILES = GRID_SIZE * GRID_SIZE;
const IMAGE_URL = '/assets/puzzle/cyberpunk-student.png';

const PuzzleGame: React.FC = () => {
    const [tiles, setTiles] = useState<Tile[]>([]);
    const [selectedTile, setSelectedTile] = useState<number | null>(null);
    const [swaps, setSwaps] = useState(0);
    const [stars, setStars] = useState(3);
    const [showPreview, setShowPreview] = useState(true); // Initial preview
    const [isSolved, setIsSolved] = useState(false);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [isCountingDown, setIsCountingDown] = useState(false);
    const [countdown, setCountdown] = useState(5);

    const initTiles = useCallback(() => {
        const newTiles: Tile[] = Array.from({ length: TOTAL_TILES }, (_, i) => ({
            id: i,
            correctPos: i,
            currentPos: i,
        }));
        return newTiles;
    }, []);

    const shuffleTiles = (tilesToShuffle: Tile[]) => {
        const shuffled = [...tilesToShuffle];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = shuffled[i].currentPos;
            shuffled[i].currentPos = shuffled[j].currentPos;
            shuffled[j].currentPos = temp;
        }
        return shuffled;
    };

    const startGame = () => {
        setIsCountingDown(true);
        setCountdown(5);
        setTiles(initTiles()); // Show complete image for preview
        setShowPreview(true);
    };

    useEffect(() => {
        let timer: any = null;
        if (isCountingDown && countdown > 0) {
            timer = setTimeout(() => setCountdown(prev => prev - 1), 1000);
        } else if (isCountingDown && countdown === 0) {
            setIsCountingDown(false);
            setShowPreview(false);
            setIsGameStarted(true);
            setTiles(shuffleTiles(initTiles()));
            setSwaps(0);
            setStars(3);
            setIsSolved(false);
        }
        return () => clearTimeout(timer);
    }, [isCountingDown, countdown, initTiles]);

    useEffect(() => {
        setTiles(initTiles());
    }, [initTiles]);

    const handleTileClick = (index: number) => {
        if (isSolved || !isGameStarted || isCountingDown) return;

        if (selectedTile === null) {
            setSelectedTile(index);
        } else {
            if (selectedTile !== index) {
                const newTiles = [...tiles];
                const tile1 = newTiles.find(t => t.currentPos === selectedTile);
                const tile2 = newTiles.find(t => t.currentPos === index);

                if (tile1 && tile2) {
                    const tempPos = tile1.currentPos;
                    tile1.currentPos = tile2.currentPos;
                    tile2.currentPos = tempPos;

                    setTiles(newTiles);
                    setSwaps(prev => prev + 1);
                    checkWin(newTiles);
                }
            }
            setSelectedTile(null);
        }
    };

    const checkWin = (currentTiles: Tile[]) => {
        const solved = currentTiles.every(t => t.id === t.currentPos);
        if (solved) {
            setIsSolved(true);
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#00f2ff', '#7000ff', '#ff00d9']
            });
        }
    };

    const useHint = () => {
        if (stars > 0 && !isSolved && !isCountingDown) {
            setStars(prev => prev - 1);
            setShowPreview(true);
            setTimeout(() => setShowPreview(false), 3000);
        }
    };

    const resetGame = () => {
        setShowPreview(true);
        setIsGameStarted(false);
        setIsCountingDown(false);
        setIsSolved(false);
        setTiles(initTiles());
        setSelectedTile(null);
    };

    return (
        <div className="flex flex-col items-center justify-center p-6 space-y-6 w-full max-w-4xl mx-auto bg-slate-950/50 rounded-3xl border border-cyan-500/20 backdrop-blur-xl">
            {/* Header Info */}
            <div className="flex justify-between w-full items-center mb-4">
                <div className="flex space-x-4">
                    <div className="flex items-center space-x-2 bg-slate-900/80 px-4 py-2 rounded-xl border border-cyan-500/30">
                        <Share2 className="w-5 h-5 text-cyan-400" />
                        <span className="text-cyan-100 font-mono">Moves: {swaps}</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-slate-900/80 px-4 py-2 rounded-xl border border-yellow-500/30">
                        <Star className="w-5 h-5 text-yellow-400" />
                        <span className="text-yellow-100 font-mono">Hints: {stars}</span>
                    </div>
                </div>

                <div className="flex space-x-2">
                    <button
                        onClick={useHint}
                        disabled={stars === 0 || isSolved || !isGameStarted || isCountingDown}
                        className="flex items-center space-x-2 bg-purple-600/20 hover:bg-purple-600/40 disabled:opacity-30 text-purple-200 px-4 py-2 rounded-xl border border-purple-500/40 transition-all font-bold"
                    >
                        <Eye className="w-4 h-4" />
                        <span>HINT</span>
                    </button>
                    <button
                        onClick={resetGame}
                        className="p-2 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors border border-slate-700"
                    >
                        <RefreshCw className="w-5 h-5 text-slate-300" />
                    </button>
                </div>
            </div>

            {/* Game Board */}
            <div className="relative aspect-square w-full max-w-[500px] bg-slate-900 rounded-2xl overflow-hidden border-4 border-cyan-500/40 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                <div
                    className="grid gap-1 w-full h-full"
                    style={{
                        gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
                        gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`
                    }}
                >
                    {tiles.sort((a, b) => a.currentPos - b.currentPos).map((tile) => {
                        const row = Math.floor(tile.id / GRID_SIZE);
                        const col = tile.id % GRID_SIZE;

                        return (
                            <motion.div
                                key={tile.id}
                                layout
                                onClick={() => handleTileClick(tile.currentPos)}
                                whileHover={!isSolved && isGameStarted && !isCountingDown ? { scale: 0.98 } : {}}
                                whileTap={!isSolved && isGameStarted && !isCountingDown ? { scale: 0.95 } : {}}
                                className={`relative cursor-pointer overflow-hidden group ${selectedTile === tile.currentPos ? 'ring-4 ring-cyan-400 z-10' : ''
                                    }`}
                            >
                                <div
                                    className="w-full h-full bg-cover"
                                    style={{
                                        backgroundImage: `url(${IMAGE_URL})`,
                                        backgroundSize: `${GRID_SIZE * 100}% ${GRID_SIZE * 100}%`,
                                        backgroundPosition: `${(col / (GRID_SIZE - 1)) * 100}% ${(row / (GRID_SIZE - 1)) * 100}%`,
                                        filter: isSolved ? 'none' : 'brightness(0.9) contrast(1.1)',
                                    }}
                                />

                                <div className={`absolute inset-0 transition-opacity ${selectedTile === tile.currentPos ? 'bg-cyan-500/20' : 'bg-transparent'
                                    }`} />

                                {!isGameStarted && !showPreview && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                                        <span className="text-white/20 font-bold text-4xl">{tile.id + 1}</span>
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>

                {/* Overlays */}
                <AnimatePresence>
                    {showPreview && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 z-20"
                        >
                            <img src={IMAGE_URL} alt="Preview" className="w-full h-full object-cover" />
                            {!isGameStarted && !isCountingDown && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-md">
                                    <motion.h2
                                        initial={{ y: 20 }}
                                        animate={{ y: 0 }}
                                        className="text-4xl font-black text-white mb-6 drop-shadow-lg uppercase tracking-wider"
                                    >
                                        Cyber-Puzzle
                                    </motion.h2>
                                    <button
                                        onClick={startGame}
                                        className="group relative px-10 py-4 bg-cyan-500 text-slate-950 font-black rounded-full hover:bg-cyan-400 transition-all flex items-center space-x-3 shadow-[0_0_20px_rgba(6,182,212,0.5)]"
                                    >
                                        <span className="tracking-widest">START MISSION</span>
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                    <p className="mt-4 text-cyan-200/70 text-sm font-mono animate-pulse">MEMORIZE_VISUAL_DATA</p>
                                </div>
                            )}

                            {isCountingDown && (
                                <div className="absolute inset-0 flex flex-col items-end justify-start p-6 pointer-events-none">
                                    <div className="bg-slate-950/80 border border-cyan-400/50 rounded-2xl p-4 backdrop-blur-md flex flex-col items-center min-w-[100px] shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                                        <div className="text-[10px] text-cyan-400 font-black tracking-widest uppercase mb-1">Memorizing...</div>
                                        <motion.div
                                            key={countdown}
                                            initial={{ scale: 1.2, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            className="text-5xl font-black text-white drop-shadow-[0_0:10px_rgba(6,182,212,0.5)]"
                                        >
                                            {countdown}
                                        </motion.div>
                                    </div>
                                    <div className="absolute bottom-0 left-0 w-full h-1 bg-cyan-900/50 overflow-hidden">
                                        <motion.div
                                            initial={{ width: "100%" }}
                                            animate={{ width: "0%" }}
                                            transition={{ duration: 5, ease: "linear" }}
                                            className="h-full bg-cyan-400 shadow-[0_0:10px_#22d3ee]"
                                        />
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}

                    {isSolved && (
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-cyan-950/90 backdrop-blur-md border-4 border-cyan-400 m-4 rounded-3xl"
                        >
                            <Trophy className="w-24 h-24 text-yellow-400 mb-4 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
                            <h2 className="text-4xl font-black text-white mb-2 tracking-tighter">MISSION COMPLETE!</h2>
                            <div className="flex flex-col items-center space-y-2 mb-8 bg-slate-900/50 p-6 rounded-2xl border border-cyan-500/20">
                                <p className="text-cyan-200 uppercase tracking-widest font-bold">Total Swaps: <span className="text-white">{swaps}</span></p>
                                <p className="text-cyan-200 uppercase tracking-widest font-bold">Stars Earned: <span className="text-yellow-400">{stars} / 3</span></p>
                            </div>
                            <button
                                onClick={resetGame}
                                className="px-10 py-3 bg-white text-slate-950 font-black rounded-full hover:bg-cyan-100 transition-all shadow-xl tracking-widest uppercase"
                            >
                                NEW MISSION
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default PuzzleGame;
