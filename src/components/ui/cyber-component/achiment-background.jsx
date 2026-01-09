import React, { useEffect, useRef } from 'react';

const AchivementAnimatedBackground = ({
    variant = 'warp',
    intensity = 'medium',
    colors = { primary: '#06b6d4', secondary: '#a855f7' }, // cyan and purple by default
    speed = 1
}) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationId;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        // Utility: HEX to RGBA
        const hexToRgba = (hex, alpha = 1) => {
            let c;
            if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
                c = hex.substring(1).split('');
                if (c.length === 3) {
                    c = [c[0], c[0], c[1], c[1], c[2], c[2]];
                }
                c = '0x' + c.join('');
                return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',' + alpha + ')';
            }
            return hex; // fallback
        };

        // 1. WARP (Tunnel effect)
        const initWarp = () => {
            const config = {
                low: { count: 30 },
                medium: { count: 60 },
                high: { count: 100 }
            }[intensity] || { count: 60 };

            const items = Array.from({ length: config.count }, () => ({
                z: Math.random() * 2000,
                angle: Math.random() * Math.PI * 2,
                dist: Math.random() * 500 + 50,
                color: Math.random() > 0.5 ? colors.primary : colors.secondary
            }));

            return () => {
                ctx.fillStyle = 'rgba(15, 23, 42, 0.3)'; // Trail effect
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                const cx = canvas.width / 2;
                const cy = canvas.height / 2;

                items.forEach(p => {
                    p.z -= 10 * speed;
                    if (p.z <= 0) p.z = 2000;

                    const scale = 1000 / p.z;
                    const x = cx + Math.cos(p.angle) * p.dist * scale;
                    const y = cy + Math.sin(p.angle) * p.dist * scale;
                    const size = scale * 2;

                    ctx.beginPath();
                    ctx.fillStyle = p.color;
                    ctx.arc(x, y, size, 0, Math.PI * 2);
                    ctx.fill();
                });
            };
        };


        // --- SELECTOR ---
        const renderers = {
            warp: initWarp,
        };

        const renderFn = (renderers[variant] || initMatrix)();

        // Clear canvas before starting new animation to prevent mixing
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const animate = () => {
            renderFn();
            animationId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resize);
        };

    }, [variant, intensity, colors, speed]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none"
            style={{ opacity: 0.6 }}
        />
    );
};

export default AchivementAnimatedBackground;
