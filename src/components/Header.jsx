import { useEffect, useRef, useMemo, useState } from "react"
import { useLMSStore, moduleOrder, moduleContent } from "@/store/lms-store";
import { useSound } from "@/hook/useSound";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { PopoverTrigger, Popover, PopoverContent, PopoverAnchor } from "./ui/popover";
import { X, Lock, Check, Brain, Box, Bot, Gamepad2, Droplets, PenTool, Sprout, Zap, ClipboardCheck, Star, User, ChevronRight } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useIsMobile } from "@/hook/use-mobile"
import AnimatedBackground from "./animated-background";

// Level calculation helper
const calculateLevel = (xp) => {
    // Level thresholds: 0-99=1, 100-249=2, 250-499=3, 500-999=4, 1000+=5
    if (xp >= 1000) return Math.floor(5 + (xp - 1000) / 500);
    if (xp >= 500) return 4;
    if (xp >= 250) return 3;
    if (xp >= 100) return 2;
    return 1;
};

const getXPForLevel = (level) => {
    if (level <= 1) return 0;
    if (level === 2) return 100;
    if (level === 3) return 250;
    if (level === 4) return 500;
    if (level === 5) return 1000;
    return 1000 + (level - 5) * 500;
};

const getXPToNextLevel = (xp) => {
    const level = calculateLevel(xp);
    const nextLevelXP = getXPForLevel(level + 1);
    const currentLevelXP = getXPForLevel(level);
    return {
        current: xp - currentLevelXP,
        required: nextLevelXP - currentLevelXP,
        percentage: ((xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100,
    };
};

// Helper Components for Popover
const LevelNode = ({ node, Icon, onClick }) => (
    <div className="relative group cursor-pointer" onClick={onClick}>
        {/* Glow effect for active/completed */}
        {(!node.isLocked) && (
            <div className={`absolute inset-0 blur-xl rounded-full transition-all duration-500 
                ${node.isCurrent ? "bg-cyan-500/40 opacity-100 scale-150" : "bg-purple-500/20 opacity-0 group-hover:opacity-100"}`}
            />
        )}

        <motion.div
            whileHover={{ scale: node.isLocked ? 1 : 1.1 }}
            whileTap={{ scale: node.isLocked ? 1 : 0.9 }}
            className={`
                relative w-14 h-14 md:w-20 md:h-20 rounded-full flex items-center justify-center border-2 transition-all duration-500 z-10
                ${node.isLocked
                    ? "bg-slate-900/80 border-slate-800 text-slate-700 backdrop-blur-sm"
                    : node.isCurrent
                        ? "bg-cyan-500 border-white text-white shadow-[0_0_20px_rgba(6,182,212,0.5)]"
                        : "bg-slate-900 border-purple-500/50 text-purple-400 group-hover:border-purple-400"
                }
            `}
        >
            {node.isLocked ? <Lock className="w-5 h-5 md:w-8 md:h-8" /> : <Icon className="w-6 h-6 md:w-10 md:h-10" />}

            {node.isCompleted && (
                <div className="absolute -top-1 -right-1 bg-emerald-500 rounded-full p-1.5 border-2 border-slate-950 shadow-lg z-20">
                    <Check className="w-3 h-3 text-white stroke-4" />
                </div>
            )}

            {/* Pulsing ring for current node */}
            {node.isCurrent && (
                <motion.div
                    animate={{ scale: [1, 1.4], opacity: [0.5, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute inset-x-0 inset-y-0 rounded-full border-2 border-cyan-400"
                />
            )}
        </motion.div>
    </div>
);

const MissionCard = ({ node, content, onClick, side }) => (
    <motion.div
        whileHover={!node.isLocked ? { scale: 1.02, x: side === "left" ? 5 : -5 } : {}}
        onClick={onClick}
        className={`
            group relative p-4 md:p-5 rounded-2xl border transition-all duration-300 cursor-pointer w-full max-w-[240px] overflow-hidden
            ${node.isLocked
                ? "bg-slate-900/30 border-white/5 text-slate-600 grayscale backdrop-blur-sm"
                : node.isCurrent
                    ? "bg-white/10 border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.15)] backdrop-blur-md"
                    : "bg-white/5 border-white/10 hover:border-purple-500/30 hover:bg-white/10 backdrop-blur-md"
            }
        `}
    >
        {/* Glow corner for current mission */}
        {node.isCurrent && (
            <div className="absolute -top-10 -right-10 w-20 h-20 bg-cyan-500/20 blur-2xl" />
        )}

        <div className={`flex flex-col ${side === "right" ? "text-right" : "text-left"}`}>
            <span className={`font-mono text-[10px] uppercase tracking-[0.2em] mb-1.5 
                ${node.isCurrent ? "text-cyan-400" : "text-white/30"}`}>
                Mission {node.index.toString().padStart(2, "0")}
            </span>
            <h3 className={`font-bold uppercase tracking-tight text-sm md:text-base leading-tight mb-2
                ${node.isLocked ? "text-slate-600" : "text-white group-hover:text-cyan-400 transition-colors"}`}>
                {node.title.replace(/-/g, " ")}
            </h3>

            {!node.isLocked && (
                <div className={`flex items-center gap-2 mt-2 ${side === "right" ? "justify-end" : "justify-start"}`}>
                    <div className="px-2 py-0.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-[10px] font-bold text-yellow-500 flex items-center gap-1">
                        <Star className="w-2.5 h-2.5 fill-yellow-500" />
                        {content?.nextModule?.xp || 50} Coin
                    </div>
                    {node.isCurrent && (
                        <div className="px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-bold text-cyan-400">
                            ACTIVE
                        </div>
                    )}
                </div>
            )}
        </div>
    </motion.div>
);

export default function Header() {
    const { player } = useLMSStore();
    const { playClick } = useSound();
    const level = calculateLevel(player.totalXP);
    const xpProgress = getXPToNextLevel(player.totalXP);
    const [isLevelModalOpen, setIsLevelModalOpen] = useState(false);
    const { playSound, playClose } = useSound()
    const navigate = useNavigate()
    const scrollContainerRef = useRef(null)
    const isMobile = useIsMobile()

    const nodes = useMemo(
        () =>
            moduleOrder.map((moduleId, index) => {
                return {
                    id: moduleId,
                    title: moduleContent[moduleId]?.title || moduleId,
                    index: index + 1,
                    isCompleted: player.moduleStatus[moduleId] === "completed",
                    isCurrent: player.moduleStatus[moduleId] === "current",
                    isLocked: player.moduleStatus[moduleId] === "locked",
                }
            }),
        [player.moduleStatus],
    )

    useEffect(() => {
        if (isLevelModalOpen && scrollContainerRef.current) {
            const currentNodeIndex = nodes.findIndex((n) => n.isCurrent)
            if (currentNodeIndex !== -1) {
                const item = scrollContainerRef.current.querySelector(`[data-node-index="${currentNodeIndex}"]`)
                if (item) item.scrollIntoView({ behavior: "smooth", block: "center" })
            }
        }
    }, [isLevelModalOpen, nodes])

    const handleNodeClick = (node) => {
        if (node.isLocked) {
            playSound("disabled")
            return
        }
        playSound("click")
        navigate(`/module/${node.id}`)
    }

    const ICON_MAP = {
        "innovators-mind": Brain,
        trebuchet: Box,
        "motor-robot": Bot,
        tetris: Gamepad2,
        "aqua-bridge": Droplets,
        "drawing-bot": PenTool,
        "soil-monitoring": Sprout,
        "homopolar-motor": Zap,
        "final-assessment": ClipboardCheck,
    }

    return (
        <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-slate-950/80 backdrop-blur-xl border-b border-cyan-500/20">
            {/* Scanline overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-10 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,255,255,0.03)_2px,rgba(0,255,255,0.03)_4px)]" />

            {/* Glow line at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-cyan-500/50 to-transparent" />

            <div className="relative h-full max-w-screen-2xl mx-auto px-4 flex items-center justify-between">
                {/* Left: Logo */}
                <Link
                    to="/"
                    onClick={playClick}
                    className="flex items-center gap-3 group"
                >
                    <div className="relative">
                        {/* Glow effect behind logo */}
                        <div className="absolute inset-0 bg-cyan-500/30 blur-lg rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <img
                            src="/hunarho_small_logo.png"
                            alt="Hunarho"
                            className="relative h-10 w-auto drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] group-hover:drop-shadow-[0_0_12px_rgba(34,211,238,0.8)] transition-all duration-300"
                        />
                    </div>
                    <span className="hidden sm:block text-lg font-bold bg-linear-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent tracking-wider">
                        HUNARHO
                    </span>
                </Link>

                {/* Right: Profile Section */}
                <div className="flex items-center gap-4 group">
                    {/* Coin and Level Stats */}
                    <div className="flex items-center gap-4">
                        <Popover open={isLevelModalOpen} onOpenChange={setIsLevelModalOpen}>
                            <PopoverTrigger asChild>
                                <div className="flex items-center gap-2">
                                    <p className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-linear-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 cursor-pointer hover:border-purple-500/60 transition-colors">
                                        <Zap className="w-4 h-4 text-purple-400" />
                                        MISSION {level}</p>
                                </div>
                            </PopoverTrigger>

                            <PopoverContent
                                side="bottom"
                                align="center"
                                sideOffset={10}
                                className="relative overflow-hidden w-[99vw] md:w-[600px] h-[90vh] p-0 border border-cyan-500/20 bg-slate-950/95 backdrop-blur-2xl z-50 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)]"
                            >
                                <AnimatedBackground
                                    variant="warp"
                                    colors={{ name: 'Matrix Green', primary: '#22c55e', secondary: '#15803d' }}
                                    intensity={"high"}
                                    speed={1}
                                />
                                <div className="relative h-full flex flex-col">
                                    {/* Header Info */}
                                    <div className="hidden p-6 border-b border-white/5 bg-white/5 backdrop-blur-md md:flex items-center justify-between shrink-0">
                                        <div>
                                            <h2 className="text-xl font-bold text-cyan-300 tracking-tight flex items-center gap-2">
                                                Mission Timeline
                                            </h2>
                                            <p className="text-xs text-emerald-300 mt-1">
                                                {nodes.filter(n => n.isCompleted).length} of {nodes.length} Missions Complete
                                            </p>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <div className="text-xs font-mono text-emerald-300 mb-1">Total Progress</div>
                                            <div className="w-32 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                                <motion.div
                                                    className="h-full bg-emerald-500 shadow-[0_0_10px_#06b6d4]"
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${(nodes.filter(n => n.isCompleted).length / nodes.length) * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        ref={scrollContainerRef}
                                        className="flex-1 overflow-y-auto md:px-5 custom-scrollbar relative"
                                    >
                                        <div className="max-w-xl mx-auto relative py-12">
                                            {/* Strategic Background Glow */}
                                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-full bg-cyan-500/5 blur-[100px] pointer-events-none" />

                                            {/* Enhanced Central Timeline Path */}
                                            <div className="absolute left-1/2 top-0 bottom-0 w-[4px] -translate-x-1/2 overflow-hidden">
                                                <div className="h-full w-full bg-slate-800/50 rounded-full" />
                                                <motion.div
                                                    className="absolute top-0 left-0 right-0 bg-linear-to-b from-cyan-400 via-purple-500 to-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)]"
                                                    style={{
                                                        height: `${Math.max(0, (nodes.findIndex(n => n.isCurrent) + 0.5) / nodes.length * 100)}%`
                                                    }}
                                                />
                                            </div>

                                            <div className="space-y-20 relative">
                                                {nodes.map((node, i) => {
                                                    const Icon = ICON_MAP[node.id] || Brain;
                                                    const content = moduleContent[node.id];
                                                    const isEven = i % 2 === 0;

                                                    return (
                                                        <div key={node.id} data-node-index={i} className="relative" onClick={() => setIsLevelModalOpen(!isLevelModalOpen)}>
                                                            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 md:gap-10">
                                                                {/* Left Column */}
                                                                <div className="flex justify-end">
                                                                    {isEven && (
                                                                        <MissionCard node={node} content={content} onClick={() => handleNodeClick(node)} side="right" />
                                                                    )}
                                                                </div>

                                                                {/* Timeline Connector/Icon */}
                                                                <div className="relative z-20">
                                                                    <motion.div
                                                                        initial={{ scale: 0.8, opacity: 0 }}
                                                                        animate={{ scale: 1, opacity: 1 }}
                                                                        transition={{ delay: i * 0.05 }}
                                                                    >
                                                                        <LevelNode
                                                                            node={node}
                                                                            Icon={Icon}
                                                                            onClick={() => handleNodeClick(node)}
                                                                        />
                                                                    </motion.div>
                                                                </div>

                                                                {/* Right Column */}
                                                                <div className="flex justify-start">
                                                                    {!isEven && (
                                                                        <MissionCard node={node} content={content} onClick={() => handleNodeClick(node)} side="left" />
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>

                        <Link
                            to="/profile"
                            onClick={playClick}
                            className="flex items-center gap-4"
                        >
                            {/* Coin Counter */}
                            <div className=" hidden md:flex flex-col items-end gap-0.5">
                                <div className="flex items-center gap-1.5">
                                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                    <span className="text-sm font-bold text-yellow-400 tabular-nums">
                                        {player.totalXP.toLocaleString()} Coins
                                    </span>
                                </div>
                                {/* Coin Progress bar */}
                                <div className="w-24 h-1 bg-slate-800 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-linear-to-r from-yellow-400 to-orange-500 rounded-full"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${Math.min(xpProgress.percentage, 100)}%` }}
                                        transition={{ duration: 0.5, ease: "easeOut" }}
                                    />
                                </div>
                            </div>

                            {/* Avatar */}
                            <div className="relative">
                                {/* Neon ring */}
                                <div className="absolute -inset-1 rounded-full opacity-70 blur-sm group-hover:opacity-100 transition-opacity" />
                                <div className="relative w-10 h-10 rounded-full bg-slate-900 border-2 border-cyan-500/50 flex items-center justify-center overflow-hidden group-hover:border-cyan-400 transition-colors">
                                    <User className="w-5 h-5 text-cyan-400" />
                                </div>
                                {/* Online indicator */}
                                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-950" />
                            </div>

                            {/* Arrow for navigation hint */}
                            {/* <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" /> */}
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}

export { calculateLevel, getXPForLevel, getXPToNextLevel };
