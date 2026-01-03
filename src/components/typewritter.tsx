
import { motion } from "framer-motion";
import { useEffect, useState, } from "react";

const TypeWriter = ({ text, delay = 50 }: { text: string, delay?: number }) => {
    const [displayText, setDisplayText] = useState("")
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayText(prev => prev + text[currentIndex])
                setCurrentIndex(prev => prev + 1)
            }, delay)
            return () => clearTimeout(timeout)
        }
    }, [currentIndex, text, delay])

    return (
        <span>
            {displayText}
            {currentIndex < text.length && (
                <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="text-primary"
                >
                    |
                </motion.span>
            )}
        </span>
    )
}

export default TypeWriter