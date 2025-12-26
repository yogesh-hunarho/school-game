import { motion } from "framer-motion";
import { Play, FileText, MessageSquare, CheckCircle, Info } from "lucide-react";
import { useLMSStore } from "@/store/lms-store";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useSound } from "@/hook/useSound";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export const VideoModal = ({ open, onOpenChange }) => {
    const {
        selectedVideo,
        markVideoWatched,
        player,
        isVideoWatched
    } = useLMSStore();

    const [activeTab, setActiveTab] = useState("about");
    const { playClick, playClose } = useSound();

    if (!selectedVideo) return null;

    const isWatched = isVideoWatched(player.currentModuleId, selectedVideo.id);

    const handleMarkWatched = () => {
        playClick();
        markVideoWatched(player.currentModuleId, selectedVideo.id);
    };

    const handleCloseModal = (open) => {
        if (!open) {
            playClose();
            onOpenChange(false);
        }
    };

    const tabs = [
        { id: "about", label: "About", icon: Info },
        { id: "resources", label: "Resources", icon: FileText },
        { id: "comments", label: "Comments", icon: MessageSquare },
    ];

    return (
        <Dialog open={open} onOpenChange={handleCloseModal}>
            <DialogContent className="min-w-6xl p-0 overflow-hidden border-none shadow-none ring-0">
                <div className="flex flex-col w-full h-full bg-slate-950/50">
                    <DialogHeader className="flex flex-row items-center justify-between p-4 border-b border-white/10 space-y-0">
                        <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
                            <Play className="w-5 h-5 text-cyan-400" />
                            {selectedVideo.title}
                        </DialogTitle>
                    </DialogHeader>

                    <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                        {/* Video Section */}
                        <div className="w-full md:w-2/3 bg-black/40 flex flex-col p-4 border-r border-white/10">
                            <div className="aspect-video bg-slate-900 rounded-xl flex items-center justify-center border border-white/10 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-linear-to-br from-indigo-900/20 to-cyan-900/20" />
                                <Play className="w-16 h-16 text-white/20 group-hover:text-cyan-400 transition-colors duration-500" />
                                <p className="absolute bottom-4 text-white/40 text-sm">Video Player Placeholder</p>
                            </div>

                            <div className="mt-4 flex items-center justify-between">
                                <div className="text-sm text-white/60">
                                    Duration: <span className="text-white">{selectedVideo.duration}</span>
                                </div>

                                <button
                                    onClick={handleMarkWatched}
                                    disabled={isWatched}
                                    className={cn(
                                        "flex items-center gap-2 px-6 py-2 rounded-lg font-semibold transition-all shadow-lg",
                                        isWatched
                                            ? "bg-green-500/20 text-green-400 cursor-default border border-green-500/50"
                                            : "bg-cyan-500 hover:bg-cyan-400 text-black border border-cyan-400/50 hover:shadow-cyan-500/25"
                                    )}
                                >
                                    {isWatched ? (
                                        <>
                                            <CheckCircle className="w-4 h-4" />
                                            Completed
                                        </>
                                    ) : (
                                        "Mark as Viewed"
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Info/Tabs Section */}
                        <div className="w-full md:w-1/3 flex flex-col bg-slate-900/30">
                            {/* Tabs */}
                            <div className="flex border-b border-white/10">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={cn(
                                            "flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors relative",
                                            activeTab === tab.id
                                                ? "text-cyan-400"
                                                : "text-white/40 hover:text-white/70"
                                        )}
                                    >
                                        <tab.icon className="w-4 h-4" />
                                        {tab.label}
                                        {activeTab === tab.id && (
                                            <motion.div
                                                layoutId="activeTabVideo"
                                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400"
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
                                            <h4 className="text-white font-medium mb-2">Description</h4>
                                            <p className="text-sm text-white/60 leading-relaxed">
                                                Learn about the core concepts presented in this module.
                                                This video covers the fundamental principles and provides examples
                                                to help you understand the topic better.
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="text-white font-medium mb-2">Key Takeaways</h4>
                                            <ul className="list-disc pl-5 space-y-1 text-sm text-white/60">
                                                <li>Understanding the basics</li>
                                                <li>Real-world applications</li>
                                                <li>Problem-solving techniques</li>
                                            </ul>
                                        </div>
                                    </div>
                                )}

                                {activeTab === "resources" && (
                                    <div className="space-y-3">
                                        <div className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-400/30 transition-colors cursor-pointer group">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
                                                    <FileText className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <p className="text-sm text-white group-hover:text-cyan-400">Lecture Notes.pdf</p>
                                                    <p className="text-xs text-white/40">2.4 MB • PDF</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-400/30 transition-colors cursor-pointer group">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400">
                                                    <FileText className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <p className="text-sm text-white group-hover:text-cyan-400">Worksheet.docx</p>
                                                    <p className="text-xs text-white/40">1.1 MB • Word</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === "comments" && (
                                    <div className="space-y-4">
                                        <p className="text-sm text-white/40 text-center py-4">
                                            No comments yet. Be the first to start the discussion!
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
