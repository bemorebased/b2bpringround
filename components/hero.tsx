import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function Hero() {
    return (
        <section className="relative overflow-hidden bg-slate-50 py-20 lg:py-32">
            <div className="absolute inset-0 z-0">
                <Image
                    src="/expostart/hero2.webp"
                    alt="Corporate gifting background"
                    fill
                    className="object-cover opacity-20"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-50/90 to-slate-50/50" />
            </div>
            <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                        Подарете отношение, <br className="hidden sm:inline" />спечелете лоялност.
                    </h1>
                    <p className="mt-6 text-xl font-medium text-slate-600">
                        Край на хаоса с доставчици. Премиум брандинг решения, които говорят вместо вас и работят за вашия имидж.
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm font-medium text-slate-600">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-blue-600" />
                            Спестявате време и нерви
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-blue-600" />
                            Гарантирано "WOW" качество
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5 text-blue-600" />
                            Цялостна грижа за бранда
                        </div>
                    </div>

                    <div className="mt-10 flex justify-center gap-4">
                        <Button asChild size="lg" className="h-12 px-8 text-base bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                            <Link href="#occasions">
                                Вижте как трансформираме бизнеса ви
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Decorative background elements can be added here */}
            <div className="absolute top-0 left-0 -z-10 h-full w-full bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        </section>
    );
}
