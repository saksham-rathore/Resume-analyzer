import React from "react";

export default function Features() {
    return (
        <div>
            {/* Features */}
            <section className="py-24 bg-surface-container-lowest">
                <div className="max-w-[1280px] mx-auto px-margin-desktop">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                        <div className="max-w-2xl">
                            <h2 className="font-display-lg text-headline-lg mb-4">Built for the Modern Job Market</h2>
                            <p className="font-body-lg text-body-lg text-on-surface-variant">Comprehensive tools designed to give you an unfair advantage in a competitive hiring environment.</p>
                        </div>
                        <button className="font-label-md text-primary flex items-center gap-2 group">
                            Explore all features <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature Card 1  */}
                        <div className="group p-8 bg-surface rounded-xl border border-outline-variant/30 hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-xl">
                            <div className="mb-6 flex justify-between items-start">
                                <div className="p-3 bg-primary/5 rounded-lg text-primary">
                                    <span className="material-symbols-outlined text-3xl" data-icon="analytics">analytics</span>
                                </div>
                                <div className="relative w-12 h-12">
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle className="text-surface-variant" cx="24" cy="24" fill="transparent" r="20" stroke="currentColor" stroke-width="4"></circle>
                                        <circle className="text-primary" cx="24" cy="24" fill="transparent" r="20" stroke="currentColor" stroke-dasharray="125.6" stroke-dashoffset="30" stroke-width="4"></circle>
                                    </svg>
                                    <span className="absolute inset-0 flex items-center justify-center font-label-sm text-[10px]">92%</span>
                                </div>
                            </div>
                            <h3 className="font-headline-md text-headline-md mb-4 group-hover:text-primary transition-colors">ATS Compatibility Score</h3>
                            <p className="font-body-md text-on-surface-variant mb-6">See exactly how a robot views your resume. We predict your likelihood of passing automatic filtering systems with 98% accuracy.</p>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-2 font-label-md text-on-surface">
                                    <span className="material-symbols-outlined text-green-500 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                    Parsing Reliability
                                </li>
                                <li className="flex items-center gap-2 font-label-md text-on-surface">
                                    <span className="material-symbols-outlined text-green-500 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                    Ranking Prediction
                                </li>
                            </ul>
                        </div>
                        {/* Feature Card 2  */}
                        <div className="group p-8 bg-surface rounded-xl border border-outline-variant/30 hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-xl">
                            <div className="mb-6">
                                <div className="p-3 bg-tertiary/5 rounded-lg text-tertiary inline-block">
                                    <span className="material-symbols-outlined text-3xl" data-icon="key">key</span>
                                </div>
                            </div>
                            <h3 className="font-headline-md text-headline-md mb-4 group-hover:text-tertiary transition-colors">Keyword Optimization</h3>
                            <p className="font-body-md text-on-surface-variant mb-6">Our NLP engine identifies missing hard skills and industry-specific keywords required for your target job descriptions.</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                <span className="px-2 py-1 bg-surface-container rounded font-label-sm border border-outline-variant/20">Machine Learning</span>
                                <span className="px-2 py-1 bg-surface-container rounded font-label-sm border border-outline-variant/20">Agile</span>
                                <span className="px-2 py-1 bg-tertiary/10 text-tertiary rounded font-label-sm border border-tertiary/20">+12 more</span>
                            </div>
                        </div>
                        {/* Feature Card 3  */}
                        <div className="group p-8 bg-surface rounded-xl border border-outline-variant/30 hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-xl">
                            <div className="mb-6">
                                <div className="p-3 bg-secondary/5 rounded-lg text-secondary inline-block">
                                    <span className="material-symbols-outlined text-3xl" data-icon="architecture">architecture</span>
                                </div>
                            </div>
                            <h3 className="font-headline-md text-headline-md mb-4 group-hover:text-secondary transition-colors">Formatting Suggestions</h3>
                            <p className="font-body-md text-on-surface-variant mb-6">Expert layout advice to ensure human recruiters find the most important information in the 6 seconds they spend on your file.</p>
                            <div className="bg-surface-container-high p-4 rounded-lg flex items-center justify-center gap-4">
                                <div className="w-12 h-16 bg-white shadow-sm border border-outline-variant/20 rounded-sm"></div>
                                <span className="material-symbols-outlined text-on-surface-variant">trending_flat</span>
                                <div className="w-12 h-16 bg-white shadow-md border-2 border-primary/40 rounded-sm relative">
                                    <div className="absolute inset-x-1 top-2 h-1 bg-primary/20"></div>
                                    <div className="absolute inset-x-1 top-4 h-1 bg-primary/20 w-3/4"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}