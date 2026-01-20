import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Switched to Inter as per design guidelines
import { Suspense } from "react";
import "./globals.css";
import { Analytics } from "@/components/analytics";
import { ScarcityTimer } from "@/components/scarcity-timer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"], // Added cyrillic for Bulgarian support
});

export const metadata: Metadata = {
  title: "B2B Printground | Готови брандирани пакети",
  description: "Корпоративни подаръци и брандирани пакети за вашия екип. Изберете повод, ние ще се погрижим за останалото. Професионално брандиране и доставка.",
  keywords: ["корпоративни подаръци", "брандирани пакети", "сувенири", "рекламни материали", "бизнес подаръци", "printground", "онлайн печат"],
  openGraph: {
    title: "B2B Printground | Готови брандирани пакети",
    description: "Корпоративни подаръци и брандирани пакети за вашия екип. Изберете повод, ние ще се погрижим за останалото.",
    url: "https://b2b.printground.net",
    siteName: "B2B Printground",
    locale: "bg_BG",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bg" className="scroll-smooth">
      <body
        className={`${inter.variable} font-sans antialiased text-slate-900 bg-white dark:bg-slate-950 dark:text-slate-50`}
      >
        <Suspense fallback={null}>
          <Analytics />
          <ScarcityTimer />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
