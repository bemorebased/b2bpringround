import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
    {
        question: "Колко време отнема процеса на брандиране?",
        answer: "След уточняване на всички детайли по поръчката, срока на изработка и доставката е между 8 – 12 работни дни.",
    },
    {
        question: "Как да разбера колко ще струва брандирането?",
        answer: "Базирайки се на цветността на логото, тиража и печатната техника ще изпратим персонализирана и детайлна оферта.",
    },
    {
        question: "Ще получа ли визуализация преди печат?",
        answer: "Ще изпратим файл с визуализация в реален мащаб и единствено след вашето одобрение, ще пристъпим към печат.",
    },
    {
        question: "Как да избера печатна техника?",
        answer: "В зависимост от цветността на вашето лого, материала и желания тираж, ще ви посъветваме за най-оптималният вариант съобразно изискванията Ви.",
    },
];

export function FAQ() {
    return (
        <section className="bg-gradient-to-b from-slate-50/50 via-white to-white py-20 border-t border-slate-200/60">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl">
                    <div className="mb-12 text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                            Често задавани въпроси
                        </h2>
                        <p className="mt-4 text-slate-600">
                            Всичко, което трябва да знаете преди да поръчате
                        </p>
                    </div>

                    <Accordion type="single" collapsible className="w-full">
                        {FAQS.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`}>
                                <AccordionTrigger className="text-left font-medium text-slate-900 hover:text-blue-600">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-slate-600">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    );
}
