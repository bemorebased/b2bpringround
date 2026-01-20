import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link href="/" className="flex items-center gap-2">
                    {/* Main Logo */}
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

                <div className="hidden md:flex md:items-center md:gap-6">
                    <Link href="#occasions" className="text-sm font-medium text-slate-600 hover:text-blue-600">
                        Поводи
                    </Link>
                    <Link href="#packages" className="text-sm font-medium text-slate-600 hover:text-blue-600">
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
