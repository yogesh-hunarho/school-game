import { useEffect, useRef, useState } from "react";

export function useVideoController({
    src,
    autoPlay,
    startTime = 0,
    volume = 1,
    playbackRate = 1,
    loop = false,
    onPlay,
    onPause,
    onEnd,
    onTimeUpdate,
    onDuration,
}: any) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(startTime);
    const [duration, setDuration] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        video.src = src;
        video.volume = volume;
        video.playbackRate = playbackRate;
        video.loop = loop;
        video.currentTime = startTime;

        const handlePlay = () => {
            setIsPlaying(true);
            onPlay?.();
        };

        const handlePause = () => {
            setIsPlaying(false);
            onPause?.();
        };

        const handleTime = () => {
            setCurrentTime(video.currentTime);
            onTimeUpdate?.(video.currentTime);
        };

        const handleMeta = () => {
            setDuration(video.duration);
            onDuration?.(video.duration);
        };

        video.addEventListener("play", handlePlay);
        video.addEventListener("pause", handlePause);
        video.addEventListener("timeupdate", handleTime);
        video.addEventListener("loadedmetadata", handleMeta);
        video.addEventListener("ended", onEnd || (() => { }));

        if (autoPlay) video.play();

        return () => {
            video.removeEventListener("play", handlePlay);
            video.removeEventListener("pause", handlePause);
            video.removeEventListener("timeupdate", handleTime);
            video.removeEventListener("loadedmetadata", handleMeta);
        };
    }, [src]);

    const toggleFullscreen = () => {
        const container = videoRef.current?.parentElement;
        if (!container) return;

        if (!document.fullscreenElement) {
            container.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    useEffect(() => {
        const handler = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener("fullscreenchange", handler);
        return () => document.removeEventListener("fullscreenchange", handler);
    }, []);


    const togglePlay = () => {
        const video = videoRef.current;
        if (!video) return;
        video.paused ? video.play() : video.pause();
    };

    const seek = (time: number) => {
        const video = videoRef.current;
        if (!video) return;
        video.currentTime = time;
    };

    return {
        videoRef,
        isPlaying,
        currentTime,
        duration,
        togglePlay,
        seek,
        isFullscreen,
        toggleFullscreen,
    };
}
