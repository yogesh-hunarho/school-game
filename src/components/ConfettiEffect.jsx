import { useEffect } from "react";
import confetti from "canvas-confetti";
import { useLMSStore } from "@/store/lms-store";

export default function ConfettiEffect() {
    const showConfetti = useLMSStore((state) => state.showConfetti);
    const hideConfetti = useLMSStore((state) => state.hideConfetti);

    useEffect(() => {
        if (showConfetti) {
            // Fire confetti from multiple angles for celebration effect
            const duration = 3000;
            const end = Date.now() + duration;

            // Cyberpunk colors
            const colors = ["#00FFFF", "#FF00FF", "#8B00FF", "#FFD700", "#00FF00"];

            const frame = () => {
                confetti({
                    particleCount: 3,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0, y: 0.7 },
                    colors: colors,
                });
                confetti({
                    particleCount: 3,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1, y: 0.7 },
                    colors: colors,
                });

                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            };

            // Initial burst
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: colors,
            });

            frame();

            // Clear after animation
            const timeout = setTimeout(() => {
                hideConfetti();
            }, duration + 500);

            return () => clearTimeout(timeout);
        }
    }, [showConfetti, hideConfetti]);

    return null; // No visual component, just side effect
}
