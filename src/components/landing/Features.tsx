'use client';

import React from 'react';

export default function Features() {
  return (
    <section id="features" className="py-24 px-6 bg-slate-50/50 border-y border-slate-200/40">
      <div className="landing-content-width mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-light border border-blue-light-active text-blue-dark text-xs font-semibold uppercase mb-4">
            Core Capabilities
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tighter leading-[1.1] mb-4 text-slate-800">
            <span className="font-cabinet font-normal text-slate-800 whitespace-nowrap flex mid">Engineered for High-Conversion </span>
            <span className="font-cormorant italic font-normal text-blue-dark tracking-wide pr-2">Resumes.</span>
          </h2>
          <p className="text-slate-500 text-base">
            Discover the deep analytical checks conducted automatically on every PDF uploaded to the CV-Shield engine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature 1 */}
          <div className="glass-card-premium feature-card rounded-2xl p-6 border flex flex-col items-start bg-white shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-blue-light border border-blue-light-active flex items-center justify-center text-blue-normal mb-6">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 className="font-cabinet font-bold text-base text-slate-800 mb-3">ATS Format Validator</h3>
            <p className="text-xs text-slate-505 leading-relaxed">
              Identifies parsing limitations like <span className="italic-accent text-slate-700">tables, graphics</span>, fonts, header formats, and <span className="italic-accent text-slate-700">multi-column divisions</span>.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="glass-card-premium feature-card rounded-2xl p-6 border flex flex-col items-start bg-white shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-blue-light border border-blue-light-active flex items-center justify-center text-blue-normal mb-6">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
              </svg>
            </div>
            <h3 className="font-cabinet font-bold text-base text-slate-800 mb-3">Keyword & Match Audit</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Compares <span className="italic-accent text-slate-700">CV contents</span> against hundreds of real job listings to highlight essential <span className="italic-accent text-slate-700">missing technologies</span>.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="glass-card-premium feature-card rounded-2xl p-6 border flex flex-col items-start bg-white shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-blue-light border border-blue-light-active flex items-center justify-center text-blue-normal mb-6">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-cabinet font-bold text-base text-slate-800 mb-3">Actionable Impact Check</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Triggers alerts when descriptions lack <span className="italic-accent text-slate-700">metric milestones</span> or rely heavily on passive, generic verbs.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="glass-card-premium feature-card rounded-2xl p-6 border flex flex-col items-start bg-white shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-blue-light border border-blue-light-active flex items-center justify-center text-blue-normal mb-6">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H18.5" />
              </svg>
            </div>
            <h3 className="font-cabinet font-bold text-base text-slate-800 mb-3">Background Queueing</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Heavy analysis runs asynchronously on <span className="italic-accent text-slate-700">BullMQ and Redis</span>, keeping your interface smooth and lag-free.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
