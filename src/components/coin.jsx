import { motion } from "framer-motion"
import { BadgeIndianRupee } from "lucide-react"
import { cn } from "@/lib/utils"

const MotionRupee = motion(BadgeIndianRupee)

export function RupeePulse() {
    return (
        <MotionRupee
            size={30}
            className="text-yellow-400"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
                duration: 1.5,
                ease: "easeInOut",
            }}
        />
    )
}
