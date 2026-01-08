import React from 'react';


const VideoCard = ({
    thumbnailUrl,
    title,
    channelName,
    channelAvatarUrl = '/default-avatar.png', // fallback avatar
    views,
    uploadedAt,
    videoUrl,
    onClick,
}) => {
    const handleClick = () => {
        if (videoUrl) {
            window.location.href = videoUrl;
        }
        onClick?.();
    };

    return (
        <div
            className="w-full max-w-sm cursor-pointer group"
            onClick={handleClick}
        >
            {/* Thumbnail */}
            <div className="relative aspect-video overflow-hidden rounded-xl bg-black">
                <img
                    src={thumbnailUrl}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Play icon overlay on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30">
                    <svg
                        className="w-16 h-16 text-white drop-shadow-lg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M8 5v14l11-7z" />
                    </svg>
                </div>
                {/* Duration badge (optional - add prop if needed) */}
                <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1 py-0.5 rounded">
                    10:24
                </span>
            </div>

            {/* Card details */}
            <div className="flex mt-3 gap-3">
                {/* Channel avatar */}
                <img
                    src={channelAvatarUrl}
                    alt={channelName}
                    className="w-9 h-9 rounded-full object-cover shrink-0"
                />

                {/* Text content */}
                <div className="flex-1">
                    <h3 className="font-medium text-sm line-clamp-2 text-gray-900 dark:text-white">
                        {title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {channelName}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        {views} • {uploadedAt}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default VideoCard;