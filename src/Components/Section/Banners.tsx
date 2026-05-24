import React from "react";
import Connectors from "../UI/Connectors";

export default function Banners() {
    return (
        <div>
            <div className="bg-surface-container-low py-12 border-y border-outline-variant/20">
                <div className="max-w-[1280px] mx-auto px-margin-desktop text-center">
                    <h2 className="font-label-md text-on-surface-variant uppercase tracking-[0.2em] mb-8">Trusted by 10,000+ Job Seekers globally</h2>
                    <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        <span className="font-display-lg text-headline-md font-extrabold italic text-secondary">Google</span>
                        <span className="font-display-lg text-headline-md font-extrabold italic text-secondary">Amazon</span>
                        <span className="font-display-lg text-headline-md font-extrabold italic text-secondary">Meta</span>
                        <span className="font-display-lg text-headline-md font-extrabold italic text-secondary">Netflix</span>
                        <span className="font-display-lg text-headline-md font-extrabold italic text-secondary">Airbnb</span>
                    </div>
                </div>
            </div>
            <div className="py-24 bg-surface">
                <div className="max-w-[1280px] mx-auto px-margin-desktop">
                    <div className="text-center mb-16">
                        <h2 className="font-display-lg text-headline-lg mb-4">How it Works</h2>
                        <div className="w-20 h-1.5 bg-primary mx-auto rounded-full"></div>
                    </div>
                    <Connectors />
                </div>
            </div>
        </div>
    )
}