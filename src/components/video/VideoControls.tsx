import { formatTime } from "@/lib/utils";
import { Play, Pause, Maximize, Minimize, RotateCcw, RotateCw } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function VideoControls({
    isPlaying,
    togglePlay,
    currentTime,
    duration,
    seek,
    showSkipButtons = true,
    isFullscreen,
    toggleFullscreen,
}: any) {
    const [rotateBack, setRotateBack] = useState(0);
    const [rotateForward, setRotateForward] = useState(0);

    const handleBack = () => {
        seek(Math.max(0, currentTime - 10));
        setRotateBack((r) => r - 360);
    };

    const handleForward = () => {
        seek(Math.min(duration, currentTime + 10));
        setRotateForward((r) => r + 360);
    };
    const handleSeekFromBar = (
        e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
    ) => {
        const rect = e.currentTarget.getBoundingClientRect();

        const clientX =
            "touches" in e ? e.touches[0].clientX : e.clientX;

        const percent = Math.min(
            Math.max((clientX - rect.left) / rect.width, 0),
            1
        );

        seek(percent * duration);
    };

    return (
        <>
            <div className="absolute bottom-0 left-0 right-0 w-full p-4 bg-black/70">
                <div
                    className="w-full h-2 bg-white/30 rounded cursor-pointer relative"
                    onClick={handleSeekFromBar}
                    onTouchStart={handleSeekFromBar}
                >
                    <div
                        className="absolute left-0 top-0 h-full bg-red-500 rounded"
                        style={{ width: `${(currentTime / duration) * 100}%` }}
                    />
                </div>
                <div className="flex w-full justify-between items-center gap-3 mt-2">
                    <div className="flex items-center gap-3">
                        {showSkipButtons && (
                            <button onClick={handleBack} className="text-white cursor-pointer">
                                <motion.div
                                    animate={{ rotate: rotateBack }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                >
                                    <RotateCcw />
                                </motion.div>
                            </button>
                        )}

                        <button onClick={togglePlay}>
                            {isPlaying ? <Pause /> : <Play />}
                        </button>

                        {showSkipButtons && (
                            <button onClick={handleForward} className="text-white cursor-pointer">
                                <motion.div
                                    animate={{ rotate: rotateForward }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                >
                                    <RotateCw />
                                </motion.div>
                            </button>
                        )}

                        <span className="text-sm text-white">
                            {formatTime(currentTime)} / {formatTime(duration)}
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <button onClick={toggleFullscreen} className="text-white cursor-pointer">
                            {isFullscreen ? <Minimize /> : <Maximize />}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
