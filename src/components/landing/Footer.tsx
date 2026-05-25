'use client';

import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200/60 bg-white py-16 px-6 relative z-10 overflow-hidden">
      {/* Background Grid Pattern Accent - Extremely subtle */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_100%,#000_70%,transparent_100%)] opacity-60 pointer-events-none"></div>

      <div className="landing-content-width mx-auto relative z-10">
        
        {/* Pixel Perfect Banner Element - Mimics the exact screenshot shape and feel, adapted to Premium Light Mode */}
        <div className="w-full flex justify-center mb-16">
          <div className="w-full max-w-2xl bg-slate-50/80 backdrop-blur-md border border-slate-200/80 rounded-2xl px-8 py-10 sm:px-12 sm:py-12 flex flex-col items-center justify-center relative overflow-hidden transition-all duration-500 hover:border-slate-300 hover:shadow-2xl hover:shadow-slate-100/80 hover:-translate-y-1 group">
            
            {/* Retro-cybernetic corner detail lines */}
            <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-slate-300 group-hover:border-slate-500 transition-colors duration-300"></div>
            <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-slate-300 group-hover:border-slate-500 transition-colors duration-300"></div>
            <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-slate-300 group-hover:border-slate-500 transition-colors duration-300"></div>
            <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-slate-300 group-hover:border-slate-500 transition-colors duration-300"></div>
            
            {/* Blueprint guidelines */}
            <div className="absolute inset-x-5 top-5 border-t border-slate-200/50 border-dashed pointer-events-none"></div>
            <div className="absolute inset-y-5 left-5 border-l border-slate-200/50 border-dashed pointer-events-none"></div>
            <div className="absolute inset-x-5 bottom-5 border-b border-slate-200/50 border-dashed pointer-events-none"></div>
            <div className="absolute inset-y-5 right-5 border-r border-slate-200/50 border-dashed pointer-events-none"></div>
          </div>
        </div>

        {/* Cenra-inspired 5-Column Grid with vertical border lines */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-0 border-t border-slate-200/60 pt-16 pb-12">
          
          {/* Column 1: Brand Info */}
          <div className="flex flex-col md:pr-8">
            <div className="flex items-center gap-2.5 mb-4 group cursor-pointer">
              <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center transition-all duration-300 group-hover:bg-blue-normal group-hover:rotate-12">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="font-cabinet font-extrabold text-base text-slate-800 tracking-tight transition-colors duration-300 group-hover:text-blue-normal">
                CV<span className="text-slate-900 group-hover:text-blue-dark">Shield</span>
              </span>
            </div>
            
            <p className="text-xs text-slate-500 leading-relaxed font-satoshi mb-4 max-w-[200px]">
              AI-Powered ATS resume analyzing and structural optimization engine.
            </p>
            
            <span className="text-[10px] text-slate-400 font-satoshi">
              Designed & Developed by <a href="https://github.com/saksham-rathore" className="hover:text-slate-650 underline transition-colors duration-200">@saksham</a>
            </span>
            <span className="text-[10px] text-slate-400 font-satoshi mt-1">
              © {new Date().getFullYear()}. All rights reserved.
            </span>
          </div>

          {/* Column 2: Product */}
          <div className="flex flex-col pt-6 md:pt-0 border-t border-slate-100 md:border-t-0 md:border-l border-slate-200/60 border-dashed md:pl-8">
            <h4 className="text-xs font-bold text-slate-850 tracking-wider uppercase mb-4 font-satoshi">
              Product
            </h4>
            <div className="flex flex-col gap-3 text-xs text-slate-500 font-satoshi">
              <a href="#features" className="hover:text-slate-900 transition-colors duration-200">
                Features
              </a>
              <a href="#simulator" className="hover:text-slate-900 transition-colors duration-200">
                ATS Simulator
              </a>
              <a href="#workflow" className="hover:text-slate-900 transition-colors duration-200">
                Process
              </a>
            </div>
          </div>

          {/* Column 3: Resources */}
          <div className="flex flex-col pt-6 md:pt-0 border-t border-slate-100 md:border-t-0 md:border-l border-slate-200/60 border-dashed md:pl-8">
            <h4 className="text-xs font-bold text-slate-850 tracking-wider uppercase mb-4 font-satoshi">
              Resources
            </h4>
            <div className="flex flex-col gap-3 text-xs text-slate-500 font-satoshi">
              <a href="#testimonials" className="hover:text-slate-900 transition-colors duration-200">
                Success Stories
              </a>
              <a href="#simulator" className="hover:text-slate-900 transition-colors duration-200">
                Job Modeling
              </a>
              <a href="https://github.com/saksham-rathore/Resume-analyzer" className="hover:text-slate-900 transition-colors duration-200">
                Documentation
              </a>
            </div>
          </div>

          {/* Column 4: Company */}
          <div className="flex flex-col pt-6 md:pt-0 border-t border-slate-100 md:border-t-0 md:border-l border-slate-200/60 border-dashed md:pl-8">
            <h4 className="text-xs font-bold text-slate-850 tracking-wider uppercase mb-4 font-satoshi">
              Company
            </h4>
            <div className="flex flex-col gap-3 text-xs text-slate-500 font-satoshi">
              <a href="#hero" className="hover:text-slate-900 transition-colors duration-200">
                About Us
              </a>
              <a href="/privacy" className="hover:text-slate-900 transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="/terms" className="hover:text-slate-900 transition-colors duration-200">
                Terms of Service
              </a>
            </div>
          </div>

          {/* Column 5: Socials */}
          <div className="flex flex-col pt-6 md:pt-0 border-t border-slate-100 md:border-t-0 md:border-l border-slate-200/60 border-dashed md:pl-8">
            <h4 className="text-xs font-bold text-slate-850 tracking-wider uppercase mb-4 font-satoshi">
              Socials
            </h4>
            <div className="flex flex-col gap-3 text-xs text-slate-500 font-satoshi">
              <a href="https://github.com/saksham-rathore/Resume-analyzer" className="hover:text-slate-900 transition-colors duration-200">
                Github
              </a>
              <a href="https://linkedin.com" className="hover:text-slate-900 transition-colors duration-200">
                LinkedIn
              </a>
              <a href="https://x.com" className="hover:text-slate-900 transition-colors duration-200">
                X.com
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Technical Copyright & Stack Row */}
        <div className="border-t border-slate-100 pt-8 mt-4 flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-400 gap-4 font-satoshi">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <p>Active Node System Diagnostics: ONLINE</p>
          </div>
          <p className="font-pixel text-[8px] tracking-widest uppercase text-slate-400 select-none">
            POWERED BY DRIZZLE // BULLMQ // AI MODELING
          </p>
        </div>

        {/* Massive Cenra-style Watermark Accent */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 pt-16 pb-4 select-none opacity-[0.05] hover:opacity-10 transition-all duration-700 pointer-events-none">
          <svg className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-slate-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span className="font-playfair text-[9vw] font-bold text-slate-800 leading-none tracking-tight">
            CVShield
          </span>
        </div>

      </div>
    </footer>
  );
}
