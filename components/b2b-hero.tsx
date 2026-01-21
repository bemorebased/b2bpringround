"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Clock, ShieldCheck } from "lucide-react";

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
                        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-400 border border-emerald-500/20 mb-6">
                            <Star className="h-4 w-4 fill-emerald-400 text-emerald-400" />
                            <span>Премиум корпоративни подаръци</span>
                        </div>

                        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl flex flex-col items-start gap-1">
                            <span className="hero-title-shine">Персонализирани</span>
                            <span className="hero-title-shine hero-shine-delay-1">продукти</span>
                            <span className="hero-title-shine hero-shine-delay-2">за вашия бизнес</span>
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
                        </div>
                    </div>

                    {/* Right Column: Visuals */}
                    <div className="relative lg:ml-auto w-full max-w-lg lg:max-w-none">
                        {/* Main Hero Image Composition */}
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700 bg-slate-800/50 aspect-square sm:aspect-[4/3] lg:aspect-square">
                            {/* Placeholder for the collage concept - using the user provided hero assets */}
                            <Image
                                src="/hero.webp"
                                alt="Premium Corporate Gifts"
                                fill
                                className="object-cover opacity-90 hover:scale-105 transition-transform duration-1000"
                            />

                            {/* Floating Card: Social Proof */}
                            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl hidden sm:block max-w-[240px] border border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="flex -space-x-2">
                                        <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white"></div>
                                        <div className="w-8 h-8 rounded-full bg-slate-300 border-2 border-white"></div>
                                        <div className="w-8 h-8 rounded-full bg-slate-400 border-2 border-white"></div>
                                    </div>
                                    <span className="text-xs font-bold text-slate-900">+500 доволни клиента</span>
                                </div>
                                <div className="relative h-8 w-full">
                                    <Image
                                        src="/clients.webp"
                                        alt="Clients"
                                        fill
                                        className="object-contain object-left"
                                    />
                                </div>
                            </div>

                            {/* Floating Card: Trust - Bulmint */}
                            <div className="absolute top-6 -right-6 bg-white/95 backdrop-blur-sm p-3 rounded-lg shadow-lg hidden lg:block border border-slate-100 animate-in fade-in slide-in-from-right-4 duration-1000 delay-500">
                                <Image
                                    src="/bulmint.webp"
                                    alt="Trusted by Bulmint"
                                    width={80}
                                    height={30}
                                    className="object-contain opacity-80"
                                />
                            </div>
                            {/* Floating Card: Trust - Radisson */}
                            <div className="absolute bottom-20 -right-10 bg-white/95 backdrop-blur-sm p-3 rounded-lg shadow-lg hidden lg:block border border-slate-100 animate-in fade-in slide-in-from-right-4 duration-1000 delay-700">
                                <Image
                                    src="/radisson.webp"
                                    alt="Trusted by Radisson"
                                    width={80}
                                    height={30}
                                    className="object-contain opacity-80"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
