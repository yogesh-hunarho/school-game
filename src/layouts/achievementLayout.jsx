import React, { useState, useMemo } from "react";
import { useLMSStore } from "@/store/lms-store";
import { motion, AnimatePresence } from "framer-motion";
import {
    Zap,
    Award,
    Lock,
    User,
    Gamepad2,
    Star,
    Coins,
    Flame,
    Play,
    CheckCircle2,
    Trophy,
    Gamepad,
    Info,
    ArrowLeft
} from "lucide-react";
import { cn } from "@/lib/utils";
import CyberpunkButton from "@/components/ui/cyber-button";
import { useNavigate } from "react-router-dom";
import CyberpunkProgressBar from "@/components/ui/cyber-component/cyberpunk-progress-bar";
import AchievementCollectionModal from "@/components/modals/AchievementCollectionModal";
import useSound from "@/hook/useSound";
import { useIsMobile } from "@/hook/use-mobile";
import PuzzleUnlockPreview from "@/components/PuzzleUnlockPreview";

const ACHIEVEMENT_DEFINITIONS = [
    {
        id: "first-video",
        badge: "Badge 1",
        title: "Video Pioneer",
        description: "Start your learning journey by watching your very first video.",
        image: "/assets/achievements/badge1.png",
        category: "Learning",
        check: (player) => Object.values(player.progress).some(p => p.watchedVideos.length > 0),
        getProgress: (player) => {
            const count = Object.values(player.progress).reduce((acc, p) => acc + p.watchedVideos.length, 0);
            return { current: Math.min(count, 1), total: 1 };
        }
    },
    {
        id: "first-quiz",
        badge: "Badge 2",
        title: "Quiz Rookie",
        description: "Take your first quiz and put your knowledge to the test.",
        image: "/assets/achievements/badge2.png",
        category: "Learning",
        check: (player) => Object.values(player.progress).some(p => p.completedQuizzes.length > 0),
        getProgress: (player) => {
            const count = Object.values(player.progress).reduce((acc, p) => acc + p.completedQuizzes.length, 0);
            return { current: Math.min(count, 1), total: 1 };
        }
    },
    {
        id: "module-master",
        badge: "Badge 3",
        title: "Module Master",
        description: "Fully complete any one mission from start to finish.",
        image: "/assets/achievements/badge3.png",
        category: "Mastery",
        check: (player, getModuleProgress) =>
            Object.keys(player.progress).some(id => getModuleProgress(id) === 100),
        getProgress: (player, getModuleProgress) => {
            const max = Math.max(0, ...Object.keys(player.progress).map(id => getModuleProgress(id)));
            return { current: max, total: 100, isPercent: true };
        }
    },
    {
        id: "module-4",
        badge: "Badge 4",
        title: "Quad Specialist",
        description: "Complete four different missions and prove your growing expertise.",
        image: "/assets/achievements/badge4.png",
        category: "Mastery",
        check: (player, getModuleProgress) =>
            Object.keys(player.progress).filter(id => getModuleProgress(id) === 100).length >= 4,
        getProgress: (player, getModuleProgress) => {
            const count = Object.keys(player.progress).filter(id => getModuleProgress(id) === 100).length;
            return { current: count, total: 4 };
        }
    },
    {
        id: "coin-500",
        badge: "Badge 5",
        title: "Wealth Seeker",
        description: "Earn 400 coins through learning activities and achievements.",
        image: "/assets/achievements/badge5.png",
        category: "Rewards",
        check: (player) => player.coins >= 400,
        getProgress: (player) => ({ current: player.coins, total: 400 })
    },
    {
        id: "streak-7",
        badge: "Badge 6",
        title: "Consistent Learner",
        description: "Maintain a 7-day learning streak without missing a day.",
        image: "/assets/achievements/badge6.png",
        category: "Consistency",
        check: (player) => player.streak >= 7,
        getProgress: (player) => ({ current: player.streak, total: 7 })
    },
    {
        id: "coin-1000",
        badge: "Badge 7",
        title: "Coin Tycoon",
        description: "Collect over 1000 coins and become a top rewards earner.",
        image: "/assets/achievements/badge7.png",
        category: "Rewards",
        check: (player) => player.coins >= 1000,
        getProgress: (player) => ({ current: player.coins, total: 1000 })
    },
    {
        id: "all-modules",
        badge: "Badge 8",
        title: "Ultimate Scholar",
        description: "Complete every mission and master the entire learning path.",
        image: "/assets/achievements/badge8.png",
        category: "Mastery",
        check: (player, getModuleProgress) => {
            const moduleIds = Object.keys(player.moduleStatus).filter(id => id !== 'final-assessment');
            return moduleIds.length > 0 && moduleIds.every(id => getModuleProgress(id) === 100);
        },
        getProgress: (player, getModuleProgress) => {
            const moduleIds = Object.keys(player.moduleStatus).filter(id => id !== 'final-assessment');
            const completedCount = moduleIds.filter(id => getModuleProgress(id) === 100).length;
            return { current: completedCount, total: moduleIds.length };
        }
    }
];


