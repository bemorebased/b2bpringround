"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    CardDescription
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight, Package, Calculator, Zap, ExternalLink, PartyPopper, Trophy, Sparkles, Settings, Link as LinkIcon, Plus, X, Info } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

// Package pricing data (Synced with original logic)
const PACKAGES = {
    partyPack: {
        id: "party-pack",
        name: "Стандарт",
        tagline: "Забавен комплект за тиймбилдинг",
        description: "Fun, energetic team-building vibe",
        image: "/rapack.webp",
        icon: PartyPopper,
        pricing: [
            { quantity: 25, pricePerUnit: 39.10, totalEur: 977.50, totalBgn: 1911.82 },
            { quantity: 50, pricePerUnit: 34.00, totalEur: 1700.00, totalBgn: 3325.35 },
            { quantity: 100, pricePerUnit: 29.00, totalEur: 2900.00, totalBgn: 5672.54 },
        ],
        includes: [
            { text: "Тениска с брандиране", link: "https://printground.net/product/thc-ankara-мъжка-тениска/" },
            { text: "Шапка с лого", link: "https://printground.net/product/ryan-шапка-изработена-от-обработен-65-рецик/" },
            { text: "Бутилка за вода", link: "https://printground.net/product/duplantis-бутилка-от-неръждаема-стомана-90-реци/" }
        ],
    },
    jubileeGold: {
        id: "jubilee-gold",
        name: "Премиум+",
        tagline: "Премиум комплект за признание",
        description: "Premium, appreciative gesture for management/achievements",
        image: "/bulpack.webp",
        icon: Trophy,
        pricing: [
            { quantity: 25, pricePerUnit: 47.80, totalEur: 1195.00, totalBgn: 2337.13 },
            { quantity: 50, pricePerUnit: 43.00, totalEur: 2150.00, totalBgn: 4205.76 },
            { quantity: 100, pricePerUnit: 37.50, totalEur: 3750.00, totalBgn: 7334.58 },
        ],
        includes: [
            { text: "Керамична чаша", link: "https://printground.net/product/panthony-mat-порцеланова-чаша-450-мл/" },
            { text: "Кожен бележник", link: "https://printground.net/product/matisse-a5-тефтер-с-твърда-корица-от-кожа-70-реци/" },
            { text: "Комплект за вино", link: "https://printground.net/product/syrah-комплект-за-вино-от-бамбук-цинк-и-нер/" },
            { text: "Персонализиран плакет", link: "https://printground.net/product/stewie-правоъгълен-ключодържател-от-буков/" }
        ],
    },
};

type QuantityIndex = 0 | 1 | 2;

interface PricingTier {
    quantity: number;
    pricePerUnit: number;
    totalEur: number;
    totalBgn: number;
}

interface B2BPackagesProps {
    onSelectPackage?: (data: { packageType: string; quantity: string; productLinks?: string }) => void;
}

