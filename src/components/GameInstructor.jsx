import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SpeechBubble } from './SpeechBubble';
import { UIHighlight } from './UIHighlight';
import { useSpeech } from 'react-text-to-speech';
import '../styles/instructor-animations.css';
import { normalizeSpeech } from '@/config/normalizeSpeech';

/**
 * SpeechEngine Sub-component
 * Encapsulates useSpeech hook and forces re-initialization when text changes via key
 */
const SpeechEngine = ({ text, voiceConfig, onStatusChange }) => {
    const { start, stop, speechStatus } = useSpeech({
        text: normalizeSpeech(text),
        pitch: 1,
        rate: 0.9,
        volume: 0.65,
        voiceURI: "Microsoft Mark - English (United States)"
    });

    // const { start, stop, speechStatus } = useSpeech({ 
    //     text: normalizeSpeech(text),
    //     pitch: 1, 
    //     rate: 0.9, 
    //     volume: 0.65,
    //     voiceURI: "Microsoft Mark - English (United States)", 
    //     autoPlay: false, highlightText: false, 
    //     showOnlyHighlightedText: false, 
    //     highlightMode: "word", 
    //     enableDirectives: false
    // });


    useEffect(() => {
        onStatusChange(speechStatus);
    }, [speechStatus]);

    useEffect(() => {
        // Small delay to ensure cancel completes from previous instances
        const timer = setTimeout(() => {
            start();
        }, 150);
        return () => {
            clearTimeout(timer);
            stop();
        };
    }, []);

    return null;
}

/**
 * GameInstructor Component
 */
export const GameInstructor = ({
    dialogue = [],
    uiActions = [],
    position = 'right',
    onComplete,
    autoPlay = true,
    voiceConfig = {},
    isActive = false
}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
    const [voiceEnabled, setVoiceEnabled] = useState(true);
    const [isActuallySpeaking, setIsActuallySpeaking] = useState(false);
    const [speechStatus, setSpeechStatus] = useState('none');
    const hasStartedRef = useRef(false);
    const prevSpeechStatusRef = useRef('none');
    const [voicesReady, setVoicesReady] = useState(false);
    const [assetsLoaded, setAssetsLoaded] = useState(false);
    const [bubbleVisible, setBubbleVisible] = useState(false);

    // Pre-load assets
    useEffect(() => {
        const characterImg = new Image();
        characterImg.src = "/assets/character/character.png";
        characterImg.onload = () => setAssetsLoaded(true);
        characterImg.onerror = () => {
            console.error("Failed to load instructor image");
            setAssetsLoaded(true); // Proceed anyway to avoid total block
        };
    }, []);

    // Convert single dialogue to array
    const dialogueArray = Array.isArray(dialogue) ? dialogue : [dialogue];
    const currentDialogue = dialogueArray[currentDialogueIndex] || '';

    useEffect(() => {
        const loadVoices = () => {
            const voices = window.speechSynthesis.getVoices()
            if (voices.length > 0) setVoicesReady(true)
        }
        
        // Browsers might already have voices loaded
        if (window.speechSynthesis.getVoices().length > 0) {
            setVoicesReady(true);
        }

        window.speechSynthesis.onvoiceschanged = loadVoices
        return () => window.speechSynthesis.onvoiceschanged = null;
    }, []);

    useEffect(() => {
        if (!voiceEnabled && currentDialogue && assetsLoaded) {
            setBubbleVisible(true);

            const timer = setTimeout(() => {
                setBubbleVisible(false);
                handleDialogueComplete();
            }, 3000); // Give enough time to read

            return () => clearTimeout(timer);
        }
    }, [voiceEnabled, currentDialogue, assetsLoaded]);

    const isSpeaking = speechStatus === 'started';

    const handleDialogueComplete = () => {
        if (currentDialogueIndex < dialogueArray.length - 1) {
            setTimeout(() => {
                setCurrentDialogueIndex(i => i + 1);
            }, 800);
        } else {
            if (onComplete) {
                setTimeout(onComplete, 1000);
            }
        }
    };

    const handleSpeechStatusUpdate = (status) => {
        const prev = prevSpeechStatusRef.current;
        prevSpeechStatusRef.current = status;

        setSpeechStatus(status);
        
        if (status === 'started') {
            setIsActuallySpeaking(true);
            setBubbleVisible(true);
            return;
        }

        // Only move forward if we were previously speaking and now stopped/finished
        if ((prev === 'started' || prev === 'playing') && (status === 'stopped' || status === 'finished')) {
            setIsActuallySpeaking(false);

            setTimeout(() => {
                setBubbleVisible(false);
                handleDialogueComplete();
            }, 800);
        }
    };

    // Show instructor only when assets are ready
    useEffect(() => {
        if (autoPlay && assetsLoaded && !hasStartedRef.current) {
            // Small extra delay for smoothness
            const timer = setTimeout(() => {
                hasStartedRef.current = true;
                setIsVisible(true);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [autoPlay, assetsLoaded]);

    const handleClose = () => {
        window.speechSynthesis.cancel();
        setIsVisible(false);
        if (onComplete) {
            setTimeout(onComplete, 300);
        }
    };

    const handleToggleVoice = () => {
        if (voiceEnabled) {
            window.speechSynthesis.cancel();
        }
        setVoiceEnabled(prev => !prev);
    };

    const positionClass = position === 'left' ? 'left-4' : 'right-4';
    const animationClass = position === 'left' ? 'instructor-slide-in-left' : 'instructor-slide-in-right';

    // Show a minimal loader if assets aren't ready but instructor SHOULD be active
    const isReady = assetsLoaded && voicesReady;

    return (
        <AnimatePresence>
            {isVisible && isReady && (
                <div className={`fixed -bottom-3 ${positionClass} z-9999 flex flex-col ${position === 'left' ? 'items-start' : 'items-end'} gap-2 max-w-md`}>

                    {/* Speech Engine Controller - Keyed by current dialogue to force hook reset */}
                    {voiceEnabled && currentDialogue && (
                        <SpeechEngine
                            key={`${currentDialogueIndex}-${currentDialogue.substring(0, 10)}`}
                            text={currentDialogue}
                            voiceConfig={voiceConfig}
                            onStatusChange={handleSpeechStatusUpdate}
                        />
                    )}

                    {/* Speech Bubble */}
                    <AnimatePresence>
                        {isActive && currentDialogue && bubbleVisible && (
                            <SpeechBubble
                                text={currentDialogue}
                                onClose={handleClose}
                                isSpeaking={speechStatus === 'started'}
                                showControls={false}
                                onToggleSound={handleToggleVoice}
                                speechRate={voiceConfig.rate || 1.0}
                                position={position}
                            />
                        )}
                    </AnimatePresence>

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
                        <div className="relative w-32 h-48 md:w-32 md:h-48 rounded-lg overflow-hidden flex items-end justify-center">
                            <div className="relative z-10 w-full h-full flex items-end justify-center">
                                <img
                                    src="/assets/character/character.png"
                                    alt="AI Instructor"
                                    className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* UI Highlights */}
                    {isActive && uiActions.map((action, index) => (
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
            )}
        </AnimatePresence>
    );
};