const AchievementCard = ({ achievement, isUnlocked, progress, onCollectClick }) => {
    const setProfileImage = useLMSStore(state => state.setProfileImage);
    const currentPlayerImage = useLMSStore(state => state.player.profileImage);
    const collectedAchievements = useLMSStore(state => state.player.collectedAchievements || []);
    const isCurrentAvatar = currentPlayerImage === achievement.image;
    const isCollected = collectedAchievements.includes(achievement.id);
    const showCollectButton = isUnlocked && !isCollected;
    const { playSound } = useSound();
    const isMobile = useIsMobile()

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={cn(
                "relative flex flex-col aspect-4/5 overflow-hidden group border-2 transition-all duration-500 ",
                "hover:rounded-tl-[55px]",
                isUnlocked
                    ? "border-emerald-500/50 shadow-[0_70px_30px_-50px_rgba(96,75,74,0.18)]"
                    : "border-zinc-800"
            )}
        >
            {/* Background Image / Character (Profile Pic) */}
            <div className={cn(
                "absolute transition-all duration-500 ease-in-out z-10",
                "inset-[3px] group-hover:inset-[10px] group-hover:w-20 group-hover:h-20 group-hover:rounded-full group-hover:border-4 group-hover:border-yellow-500 group-hover:shadow-[0_5px_5px_rgba(96,75,74,0.18)] group-hover:z-30",
                "rounded-[29px]",
                !isUnlocked && "opacity-90"
            )}>
                <img
                    src={achievement.image}
                    alt={achievement.title}
                    className={cn(
                        "w-full h-full object-cover transition-all duration-700 group-hover:rounded-full group-hover:scale-[2] group-hover:translate-y-4",
                        ""
                    )}
                />
            </div>

            {/* Icons (Top Right) */}
            <div className="absolute top-4 right-6 z-20 transition-all duration-500 group-hover:opacity-0 group-hover:scale-50">
                {/* <div className={cn(
                    "w-7 h-7 flex items-center justify-center rounded-full backdrop-blur-md border shadow-lg",
                    isUnlocked
                        ? "bg-yellow-500/20 border-yellow-500/50 text-yellow-500"
                        : "bg-black/40 border-zinc-700 text-zinc-500"
                )}>
                    {isUnlocked ? (
                        <Star className="w-4 h-4 fill-yellow-500" />
                    ) : (
                        <Lock className="w-3.5 h-3.5" />
                    )}
                </div> */}
                {isUnlocked && isMobile && (
                    <CyberpunkButton
                        variant="puzzle"
                        className={"py-0 px-1"}
                        onClick={(e) => {
                            e.stopPropagation();
                            setProfileImage(achievement.image);
                        }}
                        disabled={isCurrentAvatar}
                    >
                        {isCurrentAvatar ? "Active" : "Set Avatar"}
                    </CyberpunkButton>
                )}
            </div>

            {/* Expanding Bottom Panel */}
            <div
                onMouseEnter={() => playSound("zoom")}
                className={cn(
                    "absolute left-[3px] right-[3px] bottom-[3px] z-20 transition-all duration-500 cubic-bezier(0.645, 0.045, 0.355, 1)",
                    "top-[80%] group-hover:top-[20%] group-hover:rounded-[80px_0px_0px_0px] overflow-hidden shadow-[inset_0_5px_5px_rgba(96,75,74,0.18)]",
                    isUnlocked ? "bg-emerald-500/40 group-hover:bg-emerald-300/40 backdrop-blur-sm group-hover:backdrop-blur-xl" : "bg-slate-800/70"
                )}>
                {/* Content Container */}
                <div className="absolute top-0 left-0 right-0 bottom-0 p-3 pt-1 flex flex-col">
                    {/* Title (visible near top of panel) */}
                    <div className="mt-2 group-hover:mt-24 transition-all duration-500">
                        <span className={cn(
                            "block text-md font-black font-mono uppercase tracking-widest transition-colors",
                            isUnlocked ? "text-white" : "text-zinc-300"
                        )}>
                            {achievement.title}
                        </span>
                    </div>

                    {/* Description (About Me - fades in) */}
                    <div className="">
                        <p className={cn("text-xs font-mono text-white font-medium line-clamp-3", isUnlocked ? "text-white" : "text-zinc-300")}>
                            {achievement.description}
                        </p>
                    </div>

                    {/* Bottom Action Area */}
                    <div className="mt-auto flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-300">
                        {isUnlocked && (
                            <CyberpunkButton
                                variant="puzzle"
                                className={"py-0 px-1"}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setProfileImage(achievement.image);
                                }}
                                disabled={isCurrentAvatar}
                            >
                                {isCurrentAvatar ? "Active" : "Set Avatar"}
                            </CyberpunkButton>
                        )}
                    </div>
                </div>
            </div>

            {/* Collect Button Overlay (for newly unlocked achievements) */}
            {showCollectButton && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-transparent/80 backdrop-blur">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onCollectClick(achievement);
                        }}
                        style={{
                            clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)'
                        }}
                        className="relative border border-yellow-500 px-5 py-2 bg-linear-to-r from-yellow-400 to-orange-400 font-black text-xs uppercase tracking-wider text-black shadow-[0_0_30px_rgba(250,204,21,0.6)] hover:scale-110 active:scale-95 transition-transform overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-500 skew-x-12" />
                        <span className="relative z-10 text-white">Collect</span>
                    </button>
                </div>
            )}

            {/* Particle Glow Effect */}
            {isUnlocked && (
                <div className="absolute inset-0 pointer-events-none z-0">
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-yellow-500/10 blur-3xl rounded-full" />
                </div>
            )}
        </motion.div>
    );
};

