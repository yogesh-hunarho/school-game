import { motion, AnimatePresence } from "framer-motion";
import { useLMSStore } from "@/store/lms-store";
import { Coin } from "./coin";
import { useEffect, useState } from "react";

export default function CoinAnimation() {
    const { showCoinAnimation, coinSourcePos, coinTargetPos, coinCount, completeCoinAnimation } = useLMSStore();
    const [coins, setCoins] = useState([]);

    useEffect(() => {
        if (showCoinAnimation && coinSourcePos && coinTargetPos) {
            const newCoins = Array.from({ length: coinCount }).map((_, i) => ({
                id: Math.random(),
                delay: i * 0.05,
            }));
            setCoins(newCoins);

            // Cleanup animation after it's done
            const totalDuration = 0.8 + (coinCount * 0.05);
            const timer = setTimeout(() => {
                setCoins([]);
                completeCoinAnimation();
            }, totalDuration * 1000 + 500);

            return () => clearTimeout(timer);
        }
    }, [showCoinAnimation, coinSourcePos, coinTargetPos, coinCount, completeCoinAnimation]);

    if (!showCoinAnimation || !coinSourcePos || !coinTargetPos) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[9999]">
            <AnimatePresence>
                {coins.map((coin) => (
                    <motion.div
                        key={coin.id}
                        initial={{
                            x: coinSourcePos.x,
                            y: coinSourcePos.y,
                            scale: 0,
                            opacity: 0
                        }}
                        animate={{
                            x: [
                                coinSourcePos.x,
                                coinSourcePos.x + (Math.random() - 0.5) * 100, // Spread out first
                                coinTargetPos.x
                            ],
                            y: [
                                coinSourcePos.y,
                                coinSourcePos.y + (Math.random() - 0.5) * 100 - 50, // Arc up
                                coinTargetPos.y
                            ],
                            scale: [0, 1.2, 1],
                            opacity: [0, 1, 1, 0.8],
                        }}
                        transition={{
                            duration: 0.8,
                            delay: coin.delay,
                            ease: [0.45, 0.05, 0.55, 0.95],
                            times: [0, 0.3, 1]
                        }}
                        className="absolute"
                    >
                        <Coin className="w-5 h-5" />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
