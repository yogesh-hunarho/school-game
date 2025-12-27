export interface VideoPlayerProps {
    src: string;
    autoPlay?: boolean;
    startTime?: number;
    volume?: number;
    playbackRate?: number;
    loop?: boolean;

    /** UI toggles */
    controls?: boolean;
    showProgress?: boolean;
    showVolume?: boolean;
    showPlaybackRate?: boolean;
    showFullscreen?: boolean;
    showSkipButtons?: boolean;

    /** Events (important for LMS analytics) */
    onPlay?: () => void;
    onPause?: () => void;
    onEnd?: () => void;
    onTimeUpdate?: (time: number) => void;
    onDuration?: (duration: number) => void;

    /** Custom UI slots */
    renderControls?: (ctx: VideoContext) => React.ReactNode;
}

export interface VideoContext {
    videoRef: React.RefObject<HTMLVideoElement>;
    isPlaying: boolean;
    currentTime: number;
    duration: number;
    togglePlay: () => void;
    seek: (time: number) => void;
}
