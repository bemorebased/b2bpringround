"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Sparkles, PartyPopper, Trophy, Settings, ExternalLink } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

// Package pricing data
const PACKAGES = {
    partyPack: {
        id: "party-pack",
        name: "PARTY PACK",
        tagline: "Забавен комплект за тиймбилдинг",
        description: "Fun, energetic team-building vibe",
        image: "/package1.webp",
        icon: PartyPopper,
        color: "emerald",
        pricing: [
            { quantity: 25, pricePerUnit: 39.10, totalEur: 977.50, totalBgn: 1911.82 },
            { quantity: 50, pricePerUnit: 34.00, totalEur: 1700.00, totalBgn: 3325.35 },
            { quantity: 100, pricePerUnit: 29.00, totalEur: 2900.00, totalBgn: 5672.54 },
        ],
        includes: ["Тениска с брандиране", "Шапка с лого", "Бутилка за вода"],
    },
    jubileeGold: {
        id: "jubilee-gold",
        name: "JUBILEE GOLD",
        tagline: "Премиум комплект за признание",
        description: "Premium, appreciative gesture for management/achievements",
        image: "/package2.webp",
        icon: Trophy,
        color: "amber",
        pricing: [
            { quantity: 25, pricePerUnit: 47.80, totalEur: 1195.00, totalBgn: 2337.13 },
            { quantity: 50, pricePerUnit: 43.00, totalEur: 2150.00, totalBgn: 4205.76 },
            { quantity: 100, pricePerUnit: 37.50, totalEur: 3750.00, totalBgn: 7334.58 },
        ],
        includes: ["Керамична чаша", "Кожен бележник", "Комплект за вино", "Ключодържател"],
    },
};

type QuantityIndex = 0 | 1 | 2;

interface PackagesProps {
    selectedOccasion?: string | null;
}

