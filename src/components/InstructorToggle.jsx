import { HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * InstructorToggle Component
 * Floating help button to manually trigger the instructor
 */
export const InstructorToggle = ({ onClick, hasNewContent = false }) => {
    return (
        <motion.button
            onClick={onClick}
            className="fixed bottom-6 left-6 z-[9990] w-14 h-14 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 
                 flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-200"
            style={{
                boxShadow: '0 0 20px rgba(0, 255, 255, 0.5), 0 0 40px rgba(0, 255, 255, 0.3)'
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title="Get help from AI Instructor"
        >
            <HelpCircle className="w-7 h-7 text-white" />

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
