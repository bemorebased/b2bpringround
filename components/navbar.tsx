"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export function Navbar() {
    const [showEasterEgg, setShowEasterEgg] = useState(false);

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Logo with Easter Egg */}
                <div className="relative">
                    <Link
                        href="/"
                        className="flex items-center gap-2"
                        onMouseEnter={() => setShowEasterEgg(true)}
                        onMouseLeave={() => setShowEasterEgg(false)}
                    >
                        <div className="relative h-10 w-auto">
                            <Image
                                src="/PG_logo1.png"
                                alt="B2B Printground Logo"
                                width={180}
                                height={50}
                                className="h-full w-auto object-contain"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Easter Egg Tooltip */}
                    <div
                        className={`absolute left-0 top-full mt-2 w-80 transition-all duration-300 ${showEasterEgg
                                ? "opacity-100 translate-y-0 pointer-events-auto"
                                : "opacity-0 -translate-y-2 pointer-events-none"
                            }`}
                    >
                        <div className="relative rounded-xl bg-slate-900 p-4 shadow-2xl border border-slate-700">
                            {/* Arrow */}
                            <div className="absolute -top-2 left-6 h-4 w-4 rotate-45 bg-slate-900 border-l border-t border-slate-700"></div>

                            {/* Content */}
                            <div className="relative">
                                <div className="flex items-center gap-2 mb-2">
                                    <Sparkles className="h-4 w-4 text-amber-400" />
                                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">8+ години опит</span>
                                </div>
                                <p className="text-sm text-white font-medium leading-relaxed">
                                    „Мечтайте, създавайте, свързвайте се"
                                </p>
                                <p className="text-xs text-slate-400 mt-2">
                                    Най-бързо развиващата се компания в бранша. Правим го лично. Правим иновации за Вас.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="hidden md:flex md:items-center md:gap-6">
                    <Link href="#occasions" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                        Поводи
                    </Link>
                    <Link href="#packages" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                        Пакети
                    </Link>
                    <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <Link href="#contact">Поискай оферта</Link>
                    </Button>
                </div>
            </div>
        </nav>
    );
}
