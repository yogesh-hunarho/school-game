// import { motion, AnimatePresence } from 'framer-motion';
// import { X, Volume2, Sparkles } from 'lucide-react';
// import { cn } from '@/lib/utils';

// const AchievementCollectionModal = ({ achievement, isOpen, onClose, onCollect }) => {
//     if (!achievement) return null;

//     console.log("asdsad", { achievement, isOpen, onClose, onCollect })

//     return (
//         <AnimatePresence>
//             {isOpen && (
//                 <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
//                     onClick={onClose}
//                 >
//                     {/* Animated Radial Background */}
//                     <div className="absolute inset-0 overflow-hidden">
//                         {/* Base gradient */}
//                         <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900" />

//                         {/* Rotating rays */}
//                         <motion.div
//                             animate={{ rotate: 360 }}
//                             transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//                             className="absolute inset-0"
//                             style={{
//                                 background: `repeating-conic-gradient(
//                                     from 0deg,
//                                     rgba(16, 185, 129, 0.3) 0deg,
//                                     rgba(16, 185, 129, 0.1) 10deg,
//                                     rgba(16, 185, 129, 0) 20deg,
//                                     rgba(16, 185, 129, 0.1) 30deg
//                                 )`
//                             }}
//                         />

//                         {/* Floating particles */}
//                         {[...Array(15)].map((_, i) => (
//                             <motion.div
//                                 key={i}
//                                 initial={{
//                                     x: Math.random() * window.innerWidth,
//                                     y: window.innerHeight + 50,
//                                     scale: Math.random() * 0.5 + 0.5
//                                 }}
//                                 animate={{
//                                     y: -100,
//                                     x: Math.random() * window.innerWidth,
//                                 }}
//                                 transition={{
//                                     duration: Math.random() * 3 + 2,
//                                     repeat: Infinity,
//                                     delay: Math.random() * 2,
//                                 }}
//                                 className={cn(
//                                     "absolute w-4 h-4 rounded-full",
//                                     i % 3 === 0 ? "bg-yellow-400" : i % 3 === 1 ? "bg-purple-400" : "bg-emerald-400"
//                                 )}
//                                 style={{
//                                     boxShadow: `0 0 20px currentColor`
//                                 }}
//                             />
//                         ))}
//                     </div>

//                     {/* Close and Sound buttons */}
//                     <div className="absolute top-6 left-6 flex gap-3 z-50">
//                         <button
//                             onClick={onClose}
//                             className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/80 transition-colors"
//                         >
//                             <X className="w-5 h-5" />
//                         </button>
//                         <button className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/80 transition-colors">
//                             <Volume2 className="w-5 h-5" />
//                         </button>
//                     </div>

//                     {/* Modal Content */}
//                     <motion.div
//                         initial={{ scale: 0.8, y: 50 }}
//                         animate={{ scale: 1, y: 0 }}
//                         exit={{ scale: 0.8, y: 50 }}
//                         transition={{ type: "spring", damping: 20 }}
//                         className="relative z-10 max-w-md w-full"
//                         onClick={(e) => e.stopPropagation()}
//                     >
//                         {/* Trophy/Badge Icon at top */}
//                         <motion.div
//                             initial={{ scale: 0, rotate: -180 }}
//                             animate={{ scale: 1, rotate: 0 }}
//                             transition={{ delay: 0.2, type: "spring", damping: 15 }}
//                             className="relative mb-6 flex justify-center"
//                         >
//                             <div className="relative">
//                                 {/* Glow effect */}
//                                 <div className="absolute inset-0 blur-2xl bg-yellow-400 scale-150 opacity-50" />

//                                 {/* Badge image */}
//                                 <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-yellow-400 shadow-[0_0_40px_rgba(250,204,21,0.6)]">
//                                     <img
//                                         src={achievement.image}
//                                         alt={achievement.title}
//                                         className="w-full h-full object-cover"
//                                     />
//                                 </div>

//                                 {/* Sparkle decorations */}
//                                 <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-yellow-400 animate-pulse" />
//                             </div>
//                         </motion.div>

//                         {/* Win label */}
//                         <motion.div
//                             initial={{ opacity: 0, y: -20 }}
//                             animate={{ opacity: 1, y: 0 }}
//                             transition={{ delay: 0.3 }}
//                             className="text-center mb-4"
//                         >
//                             <div className="inline-block bg-purple-900/80 backdrop-blur-md border-2 border-purple-500 px-8 py-2 rounded-full">
//                                 <span className="text-white font-bold text-sm uppercase tracking-wider">
//                                     Achievement Unlocked!
//                                 </span>
//                             </div>
//                         </motion.div>

