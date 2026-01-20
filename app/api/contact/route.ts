import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { company, name, email, phone, packageType, quantity, productLinks, message } = body;

        // Validate required fields
        if (!company || !name || !email || !phone) {
            return NextResponse.json(
                { success: false, error: "Липсват задължителни полета" },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { success: false, error: "Невалиден email адрес" },
                { status: 400 }
            );
        }

        // Validate phone format (at least 7 characters)
        if (!phone || phone.length < 7) {
            return NextResponse.json(
                { success: false, error: "Невалиден телефонен номер" },
                { status: 400 }
            );
        }

        const timestamp = new Date().toISOString();

        // Log the inquiry
        console.log("B2B Inquiry Received:", {
            timestamp,
            company,
            name,
            email,
            phone,
            packageType: packageType || "Not specified",
            quantity: quantity || "Not specified",
            productLinks: productLinks || "None",
            message: message || "No message",
        });

        // Package names mapping
        const packageNames: Record<string, string> = {
            "party-pack": "PARTY PACK",
            "jubilee-gold": "JUBILEE GOLD",
            "custom": "CUSTOM (Персонализиран)",
        };

        const packageDisplayName = packageNames[packageType] || packageType || "Не е избран";

        // Send email via Resend if API key is available
        if (process.env.RESEND_API_KEY) {
            try {
                const response = await fetch("https://api.resend.com/emails", {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        from: "B2B Printground <noreply@printground.net>",
                        to: "sales@printground.net",
                        replyTo: email,
                        subject: `🎁 Ново B2B запитване - ${packageDisplayName} - ${company}`,
                        html: `
                            <div style="font-family: 'Segoe UI', Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; background: #f8fafc; padding: 24px; border-radius: 12px;">
                                <div style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%); padding: 24px; border-radius: 12px 12px 0 0; margin: -24px -24px 24px -24px;">
                                    <h1 style="color: #fff; margin: 0; font-size: 24px;">🎁 Ново B2B запитване</h1>
                                    <p style="color: #94a3b8; margin: 8px 0 0 0; font-size: 14px;">От: ${company}</p>
                                </div>

                                <div style="background: #fff; padding: 24px; border-radius: 8px; margin-bottom: 16px; border: 1px solid #e2e8f0;">
                                    <h2 style="color: #1e293b; margin: 0 0 16px 0; font-size: 18px; border-bottom: 2px solid #3b82f6; padding-bottom: 8px;">📋 Контактни данни</h2>
                                    <table style="width: 100%; border-collapse: collapse;">
                                        <tr><td style="padding: 8px 0; color: #64748b; width: 120px;">Име:</td><td style="padding: 8px 0; font-weight: 600;">${name}</td></tr>
                                        <tr><td style="padding: 8px 0; color: #64748b;">Компания:</td><td style="padding: 8px 0; font-weight: 600;">${company}</td></tr>
                                        <tr><td style="padding: 8px 0; color: #64748b;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a></td></tr>
                                        <tr><td style="padding: 8px 0; color: #64748b;">Телефон:</td><td style="padding: 8px 0; font-weight: 600;">${phone}</td></tr>
                                    </table>
                                </div>

                                <div style="background: #fff; padding: 24px; border-radius: 8px; margin-bottom: 16px; border: 1px solid #e2e8f0;">
                                    <h2 style="color: #1e293b; margin: 0 0 16px 0; font-size: 18px; border-bottom: 2px solid #10b981; padding-bottom: 8px;">📦 Детайли на поръчката</h2>
                                    <table style="width: 100%; border-collapse: collapse;">
                                        <tr><td style="padding: 8px 0; color: #64748b; width: 120px;">Пакет:</td><td style="padding: 8px 0; font-weight: 600; color: #1e293b;">${packageDisplayName}</td></tr>
                                        <tr><td style="padding: 8px 0; color: #64748b;">Количество:</td><td style="padding: 8px 0; font-weight: 600;">${quantity || "Не е указано"} бр.</td></tr>
                                    </table>
                                </div>

                                ${productLinks ? `
                                <div style="background: #fff; padding: 24px; border-radius: 8px; margin-bottom: 16px; border: 1px solid #e2e8f0;">
                                    <h2 style="color: #1e293b; margin: 0 0 16px 0; font-size: 18px; border-bottom: 2px solid #f59e0b; padding-bottom: 8px;">🔗 Линкове към продукти</h2>
                                    <p style="white-space: pre-wrap; background: #fefce8; padding: 16px; border-radius: 8px; margin: 0; font-family: monospace; font-size: 13px; border: 1px solid #fef08a;">${productLinks}</p>
                                </div>
                                ` : ""}

                                ${message ? `
                                <div style="background: #fff; padding: 24px; border-radius: 8px; margin-bottom: 16px; border: 1px solid #e2e8f0;">
                                    <h2 style="color: #1e293b; margin: 0 0 16px 0; font-size: 18px; border-bottom: 2px solid #8b5cf6; padding-bottom: 8px;">💬 Допълнително съобщение</h2>
                                    <p style="white-space: pre-wrap; margin: 0; line-height: 1.6;">${message}</p>
                                </div>
                                ` : ""}

                                <div style="background: #f1f5f9; padding: 16px; border-radius: 8px; margin-top: 24px;">
                                    <p style="margin: 0; color: #64748b; font-size: 12px;">
                                        <strong>Източник:</strong> https://b2b.printground.net<br>
                                        <strong>Дата/час:</strong> ${new Date(timestamp).toLocaleString("bg-BG")}
                                    </p>
                                </div>
                            </div>
                        `,
                    }),
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error("Resend API error:", errorText);
                    // Don't fail the request if email fails
                }
            } catch (emailError) {
                console.error("Email sending error:", emailError);
                // Don't fail the form submission if email fails
            }
        } else {
            console.log("RESEND_API_KEY not configured - email not sent");
        }

        return NextResponse.json({
            success: true,
            message: "Благодарим Ви! Вашето запитване е получено. Ще Ви изпратим оферта в най-кратък срок.",
            timestamp,
        });
    } catch (error) {
        console.error("Contact form error:", error);
        return NextResponse.json(
            { success: false, error: "Възникна грешка. Моля, опитайте отново." },
            { status: 500 }
        );
    }
}
