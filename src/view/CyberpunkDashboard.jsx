import { useState } from "react";
import { useLMSStore } from "@/store/lms-store";
import { modules } from "@/store/level-canvas-config";
import { ModuleContentPanel } from "./module-content-panel";
import { cn } from "@/lib/utils";
import { Lock, Star, Sparkles, CheckCircle2, Zap } from "lucide-react";
import GlassSurface from "@/components/GlassSurface";
import { VideoModal } from "@/components/modals/VideoModal";
import { QuizModal } from "@/components/modals/QuizModal";
import { motion } from "framer-motion";
import { useSound } from "@/hook/useSound";
import { CyberpunkCard } from "@/components/cyberpunk-card";

export const CyberpunkDashboard = () => {
    const { player, getModuleProgress, openContentPanel } = useLMSStore();
    const { playClick } = useSound();

    // Calculate completed count
    const completedCount = Object.values(player.moduleStatus).filter((s) => s === "completed").length;

    const handleModuleSelect = (moduleId) => {
        playClick();
        useLMSStore.setState((state) => ({
            player: {
                ...state.player,
                currentModuleId: moduleId,
            },
        }));
        openContentPanel();
    };

    return (
        <div className="relative w-full h-full flex flex-col p-4 gap-4 ">
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-0">
                <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-4 overflow-hidden">
                    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 pb-4 px-2 mt-3">
                            {modules.map((module) => {
                                const status = player.moduleStatus[module.id] || "locked";
                                const isLocked = status === "locked";
                                const isCurrent = status === "current";
                                const isCompleted = status === "completed";
                                const isActive = player.currentModuleId === module.id;
                                const progress = getModuleProgress(module.id);

                                return (
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
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-4 overflow-hidden h-fit mt-3">
                    <div className="flex-1 rounded-sm border border-cyan-500/20 bg-slate-950/80 shadow-xl shadow-cyan-500/5 backdrop-blur-sm overflow-hidden flex flex-col">
                        <ModuleContentPanel />
                    </div>
                </div>
            </div>

            {/* Modals */}
            <VideoModal
                open={useLMSStore((state) => state.isVideoModalOpen)}
                onOpenChange={(open) => !open && useLMSStore.getState().closeVideoModal()}
            />
            <QuizModal
                open={useLMSStore((state) => state.isQuizModalOpen)}
                onOpenChange={(open) => !open && useLMSStore.getState().closeQuizModal()}
            />
        </div>
    );
};
