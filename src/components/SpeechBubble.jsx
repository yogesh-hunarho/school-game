import { useState, useEffect, useRef } from 'react';
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
    showControls = false,
    isSpeaking = false,
    speechRate = 1.0,
    onToggleSound,
    position = 'right',
}) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isTypingComplete, setIsTypingComplete] = useState(false);
    const animationFrameRef = useRef(null);
    const startTimeRef = useRef(null);
    const previousTextRef = useRef('');

    const estimateSpeechDuration = (textLength, rate) => {
        const charsPerSecond = 12.5 * rate;
        return (textLength / charsPerSecond) * 1000; // in milliseconds
    };

    useEffect(() => {
        if (text !== previousTextRef.current) {
            setDisplayedText('');
            setIsTypingComplete(false);
            startTimeRef.current = null;
            previousTextRef.current = text;
        }
    }, [text]);

    // Synced typewriter effect - matches typing to speech duration
    useEffect(() => {
        if (!text || isTypingComplete) return;

        // If not speaking (voice disabled), show text immediately
        if (!isSpeaking) {
            setDisplayedText(text);
            setIsTypingComplete(true);
            onComplete?.();
            return;
        }

        // Calculate timing to sync with speech
        const speechDuration = estimateSpeechDuration(text.length, speechRate);
        const charDelay = speechDuration / text.length;

        let currentIndex = 0;
        startTimeRef.current = performance.now();

        // Safety timeout to ensure typing finishes even if RAF fails or duration is wildly off
        const safetyTimer = setTimeout(() => {
            if (!isTypingComplete) {
                setDisplayedText(text);
                setIsTypingComplete(true);
                onComplete?.();
            }
        }, speechDuration + 2000);

        const animate = (currentTime) => {
            const elapsed = currentTime - startTimeRef.current;
            const targetIndex = Math.min(
                Math.floor(elapsed / charDelay),
                text.length
            );

            if (targetIndex > currentIndex) {
                currentIndex = targetIndex;
                setDisplayedText(text.substring(0, currentIndex));
            }

            if (currentIndex < text.length) {
                animationFrameRef.current = requestAnimationFrame(animate);
            } else {
                setIsTypingComplete(true);
                onComplete?.();
                clearTimeout(safetyTimer);
            }
        };

        animationFrameRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            clearTimeout(safetyTimer);
        };
    }, [text, isSpeaking, speechRate, isTypingComplete, onComplete]);

    // Skip typing animation - show full text immediately
    const handleSkipTyping = () => {
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }
        setDisplayedText(text);
        setIsTypingComplete(true);
        onComplete?.();
    };

    return (
        <motion.div
            className={`relative bg-black/95 border-2 border-cyan-500 rounded-xl p-4 shadow-[0_0_30px_rgba(0,255,255,0.15)] -mb-2 ${position === 'right' ? 'mr-2' : 'ml-2'
                }`}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
        >
            {/* Triangle Tail */}
            <div
                className={`absolute -bottom-[9px] w-4 h-4 bg-black border-r-2 border-b-2 border-cyan-500 z-0 ${position === 'right' ? 'right-12' : 'left-12'
                    }`}
                style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.95)',
                    transform: 'rotate(45deg)',
                }}
            />

            {/* Text content */}
            <div className="relative z-10 text-cyan-50 font-mono text-sm leading-relaxed antialiased">
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
