"use client";

import Image from "next/image";

const BRANDS = [
    { name: "BTL", src: "/printbrands/btl.png" },
    { name: "Chipolino", src: "/printbrands/chipolino.png" },
    { name: "Intu", src: "/printbrands/intu.png" },
    { name: "Maxcom", src: "/printbrands/maxcom.png" },
    { name: "Meggle", src: "/printbrands/meggle.png" },
    { name: "Obshtinska Banka", src: "/printbrands/obshtinska.png" },
    { name: "Technomarket", src: "/printbrands/technom.png" },
    { name: "Tehko", src: "/printbrands/tehko.png" },
    { name: "Vedena", src: "/printbrands/vedenapng.png" },
    { name: "Yavlena", src: "/printbrands/yavlena.png" },
];

export function BrandSlider() {
    return (
        <section className="py-12 bg-white border-t border-slate-100 overflow-hidden">
            <div className="container mx-auto px-4 mb-8 text-center">
                <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                    Доверени партньори
                </p>
            </div>

            <div className="relative w-full overflow-hidden">
                {/* Gradient Masks for smooth fade out on edges */}
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10"></div>
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10"></div>

                {/* Slider Track */}
                <div className="flex w-max animate-infinite-scroll hover:[animation-play-state:paused]">
                    {/* First copy of logos */}
                    <div className="flex items-center gap-12 mx-6">
                        {BRANDS.map((brand, idx) => (
                            <div key={`original-${idx}`} className="relative h-12 w-32 md:h-16 md:w-40 flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 hover:scale-110 cursor-pointer">
                                <Image
                                    src={brand.src}
                                    alt={`${brand.name} logo`}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        ))}
                    </div>
                    {/* Second copy for seamless Ioop */}
                    <div className="flex items-center gap-12 mx-6">
                        {BRANDS.map((brand, idx) => (
                            <div key={`copy-${idx}`} className="relative h-12 w-32 md:h-16 md:w-40 flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 hover:scale-110 cursor-pointer">
                                <Image
                                    src={brand.src}
                                    alt={`${brand.name} logo`}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        ))}
                    </div>
                    {/* Third copy for wider screens buffering */}
                    <div className="flex items-center gap-12 mx-6">
                        {BRANDS.map((brand, idx) => (
                            <div key={`copy2-${idx}`} className="relative h-12 w-32 md:h-16 md:w-40 flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 hover:scale-110 cursor-pointer">
                                <Image
                                    src={brand.src}
                                    alt={`${brand.name} logo`}
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes infinite-scroll {
                    from { transform: translateX(0); }
                    to { transform: translateX(-33.33%); }
                }
                .animate-infinite-scroll {
                    animation: infinite-scroll 40s linear infinite;
                }
            `}</style>
        </section>
    );
}
