import { useCallback, useRef, useEffect } from "react";
import { useLMSStore } from "@/store/lms-store";

// Audio paths configuration
const SOUNDS = {
    click: "/audio/click.wav",
    close: "/audio/close.wav",
    disabled: "/audio/disabled.mp3",
    success: "/audio/click.wav",
};

/**
 * Custom hook for playing UI sounds
 * Respects the global soundEnabled setting from the store
 * @returns {{ playSound: (type: keyof typeof SOUNDS) => void, playClick: () => void, playClose: () => void }}
 */
export function useSound() {
    const soundEnabled = useLMSStore((state) => state.soundEnabled);
    const audioRefs = useRef({});

    useEffect(() => {
        // Preload audio files
        Object.keys(SOUNDS).forEach((key) => {
            const audio = new Audio(SOUNDS[key]);
            audio.volume = 0.3;
            audioRefs.current[key] = audio;
        });

        return () => {
            audioRefs.current = {};
        };
    }, []);

    const playSound = useCallback((type) => {
        if (!soundEnabled) return;

        const audio = audioRefs.current[type];
        if (audio) {
            audio.currentTime = 0;
            audio.play().catch(() => { });
        }
    }, [soundEnabled]);

    // Convenience wrappers for backward compatibility
    const playClick = useCallback(() => playSound('click'), [playSound]);
    const playClose = useCallback(() => playSound('close'), [playSound]);

    return { playSound, playClick, playClose };
}

export default useSound;
