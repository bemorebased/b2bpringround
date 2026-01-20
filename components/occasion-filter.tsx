"use client";

import { useState } from "react";
import {
    Briefcase,
    Cake,
    Users,
    Gift,
    GraduationCap
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type OccasionType = "exhibitions" | "birthday" | "teambuilding" | "seasonal" | "training";

const occasions: { id: OccasionType; title: string; icon: any; color: string; bgColor: string }[] = [
    {
        id: "exhibitions",
        title: "Изложения и панаири",
        icon: Briefcase,
        color: "text-blue-600",
        bgColor: "bg-blue-50",
    },
    {
        id: "birthday",
        title: "Рожден ден на фирмата",
        icon: Cake,
        color: "text-pink-600",
        bgColor: "bg-pink-50",
    },
    {
        id: "teambuilding",
        title: "Тийм билдинг и събития",
        icon: Users,
        color: "text-green-600",
        bgColor: "bg-green-50",
    },
    {
        id: "seasonal",
        title: "Сезонни подаръци",
        icon: Gift,
        color: "text-red-600",
        bgColor: "bg-red-50",
    },
    {
        id: "training",
        title: "Обучения и нов семестър",
        icon: GraduationCap,
        color: "text-purple-600",
        bgColor: "bg-purple-50",
    },
];

interface OccasionFilterProps {
    onSelect: (id: OccasionType) => void;
    selected: OccasionType | null;
}

export function OccasionFilter({ onSelect, selected }: OccasionFilterProps) {
    const handleSelect = (id: OccasionType) => {
        onSelect(id);
        const packagesSection = document.getElementById("packages");
        if (packagesSection) {
            packagesSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section id="occasions" className="py-20 bg-white shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05)] transition-colors duration-700">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        Ние имаме решения!
                    </h2>
                    <p className="mt-4 text-lg text-slate-600">
                        Изберете категория, за да видите нашите предложения
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-3 md:gap-4 lg:gap-6">
                    {occasions.map((occasion) => {
                        const isSelected = selected === occasion.id;
                        return (
                            <button
                                key={occasion.id}
                                onClick={() => handleSelect(occasion.id)}
                                className={cn(
                                    "group relative flex items-center gap-2 rounded-full px-5 py-3 transition-all duration-300 outline-none ring-offset-2 focus:ring-2",
                                    isSelected
                                        ? "bg-slate-900 text-white shadow-lg scale-105"
                                        : "bg-white text-slate-600 shadow-sm hover:bg-slate-100 hover:text-slate-900 hover:shadow-md border border-slate-200"
                                )}
                            >
                                <occasion.icon
                                    className={cn(
                                        "h-5 w-5 transition-transform duration-300 group-hover:scale-110",
                                        isSelected ? "text-amber-400" : "text-slate-400 group-hover:text-slate-600"
                                    )}
                                />
                                <span className={cn(
                                    "text-sm font-bold tracking-wide",
                                    isSelected ? "text-white" : "text-slate-600"
                                )}>
                                    {occasion.title}
                                </span>
                                {isSelected && (
                                    <span className="absolute -bottom-2 left-1/2 h-1 w-12 -translate-x-1/2 rounded-full bg-slate-900/0"></span>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
