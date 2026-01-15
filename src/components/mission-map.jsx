import { useEffect, useRef, useMemo, useState } from "react"
import { useLMSStore, moduleOrder, moduleContent } from "@/store/lms-store";
import { useSound } from "@/hook/useSound";
import { motion, useScroll } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { PopoverTrigger, Popover, PopoverContent, PopoverAnchor } from "./ui/popover";
import { X, Lock, Check, Brain, User, ChevronRight, Menu, MapPin } from "lucide-react"
import { cn } from '@/lib/utils'
import { useNavigate } from "react-router-dom"
import { useIsMobile } from "@/hook/use-mobile"
import AnimatedBackground from "./animated-background";
import { calculateLevel } from "./Header";
import HeaderCoin from "./HeaderCoin";
import CyberpunkProgressBar from "./ui/cyber-component/cyberpunk-progress-bar";
import { useInstructor } from "@/provider/InstructorProvider";
import { walkthroughDialogues } from "@/config/instructor-config";

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
            {node.isLocked ? (
                <Lock className="w-5 h-5 md:w-8 md:h-8" />
            ) : typeof Icon === "string" ? (
                <img src={Icon} alt={node.title} className="w-6 h-6 md:w-10 md:h-10 object-contain" />
            ) : (
                <Icon className="w-6 h-6 md:w-10 md:h-10" />
            )}

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
                ? "bg-slate-600/30 border-white/5 text-black backdrop-blur-sm"
                : node.isCurrent
                    ? "bg-white/30 border-cyan-500/30 border-2 shadow-[0_0_30px_rgba(6,182,212,0.15)] backdrop-blur-md"
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
                ${node.isCurrent ? "text-cyan-400 animate-pulse" : "text-slate-300"}`}>
                Mission {node.index.toString().padStart(2, "0")}
            </span>
            <h3 className={`font-bold uppercase tracking-tight text-sm md:text-base leading-tight mb-2
                ${node.isLocked ? "text-slate-400" : "text-white group-hover:text-cyan-400 transition-colors"}`}>
                {node.title.replace(/-/g, " ")}
            </h3>

            {!node.isLocked && (
                <div className={`flex items-center gap-2 mt-2 ${side === "right" ? "justify-end" : "justify-start"}`}>
                    <div className="px-2 py-0.5 rounded-full bg-yellow-100 border border-yellow-500/20 text-[10px] font-bold text-yellow-600 flex items-center gap-1">
                        <HeaderCoin className="" size={15} />
                        {content?.nextModule?.xp || 50} Coin
                    </div>
                </div>
            )}
            {/* {node.isCurrent && (
                <div className="px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-bold text-cyan-400">
                    ACTIVE
                </div>
            )} */}
        </div>
    </motion.div>
);


const MissionMap = ({ }) => {
    const location = useLocation()
    const { player, soundEnabled, toggleSound } = useLMSStore();
    const level = calculateLevel(player);
    const [isLevelModalOpen, setIsLevelModalOpen] = useState(false);
    const { playSound, playClose, playClick } = useSound()
    const navigate = useNavigate()
    const scrollContainerRef = useRef(null)
    const { showWalkthrough } = useInstructor();

    const nodes = useMemo(
        () =>
            moduleOrder.map((moduleId, index) => {
                const title = moduleId?.id
                return {
                    id: moduleId?.id,
                    title: title,
                    index: index + 1,
                    isCompleted: player.moduleStatus[title] === "completed",
                    isCurrent: player.moduleStatus[title] === "current",
                    isLocked: player.moduleStatus[title] === "locked",
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
        navigate(`/mission/${node.id}`)
    }

    const ICON_MAP = {
        "innovators-mind": "/assets/images/icons/Grade6_IM.png",
        trebuchet: "/assets/images/icons/Grade6_Trebuchet.png",
        "motor-robot": "/assets/images/icons/Grade6_MotorRobot.png",
        tetris: "/assets/images/icons/Grade6_Tetris.png",
        "aqua-bridge": "/assets/images/icons/Grade6_AquaBridge.png",
        "drawing-bot": "/assets/images/icons/Grade6_DrawingBot.png",
        "soil-monitoring": "/assets/images/icons/Grade6_SoilMonitoring.png",
        "homopolar-motor": "/assets/images/icons/Grade6_HomopolarMotor.png",
        "final-assessment": "/assets/images/icons/Grade6_Assessment.png",
    }

    const cardVariants = {
        hidden: (side) => ({
            x: side === "left" ? -80 : 80,
            opacity: 0,
            scale: 0.95,
        }),
        visible: {
            x: 0,
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 120,
                damping: 18,
            },
        },
    };

    const progress = (nodes.filter(n => n.isCompleted).length / nodes.length) * 100

    const handleWalkthrough = () => {
        showWalkthrough(walkthroughDialogues['mission-map']);
    }

    return (
        <Popover open={isLevelModalOpen} onOpenChange={setIsLevelModalOpen}>
            <PopoverTrigger asChild>
                <div className="flex items-center">
                    <p onClick={handleWalkthrough} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-linear-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 cursor-pointer hover:border-purple-500/60 transition-colors text-white font-bold">
                        <MapPin className="md:w-5 md:h-5 animate-pulse" />
                        MISSION {level}
                    </p>
                </div>
            </PopoverTrigger>

            <PopoverContent
                side="bottom"
                align="center"
                sideOffset={10}
                className="relative overflow-hidden w-[99vw] md:w-[600px] h-[90vh] p-0 border border-cyan-500/20 bg-background backdrop-blur-md z-50 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            >
                <AnimatedBackground
                    variant="warp"
                    colors={{ name: 'Matrix Green', primary: '#22c55e', secondary: '#15803d' }}
                    intensity={"high"}
                    speed={1}
                />
                <div className="relative h-full flex flex-col">
                    {/* Header Info */}
                    <div className="hidden p-3 border-b border-white/5 bg-white/5 backdrop-blur-md md:flex items-center justify-between shrink-0">
                        <div>
                            <h2 className="text-xl font-bold text-emerald-300 tracking-tight flex items-center gap-2">
                                Mission Map
                            </h2>
                            <p className="text-xs text-emerald-300 mt-1">
                                {nodes.filter(n => n.isCompleted).length} of {nodes.length} Missions Complete
                            </p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                            <motion.div
                                className="text-xs font-mono text-emerald-300"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                Total Progress
                            </motion.div>
                            <CyberpunkProgressBar
                                progress={progress}
                                hideLabel
                            />
                        </div>
                    </div>

                    <div
                        ref={scrollContainerRef}
                        className="flex-1 overflow-y-auto md:px-5 custom-scrollbar relative"
                    >
                        <div className="max-w-xl mx-auto relative py-12">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-full bg-cyan-500/5 blur-[100px] pointer-events-none" />
                            <div className="absolute left-1/2 top-0 bottom-0 w-[4px] -translate-x-1/2 overflow-hidden">
                                <div className="h-full w-full bg-slate-800/50 rounded-full" />
                                <motion.div
                                    className="absolute top-0 left-0 right-0 bg-linear-to-b from-cyan-400 via-purple-500 to-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)]"
                                    style={{
                                        height: `${Math.max(0, (nodes.findIndex(n => n.isCurrent) + 0.5) / nodes.length * 100)}%`
                                    }}
                                />
                            </div>

                            <motion.div
                                className="space-y-20 relative"
                                initial="hidden"
                                animate="visible"
                                variants={{
                                    hidden: {},
                                    visible: {
                                        transition: {
                                            staggerChildren: 0.15,
                                        },
                                    },
                                }}>
                                {nodes.map((node, i) => {
                                    const Icon = ICON_MAP[node.id] || Brain;
                                    const content = moduleContent[node.id];
                                    const isEven = i % 2 === 0;

                                    return (
                                        <div key={node.id} data-node-index={i} className="relative" onClick={() => setIsLevelModalOpen(!isLevelModalOpen)}>
                                            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 md:gap-10">
                                                <div className="flex justify-end">
                                                    {isEven && (
                                                        <motion.div
                                                            custom="right"
                                                            variants={cardVariants}
                                                            initial="hidden"
                                                            whileInView="visible"
                                                            viewport={{ once: true, margin: "-100px" }}
                                                        >
                                                            <MissionCard
                                                                node={node}
                                                                content={content}
                                                                onClick={() => handleNodeClick(node)}
                                                                side="right"
                                                            />
                                                        </motion.div>
                                                    )}
                                                </div>
                                                <div className="relative z-20">
                                                    <motion.div
                                                        initial={{ scale: 0.8, opacity: 0 }}
                                                        whileInView={{ scale: 1, opacity: 1 }}
                                                        viewport={{ once: true }}
                                                        transition={{
                                                            type: "spring",
                                                            stiffness: 200,
                                                            damping: 15,
                                                            delay: i * 0.04,
                                                        }}
                                                    >
                                                        <LevelNode
                                                            node={node}
                                                            Icon={Icon}
                                                            onClick={() => handleNodeClick(node)}
                                                        />
                                                    </motion.div>
                                                </div>
                                                <div className="flex justify-start">
                                                    {!isEven && (
                                                        <motion.div
                                                            custom="left"
                                                            variants={cardVariants}
                                                            initial="hidden"
                                                            whileInView="visible"
                                                            viewport={{ once: true, margin: "-100px" }}
                                                        >
                                                            <MissionCard
                                                                node={node}
                                                                content={content}
                                                                onClick={() => handleNodeClick(node)}
                                                                side="left"
                                                            />
                                                        </motion.div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default MissionMap