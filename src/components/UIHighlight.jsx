import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/instructor-animations.css';

/**
 * UIHighlight Component
 * Highlights UI elements with cyberpunk-style effects
 * Supports shake, glow, pulse, and scan animations
 */
export const UIHighlight = ({ targetSelector, effect = 'glow', duration = 2500, delay = 0, color = 'cyan' }) => {
    const [highlightStyle, setHighlightStyle] = useState(null);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (!targetSelector) return;

        const showHighlight = () => {
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    const element = document.querySelector(targetSelector);
                    if (!element) return;

                    const rect = element.getBoundingClientRect();

                    setHighlightStyle({
                        top: rect.top,
                        left: rect.left,
                        width: rect.width,
                        height: rect.height
                    });

                    console.log('Instructor highlight:', {
                        selector: targetSelector,
                        rect,
                    });
                    setIsActive(true);

                    setTimeout(() => setIsActive(false), duration);
                });
            });
        };
        const delayTimer = setTimeout(showHighlight, delay);

        return () => clearTimeout(delayTimer);
    }, [targetSelector, duration, delay]);

    if (!isActive || !highlightStyle) return null;

    const effectClass = effect ? `ui-highlight-overlay ${effect}` : 'ui-highlight-overlay';

    return (
        <AnimatePresence>
            <motion.div
                className={effectClass}
                style={{
                    position: 'fixed',
                    top: highlightStyle.top - window.scrollY,
                    left: highlightStyle.left - window.scrollX,
                    width: highlightStyle.width,
                    height: highlightStyle.height,
                    borderColor: color === 'cyan' ? '#00ffff' : color === 'magenta' ? '#ff00ff' : color,
                    zIndex: 9998
                }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
            />
        </AnimatePresence>
    );
};
