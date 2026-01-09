import { motion, useReducedMotion } from "framer-motion"

type RewardBackdropProps = {
    color?: "green" | "purple" | "gold"
}

const COLORS = {
    green: "34,197,94",
    purple: "168,85,247",
    gold: "250,204,21",
}

export function RewardBackdrop({
    color = "green",
}: RewardBackdropProps) {
    const reduce = useReducedMotion()

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Radial glow */}
            <div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
                style={{
                    width: "120vh",
                    height: "120vh",
                    background: `radial-gradient(circle,
            rgba(${COLORS[color]},0.35) 0%,
            rgba(${COLORS[color]},0.15) 30%,
            transparent 65%)`,
                }}
            />

            {/* Rotating rays */}
            {!reduce && (
                <motion.div
                    className="absolute inset-0 mix-blend-screen"
                    style={{
                        background:
                            "conic-gradient(from 0deg, rgba(255,255,255,0.12), transparent, rgba(255,255,255,0.12))",
                    }}
                />
            )}
        </div>
    )
}




