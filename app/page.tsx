"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { B2BHero } from "@/components/b2b-hero";
import { ProcessSteps } from "@/components/process-steps";
import { Testimonials } from "@/components/testimonials";
import { OccasionFilter } from "@/components/occasion-filter";
import { B2BPackages } from "@/components/b2b-packages";
import { VideoSection } from "@/components/video-section";
import { ContactForm } from "@/components/contact-form";
import { Footer } from "@/components/footer";
import { FAQ } from "@/components/faq";

export default function B2BPage() {
    const [selectedOccasion, setSelectedOccasion] = useState<any>(null); // State for filter
    const [formPrefill, setFormPrefill] = useState<any>(null); // State for contact form prefill

    const handlePackageSelect = (data: { packageType: string; quantity: string; productLinks?: string }) => {
        setFormPrefill(data);
        // Smooth scroll to contact form
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <main className="min-h-screen bg-slate-50">
            <Navbar />
            <B2BHero />
            <OccasionFilter
                selected={null}
                onSelect={() => { }}
            />
            <ProcessSteps />
            <B2BPackages onSelectPackage={handlePackageSelect} />
            <Testimonials />
            <VideoSection />
            <FAQ />
            <ContactForm prefillData={formPrefill} />
            <Footer />
        </main>
    );
}
