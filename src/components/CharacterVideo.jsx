import { memo } from "react";

const CharacterVideo = memo(() => (
    <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        controls={false}
        speed={0.5}
        className="w-dvw h-dvh bg-transparent pointer-events-none"
    >
        <source src="/assets/bg-1.mp4" />
    </video>
));

export default CharacterVideo;