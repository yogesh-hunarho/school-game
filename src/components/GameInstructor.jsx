import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SpeechBubble } from './SpeechBubble';
import { UIHighlight } from './UIHighlight';
import { useTTS } from '../hook/useTTS';
import '../styles/instructor-animations.css';

/**
 * GameInstructor Component
 * Cyberpunk AI assistant that guides users through the LMS
 */
export const GameInstructor = ({
    dialogue = [],
    uiActions = [],
    position = 'right',
    onComplete,
    autoPlay = true,
    voiceConfig = {}
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
    const [voiceEnabled, setVoiceEnabled] = useState(true);
    const hasStartedRef = useRef(false);

    const { speak, stop, isSpeaking, isSupported } = useTTS();

    // Convert single dialogue to array
    const dialogueArray = Array.isArray(dialogue) ? dialogue : [dialogue];
    const currentDialogue = dialogueArray[currentDialogueIndex] || '';

    // Show instructor on mount
    useEffect(() => {
        if (autoPlay && !hasStartedRef.current) {
            hasStartedRef.current = true;
            setIsVisible(true);
        }
    }, [autoPlay]);

    // Speak current dialogue
    useEffect(() => {
        if (isVisible && currentDialogue && voiceEnabled && isSupported) {
            // Small delay to let UI render
            const timer = setTimeout(() => {
                speak(currentDialogue, {
                    rate: voiceConfig.rate || 1.0,
                    pitch: voiceConfig.pitch || 1.1,
                    onEnd: handleDialogueComplete
                });
            }, 300);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [isVisible, currentDialogue, voiceEnabled, isSupported]);

    const handleDialogueComplete = () => {
        // If there are more dialogues, move to next
        if (currentDialogueIndex < dialogueArray.length - 1) {
            setTimeout(() => {
                setCurrentDialogueIndex(prev => prev + 1);
            }, 500);
        } else {
            // All dialogues complete
            if (onComplete) {
                setTimeout(onComplete, 1000);
            }
        }
    };

    const handleClose = () => {
        stop();
        setIsVisible(false);
        if (onComplete) {
            setTimeout(onComplete, 300);
        }
    };

    const handleToggleVoice = () => {
        if (voiceEnabled && isSpeaking) {
            stop();
        }
        setVoiceEnabled(prev => !prev);
    };

    if (!isVisible) return null;

    const positionClass = position === 'left' ? 'left-4' : 'right-4';
    const animationClass = position === 'left' ? 'instructor-slide-in-left' : 'instructor-slide-in-right';

    return (
        <AnimatePresence>
            <div className={`fixed bottom-4 ${positionClass} z-[9999] flex flex-col items-end gap-4 max-w-md`}>
                {/* Speech Bubble */}
                <SpeechBubble
                    text={currentDialogue}
                    onClose={handleClose}
                    onComplete={handleDialogueComplete}
                    showControls={true}
                    isSpeaking={voiceEnabled && isSpeaking}
                    onToggleSound={handleToggleVoice}
                />

                {/* Character */}
                <motion.div
                    className={`relative ${animationClass}`}
                    initial={{ opacity: 0, y: 100, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 100, scale: 0.8 }}
                    transition={{
                        duration: 0.6,
                        type: "spring",
                        stiffness: 120,
                        damping: 15
                    }}
                >
                    {/* Character placeholder - will be replaced with actual image */}
                    <div className="relative w-48 h-48 rounded-lg overflow-hidden">
                        {/* Holographic effect background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-pink-500/20 holographic-effect"></div>

                        {/* Character silhouette/placeholder */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 opacity-80 flex items-center justify-center">
                                <svg className="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                                </svg>
                            </div>
                        </div>

                        {/* Animated border glow */}
                        <div className="absolute inset-0 border-2 border-cyan-400 rounded-lg instructor-pulse"></div>

                        {/* Scanlines */}
                        <div
                            className="absolute inset-0 pointer-events-none opacity-20"
                            style={{
                                background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 255, 0.5) 2px, rgba(0, 255, 255, 0.5) 4px)'
                            }}
                        ></div>
                    </div>
                </motion.div>

                {/* UI Highlights */}
                {uiActions.map((action, index) => (
                    <UIHighlight
                        key={index}
                        targetSelector={action.selector}
                        effect={action.effect}
                        duration={action.duration || 2500}
                        delay={action.delay || 0}
                        color={action.color || 'cyan'}
                    />
                ))}
            </div>
        </AnimatePresence>
    );
};
