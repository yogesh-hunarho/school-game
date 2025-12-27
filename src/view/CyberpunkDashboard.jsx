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
import { useIsMobile } from "@/hook/use-mobile";

export const CyberpunkDashboard = () => {
    const { player, getModuleProgress, openContentPanel } = useLMSStore();
    const { playClick } = useSound();
    const isMobile = useIsMobile()
    console.log(isMobile)

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
        if (isMobile) {
            window.scrollTo({
                top: document.body.scrollHeight || document.documentElement.scrollHeight,
                behavior: 'smooth',
            });
        }
        openContentPanel();
    };

    return (
        <>
            {/* <div className="p-4 pt-20">
                <CyberpunkCourseCard
                    title="Grade 6 Design Thinking, Financial Literacy & Artificial Intelligence"
                    description="Get ready to build, create, and solve real problems! In this course, you'll work on 7 awesome projects that use what you learn in maths and science. You'll master three powerful skills: Design Thinking to invent cool solutions, Financial Literacy to become smart with money, and Artificial Intelligence to explore the world of smart tech. It's a fun blend of academic learning and 21st-century skills."
                    hours="45 Hours"
                    tooltipTxt={"(15 Artificial Intelligence + 15 Design Thinking + 15 Financial Literacy)"}
                    lessons={39}
                    quizzes={16}
                    imageUrl="https://picsum.photos/seed/picsum/200/300"
                />
            </div> */}
            <div className="xl:max-w-7xl lg:max-w-6xl md:max-w-5xl max-w-4xl mx-auto flex flex-col p-4 gap-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                    <div className="lg:col-span-3 flex flex-col gap-4">
                        <div className="grid grid-cols-1 gap-2 pb-4 mt-3">
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

                    <div className="lg:col-span-9 xl:col-span-9 h-full">
                        <div className="sticky top-20 mt-3 max-h-[calc(100vh-6rem)] overflow-y-auto scrollbar-hide">
                            <div className="bg-slate-950/80 flex flex-col rounded-xl mb-10">
                                <ModuleContentPanel />
                            </div>
                        </div>
                    </div>
                </div>

                <VideoModal
                    open={useLMSStore((state) => state.isVideoModalOpen)}
                    onOpenChange={(open) => !open && useLMSStore.getState().closeVideoModal()}
                />
                <QuizModal
                    open={useLMSStore((state) => state.isQuizModalOpen)}
                    onOpenChange={(open) => !open && useLMSStore.getState().closeQuizModal()}
                />
            </div>

        </>
    );
};
