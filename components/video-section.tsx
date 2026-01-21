"use client";

export function VideoSection() {
    return (
        <section className="py-20 bg-slate-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center mb-10">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                        Вижте процеса отблизо
                    </h2>
                    <p className="mt-4 text-lg text-slate-600">
                        Как превръщаме идеите ви в реалност
                    </p>
                </div>

                <div className="relative mx-auto w-full max-w-4xl rounded-2xl overflow-hidden bg-black shadow-2xl border border-slate-200">
                    <video
                        src="/printground.mp4"
                        controls
                        className="w-full h-auto block"
                        preload="metadata"
                    >
                        Вашият браузър не поддържа видео тага.
                    </video>
                </div>
            </div>
        </section>
    );
}
