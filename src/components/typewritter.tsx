
// import { motion } from "framer-motion";
// import { useEffect, useState, } from "react";

// const TypeWriter = ({ text, delay = 50 }: { text: string, delay?: number }) => {
//     const [displayText, setDisplayText] = useState("")
//     const [currentIndex, setCurrentIndex] = useState(0)

//     useEffect(() => {
//         if (currentIndex < text.length) {
//             const timeout = setTimeout(() => {
//                 setDisplayText(prev => prev + text[currentIndex])
//                 setCurrentIndex(prev => prev + 1)
//             }, delay)
//             return () => clearTimeout(timeout)
//         }
//     }, [currentIndex, text, delay])

//     return (
//         <span>
//             {displayText}
//             {currentIndex < text.length && (
//                 <motion.span
//                     animate={{ opacity: [1, 0] }}
//                     transition={{ duration: 0.5, repeat: Infinity }}
//                     className="text-primary"
//                 >
//                     |
//                 </motion.span>
//             )}
//         </span>
//     )
// }

// export default TypeWriter


import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const TypeWriter = ({
    text,
    delay = 50,
}: {
    text: string;
    delay?: number;
}) => {
    const ref = useRef<HTMLSpanElement | null>(null);
    const isInView = useInView(ref, { once: true });

    const [displayText, setDisplayText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!isInView) return;

        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayText((prev) => prev + text[currentIndex]);
                setCurrentIndex((prev) => prev + 1);
            }, delay);

            return () => clearTimeout(timeout);
        }
    }, [currentIndex, isInView, text, delay]);

    return (
        <span ref={ref}>
            {displayText}
            {isInView && currentIndex < text.length && (
                <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                    className="text-primary"
                >
                    |
                </motion.span>
            )}
        </span>
    );
};

export default TypeWriter;
