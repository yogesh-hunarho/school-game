import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useLMSStore, moduleOrder, moduleContent } from "@/store/lms-store";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, ArrowRight, Terminal } from "lucide-react";
import CyberpunkButton from "../ui/cyber-button";

export const MissionTransitionModal = () => {
    const {
        showMissionTransition,
        closeMissionTransition,
        lastCompletedModuleId,
        player
    } = useLMSStore();
    const navigate = useNavigate();

    // Typewriter state
    const [displayedText, setDisplayedText] = useState("");
    const [isTypingComplete, setIsTypingComplete] = useState(false);

    // Get module completion details
    const currentModuleId = lastCompletedModuleId || player.currentModuleId;
    const currentModule = moduleContent[currentModuleId];

    // Use the explicit nextModule data
    const nextModuleData = currentModule?.nextModule;
    const nextModuleId = nextModuleData?.moduleId;

    // Determine current mission number (for display only)
    const currentModuleIndex = moduleOrder.indexOf(currentModuleId);

    // Reset state when modal opens
    useEffect(() => {
        if (showMissionTransition && nextModuleData) {
            setDisplayedText("");
            setIsTypingComplete(false);

            // Construct cinematic text using the new data
            const description = nextModuleData.description || "Classified Operation";
            const fullText = `MISSION COMPLETE: ${currentModule?.title || 'Unknown Mission'}\n DATA SYNC: 100%\n\nESTABLISHING SECURE LINK TO NEXT Mission...\nTARGET: ${nextModuleData.title.toUpperCase()}\nOBJECTIVE: ${description}\n\nACCESS GRANTED. STANDBY FOR TRANSFER.`;

            let currentIndex = 0;
            const typingInterval = setInterval(() => {
                if (currentIndex < fullText.length) {
                    const char = fullText[currentIndex] ?? "";
                    setDisplayedText(prev => prev + char);
                    currentIndex++;
                } else {
                    clearInterval(typingInterval);
                    setIsTypingComplete(true);
                }
            }, 30);

            return () => clearInterval(typingInterval);
        }
    }, [showMissionTransition, currentModuleId, nextModuleData, currentModule]);

    const handleAccessNext = () => {
        closeMissionTransition();
        if (nextModuleId) {
            navigate(`/mission/${nextModuleId}`);
        }
    };

    if (!showMissionTransition) return null;

    if (!nextModuleData) {
        return (
            <div className="fixed inset-0 z-210 flex items-center justify-center bg-black/90 text-red-500 font-mono p-10">
                <div className="border border-red-500 p-6 bg-red-900/20">
                    <h2 className="text-xl font-bold mb-4">SYSTEM ERROR: NAVIGATION DATA CORRUPTED</h2>
                    <p>Current Module ID: {currentModuleId || "NULL"}</p>
                    <p>Module Content Found: {currentModule ? "YES" : "NO"}</p>
                    <p>Next Module Data: MISSING</p>
                    <pre className="mt-4 text-xs text-slate-400">
                        {JSON.stringify(currentModule || {}, null, 2)}
                    </pre>
                    <button
                        onClick={closeMissionTransition}
                        className="mt-6 px-4 py-2 bg-red-500 text-black font-bold uppercase"
                    >
                        Close System
                    </button>
                </div>
            </div>
        );
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-210 flex items-center justify-center bg-transparent/10 backdrop-blur-xl p-4"
            >
                <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="relative md:h-full bg-slate-900/50 border border-cyan-500/30 p-8 flex flex-col justify-between overflow-hidden">
                        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#0891b2_1px,transparent_1px),linear-gradient(to_bottom,#0891b2_1px,transparent_1px)] bg-size-[24px_24px]" />
                        <div className="relative z-10 flex items-center justify-between h-full">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                                className="flex flex-col items-center gap-2"
                            >
                                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center">
                                    <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                                </div>
                                <span className="text-xs font-mono text-emerald-500 uppercase">Mission {currentModuleIndex + 1}</span>
                            </motion.div>
                            <div className="flex-1 h-0.5 bg-slate-700 mx-4 relative overflow-hidden">
                                <motion.div
                                    className="absolute inset-0 bg-cyan-400"
                                    initial={{ x: "-100%" }}
                                    animate={{ x: "100%" }}
                                    transition={{ duration: 1.5, delay: 1, repeat: Infinity, ease: "linear" }}
                                />
                            </div>
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.8 }}
                                className="flex flex-col items-center gap-2"
                            >
                                <div className="w-20 h-20 rounded-full bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.5)]">
                                    <span className="text-3xl animate-pulse">{nextModuleData.icon || "🚀"}</span>
                                </div>
                                <span className="text-sm font-bold font-mono text-cyan-400 uppercase text-center">{nextModuleData.title}</span>
                            </motion.div>
                        </div>
                    </div>

                    {/* Right Side: Terminal Output */}
                    <div className="flex flex-col gap-6">
                        <div className="bg-black/80 border border-green-500/30 p-6 font-mono text-green-500 h-auto overflow-y-auto relative">
                            {/* Terminal Header */}
                            <div className="absolute top-0 left-0 right-0 h-6 bg-green-500/10 border-b border-green-500/20 flex items-center px-2 gap-2">
                                <Terminal className="w-3 h-3" />
                                <span className="text-[10px] uppercase opacity-70">System Log</span>
                            </div>

                            {/* Text Content */}
                            <div className="mt-4 whitespace-pre-wrap text-sm leading-relaxed">
                                {displayedText}
                                {!isTypingComplete && (<motion.span
                                    animate={{ opacity: [0, 1, 0] }}
                                    transition={{ repeat: Infinity, duration: 0.8 }}
                                    className="inline-block w-2 h-4 bg-green-500 ml-1 align-middle"
                                >_</motion.span>)}
                            </div>
                        </div>

                        {/* Action Button */}
                        <AnimatePresence>
                            {isTypingComplete && (
                                <CyberpunkButton
                                    onClick={handleAccessNext}
                                    className="w-full"
                                    variant="secondary"
                                >
                                    Access_Next_Mission
                                </CyberpunkButton>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};
