"use client";

import { useState, useEffect } from "react";
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
import { Upload, CheckCircle2, Loader2, AlertCircle } from "lucide-react";

export function ContactForm() {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Form state
    const [formData, setFormData] = useState({
        name: "",
        company: "",
        email: "",
        phone: "",
        packageType: "",
        quantity: "",
        productLinks: "",
        message: "",
    });

    // Parse URL params for package pre-selection
    useEffect(() => {
        if (typeof window !== "undefined") {
            const hash = window.location.hash;
            if (hash.includes("?")) {
                const params = new URLSearchParams(hash.split("?")[1]);
                const pkg = params.get("package");
                const qty = params.get("quantity");
                const links = params.get("links");

                if (pkg) {
                    setFormData((prev) => ({
                        ...prev,
                        packageType: pkg,
                        quantity: qty || prev.quantity,
                        productLinks: links ? decodeURIComponent(links) : prev.productLinks,
                    }));
                }
            }
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.error || "Възникна грешка");
            }

            setSubmitted(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Възникна грешка. Моля, опитайте отново.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const packageNames: Record<string, string> = {
        "party-pack": "PARTY PACK (За екипи)",
        "jubilee-gold": "JUBILEE GOLD (Premium)",
        "custom": "CUSTOM (Персонализиран)",
    };

    if (submitted) {
        return (
            <section id="contact" className="py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <Card className="mx-auto max-w-xl border-green-100 bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg">
                        <CardContent className="flex flex-col items-center justify-center p-12 text-center">
                            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                                <CheckCircle2 className="h-12 w-12 text-green-600" />
                            </div>
                            <h3 className="mb-2 text-2xl font-bold text-slate-900">Благодарим ви!</h3>
                            <p className="text-lg text-slate-700">
                                Ще се свържем с вас с персонална оферта до <strong>24 часа</strong>.
                            </p>
                            <p className="mt-2 text-sm text-slate-500">
                                Проверете inbox-а си за потвърждение.
                            </p>
                            <Button
                                variant="outline"
                                className="mt-8 bg-white"
                                onClick={() => {
                                    setSubmitted(false);
                                    setFormData({
                                        name: "",
                                        company: "",
                                        email: "",
                                        phone: "",
                                        packageType: "",
                                        quantity: "",
                                        productLinks: "",
                                        message: "",
                                    });
                                }}
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

                    <Card className="border-slate-200 shadow-xl">
                        <CardHeader>
                            <CardTitle>Форма за запитване</CardTitle>
                            <CardDescription>
                                {formData.packageType && (
                                    <span className="inline-flex items-center gap-2 mt-2 rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
                                        Избран пакет: {packageNames[formData.packageType] || formData.packageType}
                                        {formData.quantity && ` • ${formData.quantity} бр.`}
                                    </span>
                                )}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {error && (
                                    <div className="flex items-center gap-2 rounded-lg bg-red-50 p-4 text-sm text-red-700 border border-red-100">
                                        <AlertCircle className="h-5 w-5 shrink-0" />
                                        {error}
                                    </div>
                                )}

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Име *</Label>
                                        <Input
                                            id="name"
                                            placeholder="Иван Иванов"
                                            required
                                            value={formData.name}
                                            onChange={(e) => handleChange("name", e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="company">Фирма *</Label>
                                        <Input
                                            id="company"
                                            placeholder="Вашата компания ЕООД"
                                            required
                                            value={formData.company}
                                            onChange={(e) => handleChange("company", e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email *</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="ivan@company.com"
                                            required
                                            value={formData.email}
                                            onChange={(e) => handleChange("email", e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Телефон *</Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            placeholder="+359 888 123 456"
                                            required
                                            value={formData.phone}
                                            onChange={(e) => handleChange("phone", e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="package">Избери пакет *</Label>
                                        <Select
                                            value={formData.packageType}
                                            onValueChange={(value) => handleChange("packageType", value)}
                                            required
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Моля изберете..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="party-pack">PARTY PACK (За екипи)</SelectItem>
                                                <SelectItem value="jubilee-gold">JUBILEE GOLD (Premium)</SelectItem>
                                                <SelectItem value="custom">CUSTOM (Персонализиран)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="quantity">Количество *</Label>
                                        <Select
                                            value={formData.quantity}
                                            onValueChange={(value) => handleChange("quantity", value)}
                                            required
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Изберете..." />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="25">25 бр.</SelectItem>
                                                <SelectItem value="50">50 бр.</SelectItem>
                                                <SelectItem value="100">100 бр.</SelectItem>
                                                <SelectItem value="200">200+ бр.</SelectItem>
                                                <SelectItem value="other">Друго</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {formData.packageType === "custom" && (
                                    <div className="space-y-2">
                                        <Label htmlFor="productLinks">Линкове към продукти от printground.net</Label>
                                        <Textarea
                                            id="productLinks"
                                            placeholder="Поставете линкове към желаните продукти (по един на ред)&#10;&#10;Пример:&#10;https://printground.net/product/teniski&#10;https://printground.net/product/shapki"
                                            className="min-h-[100px]"
                                            value={formData.productLinks}
                                            onChange={(e) => handleChange("productLinks", e.target.value)}
                                        />
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <Label htmlFor="logo">Прикачи лого (опционално)</Label>
                                    <div className="flex w-full items-center justify-center rounded-md border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-6 transition-colors hover:bg-slate-100">
                                        <div className="space-y-1 text-center">
                                            <Upload className="mx-auto h-8 w-8 text-slate-400" />
                                            <div className="flex text-sm text-slate-600">
                                                <label
                                                    htmlFor="file-upload"
                                                    className="relative cursor-pointer rounded-md bg-white font-medium text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:text-blue-500 px-1"
                                                >
                                                    <span>Качи файл</span>
                                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
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
                                    <Textarea
                                        id="message"
                                        placeholder="Брой служители, специфични цветове, дати за доставка..."
                                        value={formData.message}
                                        onChange={(e) => handleChange("message", e.target.value)}
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-base font-semibold"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                            Изпращане...
                                        </>
                                    ) : (
                                        "Изпрати запитване"
                                    )}
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
