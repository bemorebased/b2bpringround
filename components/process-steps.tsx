import {
    Search,
    Palette,
    Truck,
    PackageCheck
} from "lucide-react";

const STEPS = [
    {
        title: "1. Избирате повод",
        description: "Разгледайте нашите куратирани селекции за събития или сезонни празници.",
        icon: Search,
    },
    {
        title: "2. Персонализираме",
        description: "Нашите дизайнери адаптират всеки продукт с вашето лого и бранд идентичност.",
        icon: Palette,
    },
    {
        title: "3. Произвеждаме",
        description: "Висококачествен печат и брандиране с внимание към всеки детайл.",
        icon: PackageCheck,
    },
    {
        title: "4. Доставяме",
        description: "Готовите пакети пристигат при вас или директно до офисите на партньорите.",
        icon: Truck,
    },
];

export function ProcessSteps() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-16 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        Как работим?
                    </h2>
                    <p className="mt-4 text-lg text-slate-600">
                        Опростен процес в 4 лесни стъпки
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-4 relative">
                    {/* Connecting Line (Desktop Only) */}
                    <div className="absolute top-12 left-0 hidden w-full -translate-y-1/2 md:block">
                        <div className="h-0.5 w-full bg-slate-100" />
                    </div>

                    {STEPS.map((step, index) => (
                        <div key={index} className="relative flex flex-col items-center text-center">
                            <div className="z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-blue-600 text-white shadow-lg">
                                <step.icon className="h-8 w-8" />
                            </div>
                            <h3 className="mb-2 text-xl font-bold text-slate-900">{step.title}</h3>
                            <p className="max-w-xs text-sm text-slate-600">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
