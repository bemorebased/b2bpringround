"use client";

import { Sparkles, Package, TrendingUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Check, Star, Settings, Gift, Briefcase, Users, GraduationCap } from "lucide-react";
import Link from "next/link";
import { OccasionType } from "./occasion-filter";
import { cn } from "@/lib/utils";

interface PackagesProps {
    selectedOccasion: OccasionType | null;
}

// Data structure for dynamic content
const PACKAGES_DATA: Record<string, {
    standard: { title: string; desc: string; items: string[] };
    vip: { title: string; desc: string; items: string[] };
    themeColor: string;
}> = {
    default: {
        standard: {
            title: "EMPLOYEE CARE",
            desc: "Накарайте екипа да се чувства ценен и видян.",
            items: ["Повишава мотивацията и принадлежността", "Практични неща, които ще ползват всеки ден", "Качествено брандиране, което издържа", "Бърза доставка без главоболия"],
        },
        vip: {
            title: "EXECUTIVE CLASS",
            desc: "За партньорите, които движат бизнеса ви напред.",
            items: ["Демонстрира уважение и престиж", "Продукти, които крещят 'Premium'", "Опаковка, която създава преживяване", "Дълготраен емоционален отпечатък"],
        },
        themeColor: "blue",
    },
    exhibitions: {
        standard: {
            title: "EXPO MAGNET",
            desc: "Превърнете щанда си в най-желаната дестинация.",
            items: ["Привлича посетители към щанда ви", "Полезна реклама, която не се изхвърля", "Създава 'Fear Of Missing Out' ефект", "Леки и удобни за раздаване"],
        },
        vip: {
            title: "DEAL CLOSER",
            desc: "Впечатлете инвеститорите още преди срещата.",
            items: ["Показва сериозни намерения", "Луксозен жест за 'топли' контакти", "Разграничава ви от конкуренцията", "Остава на бюрото им с месеци"],
        },
        themeColor: "indigo",
    },
    birthday: {
        standard: {
            title: "CULTURE BOOSTER",
            desc: "Създайте спомен и усещане за общност.",
            items: ["Обединява екипа визуално", "Създава празнична атмосфера веднага", "Снимките от партито стават вирусни", "Бюджетно решение с голям ефект"],
        },
        vip: {
            title: "LEGACY GIFT",
            desc: "За хората, които са сърцето на компанията.",
            items: ["Лично отношение към ключови фигури", "Признание за лоялност и принос", "Елегантност без кич", "Вкус, който се помни дълго"],
        },
        themeColor: "pink",
    },
    teambuilding: {
        standard: {
            title: "ADVENTURE READY",
            desc: "Подгответе ги за приключението, не просто за снимка.",
            items: ["Комфорт по време на активностите", "Екипировка, която сплотява", "Защита от слънце и дехидратация", "Остава любим спомен от събитието"],
        },
        vip: {
            title: "ORGANIZER PRO",
            desc: "Наградете лидерите и организаторите подобаващо.",
            items: ["Функционалност за планина и град", "Високотехнологични материали", "Символ на статус в екипа", "издръжливост при всякакви условия"],
        },
        themeColor: "green",
    },
    seasonal: {
        standard: {
            title: "WARM GESTURE",
            desc: "Стоплете отношенията в студените дни.",
            items: ["Създава коледен уют в офиса", "Малък жест с голямо значение", "Показва, че мислите за тях", "Перфектно допълнение към бонуса"],
        },
        vip: {
            title: "YEAR END GRATITUDE",
            desc: "Благодарете за успешната година със стил.",
            items: ["Луксозно 'Благодаря' без думи", "Атмосфера на изисканост и уют", "Споделено преживяване (гурме/аромати)", "Затваря годината с позитивна емоция"],
        },
        themeColor: "red",
    },
    training: {
        standard: {
            title: "FOCUS PACK",
            desc: "Премахнете разсейването, дайте им инструменти.",
            items: ["Подобрява концентрацията по време на курс", "Всичко необходимо на една ръка разстояние", "Професионално излъчване на събитието", "Улеснява воденето на записки"],
        },
        vip: {
            title: "LECTURER ELITE",
            desc: "Покажете уважение към знанието и опита.",
            items: ["Инструменти за професионална презентация", "Организация на високо ниво", "Подчертава авторитета на лектора", "Премиум усещане при допир"],
        },
        themeColor: "purple",
    },
};

