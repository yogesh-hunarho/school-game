import { useEffect } from "react";
import { useParams, useNavigate, useBlocker } from "react-router-dom";
import { useLMSStore } from "@/store/lms-store";
import { ModuleContentPanel } from "./module-content-panel";
import { VideoModal } from "@/components/modals/VideoModal";
import { QuizModal } from "@/components/modals/QuizModal";
import { MissionTransitionModal } from "@/components/modals/MissionTransitionModal";
import ConfettiEffect from "@/components/ConfettiEffect";
import { ModuleUnlockAnimation } from "@/components/ModuleUnlockAnimation";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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
            openContentPanel();
        }
    }, [moduleId, openContentPanel]);

    const handleBack = () => {
        navigate(-1);
    };

    const moduleStatus = player.moduleStatus[moduleId || ""] || "locked";
    const isLocked = moduleStatus === "locked";

    const progress = useLMSStore((state) => state.getModuleProgress(moduleId));
    const isComplete = progress === 100;

    // Block navigation if not complete
    const blocker = useBlocker(
        ({ currentLocation, nextLocation }) =>
            !isComplete && currentLocation.pathname !== nextLocation.pathname
    );


    if (isLocked) {
        // Optional: Redirect back if locked and someone tries to force access via URL
        // useEffect(() => { navigate('/'); }, []);
    }

    return (
        <div className="pt-5 max-w-7xl min-h-screen  overflow-hidden pb-20 mx-auto mt-20">
            <button
                onClick={handleBack}
                className="mb-4 flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors uppercase font-bold tracking-widest text-xs"
            >
                <ArrowLeft className="w-4 h-4" />
                Back to Missions
            </button>

            <div className=" overflow-hidden border border-cyan-400/20 mb-2">
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

            {/* Navigation Guard Alert Dialog */}
            <AlertDialog open={blocker.state === "blocked"}>
                <AlertDialogContent className="border-cyan-400/30 rounded-none bg-slate-900 text-white animate-shake">
                    <AlertDialogHeader className="text-mono">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="p-2 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                                <AlertTriangle className="h-5 w-5 text-amber-500" />
                            </div>
                            <AlertDialogTitle className="text-xl font-bold font-mono uppercase text-amber-400">
                                Mission Incomplete
                            </AlertDialogTitle>
                        </div>
                        <AlertDialogDescription className="text-slate-300 text-sm font-mono">
                            You haven't completed all the videos and quizzes in this mission yet. {progress}% completed so far.
                            Are you sure you want to leave?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="mt-4 gap-3 font-mono">
                        <AlertDialogCancel
                            onClick={() => blocker.reset()}
                            className="bg-slate-800 rounded-none border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white uppercase text-xs font-bold tracking-widest"
                        >
                            Keep Learning
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => blocker.proceed()}
                            variant="destructive"
                            className="bg-green-500 rounded-none text-white hover:bg-green-600 uppercase text-xs font-bold tracking-widest"
                        >
                            Leave Mission
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default ModuleDetailsPage;