const AchievementLayout = () => {
    const [selectedAchievement, setSelectedAchievement] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const player = useLMSStore((state) => state.player);
    const getModuleProgress = useLMSStore((state) => state.getModuleProgress);
    const collectAchievement = useLMSStore((state) => state.collectAchievement);
    const [activeTab, setActiveTab] = useState("All");
    const navigate = useNavigate();

    const handleCollectClick = (achievement) => {
        setSelectedAchievement(achievement);
        setShowModal(true);
    };

    const playPuzzle = () => {
        navigate('/puzzle');
    }

    const handleCollect = () => {
        if (selectedAchievement) {
            collectAchievement(selectedAchievement.id);
        }
    };

    const filteredAchievements = useMemo(() => {
        return ACHIEVEMENT_DEFINITIONS.filter(ach =>
            activeTab === "All" || ach.category === activeTab
        );
    }, [activeTab]);

    const handleBack = () => {
        navigate(-1);
    };

    const completedMissions = Object.keys(player.progress).filter(id => getModuleProgress(id) === 100).length;
    const totalMissions = Object.keys(player.moduleStatus).filter(id => id !== 'final-assessment').length;

    return (
        <div className="relative min-h-screen text-white overflow-hidden mb-28">
            {/* Background Grid & Effects */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[50px_50px]" />
                <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-blue-500/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-yellow-500/5 blur-[120px] rounded-full" />
            </div>

            <div className="relative xl:max-w-7xl lg:max-w-6xl md:max-w-5xl max-w-4xl mx-auto flex flex-col pt-20">
                <main className="p-4">
                    <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 bg-black/40 backdrop-blur-xl p-2 md:p-3 border border-white/5 shadow-2xl">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={handleBack}
                                className="p-2 hover:bg-white/10 rounded-xl transition-colors text-zinc-400 hover:text-white"
                            >
                                <ArrowLeft className="w-6 h-6" />
                            </button>
                            <h1 className="text-md md:text-lg font-black tracking-wider italic uppercase text-white">
                                ACHIEVEMENTS
                            </h1>
                        </div>

                        <div className="flex flex-wrap items-end justify-between gap-4 md:gap-8">
                            <div className="flex flex-col gap-1.5 min-w-[200px]">
                                <div className="flex justify-between items-end text-[10px] font-black uppercase tracking-widest text-zinc-400">
                                    <span>Missions Completed</span>
                                    <span className="text-white">{completedMissions}/{totalMissions}</span>
                                </div>
                                <div className="h-4 flex items-center">
                                    <CyberpunkProgressBar height="4" progress={(completedMissions / totalMissions || 0) * 100} hideLabel />
                                </div>
                            </div>
                            <div>
                                <CyberpunkButton
                                    variant="puzzle"
                                    className={"py-0 px-1"}
                                    onClick={playPuzzle}
                                >
                                    Play Puzzle
                                </CyberpunkButton>
                            </div>
                        </div>
                    </header>

                    <motion.div
                        layout
                        className="grid grid-cols-1 lg:grid-cols-5 gap-3 md:gap-5"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredAchievements.map((ach) => (
                                <AchievementCard
                                    key={ach.id}
                                    achievement={ach}
                                    isUnlocked={ach.check(player, getModuleProgress)}
                                    progress={ach.getProgress(player, getModuleProgress)}
                                    onCollectClick={handleCollectClick}
                                />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                    <AchievementCollectionModal
                        achievement={selectedAchievement}
                        isOpen={showModal}
                        onClose={() => setShowModal(false)}
                        onCollect={handleCollect}
                    />
                    <PuzzleUnlockPreview onStartGame={() => { }} />
                </main>
            </div>
        </div>
    );
};

export default AchievementLayout;