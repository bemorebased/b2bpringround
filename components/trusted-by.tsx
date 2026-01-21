"use client";

import Image from "next/image";

// Use local files we just downloaded
const CLIENTS = [
    { name: "Radisson", src: "/logos/radisson.png" },
    { name: "Bulmint", src: "/logos/bulmint.png" },
    { name: "Voom", src: "/logos/voom.png" },
    { name: "Okin", src: "/logos/okin.png" },
];

export function TrustedBy() {
    return (
        <section className="relative border-y border-slate-100 bg-white py-12 overflow-hidden">
            {/* Background Image - Blurred */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <Image
                    src="/clients.webp"
                    alt="Clients background"
                    fill
                    className="object-cover blur-[2px]"
                />
            </div>

            <div className="container relative z-10 mx-auto px-4 text-center">
                <p className="mb-10 text-sm font-semibold uppercase tracking-wider text-slate-500">
                    Доверени партньори на над 150 компании
                </p>
                <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20">
                    {CLIENTS.map((client) => (
                        <div key={client.name} className="relative h-12 w-32 md:h-16 md:w-40 transition-all duration-300 hover:scale-105 hover:opacity-100 opacity-80 decoration-gray-400 grayscale hover:grayscale-0">
                            <Image
                                src={client.src}
                                alt={`${client.name} logo`}
                                fill
                                className="object-contain" // Use object-contain to respect aspect ratio
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
