import React from "react";


export default function Connectors() {
    return (
        <div>
            <div className="hidden md:block absolute top-1/4 left-1/3 right-1/3 h-0.5 border-t-2 border-dashed border-outline-variant -z-10"></div>
            <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary-fixed text-primary flex items-center justify-center mb-6 shadow-sm">
                    <span className="material-symbols-outlined text-3xl" data-icon="cloud_upload">cloud_upload</span>
                </div>
                <h4 className="font-headline-md text-headline-md mb-3">1. Upload</h4>
                <p className="font-body-md text-on-surface-variant">Simply drag and drop your current resume or LinkedIn profile export.</p>
            </div>
            <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-secondary-fixed text-secondary flex items-center justify-center mb-6 shadow-sm">
                    <span className="material-symbols-outlined text-3xl" data-icon="psychology">psychology</span>
                </div>
                <h4 className="font-headline-md text-headline-md mb-3">2. Analyse</h4>
                <p className="font-body-md text-on-surface-variant">Our CareerAI engine scans your document for keywords, formatting, and impact.</p>
            </div>
            <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-tertiary-fixed text-tertiary flex items-center justify-center mb-6 shadow-sm">
                    <span className="material-symbols-outlined text-3xl" data-icon="auto_awesome">auto_awesome</span>
                </div>
                <h4 className="font-headline-md text-headline-md mb-3">3. Improve</h4>
                <p className="font-body-md text-on-surface-variant">Get actionable steps and tailored suggestions to make your resume shine.</p>
            </div>
        </div>
    )
}