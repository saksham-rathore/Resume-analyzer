import React from "react";


export default function Footer() {
    return (
        <div>
            <footer className="bg-surface-container dark:bg-inverse-surface w-full py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter max-w-[1280px] mx-auto px-margin-desktop">
                    <div className="md:col-span-1">
                        <div className="font-display-lg text-headline-md text-on-surface dark:text-inverse-on-surface mb-6">CareerAI</div>
                        <p className="font-body-md text-on-surface-variant dark:text-surface-variant mb-6 pr-4">
                            The intelligence layer for the modern professional. Built by career experts, powered by advanced AI.
                        </p>
                        <div className="flex gap-4">
                            <a className="w-10 h-10 rounded-full bg-surface-container-high dark:bg-surface-container-highest flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors" href="#">
                                <span className="material-symbols-outlined text-xl">share</span>
                            </a>
                            <a className="w-10 h-10 rounded-full bg-surface-container-high dark:bg-surface-container-highest flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors" href="#">
                                <span className="material-symbols-outlined text-xl">person_pin_circle</span>
                            </a>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-label-md text-on-surface dark:text-inverse-on-surface mb-6 uppercase tracking-wider">Product</h4>
                        <ul className="space-y-4">
                            <li><a className="font-body-md text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary transition-colors duration-200" href="#">Resume Builder</a></li>
                            <li><a className="font-body-md text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary transition-colors duration-200" href="#">ATS Checker</a></li>
                            <li><a className="font-body-md text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary transition-colors duration-200" href="#">Keyword Finder</a></li>
                            <li><a className="font-body-md text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary transition-colors duration-200" href="#">Job Matcher</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-label-md text-on-surface dark:text-inverse-on-surface mb-6 uppercase tracking-wider">Company</h4>
                        <ul className="space-y-4">
                            <li><a className="font-body-md text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary transition-colors duration-200" href="#">About Us</a></li>
                            <li><a className="font-body-md text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary transition-colors duration-200" href="#">Careers</a></li>
                            <li><a className="font-body-md text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary transition-colors duration-200" href="#">Contact Us</a></li>
                            <li><a className="font-body-md text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary transition-colors duration-200" href="#">Documentation</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-label-md text-on-surface dark:text-inverse-on-surface mb-6 uppercase tracking-wider">Legal</h4>
                        <ul className="space-y-4">
                            <li><a className="font-body-md text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary transition-colors duration-200" href="#">Privacy Policy</a></li>
                            <li><a className="font-body-md text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary transition-colors duration-200" href="#">Terms of Service</a></li>
                            <li><a className="font-body-md text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary transition-colors duration-200" href="#">Cookie Policy</a></li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-[1280px] mx-auto px-margin-desktop mt-12 pt-8 border-t border-outline-variant/30 text-center">
                    <p className="font-body-md text-on-surface-variant dark:text-surface-variant opacity-70">
                        © 2024 CareerAI Analysis. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    )
}