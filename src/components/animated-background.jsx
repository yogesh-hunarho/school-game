import React, { useEffect, useRef } from 'react';

const AnimatedBackground = ({
    variant = 'network',
    intensity = 'medium',
    colors = { primary: '#06b6d4', secondary: '#a855f7' },
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

        const initNetwork = () => {
            const count = intensity === 'low' ? 30 : (intensity === 'high' ? 80 : 50);
            const nodes = Array.from({ length: count }, () => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * speed,
                vy: (Math.random() - 0.5) * speed,
                color: Math.random() > 0.5 ? colors.primary : colors.secondary
            }));

            return () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                nodes.forEach(node => {
                    node.x += node.vx;
                    node.y += node.vy;

                    if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
                    if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

                    ctx.beginPath();
                    ctx.fillStyle = node.color;
                    ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
                    ctx.fill();

                    // Connect
                    nodes.forEach(other => {
                        const dx = node.x - other.x;
                        const dy = node.y - other.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        if (dist < 150) {
                            ctx.beginPath();
                            ctx.strokeStyle = hexToRgba(node.color, 1 - dist / 150);
                            ctx.lineWidth = 0.5;
                            ctx.moveTo(node.x, node.y);
                            ctx.lineTo(other.x, other.y);
                            ctx.stroke();
                        }
                    });
                });
            };
        };

        const renderers = {
            network: initNetwork
        };

        const renderFn = (renderers[variant] || initNetwork)();
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
            style={{ opacity: 0.6 }} // Base opacity for all backgrounds
        />
    );
};

export default AnimatedBackground;