export function Packages({ selectedOccasion }: PackagesProps) {
    const activeData = selectedOccasion ? PACKAGES_DATA[selectedOccasion] : PACKAGES_DATA.default;
    const theme = activeData.themeColor;

    // Helper for dynamic colors
    const getThemeClasses = (type: "border" | "bg" | "text" | "ring", variety: "light" | "main" | "dark") => {
        const colors: Record<string, Record<string, string>> = {
            blue: { light: "bg-blue-50 text-blue-700 border-blue-200", main: "bg-blue-600 border-blue-600", dark: "bg-slate-900" },
            indigo: { light: "bg-indigo-50 text-indigo-700 border-indigo-200", main: "bg-indigo-600 border-indigo-600", dark: "bg-indigo-900" },
            pink: { light: "bg-pink-50 text-pink-700 border-pink-200", main: "bg-pink-600 border-pink-600", dark: "bg-pink-900" },
            green: { light: "bg-green-50 text-emerald-700 border-green-200", main: "bg-emerald-600 border-emerald-600", dark: "bg-emerald-900" },
            red: { light: "bg-red-50 text-red-700 border-red-200", main: "bg-red-600 border-red-600", dark: "bg-red-900" },
            purple: { light: "bg-purple-50 text-purple-700 border-purple-200", main: "bg-purple-600 border-purple-600", dark: "bg-purple-900" },
        };
        const c = colors[theme] || colors.blue;
        if (type === "bg") return variety === "main" ? c.main.split(" ")[0] : variety === "dark" ? c.dark : c.light.split(" ")[0];
        if (type === "text") return c.light.split(" ")[1];
        if (type === "border") return c.light.split(" ")[2];
        return "";
    };

    // Dynamic section background - RICH COLORS
    const getSectionBg = () => {
        if (!selectedOccasion) return "bg-slate-50";
        const colors: Record<string, string> = {
            seasonal: "bg-gradient-to-br from-red-100 via-red-50 to-pink-100",
            teambuilding: "bg-gradient-to-br from-emerald-100 via-green-50 to-teal-100",
            birthday: "bg-gradient-to-br from-pink-100 via-pink-50 to-purple-100",
            training: "bg-gradient-to-br from-purple-100 via-purple-50 to-indigo-100",
            exhibitions: "bg-gradient-to-br from-indigo-100 via-blue-50 to-cyan-100",
        };
        return colors[selectedOccasion] || "bg-slate-50";
    };

    const currentPackage = (selectedOccasion && PACKAGES_DATA[selectedOccasion])
        ? PACKAGES_DATA[selectedOccasion]
        : PACKAGES_DATA.default;

    return (
        <section id="packages" className="py-24 bg-white transition-all duration-700">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-16 text-center animate-in fade-in slide-in-from-bottom-4 duration-700" key={selectedOccasion || "default"}>
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        Готови решения: {currentPackage.standard.title.split(" ")[0]}...
                    </h2>
                    <p className="mt-4 text-lg text-slate-600">
                        Персонализирана селекция за вашия повод
                    </p>
                </div>

                <div className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {/* STANDARD PACKAGE */}
                    <Card className={cn(
                        "relative flex flex-col shadow-sm overflow-visible group transition-all duration-500 hover:-translate-y-1 hover:shadow-xl border-2 animate-in fade-in slide-in-from-bottom-8 fill-mode-both bg-white",
                        getThemeClasses("border", "light")
                    )} style={{ animationDelay: "0ms" }}>
                        {/* Shimmer effect on content change */}
                        <div
                            key={selectedOccasion || "default"}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_1.5s_ease-in-out] pointer-events-none z-20"
                            style={{ backgroundSize: "200% 100%" }}
                        ></div>
                        <div className={cn("absolute top-0 left-0 h-2 w-full", getThemeClasses("bg", "main"))}></div>
                        <div className={cn(
                            "absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-bold uppercase tracking-wider shadow-sm z-30 text-white",
                            getThemeClasses("bg", "main")
                        )}>
                            Най-продаван
                        </div>
                        <CardHeader className="bg-white pt-12">
                            <CardTitle className="text-3xl font-bold text-slate-900">{activeData.standard.title}</CardTitle>
                            <CardDescription className="text-base text-slate-600">
                                {activeData.standard.desc}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 bg-white">
                            <ul className="space-y-4 text-sm">
                                {activeData.standard.items.map((item, i) => (
                                    <li key={i} className="flex items-start">
                                        <Check className={cn("mr-3 h-5 w-5 shrink-0", getThemeClasses("text", "main"))} />
                                        <span className="text-slate-700">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter className="bg-white p-6 pt-0">
                            <Button asChild className={cn("w-full shadow-md h-12 text-md font-semibold transition-transform hover:scale-[1.02] text-white", getThemeClasses("bg", "main"))}>
                                <Link href="#contact">Поискай оферта</Link>
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* VIP PACKAGE - BLACK & GOLD LUXURY */}
                    <Card
                        className="relative flex flex-col shadow-2xl ring-1 ring-slate-900/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] scale-100 lg:scale-105 z-10 overflow-visible group/vip bg-slate-900 border-amber-500/50 border-2"
                    >
                        {/* Shine sweep effect on hover - clipped to card */}
                        <div className="absolute inset-0 -translate-x-[200%] bg-gradient-to-r from-transparent via-amber-200/20 to-transparent group-hover/vip:animate-[shine_1.2s_ease-in-out] z-50 pointer-events-none overflow-hidden rounded-xl" style={{ transform: "skewX(-20deg)" }}></div>

                        <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-amber-300 via-amber-500 to-amber-300 rounded-t-xl"></div>

                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 px-6 py-2 text-sm font-bold text-slate-900 shadow-[0_0_15px_rgba(251,191,36,0.5)] z-[60]">
                            PREMIUM
                        </div>

                        <CardHeader className="bg-slate-900 pt-16 text-center rounded-t-xl border-b border-slate-800">
                            <CardTitle className="text-3xl font-black text-white tracking-tight drop-shadow-sm">{activeData.vip.title}</CardTitle>
                            <CardDescription className="text-lg font-medium text-amber-200/90">
                                {activeData.vip.desc}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 bg-slate-900 pt-6">
                            <ul className="space-y-4 text-sm">
                                {activeData.vip.items.map((item, i) => (
                                    <li key={i} className="flex items-start">
                                        <div className="mr-3 mt-0.5 rounded-full bg-amber-500/20 p-1">
                                            <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
                                        </div>
                                        <span className="text-slate-100 font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter className="bg-slate-900 p-8 pt-2 rounded-b-xl">
                            <Button asChild className="w-full h-14 text-lg font-bold transition-transform hover:scale-[1.02] bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-900 shadow-[0_4px_14px_0_rgba(251,191,36,0.39)]">
                                <Link href="#contact">Поискай VIP оферта</Link>
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* CUSTOM PACKAGE - ENHANCED */}
                    <Card
                        className="flex flex-col border-2 border-slate-200 bg-gradient-to-br from-white to-slate-50/50 transition-all hover:border-blue-400 hover:shadow-xl hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-8 fill-mode-both"
                        style={{ animationDelay: "300ms" }}
                    >
                        <CardHeader className="text-center pb-4">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                                <Sparkles className="h-8 w-8 text-white" />
                            </div>
                            <CardTitle className="text-3xl font-bold text-slate-900">CUSTOM</CardTitle>
                            <CardDescription className="text-base text-slate-600 mt-2">
                                Конфигуратор в 3 стъпки
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 space-y-6 px-6">
                            <div className="flex gap-4 items-start">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-lg font-bold text-blue-600 shadow-sm">
                                    1
                                </div>
                                <div className="flex-1 pt-1">
                                    <div className="font-bold text-slate-900 text-lg">Повод</div>
                                    <div className="text-sm text-slate-500 mt-1 uppercase font-medium">{selectedOccasion || "Изберете категория"}</div>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-lg font-bold text-blue-600 shadow-sm">
                                    2
                                </div>
                                <div className="flex-1 pt-1">
                                    <div className="font-bold text-slate-900 text-lg">Категории</div>
                                    <div className="text-sm text-slate-500 mt-1">Текстил • Tech • Office</div>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-lg font-bold text-blue-600 shadow-sm">
                                    3
                                </div>
                                <div className="flex-1 pt-1">
                                    <div className="font-bold text-slate-900 text-lg">Тираж</div>
                                    <div className="text-sm text-slate-500 mt-1">20 - 5000+ бр.</div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="mt-auto p-6 pt-4">
                            <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white shadow-md text-base font-semibold" asChild>
                                <Link href="#contact">
                                    Свържи се с нас
                                    <Settings className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>

            {/* Subtle gradient divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mt-24"></div>
        </section>
    );
}
