import { useNavigate } from "react-router-dom";
import { useLMSStore } from "@/store/lms-store";
import { modules } from "@/store/level-canvas-config";
import { CyberpunkCard } from "@/components/cyberpunk-card";
import { useIsMobile } from "@/hook/use-mobile";
import { motion } from "framer-motion";
import { CyberpunkLock } from "@/components/ui/cyber-component/cyber-punk.cardlock";
import CyberpunkProgressBar from "@/components/ui/cyber-component/cyberpunk-progress-bar";

export const CyberpunkDashboard = () => {
    const { player, getModuleProgress } = useLMSStore();
    const navigate = useNavigate();
    const isMobile = useIsMobile()

    // Calculate completed count
    const completedCount = Object.values(player.moduleStatus).filter((s) => s === "completed").length;

    const handleModuleSelect = (moduleId) => {

        const status = player.moduleStatus[moduleId] || "locked";
        if (status === "locked") return;

        navigate(`/module/${moduleId}`);
    };

    return (
        <div className="relative min-h-screen  overflow-hidden pt-10 pb-20">
            {/* Cyberpunk Global Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Horizontal Scanline */}
                <motion.div
                    animate={{ top: ["0%", "100%"] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 right-0 h-1 bg-cyan-500/20 blur-sm z-0"
                />

                {/* Data Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

                {/* Deep background glows */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 blur-[120px] rounded-full" />
            </div>

            <div className="relative xl:max-w-7xl lg:max-w-6xl md:max-w-5xl max-w-4xl mx-auto flex flex-col p-4 gap-8">
                {/* Header with Tech Ornaments */}
                <div className="relative">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-cyan-500/30 pb-6 transition-all">
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <div className="w-2 h-6 bg-cyan-500 shadow-[0_0_10px_#06b6d4]" />
                                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic">
                                    Mission <span className="text-cyan-400">Control</span>
                                </h1>
                            </div>
                            <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.4em] text-slate-500 ml-5">
                                <span className="w-1 h-1 bg-slate-700 rounded-full" />
                                <span>Protocol: Grade_6</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 bg-slate-900/50 backdrop-blur-md border border-white/5 p-4 rounded-sm">
                            <div className="flex flex-col items-end px-4 border-r border-white/10">
                                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Completed</span>
                                <span className="text-2xl font-black text-emerald-400">{completedCount}<span className="text-xs text-slate-600 italic ml-1">/9</span></span>
                            </div>
                            <div className="flex flex-col items-end px-4">
                                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Overall_Progress</span>
                                <div className="flex items-center gap-3 mt-1">
                                    <div className="w-60">
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {modules.map((module) => {
                        const status = player.moduleStatus[module.id] || "locked";
                        const isLocked = status === "locked";
                        const isCurrent = status === "current";
                        const isCompleted = status === "completed";
                        const isActive = player.currentModuleId === module.id;
                        const progress = getModuleProgress(module.id);

                        return (
                            <>{
                                isLocked ? (
                                    <CyberpunkLock
                                        key={module.id}
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
                                        key={module.id}
                                        module={module}
                                        status={status}
                                        isLocked={isLocked}
                                        isCurrent={isCurrent}
                                        isCompleted={isCompleted}
                                        isActive={isActive}
                                        progress={progress}
                                        handleModuleSelect={handleModuleSelect}
                                    />
                                )
                            }
                            </>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