export function Packages({ selectedOccasion }: PackagesProps) {
    const [partyQuantityIdx, setPartyQuantityIdx] = useState<QuantityIndex>(0);
    const [jubileeQuantityIdx, setJubileeQuantityIdx] = useState<QuantityIndex>(0);
    const [customLinks, setCustomLinks] = useState("");
    const [customQuantity, setCustomQuantity] = useState("25");

    const partyPricing = PACKAGES.partyPack.pricing[partyQuantityIdx];
    const jubileePricing = PACKAGES.jubileeGold.pricing[jubileeQuantityIdx];

    // Thematic background based on selection - matching occasion filter
    const getThemeBg = () => {
        switch (selectedOccasion) {
            case "seasonal": return "bg-gradient-to-b from-red-50 via-white to-white";
            case "teambuilding": return "bg-gradient-to-b from-emerald-50 via-white to-white";
            case "birthday": return "bg-gradient-to-b from-pink-50 via-white to-white";
            case "training": return "bg-gradient-to-b from-purple-50 via-white to-white";
            case "exhibitions": return "bg-gradient-to-b from-blue-50 via-white to-white";
            default: return "bg-white";
        }
    };

    return (
        <section id="packages" className={`py-24 transition-all duration-700 ${getThemeBg()}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-16 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        Готови решения за вашия бизнес
                    </h2>
                    <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                        Избор от курирани пакети с високо качество или създайте свой собствен
                    </p>
                </div>

                <div className="grid gap-8 lg:gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {/* PARTY PACK */}
                    <Card className="shiny-card group relative flex flex-col overflow-hidden border-0 bg-white transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 rounded-xl shadow-lg p-0 gap-0">
                        {/* Product Image - 4:3 Aspect Ratio */}
                        <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
                            <Image
                                src={PACKAGES.partyPack.image}
                                alt={PACKAGES.partyPack.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                priority
                            />
                            {/* Badge overlaid on image */}
                            <div className="absolute top-4 left-4 z-10">
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-white shadow-lg">
                                    <PartyPopper className="h-3.5 w-3.5" />
                                    За екипи
                                </span>
                            </div>
                        </div>

                        <CardHeader className="pb-2">
                            <CardTitle className="text-2xl font-black text-slate-900">{PACKAGES.partyPack.name}</CardTitle>
                            <CardDescription className="text-base text-slate-600">
                                {PACKAGES.partyPack.tagline}
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="flex-1 space-y-4">
                            {/* Includes */}
                            <div className="flex flex-wrap gap-2">
                                {PACKAGES.partyPack.includes.map((item, i) => (
                                    <span key={i} className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 border border-emerald-100">
                                        {item}
                                    </span>
                                ))}
                            </div>

                            {/* Quantity Selector */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Количество:</label>
                                <div className="flex gap-2">
                                    {PACKAGES.partyPack.pricing.map((p, idx) => (
                                        <button
                                            key={p.quantity}
                                            onClick={() => setPartyQuantityIdx(idx as QuantityIndex)}
                                            className={cn(
                                                "flex-1 rounded-lg py-2 text-sm font-bold transition-all",
                                                partyQuantityIdx === idx
                                                    ? "bg-emerald-600 text-white shadow-lg"
                                                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                                            )}
                                        >
                                            {p.quantity} бр.
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Pricing Display */}
                            <div className="rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-4 border border-emerald-200">
                                <div className="flex items-baseline justify-between">
                                    <span className="text-sm text-emerald-700 font-medium">Цена за 1 бр.:</span>
                                    <span className="text-2xl font-black text-emerald-700">{partyPricing.pricePerUnit.toFixed(2)}€</span>
                                </div>
                                <div className="mt-2 pt-2 border-t border-emerald-200/50 flex items-baseline justify-between">
                                    <span className="text-sm text-slate-600">Тотал:</span>
                                    <div className="text-right">
                                        <span className="text-lg font-bold text-slate-900">{partyPricing.totalEur.toFixed(2)}€</span>
                                        <span className="text-sm text-slate-500 ml-2">/ {partyPricing.totalBgn.toFixed(2)} лв.</span>
                                    </div>
                                </div>
                                <p className="text-xs text-slate-500 mt-2">* Цени без ДДС</p>
                            </div>
                        </CardContent>

                        <CardFooter className="p-6 pt-0">
                            <Button asChild className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white shadow-md text-base font-semibold">
                                <Link href={`#contact?package=party-pack&quantity=${partyPricing.quantity}`}>
                                    Поискай оферта
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* JUBILEE GOLD - Premium Styling */}
                    <Card className="shiny-card shiny-card-gold group relative flex flex-col overflow-hidden border-0 bg-gradient-to-b from-slate-900 to-slate-800 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/20 hover:-translate-y-2 lg:scale-105 z-10 rounded-xl shadow-lg shadow-amber-500/10 p-0 gap-0">
                        {/* Product Image - 4:3 Aspect Ratio */}
                        <div className="relative aspect-[4/3] overflow-hidden">
                            <Image
                                src={PACKAGES.jubileeGold.image}
                                alt={PACKAGES.jubileeGold.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                priority
                            />
                            {/* Gold overlay gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                            {/* Badge overlaid on image */}
                            <div className="absolute top-4 left-4 z-10">
                                <span className="premium-badge-glow inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-3 py-1 text-xs font-bold text-slate-900 shadow-lg">
                                    <Trophy className="h-3.5 w-3.5" />
                                    PREMIUM
                                </span>
                            </div>
                        </div>

                        <CardHeader className="pb-2">
                            <CardTitle className="text-2xl font-black text-white">{PACKAGES.jubileeGold.name}</CardTitle>
                            <CardDescription className="text-base text-amber-200/80">
                                {PACKAGES.jubileeGold.tagline}
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="flex-1 space-y-4">
                            {/* Includes - 2x2 Grid */}
                            <div className="grid grid-cols-2 gap-2">
                                {PACKAGES.jubileeGold.includes.map((item, i) => (
                                    <span key={i} className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-medium text-amber-300 border border-amber-500/30 text-center">
                                        {item}
                                    </span>
                                ))}
                            </div>

                            {/* Quantity Selector */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-300">Количество:</label>
                                <div className="flex gap-2">
                                    {PACKAGES.jubileeGold.pricing.map((p, idx) => (
                                        <button
                                            key={p.quantity}
                                            onClick={() => setJubileeQuantityIdx(idx as QuantityIndex)}
                                            className={cn(
                                                "flex-1 rounded-lg py-2 text-sm font-bold transition-all",
                                                jubileeQuantityIdx === idx
                                                    ? "bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 shadow-lg"
                                                    : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                                            )}
                                        >
                                            {p.quantity} бр.
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Pricing Display */}
                            <div className="rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 p-4 border border-amber-500/30">
                                <div className="flex items-baseline justify-between">
                                    <span className="text-sm text-amber-300 font-medium">Цена за 1 бр.:</span>
                                    <span className="text-2xl font-black text-amber-400">{jubileePricing.pricePerUnit.toFixed(2)}€</span>
                                </div>
                                <div className="mt-2 pt-2 border-t border-amber-500/20 flex items-baseline justify-between">
                                    <span className="text-sm text-slate-400">Тотал:</span>
                                    <div className="text-right">
                                        <span className="text-lg font-bold text-white">{jubileePricing.totalEur.toFixed(2)}€</span>
                                        <span className="text-sm text-slate-400 ml-2">/ {jubileePricing.totalBgn.toFixed(2)} лв.</span>
                                    </div>
                                </div>
                                <p className="text-xs text-slate-500 mt-2">* Цени без ДДС</p>
                            </div>
                        </CardContent>

                        <CardFooter className="p-6 pt-0">
                            <Button asChild className="w-full h-12 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-900 shadow-lg shadow-amber-500/30 text-base font-bold">
                                <Link href={`#contact?package=jubilee-gold&quantity=${jubileePricing.quantity}`}>
                                    Поискай VIP оферта
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* CUSTOM PACKAGE */}
                    <Card className="shiny-card flex flex-col border-0 bg-gradient-to-br from-white to-blue-50/30 transition-all hover:shadow-xl hover:-translate-y-1 rounded-xl shadow-lg p-0 gap-0">
                        <CardHeader className="text-center pb-4">
                            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                                <Sparkles className="h-10 w-10 text-white" />
                            </div>
                            <CardTitle className="text-2xl font-black text-slate-900">CUSTOM</CardTitle>
                            <CardDescription className="text-base text-slate-600 mt-2">
                                Създайте свой персонализиран комплект
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="flex-1 space-y-4 px-6">
                            {/* Product Links Input */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                    <ExternalLink className="h-4 w-4" />
                                    Линкове към продукти от printground.net
                                </label>
                                <Textarea
                                    placeholder="Поставете линкове към продуктите, които искате (по един на ред)&#10;&#10;Пример:&#10;https://printground.net/product/teniski&#10;https://printground.net/product/shapki"
                                    value={customLinks}
                                    onChange={(e) => setCustomLinks(e.target.value)}
                                    className="min-h-[120px] resize-none border-slate-300 focus:border-blue-400 text-sm"
                                />
                            </div>

                            {/* Quantity Input */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-slate-700">Приблизително количество:</label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="number"
                                        min="25"
                                        value={customQuantity}
                                        onChange={(e) => setCustomQuantity(e.target.value)}
                                        className="flex-1 rounded-lg border border-slate-300 px-4 py-2 text-center font-bold focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
                                    />
                                    <span className="text-sm text-slate-500">бр. (мин. 25)</span>
                                </div>
                            </div>

                            {/* Info Box */}
                            <div className="rounded-xl bg-blue-50 p-4 border border-blue-100">
                                <p className="text-sm text-blue-700">
                                    <strong>Как работи?</strong><br />
                                    1. Добавете линкове към желаните продукти<br />
                                    2. Посочете приблизително количество<br />
                                    3. Ние ще ви изпратим персонализирана оферта
                                </p>
                            </div>
                        </CardContent>

                        <CardFooter className="p-6 pt-0">
                            <Button asChild className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white shadow-md text-base font-semibold">
                                <Link href={`#contact?package=custom&quantity=${customQuantity}&links=${encodeURIComponent(customLinks)}`}>
                                    Изпратете заявка
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
