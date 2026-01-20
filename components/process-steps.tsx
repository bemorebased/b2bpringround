"use client";

import { useEffect, useRef, useState } from "react";
import {
    Search,
    Palette,
    Truck,
    PackageCheck
} from "lucide-react";

const STEPS = [
    {
        title: "1. Избирате повод",
        description: "Разгледайте нашите куратирани селекции за събития или сезонни празници.",
        icon: Search,
        color: "bg-blue-600",
    },
    {
        title: "2. Персонализираме",
        description: "Нашите дизайнери адаптират всеки продукт с вашето лого и бранд идентичност.",
        icon: Palette,
        color: "bg-purple-600",
    },
    {
        title: "3. Произвеждаме",
        description: "Висококачествен печат и брандиране с внимание към всеки детайл.",
        icon: PackageCheck,
        color: "bg-emerald-600",
    },
    {
        title: "4. Доставяме",
        description: "Готовите пакети пристигат при вас или директно до офисите на партньорите.",
        icon: Truck,
        color: "bg-amber-600",
    },
];

export function ProcessSteps() {
    const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
    const [isAnimating, setIsAnimating] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    const playAnimation = () => {
        if (isAnimating) return; // Prevent overlapping animations

        setIsAnimating(true);
        setVisibleSteps([]); // Reset all steps

        // Animate steps one by one
        STEPS.forEach((_, index) => {
            setTimeout(() => {
                setVisibleSteps((prev) => [...prev, index]);
            }, index * 400);
        });

        // Mark animation as complete after all steps are done
        setTimeout(() => {
            setIsAnimating(false);
        }, STEPS.length * 400 + 700);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        playAnimation();
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="py-20 bg-white cursor-pointer"
            onMouseEnter={playAnimation}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-16 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        Как работим?
                    </h2>
                    <p className="mt-4 text-lg text-slate-600">
                        Опростен процес в 4 лесни стъпки
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-4 relative">
                    {/* Animated Connecting Line (Desktop Only) */}
                    <div className="absolute top-12 left-0 hidden w-full -translate-y-1/2 md:block overflow-hidden">
                        <div
                            className="h-0.5 bg-gradient-to-r from-blue-600 via-purple-600 via-emerald-600 to-amber-600 transition-all"
                            style={{
                                width: visibleSteps.length > 0 ? '100%' : '0%',
                                transitionDuration: '2s',
                            }}
                        />
                    </div>

                    {STEPS.map((step, index) => {
                        const isVisible = visibleSteps.includes(index);

                        return (
                            <div
                                key={index}
                                className={`relative flex flex-col items-center text-center transition-all duration-700 ${isVisible
                                        ? 'opacity-100 translate-y-0'
                                        : 'opacity-0 translate-y-8'
                                    }`}
                            >
                                {/* Animated Icon Circle */}
                                <div className={`z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-full border-4 border-white ${step.color} text-white shadow-lg transition-all duration-500 ${isVisible
                                        ? 'scale-100 rotate-0'
                                        : 'scale-0 rotate-180'
                                    }`}>
                                    <step.icon className="h-8 w-8" />
                                </div>

                                {/* Step Content */}
                                <h3 className="mb-2 text-xl font-bold text-slate-900">{step.title}</h3>
                                <p className="max-w-xs text-sm text-slate-600">{step.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
