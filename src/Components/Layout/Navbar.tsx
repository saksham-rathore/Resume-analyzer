import React from "react";

export default function Navbar() {
    return (
        <div className="bg-surface text-on-surface font-body-md overflow-x-hidden selection:bg-primary/20">
            <nav className="fixed top-0 w-full z-50 glass-nav h-20 transition-all duration-300">
                <div className="flex justify-between items-center max-w-[1280px] mx-auto px-margin-desktop h-full">
                    <div className="font-display-lg text-headline-md tracking-tight text-primary font-bold">
                        CareerAI
                    </div>
                    <div className="hidden md:flex items-center gap-10">
                        <a className="nav-link nav-link-active font-label-md text-primary" href="#">Home</a>
                        <a className="nav-link font-label-md text-on-surface-variant hover:text-primary transition-colors duration-300" href="#">Features</a>
                        <a className="nav-link font-label-md text-on-surface-variant hover:text-primary transition-colors duration-300" href="#">Pricing</a>
                        <a className="nav-link font-label-md text-on-surface-variant hover:text-primary transition-colors duration-300" href="#">Login</a>
                        <button className="bg-primary text-on-primary px-7 py-2.5 rounded-xl font-label-md btn-premium-hover">Get Started</button>
                    </div>
                    <button className="md:hidden text-primary p-2">
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                </div>
            </nav>
        </div>
    )
}