import { useState, useMemo, useCallback, useEffect } from "react";
import { useLMSStore } from "@/store/lms-store";
import { canvasConfig, canvasNodePositions, mobileNodePositions, modules } from "@/store/level-canvas-config";
import { CanvasPath, CanvasPathDefs } from "@/view/canvas-path";
import { DataParticles, HexGrid, TechDecorationDefs } from "@/view/tech-decorations";
import { cn } from "@/lib/utils";
import { Lock, Star, CheckCircle2, Play, Trophy, Sparkles } from "lucide-react";
import { ModuleContentPanel } from "./module-content-panel";

// Developer mode flag - set to true to enable node dragging and position editing
const DEV_MODE = false;

// Mobile breakpoint (same as Tailwind lg)
const MOBILE_BREAKPOINT = 1024;

/**
 * Tech-styled Canvas Level Node - 3D Isometric Platform with Glowing Effects
 */
const CanvasLevelNode = ({
    id,
    moduleId,
    x,
    y,
    status = "locked",
    icon,
    name,
    progress = 0,
    starsEarned = 0,
    onDragStart,
    isDragging,
    scale = 1, // Scale factor for mobile
}) => {
    const { player, openContentPanel } = useLMSStore();

    const isCompleted = status === "completed";
    const isCurrent = status === "current";
    const isLocked = status === "locked";
    const isActive = player.currentModuleId === moduleId;
    const isStart = id === 1;
    const isFinal = id === 9;

    const handleMouseDown = (e) => {
        if (!DEV_MODE || isLocked) return;
        e.stopPropagation();
        onDragStart?.(id, e);
    };

    const handleClick = () => {
        if (!isDragging) {
            // Allow clicking on any node (including locked) to view module info
            useLMSStore.setState((state) => ({
                player: {
                    ...state.player,
                    currentModuleId: moduleId,
                },
            }));
            openContentPanel();
        }
    };

    // Calculate progress ring
    const circumference = 2 * Math.PI * 48;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    // Color based on status
    const glowColor = isCompleted ? "#22c55e" : isCurrent ? "#22d3ee" : "#475569";
    const platformColor = isCompleted ? "#16a34a" : isCurrent ? "#0891b2" : "#334155";

    return (
        <g
            transform={`translate(${x}, ${y}) scale(${scale})`}
            style={{
                cursor: "pointer",
                transition: "transform 0.2s ease-out"
            }}
            onMouseDown={handleMouseDown}
            onClick={handleClick}
            className="canvas-node"
        >
            {/* Platform glow shadow */}
            <ellipse
                cx="0"
                cy="55"
                rx="55"
                ry="20"
                fill={glowColor}
                opacity={isCurrent ? 0.5 : isCompleted ? 0.4 : 0.15}
                filter="url(#platformGlow)"
                style={{ animation: isCurrent ? "glowPulse 2s ease-in-out infinite" : "none" }}
            />

            {/* 3D Platform base - bottom ellipse */}
            <ellipse
                cx="0"
                cy="40"
                rx="48"
                ry="18"
                fill="#0d1526"
                stroke={glowColor}
                strokeWidth="2"
            />

            {/* Platform side (3D depth) */}
            <path
                d={`M -48 15 L -48 40 A 48 18 0 0 0 48 40 L 48 15`}
                fill="#0f172a"
                stroke={glowColor}
                strokeWidth="1.5"
            />

            {/* Platform top surface */}
            <ellipse
                cx="0"
                cy="15"
                rx="48"
                ry="18"
                fill={isLocked ? "#1e293b" : platformColor}
                stroke={glowColor}
                strokeWidth="2"
            />

            {/* Inner platform ring */}
            <ellipse
                cx="0"
                cy="15"
                rx="35"
                ry="13"
                fill="none"
                stroke={glowColor}
                strokeWidth="1"
                opacity="0.5"
            />

            {/* Center glow on platform */}
            <ellipse
                cx="0"
                cy="15"
                rx="20"
                ry="7"
                fill={glowColor}
                opacity="0.2"
            />

            {/* Progress ring for current/active module */}
            {(isCurrent || progress > 0) && (
                <>
                    {/* Background ring */}
                    <circle
                        cx="0"
                        cy="-25"
                        r="48"
                        fill="none"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="3"
                    />
                    {/* Progress ring */}
                    <circle
                        cx="0"
                        cy="-25"
                        r="48"
                        fill="none"
                        stroke={isCompleted ? "#22c55e" : "#22d3ee"}
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        transform="rotate(-90)"
                        style={{ transition: "stroke-dashoffset 0.5s ease" }}
                    />
                </>
            )}

            {/* Active pulsing glow ring */}
            {isCurrent && (
                <circle
                    cx="0"
                    cy="-25"
                    r="55"
                    fill="none"
                    stroke="#22d3ee"
                    strokeWidth="2"
                    opacity="0.4"
                    style={{ animation: "glowPulse 2s ease-in-out infinite" }}
                />
            )}

            {/* Icon container - floating above platform */}
            <g transform="translate(0, -25)" style={{ animation: isCurrent ? "iconFloat 3s ease-in-out infinite" : "none" }}>
                {/* Icon glow background */}
                <circle
                    cx="0"
                    cy="0"
                    r="38"
                    fill={isLocked ? "#1e293b" : platformColor}
                    stroke={glowColor}
                    strokeWidth="3"
                    filter={!isLocked ? "url(#iconGlow)" : "none"}
                />

                {/* Inner circle */}
                <circle
                    cx="0"
                    cy="0"
                    r="30"
                    fill={isLocked ? "#0f172a" : "#0d1526"}
                    stroke={glowColor}
                    strokeWidth="1"
                    opacity="0.8"
                />

                {/* Level icon or status */}
                {isLocked ? (
                    <g transform="translate(-12, -12)">
                        <Lock width={24} height={24} color="#64748b" />
                    </g>
                ) : isCompleted ? (
                    <g transform="translate(-14, -14)">
                        <CheckCircle2 width={28} height={28} color="#22c55e" />
                    </g>
                ) : isFinal ? (
                    <g transform="translate(-14, -14)">
                        <Trophy width={28} height={28} color="#fbbf24" />
                    </g>
                ) : (
                    <text
                        x="0"
                        y="10"
                        textAnchor="middle"
                        fill="white"
                        fontSize="32"
                        fontWeight="bold"
                        style={{ textShadow: `0 0 10px ${glowColor}` }}
                    >
                        {icon || id}
                    </text>
                )}
            </g>

            {/* START / FINAL badge */}
            {(isStart || isFinal) && (
                <g transform={`translate(0, -90)`}>
                    <rect
                        x="-30"
                        y="-10"
                        width="60"
                        height="20"
                        rx="10"
                        fill={isStart ? "#22c55e" : "#fbbf24"}
                        stroke={isStart ? "#16a34a" : "#f59e0b"}
                        strokeWidth="1"
                    />
                    <text
                        x="0"
                        y="4"
                        textAnchor="middle"
                        fill={isStart ? "white" : "#1e293b"}
                        fontSize="10"
                        fontWeight="bold"
                        fontFamily="Inter, system-ui, sans-serif"
                    >
                        {isStart ? "START" : "FINAL"}
                    </text>
                </g>
            )}

            {/* Module name label */}
            <g transform="translate(0, 75)">
                {/* Label background */}
                <rect
                    x="-65"
                    y="-12"
                    width="130"
                    height="24"
                    rx="12"
                    fill="rgba(15, 23, 42, 0.95)"
                    stroke={glowColor}
                    strokeWidth="1"
                    opacity="0.9"
                />
                <text
                    x="0"
                    y="5"
                    textAnchor="middle"
                    fill="#e2e8f0"
                    fontSize="11"
                    fontWeight="600"
                    fontFamily="Inter, system-ui, sans-serif"
                >
                    {name?.length > 16 ? name.slice(0, 16) + "..." : name}
                </text>
            </g>

            {/* Stars earned display */}
            {starsEarned > 0 && (
                <g transform="translate(-24, -85)">
                    {[0, 1, 2].map((i) => (
                        <g key={i} transform={`translate(${i * 18}, 0)`}>
                            <Star
                                width={14}
                                height={14}
                                fill={i < starsEarned ? "#fbbf24" : "#475569"}
                                color={i < starsEarned ? "#f59e0b" : "#64748b"}
                                style={{ filter: i < starsEarned ? "drop-shadow(0 0 4px #fbbf24)" : "none" }}
                            />
                        </g>
                    ))}
                </g>
            )}

            {/* Play indicator for current module */}
            {isCurrent && !isCompleted && (
                <g transform="translate(40, -55)">
                    <circle cx="0" cy="0" r="14" fill="#22c55e" stroke="#16a34a" strokeWidth="2" />
                    <Play width={14} height={14} color="white" x={-5} y={-7} fill="white" />
                </g>
            )}
        </g>
    );
};

