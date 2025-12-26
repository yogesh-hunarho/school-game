import { useMemo } from "react";

/**
 * Pine tree with snow cap
 */
export const SnowTree = ({ x, y, scale = 1, variant = 0 }) => {
    const treeColor = variant === 0 ? "#166534" : variant === 1 ? "#15803d" : "#14532d";
    const snowColor = "#f0f9ff";

    return (
        <g transform={`translate(${x}, ${y}) scale(${scale})`}>
            {/* Tree shadow */}
            <ellipse cx="0" cy="70" rx="20" ry="8" fill="rgba(0,0,0,0.15)" />

            {/* Tree trunk */}
            <rect x="-8" y="45" width="16" height="25" fill="#92400e" rx="2" />

            {/* Tree layers */}
            <polygon points="0,-50 -35,10 35,10" fill={treeColor} />
            <polygon points="0,-25 -30,30 30,30" fill={treeColor} />
            <polygon points="0,0 -25,45 25,45" fill={treeColor} />

            {/* Snow caps */}
            <polygon points="0,-50 -15,-30 15,-30" fill={snowColor} />
            <polygon points="-12,-30 -25,0 5,0" fill={snowColor} />
            <polygon points="12,-30 25,0 -5,0" fill={snowColor} />
            <polygon points="0,0 -15,20 15,20" fill={snowColor} />
        </g>
    );
};

/**
 * Snowman decoration
 */
export const Snowman = ({ x, y, scale = 1 }) => (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        {/* Shadow */}
        <ellipse cx="0" cy="65" rx="30" ry="10" fill="rgba(0,0,0,0.1)" />

        {/* Bottom ball */}
        <circle cx="0" cy="45" r="32" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" />

        {/* Middle ball */}
        <circle cx="0" cy="5" r="24" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" />

        {/* Head */}
        <circle cx="0" cy="-35" r="18" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" />

        {/* Hat */}
        <rect x="-20" y="-65" width="40" height="8" fill="#fbbf24" rx="2" />
        <rect x="-12" y="-85" width="24" height="22" fill="#ef4444" rx="3" />
        <rect x="-14" y="-87" width="28" height="5" fill="#22c55e" rx="2" />

        {/* Eyes */}
        <circle cx="-6" cy="-38" r="3" fill="#1e293b" />
        <circle cx="6" cy="-38" r="3" fill="#1e293b" />

        {/* Carrot nose */}
        <polygon points="0,-32 15,-28 0,-24" fill="#fb923c" />

        {/* Mouth */}
        <circle cx="-8" cy="-22" r="2" fill="#1e293b" />
        <circle cx="-3" cy="-20" r="2" fill="#1e293b" />
        <circle cx="3" cy="-20" r="2" fill="#1e293b" />
        <circle cx="8" cy="-22" r="2" fill="#1e293b" />

        {/* Buttons */}
        <circle cx="0" cy="0" r="4" fill="#1e293b" />
        <circle cx="0" cy="15" r="4" fill="#1e293b" />

        {/* Arms (sticks) */}
        <line x1="-24" y1="5" x2="-50" y2="-10" stroke="#92400e" strokeWidth="4" strokeLinecap="round" />
        <line x1="24" y1="5" x2="50" y2="-10" stroke="#92400e" strokeWidth="4" strokeLinecap="round" />

        {/* Scarf */}
        <path d="M -18 -18 Q 0 -12 18 -18" stroke="#ef4444" strokeWidth="6" fill="none" strokeLinecap="round" />
        <rect x="15" y="-18" width="8" height="25" fill="#ef4444" rx="3" />
    </g>
);

/**
 * Gift box decoration
 */
