import { useEffect } from "react";
import confetti from "canvas-confetti";
import { useLMSStore } from "@/store/lms-store";

export default function VideoQuizConfettiEffect() {
    const showVideoQuizConfetti = useLMSStore((state) => state.showVideoQuizConfetti);

    useEffect(() => {
        if (showVideoQuizConfetti) {
            const duration = 2000;
            const end = Date.now() + duration;

            const colors = ["#00FFFF", "#FF00FF", "#8B00FF", "#FFD700", "#00FF00"];

            const frame = () => {
                confetti({
                    particleCount: 2,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0, y: 0.7 },
                    colors: colors,
                });
                confetti({
                    particleCount: 2,
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
                particleCount: 50,
                spread: 70,
                origin: { y: 0.6 },
                colors: colors,
            });

            frame();
        }
    }, [showVideoQuizConfetti]);

    return null;
}