//                         {/* Main reward card */}
//                         <motion.div
//                             initial={{ opacity: 0, scale: 0.9 }}
//                             animate={{ opacity: 1, scale: 1 }}
//                             transition={{ delay: 0.4 }}
//                             className="relative"
//                         >
//                             {/* Purple outer frame */}
//                             <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 p-1 rounded-3xl shadow-2xl">
//                                 {/* Inner black card */}
//                                 <div className="bg-black/90 backdrop-blur-xl rounded-3xl p-8 border-2 border-purple-500/50">
//                                     <div className="text-center">
//                                         <h3 className="text-white text-xl font-black mb-2">
//                                             {achievement.title}
//                                         </h3>
//                                         <p className="text-yellow-400 text-lg font-bold leading-relaxed">
//                                             {achievement.description}
//                                         </p>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Collect button */}
//                             <motion.div
//                                 initial={{ opacity: 0, y: 20 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ delay: 0.6 }}
//                                 className="mt-6 flex justify-center"
//                             >
//                                 <button
//                                     onClick={() => {
//                                         onCollect();
//                                         onClose();
//                                     }}
//                                     className="relative px-12 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full font-black text-lg uppercase tracking-wider text-black shadow-[0_0_30px_rgba(250,204,21,0.5)] hover:scale-105 active:scale-95 transition-transform overflow-hidden group"
//                                 >
//                                     <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
//                                     <span className="relative z-10">Collect</span>
//                                 </button>
//                             </motion.div>
//                         </motion.div>
//                     </motion.div>
//                 </motion.div>
//             )}
//         </AnimatePresence>
//     );
// };

// export default AchievementCollectionModal;


import { motion, AnimatePresence } from "framer-motion"
import { X, Volume2, Sparkles } from "lucide-react"
import { RewardBackdrop } from "../ui/cyber-component/reward-backdrop"
import AchivementAnimatedBackground from "../ui/cyber-component/achiment-background"
import CyberpunkButton from "../ui/cyber-button"

const AchievementCollectionModal = ({
    achievement,
    isOpen,
    onClose,
    onCollect,
}) => {
    if (!achievement) return null

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-9999 flex items-center justify-center p-4 backdrop-blur-md bg-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <AchivementAnimatedBackground variant="warp" intensity="high" />
                    <div className="absolute inset-0 bg-transparent" />
                    {/* Modal Content */}
                    <motion.div
                        className="relative z-10 max-w-md w-full"
                        initial={{ scale: 0.85, y: 40 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.85, y: 40 }}
                        transition={{ type: "spring", damping: 18 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Badge */}
                        <motion.div
                            className="flex justify-center mb-6"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", damping: 14 }}
                        >
                            <div className="relative">
                                <div className="absolute inset-0 blur-2xl bg-yellow-400/40 scale-150" />

                                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-yellow-400">
                                    <img
                                        src={achievement.image}
                                        alt={achievement.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <Sparkles className="absolute -top-2 -right-2 w-7 h-7 text-yellow-400 animate-pulse" />
                            </div>
                        </motion.div>

                        {/* Title */}
                        <div className="text-center mb-4">
                            <div className="inline-block bg-purple-900/80 border border-purple-500 px-6 py-2 ">
                                <span className="text-white text-sm font-bold uppercase tracking-wide">
                                    Achievement Unlocked
                                </span>
                            </div>
                        </div>

                        {/* Card */}
                        <div className="bg-linear-to-br from-purple-600 to-purple-800 p-1">
                            <div className="bg-black/90 p-8 text-center">
                                <h3 className="text-white text-xl font-black mb-2">
                                    {achievement.title}
                                </h3>
                                <p className="text-yellow-400 font-bold">
                                    {achievement.description}
                                </p>
                            </div>
                        </div>

                        {/* Collect Button */}
                        <div className="mt-6 flex justify-center">
                            <CyberpunkButton
                                variant="primary"
                                onClick={() => {
                                    onCollect()
                                    onClose()
                                }}>
                                Collect
                            </CyberpunkButton>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

function IconButton({ children, onClick }) {
    return (
        <button
            onClick={onClick}
            className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center"
        >
            {children}
        </button>
    )
}

export default AchievementCollectionModal