export const GiftBox = ({ x, y, scale = 1 }) => (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        {/* Shadow */}
        <ellipse cx="0" cy="35" rx="30" ry="8" fill="rgba(0,0,0,0.1)" />

        {/* Box body */}
        <rect x="-28" y="-20" width="56" height="50" fill="#3b82f6" rx="4" />

        {/* Ribbon vertical */}
        <rect x="-6" y="-20" width="12" height="50" fill="#fbbf24" />

        {/* Box lid */}
        <rect x="-32" y="-35" width="64" height="18" fill="#2563eb" rx="4" />

        {/* Ribbon horizontal */}
        <rect x="-32" y="-28" width="64" height="10" fill="#fbbf24" />

        {/* Bow */}
        <ellipse cx="-15" cy="-42" rx="12" ry="10" fill="#fbbf24" />
        <ellipse cx="15" cy="-42" rx="12" ry="10" fill="#fbbf24" />
        <circle cx="0" cy="-38" r="8" fill="#f59e0b" />

        {/* Ribbon tails */}
        <path d="M -12 -32 Q -20 -20 -25 -25" stroke="#fbbf24" strokeWidth="8" fill="none" strokeLinecap="round" />
        <path d="M 12 -32 Q 20 -20 25 -25" stroke="#fbbf24" strokeWidth="8" fill="none" strokeLinecap="round" />
    </g>
);

/**
 * Snow mound / drift
 */
export const SnowMound = ({ x, y, width = 100, height = 30 }) => (
    <g transform={`translate(${x}, ${y})`}>
        <ellipse cx={0} cy={0} rx={width / 2} ry={height} fill="#f0f9ff" />
        <ellipse cx={-width * 0.2} cy={-height * 0.3} rx={width * 0.3} ry={height * 0.6} fill="#f8fafc" />
    </g>
);

/**
 * Floating snowflakes
 */
export const Snowflakes = ({ count = 30 }) => {
    const flakes = useMemo(() => {
        return Array.from({ length: count }, (_, i) => ({
            id: i,
            x: Math.random() * 2000 - 200,
            y: Math.random() * 1200 - 200,
            size: Math.random() * 6 + 2,
            delay: Math.random() * 5,
            duration: Math.random() * 3 + 4,
        }));
    }, [count]);

    return (
        <g className="snowflakes">
            {flakes.map((flake) => (
                <circle
                    key={flake.id}
                    cx={flake.x}
                    cy={flake.y}
                    r={flake.size}
                    fill="white"
                    opacity="0.7"
                    style={{
                        animation: `snowfall ${flake.duration}s linear infinite`,
                        animationDelay: `${flake.delay}s`,
                    }}
                />
            ))}
        </g>
    );
};

/**
 * Rock/Mountain formation
 */
export const SnowRock = ({ x, y, scale = 1 }) => (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        {/* Rock body */}
        <polygon points="-40,40 -50,0 -20,-30 20,-20 45,5 40,40" fill="#94a3b8" />
        <polygon points="-40,40 -50,0 -20,-30 -10,0 -20,40" fill="#64748b" />

        {/* Snow on top */}
        <polygon points="-50,0 -20,-30 20,-20 10,0 -30,5" fill="#f0f9ff" />
    </g>
);

/**
 * Decorative ice crystals
 */
export const IceCrystal = ({ x, y, size = 20 }) => (
    <g transform={`translate(${x}, ${y})`} opacity="0.6">
        <line x1="0" y1={-size} x2="0" y2={size} stroke="#7dd3fc" strokeWidth="2" />
        <line x1={-size} y1="0" x2={size} y2="0" stroke="#7dd3fc" strokeWidth="2" />
        <line x1={-size * 0.7} y1={-size * 0.7} x2={size * 0.7} y2={size * 0.7} stroke="#7dd3fc" strokeWidth="2" />
        <line x1={-size * 0.7} y1={size * 0.7} x2={size * 0.7} y2={-size * 0.7} stroke="#7dd3fc" strokeWidth="2" />
        <circle cx="0" cy="0" r={size * 0.2} fill="#bfdbfe" />
    </g>
);
