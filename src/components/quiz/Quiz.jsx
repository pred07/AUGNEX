import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, ChevronRight, AlertTriangle, ShieldCheck } from 'lucide-react';
import Button from '../ui/Button';
import CyberButton from '../ui/CyberButton';
import { cn } from '../../lib/utils';

const Quiz = ({ data, onComplete }) => {
    const [started, setStarted] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null); // null, true, false
    const [score, setScore] = useState(0);
    const [completed, setCompleted] = useState(false);

    const question = data.questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === data.questions.length - 1;

    const handleStart = () => setStarted(true);

    const handleOptionSelect = (index) => {
        if (selectedOption !== null) return; // Prevent changing answer
        setSelectedOption(index);

        const correct = index === question.correct;
        setIsCorrect(correct);
        if (correct) setScore(s => s + 1);
    };

    const handleNext = () => {
        if (isLastQuestion) {
            setCompleted(true);
        } else {
            setCurrentQuestionIndex(prev => prev + 1);
            setSelectedOption(null);
            setIsCorrect(null);
        }
    };

    const handleRetry = () => {
        setStarted(false);
        setCurrentQuestionIndex(0);
        setSelectedOption(null);
        setIsCorrect(null);
        setScore(0);
        setCompleted(false);
    };

    // Intro Screen
    if (!started) {
        return (
            <div className="bg-surface/30 border border-white/10 rounded-xl p-8 text-center space-y-6">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto text-primary border border-primary/50 shadow-[0_0_20px_rgba(0,255,157,0.2)] animate-pulse">
                    <ShieldCheck size={32} />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-white mb-2">KNOWLEDGE CHECK</h3>
                    <p className="text-gray-400 max-w-md mx-auto">
                        Verify your understanding of the material. You must score 100% to proceed to the next module.
                    </p>
                </div>
                <div className="flex items-center justify-center gap-8 text-sm font-mono text-gray-500">
                    <span>{data.questions.length} QUESTIONS</span>
                    <span>100% PASS RATE</span>
                </div>
                <CyberButton onClick={handleStart} className="w-full md:w-auto px-12 shadow-[0_0_20px_rgba(0,255,157,0.2)]">
                    INITIATE SEQUENCE
                </CyberButton>
            </div>
        );
    }

    // Results Screen
    if (completed) {
        const passed = score === data.questions.length;

        return (
            <div className={cn(
                "rounded-xl p-8 text-center space-y-6 border transition-all duration-500",
                passed ? "bg-primary/10 border-primary/50 shadow-[0_0_30px_rgba(0,255,157,0.15)]" : "bg-red-500/10 border-red-500/30"
            )}>
                <div className={cn(
                    "w-20 h-20 rounded-full flex items-center justify-center mx-auto border-4",
                    passed ? "bg-primary/20 border-primary text-primary" : "bg-red-500/20 border-red-500 text-red-500"
                )}>
                    {passed ? <CheckCircle2 size={40} /> : <XCircle size={40} />}
                </div>

                <div>
                    <h3 className="text-3xl font-orbitron font-bold text-white mb-2">
                        {passed ? "OBJECTIVE COMPLETE" : "MISSION FAILED"}
                    </h3>
                    <p className="text-gray-400">
                        {passed
                            ? "You have demonstrated mastery of the material. Proceeding to next objective."
                            : `Score: ${score}/${data.questions.length}. Mastery is required.`}
                    </p>
                </div>

                {passed ? (
                    <CyberButton onClick={onComplete} className="w-full md:w-auto px-12 animate-pulse shadow-[0_0_30px_rgba(0,255,157,0.4)]">
                        CONFIRM & PROCEED
                    </CyberButton>
                ) : (
                    <Button onClick={handleRetry} className="w-full md:w-auto px-12 bg-red-500/20 text-red-400 border-red-500/50 hover:bg-red-500/30 hover:text-red-300">
                        RETRY SIMULATION
                    </Button>
                )}
            </div>
        );
    }

    // Question Screen
    return (
        <div className="bg-surface/30 border border-white/10 rounded-xl p-6 md:p-8 min-h-[400px] flex flex-col justify-between">
            <div className="space-y-6">
                <div className="flex justify-between items-center text-xs font-mono text-gray-500 uppercase tracking-widest">
                    <span>Question {currentQuestionIndex + 1} / {data.questions.length}</span>
                    <span>Status: ACTIVE</span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-white leading-relaxed">
                    {question.question}
                </h3>

                <div className="space-y-3">
                    {question.options.map((option, idx) => {
                        const isSelected = selectedOption === idx;
                        let variantStyles = "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10";

                        if (isSelected) {
                            if (isCorrect) {
                                variantStyles = "bg-primary/20 border-primary text-primary shadow-[0_0_15px_rgba(0,255,157,0.3)]";
                            } else {
                                variantStyles = "bg-red-500/20 border-red-500 text-red-400";
                            }
                        } else if (selectedOption !== null && idx === question.correct) {
                            // Show correct answer if wrong one was picked
                            variantStyles = "bg-primary/10 border-primary/50 text-white opacity-50";
                        }

                        return (
                            <button
                                key={idx}
                                disabled={selectedOption !== null}
                                onClick={() => handleOptionSelect(idx)}
                                className={cn(
                                    "w-full text-left p-4 rounded-lg border transition-all duration-300 flex items-center justify-between group",
                                    (selectedOption === null) && "hover:border-primary/50 hover:pl-5",
                                    variantStyles
                                )}
                            >
                                <span>{option}</span>
                                {isSelected && (isCorrect ? <CheckCircle2 size={18} /> : <XCircle size={18} />)}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="pt-8 flex justify-end">
                <CyberButton
                    disabled={selectedOption === null}
                    onClick={handleNext}
                    className={cn(
                        "transition-all duration-300",
                        selectedOption === null ? "opacity-50 grayscale" : "opacity-100"
                    )}
                >
                    {isLastQuestion ? "FINISH" : "NEXT QUESTION"}
                </CyberButton>
            </div>
        </div>
    );
};

export default Quiz;
