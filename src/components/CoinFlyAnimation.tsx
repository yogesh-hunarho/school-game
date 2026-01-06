import { motion, AnimatePresence } from "framer-motion";
// import { IndianRupee } from "lucide-react";
import { useLMSStore } from "@/store/lms-store";

const COINS = 8;

export const CoinFlyAnimation = () => {
    const {
        animatingStarFrom,
        coinTarget,
        completeStarAnimation,
    } = useLMSStore();

    if (!animatingStarFrom || !coinTarget) return null;

    return (
        <AnimatePresence>
            {[...Array(COINS)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{
                        x: animatingStarFrom.x,
                        y: animatingStarFrom.y,
                        scale: 0.6,
                        opacity: 1,
                    }}
                    animate={{
                        x: coinTarget.x,
                        y: coinTarget.y,
                        scale: 0.2,
                        opacity: 0,
                    }}
                    transition={{
                        duration: 0.8,
                        delay: i * 0.08,
                        ease: "easeOut",
                    }}
                    onAnimationComplete={() => {
                        if (i === COINS - 1) {
                            completeStarAnimation();
                        }
                    }}
                    className="fixed z-9999 pointer-events-none"
                >
                    <img src="/assets/icon/coin.png" className="size-16" />
                    {/* <IndianRupee className="size-16 text-yellow-400 fill-yellow-400" /> */}
                </motion.div>
            ))}
        </AnimatePresence>
    );
};
