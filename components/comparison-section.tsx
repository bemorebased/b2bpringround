"use client";

import { Check, X, Palette, Clock, Truck, Leaf, Users, Award, Timer, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export function ComparisonSection() {
    return (
        <section className="bg-white py-24 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h3 className="text-amber-500 font-bold uppercase tracking-widest text-base mb-4">
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
                        {/* Negative Card - Standard Look */}
                        <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-lg hover:scale-[1.02] hover:shadow-xl transition-all duration-300 group/neg relative overflow-hidden flex flex-col items-center">
                            <div className="absolute top-0 left-0 w-full h-1 bg-slate-200 z-10"></div>
                            <div className="flex items-center gap-4 mb-10 w-full relative z-10">
                                <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 shrink-0 group-hover/neg:bg-slate-100 transition-colors border border-slate-100">
                                    <X className="w-6 h-6" />
                                </div>
                                <h4 className="text-2xl font-bold text-slate-400 tracking-tight">Без Нашите Услуги</h4>
                            </div>

                            <ul className="space-y-6 w-full relative z-10">
                                {[
                                    "Риск от некачествен печат и дефекти",
                                    "Липса на персонализиран подход към детайла",
                                    "Забавяния и неспазване на крайните срокове",
                                    "Проблеми с комуникацията и логистиката"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-4 text-slate-400 font-medium">
                                        <div className="w-5 h-5 rounded-full bg-red-50 flex items-center justify-center shrink-0 mt-0.5 border border-red-100">
                                            <X className="w-3 h-3 text-red-300" />
                                        </div>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Positive Card - Premium+ Look */}
                        <div className="bg-slate-900 rounded-3xl p-8 md:p-12 border border-amber-900/20 shadow-2xl hover:scale-[1.08] hover:shadow-amber-500/20 transition-all duration-300 group/pos relative z-10 overflow-hidden flex flex-col items-center ring-1 ring-white/10">
                            {/* Decorative background effects from Premium Package */}
                            <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent pointer-events-none"></div>

                            {/* Premium Gold Top Border */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 z-10"></div>

                            <div className="flex items-center gap-4 mb-10 w-full relative z-20">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white shrink-0 group-hover/pos:scale-110 transition-transform shadow-lg shadow-amber-900/40">
                                    <Check className="w-7 h-7 stroke-[3]" />
                                </div>
                                <h4 className="text-2xl font-bold text-white tracking-tight">С PrintGround</h4>
                            </div>

                            <ul className="space-y-6 w-full relative z-20">
                                {[
                                    { text: "Пълна персонализация според вашата марка", icon: Palette },
                                    { text: "Оферта в рамките на 24 часа и бързо изпълнение", icon: Clock },
                                    { text: "Модерни технологии за прецизен печат", icon: Zap },
                                    { text: "Надеждна логистика – доставка до ваш офис", icon: Truck }
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-slate-200 font-semibold text-lg hover:text-white transition-colors group-hover/pos:translate-x-1 duration-300">
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                                            <item.icon className="w-3.5 h-3.5 text-amber-400" />
                                        </div>
                                        <span className="font-medium pt-0.5">{item.text}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Decorative glow in the background */}
                            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none group-hover/pos:bg-amber-500/20 transition-all duration-500"></div>
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
