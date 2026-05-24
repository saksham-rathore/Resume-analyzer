'use client';

import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200/60 bg-white py-16 px-6 relative z-10">
      <div className="landing-content-width mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Logo & Slogan */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-normal to-blue-dark flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <span className="font-cabinet font-extrabold text-base text-slate-800 tracking-tight">
              CV<span className="text-blue-normal">Shield</span>
            </span>
          </div>
          <p className="text-xs text-slate-500 max-w-xs">
            AI-Powered ATS resume analyzing and structural optimization engine.
          </p>
        </div>

        {/* Links & Quick Operations */}
        <div className="flex flex-wrap justify-center gap-8 text-xs font-semibold text-slate-500">
          <a href="#features" className="hover:text-blue-normal transition-colors">Features</a>
          <a href="#simulator" className="hover:text-blue-normal transition-colors">ATS Simulator</a>
          <a href="#workflow" className="hover:text-blue-normal transition-colors">Process</a>
          <a href="#testimonials" className="hover:text-blue-normal transition-colors">Success Stories</a>
          <a href="/privacy" className="hover:text-blue-normal transition-colors">Privacy Policy</a>
          <a href="/terms" className="hover:text-blue-normal transition-colors">Terms of Service</a>
        </div>
      </div>

      <div className="landing-content-width mx-auto border-t border-slate-100 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-500 gap-4">
        <p>© {new Date().getFullYear()} CV-Shield / Resume Analyzer. All rights reserved.</p>
        <p>
          Powered by Drizzle, BullMQ, and deep career modeling engines.
        </p>
      </div>
    </footer>
  );
}
