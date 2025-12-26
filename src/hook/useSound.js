import { useCallback, useRef, useEffect } from "react";

// Audio paths
const CLICK_SOUND = "/audio/click.wav";
const CLOSE_SOUND = "/audio/close.wav";

/**
 * Custom hook for playing UI sounds
 * @returns {{ playClick: () => void, playClose: () => void }}
 */
export function useSound() {
    const clickAudioRef = useRef(null);
    const closeAudioRef = useRef(null);

    useEffect(() => {
        // Preload audio files
        clickAudioRef.current = new Audio(CLICK_SOUND);
        closeAudioRef.current = new Audio(CLOSE_SOUND);

        // Set volume
        clickAudioRef.current.volume = 0.3;
        closeAudioRef.current.volume = 0.3;

        return () => {
            clickAudioRef.current = null;
            closeAudioRef.current = null;
        };
    }, []);

    const playClick = useCallback(() => {
        if (clickAudioRef.current) {
            clickAudioRef.current.currentTime = 0;
            clickAudioRef.current.play().catch(() => { });
        }
    }, []);

    const playClose = useCallback(() => {
        if (closeAudioRef.current) {
            closeAudioRef.current.currentTime = 0;
            closeAudioRef.current.play().catch(() => { });
        }
    }, []);

    return { playClick, playClose };
}

export default useSound;
