import React from "react";

export default function Connectors() {
    return (
        <div className="relative w-full">
            {/* Desktop Connector Lines */}
            <div className="hidden md:block absolute top-[64px] left-[15%] right-[50%] h-[2px] border-t-2 border-dashed border-outline-variant/40 -z-10 animate-pulse"></div>
            <div className="hidden md:block absolute top-[64px] left-[50%] right-[15%] h-[2px] border-t-2 border-dashed border-outline-variant/40 -z-10 animate-pulse"></div>

            {/* Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                
                {/* Step 1 */}
                <div className="relative p-8 bg-surface-container-lowest/50 backdrop-blur-md border border-outline-variant/20 rounded-3xl flex flex-col items-center text-center transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,33,228,0.08)] hover:-translate-y-2 hover:border-primary/30 group">
                    <span className="absolute top-6 right-8 font-display-lg text-4xl font-extrabold text-outline-variant/10 select-none group-hover:text-primary/10 transition-colors duration-500">01</span>
                    
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 shadow-sm transition-all duration-500 group-hover:bg-primary group-hover:scale-110 group-hover:shadow-[0_10px_25px_rgba(0,33,228,0.25)]">
                        <span className="material-symbols-outlined text-3xl text-primary group-hover:text-white transition-colors duration-500" data-icon="cloud_upload">cloud_upload</span>
                    </div>
                    
                    <h4 className="font-display-lg text-headline-md font-bold mb-3 text-on-surface group-hover:text-primary transition-colors duration-300">
                        Upload
                    </h4>
                    <p className="font-body-md text-on-surface-variant leading-relaxed text-sm max-w-xs">
                        Simply drag and drop your current resume or LinkedIn profile export.
                    </p>
                </div>

                {/* Step 2 */}
                <div className="relative p-8 bg-surface-container-lowest/50 backdrop-blur-md border border-outline-variant/20 rounded-3xl flex flex-col items-center text-center transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(86,94,116,0.08)] hover:-translate-y-2 hover:border-secondary/30 group">
                    <span className="absolute top-6 right-8 font-display-lg text-4xl font-extrabold text-outline-variant/10 select-none group-hover:text-secondary/10 transition-colors duration-500">02</span>
                    
                    <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6 shadow-sm transition-all duration-500 group-hover:bg-secondary group-hover:scale-110 group-hover:shadow-[0_10px_25px_rgba(86,94,116,0.25)]">
                        <span className="material-symbols-outlined text-3xl text-secondary group-hover:text-white transition-colors duration-500" data-icon="psychology">psychology</span>
                    </div>
                    
                    <h4 className="font-display-lg text-headline-md font-bold mb-3 text-on-surface group-hover:text-secondary transition-colors duration-300">
                        Analyse
                    </h4>
                    <p className="font-body-md text-on-surface-variant leading-relaxed text-sm max-w-xs">
                        Our CareerAI engine scans your document for keywords, formatting, and impact.
                    </p>
                </div>

                {/* Step 3 */}
                <div className="relative p-8 bg-surface-container-lowest/50 backdrop-blur-md border border-outline-variant/20 rounded-3xl flex flex-col items-center text-center transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(50,49,193,0.08)] hover:-translate-y-2 hover:border-tertiary/30 group">
                    <span className="absolute top-6 right-8 font-display-lg text-4xl font-extrabold text-outline-variant/10 select-none group-hover:text-tertiary/10 transition-colors duration-500">03</span>
                    
                    <div className="w-16 h-16 rounded-2xl bg-tertiary/10 flex items-center justify-center mb-6 shadow-sm transition-all duration-500 group-hover:bg-tertiary group-hover:scale-110 group-hover:shadow-[0_10px_25px_rgba(50,49,193,0.25)]">
                        <span className="material-symbols-outlined text-3xl text-tertiary group-hover:text-white transition-colors duration-500" data-icon="auto_awesome">auto_awesome</span>
                    </div>
                    
                    <h4 className="font-display-lg text-headline-md font-bold mb-3 text-on-surface group-hover:text-tertiary transition-colors duration-300">
                        Improve
                    </h4>
                    <p className="font-body-md text-on-surface-variant leading-relaxed text-sm max-w-xs">
                        Get actionable steps and tailored suggestions to make your resume shine.
                    </p>
                </div>

            </div>
        </div>
    )
}