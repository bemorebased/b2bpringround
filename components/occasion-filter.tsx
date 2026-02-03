"use client";

import {
    Briefcase,
    Cake,
    Users,
    Gift,
    GraduationCap
} from "lucide-react";
import { cn } from "@/lib/utils";

export type OccasionType = "exhibitions" | "birthday" | "teambuilding" | "seasonal" | "training";

// Enhanced occasion data with stronger theme colors
const occasions: {
    id: OccasionType;
    title: string;
    icon: any;
    activeColor: string;
    activeBg: string;
    hoverBg: string;
}[] = [
        {
            id: "exhibitions",
            title: "Изложения и панаири",
            icon: Briefcase,
            activeColor: "text-blue-600",
            activeBg: "bg-blue-600",
            hoverBg: "hover:bg-blue-50",
        },
        {
            id: "birthday",
            title: "Рожден ден на фирмата",
            icon: Cake,
            activeColor: "text-pink-600",
            activeBg: "bg-pink-600",
            hoverBg: "hover:bg-pink-50",
        },
        {
            id: "teambuilding",
            title: "Тийм билдинг и събития",
            icon: Users,
            activeColor: "text-emerald-600",
            activeBg: "bg-emerald-600",
            hoverBg: "hover:bg-emerald-50",
        },
        {
            id: "seasonal",
            title: "Сезонни подаръци",
            icon: Gift,
            activeColor: "text-red-600",
            activeBg: "bg-red-600",
            hoverBg: "hover:bg-red-50",
        },
        {
            id: "training",
            title: "Обучения и нов семестър",
            icon: GraduationCap,
            activeColor: "text-purple-600",
            activeBg: "bg-purple-600",
            hoverBg: "hover:bg-purple-50",
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

    // Strong thematic background based on selection
    const getThemeBg = () => {
        switch (selected) {
            case "seasonal": return "bg-gradient-to-br from-red-100 via-red-50 to-white border-t-4 border-t-red-500";
            case "teambuilding": return "bg-gradient-to-br from-emerald-100 via-emerald-50 to-white border-t-4 border-t-emerald-500";
            case "birthday": return "bg-gradient-to-br from-pink-100 via-pink-50 to-white border-t-4 border-t-pink-500";
            case "training": return "bg-gradient-to-br from-purple-100 via-purple-50 to-white border-t-4 border-t-purple-500";
            case "exhibitions": return "bg-gradient-to-br from-blue-100 via-blue-50 to-white border-t-4 border-t-blue-500";
            default: return "bg-white";
        }
    };

    return (
        <section id="occasions" className={`py-20 transition-all duration-500 ${getThemeBg()}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        Създаваме имидж, който привлича клиенти вместо вас.
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
                                        ? `${occasion.activeBg} text-white shadow-lg scale-105`
                                        : `bg-white text-slate-600 shadow-sm ${occasion.hoverBg} hover:text-slate-900 hover:shadow-md border border-slate-200`
                                )}
                            >
                                <occasion.icon
                                    className={cn(
                                        "h-5 w-5 transition-transform duration-300 group-hover:scale-110",
                                        isSelected ? "text-white" : "text-slate-400"
                                    )}
                                />
                                <span className={cn(
                                    "text-sm font-bold tracking-wide",
                                    isSelected ? "text-white" : "text-slate-600"
                                )}>
                                    {occasion.title}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
