import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLMSStore } from "@/store/lms-store";
import { ModuleContentPanel } from "./module-content-panel";
import { VideoModal } from "@/components/modals/VideoModal";
import { QuizModal } from "@/components/modals/QuizModal";
import { MissionTransitionModal } from "@/components/modals/MissionTransitionModal";
import ConfettiEffect from "@/components/ConfettiEffect";
import { ModuleUnlockAnimation } from "@/components/ModuleUnlockAnimation";
import { ArrowLeft } from "lucide-react";

const ModuleDetailsPage = () => {
    const { moduleId } = useParams();
    const navigate = useNavigate();

    // Access store directly since it's a hook
    const { player, openContentPanel } = useLMSStore();

    // Sync URL param with store
    useEffect(() => {
        if (moduleId) {
            useLMSStore.setState((state) => ({
                player: {
                    ...state.player,
                    currentModuleId: moduleId,
                },
            }));
            // Also ensure content panel is "open" logic if needed, though here we are just showing it
            openContentPanel();
        }
    }, [moduleId, openContentPanel]);

    const handleBack = () => {
        navigate(-1);
    };

    // Check if module exists or is locked to potentially redirect? 
    // For now we trust the card lock logic, but good to have a safeguard if user types URL manually.
    const moduleStatus = player.moduleStatus[moduleId || ""] || "locked";
    const isLocked = moduleStatus === "locked";

    if (isLocked) {
        // Optional: Redirect back if locked and someone tries to force access via URL
        // useEffect(() => { navigate('/'); }, []);
    }

    return (
        <div className="p-4 pt-10 max-w-7xl mx-auto">
            <button
                onClick={handleBack}
                className="mb-4 flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors uppercase font-bold tracking-widest text-xs"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Modules
            </button>

            <div className="bg-slate-950/80 overflow-hidden border border-cyan-400/20 shadow-[0_0_50px_rgba(34,211,238,0.1)]">
                <ModuleContentPanel />
            </div>

            <VideoModal
                open={useLMSStore((state) => state.isVideoModalOpen)}
                onOpenChange={(open) => !open && useLMSStore.getState().closeVideoModal()}
            />
            <QuizModal
                open={useLMSStore((state) => state.isQuizModalOpen)}
                onOpenChange={(open) => !open && useLMSStore.getState().closeQuizModal()}
            />

            <ConfettiEffect />
            <ModuleUnlockAnimation />
            <MissionTransitionModal />
        </div>
    );
};

export default ModuleDetailsPage;