export function B2BPackages({ onSelectPackage }: B2BPackagesProps) {
    const [standardQtyIdx, setStandardQtyIdx] = useState<QuantityIndex>(0);
    const [premiumQtyIdx, setPremiumQtyIdx] = useState<QuantityIndex>(0);

    const [customQtySelection, setCustomQtySelection] = useState<"25" | "50" | "custom">("25");
    const [customQuantity, setCustomQuantity] = useState("25");

    const standardPrice = PACKAGES.partyPack.pricing[standardQtyIdx];
    const premiumPrice = PACKAGES.jubileeGold.pricing[premiumQtyIdx];

    // Helper to calculate "original" price for strikethrough (simulating ~20% discount)
    const getOriginalPrice = (price: number) => (price * 1.2).toFixed(2);

    // Calculate total original price for savings tooltip
    const getOriginalTotal = (pricePerUnit: number, qty: number) => (pricePerUnit * 1.2 * qty).toFixed(2);
    const getSavings = (pricePerUnit: number, qty: number) => ((pricePerUnit * 1.2 * qty) - (pricePerUnit * qty)).toFixed(2);

    // Custom quantity handler
    const handleCustomQtySelect = (val: "25" | "50" | "custom") => {
        setCustomQtySelection(val);
        if (val !== "custom") {
            setCustomQuantity(val);
        } else {
            setCustomQuantity(""); // Clear for input
        }
    };

    // Handle navigation to contact form with smooth scroll
    const handleCustomSubmit = () => {
        const qty = customQtySelection === "custom" ? customQuantity : customQtySelection;
        const params = new URLSearchParams();
        params.set("package", "custom");
        params.set("quantity", qty);

        // Update URL hash and scroll to contact
        window.location.hash = `contact?${params.toString()}`;

        // Smooth scroll to contact section
        const contactSection = document.getElementById("contact");
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section id="packages" className="py-24 bg-slate-50">
            <TooltipProvider>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                            Изберете своя пакет сега

                        </h2>
                        <p className="mt-4 text-lg text-slate-600">
                            Готови решения с прозрачно ценообразуване и първокласно качество.
                        </p>
                    </div>

                    <div className="grid gap-6 lg:gap-8 lg:grid-cols-3 items-stretch">

                        {/* 1. Стандарт (First) - White Card */}
                        <Card className="flex flex-col border border-slate-200 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl overflow-hidden relative p-0 gap-0 h-full bg-white">
                            <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500 z-10"></div>
                            <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden group rounded-b-2xl">
                                <Image
                                    src={PACKAGES.partyPack.image}
                                    alt="Стандарт"
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute bottom-4 left-4 z-10">
                                    <Badge className="bg-white/95 text-slate-900 shadow-sm hover:bg-white text-xs font-bold px-2 py-0.5">
                                        Най-поръчван
                                    </Badge>
                                </div>
                            </div>

                            {/* Card Header with pushed down title */}
                            <CardHeader className="min-h-[190px] pt-8 pb-2">
                                <CardTitle className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-2xl font-bold text-slate-900">{PACKAGES.partyPack.name}</h3>
                                        <p className="text-sm font-medium text-slate-500 mt-1">Идеален за екипи</p>
                                    </div>
                                </CardTitle>
                                <div className="mt-6 bg-emerald-50 rounded-lg p-3 border border-emerald-100 flex justify-between items-center h-[84px]">
                                    <div className="text-sm font-medium text-emerald-800">Цена за брой:</div>
                                    <div className="text-right flex items-baseline justify-end gap-3">
                                        <span className="text-2xl text-slate-400 line-through decoration-2">€{getOriginalPrice(standardPrice.pricePerUnit)}</span>
                                        <span className="text-3xl font-bold text-emerald-600">€{standardPrice.pricePerUnit.toFixed(2)}</span>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="flex-1 flex flex-col space-y-6">
                                <ul className="space-y-3 pt-2">
                                    {PACKAGES.partyPack.includes.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-slate-600">
                                            <Check className="h-5 w-5 text-emerald-500 shrink-0" />
                                            <span>
                                                <a href={item.link} target="_blank" className="hover:text-emerald-600 underline decoration-dotted font-semibold">
                                                    {item.text}
                                                </a>
                                            </span>
                                        </li>
                                    ))}
                                    <li className="flex items-start gap-3 text-slate-600">
                                        <Check className="h-5 w-5 text-emerald-500 shrink-0" />
                                        <span>Включен предпечат и setup</span>
                                    </li>
                                </ul>

                                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 mt-auto">
                                    <p className="text-sm text-slate-500 mb-2 font-medium">Количество:</p>
                                    <div className="flex bg-white rounded-md border border-slate-200 overflow-hidden">
                                        {PACKAGES.partyPack.pricing.map((tier, idx) => (
                                            <button
                                                key={tier.quantity}
                                                onClick={() => setStandardQtyIdx(idx as QuantityIndex)}
                                                className={cn(
                                                    "flex-1 py-1.5 text-sm font-medium transition-colors",
                                                    standardQtyIdx === idx
                                                        ? "bg-emerald-600 text-white font-bold"
                                                        : "hover:bg-slate-50 text-slate-600"
                                                )}
                                            >
                                                {tier.quantity}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="text-center mt-3 text-slate-400 text-sm flex items-center justify-center gap-1">
                                        Общо:
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <span className="font-bold text-slate-700 text-xl ml-1 cursor-help border-b border-dotted border-slate-400">
                                                    €{standardPrice.totalEur.toFixed(2)}
                                                </span>
                                            </TooltipTrigger>
                                            <TooltipContent className="bg-slate-800 text-white border-slate-700">
                                                <div className="text-xs">
                                                    <p>Редовна цена: <span className="line-through text-slate-400">€{getOriginalTotal(standardPrice.pricePerUnit, standardPrice.quantity)}</span></p>
                                                    <p className="text-green-400 font-bold mt-1">Спестявате: €{getSavings(standardPrice.pricePerUnit, standardPrice.quantity)}</p>
                                                </div>
                                            </TooltipContent>
                                        </Tooltip>
                                        <span className="text-xs text-slate-400"> (без ДДС)</span>
                                    </div>
                                </div>
                            </CardContent>

                            <CardFooter className="p-6 pt-2 mt-auto">
                                <Button
                                    className="w-full bg-slate-900 hover:bg-emerald-600 h-11 text-sm font-semibold transition-colors duration-300 uppercase tracking-wide"
                                    onClick={() => onSelectPackage?.({
                                        packageType: PACKAGES.partyPack.id,
                                        quantity: standardPrice.quantity.toString()
                                    })}
                                >
                                    Вземи оферта
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </CardFooter>
                        </Card>

                        {/* 2. Премиум+ (Second) - Dark/Gold Card */}
                        <Card className="flex flex-col border border-amber-900/20 shadow-2xl hover:shadow-amber-500/20 transition-all duration-300 rounded-2xl overflow-hidden relative p-0 gap-0 h-full scale-[1.02] z-10 bg-slate-900 text-white ring-1 ring-white/10">
                            {/* Decorative background effects */}
                            <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent pointer-events-none"></div>

                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 z-10"></div>
                            <div className="relative aspect-[4/3] bg-slate-800 overflow-hidden group rounded-b-2xl">
                                <Image
                                    src={PACKAGES.jubileeGold.image}
                                    alt="Премиум+"
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-90"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                                <div className="absolute top-4 right-4 z-10">
                                    <Badge className="bg-gradient-to-r from-amber-400 to-amber-600 text-white border-white/20 border font-bold px-3 py-1 shadow-lg shadow-amber-900/40">
                                        <Zap className="w-3 h-3 mr-1 fill-white" /> VIP PREMIUM
                                    </Badge>
                                </div>
                            </div>

                            {/* Card Header with pushed down title */}
                            <CardHeader className="min-h-[190px] pt-8 pb-2 relative">
                                <CardTitle className="flex justify-between items-start relative z-10">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white tracking-tight">{PACKAGES.jubileeGold.name}</h3>
                                        <p className="text-sm font-medium text-amber-400 mt-1">Ексклузивен подарък</p>
                                    </div>
                                </CardTitle>
                                <div className="mt-6 bg-slate-800/80 rounded-lg p-3 border border-amber-500/30 shadow-inner flex justify-between items-center backdrop-blur-md relative z-10 h-[84px]">
                                    <div className="text-sm font-medium text-amber-300">Цена за брой:</div>
                                    <div className="text-right flex items-baseline justify-end gap-3">
                                        <span className="text-2xl text-slate-500 line-through decoration-slate-500/50">€{getOriginalPrice(premiumPrice.pricePerUnit)}</span>
                                        <span className="text-3xl font-bold text-amber-400 drop-shadow-sm">€{premiumPrice.pricePerUnit.toFixed(2)}</span>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="flex-1 flex flex-col space-y-6 relative z-10">
                                <ul className="space-y-4 pt-2">
                                    {PACKAGES.jubileeGold.includes.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                                                <Check className="w-3.5 h-3.5 text-amber-400" />
                                            </div>
                                            <span className="font-medium pt-0.5 text-slate-300">
                                                <a href={item.link} target="_blank" className="hover:text-amber-400 underline decoration-dotted text-slate-200 decoration-slate-600 hover:decoration-amber-400 transition-colors">
                                                    {item.text}
                                                </a>
                                            </span>
                                        </li>
                                    ))}
                                    <li className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                                            <Check className="w-3.5 h-3.5 text-amber-400" />
                                        </div>
                                        <span className="font-medium text-slate-300 pt-0.5">Включен предпечат и setup</span>
                                    </li>
                                </ul>

                                <div className="bg-slate-800/50 p-5 rounded-xl border border-white/5 mt-auto">
                                    <p className="text-sm text-slate-400 mb-2 font-medium">Количество:</p>
                                    <div className="flex bg-slate-900 rounded-lg border border-white/10 overflow-hidden shadow-inner">
                                        {PACKAGES.jubileeGold.pricing.map((tier, idx) => (
                                            <button
                                                key={tier.quantity}
                                                onClick={() => setPremiumQtyIdx(idx as QuantityIndex)}
                                                className={cn(
                                                    "flex-1 py-2 text-sm font-medium transition-all duration-200",
                                                    premiumQtyIdx === idx
                                                        ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold shadow-md"
                                                        : "hover:bg-slate-800 text-slate-400"
                                                )}
                                            >
                                                {tier.quantity}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="text-center mt-3 text-slate-500 text-sm flex items-center justify-center gap-1">
                                        Общо:
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <span className="font-bold text-amber-400 text-xl ml-1 cursor-help border-b border-dotted border-amber-400/50">
                                                    €{premiumPrice.totalEur.toFixed(2)}
                                                </span>
                                            </TooltipTrigger>
                                            <TooltipContent className="bg-white text-slate-900 border-amber-200">
                                                <div className="text-xs">
                                                    <p>Редовна цена: <span className="line-through text-slate-400">€{getOriginalTotal(premiumPrice.pricePerUnit, premiumPrice.quantity)}</span></p>
                                                    <p className="text-amber-600 font-bold mt-1">Спестявате: €{getSavings(premiumPrice.pricePerUnit, premiumPrice.quantity)}</p>
                                                </div>
                                            </TooltipContent>
                                        </Tooltip>
                                        <span className="text-xs text-slate-600">(без ДДС)</span>
                                    </div>
                                </div>
                            </CardContent>

                            <CardFooter className="p-6 pt-2 mt-auto relative z-10">
                                <Button
                                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white h-12 text-sm font-bold transition-all duration-300 shadow-lg shadow-amber-900/20 uppercase tracking-wider"
                                    onClick={() => onSelectPackage?.({
                                        packageType: PACKAGES.jubileeGold.id,
                                        quantity: premiumPrice.quantity.toString()
                                    })}
                                >
                                    Поискай VIP оферта
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </CardFooter>
                        </Card>

                        {/* 3. Персонализиран (Third) - White Card */}
                        <Card className="flex flex-col border border-slate-200 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl overflow-hidden relative p-0 gap-0 h-full bg-white">
                            <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 z-10"></div>

                            <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden group rounded-b-2xl">
                                <Image
                                    src="/custom.jpg"
                                    alt="Персонализиран пакет"
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute bottom-4 left-4 z-10">
                                    <Badge className="bg-white/95 text-blue-600 shadow-sm hover:bg-white text-xs font-bold px-2 py-0.5">
                                        <Sparkles className="w-3 h-3 mr-1" /> CUSTOM
                                    </Badge>
                                </div>
                            </div>

                            {/* Card Header with pushed down title */}
                            <CardHeader className="min-h-[190px] pt-8 pb-2">
                                <CardTitle className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-2xl font-bold text-slate-900">Персонализиран</h3>
                                        <p className="text-sm font-medium text-slate-500 mt-1">Създайте свой собствен пакет</p>
                                    </div>
                                </CardTitle>

                                {/* "How it works" section aligned with Price blocks - just the title */}
                                <div className="mt-6 bg-blue-50/50 rounded-lg p-3 border border-blue-100 flex items-center h-[84px]">
                                    <div className="flex items-center gap-2">
                                        <Settings className="w-5 h-5 text-blue-600" />
                                        <span className="text-lg font-semibold text-blue-700">Как работи?</span>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="flex-1 flex flex-col space-y-6">
                                {/* Instructions as list items (like features in other packages) */}
                                <ul className="space-y-3 pt-2">
                                    <li className="flex items-start gap-3 text-slate-600">
                                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold pt-0.5">1</div>
                                        <span>
                                            <a href="https://printground.net/shop/" target="_blank" className="hover:text-blue-600 underline decoration-dotted font-semibold">
                                                Разгледайте продуктите
                                            </a>
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-3 text-slate-600">
                                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold pt-0.5">2</div>
                                        <span className="font-medium">Изпратете ни линковете през формата</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-slate-600">
                                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold pt-0.5">3</div>
                                        <span className="font-medium">Ще се свържем с вас до 24 часа</span>
                                    </li>
                                </ul>

                                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 mt-auto">
                                    <p className="text-sm text-slate-500 mb-2 font-medium">Количество:</p>
                                    <div className="flex bg-white rounded-md border border-slate-200 overflow-hidden">
                                        <button
                                            onClick={() => handleCustomQtySelect("25")}
                                            className={cn(
                                                "flex-1 py-1.5 text-sm font-medium transition-colors",
                                                customQtySelection === "25"
                                                    ? "bg-blue-600 text-white font-bold"
                                                    : "hover:bg-slate-50 text-slate-600"
                                            )}
                                        >
                                            25
                                        </button>
                                        <button
                                            onClick={() => handleCustomQtySelect("50")}
                                            className={cn(
                                                "flex-1 py-1.5 text-sm font-medium transition-colors",
                                                customQtySelection === "50"
                                                    ? "bg-blue-600 text-white font-bold"
                                                    : "hover:bg-slate-50 text-slate-600"
                                            )}
                                        >
                                            50
                                        </button>
                                        <div className={cn(
                                            "flex-1 relative transition-colors",
                                            customQtySelection === "custom" ? "bg-blue-600" : "bg-white hover:bg-slate-50"
                                        )}>
                                            <input
                                                type="number"
                                                min="1"
                                                placeholder="Друго"
                                                value={customQtySelection === "custom" ? customQuantity : ""}
                                                onClick={() => handleCustomQtySelect("custom")}
                                                onChange={(e) => {
                                                    setCustomQtySelection("custom");
                                                    setCustomQuantity(e.target.value);
                                                }}
                                                className={cn(
                                                    "w-full h-full px-2 py-1.5 text-sm text-center bg-transparent focus:outline-none placeholder:text-slate-400",
                                                    customQtySelection === "custom"
                                                        ? "font-bold text-white placeholder:text-white/60"
                                                        : "text-slate-600"
                                                )}
                                            />
                                        </div>
                                    </div>
                                    {/* Spacer to align top of quantity block with other cards */}
                                    <div className="mt-3 h-7 flex items-center justify-center opacity-0 pointer-events-none select-none" aria-hidden="true">
                                        <span className="text-xl">Spacer</span>
                                    </div>
                                </div>
                            </CardContent>

                            <CardFooter className="p-6 pt-2 mt-auto">
                                <Button
                                    className="w-full bg-slate-900 hover:bg-blue-600 h-11 text-sm font-semibold transition-colors duration-300 uppercase tracking-wide"
                                    onClick={handleCustomSubmit}
                                >
                                    Изпрати запитване
                                    <ExternalLink className="ml-2 h-4 w-4" />
                                </Button>
                            </CardFooter>
                        </Card>

                    </div>
                </div>
            </TooltipProvider>
        </section>
    );
}
