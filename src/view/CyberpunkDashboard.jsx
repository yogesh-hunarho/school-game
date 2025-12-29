import { useNavigate } from "react-router-dom";
import { useLMSStore } from "@/store/lms-store";
import { modules } from "@/store/level-canvas-config";
import { CyberpunkCard } from "@/components/cyberpunk-card";
import { useIsMobile } from "@/hook/use-mobile";

export const CyberpunkDashboard = () => {
    const { player, getModuleProgress } = useLMSStore();
    const navigate = useNavigate();
    const isMobile = useIsMobile()

    // Calculate completed count
    const completedCount = Object.values(player.moduleStatus).filter((s) => s === "completed").length;

    const handleModuleSelect = (moduleId) => {
        // Check if locked is handled in the Card component, but here we perform navigation
        // We can just navigate, the card will block the click if locked (we will implement checks there)
        // Or we check here too for safety.

        const status = player.moduleStatus[moduleId] || "locked";
        if (status === "locked") return;

        navigate(`/module/${moduleId}`);
    };

    return (
        <div className="xl:max-w-7xl lg:max-w-6xl md:max-w-5xl max-w-4xl mx-auto flex flex-col p-4 gap-4 pt-20">
            <h1 className="text-3xl font-bold text-cyan-400 mb-6 font-mono border-b border-cyan-400/30 pb-2">
                MISSION CONTROL
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
    );
};
