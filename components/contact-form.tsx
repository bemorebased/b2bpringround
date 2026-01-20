"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, CheckCircle2 } from "lucide-react";

export function ContactForm() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate submission
        // In a real app, this would send data to an API
        setSubmitted(true);
        console.log("Form submitted via simulated logic");
    };

    if (submitted) {
        return (
            <section id="contact" className="py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <Card className="mx-auto max-w-xl border-green-100 bg-green-50 shadow-lg">
                        <CardContent className="flex flex-col items-center justify-center p-12 text-center">
                            <CheckCircle2 className="mb-6 h-16 w-16 text-green-600" />
                            <h3 className="mb-2 text-2xl font-bold text-slate-900">Благодарим ви!</h3>
                            <p className="text-lg text-slate-700">
                                Ще се свържем с вас с оферта и визуализация до 24 часа.
                            </p>
                            <Button
                                variant="outline"
                                className="mt-8 bg-white"
                                onClick={() => setSubmitted(false)}
                            >
                                Изпрати ново запитване
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </section>
        );
    }

    return (
        <section id="contact" className="py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl">
                    <div className="mb-10 text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                            Получете персонално предложение до 24 часа
                        </h2>
                        <p className="mt-4 text-slate-600">
                            Попълнете формата и прикачете вашето лого за безплатна визуализация
                        </p>
                    </div>

                    <Card className="border-slate-200 shadow-lg">
                        <CardHeader>
                            <CardTitle>Форма за запитване</CardTitle>
                            <CardDescription>Всички полета са задължителни</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Име</Label>
                                        <Input id="name" placeholder="Иван Иванов" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="company">Фирма</Label>
                                        <Input id="company" placeholder="Вашата компания ЕООД" required />
                                    </div>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" type="email" placeholder="ivan@company.com" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Телефон</Label>
                                        <Input id="phone" type="tel" placeholder="+359 888 123 456" required />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="package">Избери пакет</Label>
                                    <Select required>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Моля изберете..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="standard">STANDARD (Best Seller)</SelectItem>
                                            <SelectItem value="vip">VIP (Premium)</SelectItem>
                                            <SelectItem value="custom">CUSTOM (Builder)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="logo">Прикачи лого (Vector/PDF/PNG)</Label>
                                    <div className="flex w-full items-center justify-center rounded-md border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-8 transition-colors hover:bg-slate-100">
                                        <div className="space-y-1 text-center">
                                            <Upload className="mx-auto h-10 w-10 text-slate-400" />
                                            <div className="flex text-sm text-slate-600">
                                                <label
                                                    htmlFor="file-upload"
                                                    className="relative cursor-pointer rounded-md bg-white font-medium text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:text-blue-500"
                                                >
                                                    <span>Качи файл</span>
                                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" required />
                                                </label>
                                                <p className="pl-1">или провлачи тук</p>
                                            </div>
                                            <p className="text-xs text-slate-500">
                                                PNG, PDF, AI, EPS до 10MB
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="message">Допълнителни изисквания (опционално)</Label>
                                    <Textarea id="message" placeholder="Брой служители, специфични цветове..." />
                                </div>

                                <Button type="submit" size="lg" className="w-full bg-blue-600 hover:bg-blue-700">
                                    Изпрати запитване
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    <p className="mt-8 text-center text-sm text-slate-500">
                        * С изпращането на тази форма се съгласявате да получите търговско предложение.
                        Вашите данни са защитени.
                    </p>
                </div>
            </div>
        </section>
    );
}
