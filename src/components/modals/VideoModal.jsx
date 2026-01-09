import { motion } from "framer-motion";
import { Play, FileText, MessageSquare, CheckCircle, Info, ChevronLeft, ChevronRight, XIcon, Download } from "lucide-react";
import { useLMSStore } from "@/store/lms-store";
import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { useSound } from "@/hook/useSound";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import VideoPlayer from "../video/VideoPlayer";
import { useIsMobile } from "@/hook/use-mobile";
import HeaderCoin from "../HeaderCoin";

export const VideoModal = ({ open, onOpenChange }) => {
    const {
        selectedVideo,
        markVideoWatched,
        player,
        isVideoWatched,
        getCurrentModuleContent,
        openVideoModal,
        toggleVideoQuizConfetti
    } = useLMSStore();
    const triggerStarAnimation = useLMSStore((s) => s.triggerStarAnimation);
    const isMobile = useIsMobile()

    const [activeTab, setActiveTab] = useState("about");
    const { playClick, playClose, playSound } = useSound();

    // Get all videos in current module
    const moduleContent = getCurrentModuleContent();
    const videos = moduleContent.videos || [];

    // Find current video index
    const currentIndex = useMemo(() => {
        if (!selectedVideo) return -1;
        return videos.findIndex(v => v.id === selectedVideo.id);
    }, [selectedVideo, videos]);

    const hasPrev = currentIndex > 0;
    const hasNext = currentIndex < videos.length - 1;

    if (!selectedVideo) return null;

    const isWatched = isVideoWatched(player.currentModuleId, selectedVideo.id);

    const handleMarkWatched = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        playSound("success");
        // toggleVideoQuizConfetti(true)
        // setTimeout(() => {
        //     toggleVideoQuizConfetti(false);
        // }, 3000);

        triggerStarAnimation(
            {
                x: rect.left + rect.width / 2,
                y: (rect.top - 30) + rect.height / 2,
            },
            selectedVideo.xp
        );
        markVideoWatched(player.currentModuleId, selectedVideo.id);
    };

    const handleCloseModal = (open) => {
        if (!open) {
            playClose();
            onOpenChange(false);
        }
    };

    const handlePrev = () => {
        if (hasPrev) {
            playClick();
            openVideoModal(videos[currentIndex - 1]);
        }
    };

    const handleNext = () => {
        if (hasNext) {
            playClick();
            openVideoModal(videos[currentIndex + 1]);
        }
    };

    const tabs = [
        { id: "about", label: "DETAILS", icon: Info },
        { id: "resources", label: "FILES", icon: FileText },
        // { id: "comments", label: "COMMS", icon: MessageSquare },
    ];

    return (
        <Dialog open={open} onOpenChange={handleCloseModal}>
            <DialogContent showCloseButton={isMobile ? true : false} className="w-full md:min-w-6xl p-0 overflow-hidden border-none shadow-none ring-0 bg-transparent">
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
                        <DialogHeader className="flex flex-col md:flex-row items-center justify-between p-4 border-b border-cyan-400/20 space-y-0">
                            <DialogTitle className="text-lg w-full md:w-auto font-bold text-cyan-50 flex items-center gap-3 uppercase tracking-wide">
                                <div className="relative">
                                    <div className="w-8 h-8 bg-cyan-400/20 flex items-center justify-center">
                                        <Play className="w-4 h-4 text-cyan-400" />
                                    </div>
                                    <div className="absolute -top-0.5 -left-0.5 w-1.5 h-1.5 border-t border-l border-cyan-400" />
                                    <div className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 border-b border-r border-cyan-400" />
                                </div>
                                <div className="flex flex-col">
                                    <span>{selectedVideo.title}</span>
                                    <span className="text-[10px] text-slate-500 font-mono">
                                        {currentIndex + 1} / {videos.length} STREAMS
                                    </span>
                                </div>
                            </DialogTitle>

                            <div className="flex items-center gap-2 w-full md:w-auto md:right-0">
                                <button
                                    onClick={handlePrev}
                                    disabled={!hasPrev}
                                    className={cn(
                                        "relative flex items-center gap-1 px-3 py-2 text-[10px] font-bold uppercase tracking-widest transition-all",
                                        hasPrev
                                            ? "bg-cyan-400/10 border border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/20"
                                            : "bg-slate-800/50 border border-slate-700 text-slate-600 cursor-not-allowed"
                                    )}
                                >
                                    <ChevronLeft className="w-3.5 h-3.5" />
                                    PREV
                                </button>
                                <button
                                    onClick={handleNext}
                                    disabled={!hasNext}
                                    className={cn(
                                        "relative flex items-center gap-1 px-3 py-2 text-[10px] font-bold uppercase tracking-widest transition-all",
                                        hasNext
                                            ? "bg-cyan-400/10 border border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/20"
                                            : "bg-slate-800/50 border border-slate-700 text-slate-600 cursor-not-allowed"
                                    )}
                                >
                                    NEXT
                                    <ChevronRight className="w-3.5 h-3.5" />
                                </button>
                                {!isMobile &&
                                    <DialogClose
                                        className="z-50 p-[8px] text-slate-400 hover:text-cyan-400 transition-colors bg-slate-900/80 border border-cyan-400/30 hover:border-cyan-400 cursor-pointer"
                                    >
                                        <XIcon className="w-4 h-4" />
                                        <span className="sr-only">Close</span>
                                    </DialogClose>}
                            </div>
                        </DialogHeader>

                        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                            <div className="w-full md:w-2/3 flex flex-col p-4 border-r border-cyan-400/20">
                                <div className="w-full max-w-full">
                                    <VideoPlayer
                                        src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
                                    />
                                </div>

                                <div className="mt-4 flex gap-2 items-center justify-end">
                                    <HeaderCoin size={24} />
                                    {selectedVideo.xp} coins
                                    <button
                                        onClick={handleMarkWatched}
                                        disabled={isWatched}
                                        className={cn(
                                            "relative flex items-center gap-2 px-6 py-2.5 font-bold text-xs uppercase tracking-widest transition-all",
                                            isWatched
                                                ? "bg-emerald-400/10 border border-emerald-400 text-emerald-400 cursor-default"
                                                : "bg-yellow-400 text-slate-900 hover:bg-yellow-300 shadow-[0_0_20px_rgba(250,204,21,0.3)]"
                                        )}
                                    >
                                        {/* Button corners */}
                                        <div className={cn(
                                            "absolute top-0 left-0 w-1.5 h-1.5 border-t border-l",
                                            isWatched ? "border-emerald-400" : "border-slate-900"
                                        )} />
                                        <div className={cn(
                                            "absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r",
                                            isWatched ? "border-emerald-400" : "border-slate-900"
                                        )} />

                                        {isWatched ? (
                                            <>
                                                <CheckCircle className="w-3.5 h-3.5" />
                                                SYNCED
                                            </>
                                        ) : (
                                            "MARK COMPLETE"
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Info/Tabs Section */}
                            <div className="w-full md:w-1/3 flex flex-col bg-slate-900/50">
                                {/* Tabs */}
                                <div className="flex border-b border-cyan-400/20">
                                    {tabs.map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={cn(
                                                "flex-1 py-3 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-1.5 transition-colors relative",
                                                activeTab === tab.id
                                                    ? "text-yellow-400"
                                                    : "text-slate-500 hover:text-slate-300"
                                            )}
                                        >
                                            <tab.icon className="w-3.5 h-3.5" />
                                            {tab.label}
                                            {activeTab === tab.id && (
                                                <motion.div
                                                    layoutId="activeTabVideo"
                                                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-yellow-400"
                                                />
                                            )}
                                        </button>
                                    ))}
                                </div>

                                {/* Tab Content */}
                                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                                    {activeTab === "about" && (
                                        <div className="space-y-4">
                                            <div>
                                                <h4 className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-2">DESCRIPTION</h4>
                                                <p className="text-xs font-mono text-white leading-relaxed">
                                                    Learn about the core concepts presented in this module.
                                                    This video covers the fundamental principles and provides examples
                                                    to help you understand the topic better.
                                                </p>
                                            </div>
                                            <div>
                                                <h4 className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-2">KEY TAKEAWAYS</h4>
                                                <div className="space-y-2 font-mono text-white">
                                                    {["Understanding the basics", "Real-world applications", "Problem-solving techniques"].map((item, i) => (
                                                        <div key={i} className="flex items-center gap-2 text-xs ">
                                                            <div className="w-1 h-1 bg-cyan-400" />
                                                            {item}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === "resources" && (
                                        <div className="space-y-3">
                                            {[
                                                { name: "Lecture Notes.pdf", size: "2.4 MB", type: "PDF", color: "cyan" },
                                                { name: "Worksheet.docx", size: "1.1 MB", type: "DOC", color: "yellow" },
                                            ].map((file, i) => (
                                                <div key={i} className="relative p-3 border border-cyan-400/20 bg-slate-900/60 hover:border-cyan-400/50 transition-colors cursor-pointer group">
                                                    <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-cyan-400/50 group-hover:border-cyan-400" />
                                                    <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-cyan-400/50 group-hover:border-cyan-400" />
                                                    <div className="flex items-center gap-3">
                                                        <div className={cn(
                                                            "w-7 h-7 flex items-center justify-center text-[10px] font-bold",
                                                            file.color === "cyan" ? "bg-cyan-400/20 text-cyan-400" : "bg-yellow-400/20 text-yellow-400"
                                                        )}>
                                                            <FileText className="w-3.5 h-3.5" />
                                                        </div>
                                                        <div className="flex justify-between gap-3 w-full items-center">
                                                            <div>
                                                                <p className="text-xs text-cyan-50 group-hover:text-cyan-400 transition-colors uppercase">{file.name}</p>
                                                                <p className="text-[10px] text-slate-500 font-mono">{file.size} • {file.type}</p>
                                                            </div>
                                                            <div>
                                                                <Download className="w-3.5 h-3.5" />
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* {activeTab === "comments" && (
                                        <div className="flex flex-col items-center justify-center h-full text-center py-8">
                                            <div className="w-12 h-12 border border-cyan-400/30 flex items-center justify-center mb-3">
                                                <MessageSquare className="w-5 h-5 text-slate-500" />
                                            </div>
                                            <p className="text-[11px] text-slate-500 uppercase tracking-wider">
                                                NO TRANSMISSIONS YET
                                            </p>
                                            <p className="text-[10px] text-slate-600 mt-1">
                                                Be the first to broadcast
                                            </p>
                                        </div>
                                    )} */}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="absolute bottom-0 left-8 right-8 h-0.5 bg-cyan-400/30" />
                </div>
            </DialogContent>
        </Dialog>
    );
};
