import Link from "next/link";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-slate-900 pt-16 pb-8 text-slate-300">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

                    {/* Company Info */}
                    <div>
                        <h3 className="mb-4 text-lg font-bold text-white">B2B Printground</h3>
                        <p className="mb-6 text-sm leading-relaxed">
                            Вашият надежден партньор за корпоративно брандиране и подаръци.
                            Създаваме емоция и принадлежност чрез качествени продукти.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="mb-4 text-lg font-bold text-white">Бързи връзки</h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <Link href="#" className="hover:text-blue-400 transition-colors">Начало</Link>
                            </li>
                            <li>
                                <Link href="#process" className="hover:text-blue-400 transition-colors">Как работим</Link>
                            </li>
                            <li>
                                <Link href="#packages" className="hover:text-blue-400 transition-colors">Пакети</Link>
                            </li>
                            <li>
                                <Link href="#contact" className="hover:text-blue-400 transition-colors">Поискай оферта</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="col-span-1 lg:col-span-2">
                        <h3 className="mb-4 text-lg font-bold text-white">Контакти</h3>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <ul className="space-y-3 text-sm">
                                <li className="flex items-start gap-3">
                                    <Mail className="h-5 w-5 text-blue-500 shrink-0" />
                                    <a href="mailto:sales@printground.net" className="hover:text-white transition-colors">
                                        sales@printground.net
                                    </a>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Phone className="h-5 w-5 text-blue-500 shrink-0" />
                                    <div className="space-y-1">
                                        <a href="tel:+359896718110" className="block hover:text-white transition-colors">
                                            +359 896 718 110
                                        </a>
                                        <a href="tel:+359892317401" className="block hover:text-white transition-colors">
                                            +359 892 317 401
                                        </a>
                                    </div>
                                </li>
                            </ul>

                            <ul className="space-y-3 text-sm">
                                <li className="flex items-start gap-3">
                                    <MapPin className="h-5 w-5 text-blue-500 shrink-0" />
                                    <span className="leading-relaxed">
                                        Бизнес Парк Флавия,<br />
                                        ул. "Коматевско шосе",<br />
                                        Пловдив, България
                                    </span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Clock className="h-5 w-5 text-blue-500 shrink-0" />
                                    <span>Пон - Пет / 9:00 - 17:00</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-16 border-t border-slate-800 pt-8 text-center text-xs text-slate-500">
                    <p>&copy; 2026 Printground. Всички права запазени.</p>
                    <p className="mt-2">Created by Printground Family</p>
                </div>
            </div>
        </footer>
    );
}
