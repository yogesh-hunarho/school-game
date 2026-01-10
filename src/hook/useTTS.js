import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook for Text-to-Speech using Web Speech API
 * Provides cyberpunk-style voice narration for the game instructor
 */
export const useTTS = () => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [isSupported, setIsSupported] = useState(false);
    const utteranceRef = useRef(null);

    useEffect(() => {
        // Check if browser supports speech synthesis
        setIsSupported('speechSynthesis' in window);
    }, []);

    const speak = useCallback((text, options = {}) => {
        if (!isSupported || !text) return;

        // Cancel any ongoing speech
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utteranceRef.current = utterance;

        // Configure voice properties
        utterance.rate = options.rate || 1.0;
        utterance.pitch = options.pitch || 1.1;
        utterance.volume = options.volume || 1.0;

        // Try to select a female voice for the AI instructor
        const voices = window.speechSynthesis.getVoices();
        const preferredVoice = voices.find(
            voice => voice.name.toLowerCase().includes('female') ||
                voice.name.toLowerCase().includes('samantha') ||
                voice.name.toLowerCase().includes('zira')
        ) || voices.find(voice => voice.lang.startsWith('en'));

        if (preferredVoice) {
            utterance.voice = preferredVoice;
        }

        // Event handlers
        utterance.onstart = () => {
            setIsSpeaking(true);
            setIsPaused(false);
            options.onStart?.();
        };

        utterance.onend = () => {
            setIsSpeaking(false);
            setIsPaused(false);
            options.onEnd?.();
        };

        utterance.onerror = (event) => {
            console.error('TTS Error:', event);
            setIsSpeaking(false);
            setIsPaused(false);
            options.onError?.(event);
        };

        utterance.onpause = () => {
            setIsPaused(true);
            options.onPause?.();
        };

        utterance.onresume = () => {
            setIsPaused(false);
            options.onResume?.();
        };

        // Start speaking
        window.speechSynthesis.speak(utterance);
    }, [isSupported]);

    const pause = useCallback(() => {
        if (isSupported && isSpeaking && !isPaused) {
            window.speechSynthesis.pause();
        }
    }, [isSupported, isSpeaking, isPaused]);

    const resume = useCallback(() => {
        if (isSupported && isSpeaking && isPaused) {
            window.speechSynthesis.resume();
        }
    }, [isSupported, isSpeaking, isPaused]);

    const stop = useCallback(() => {
        if (isSupported) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
            setIsPaused(false);
        }
    }, [isSupported]);

    return {
        speak,
        pause,
        resume,
        stop,
        isSpeaking,
        isPaused,
        isSupported
    };
};
