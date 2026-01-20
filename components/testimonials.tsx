"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

const TESTIMONIALS = [
    {
        content: "Винаги на време и с високо качество.",
        author: "Станимира Иванова",
        role: "Hotel Design Manager, Radisson",
        initials: "СИ",
        companyLogo: "/logos/radisson.png",
    },
    {
        content: "Професионалисти в бранша. Лоялно отношение и бърза реакция, което ние ценим изключително много!",
        author: "Янко Пелтеков",
        role: "Operational Procurement, Bulmint",
        initials: "ЯП",
        companyLogo: "/logos/bulmint.png",
    },
    {
        content: "Работим с Принт Граунд от дълги години и сме изключително доволни от услугата и предлаганите продукти.",
        author: "Мартин Денев",
        role: "Founder, Voom Europe",
        initials: "МД",
        companyLogo: "/logos/voom.png",
    },
    {
        content: "Бързи, точни и много години. Намират решение за всяка нужда и винаги влизат в положение.",
        author: "Златко Ангелов",
        role: "Site Manager, Okin",
        initials: "ЗА",
        companyLogo: "/logos/okin.png",
    },
];

export function Testimonials() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
    const [selectedIndex, setSelectedIndex] = useState(0);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on("select", onSelect);
        return () => {
            emblaApi.off("select", onSelect);
        };
    }, [emblaApi, onSelect]);

    return (
        <section className="bg-gradient-to-b from-slate-50/50 via-white to-white py-24 border-t border-slate-200/60">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-16 text-center">
                    <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                        Доверие от лидерите в индустрията
                    </h2>
                    <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                        Вижте защо водещи компании избират нас за своите брандинг решения.
                    </p>
                </div>

                {/* Desktop Grid */}
                <div className="hidden lg:grid lg:grid-cols-4 gap-8">
                    {TESTIMONIALS.map((t, i) => (
                        <TestimonialCard key={i} testimonial={t} index={i} />
                    ))}
                </div>

                {/* Mobile Carousel */}
                <div className="lg:hidden">
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex gap-4">
                            {TESTIMONIALS.map((t, i) => (
                                <div key={i} className="flex-[0_0_85%] min-w-0 sm:flex-[0_0_70%]">
                                    <TestimonialCard testimonial={t} index={i} />
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Carousel Dots */}
                    <div className="flex justify-center gap-2 mt-8">
                        {TESTIMONIALS.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => emblaApi?.scrollTo(i)}
                                className={`h-2 rounded-full transition-all ${i === selectedIndex ? "w-8 bg-slate-900" : "w-2 bg-slate-300"
                                    }`}
                                aria-label={`Go to testimonial ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function TestimonialCard({ testimonial: t, index: i }: { testimonial: typeof TESTIMONIALS[0]; index: number }) {
    return (
        <Card className="border-none bg-white shadow-[0_10px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.15)] transition-all duration-300 hover:scale-[1.03] rounded-2xl h-full flex flex-col">
            <CardContent className="flex flex-col gap-6 p-8 h-full">
                {/* Large Logo with Shadow */}
                <div className="flex h-28 items-center justify-center">
                    {t.companyLogo && (
                        <div className="relative h-24 w-full max-w-[188px] drop-shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
                            <Image
                                src={t.companyLogo}
                                alt={`${t.author} company logo`}
                                fill
                                sizes="188px"
                                className="object-contain"
                                priority
                            />
                        </div>
                    )}
                </div>

                {/* Quote Section with Star Rating */}
                <div className="relative flex-1 flex flex-col justify-center">
                    {/* 5 Star Rating */}
                    <div className="flex gap-1 mb-4">
                        {[...Array(5)].map((_, idx) => (
                            <Star key={idx} className="h-5 w-5 text-amber-400 fill-amber-400" />
                        ))}
                    </div>
                    <p className="text-lg font-medium text-slate-700 leading-relaxed">
                        {t.content}
                    </p>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

                {/* Author Info */}
                <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12 border-2 border-white shadow-md ring-2 ring-slate-100">
                        <AvatarFallback className={`text-sm font-bold ${i % 2 === 0 ? 'bg-slate-900 text-white' : 'bg-blue-600 text-white'}`}>
                            {t.initials}
                        </AvatarFallback>
                    </Avatar>
                    <div className="overflow-hidden">
                        <div className="font-bold text-slate-900 text-base">{t.author}</div>
                        <div className="text-xs text-slate-500 font-medium uppercase tracking-wide">{t.role}</div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
