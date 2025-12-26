import { useMemo } from "react";

/**
 * Generate a smooth bezier curve path between two points
 */
const generateCurvePath = (start, end) => {
    const midX = (start.x + end.x) / 2;
    const midY = (start.y + end.y) / 2;

    // Calculate control points for smooth S-curve
    const dx = end.x - start.x;
    const dy = end.y - start.y;

    // Offset control points perpendicular to the line for nice curves
    const offset = Math.min(Math.abs(dx), Math.abs(dy)) * 0.3;

    const cp1x = start.x + dx * 0.25 + (dy > 0 ? offset : -offset);
    const cp1y = start.y + dy * 0.25;
    const cp2x = end.x - dx * 0.25 - (dy > 0 ? offset : -offset);
    const cp2y = end.y - dy * 0.25;

    return `M ${start.x} ${start.y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${end.x} ${end.y}`;
};

/**
 * Canvas path component - renders futuristic neon highway paths between level nodes
 */
export const CanvasPath = ({ nodes = [], scale = 1 }) => {
    const paths = useMemo(() => {
        if (nodes.length < 2) return [];

        const result = [];
        for (let i = 0; i < nodes.length - 1; i++) {
            const start = nodes[i];
            const end = nodes[i + 1];
            result.push({
                id: `path-${i}`,
                d: generateCurvePath(
                    { x: start.x, y: start.y },
                    { x: end.x, y: end.y }
                ),
            });
        }
        return result;
    }, [nodes]);

    // Scale stroke widths based on scale prop
    const strokeOuter = 55 * scale;
    const strokeBorder = 42 * scale;
    const strokeMain = 35 * scale;
    const strokeInner = 20 * scale;
    const strokeCenter = 6 * scale;
    const strokePulse = 4 * scale;

    return (
        <g className="canvas-paths">
            {/* Outer orange glow layer */}
            {paths.map((path) => (
                <path
                    key={`${path.id}-outer-glow`}
                    d={path.d}
                    fill="none"
                    stroke="url(#outerGlowGradient)"
                    strokeWidth={strokeOuter}
                    strokeLinecap="round"
                    filter="url(#pathOuterGlow)"
                    opacity="0.6"
                />
            ))}

            {/* Orange border layer */}
            {paths.map((path) => (
                <path
                    key={`${path.id}-border`}
                    d={path.d}
                    fill="none"
                    stroke="#f97316"
                    strokeWidth={strokeBorder}
                    strokeLinecap="round"
                    opacity="0.9"
                />
            ))}

            {/* Main cyan path */}
            {paths.map((path) => (
                <path
                    key={path.id}
                    d={path.d}
                    fill="none"
                    stroke="url(#neonPathGradient)"
                    strokeWidth={strokeMain}
                    strokeLinecap="round"
                />
            ))}

            {/* Inner glow/highlight */}
            {paths.map((path) => (
                <path
                    key={`${path.id}-inner`}
                    d={path.d}
                    fill="none"
                    stroke="url(#pathCoreGradient)"
                    strokeWidth={strokeInner}
                    strokeLinecap="round"
                    opacity="0.8"
                />
            ))}

            {/* Center bright line */}
            {paths.map((path) => (
                <path
                    key={`${path.id}-center`}
                    d={path.d}
                    fill="none"
                    stroke="#67e8f9"
                    strokeWidth={strokeCenter}
                    strokeLinecap="round"
                    opacity="0.9"
                />
            ))}

            {/* Animated energy pulse */}
            {paths.map((path, index) => (
                <path
                    key={`${path.id}-pulse`}
                    d={path.d}
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth={strokePulse}
                    strokeLinecap="round"
                    strokeDasharray="20 80"
                    opacity="0.7"
                    style={{
                        animation: `pathPulse 3s linear infinite`,
                        animationDelay: `${index * 0.5}s`,
                    }}
                />
            ))}
        </g>
    );
};

/**
 * SVG definitions for path gradients and filters - Futuristic Tech Theme
 */
export const CanvasPathDefs = () => (
    <defs>
        {/* Main neon cyan gradient for paths */}
        <linearGradient id="neonPathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0891b2" />
            <stop offset="25%" stopColor="#06b6d4" />
            <stop offset="50%" stopColor="#22d3ee" />
            <stop offset="75%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#0891b2" />
        </linearGradient>

        {/* Path core gradient (lighter center) */}
        <linearGradient id="pathCoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="50%" stopColor="#67e8f9" />
            <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>

        {/* Outer glow gradient (orange) */}
        <linearGradient id="outerGlowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ea580c" />
            <stop offset="50%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>

        {/* Path outer glow filter */}
        <filter id="pathOuterGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
            </feMerge>
        </filter>

        {/* Main path glow filter */}
        <filter id="pathGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
            </feMerge>
        </filter>

        {/* Node glow filter */}
        <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="blur" in2="SourceAlpha" operator="out" result="glow" />
            <feMerge>
                <feMergeNode in="glow" />
                <feMergeNode in="SourceGraphic" />
            </feMerge>
        </filter>

        {/* Platform glow filter */}
        <filter id="platformGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
            </feMerge>
        </filter>

        {/* Icon glow filter */}
        <filter id="iconGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#22d3ee" floodOpacity="0.8" />
        </filter>

        {/* Active node glow gradient */}
        <radialGradient id="activeNodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
        </radialGradient>

        {/* Locked node gradient */}
        <radialGradient id="lockedNodeGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="100%" stopColor="#334155" />
        </radialGradient>

        {/* Completed node gradient */}
        <radialGradient id="completedNodeGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#16a34a" />
        </radialGradient>

        {/* Current node gradient */}
        <radialGradient id="currentNodeGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#0891b2" />
        </radialGradient>

        {/* Tech background gradient */}
        <linearGradient id="techBgGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0a0e17" />
            <stop offset="50%" stopColor="#0d1526" />
            <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
    </defs>
);
