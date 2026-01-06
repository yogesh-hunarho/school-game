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
        className="w-full h-[250px] md:h-[450px] object-contain bg-transparent pointer-events-none"
    >
        <source src="/assets/character.mp4" type="video/mp4" />
    </video>
));

export default CharacterVideo;