/**
 * Main Game Level Canvas - Futuristic Tech Roadmap Theme
 * User interactions disabled - view-only mode for end users
 */
export const GameLevelCanvas = () => {
    const { player, getModuleProgress } = useLMSStore();

    // Detect mobile screen
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Choose node positions based on screen size
    const activeNodePositions = isMobile ? mobileNodePositions : canvasNodePositions;

    // Fixed viewport settings for end users - different for mobile
    // Mobile uses viewBox="0 0 360 700" so scale/offset adjusted accordingly
    const fixedZoom = isMobile ? 1 : 0.75;
    const fixedOffset = isMobile ? { x: 0, y: 10 } : { x: 80, y: 20 };

    // Node positions state (only for DEV_MODE)
    const [nodePositions, setNodePositions] = useState(
        activeNodePositions.reduce((acc, node) => ({ ...acc, [node.id]: { x: node.x, y: node.y } }), {})
    );

    // Update positions when switching between mobile/desktop
    useEffect(() => {
        setNodePositions(
            activeNodePositions.reduce((acc, node) => ({ ...acc, [node.id]: { x: node.x, y: node.y } }), {})
        );
    }, [isMobile]);

    // Dragging state (only for DEV_MODE)
    const [draggingNode, setDraggingNode] = useState(null);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

    // Handle node drag start (DEV_MODE only)
    const handleNodeDragStart = useCallback((nodeId, e) => {
        if (!DEV_MODE) return;
        const pos = nodePositions[nodeId];
        setDraggingNode(nodeId);
        setDragOffset({
            x: e.clientX / fixedZoom - pos.x - fixedOffset.x / fixedZoom,
            y: e.clientY / fixedZoom - pos.y - fixedOffset.y / fixedZoom,
        });
    }, [nodePositions, fixedZoom, fixedOffset]);

    // Handle mouse move for node dragging (DEV_MODE only)
    const handleCanvasMouseMove = useCallback((e) => {
        if (!DEV_MODE || !draggingNode) return;
        const newX = e.clientX / fixedZoom - dragOffset.x - fixedOffset.x / fixedZoom;
        const newY = e.clientY / fixedZoom - dragOffset.y - fixedOffset.y / fixedZoom;
        setNodePositions((prev) => ({
            ...prev,
            [draggingNode]: { x: Math.round(newX), y: Math.round(newY) },
        }));
    }, [draggingNode, dragOffset, fixedZoom, fixedOffset]);

    // Handle mouse up (DEV_MODE only)
    const handleCanvasMouseUp = useCallback(() => {
        if (!DEV_MODE) return;
        if (draggingNode) {
            // Log positions for saving (DEV_MODE only)
            console.log("Node positions:", JSON.stringify(nodePositions, null, 2));
        }
        setDraggingNode(null);
    }, [draggingNode, nodePositions]);

    // Get nodes with current positions and status
    const nodes = useMemo(() => {
        return activeNodePositions.map((node) => {
            const pos = DEV_MODE
                ? (nodePositions[node.id] || { x: node.x, y: node.y })
                : { x: node.x, y: node.y };
            const moduleData = modules.find((m) => m.id === node.moduleId) || {};
            const status = player.moduleStatus[node.moduleId] || "locked";
            const progress = getModuleProgress(node.moduleId);
            const starsEarned = player.completedModules?.includes(node.moduleId) ? 3 : 0;

            return {
                ...node,
                ...pos,
                status,
                progress,
                starsEarned,
                icon: moduleData.icon,
                name: moduleData.name || node.moduleId,
            };
        });
    }, [activeNodePositions, nodePositions, player, getModuleProgress]);

    // Path nodes (just x,y for path drawing)
    const pathNodes = useMemo(() => nodes.map((n) => ({ x: n.x, y: n.y })), [nodes]);

    // Calculate completed modules count
    const completedCount = Object.values(player.moduleStatus).filter((s) => s === "completed").length;

    return (
        <div className="relative flex w-full flex-col overflow-hidden ">
            {/* Tech gradient background overlay */}
            <div className="pointer-events-none absolute inset-0 " />

            {/* Main Content Grid */}
            <div className="relative z-10 grid flex-1 gap-4 p-4 lg:grid-cols-3">
                {/* Canvas Container - Left Side */}
                <div className="order-2 lg:order-1 lg:col-span-2">
                    <div className={cn(
                        "relative rounded-2xl border border-cyan-500/20 bg-gradient-to-b from-slate-900/90 to-slate-950/90 shadow-2xl shadow-cyan-500/10 backdrop-blur-sm",
                        isMobile ? "overflow-y-auto overflow-x-hidden" : "overflow-hidden"
                    )}>
                        {/* Canvas Header */}
                        <div className="flex items-center justify-between border-b border-cyan-500/20 bg-slate-900/80 px-4 py-3">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/30">
                                    <Sparkles className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-white">Learning Roadmap</h2>
                                    <p className="text-xs text-cyan-400/70">Master your skills step by step</p>
                                </div>
                            </div>

                            {/* Progress indicator */}
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-2 rounded-xl bg-slate-800/60 px-4 py-2">
                                    <div className="flex items-center gap-1.5">
                                        <div className={cn(
                                            "h-2.5 w-2.5 rounded-full",
                                            completedCount > 0 ? "bg-green-400" : "bg-cyan-400 animate-pulse"
                                        )} />
                                        <span className="text-sm font-semibold text-white">
                                            {completedCount}
                                        </span>
                                        <span className="text-sm text-slate-400">/</span>
                                        <span className="text-sm text-slate-400">9</span>
                                    </div>
                                    <span className="text-xs text-slate-500">completed</span>
                                </div>
                            </div>
                        </div>

                        {/* SVG Canvas */}
                        <div
                            className={cn(
                                "w-full touch-pan-y",
                                isMobile
                                    ? "h-[500px] overflow-y-auto overflow-x-hidden"
                                    : "h-[600px] overflow-hidden"
                            )}
                            style={isMobile ? { WebkitOverflowScrolling: 'touch' } : undefined}
                            onMouseMove={DEV_MODE ? handleCanvasMouseMove : undefined}
                            onMouseUp={DEV_MODE ? handleCanvasMouseUp : undefined}
                        >
                            <svg
                                width="100%"
                                height={isMobile ? "700" : "100%"}
                                viewBox={isMobile ? "0 0 360 700" : undefined}
                                preserveAspectRatio="xMidYMin meet"
                                style={{
                                    overflow: "visible",
                                }}
                            >
                                {/* Definitions */}
                                <CanvasPathDefs />
                                <TechDecorationDefs />

                                {/* Main viewport group with fixed transform */}
                                <g transform={`translate(${fixedOffset.x}, ${fixedOffset.y}) scale(${fixedZoom})`}>
                                    {/* Dark tech background */}
                                    <rect
                                        x="-200"
                                        y="-100"
                                        width={isMobile ? 600 : 1600}
                                        height={isMobile ? 1400 : 1000}
                                        fill="url(#techBgGradient)"
                                    />

                                    {/* Custom background image (if configured) */}
                                    {canvasConfig.backgroundImage && (
                                        <image
                                            href={canvasConfig.backgroundImage}
                                            x="-200"
                                            y="-100"
                                            width={isMobile ? 600 : 1600}
                                            height={isMobile ? 1400 : 1000}
                                            preserveAspectRatio="xMidYMid slice"
                                            opacity={canvasConfig.backgroundOpacity || 0.3}
                                            style={{ mixBlendMode: "overlay" }}
                                        />
                                    )}

                                    {/* Hex grid pattern - hide on mobile for performance */}
                                    {!isMobile && (
                                        <HexGrid x={-100} y={-50} cols={40} rows={25} size={35} opacity={0.05} />
                                    )}

                                    {/* Winding neon path */}
                                    <CanvasPath nodes={pathNodes} scale={isMobile ? 0.5 : 1} />

                                    {/* Level nodes */}
                                    {nodes.map((node) => (
                                        <CanvasLevelNode
                                            key={node.id}
                                            {...node}
                                            scale={isMobile ? 0.5 : 1}
                                            isDragging={draggingNode === node.id}
                                            onDragStart={handleNodeDragStart}
                                        />
                                    ))}

                                    {/* Floating data particles - fewer on mobile */}
                                    <DataParticles count={isMobile ? 15 : 40} />
                                </g>
                            </svg>
                        </div>

                        {/* DEV_MODE indicator */}
                        {DEV_MODE && (
                            <div className="absolute top-16 left-4 flex items-center gap-2 rounded-lg border border-yellow-500/50 bg-yellow-500/20 px-3 py-2 text-xs text-yellow-300">
                                <span>🛠️ DEV MODE - Drag nodes to reposition, positions logged to console</span>
                            </div>
                        )}

                        {/* Corner accent decorations */}
                        <div className="absolute top-0 right-0 h-24 w-24 overflow-hidden pointer-events-none">
                            <div className="absolute -top-12 -right-12 h-24 w-24 rotate-45 bg-gradient-to-r from-cyan-500/10 to-transparent" />
                        </div>
                        <div className="absolute bottom-0 left-0 h-24 w-24 overflow-hidden pointer-events-none">
                            <div className="absolute -bottom-12 -left-12 h-24 w-24 rotate-45 bg-gradient-to-r from-orange-500/10 to-transparent" />
                        </div>
                    </div>
                </div>

                {/* Module Content Panel - Right Side */}
                <div className="order-1 space-y-4 lg:order-2">
                    <div className="rounded-2xl border border-cyan-500/20 bg-slate-900/80 shadow-xl shadow-cyan-500/5 backdrop-blur-sm">
                        <ModuleContentPanel />
                    </div>
                </div>
            </div>
        </div>
    );
};
