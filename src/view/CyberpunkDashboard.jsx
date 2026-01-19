import { useNavigate } from "react-router-dom";
import { useLMSStore } from "@/store/lms-store";
import { modules } from "@/store/level-canvas-config";
import { CyberpunkCard } from "@/components/cyberpunk-card";
import { useIsMobile } from "@/hook/use-mobile";
import { motion } from "framer-motion";
import { CyberpunkLock } from "@/components/ui/cyber-component/cyber-punk.cardlock";
import CyberpunkProgressBar from "@/components/ui/cyber-component/cyberpunk-progress-bar";
import DecryptedText from "@/components/DecryptedText";
import { useInstructor } from "@/provider/InstructorProvider";

export const CyberpunkDashboard = () => {
    const { player, getModuleProgress } = useLMSStore();
    const navigate = useNavigate();
    const isMobile = useIsMobile()

    // Calculate completed count
    const completedCount = Object.values(player.moduleStatus).filter((s) => s === "completed").length;

    const { triggerCustomDialogue } = useInstructor();
    const handleModuleSelect = (moduleId) => {
        const status = player.moduleStatus[moduleId] || "locked";
        if (status === "locked") {
            triggerCustomDialogue('locked-mission');
            return;
        }

        navigate(`/mission/${moduleId}`);
    };

    const getEntryAnimation = (index) => {
        if (index % 3 === 0) {
            return { x: -80, opacity: 0 };
        }
        if (index % 3 === 1) {
            return { x: 80, opacity: 0 };
        }
        return { y: 60, opacity: 0 };
    };


    const cardMotion = (index) => ({
        initial: getEntryAnimation(index),
        whileInView: {
            x: 0,
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.7,
                ease: "easeOut",
                delay: index * 0.3,
            },
        },
        viewport: {
            once: true,
            amount: 0.25,
        },
    });


    return (
        <div className="relative min-h-screen  overflow-hidden pb-20 mt-14 md:mt-20 p-4 md:p-0 mb-20">
            {/* Cyberpunk Global Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Horizontal Scanline */}
                <motion.div
                    animate={{ top: ["0%", "100%"] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 right-0 h-1 bg-cyan-500/20 blur-sm z-0"
                />

                {/* Data Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-size-[40px_40px]" />

                {/* Deep background glows */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 blur-[120px] rounded-full" />
            </div>

            <div className="relative xl:max-w-7xl lg:max-w-6xl md:max-w-5xl max-w-4xl mx-auto flex flex-col py-2">
                {/* Header with Tech Ornaments */}
                <div className="relative">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-cyan-500/30 pb-6 transition-all">
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <div className="w-2 h-6 bg-cyan-500 shadow-[0_0_10px_#06b6d4]" />
                                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic">
                                    <DecryptedText
                                        text="Mission Control"
                                        animateOn="view"
                                        revealDirection="center"
                                    />
                                </h1>
                            </div>
                            <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.4em] ml-5">
                                <span className="w-1 h-1 bg-slate-700 rounded-full" />
                                <span>Protocol: {player.protocol || "Grade_6"}</span>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center items-start gap-6 bg-slate-900/50 backdrop-blur-sm border border-emerald-500/50 p-4">
                            <div className="flex gap-5 w-full items-center justify-between md:items-end px-4 md:border-r border-emerald-500/10">
                                <span className="text-[10px] font-mono  uppercase tracking-widest">Completed</span>
                                <span className="text-4xl font-black text-emerald-400">{completedCount}<span className="text-xl italic ml-1">/9</span></span>
                            </div>
                            <div className="flex flex-col w-full items-end px-4">
                                <span className="text-[10px] w-full md:w-auto font-mono uppercase tracking-widest">Overall_Progress</span>
                                <div className="flex items-center gap-3 mt-1">
                                    <div className="w-72 md:w-60">
                                        <CyberpunkProgressBar
                                            progress={(completedCount / 9) * 100}
                                            color={Math.min((completedCount / 9) * 100, 100) === 100 ? "green" : (completedCount / 9) * 100 > 0 ? "cyan" : "orange"}
                                            hideLabel={true}
                                        />
                                    </div>
                                    <span className="text-sm font-black text-white">{Math.floor((completedCount / 9) * 100)}%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {modules.map((module, index) => {
                        const status = player.moduleStatus[module.id] || "locked";
                        const isLocked = status === "locked";
                        const isCurrent = status === "current";
                        const isCompleted = status === "completed";
                        const isActive = player.moduleStatus[module.id] === "current";
                        const progress = getModuleProgress(module.id);

                        return (
                            <motion.div
                                key={module.id}
                                {...cardMotion(index)}
                                className="relative"
                            >
                                <motion.div
                                    initial={{ top: "0%" }}
                                    whileInView={{ top: "100%" }}
                                    transition={{
                                        duration: 6,
                                        repeat: Infinity,
                                        ease: "linear",
                                    }}
                                    viewport={{ once: false }}
                                    className="absolute left-0 right-0 h-0.5 bg-cyan-500/30 blur-sm pointer-events-none"
                                />

                                {isLocked ? (
                                    <CyberpunkLock
                                        module={module}
                                        status={status}
                                        isLocked={isLocked}
                                        isCurrent={isCurrent}
                                        isCompleted={isCompleted}
                                        isActive={isActive}
                                        progress={progress}
                                    />
                                ) : (
                                    <CyberpunkCard
                                        module={module}
                                        status={status}
                                        isLocked={isLocked}
                                        isCurrent={isCurrent}
                                        isCompleted={isCompleted}
                                        isActive={isActive}
                                        progress={progress}
                                        handleModuleSelect={handleModuleSelect}
                                    />
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
