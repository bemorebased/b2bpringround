import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Switched to Inter as per design guidelines
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"], // Added cyrillic for Bulgarian support
});

export const metadata: Metadata = {
  title: "B2B Printground | Готови брандирани пакети",
  description: "Корпоративни подаръци и брандирани пакети за вашия екип. Изберете повод, ние ще се погрижим за останалото.",
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
        {children}
      </body>
    </html>
  );
}
