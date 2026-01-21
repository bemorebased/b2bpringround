"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
import { Check, ArrowRight, Package, Calculator, Zap, ExternalLink, PartyPopper, Trophy, Sparkles, Settings } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

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

    const [customLinks, setCustomLinks] = useState("");
    const [customQuantity, setCustomQuantity] = useState("25");

    const standardPrice = PACKAGES.partyPack.pricing[standardQtyIdx];
    const premiumPrice = PACKAGES.jubileeGold.pricing[premiumQtyIdx];

    // Helper to calculate "original" price for strikethrough (simulating ~20% discount)
    const getOriginalPrice = (price: number) => (price * 1.2).toFixed(2);

    return (
        <section id="packages" className="py-24 bg-slate-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                        Изберете своя пакет
                    </h2>
                    <p className="mt-4 text-lg text-slate-600">
                        Готови решения с прозрачно ценообразуване и първокласно качество.
                    </p>
                </div>

                <div className="grid gap-6 lg:gap-8 lg:grid-cols-3 items-start">

                    {/* 1. Персонализиран (Left) */}
                    <Card className="shiny-card-minimal flex flex-col border border-slate-200 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl overflow-hidden p-0 gap-0 h-full">
                        <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
                        <CardHeader className="text-center pt-8 pb-4">
                            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-100">
                                <Sparkles className="w-8 h-8 text-blue-600" />
                            </div>
                            <CardTitle className="text-2xl font-bold text-slate-900">Персонализиран</CardTitle>
                            <p className="text-slate-500 mt-2">Създайте свой собствен пакет</p>
                        </CardHeader>

                        <CardContent className="flex-1 space-y-6 px-6">
                            <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 text-sm text-slate-700">
                                <h4 className="font-semibold text-blue-700 mb-2 flex items-center gap-2">
                                    <Settings className="w-4 h-4" />
                                    Как работи?
                                </h4>
                                <ol className="list-decimal list-inside space-y-1 ml-1 text-slate-600">
                                    <li>Разгледайте <a href="https://printground.net" target="_blank" className="text-blue-600 underline">продуктите</a></li>
                                    <li>Копирайте линковете тук</li>
                                    <li>Получете индивидуална цена</li>
                                </ol>
                            </div>

                            <div className="space-y-3">
                                <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Вашите линкове</label>
                                <Textarea
                                    placeholder="https://printground.net/product/..."
                                    className="min-h-[120px] text-sm resize-none focus-visible:ring-blue-500 bg-slate-50"
                                    value={customLinks}
                                    onChange={(e) => setCustomLinks(e.target.value)}
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-xs font-bold uppercase text-slate-500 tracking-wider">Количество</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        min="25"
                                        className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                        value={customQuantity}
                                        onChange={(e) => setCustomQuantity(e.target.value)}
                                    />
                                    <span className="absolute right-3 top-2 text-slate-400 text-sm">бр.</span>
                                </div>
                            </div>
                        </CardContent>

                        <CardFooter className="p-6 pt-2 mt-auto">
                            <Button className="w-full bg-slate-900 hover:bg-blue-600 h-12 text-base font-semibold transition-colors duration-300" asChild>
                                <Link href={`#contact?package=custom&links=${encodeURIComponent(customLinks)}&q=${customQuantity}`}>
                                    Изпрати запитване
                                    <ExternalLink className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* 2. Стандарт (Middle) */}
                    <Card className="shiny-card-minimal flex flex-col border border-slate-200 shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl overflow-hidden relative p-0 gap-0 h-full">
                        <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500 z-10"></div>
                        <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden group rounded-b-2xl">
                            <Image
                                src={PACKAGES.partyPack.image}
                                alt="Стандарт"
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute bottom-4 left-4 z-10">
                                <Badge className="bg-white/95 text-slate-900 shadow-sm hover:bg-white">
                                    Най-поръчван
                                </Badge>
                            </div>
                        </div>

                        <CardHeader>
                            <CardTitle className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900">{PACKAGES.partyPack.name}</h3>
                                    <p className="text-sm font-medium text-slate-500 mt-1">Идеален за екипи</p>
                                </div>
                            </CardTitle>
                            <div className="mt-4 bg-emerald-50 rounded-lg p-3 border border-emerald-100 flex justify-between items-baseline">
                                <div className="text-sm font-medium text-emerald-800">Цена за брой:</div>
                                <div className="text-right flex items-baseline justify-end gap-3">
                                    <span className="text-4xl text-slate-500 line-through decoration-2">€{getOriginalPrice(standardPrice.pricePerUnit)}</span>
                                    <span className="text-4xl font-bold text-emerald-600">€{standardPrice.pricePerUnit.toFixed(2)}</span>
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="flex-1 flex flex-col space-y-6">
                            <ul className="space-y-3">
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
                                <div className="text-center mt-3 text-slate-400 text-sm">
                                    Общо: <span className="font-bold text-slate-700 text-2xl ml-1">€{standardPrice.totalEur.toFixed(2)}</span> <span className="text-xs">(без ДДС)</span>
                                </div>
                            </div>
                        </CardContent>

                        <CardFooter className="p-6 pt-2 mt-auto">
                            <Button
                                className="w-full bg-slate-900 hover:bg-emerald-600 h-12 text-base font-semibold transition-colors duration-300"
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

                    {/* 3. Премиум+ (Right) */}
                    <Card className="shiny-card-minimal flex flex-col border border-amber-200 shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 rounded-2xl overflow-hidden relative p-0 gap-0 h-full">
                        <div className="absolute top-0 left-0 w-full h-1 bg-amber-500 z-10"></div>
                        <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden group rounded-b-2xl">
                            <Image
                                src={PACKAGES.jubileeGold.image}
                                alt="Премиум+"
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-90"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                            <div className="absolute top-4 right-4 z-10">
                                <Badge className="bg-amber-500 text-slate-900 border-none font-bold px-3 py-1">
                                    <Zap className="w-3 h-3 mr-1 fill-black" /> PREMIUM
                                </Badge>
                            </div>
                        </div>

                        <CardHeader>
                            <CardTitle className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900">{PACKAGES.jubileeGold.name}</h3>
                                    <p className="text-sm font-medium text-amber-600 mt-1">VIP подарък</p>
                                </div>
                            </CardTitle>
                            <div className="mt-4 bg-amber-50 rounded-lg p-3 border border-amber-100 flex justify-between items-baseline">
                                <div className="text-sm font-medium text-amber-800">Цена за брой:</div>
                                <div className="text-right flex items-baseline justify-end gap-3">
                                    <span className="text-4xl text-slate-500 line-through decoration-2">€{getOriginalPrice(premiumPrice.pricePerUnit)}</span>
                                    <span className="text-4xl font-bold text-amber-600">€{premiumPrice.pricePerUnit.toFixed(2)}</span>
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="flex-1 flex flex-col space-y-6">
                            <ul className="space-y-3">
                                {PACKAGES.jubileeGold.includes.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-slate-700">
                                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center">
                                            <Check className="w-3.5 h-3.5 text-amber-600" />
                                        </div>
                                        <span className="font-medium">
                                            <a href={item.link} target="_blank" className="hover:text-amber-600 underline decoration-dotted text-slate-700">
                                                {item.text}
                                            </a>
                                        </span>
                                    </li>
                                ))}
                                <li className="flex items-start gap-3 text-slate-700">
                                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center">
                                        <Check className="w-3.5 h-3.5 text-amber-600" />
                                    </div>
                                    <span className="font-medium text-slate-700">Включен предпечат и setup</span>
                                </li>
                            </ul>

                            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 mt-auto">
                                <p className="text-sm text-slate-500 mb-2 font-medium">Количество:</p>
                                <div className="flex bg-white rounded-md border border-slate-200 overflow-hidden">
                                    {PACKAGES.jubileeGold.pricing.map((tier, idx) => (
                                        <button
                                            key={tier.quantity}
                                            onClick={() => setPremiumQtyIdx(idx as QuantityIndex)}
                                            className={cn(
                                                "flex-1 py-1.5 text-sm font-medium transition-colors",
                                                premiumQtyIdx === idx
                                                    ? "bg-amber-500 text-white font-bold"
                                                    : "hover:bg-slate-50 text-slate-600"
                                            )}
                                        >
                                            {tier.quantity}
                                        </button>
                                    ))}
                                </div>
                                <div className="text-center mt-3 text-slate-400 text-sm">
                                    Общо: <span className="font-bold text-slate-700 text-2xl ml-1">€{premiumPrice.totalEur.toFixed(2)}</span> <span className="text-xs">(без ДДС)</span>
                                </div>
                            </div>
                        </CardContent>

                        <CardFooter className="p-6 pt-2 mt-auto">
                            <Button
                                className="w-full bg-slate-900 hover:bg-amber-500 hover:text-slate-900 h-12 text-base font-semibold transition-colors duration-300"
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

                </div>
            </div>
        </section>
    );
}
