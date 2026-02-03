import { NextRequest, NextResponse } from "next/server";

interface AttachmentData {
    filename: string;
    content: string; // base64 data URL
    type: string;
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { company, name, email, phone, packageType, quantity, productLinks, message, attachment } = body;

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
        const formattedDate = new Date(timestamp).toLocaleString("bg-BG", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });

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
            hasAttachment: !!attachment,
        });

        // Package names mapping
        const packageNames: Record<string, string> = {
            "party-pack": "Стандарт",
            "jubilee-gold": "Премиум+",
            "custom": "Персонализиран",
        };

        const packageDisplayName = packageNames[packageType] || packageType || "Не е избран";

        // Package colors for visual styling
        const packageColors: Record<string, string> = {
            "party-pack": "#3b82f6",
            "jubilee-gold": "#f59e0b",
            "custom": "#8b5cf6",
        };
        const packageColor = packageColors[packageType] || "#3b82f6";

        // Check if Resend API key is configured
        if (!process.env.RESEND_API_KEY) {
            console.error("RESEND_API_KEY not configured - cannot send email");
            return NextResponse.json(
                { success: false, error: "Сървърна грешка при изпращане. Моля, свържете се директно с нас." },
                { status: 500 }
            );
        }

        // Prepare attachments for Resend - use content directly as base64 string
        const resendAttachments: { filename: string; content: string }[] = [];
        let attachmentFilename = "";
        if (attachment) {
            try {
                const attachmentData = attachment as AttachmentData;
                // Extract base64 content from data URL (remove "data:image/png;base64," prefix)
                const base64Content = attachmentData.content.split(",")[1];
                if (base64Content) {
                    attachmentFilename = attachmentData.filename;
                    resendAttachments.push({
                        filename: attachmentData.filename,
                        content: base64Content,
                    });
                    console.log("Attachment prepared:", attachmentData.filename, "Base64 length:", base64Content.length);
                }
            } catch (attachmentError) {
                console.error("Error processing attachment:", attachmentError);
            }
        }

        // Format product links as clickable list
        const formatProductLinks = (links: string) => {
            if (!links) return "";
            const linkArray = links.split('\n').filter((l: string) => l.trim());
            if (linkArray.length === 0) return "";

            return linkArray.map((link: string, index: number) => `
                <tr>
                    <td style="padding: 10px 16px; background: ${index % 2 === 0 ? '#fffbeb' : '#fef3c7'}; border-radius: 6px; margin-bottom: 4px;">
                        <a href="${link.trim()}" target="_blank" style="color: #d97706; text-decoration: none; font-weight: 500; word-break: break-all;">
                            🔗 ${link.trim()}
                        </a>
                    </td>
                </tr>
                <tr><td style="height: 6px;"></td></tr>
            `).join('');
        };

        // Build the beautiful email HTML
        const emailHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f1f5f9; padding: 32px 16px;">
        <tr>
            <td align="center">
                <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
                    
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 32px 40px; text-align: center;">
                            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                                🎁 Ново B2B Запитване
                            </h1>
                            <p style="color: #94a3b8; margin: 12px 0 0 0; font-size: 16px;">
                                от <strong style="color: #f8fafc;">${company}</strong>
                            </p>
                        </td>
                    </tr>

                    <!-- Package Badge -->
                    <tr>
                        <td style="padding: 24px 40px 0 40px; text-align: center;">
                            <span style="display: inline-block; background: ${packageColor}; color: #ffffff; padding: 10px 24px; border-radius: 50px; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                                📦 ${packageDisplayName} • ${quantity || "N/A"} бр.
                            </span>
                        </td>
                    </tr>

                    <!-- Contact Info Card -->
                    <tr>
                        <td style="padding: 24px 40px;">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: #f8fafc; border-radius: 12px; border: 1px solid #e2e8f0;">
                                <tr>
                                    <td style="padding: 20px 24px; border-bottom: 1px solid #e2e8f0;">
                                        <h2 style="color: #1e293b; margin: 0; font-size: 16px; font-weight: 600;">
                                            👤 Контактна информация
                                        </h2>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 20px 24px;">
                                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td style="padding: 8px 0; color: #64748b; font-size: 14px; width: 100px;">Име:</td>
                                                <td style="padding: 8px 0; color: #1e293b; font-size: 14px; font-weight: 600;">${name}</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Фирма:</td>
                                                <td style="padding: 8px 0; color: #1e293b; font-size: 14px; font-weight: 600;">${company}</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Email:</td>
                                                <td style="padding: 8px 0;">
                                                    <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none; font-size: 14px; font-weight: 500;">${email}</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Телефон:</td>
                                                <td style="padding: 8px 0;">
                                                    <a href="tel:${phone}" style="color: #10b981; text-decoration: none; font-size: 14px; font-weight: 600;">${phone}</a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    ${productLinks ? `
                    <!-- Product Links Card -->
                    <tr>
                        <td style="padding: 0 40px 24px 40px;">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: #fffbeb; border-radius: 12px; border: 1px solid #fde68a;">
                                <tr>
                                    <td style="padding: 20px 24px; border-bottom: 1px solid #fde68a;">
                                        <h2 style="color: #92400e; margin: 0; font-size: 16px; font-weight: 600;">
                                            🛒 Избрани продукти (${productLinks.split('\n').filter((l: string) => l.trim()).length})
                                        </h2>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 16px 24px;">
                                        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                                            ${formatProductLinks(productLinks)}
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    ` : ""}

                    ${message ? `
                    <!-- Message Card -->
                    <tr>
                        <td style="padding: 0 40px 24px 40px;">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: #f0fdf4; border-radius: 12px; border: 1px solid #bbf7d0;">
                                <tr>
                                    <td style="padding: 20px 24px; border-bottom: 1px solid #bbf7d0;">
                                        <h2 style="color: #166534; margin: 0; font-size: 16px; font-weight: 600;">
                                            💬 Допълнително съобщение
                                        </h2>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 20px 24px;">
                                        <p style="color: #1e293b; margin: 0; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    ` : ""}

                    ${resendAttachments.length > 0 ? `
                    <!-- Attachment Notice -->
                    <tr>
                        <td style="padding: 0 40px 24px 40px;">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: #faf5ff; border-radius: 12px; border: 1px solid #e9d5ff;">
                                <tr>
                                    <td style="padding: 20px 24px;">
                                        <p style="color: #7c3aed; margin: 0; font-size: 14px; font-weight: 500;">
                                            📎 Прикачен файл: <strong>${attachmentFilename}</strong>
                                        </p>
                                        <p style="color: #6b7280; margin: 8px 0 0 0; font-size: 13px;">
                                            Файлът е прикачен към този имейл.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    ` : ""}

                    <!-- Quick Actions -->
                    <tr>
                        <td style="padding: 0 40px 32px 40px;">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td align="center" style="padding: 8px;">
                                        <a href="mailto:${email}?subject=RE: B2B Запитване - ${company}" style="display: inline-block; background: #3b82f6; color: #ffffff; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 600;">
                                            ✉️ Отговори на ${name.split(' ')[0]}
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background: #f8fafc; padding: 20px 40px; border-top: 1px solid #e2e8f0;">
                            <p style="color: #64748b; margin: 0; font-size: 12px; text-align: center;">
                                Запитване получено на <strong>${formattedDate}</strong><br>
                                от <a href="https://b2b.printground.net" style="color: #3b82f6; text-decoration: none;">b2b.printground.net</a>
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>
        `.trim();

        // Build email payload
        const emailPayload: Record<string, unknown> = {
            from: "B2B Printground <b2b@printground.net>",
            to: "sales@printground.net",
            replyTo: email,
            subject: `🎁 Ново B2B запитване - ${packageDisplayName} - ${company}`,
            html: emailHtml,
        };

        // Add attachments if any
        if (resendAttachments.length > 0) {
            emailPayload.attachments = resendAttachments;
        }

        // Send email via Resend
        const response = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(emailPayload),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error("Resend API error:", response.status, errorData);

            // Check for specific error types
            const errorMessage = errorData?.message || "";
            if (errorMessage.includes("attachment") || errorMessage.includes("file")) {
                return NextResponse.json(
                    { success: false, error: "Грешка при прикачване на файла. Моля, опитайте без файл или с по-малък файл." },
                    { status: 400 }
                );
            }

            return NextResponse.json(
                { success: false, error: "Грешка при изпращане на имейла. Моля, опитайте отново." },
                { status: 500 }
            );
        }

        const responseData = await response.json();
        console.log("Email sent successfully:", responseData);

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
