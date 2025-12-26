import { useMemo } from "react";

/**
 * Circuit board pattern background decoration
 */
export const CircuitPattern = ({ x = 0, y = 0, width = 400, height = 300, opacity = 0.15 }) => {
    const paths = useMemo(() => {
        const lines = [];
        const gridSize = 40;

        // Generate horizontal and vertical circuit lines
        for (let i = 0; i < width / gridSize; i++) {
            for (let j = 0; j < height / gridSize; j++) {
                const startX = i * gridSize;
                const startY = j * gridSize;

                // Random circuit path segments
                if (Math.random() > 0.5) {
                    lines.push({
                        id: `h-${i}-${j}`,
                        d: `M ${startX} ${startY} L ${startX + gridSize * (Math.random() > 0.5 ? 1 : 0.5)} ${startY}`,
                        hasNode: Math.random() > 0.7,
                    });
                }
                if (Math.random() > 0.5) {
                    lines.push({
                        id: `v-${i}-${j}`,
                        d: `M ${startX} ${startY} L ${startX} ${startY + gridSize * (Math.random() > 0.5 ? 1 : 0.5)}`,
                        hasNode: Math.random() > 0.7,
                    });
                }
            }
        }
        return lines;
    }, [width, height]);

    return (
        <g transform={`translate(${x}, ${y})`} opacity={opacity}>
            {paths.map((path) => (
                <g key={path.id}>
                    <path
                        d={path.d}
                        fill="none"
                        stroke="#22d3ee"
                        strokeWidth="1"
                        opacity="0.5"
                    />
                    {path.hasNode && (
                        <circle
                            cx={path.d.split(" ")[1]}
                            cy={path.d.split(" ")[2]}
                            r="2"
                            fill="#22d3ee"
                        />
                    )}
                </g>
            ))}
        </g>
    );
};

/**
 * Floating data particles (replacing snowflakes)
 */
export const DataParticles = ({ count = 50 }) => {
    const particles = useMemo(() => {
        return Array.from({ length: count }, (_, i) => ({
            id: i,
            x: Math.random() * 2000 - 200,
            y: Math.random() * 1200 - 200,
            size: Math.random() * 3 + 1,
            delay: Math.random() * 8,
            duration: Math.random() * 4 + 5,
            type: Math.random() > 0.7 ? "square" : "circle",
            color: Math.random() > 0.5 ? "#22d3ee" : "#f97316",
        }));
    }, [count]);

    return (
        <g className="data-particles">
            {particles.map((particle) => (
                <g
                    key={particle.id}
                    style={{
                        animation: `dataFloat ${particle.duration}s ease-in-out infinite`,
                        animationDelay: `${particle.delay}s`,
                    }}
                >
                    {particle.type === "circle" ? (
                        <circle
                            cx={particle.x}
                            cy={particle.y}
                            r={particle.size}
                            fill={particle.color}
                            opacity="0.6"
                        />
                    ) : (
                        <rect
                            x={particle.x - particle.size / 2}
                            y={particle.y - particle.size / 2}
                            width={particle.size}
                            height={particle.size}
                            fill={particle.color}
                            opacity="0.6"
                            transform={`rotate(45 ${particle.x} ${particle.y})`}
                        />
                    )}
                </g>
            ))}
        </g>
    );
};

/**
 * Glowing ambient orb
 */
export const GlowingOrb = ({ x, y, size = 30, color = "#22d3ee" }) => (
    <g transform={`translate(${x}, ${y})`}>
        {/* Outer glow */}
        <circle
            cx="0"
            cy="0"
            r={size * 2}
            fill={`url(#orbGlow-${color.replace("#", "")})`}
            opacity="0.3"
            style={{ animation: "glowPulse 3s ease-in-out infinite" }}
        />
        {/* Core */}
        <circle
            cx="0"
            cy="0"
            r={size / 3}
            fill={color}
            opacity="0.8"
        />
    </g>
);

/**
 * Hexagonal grid pattern
 */
export const HexGrid = ({ x = 0, y = 0, cols = 10, rows = 8, size = 30, opacity = 0.08 }) => {
    const hexagons = useMemo(() => {
        const hexes = [];
        const hexHeight = size * Math.sqrt(3);

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const xPos = col * size * 1.5;
                const yPos = row * hexHeight + (col % 2 === 1 ? hexHeight / 2 : 0);

                hexes.push({
                    id: `hex-${row}-${col}`,
                    x: xPos,
                    y: yPos,
                    glow: Math.random() > 0.85,
                });
            }
        }
        return hexes;
    }, [cols, rows, size]);

    const hexPath = (s) => {
        const a = s * Math.sqrt(3) / 2;
        return `M ${s} 0 L ${s / 2} ${a} L ${-s / 2} ${a} L ${-s} 0 L ${-s / 2} ${-a} L ${s / 2} ${-a} Z`;
    };

    return (
        <g transform={`translate(${x}, ${y})`} opacity={opacity}>
            {hexagons.map((hex) => (
                <g key={hex.id} transform={`translate(${hex.x}, ${hex.y})`}>
                    <path
                        d={hexPath(size * 0.9)}
                        fill="none"
                        stroke={hex.glow ? "#22d3ee" : "#334155"}
                        strokeWidth="1"
                        opacity={hex.glow ? 1 : 0.5}
                    />
                </g>
            ))}
        </g>
    );
};

