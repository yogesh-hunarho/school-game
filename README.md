# React + TypeScript + Vite + shadcn/ui

This is a template for a new Vite project with React, TypeScript, and shadcn/ui.


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
import { CyberpunkCourseCard } from "@/components/cyberpunk-course-card";
import { ContentModal } from "@/components/modals/contentModal";

export const CyberpunkDashboard = () => {
    const { player, getModuleProgress, openContentPanel, showContentPanel, toggleContentPanel } = useLMSStore();
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
            {/* <CyberpunkCourseCard
                title="Grade 6 Design Thinking, Financial Literacy & Artificial Intelligence"
                description="Get ready to build, create, and solve real problems! In this course, you'll work on 7 awesome projects that use what you learn in maths and science. You'll master three powerful skills: Design Thinking to invent cool solutions, Financial Literacy to become smart with money, and Artificial Intelligence to explore the world of smart tech. It's a fun blend of academic learning and 21st-century skills."
                hours="45 Hours"
                tooltipTxt={"(15 Artificial Intelligence + 15 Design Thinking + 15 Financial Literacy)"}
                lessons={39}
                quizzes={16}
                imageUrl="https://picsum.photos/seed/picsum/200/300"
            /> */}

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-0 gap-4 p-2">
                {/* lg:col-span-7 xl:col-span-8 flex flex-col gap-4 overflow-hidden */}
                <div className="lg:col-span-12 xl:col-span-12 flex flex-col gap-4 overflow-hidden">
                    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6 pb-4 mt-3">
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

                {/* <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-4 overflow-hidden h-fit mt-3">
                    <div className="flex-1 border border-cyan-500/20 bg-slate-950/80 shadow-xl shadow-cyan-500/5 backdrop-blur-sm overflow-hidden flex flex-col">
                        <ModuleContentPanel />
                    </div>
                </div> */}
            </div>



            {/* Modals */}
            <ContentModal
                open={showContentPanel}
                onOpenChange={toggleContentPanel}
            />
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
