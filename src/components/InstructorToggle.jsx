import { HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const InstructorToggle = ({ onClick, hasNewContent = false }) => {
    return (
        <motion.button
            onClick={onClick}
            className="fixed bottom-6 right-6 z-9990 w-16 h-16 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-200"
            style={{
                boxShadow: '0 0 20px rgba(0, 255, 255, 0.5), 0 0 40px rgba(0, 255, 255, 0.3)'
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title="Get help from AI Instructor"
        >
            <img src="/assets/character/onlyHead.png" alt="" className='-mt-1' />

            {/* Pulse animation */}
            <motion.div
                className="absolute inset-0 rounded-full border-2 border-cyan-400"
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.8, 0, 0.8]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* New content badge */}
            {hasNewContent && (
                <motion.div
                    className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"
                    animate={{
                        scale: [1, 1.2, 1]
                    }}
                    transition={{
                        duration: 1,
                        repeat: Infinity
                    }}
                />
            )}
        </motion.button>
    );
};
