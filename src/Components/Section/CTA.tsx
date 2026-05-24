import React from "react";

export default function CTA() {
    return (
        <section className="py-16 bg-surface">
            <div className="max-w-[1280px] mx-auto px-margin-desktop">
                <div className="bg-gradient-to-br from-primary via-primary to-tertiary text-white rounded-3xl p-12 md:p-16 text-center shadow-xl relative overflow-hidden">
                    {/* Glowing background circles for depth */}
                    <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white/5 blur-3xl -translate-y-12 translate-x-12"></div>
                    <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-white/5 blur-3xl translate-y-12 -translate-x-12"></div>
                    
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h3 className="font-display-lg text-headline-lg md:text-3xl font-bold mb-4 text-white leading-tight">
                            Ready to level up your career?
                        </h3>
                        <p className="font-body-md text-white/80 mb-8 max-w-lg mx-auto text-base">
                            Join over 10,000 successful professionals who used CareerAI to transform their job search. Get your first analysis in under 60 seconds.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <button className="bg-white text-primary px-8 py-3.5 rounded-full font-label-md hover:bg-surface-container-low transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0">
                                Get Started Free
                            </button>
                            <button className="bg-transparent text-white border border-white/30 px-8 py-3.5 rounded-full font-label-md hover:bg-white/10 hover:border-white transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0">
                                Watch Demo
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
