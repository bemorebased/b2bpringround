"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import { useEffect } from "react";

export function Analytics() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-XXXXXXXXXX"; // Placeholder
    const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID || "XXXXXXXXXXXXXXX"; // Placeholder

    useEffect(() => {
        if (pathname && window.gtag) {
            window.gtag("config", GA_ID, {
                page_path: pathname,
            });
        }
    }, [pathname, searchParams, GA_ID]);

    useEffect(() => {
        if (pathname && window.fbq) {
            window.fbq('track', 'PageView');
        }
    }, [pathname, searchParams]);

    return (
        <>
            {/* Google Analytics */}
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            />
            <Script
                id="google-analytics"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${GA_ID}', {
                            page_path: window.location.pathname,
                        });
                    `,
                }}
            />

            {/* Facebook Pixel */}
            <Script
                id="fb-pixel"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        !function(f,b,e,v,n,t,s)
                        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                        n.queue=[];t=b.createElement(e);t.async=!0;
                        t.src=v;s=b.getElementsByTagName(e)[0];
                        s.parentNode.insertBefore(t,s)}(window, document,'script',
                        'https://connect.facebook.net/en_US/fbevents.js');
                        fbq('init', '${FB_PIXEL_ID}');
                        fbq('track', 'PageView');
                    `,
                }}
            />
        </>
    );
}

// Type definitions for window
declare global {
    interface Window {
        gtag: any;
        fbq: any;
        dataLayer: any;
    }
}
