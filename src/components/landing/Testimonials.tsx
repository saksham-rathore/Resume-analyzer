'use client';

import React from 'react';

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 px-6 bg-slate-50/50 border-t border-slate-200/40">
      <div className="landing-content-width mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-light border border-blue-light-active text-blue-dark text-xs font-semibold uppercase mb-4">
            Testimonials
          </div>
          <h2 className="text-3xl md:text-4xl font-cabinet font-extrabold text-slate-800 mb-4">
            <span className="italic-accent text-blue-dark font-normal">Real Outcomes</span> from Real Job Seekers
          </h2>
          <p className="text-slate-500 text-base">
            Read how our users bypassed recruiter filtering blocks and landed interviews at top-tier companies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Review 1 */}
          <div className="glass-card-premium rounded-3xl p-8 border bg-white flex flex-col justify-between shadow-sm relative">
            <div>
              <div className="flex items-center gap-1.5 mb-6 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-sm font-medium text-slate-800 leading-relaxed mb-6">
                &quot;I submitted my CV over 80 times to software engineering roles without a single callback. Using CV-Shield, I realized my two-column layout was literally unreadable to standard systems. Fixed it in 5 minutes. Got 3 callbacks the following week.&quot;
              </blockquote>
            </div>
            <div className="flex items-center gap-4 pt-4 border-t border-slate-100 mt-2">
              <div className="w-11 h-11 rounded-full bg-blue-light flex items-center justify-center font-cabinet font-extrabold text-blue-normal text-sm">
                SK
              </div>
              <div>
                <cite className="not-italic font-bold text-sm text-slate-800 block">Siddharth K.</cite>
                <span className="text-xs text-slate-500 block">Software Engineer — landed at Coinbase</span>
              </div>
              <span className="ml-auto text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100 shrink-0">
                Score: 48 ➔ 89
              </span>
            </div>
          </div>

          {/* Review 2 */}
          <div className="glass-card-premium rounded-3xl p-8 border bg-white flex flex-col justify-between shadow-sm relative">
            <div>
              <div className="flex items-center gap-1.5 mb-6 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-sm font-medium text-slate-800 leading-relaxed mb-6">
                &quot;As a Product Manager, I had plenty of experience but my resume lacked metrics. The AI scorecard pinpointed exactly which paragraphs needed quantifiable data and suggested exact templates. Landed an interview at Stripe in 3 days.&quot;
              </blockquote>
            </div>
            <div className="flex items-center gap-4 pt-4 border-t border-slate-100 mt-2">
              <div className="w-11 h-11 rounded-full bg-blue-light flex items-center justify-center font-cabinet font-extrabold text-blue-normal text-sm">
                EL
              </div>
              <div>
                <cite className="not-italic font-bold text-sm text-slate-800 block">Elena L.</cite>
                <span className="text-xs text-slate-500 block">Product Manager — landed at Stripe</span>
              </div>
              <span className="ml-auto text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100 shrink-0">
                Score: 56 ➔ 92
                  </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