/**
 * 3D Isometric platform base for nodes
 */
export const TechPlatform = ({ x, y, size = 50, glowColor = "#22d3ee", isActive = false }) => {
    const platformHeight = 15;
    const halfSize = size * 0.8;

    return (
        <g transform={`translate(${x}, ${y})`}>
            {/* Platform glow shadow */}
            <ellipse
                cx="0"
                cy={platformHeight + 5}
                rx={halfSize * 1.3}
                ry={halfSize * 0.4}
                fill={glowColor}
                opacity={isActive ? 0.4 : 0.15}
                filter="url(#platformGlow)"
                style={{ animation: isActive ? "glowPulse 2s ease-in-out infinite" : "none" }}
            />

            {/* Platform bottom (3D effect) */}
            <ellipse
                cx="0"
                cy={platformHeight}
                rx={halfSize}
                ry={halfSize * 0.35}
                fill="#0d1526"
                stroke={glowColor}
                strokeWidth="2"
                opacity="0.9"
            />

            {/* Platform side */}
            <path
                d={`M ${-halfSize} 0 L ${-halfSize} ${platformHeight} 
                    A ${halfSize} ${halfSize * 0.35} 0 0 0 ${halfSize} ${platformHeight} 
                    L ${halfSize} 0`}
                fill="#0f172a"
                stroke={glowColor}
                strokeWidth="1"
                opacity="0.8"
            />

            {/* Platform top */}
            <ellipse
                cx="0"
                cy="0"
                rx={halfSize}
                ry={halfSize * 0.35}
                fill="#1e293b"
                stroke={glowColor}
                strokeWidth="2"
            />

            {/* Inner ring */}
            <ellipse
                cx="0"
                cy="0"
                rx={halfSize * 0.7}
                ry={halfSize * 0.25}
                fill="none"
                stroke={glowColor}
                strokeWidth="1"
                opacity="0.5"
            />

            {/* Center glow */}
            <ellipse
                cx="0"
                cy="0"
                rx={halfSize * 0.3}
                ry={halfSize * 0.1}
                fill={glowColor}
                opacity="0.3"
            />
        </g>
    );
};

/**
 * Animated energy beam
 */
export const EnergyBeam = ({ x1, y1, x2, y2, color = "#22d3ee" }) => (
    <g>
        <line
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={color}
            strokeWidth="2"
            opacity="0.3"
            strokeLinecap="round"
        />
        <line
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={color}
            strokeWidth="1"
            strokeLinecap="round"
            style={{
                animation: "beamPulse 1.5s ease-in-out infinite",
            }}
        />
    </g>
);

/**
 * Tech-styled milestone marker
 */
export const MilestoneMarker = ({ x, y, label, isComplete = false }) => (
    <g transform={`translate(${x}, ${y})`}>
        {/* Marker pole */}
        <line
            x1="0"
            y1="0"
            x2="0"
            y2="-40"
            stroke="#475569"
            strokeWidth="3"
            strokeLinecap="round"
        />

        {/* Marker flag */}
        <path
            d="M 0 -40 L 25 -30 L 0 -20 Z"
            fill={isComplete ? "#22c55e" : "#f97316"}
            stroke={isComplete ? "#16a34a" : "#ea580c"}
            strokeWidth="1"
        />

        {/* Label */}
        {label && (
            <text
                x="30"
                y="-28"
                fill="#94a3b8"
                fontSize="10"
                fontWeight="600"
            >
                {label}
            </text>
        )}
    </g>
);

/**
 * SVG Definitions for tech decorations
 */
export const TechDecorationDefs = () => (
    <defs>
        {/* Platform glow filter */}
        <filter id="platformGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
            </feMerge>
        </filter>

        {/* Neon glow filter */}
        <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="blur" in2="SourceGraphic" operator="over" />
        </filter>

        {/* Cyan orb glow gradient */}
        <radialGradient id="orbGlow-22d3ee" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
        </radialGradient>

        {/* Orange orb glow gradient */}
        <radialGradient id="orbGlow-f97316" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
        </radialGradient>

        {/* Tech background gradient */}
        <linearGradient id="techBgGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0a0e17" />
            <stop offset="50%" stopColor="#0d1526" />
            <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>

        {/* Active node glow gradient */}
        <radialGradient id="activeNodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
        </radialGradient>
    </defs>
);
