'use client';

import React from 'react';

export default function Navbar() {
  return (
    <header className="glass-nav sticky top-0 w-full z-50 transition-all duration-300">
      <div className="landing-content-width mx-auto h-18 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-normal to-blue-dark flex items-center justify-center shadow-md shadow-blue-normal/20">
            <svg className="w-5.5 h-5.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <span className="font-cabinet font-extrabold text-xl text-brand-dark tracking-tight">
            CV<span className="text-blue-normal">Shield</span>
          </span>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="nav-link text-sm font-medium">Features</a>
          <a href="#simulator" className="nav-link text-sm font-medium">ATS Simulator</a>
          <a href="#workflow" className="nav-link text-sm font-medium">How It Works</a>
          <a href="#testimonials" className="nav-link text-sm font-medium">Success Stories</a>
        </nav>

        {/* Nav Actions */}
        <div className="flex items-center gap-4">
          <a href="/signIn" className="text-sm font-semibold text-slate-600 hover:text-blue-normal transition-colors">
            Sign In
          </a>
          <a href="/signup" className="btn-designer px-5 py-2.5 rounded-xl text-sm shadow-sm">
            Get Started Free
          </a>
        </div>
      </div>
    </header>
  );
}
