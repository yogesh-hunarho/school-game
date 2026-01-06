import { memo } from "react";

const CharacterVideo = memo(() => (
    <img
        src="/assets/character.gif"
        alt="Character"
        className="w-full h-[250px] md:h-[450px] object-contain bg-transparent pointer-events-none"
        draggable={false}
    />
    // <video
    //     autoPlay
    //     muted
    //     loop
    //     playsInline
    //     preload="auto"
    //     disablePictureInPicture
    //     controls={false}
    //     speed={0.5}
    //     className="w-full h-[250px] md:h-[450px] object-contain bg-transparent pointer-events-none"
    // >
    //     <source src="/assets/character.gif" />
    // </video>
));

export default CharacterVideo;