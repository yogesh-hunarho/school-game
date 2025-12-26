import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, ArrowLeft, Trophy } from "lucide-react";
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
    {
        id: 4,
        question: "True or False: Design Thinking is a linear process.",
        options: ["True", "False"],
        correct: 1
    },
    {
        id: 5,
        question: "In which phase do you gather feedback from users?",
        options: ["Test", "Ideate", "Empathize", "Define"],
        correct: 0
    }
];

export const QuizModal = ({ open, onOpenChange }) => {
    const {
        selectedQuiz,
        closeQuizModal,
        completeQuiz,
        player,
        isQuizCompleted
    } = useLMSStore();

    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
    const [answers, setAnswers] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const { playClick, playClose } = useSound();

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

    const handleSubmit = () => {
        let correctCount = 0;
        questions.forEach((q, idx) => {
            if (answers[idx] === q.correct) correctCount++;
        });

        const calculatedScore = Math.round((correctCount / totalQuestions) * 100);
        setScore(calculatedScore);
        setIsSubmitted(true);
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
            <DialogContent className="max-w-2xl p-0 overflow-hidden shadow-none ring-0">
                <div className="bg-slate-950/80 p-6 md:p-8 min-h-[500px] flex flex-col relative">
                    {/* Header */}
                    <DialogHeader className="flex flex-row items-center justify-between mb-8 space-y-0">
                        <div>
                            <DialogTitle className="text-xl font-bold text-white mb-1">{selectedQuiz.title}</DialogTitle>
                            <p className="text-sm text-white/50">Question {currentQuestionIdx + 1} of {totalQuestions}</p>
                        </div>
                    </DialogHeader>

                    {/* Content */}
                    <div className="flex-1">
                        {!isSubmitted && !alreadyCompleted ? (
                            <div className="space-y-6">
                                {/* Question */}
                                <div className="text-lg text-white font-medium leading-relaxed">
                                    {currentQuestion.question}
                                </div>

                                {/* Options */}
                                <div className="space-y-3">
                                    {currentQuestion.options.map((option, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleOptionSelect(idx)}
                                            className={cn(
                                                "w-full p-4 rounded-xl border text-left transition-all relative overflow-hidden group",
                                                answers[currentQuestionIdx] === idx
                                                    ? "bg-cyan-500/20 border-cyan-500 text-white shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                                                    : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20"
                                            )}
                                        >
                                            <span className={cn(
                                                "inline-flex w-6 h-6 rounded-full border text-xs items-center justify-center mr-3 transition-colors",
                                                answers[currentQuestionIdx] === idx
                                                    ? "bg-cyan-500 border-cyan-500 text-black font-bold"
                                                    : "border-white/30 text-white/50"
                                            )}>
                                                {String.fromCharCode(65 + idx)}
                                            </span>
                                            {option}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="w-24 h-24 rounded-full bg-linear-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-[0_0_30px_rgba(251,191,36,0.4)]"
                                >
                                    <Trophy className="w-12 h-12 text-white" />
                                </motion.div>

                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-2">
                                        {alreadyCompleted ? "Quiz Completed!" : "Quiz Submitted!"}
                                    </h2>
                                    <p className="text-white/60">
                                        You scored <span className="text-cyan-400 font-bold text-xl">{alreadyCompleted ? "100" : score}%</span>
                                    </p>
                                </div>

                                <div className="p-4 rounded-xl bg-white/5 border border-white/10 max-w-sm w-full">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-white/60">XP Earned</span>
                                        <span className="text-yellow-400 font-bold">+{selectedQuiz.xp} XP</span>
                                    </div>
                                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-yellow-400 w-full" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer / Navigation */}
                    <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center">
                        <button
                            onClick={handlePrev}
                            disabled={currentQuestionIdx === 0 || isSubmitted || alreadyCompleted}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                                currentQuestionIdx === 0 || isSubmitted || alreadyCompleted
                                    ? "text-white/20 cursor-not-allowed"
                                    : "text-white/70 hover:text-white hover:bg-white/10"
                            )}
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Previous
                        </button>

                        {isSubmitted || alreadyCompleted ? (
                            <button
                                onClick={closeQuizModal}
                                className="px-6 py-2 rounded-lg bg-cyan-500 text-black font-bold hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20"
                            >
                                Close
                            </button>
                        ) : (
                            currentQuestionIdx === totalQuestions - 1 ? (
                                <button
                                    onClick={handleSubmit}
                                    disabled={Object.keys(answers).length < totalQuestions}
                                    className={cn(
                                        "px-6 py-2 rounded-lg font-bold transition-all shadow-lg flex items-center gap-2",
                                        Object.keys(answers).length < totalQuestions
                                            ? "bg-slate-700 text-white/30 cursor-not-allowed"
                                            : "bg-green-500 text-white hover:bg-green-400 shadow-green-500/20"
                                    )}
                                >
                                    Submit <CheckCircle2 className="w-4 h-4" />
                                </button>
                            ) : (
                                <button
                                    onClick={handleNext}
                                    disabled={answers[currentQuestionIdx] === undefined}
                                    className={cn(
                                        "flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all",
                                        answers[currentQuestionIdx] === undefined
                                            ? "bg-slate-800 text-white/30 cursor-not-allowed"
                                            : "bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/50"
                                    )}
                                >
                                    Next <ArrowRight className="w-4 h-4" />
                                </button>
                            )
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
