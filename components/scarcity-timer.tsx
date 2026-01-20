"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ScarcityTimer() {
    const [isVisible, setIsVisible] = useState(false);
    const [timeLeft, setTimeLeft] = useState<number | null>(null);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [hasTriggered, setHasTriggered] = useState(false);

    // Timer Duration: 60 minutes in seconds
    const TIMER_DURATION = 60 * 60;

    useEffect(() => {
        // Check for existing timer or start new one
        const now = Math.floor(Date.now() / 1000);
        const storedStart = localStorage.getItem("offer_start_timestamp");

        let startTime;

        if (storedStart) {
            startTime = parseInt(storedStart);
        } else {
            startTime = now;
            localStorage.setItem("offer_start_timestamp", startTime.toString());
        }

        const elapsed = now - startTime;
        const remaining = TIMER_DURATION - elapsed;

        if (remaining > 0) {
            setTimeLeft(remaining);
        } else {
            setTimeLeft(0);
        }

        // Timer Interval
        const interval = setInterval(() => {
            if (remaining <= 0) {
                clearInterval(interval);
                return;
            }

            const currentNow = Math.floor(Date.now() / 1000);
            const currentRemaining = TIMER_DURATION - (currentNow - startTime);

            if (currentRemaining <= 0) {
                setTimeLeft(0);
                setIsVisible(false); // Hide if expired
                clearInterval(interval);
            } else {
                setTimeLeft(currentRemaining);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // Scroll Direction & Exit Intent Detection
    useEffect(() => {
        if (timeLeft === 0 || hasTriggered) return;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Show only if we've scrolled down a bit (e.g., 300px) and then started scrolling up
            if (currentScrollY > 300 && currentScrollY < lastScrollY && !isVisible && !hasTriggered) {
                setIsVisible(true);
                setHasTriggered(true); // Don't auto-trigger again to avoid annoyance
            }

            setLastScrollY(currentScrollY);
        };

        const handleMouseLeave = (e: MouseEvent) => {
            if (e.clientY <= 0 && !isVisible && !hasTriggered) {
                setIsVisible(true);
                setHasTriggered(true);
            }
        };

        window.addEventListener("scroll", handleScroll);
        document.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [lastScrollY, isVisible, timeLeft, hasTriggered]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, "0")}`;
    };

    if (timeLeft === null || timeLeft <= 0) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    className="fixed top-0 left-0 right-0 z-[100] bg-slate-900 border-b border-amber-500/30 p-3 shadow-[0_10px_40px_rgba(0,0,0,0.3)]"
                >
                    <div className="container mx-auto max-w-6xl flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4 flex-1">
                            {/* Animated Pulse Icon - Hidden on mobile, visible on sm+ */}
                            <div className="hidden sm:flex relative h-9 w-9 items-center justify-center rounded-full bg-amber-500/10 shrink-0">
                                <div className="absolute inset-0 rounded-full bg-amber-500/20 animate-ping"></div>
                                <Clock className="h-4 w-4 text-amber-500" />
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
                                <span className="flex items-center gap-1.5 text-amber-500 font-bold uppercase tracking-wider text-[10px] sm:text-xs leading-none mb-1 sm:mb-0">
                                    <AlertCircle className="h-3 w-3" />
                                    Ексклузивна Оферта
                                </span>
                                <div className="flex items-center flex-wrap gap-x-2 text-white font-bold text-sm sm:text-base leading-tight">
                                    <span>Вземи оферта до</span>
                                    <span className="text-amber-400 font-mono text-base sm:text-lg min-w-[50px] text-center bg-slate-800/50 rounded px-1.5 py-0.5 border border-amber-500/20">{formatTime(timeLeft)}</span>
                                    <span>мин за <span className="text-amber-400 text-base sm:text-lg whitespace-nowrap">5% отстъпка</span></span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                            <Button
                                size="sm"
                                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold whitespace-nowrap text-xs sm:text-sm h-8 sm:h-9"
                                onClick={() => {
                                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                                }}
                            >
                                Грабни Офертата
                            </Button>
                            <button
                                onClick={() => setIsVisible(false)}
                                className="p-1.5 text-slate-500 hover:text-white transition-colors hover:bg-slate-800 rounded-full"
                            >
                                <X className="h-4 w-4 sm:h-5 sm:w-5" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
