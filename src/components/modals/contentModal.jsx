import { useSound } from "@/hook/useSound";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Play } from "lucide-react";
import { ModuleContentPanel } from "@/view/module-content-panel";

export const ContentModal = ({ open, onOpenChange }) => {
    const { playClick, playClose } = useSound();
    const handleCloseModal = (open) => {
        if (!open) {
            playClose();
            onOpenChange(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleCloseModal}>
            <DialogContent className="w-full md:min-w-6xl p-0 overflow-hidden border-none shadow-none ring-0 bg-transparent">
                <div className="relative bg-slate-950/98">
                    <div className="pointer-events-none absolute inset-0 z-30 opacity-[0.02] bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,255,255,0.1)_2px,rgba(0,255,255,0.1)_4px)]" />
                    <div className="absolute inset-0 border border-cyan-400/30" />
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-400" />
                    <div className="absolute top-0 left-6 w-4 h-[2px] bg-cyan-400" />
                    <div className="absolute top-6 left-0 w-[2px] h-4 bg-cyan-400" />

                    <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-cyan-400" />
                    <div className="absolute top-0 right-6 w-4 h-[2px] bg-cyan-400" />
                    <div className="absolute top-6 right-0 w-[2px] h-4 bg-cyan-400" />

                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-cyan-400" />
                    <div className="absolute bottom-0 left-6 w-4 h-[2px] bg-cyan-400" />
                    <div className="absolute bottom-6 left-0 w-[2px] h-4 bg-cyan-400" />

                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-400" />
                    <div className="absolute bottom-0 right-6 w-4 h-[2px] bg-cyan-400" />
                    <div className="absolute bottom-6 right-0 w-[2px] h-4 bg-cyan-400" />

                    <div className="relative z-10 flex flex-col w-full h-full">
                        <ModuleContentPanel />

                    </div>

                    <div className="absolute bottom-0 left-8 right-8 h-0.5 bg-cyan-400/30" />
                </div>
            </DialogContent>
        </Dialog>
    );
};
