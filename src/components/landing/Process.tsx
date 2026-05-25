'use client';

import React from 'react';

export default function Process() {
  return (
    <section id="workflow" className="py-24 px-6 landing-content-width mx-auto relative">
      <div className="text-center max-w-2xl mx-auto mb-20">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-light border border-blue-light-active text-blue-dark text-xs font-semibold uppercase mb-4">
          Our Process
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tighter leading-[1.1] mb-4 text-slate-800">
          <span className="font-cabinet font-normal text-slate-800">Get Recruiter-Ready in 4 Simple </span>
          <span className="font-cormorant italic font-normal text-blue-dark tracking-wide pr-2">Steps.</span>
        </h2>
        <p className="text-slate-500 text-base">
          Here is how we turn generic, filtered-out resumes into high-impact, interview-landing structures.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
        {/* Step 1 */}
        <div className="flex flex-col items-center text-center relative z-10">
          <div className="w-16 h-16 rounded-full bg-blue-light border border-blue-light-active flex items-center justify-center font-cabinet font-extrabold text-lg text-blue-normal mb-6 shadow-sm">
            1
          </div>
          <h3 className="font-cabinet font-bold text-base text-slate-800 mb-2">Secure Upload</h3>
          <p className="text-xs text-slate-500 leading-relaxed px-2">
            Drop your resume in PDF/Doc format. It is stored securely in Drizzle databases.
          </p>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-center text-center relative z-10">
          <div className="w-16 h-16 rounded-full bg-blue-light border border-blue-light-active flex items-center justify-center font-cabinet font-extrabold text-lg text-blue-normal mb-6 shadow-sm">
            2
          </div>
          <h3 className="font-cabinet font-bold text-base text-slate-800 mb-2">Job Description Match</h3>
          <p className="text-xs text-slate-500 leading-relaxed px-2">
            Provide a target job description or title. We segment and isolate required skill keywords.
          </p>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col items-center text-center relative z-10">
          <div className="w-16 h-16 rounded-full bg-blue-light border border-blue-light-active flex items-center justify-center font-cabinet font-extrabold text-lg text-blue-normal mb-6 shadow-sm">
            3
          </div>
          <h3 className="font-cabinet font-bold text-base text-slate-800 mb-2">Deep AI Audit</h3>
          <p className="text-xs text-slate-500 leading-relaxed px-2">
            Redis and BullMQ processes run background models to verify formatting and score phrasing.
          </p>
        </div>

        {/* Step 4 */}
        <div className="flex flex-col items-center text-center relative z-10">
          <div className="w-16 h-16 rounded-full bg-blue-light border border-blue-light-active flex items-center justify-center font-cabinet font-extrabold text-lg text-blue-normal mb-6 shadow-sm">
            4
          </div>
          <h3 className="font-cabinet font-bold text-base text-slate-800 mb-2">Actionable Fixes</h3>
          <p className="text-xs text-slate-500 leading-relaxed px-2">
            Download line-by-line phrasing changes, optimized keywords, and a parsed resume.
          </p>
        </div>

        {/* Background Line Connector */}
        <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-blue-light-active via-blue-normal/20 to-blue-light-active -z-0"></div>
      </div>
    </section>
  );
}
