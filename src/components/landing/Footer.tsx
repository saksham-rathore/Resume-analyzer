"use client";

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 bg-slate-50/40 relative overflow-hidden pt-16 select-none">
      
      {/* Centered Navigation Links & Credits */}
      <div className="mx-auto max-w-[1200px] px-6 md:px-12 flex flex-col items-center z-10 relative">
        
        {/* Footer Navigation */}
        <nav className="flex items-center gap-8 text-xs font-semibold text-slate-500">
          <Link href="/#features" className="hover:text-[hsl(250,84%,54%)] transition-colors duration-300">
            Features
          </Link>
          <Link href="/#simulator" className="hover:text-[hsl(250,84%,54%)] transition-colors duration-300">
            ATS Simulator
          </Link>
          <Link href="/#working" className="hover:text-[hsl(250,84%,54%)] transition-colors duration-300">
            How It Works
          </Link>
        </nav>

        {/* Social Media Links */}
        <div className="flex items-center gap-6 mt-6">
          <a 
            href="https://twitter.com/saksham_rathore" 
            target="_blank" 
            rel="noreferrer" 
            className="text-slate-400 hover:text-[#1DA1F2] hover:scale-110 transition-all duration-300"
            aria-label="Twitter / X"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </a>
          <a 
            href="https://linkedin.com/in/saksham-rathore" 
            target="_blank" 
            rel="noreferrer" 
            className="text-slate-400 hover:text-[#0A66C2] hover:scale-110 transition-all duration-300"
            aria-label="LinkedIn"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
          <a 
            href="https://github.com/saksham-rathore" 
            target="_blank" 
            rel="noreferrer" 
            className="text-slate-400 hover:text-[#24292F] hover:scale-110 transition-all duration-300"
            aria-label="GitHub"
          >
            <svg className="w-[26px] h-[26px]" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
            </svg>
          </a>
        </div>

        {/* Small Trademark Credit */}
        <p className="text-[10px] text-slate-400 font-bold tracking-wide uppercase mt-4">
          © {new Date().getFullYear()} CV SHIELD. All rights reserved.
        </p>

      </div>

      {/* Giant Centered Typography Marquee Block (Half-Visible at bottom edge) */}
      <div className="relative w-full h-[6rem] sm:h-[8rem] md:h-[10rem] overflow-hidden flex items-end justify-center mt-8">
        <h1 className="text-[12vw] leading-none font-black text-slate-200/40 tracking-wider translate-y-[45%] font-sans select-none pointer-events-none uppercase">
          CVSHIELD
        </h1>
      </div>

    </footer>
  );
}
