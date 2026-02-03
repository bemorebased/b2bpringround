"use client";

import { Check, X, Palette, Clock, Truck, Leaf, Users, Award, Timer, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export function ComparisonSection() {
    return (
        <section className="bg-white py-24 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h3 className="text-amber-500 font-bold uppercase tracking-widest text-sm mb-4">
                        Защо да изберете нас?
                    </h3>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
                        Изборът е <span className="text-amber-500">отговорност</span>
                    </h2>
                    <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                        Изборът на партньор е ключът за успеха и качеството на всеки проект. Вижте разликата.
                    </p>
                </div>

                <div className="relative max-w-5xl mx-auto mb-20">
                    <div className="grid md:grid-cols-2 gap-8 items-stretch">
                        {/* Negative Card */}
                        <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col items-center hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 group/neg">
                            <div className="flex items-center gap-4 mb-10 w-full">
                                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-500 shrink-0 group-hover/neg:bg-red-100 transition-colors">
                                    <X className="w-6 h-6" />
                                </div>
                                <h4 className="text-2xl font-bold text-slate-400">Без PrintGround</h4>
                            </div>

                            <ul className="space-y-6 w-full">
                                {[
                                    "Риск от некачествен печат и дефекти",
                                    "Липса на персонализиран подход към детайла",
                                    "Забавяния и неспазване на крайните срокове",
                                    "Проблеми с комуникацията и логистиката"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-slate-400 font-medium">
                                        <X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Positive Card */}
                        <div className="bg-slate-900 rounded-3xl p-8 md:p-12 border border-slate-800 shadow-2xl shadow-amber-500/10 flex flex-col items-center relative z-10 scale-105 transform -rotate-1 md:rotate-1 hover:scale-[1.08] hover:shadow-amber-500/20 transition-all duration-300 group/pos">
                            {/* Decorative Top Border like in screenshot */}
                            <div className="absolute top-0 left-10 right-10 h-1.5 bg-amber-500 rounded-b-full group-hover/pos:h-2 transition-all"></div>

                            <div className="flex items-center gap-4 mb-10 w-full">
                                <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center text-slate-900 shrink-0 group-hover/pos:scale-110 transition-transform">
                                    <Check className="w-7 h-7 stroke-[3]" />
                                </div>
                                <h4 className="text-2xl font-bold text-white">С Нашите Услуги</h4>
                            </div>

                            <ul className="space-y-6 w-full">
                                {[
                                    { text: "Пълна персонализация според вашата марка", icon: Palette },
                                    { text: "Оферта в рамките на 24 часа и бързо изпълнение", icon: Clock },
                                    { text: "Модерни технологии за прецизен печат", icon: Zap },
                                    { text: "Надеждна логистика – доставка до ваш офис", icon: Truck }
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-slate-200 font-semibold text-lg hover:text-white transition-colors">
                                        <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0 mt-1">
                                            <item.icon className="w-3.5 h-3.5 text-amber-500" />
                                        </div>
                                        <span>{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* VS Badge */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex w-16 h-16 rounded-full bg-black text-white items-center justify-center font-black text-xl border-4 border-white z-20">
                        VS
                    </div>
                </div>

                {/* Bottom Highlight Cards */}
                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Card 1: Experience */}
                    <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-lg shadow-slate-100/50 text-center flex flex-col items-center group hover:border-amber-200 transition-colors">
                        <div className="w-20 h-20 mb-6 bg-amber-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Award className="w-10 h-10 text-amber-500" />
                        </div>
                        <h5 className="text-xl font-bold text-slate-900 mb-3">Над 10 години опит</h5>
                        <p className="text-slate-500 text-sm">
                            Доверени от над 1000 водещи компании в България и Европа.
                        </p>
                    </div>

                    {/* Card 2: Speed */}
                    <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-lg shadow-slate-100/50 text-center flex flex-col items-center group hover:border-amber-200 transition-colors">
                        <div className="w-20 h-20 mb-6 bg-amber-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Timer className="w-10 h-10 text-amber-500" />
                        </div>
                        <h5 className="text-xl font-bold text-slate-900 mb-3">Бързи срокове</h5>
                        <p className="text-slate-500 text-sm">
                            Оферта в рамките на 24 часа и най-кратко възможно време за производство.
                        </p>
                    </div>

                    {/* Card 3: Quality */}
                    <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-lg shadow-slate-100/50 text-center flex flex-col items-center group hover:border-amber-200 transition-colors">
                        <div className="w-20 h-20 mb-6 bg-amber-50 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Leaf className="w-10 h-10 text-amber-500" />
                        </div>
                        <h5 className="text-xl font-bold text-slate-900 mb-3">Еко & Премиум качество</h5>
                        <p className="text-slate-500 text-sm">
                            Използваме модерни технологии и екологични материали за перфектен резултат.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
