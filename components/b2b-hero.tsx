"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Clock, ShieldCheck, Users, Award } from "lucide-react";

export function B2BHero() {
    return (
        <section className="relative overflow-hidden bg-slate-900 py-20 lg:py-28">
            {/* Background Texture/Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 opacity-90"></div>
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 bg-repeat"></div>

            <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
                    {/* Left Column: Text */}
                    <div className="max-w-2xl">
                        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl flex flex-col items-start gap-1">
                            <span>Персонализирани</span>
                            <span>продукти</span>
                            <span>за вашия бизнес</span>
                        </h1>
                        <p className="mt-6 mb-10 text-xl font-medium text-slate-400 max-w-2xl mx-auto">
                            Ние създаваме уникални брандирани решения, които работят за вашия имидж, впечатлявайки вашите клиенти и партньори.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mb-10">
                            <Button asChild size="lg" className="h-14 px-8 text-lg bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-900 font-bold shadow-lg shadow-amber-500/20 border-0">
                                <Link href="#packages">
                                    Разгледайте пакетите
                                </Link>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="h-14 px-8 text-lg border-slate-600 text-white hover:bg-slate-800 hover:text-white bg-transparent">
                                <Link href="#contact">
                                    Вземи оферта
                                </Link>
                            </Button>
                        </div>

                        <div className="flex flex-col gap-3 text-sm font-medium text-slate-400">
                            <div className="flex items-center gap-2">
                                <Clock className="h-5 w-5 text-emerald-400" />
                                <span>Бърза и надеждна доставка</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="h-5 w-5 text-emerald-400" />
                                <span>Висококачествен печат и гаранция</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Star className="h-5 w-5 text-emerald-400" />
                                <span>Пълна персонализация на всеки детайл</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Award className="h-5 w-5 text-emerald-400" />
                                <span>Над 10 години опит</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="h-5 w-5 text-emerald-400" />
                                <span>1000+ доволни клиента</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Visuals */}
                    <div className="relative lg:ml-auto w-full max-w-lg lg:max-w-none">
                        {/* Main Hero Image Container with Crossfade Effect */}
                        <div className="group relative w-full aspect-square sm:aspect-[4/3] lg:aspect-square rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
                            {/* Base Image - Hero 12 (Default) */}
                            <div className="absolute inset-0 w-full h-full transition-all duration-700 ease-out group-hover:scale-110 group-hover:opacity-0">
                                <Image
                                    src="/hero12.webp"
                                    alt="Premium Corporate Gifts"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                {/* Subtle overlay for depth */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent"></div>
                            </div>

                            {/* Reveal Image - Hero 11 (On Hover) */}
                            <div className="absolute inset-0 w-full h-full transition-all duration-700 ease-out opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100">
                                <Image
                                    src="/hero11.webp"
                                    alt="Premium Corporate Gifts Collection"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                {/* Shine effect on reveal */}
                                <div className="shiny-card absolute inset-0 w-full h-full pointer-events-none"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
