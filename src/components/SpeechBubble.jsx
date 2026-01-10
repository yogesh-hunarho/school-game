import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, X } from 'lucide-react';

/**
 * SpeechBubble Component
 * Cyberpunk-styled speech bubble with typewriter effect
 */
export const SpeechBubble = ({
    text,
    onClose,
    onComplete,
    showControls = true,
    isSpeaking = false,
    onToggleSound
}) => {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTypingComplete, setIsTypingComplete] = useState(false);

    // Typewriter effect
    useEffect(() => {
        if (currentIndex < text.length) {
            const timer = setTimeout(() => {
                setDisplayedText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, 30); // Typing speed

            return () => clearTimeout(timer);
        } else {
            setIsTypingComplete(true);
            onComplete?.();
        }
    }, [currentIndex, text, onComplete]);

    // Skip typing animation
    const handleSkipTyping = () => {
        setDisplayedText(text);
        setCurrentIndex(text.length);
        setIsTypingComplete(true);
        onComplete?.();
    };

    return (
        <motion.div
            className="relative bg-black/90 border-2 border-cyan-500 rounded-lg p-4 shadow-2xl"
            style={{
                boxShadow: '0 0 20px rgba(0, 255, 255, 0.5), inset 0 0 20px rgba(0, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
        >
            {/* Corner brackets - cyberpunk aesthetic */}
            <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-cyan-400"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-cyan-400"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-cyan-400"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-cyan-400"></div>

            {/* Scanline effect */}
            <div
                className="absolute inset-0 pointer-events-none opacity-10"
                style={{
                    background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 255, 0.5) 2px, rgba(0, 255, 255, 0.5) 4px)'
                }}
            ></div>

            {/* Text content */}
            <div className="relative z-10 text-cyan-100 font-mono text-sm leading-relaxed">
                {displayedText}
                {!isTypingComplete && (
                    <span className="typewriter-cursor text-cyan-400 ml-1">▌</span>
                )}
            </div>

            {/* Controls */}
            {showControls && (
                <div className="flex items-center justify-end gap-2 mt-3 pt-3 border-t border-cyan-500/30">
                    {/* Sound toggle */}
                    <button
                        onClick={onToggleSound}
                        className="p-2 rounded hover:bg-cyan-500/20 transition-colors"
                        title={isSpeaking ? "Mute voice" : "Enable voice"}
                    >
                        {isSpeaking ? (
                            <Volume2 className="w-4 h-4 text-cyan-400" />
                        ) : (
                            <VolumeX className="w-4 h-4 text-gray-500" />
                        )}
                    </button>

                    {/* Skip typing */}
                    {!isTypingComplete && (
                        <button
                            onClick={handleSkipTyping}
                            className="px-3 py-1 text-xs rounded bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-colors"
                        >
                            Skip
                        </button>
                    )}

                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="p-2 rounded hover:bg-red-500/20 transition-colors"
                        title="Close"
                    >
                        <X className="w-4 h-4 text-red-400" />
                    </button>
                </div>
            )}
        </motion.div>
    );
};
