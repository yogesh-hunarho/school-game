import { useState, useCallback, useRef, useEffect } from "react";

/**
 * Custom hook for Miro-like canvas controls (pan & zoom)
 */
export const useCanvasControls = (options = {}) => {
    const {
        minZoom = 0.3,
        maxZoom = 2,
        initialZoom = 0.8,
        zoomSensitivity = 0.001,
    } = options;

    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(initialZoom);
    const [isPanning, setIsPanning] = useState(false);

    const lastPanPoint = useRef({ x: 0, y: 0 });
    const containerRef = useRef(null);

    // Handle mouse down for panning
    const handleMouseDown = useCallback((e) => {
        // Only pan with left mouse button on empty canvas area
        if (e.button === 0 && e.target === e.currentTarget) {
            setIsPanning(true);
            lastPanPoint.current = { x: e.clientX, y: e.clientY };
            e.preventDefault();
        }
    }, []);

    // Handle mouse move for panning
    const handleMouseMove = useCallback((e) => {
        if (!isPanning) return;

        const deltaX = e.clientX - lastPanPoint.current.x;
        const deltaY = e.clientY - lastPanPoint.current.y;

        setOffset((prev) => ({
            x: prev.x + deltaX,
            y: prev.y + deltaY,
        }));

        lastPanPoint.current = { x: e.clientX, y: e.clientY };
    }, [isPanning]);

    // Handle mouse up to stop panning
    const handleMouseUp = useCallback(() => {
        setIsPanning(false);
    }, []);

    // Handle wheel for zooming
    const handleWheel = useCallback((e) => {
        e.preventDefault();

        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Calculate zoom change
        const delta = -e.deltaY * zoomSensitivity;
        const newZoom = Math.min(maxZoom, Math.max(minZoom, zoom + delta * zoom));

        // Adjust offset to zoom toward mouse position
        const zoomRatio = newZoom / zoom;
        const newOffsetX = mouseX - (mouseX - offset.x) * zoomRatio;
        const newOffsetY = mouseY - (mouseY - offset.y) * zoomRatio;

        setZoom(newZoom);
        setOffset({ x: newOffsetX, y: newOffsetY });
    }, [zoom, offset, minZoom, maxZoom, zoomSensitivity]);

    // Add global mouse up listener
    useEffect(() => {
        const handleGlobalMouseUp = () => setIsPanning(false);
        window.addEventListener("mouseup", handleGlobalMouseUp);
        return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
    }, []);

    // Reset view to center
    const resetView = useCallback(() => {
        setOffset({ x: 0, y: 0 });
        setZoom(initialZoom);
    }, [initialZoom]);

    // Zoom controls
    const zoomIn = useCallback(() => {
        setZoom((z) => Math.min(maxZoom, z * 1.2));
    }, [maxZoom]);

    const zoomOut = useCallback(() => {
        setZoom((z) => Math.max(minZoom, z / 1.2));
    }, [minZoom]);

    return {
        offset,
        zoom,
        isPanning,
        containerRef,
        handlers: {
            onMouseDown: handleMouseDown,
            onMouseMove: handleMouseMove,
            onMouseUp: handleMouseUp,
            onWheel: handleWheel,
        },
        controls: {
            resetView,
            zoomIn,
            zoomOut,
            setOffset,
            setZoom,
        },
    };
};
