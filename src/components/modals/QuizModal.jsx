import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, ArrowLeft, Trophy, Zap, Check } from "lucide-react";
import { useLMSStore } from "@/store/lms-store";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useSound } from "@/hook/useSound";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

const mockQuestions = [
    {
        id: 1,
        question: "What is the first step of Design Thinking?",
        options: ["Define", "Ideate", "Empathize", "Prototype"],
        correct: 2
    },
    {
        id: 2,
        question: "Which phase involves creating a physical representation of your idea?",
        options: ["Testing", "Prototype", "Ideate", "Define"],
        correct: 1
    },
    {
        id: 3,
        question: "What is the main goal of the Empathize phase?",
        options: ["To sell the product", "To understand user needs", "To build the solution", "To fix bugs"],
        correct: 1
    },
    // {
    //     id: 4,
    //     question: "True or False: Design Thinking is a linear process.",
    //     options: ["True", "False"],
    //     correct: 1
    // },
    // {
    //     id: 5,
    //     question: "In which phase do you gather feedback from users?",
    //     options: ["Test", "Ideate", "Empathize", "Define"],
    //     correct: 0
    // }
];

export const QuizModal = ({ open, onOpenChange }) => {
    const {
        selectedQuiz,
        closeQuizModal,
        completeQuiz,
        player,
        isQuizCompleted,
        toggleVideoQuizConfetti
    } = useLMSStore();
    const triggerStarAnimation = useLMSStore((s) => s.triggerStarAnimation);

    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
    const [answers, setAnswers] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const { playClick, playClose, playSound } = useSound();

    // Reset state when modal opens
    useEffect(() => {
        if (open) {
            setCurrentQuestionIdx(0);
            setAnswers({});
            setIsSubmitted(false);
            setScore(0);
        }
    }, [open]);

    if (!selectedQuiz) return null;

    const questions = mockQuestions;
    const currentQuestion = questions[currentQuestionIdx];
    const totalQuestions = questions.length;

    // Check if already completed
    const alreadyCompleted = isQuizCompleted(player.currentModuleId, selectedQuiz.id);

    const handleOptionSelect = (optionIdx) => {
        if (isSubmitted || alreadyCompleted) return;
        playClick();
        setAnswers(prev => ({ ...prev, [currentQuestionIdx]: optionIdx }));
    };

    const handleNext = () => {
        playClick();
        if (currentQuestionIdx < totalQuestions - 1) {
            setCurrentQuestionIdx(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        playClick();
        if (currentQuestionIdx > 0) {
            setCurrentQuestionIdx(prev => prev - 1);
        }
    };

    const handleSubmit = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        let correctCount = 0;
        questions.forEach((q, idx) => {
            if (answers[idx] === q.correct) correctCount++;
        });

        const calculatedScore = Math.round((correctCount / totalQuestions) * 100);
        setScore(calculatedScore);
        setIsSubmitted(true);
        triggerStarAnimation(
            {
                x: rect.left + rect.width / 2,
                y: (rect.top - 30) + rect.height / 2,
            },
            selectedQuiz.xp
        );

        // toggleVideoQuizConfetti(true);
        // setTimeout(() => {
        //     toggleVideoQuizConfetti(false);
        // }, 3000);
        completeQuiz(player.currentModuleId, selectedQuiz.id);
    };

    const handleCloseModal = (open) => {
        if (!open) {
            playClose();
            onOpenChange(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleCloseModal}>
            <DialogContent className="w-full md:min-w-6xl p-0 overflow-hidden shadow-none ring-0 border-none bg-transparent">
                <div className="relative bg-slate-950/98">
                    {/* Scanline overlay */}
                    <div className="pointer-events-none absolute inset-0 z-30 opacity-[0.02] bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,255,255,0.1)_2px,rgba(0,255,255,0.1)_4px)]" />

                    {/* Main border */}
                    <div className="absolute inset-0 border border-yellow-400/30" />

                    {/* Corner brackets */}
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-yellow-400" />
                    <div className="absolute top-0 left-6 w-4 h-[2px] bg-yellow-400" />
                    <div className="absolute top-6 left-0 w-[2px] h-4 bg-yellow-400" />

                    <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-yellow-400" />
                    <div className="absolute top-0 right-6 w-4 h-[2px] bg-yellow-400" />
                    <div className="absolute top-6 right-0 w-[2px] h-4 bg-yellow-400" />

                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-yellow-400" />
                    <div className="absolute bottom-0 left-6 w-4 h-[2px] bg-yellow-400" />
                    <div className="absolute bottom-6 left-0 w-[2px] h-4 bg-yellow-400" />

                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-yellow-400" />
                    <div className="absolute bottom-0 right-6 w-4 h-[2px] bg-yellow-400" />
                    <div className="absolute bottom-6 right-0 w-[2px] h-4 bg-yellow-400" />

                    <div className="relative z-10 p-6 md:p-8 min-h-[500px] flex flex-col">
                        {/* Header */}
                        <DialogHeader className="flex flex-row items-center justify-between mb-6 space-y-0">
                            <div>
                                <DialogTitle className="text-lg font-bold text-yellow-400 mb-1 uppercase tracking-wide">
                                    {selectedQuiz.title}
                                </DialogTitle>
                                {!isSubmitted && !alreadyCompleted && (
                                    <p className="text-[11px] text-slate-500 font-mono uppercase tracking-widest">
                                        QUERY {currentQuestionIdx + 1} OF {totalQuestions}
                                    </p>
                                )}
                            </div>
                        </DialogHeader>

                        {/* Content Grid */}
                        <div className="flex-1 overflow-hidden">
                            {!isSubmitted && !alreadyCompleted ? (
                                <div className="flex flex-col md:grid md:grid-cols-4 gap-4 md:gap-6 h-full">
                                    {/* Mobile: Question Grid Navigation (Top) */}
                                    <div className="md:hidden border-b border-cyan-400/10 pb-4">
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Question Matrix</h3>
                                            <div className="text-[10px] text-slate-500 font-mono flex gap-3">
                                                <span>STATUS: <span className="text-cyan-400">{Object.keys(answers).length === totalQuestions ? "READY" : "INCOMPLETE"}</span></span>
                                                <span>PROGRESS: <span className="text-cyan-400">{Math.round((Object.keys(answers).length / totalQuestions) * 100)}%</span></span>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-cyan-400/20">
                                            {questions.map((_, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => {
                                                        playClick();
                                                        setCurrentQuestionIdx(i);
                                                    }}
                                                    className={cn(
                                                        "relative shrink-0 w-9 h-9 flex items-center justify-center text-[11px] font-bold transition-all",
                                                        currentQuestionIdx === i
                                                            ? "bg-yellow-400 text-slate-900 shadow-[0_0_10px_rgba(250,204,21,0.3)]"
                                                            : answers[i] !== undefined
                                                                ? "bg-cyan-400/20 border border-cyan-400/40 text-cyan-400"
                                                                : "bg-slate-900/60 border border-slate-700/50 text-slate-500"
                                                    )}
                                                >
                                                    {answers[i] !== undefined && currentQuestionIdx !== i ? (
                                                        <Check className="w-3.5 h-3.5" />
                                                    ) : (
                                                        i + 1
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Question & Options Column */}
                                    <div className="md:col-span-3 space-y-4 md:space-y-6 flex-1">
                                        {/* Question */}
                                        <div className="relative p-4 md:p-5 border border-cyan-400/30 bg-slate-900/50">
                                            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-400" />
                                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-400" />
                                            <p className="text-sm md:text-base text-cyan-50 font-medium leading-relaxed">
                                                {currentQuestion.question}
                                            </p>
                                        </div>

                                        {/* Options */}
                                        <div className="space-y-2 md:space-y-3">
                                            {currentQuestion.options.map((option, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => handleOptionSelect(idx)}
                                                    className={cn(
                                                        "relative w-full p-3 md:p-4 text-left transition-all group",
                                                        answers[currentQuestionIdx] === idx
                                                            ? "bg-yellow-400/10 border border-yellow-400 text-yellow-400"
                                                            : "bg-slate-900/60 border border-cyan-400/20 text-slate-300 hover:border-cyan-400/50"
                                                    )}
                                                >
                                                    {/* Corner accents */}
                                                    <div className={cn(
                                                        "absolute top-0 left-0 w-2 h-2 border-t border-l transition-colors",
                                                        answers[currentQuestionIdx] === idx ? "border-yellow-400" : "border-cyan-400/30 group-hover:border-cyan-400"
                                                    )} />
                                                    <div className={cn(
                                                        "absolute bottom-0 right-0 w-2 h-2 border-b border-r transition-colors",
                                                        answers[currentQuestionIdx] === idx ? "border-yellow-400" : "border-cyan-400/30 group-hover:border-cyan-400"
                                                    )} />

                                                    <div className="flex items-center gap-2 md:gap-3">
                                                        <span className={cn(
                                                            "inline-flex w-6 h-6 md:w-7 md:h-7 text-[11px] md:text-[12px] font-bold items-center justify-center transition-colors flex-shrink-0",
                                                            answers[currentQuestionIdx] === idx
                                                                ? "bg-yellow-400 text-slate-900"
                                                                : "bg-cyan-400/20 text-cyan-400"
                                                        )}>
                                                            {String.fromCharCode(64 + (idx + 1))}
                                                        </span>
                                                        <span className="text-xs md:text-sm uppercase tracking-wide">{option}</span>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Desktop: Right Column - Question Grid Navigation */}
                                    <div className="md:col-span-1 border-l border-cyan-400/10 pl-6 hidden md:block">
                                        <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">Question Matrix</h3>
                                        <div className="grid grid-cols-4 gap-2">
                                            {questions.map((_, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => {
                                                        playClick();
                                                        setCurrentQuestionIdx(i);
                                                    }}
                                                    className={cn(
                                                        "relative aspect-square flex items-center justify-center text-[10px] font-bold transition-all",
                                                        currentQuestionIdx === i
                                                            ? "bg-yellow-400 text-slate-900 shadow-[0_0_10px_rgba(250,204,21,0.3)]"
                                                            : answers[i] !== undefined
                                                                ? "bg-cyan-400/20 border border-cyan-400/40 text-cyan-400"
                                                                : "bg-slate-900/60 border border-slate-700/50 text-slate-500 hover:border-slate-500"
                                                    )}
                                                >
                                                    {answers[i] !== undefined && currentQuestionIdx !== i ? (
                                                        <Check className="w-3 h-3" />
                                                    ) : (
                                                        i + 1
                                                    )}
                                                </button>
                                            ))}
                                        </div>

                                        {/* Status Messages */}
                                        <div className="mt-8 space-y-4">
                                            <div className="text-[10px] text-slate-500 font-mono space-y-1">

                                                <div className="flex justify-between">
                                                    <span>PROGRESS:</span>
                                                    <span className="text-cyan-400">{Math.round((Object.keys(answers).length / totalQuestions) * 100)}%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-center space-y-6 py-8">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="relative w-20 h-20 bg-yellow-400 flex items-center justify-center shadow-[0_0_30px_rgba(250,204,21,0.4)]"
                                    >
                                        <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-yellow-400" />
                                        <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-yellow-400" />
                                        <Trophy className="w-10 h-10 text-slate-900" />
                                    </motion.div>

                                    <div>
                                        <h2 className="text-xl font-bold text-yellow-400 mb-2 uppercase tracking-wide">
                                            {alreadyCompleted ? "PROTOCOL COMPLETE" : "DATA SUBMITTED"}
                                        </h2>
                                        <p className="text-slate-400 text-sm">
                                            ACCURACY RATING: <span className="text-cyan-400 font-bold text-lg">{alreadyCompleted ? "100" : score}%</span>
                                        </p>
                                    </div>

                                    <div className="relative p-4 border border-yellow-400/30 bg-slate-900/50 max-w-sm w-full">
                                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-yellow-400" />
                                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-yellow-400" />

                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-[10px] text-slate-500 uppercase tracking-widest">Coin ACQUIRED</span>
                                            <span className="text-yellow-400 font-bold flex items-center gap-1">
                                                <Zap className="w-3.5 h-3.5" />
                                                +{selectedQuiz.xp} Coin
                                            </span>
                                        </div>
                                        <div className="relative h-1.5 bg-slate-800 overflow-hidden">
                                            <motion.div
                                                className="h-full bg-yellow-400"
                                                initial={{ width: 0 }}
                                                animate={{ width: "100%" }}
                                                transition={{ duration: 1, ease: "easeOut" }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer / Navigation */}
                        <div className="mt-6 pt-4 border-t border-cyan-400/20 flex justify-between items-center">
                            <button
                                onClick={handlePrev}
                                disabled={currentQuestionIdx === 0 || isSubmitted || alreadyCompleted}
                                className={cn(
                                    "flex items-center gap-2 px-4 py-2 text-[11px] font-bold uppercase tracking-widest transition-colors",
                                    currentQuestionIdx === 0 || isSubmitted || alreadyCompleted
                                        ? "text-slate-600 cursor-not-allowed"
                                        : "text-slate-400 hover:text-cyan-400"
                                )}
                            >
                                <ArrowLeft className="w-3.5 h-3.5" />
                                PREV
                            </button>

                            {isSubmitted || alreadyCompleted ? (
                                <button
                                    onClick={closeQuizModal}
                                    className="relative px-6 py-2.5 bg-cyan-400 text-slate-900 font-bold text-xs uppercase tracking-widest hover:bg-cyan-300 transition-colors shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                                >
                                    <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-slate-900" />
                                    <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-slate-900" />
                                    CLOSE
                                </button>
                            ) : (
                                currentQuestionIdx === totalQuestions - 1 ? (
                                    <button
                                        onClick={handleSubmit}
                                        disabled={Object.keys(answers).length < totalQuestions}
                                        className={cn(
                                            "relative flex items-center gap-2 px-6 py-2.5 font-bold text-xs uppercase tracking-widest transition-all",
                                            Object.keys(answers).length < totalQuestions
                                                ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                                                : "bg-emerald-400 text-slate-900 hover:bg-emerald-300 shadow-[0_0_15px_rgba(52,211,153,0.3)]"
                                        )}
                                    >
                                        <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-slate-900" />
                                        <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-slate-900" />
                                        SUBMIT <CheckCircle2 className="w-3.5 h-3.5" />
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleNext}
                                        disabled={answers[currentQuestionIdx] === undefined}
                                        className={cn(
                                            "relative flex items-center gap-2 px-6 py-2.5 font-bold text-xs uppercase tracking-widest transition-all",
                                            answers[currentQuestionIdx] === undefined
                                                ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                                                : "bg-cyan-400/10 border border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/20"
                                        )}
                                    >
                                        NEXT <ArrowRight className="w-3.5 h-3.5" />
                                    </button>
                                )
                            )}
                        </div>
                    </div>

                    {/* Bottom accent */}
                    <div className="absolute bottom-0 left-8 right-8 h-0.5 bg-yellow-400/30" />
                </div>
            </DialogContent>
        </Dialog>
    );
};
