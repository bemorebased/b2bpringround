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
import { Upload, CheckCircle2, Loader2, AlertCircle, X, FileText, Plus, Link as LinkIcon } from "lucide-react";

interface ContactFormProps {
    prefillData?: {
        packageType?: string;
        quantity?: string;
        productLinks?: string;
    } | null;
}

interface AttachmentData {
    filename: string;
    content: string; // base64
    type: string;
}

const MAX_PRODUCT_LINKS = 10;
const DEFAULT_PRODUCT_LINKS = 3;
const MAX_FILE_SIZE_MB = 4; // Reduced to avoid Vercel body size limits

export function ContactForm({ prefillData }: ContactFormProps) {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [attachment, setAttachment] = useState<AttachmentData | null>(null);
    const [productLinks, setProductLinks] = useState<string[]>(Array(DEFAULT_PRODUCT_LINKS).fill(""));

    // Form state
    const [formData, setFormData] = useState({
        name: "",
        company: "",
        email: "",
        phone: "",
        packageType: "",
        quantity: "",
        message: "",
    });

    // Update form when prefillData changes
    useEffect(() => {
        if (prefillData) {
            setFormData(prev => ({
                ...prev,
                packageType: prefillData.packageType || prev.packageType,
                quantity: prefillData.quantity || prev.quantity,
            }));
            // Parse prefill product links if provided
            if (prefillData.productLinks) {
                const links = prefillData.productLinks.split("\n").filter(l => l.trim());
                const paddedLinks = [...links];
                while (paddedLinks.length < DEFAULT_PRODUCT_LINKS) {
                    paddedLinks.push("");
                }
                setProductLinks(paddedLinks.slice(0, MAX_PRODUCT_LINKS));
            }
        }
    }, [prefillData]);

    // Parse URL params for package pre-selection (Fallback)
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
                    }));
                }
                if (links) {
                    const decodedLinks = decodeURIComponent(links).split("\n").filter(l => l.trim());
                    const paddedLinks = [...decodedLinks];
                    while (paddedLinks.length < DEFAULT_PRODUCT_LINKS) {
                        paddedLinks.push("");
                    }
                    setProductLinks(paddedLinks.slice(0, MAX_PRODUCT_LINKS));
                }
            }
        }
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Limit size to avoid Vercel body size limits
        if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
            setError(`Файлът е твърде голям. Максималният размер е ${MAX_FILE_SIZE_MB}MB.`);
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const content = reader.result as string;
            setAttachment({
                filename: file.name,
                content: content,
                type: file.type
            });
            setError(null);
        };
        reader.readAsDataURL(file);
    };

    const removeAttachment = () => {
        setAttachment(null);
        const input = document.getElementById("file-upload") as HTMLInputElement;
        if (input) input.value = "";
    };

    const handleProductLinkChange = (index: number, value: string) => {
        const newLinks = [...productLinks];
        newLinks[index] = value;
        setProductLinks(newLinks);
    };

    const addProductLink = () => {
        if (productLinks.length < MAX_PRODUCT_LINKS) {
            setProductLinks([...productLinks, ""]);
        }
    };

    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const file = e.dataTransfer.files?.[0];
        if (!file) return;

        // Limit size to avoid Vercel body size limits
        if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
            setError(`Файлът е твърде голям. Максималният размер е ${MAX_FILE_SIZE_MB}MB.`);
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const content = reader.result as string;
            setAttachment({
                filename: file.name,
                content: content,
                type: file.type
            });
            setError(null);
        };
        reader.readAsDataURL(file);
    };

    const removeProductLink = (index: number) => {
        if (productLinks.length > 1) {
            const newLinks = productLinks.filter((_, i) => i !== index);
            setProductLinks(newLinks);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Filter out empty product links and join them
            const filteredLinks = productLinks.filter(link => link.trim());

            const payload = {
                ...formData,
                productLinks: filteredLinks.join("\n"),
                attachment: attachment
            };

            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            // Handle non-JSON responses (e.g., Vercel body size limit errors)
            let data;
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                data = await response.json();
            } else {
                // Not JSON - likely a server error page
                const text = await response.text();
                console.error("Non-JSON response:", text.substring(0, 200));
                if (text.includes("Request Entity Too Large") || text.includes("body exceeded") || response.status === 413) {
                    throw new Error("Файлът е твърде голям. Моля, използвайте по-малък файл (до 4MB).");
                }
                throw new Error("Сървърна грешка. Моля, опитайте отново без прикачен файл.");
            }

            if (!response.ok || !data.success) {
                throw new Error(data.error || "Възникна грешка при изпращането. Моля, опитайте отново.");
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
        "party-pack": "Стандарт (За екипи)",
        "jubilee-gold": "Премиум+ (Premium)",
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
                                    setAttachment(null);
                                    setProductLinks(Array(DEFAULT_PRODUCT_LINKS).fill(""));
                                    setFormData({
                                        name: "",
                                        company: "",
                                        email: "",
                                        phone: "",
                                        packageType: "",
                                        quantity: "",
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
                            Персонална оферта до 24 часа
                        </h2>
                        <p className="mt-4 text-slate-600">
                            Попълнете формата и прикачете вашето лого
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
                                                <SelectItem value="party-pack">Стандарт (За екипи)</SelectItem>
                                                <SelectItem value="jubilee-gold">Премиум+ (Premium)</SelectItem>
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
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <Label>Линкове към продукти от printground.net</Label>
                                            <span className="text-xs text-slate-500">{productLinks.filter(l => l.trim()).length}/{MAX_PRODUCT_LINKS}</span>
                                        </div>
                                        <div className="space-y-2">
                                            {productLinks.map((link, index) => (
                                                <div key={index} className="flex items-center gap-2">
                                                    <div className="relative flex-1">
                                                        <LinkIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                                        <Input
                                                            placeholder={`https://printground.net/product/...`}
                                                            value={link}
                                                            onChange={(e) => handleProductLinkChange(index, e.target.value)}
                                                            className="pl-9"
                                                        />
                                                    </div>
                                                    {productLinks.length > 1 && (
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-9 w-9 shrink-0 text-slate-400 hover:text-red-500"
                                                            onClick={() => removeProductLink(index)}
                                                        >
                                                            <X className="h-4 w-4" />
                                                        </Button>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                        {productLinks.length < MAX_PRODUCT_LINKS && (
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={addProductLink}
                                                className="w-full border-dashed"
                                            >
                                                <Plus className="mr-2 h-4 w-4" />
                                                добави още
                                            </Button>
                                        )}
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <Label htmlFor="logo">Прикачи лого (опционално, до {MAX_FILE_SIZE_MB}MB)</Label>
                                    {!attachment ? (
                                        <div
                                            onDragOver={handleDragOver}
                                            onDragEnter={handleDragEnter}
                                            onDragLeave={handleDragLeave}
                                            onDrop={handleDrop}
                                            className={`flex w-full items-center justify-center rounded-md border-2 border-dashed px-6 py-6 transition-all duration-200 ${isDragging
                                                    ? "border-blue-500 bg-blue-50/50 ring-2 ring-blue-200 ring-offset-2 scale-[1.01]"
                                                    : "border-slate-300 bg-slate-50 hover:bg-slate-100"
                                                }`}
                                        >
                                            <div className="space-y-1 text-center pointer-events-none">
                                                <Upload className={`mx-auto h-8 w-8 transition-colors ${isDragging ? "text-blue-500" : "text-slate-400"}`} />
                                                <div className="flex text-sm text-slate-600 justify-center">
                                                    <label
                                                        htmlFor="file-upload"
                                                        className="relative cursor-pointer rounded-md font-medium text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:text-blue-500 px-1 pointer-events-auto"
                                                    >
                                                        <span>Качи файл</span>
                                                        <input
                                                            id="file-upload"
                                                            name="file-upload"
                                                            type="file"
                                                            className="sr-only"
                                                            onChange={handleFileChange}
                                                            accept=".png,.jpg,.jpeg,.pdf,.ai,.eps,.svg"
                                                        />
                                                    </label>
                                                    <p className="pl-1">или провлачи тук</p>
                                                </div>
                                                <p className="text-xs text-slate-500">
                                                    PNG, JPG, PDF, AI, EPS до {MAX_FILE_SIZE_MB}MB
                                                </p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex w-full items-center justify-between rounded-md border border-slate-200 bg-slate-50 px-4 py-3">
                                            <div className="flex items-center gap-3 overflow-hidden">
                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                                                    <FileText className="h-5 w-5" />
                                                </div>
                                                <div className="flex min-w-0 flex-col">
                                                    <span className="truncate text-sm font-medium text-slate-700">
                                                        {attachment.filename}
                                                    </span>
                                                    <span className="text-xs text-slate-500">
                                                        Готов за изпращане
                                                    </span>
                                                </div>
                                            </div>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-slate-500 hover:text-red-500"
                                                onClick={removeAttachment}
                                            >
                                                <X className="h-4 w-4" />
                                                <span className="sr-only">Премахни файл</span>
                                            </Button>
                                        </div>
                                    )}
                                    <p className="text-xs text-slate-500 mt-2">
                                        Имате лого? Можете да го пратите и на{" "}
                                        <a href="mailto:sales@printground.net" className="text-blue-600 hover:underline">sales@printground.net</a>
                                        {" "}или да поръчате{" "}
                                        <a href="https://printground.net/?porto_builder=order-samples" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">безплатни мостри</a>.
                                    </p>
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


