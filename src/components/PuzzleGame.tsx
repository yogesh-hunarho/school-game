"use client"

import type React from "react"
import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { RefreshCw, Eye, Star, Trophy, Zap, Target, Sparkles, RotateCcw, HelpCircle, TrendingUp, Clock, Gamepad2 } from "lucide-react"
import confetti from "canvas-confetti"

interface Tile {
    id: number
    correctPos: number
    currentPos: number
}

const GRID_SIZE = 3
const TOTAL_TILES = GRID_SIZE * GRID_SIZE
const IMAGE_URL = "/assets/puzzle/cyberpunk-student.png"

const PuzzleGame: React.FC = () => {
    const [tiles, setTiles] = useState<Tile[]>([])
    const [selectedTile, setSelectedTile] = useState<number | null>(null)
    const [swaps, setSwaps] = useState(0)
    const [stars, setStars] = useState(3)
    const [showPreview, setShowPreview] = useState(true)
    const [isSolved, setIsSolved] = useState(false)
    const [isGameStarted, setIsGameStarted] = useState(false)
    const [isCountingDown, setIsCountingDown] = useState(false)
    const [countdown, setCountdown] = useState(5)
    const [gameTime, setGameTime] = useState(0)
    const [correctPieces, setCorrectPieces] = useState(0)

    const initTiles = useCallback(() => {
        const newTiles: Tile[] = Array.from({ length: TOTAL_TILES }, (_, i) => ({
            id: i,
            correctPos: i,
            currentPos: i,
        }))
        return newTiles
    }, [])

    const shuffleTiles = (tilesToShuffle: Tile[]) => {
        const shuffled = [...tilesToShuffle]
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            const temp = shuffled[i].currentPos
            shuffled[i].currentPos = shuffled[j].currentPos
            shuffled[j].currentPos = temp
        }
        return shuffled
    }

    const startGame = () => {
        setIsCountingDown(true)
        setCountdown(5)
        setTiles(initTiles())
        setShowPreview(true)
        setGameTime(0)
    }

    // Game timer
    useEffect(() => {
        let timer: any = null
        if (isGameStarted && !isSolved && !isCountingDown) {
            timer = setInterval(() => setGameTime((prev) => prev + 1), 1000)
        }
        return () => clearInterval(timer)
    }, [isGameStarted, isSolved, isCountingDown])

    // Calculate correct pieces
    useEffect(() => {
        const correct = tiles.filter((t) => t.id === t.currentPos).length
        setCorrectPieces(correct)
    }, [tiles])

    useEffect(() => {
        let timer: any = null
        if (isCountingDown && countdown > 0) {
            timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000)
        } else if (isCountingDown && countdown === 0) {
            setIsCountingDown(false)
            setShowPreview(false)
            setIsGameStarted(true)
            setTiles(shuffleTiles(initTiles()))
            setSwaps(0)
            setStars(3)
            setIsSolved(false)
        }
        return () => clearTimeout(timer)
    }, [isCountingDown, countdown, initTiles])

    useEffect(() => {
        setTiles(initTiles())
    }, [initTiles])

    const handleTileClick = (index: number) => {
        if (isSolved || !isGameStarted || isCountingDown) return

        if (selectedTile === null) {
            setSelectedTile(index)
        } else {
            if (selectedTile !== index) {
                const newTiles = [...tiles]
                const tile1 = newTiles.find((t) => t.currentPos === selectedTile)
                const tile2 = newTiles.find((t) => t.currentPos === index)

                if (tile1 && tile2) {
                    const tempPos = tile1.currentPos
                    tile1.currentPos = tile2.currentPos
                    tile2.currentPos = tempPos

                    setTiles(newTiles)
                    setSwaps((prev) => prev + 1)
                    checkWin(newTiles)
                }
            }
            setSelectedTile(null)
        }
    }

    const checkWin = (currentTiles: Tile[]) => {
        const solved = currentTiles.every((t) => t.id === t.currentPos)
        if (solved) {
            setIsSolved(true)
            confetti({
                particleCount: 200,
                spread: 90,
                origin: { y: 0.5 },
                colors: ["#00f2ff", "#ff006e", "#ffbe0b", "#8338ec"],
            })
        }
    }

    const useHint = () => {
        if (stars > 0 && !isSolved && !isCountingDown && isGameStarted) {
            setStars((prev) => prev - 1)
            setShowPreview(true)
            setTimeout(() => setShowPreview(false), 3000)
        }
    }

    const resetGame = () => {
        setShowPreview(true)
        setIsGameStarted(false)
        setIsCountingDown(false)
        setIsSolved(false)
        setTiles(initTiles())
        setSelectedTile(null)
        setGameTime(0)
    }

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    const getProgressPercentage = () => {
        return Math.round((correctPieces / TOTAL_TILES) * 100)
    }

    return (
        <div className="relative w-full min-h-screen overflow-hidden p-4 md:p-6">
            {/* Decorative background elements */}
            <div className="absolute top-10 right-10 w-72 h-72 bg-linear-to-br from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
            <div className="absolute bottom-10 left-10 w-64 h-64 bg-linear-to-br from-pink-500/20 to-yellow-500/20 rounded-full blur-3xl pointer-events-none animate-pulse"></div>

            {/* Main Layout - Left Panel + Right Game */}
            <div className="relative z-10 flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto items-stretch">

                {/* LEFT PANEL - Controls & Stats */}
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="w-full lg:w-80 flex flex-col gap-4"
                >
                    <div className="grid grid-cols-2 gap-3">
                        {/* Moves Counter */}
                        <motion.div
                            whileHover={{ scale: 1.02, y: -2 }}
                            className="bg-linear-to-br from-blue-600/30 to-blue-800/30 border-2 border-blue-400/50 rounded-2xl p-4 backdrop-blur-sm"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <Target className="w-5 h-5 text-blue-400" />
                                <span className="text-blue-300 font-bold text-xs uppercase tracking-wider">Moves</span>
                            </div>
                            <div className="text-3xl font-black text-white">{swaps}</div>
                        </motion.div>

                        {/* Stars/Hints */}
                        <motion.div
                            whileHover={{ scale: 1.02, y: -2 }}
                            className="bg-linear-to-br from-yellow-600/30 to-orange-700/30 border-2 border-yellow-400/50 rounded-2xl p-4 backdrop-blur-sm"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <Star className="w-5 h-5 text-yellow-400" />
                                <span className="text-yellow-300 font-bold text-xs uppercase tracking-wider">Hints</span>
                            </div>
                            <div className="flex gap-1">
                                {[1, 2, 3].map((i) => (
                                    <Star
                                        key={i}
                                        className={`w-6 h-6 transition-all ${i <= stars
                                            ? 'text-yellow-400 fill-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.8)]'
                                            : 'text-slate-600'
                                            }`}
                                    />
                                ))}
                            </div>
                        </motion.div>

                        {/* Timer */}
                        <motion.div
                            whileHover={{ scale: 1.02, y: -2 }}
                            className="bg-linear-to-br from-green-600/30 to-emerald-700/30 border-2 border-green-400/50 rounded-2xl p-4 backdrop-blur-sm"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <Clock className="w-5 h-5 text-green-400" />
                                <span className="text-green-300 font-bold text-xs uppercase tracking-wider">Time</span>
                            </div>
                            <div className="text-2xl font-black text-white font-mono">{formatTime(gameTime)}</div>
                        </motion.div>

                        {/* Progress */}
                        <motion.div
                            whileHover={{ scale: 1.02, y: -2 }}
                            className="bg-linear-to-br from-purple-600/30 to-pink-700/30 border-2 border-purple-400/50 rounded-2xl p-4 backdrop-blur-sm"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <TrendingUp className="w-5 h-5 text-purple-400" />
                                <span className="text-purple-300 font-bold text-xs uppercase tracking-wider">Done</span>
                            </div>
                            <div className="text-2xl font-black text-white">{getProgressPercentage()}%</div>
                        </motion.div>
                    </div>

                    {/* Progress Bar */}
                    <div className="bg-slate-900/80 rounded-2xl p-4 border-2 border-slate-700/50">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-slate-400 text-sm font-medium">Progress</span>
                            <span className="text-cyan-400 text-sm font-bold">{correctPieces}/{TOTAL_TILES} pieces</span>
                        </div>
                        <div className="h-4 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${getProgressPercentage()}%` }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                className="h-full bg-linear-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-3">
                        {/* Hint Button */}
                        <motion.button
                            onClick={useHint}
                            disabled={stars === 0 || isSolved || !isGameStarted || isCountingDown}
                            whileHover={stars > 0 && isGameStarted && !isSolved ? { scale: 1.03, y: -2 } : {}}
                            whileTap={stars > 0 && isGameStarted && !isSolved ? { scale: 0.97 } : {}}
                            className="w-full py-4 bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:from-slate-700 disabled:to-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-2xl border-2 border-purple-400/50 disabled:border-slate-600 transition-all font-bold text-lg tracking-wide flex items-center justify-center gap-3 shadow-lg"
                        >
                            <Eye className="w-6 h-6" />
                            <span>PEEK AT IMAGE</span>
                            <Sparkles className="w-5 h-5" />
                        </motion.button>

                        {/* Reset Button */}
                        <motion.button
                            onClick={resetGame}
                            whileHover={{ scale: 1.03, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            className="w-full py-4 bg-linear-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white rounded-2xl border-2 border-red-400/50 transition-all font-bold text-lg tracking-wide flex items-center justify-center gap-3 shadow-lg"
                        >
                            <RotateCcw className="w-6 h-6" />
                            <span>START OVER</span>
                        </motion.button>
                    </div>

                    {/* Help Section */}
                    <div className="bg-linear-to-br from-slate-900/80 to-slate-800/80 rounded-2xl p-4 border-2 border-slate-700/50">
                        <div className="flex items-center gap-2 mb-3">
                            <HelpCircle className="w-5 h-5 text-cyan-400" />
                            <span className="text-white font-bold text-sm">How to Play</span>
                        </div>
                        <ul className="text-slate-400 text-sm space-y-2">
                            <li className="flex items-start gap-2">
                                <span className="text-cyan-400 font-bold">1.</span>
                                <span>Look at the picture carefully</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-purple-400 font-bold">2.</span>
                                <span>Tap a piece, then tap another to swap</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-pink-400 font-bold">3.</span>
                                <span>Arrange all pieces to win! 🎉</span>
                            </li>
                        </ul>
                    </div>
                </motion.div>

                {/* RIGHT PANEL - Game Board */}
                <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex-1 flex items-center justify-center"
                >
                    <motion.div
                        layout
                        className="relative aspect-square w-full max-w-[580px] bg-linear-to-br from-slate-900 via-slate-900 to-slate-950 rounded-3xl overflow-hidden border-4 border-cyan-400/60 shadow-[0_0_50px_rgba(6,182,212,0.3),inset_0_0_30px_rgba(6,182,212,0.1)]"
                    >
                        {/* Glowing corners */}
                        <div className="absolute top-0 left-0 w-20 h-20 bg-cyan-400/20 rounded-full blur-2xl"></div>
                        <div className="absolute top-0 right-0 w-20 h-20 bg-purple-400/20 rounded-full blur-2xl"></div>
                        <div className="absolute bottom-0 left-0 w-20 h-20 bg-pink-400/20 rounded-full blur-2xl"></div>
                        <div className="absolute bottom-0 right-0 w-20 h-20 bg-yellow-400/20 rounded-full blur-2xl"></div>

                        <div
                            className="grid gap-2 w-full h-full p-3"
                            style={{
                                gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
                                gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
                            }}
                        >
                            {tiles
                                .sort((a, b) => a.currentPos - b.currentPos)
                                .map((tile) => {
                                    const row = Math.floor(tile.id / GRID_SIZE)
                                    const col = tile.id % GRID_SIZE
                                    const isSelected = selectedTile === tile.currentPos
                                    const isCorrect = tile.id === tile.currentPos

                                    return (
                                        <motion.div
                                            key={tile.id}
                                            layout
                                            onClick={() => handleTileClick(tile.currentPos)}
                                            whileHover={
                                                !isSolved && isGameStarted && !isCountingDown
                                                    ? { scale: 0.94, filter: "brightness(1.2)" }
                                                    : {}
                                            }
                                            whileTap={
                                                !isSolved && isGameStarted && !isCountingDown
                                                    ? { scale: 0.88 }
                                                    : {}
                                            }
                                            className={`relative cursor-pointer overflow-hidden group rounded-xl transition-all duration-200 ${isSelected
                                                ? "ring-4 ring-cyan-400 ring-offset-2 ring-offset-slate-900 shadow-[0_0_25px_rgba(6,182,212,0.8)] z-10"
                                                : isCorrect && isGameStarted && !isSolved
                                                    ? "ring-2 ring-green-400/60"
                                                    : "ring-1 ring-white/10 hover:ring-cyan-400/50"
                                                }`}
                                        >
                                            <div
                                                className="w-full h-full bg-cover transition-all"
                                                style={{
                                                    backgroundImage: `url(${IMAGE_URL})`,
                                                    backgroundSize: `${GRID_SIZE * 100}% ${GRID_SIZE * 100}%`,
                                                    backgroundPosition: `${(col / (GRID_SIZE - 1)) * 100}% ${(row / (GRID_SIZE - 1)) * 100}%`,
                                                    filter: isSolved ? "brightness(1.1) contrast(1.1)" : "brightness(0.95) contrast(1.2)",
                                                }}
                                            />

                                            {/* Selection overlay */}
                                            <motion.div
                                                animate={isSelected ? { opacity: 0.25 } : { opacity: 0 }}
                                                className="absolute inset-0 bg-linear-to-br from-cyan-400 to-purple-500"
                                            />

                                            {/* Correct piece indicator */}
                                            {isCorrect && isGameStarted && !isSolved && !showPreview && (
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    className="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
                                                >
                                                    <span className="text-white text-xs">✓</span>
                                                </motion.div>
                                            )}

                                            {/* Pre-game piece numbers */}
                                            {!isGameStarted && !showPreview && (
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                                                    <span className="text-cyan-400/50 font-black text-4xl">{tile.id + 1}</span>
                                                </div>
                                            )}

                                            {/* Hover glow effect */}
                                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none bg-linear-to-br from-cyan-400/10 to-purple-500/10"></div>
                                        </motion.div>
                                    )
                                })}
                        </div>

                        <AnimatePresence>
                            {showPreview && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 z-20 rounded-2xl overflow-hidden"
                                >
                                    <img src={IMAGE_URL || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />

                                    {!isGameStarted && !isCountingDown && (
                                        <motion.div className="absolute inset-0 flex flex-col items-center justify-center bg-linear-to-b from-black/60 via-black/70 to-black/80 backdrop-blur-sm">
                                            <motion.div
                                                initial={{ y: 30, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 0.2 }}
                                                className="text-center space-y-8"
                                            >
                                                {/* Fun Title */}
                                                <div>
                                                    <motion.div
                                                        animate={{ rotate: [0, 5, -5, 0] }}
                                                        transition={{ duration: 2, repeat: Infinity }}
                                                        className="text-6xl mb-4"
                                                    >
                                                        🧩
                                                    </motion.div>
                                                    <h2 className="text-4xl md:text-5xl font-black text-white drop-shadow-lg">
                                                        Ready to Play?
                                                    </h2>
                                                    <p className="text-cyan-300/80 text-lg mt-2">
                                                        Remember this picture! 📸
                                                    </p>
                                                </div>

                                                <motion.button
                                                    onClick={startGame}
                                                    whileHover={{ scale: 1.08, boxShadow: "0 0 40px rgba(34, 197, 94, 0.6)" }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="relative w-full px-12 py-5 bg-linear-to-r from-green-500 to-emerald-500 text-white font-black rounded-2xl hover:from-green-400 hover:to-emerald-400 transition-all flex items-center justify-center gap-4 shadow-[0_0_30px_rgba(34,197,94,0.5)] text-xl tracking-wider border-2 border-green-300/50"
                                                >
                                                    <Zap className="w-7 h-7" />
                                                    <span>LET'S GO!</span>
                                                    <Sparkles className="w-6 h-6" />
                                                </motion.button>

                                                <motion.p
                                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                    className="text-white/60 text-sm"
                                                >
                                                    👆 Tap the button to start!
                                                </motion.p>
                                            </motion.div>
                                        </motion.div>
                                    )}

                                    {isCountingDown && (
                                        <motion.div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none bg-black/30">
                                            <motion.div
                                                className="flex flex-col items-center"
                                                key={countdown}
                                                initial={{ scale: 1.5, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                exit={{ scale: 0.5, opacity: 0 }}
                                            >
                                                <div className="text-2xl text-white font-bold mb-4 bg-slate-900/80 px-6 py-2 rounded-full backdrop-blur-sm">
                                                    👀 Remember the picture!
                                                </div>
                                                <div className="text-9xl font-black text-white drop-shadow-[0_0_30px_rgba(6,182,212,0.9)]">
                                                    {countdown}
                                                </div>
                                            </motion.div>

                                            {/* Progress bar */}
                                            <motion.div
                                                className="absolute bottom-0 left-0 h-2 bg-linear-to-r from-cyan-500 via-purple-500 to-pink-500 shadow-[0_0_15px_rgba(6,182,212,0.6)]"
                                                initial={{ width: "100%" }}
                                                animate={{ width: "0%" }}
                                                transition={{ duration: 5, ease: "linear" }}
                                            />
                                        </motion.div>
                                    )}
                                </motion.div>
                            )}

                            {isSolved && (
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0, rotateY: 90 }}
                                    animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                                    exit={{ scale: 0.8, opacity: 0 }}
                                    transition={{ type: "spring", bounce: 0.5 }}
                                    className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-linear-to-br from-green-900/95 via-emerald-900/95 to-cyan-900/95 backdrop-blur-lg border-2 sm:border-4 border-yellow-400/60 m-1 sm:m-3 rounded-xl sm:rounded-2xl shadow-[0_0_60px_rgba(250,204,21,0.4)] p-3 sm:p-4 overflow-y-auto"
                                >
                                    <motion.div
                                        initial={{ scale: 0, rotate: -180 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        transition={{ delay: 0.3, type: "spring", bounce: 0.6 }}
                                        className="text-5xl sm:text-6xl md:text-8xl mb-2 sm:mb-4"
                                    >
                                        🏆
                                    </motion.div>

                                    <motion.h2
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.4 }}
                                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-linear-to-r from-yellow-300 via-yellow-400 to-orange-400 mb-1 sm:mb-2 text-center"
                                    >
                                        YOU WON!
                                    </motion.h2>

                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                        className="text-white/80 text-base sm:text-lg md:text-xl mb-3 sm:mb-6"
                                    >
                                        Amazing job! 🎉
                                    </motion.p>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                        className="flex flex-col items-center gap-2 sm:gap-4 bg-slate-900/80 p-3 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border border-yellow-500/30 sm:border-2 backdrop-blur-sm w-full max-w-xs sm:max-w-sm"
                                    >
                                        <div className="flex items-center justify-between w-full text-white text-sm sm:text-base md:text-lg">
                                            <div className="flex items-center gap-2">
                                                <Target className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-400" />
                                                <span>Total Moves:</span>
                                            </div>
                                            <span className="font-black text-lg sm:text-xl md:text-2xl text-blue-400">{swaps}</span>
                                        </div>
                                        <div className="flex items-center justify-between w-full text-white text-sm sm:text-base md:text-lg">
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-400" />
                                                <span>Time:</span>
                                            </div>
                                            <span className="font-black font-sans text-lg sm:text-xl md:text-2xl text-green-400">{formatTime(gameTime)}</span>
                                        </div>
                                        <div className="flex items-center justify-between w-full">
                                            <span className="text-white text-sm sm:text-base md:text-lg">Stars Left:</span>
                                            <div className="flex gap-0.5 sm:gap-1">
                                                {[1, 2, 3].map((i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 transition-all ${i <= stars
                                                            ? 'text-yellow-400 fill-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.9)]'
                                                            : 'text-slate-600'
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>

                                    <motion.button
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.7 }}
                                        onClick={resetGame}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="mt-4 sm:mt-6 md:mt-8 px-6 sm:px-8 md:px-10 py-3 sm:py-4 bg-linear-to-r from-cyan-500 to-blue-500 text-white font-black rounded-xl sm:rounded-2xl hover:from-cyan-400 hover:to-blue-400 transition-all shadow-lg text-base sm:text-lg md:text-xl flex items-center gap-2 sm:gap-3 border-2 border-cyan-300/50"
                                    >
                                        <RefreshCw className="w-5 h-5 sm:w-6 sm:h-6" />
                                        PLAY AGAIN!
                                    </motion.button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}

export default PuzzleGame
