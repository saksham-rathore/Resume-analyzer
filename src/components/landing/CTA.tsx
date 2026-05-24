'use client';

import React from 'react';

export default function CTA() {
  return (
    <section className="py-24 px-6 landing-content-width mx-auto relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[70%] bg-gradient-to-tr from-blue-normal/20 to-blue-light/10 blur-[100px] -z-10"></div>

      <div className="bg-blue-darker rounded-3xl p-12 md:p-16 border text-center relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30"></div>

        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
          <h2 className="text-3xl md:text-5xl font-cabinet font-extrabold text-white mb-6 tracking-tight leading-tight">
            Land More Interviews.<br />
            <span className="italic-accent text-blue-light font-normal">Bypass the ATS.</span>
          </h2>
          <p className="text-slate-300 text-base md:text-lg mb-10 leading-relaxed">
            Join 50,000+ software developers, product managers, and designers who use CV-Shield to bypass initial system layers. Check your score now.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a href="/signup" className="btn-designer px-8 py-4 rounded-xl text-base shadow-xl justify-center bg-white text-slate-900 hover:bg-slate-50 font-bold">
              Analyze For Free
            </a>
            <a href="/signIn" className="btn-designer-outline px-8 py-4 rounded-xl text-base justify-center bg-transparent border-slate-700 text-slate-200 hover:bg-slate-800/50">
              Sign In
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
