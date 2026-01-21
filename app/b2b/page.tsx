"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { TrustedBy } from "@/components/trusted-by";
import { OccasionFilter, OccasionType } from "@/components/occasion-filter";
import { ProcessSteps } from "@/components/process-steps";
import { Packages } from "@/components/packages";
import { Testimonials } from "@/components/testimonials";
import { FAQ } from "@/components/faq";
import { ContactForm } from "@/components/contact-form";
import { Footer } from "@/components/footer";

export default function Home() {
  const [selectedOccasion, setSelectedOccasion] = useState<OccasionType | null>(null);

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <OccasionFilter
        selected={selectedOccasion}
        onSelect={setSelectedOccasion}
      />
      <Packages selectedOccasion={selectedOccasion} />
      <ProcessSteps />
      <Testimonials />
      <FAQ />
      <ContactForm />
      <Footer />
    </main>
  );
}
