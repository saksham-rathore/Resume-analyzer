'use client';

import React, { useState, useEffect } from 'react';

const steps = [
  {
    id: 1,
    title: 'Secure Upload',
    desc: 'Drop your resume in PDF/Doc format. It is stored securely in Drizzle databases.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Job Description Match',
    desc: 'Provide a target job description or title. We segment and isolate required skill keywords.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Deep AI Audit',
    desc: 'Redis and BullMQ processes run background models to verify formatting and score phrasing.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Actionable Fixes',
    desc: 'Download line-by-line phrasing changes, optimized keywords, and a parsed resume.',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function Process() {
  const [activeItems, setActiveItems] = useState<Record<string, boolean>>({});

  const runAnimation = () => {
    setActiveItems({});

    const timers = [
      setTimeout(() => setActiveItems(prev => ({ ...prev, c1: true })), 100),
      setTimeout(() => setActiveItems(prev => ({ ...prev, s1: true })), 150),
      setTimeout(() => setActiveItems(prev => ({ ...prev, l1: true })), 500),
      setTimeout(() => setActiveItems(prev => ({ ...prev, c2: true })), 800),
      setTimeout(() => setActiveItems(prev => ({ ...prev, s2: true })), 850),
      setTimeout(() => setActiveItems(prev => ({ ...prev, l2: true })), 1200),
      setTimeout(() => setActiveItems(prev => ({ ...prev, c3: true })), 1500),
      setTimeout(() => setActiveItems(prev => ({ ...prev, s3: true })), 1550),
      setTimeout(() => setActiveItems(prev => ({ ...prev, l3: true })), 1900),
      setTimeout(() => setActiveItems(prev => ({ ...prev, c4: true })), 2200),
      setTimeout(() => setActiveItems(prev => ({ ...prev, s4: true })), 2250),
    ];

    return timers;
  };

  useEffect(() => {
    const timers = runAnimation();
    return () => timers.forEach(clearTimeout);
  }, []);

  const getProgressWidth = () => {
    if (activeItems.l3) return '100%';
    if (activeItems.l2) return '66.6%';
    if (activeItems.l1) return '33.3%';
    return '0%';
  };

  const getMobileProgressHeight = () => {
    if (activeItems.s4) return '100%';
    if (activeItems.l3) return '90%';
    if (activeItems.s3) return '75%';
    if (activeItems.l2) return '60%';
    if (activeItems.s2) return '45%';
    if (activeItems.l1) return '30%';
    if (activeItems.s1) return '15%';
    if (activeItems.c1) return '5%';
    return '0%';
  };

  return (
    <section id="process" className="py-24 px-6 bg-slate-50/20 border-y border-slate-200/20 relative overflow-hidden">
      <h2 className="sr-only">4-step process: Secure Upload, Job Description Match, Deep AI Audit, Actionable Fixes — animated stepper</h2>

      <div className="landing-content-width mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-light border border-blue-light-active text-blue-dark text-xs font-semibold uppercase mb-4">
            Our Process
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tighter leading-[1.1] mb-4 text-slate-800">
            <span className="font-cabinet font-normal text-slate-800">Four Simple Steps to a </span>
            <span className="font-cormorant italic font-normal text-blue-dark tracking-wide pr-2">CV-Shield.</span>
          </h2>
          <p className="text-slate-500 text-base">
            How the CV-Shield analysis pipeline transforms your resume into an ATS-optimized powerhouse.
          </p>
        </div>

        {/* Desktop Stepper Visual (Hidden on Mobile) */}
        <div className="hidden md:block relative w-full max-w-4xl mx-auto mb-20 px-8">
          {/* Connector Line Background */}
          <div className="absolute left-12 right-12 top-6 h-[3px] bg-slate-200/50 rounded-full -z-10" />

          {/* Connector Line Fill */}
          <div
            className="absolute left-12 top-6 h-[3px] bg-gradient-to-r from-blue-normal via-blue-dark to-indigo-600 rounded-full -z-10 transition-all duration-700 ease-out"
            style={{ width: `calc(${getProgressWidth()} - 48px)` }}
          />

          <div className="flex justify-between items-center w-full">
            {steps.map((step) => {
              const isCircleActive = activeItems[`c${step.id}`];
              return (
                <div key={step.id} className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-cabinet font-bold text-sm shadow-sm border transition-all duration-500 ${isCircleActive
                        ? 'bg-blue-normal text-white border-blue-normal scale-110 shadow-lg shadow-blue-normal/20 ring-4 ring-blue-light'
                        : 'bg-white text-slate-400 border-slate-200'
                      }`}
                  >
                    {step.id}
                  </div>
                  <span className={`mt-3 font-cabinet font-bold text-xs tracking-wider uppercase transition-colors duration-300 ${isCircleActive ? 'text-blue-dark' : 'text-slate-400'
                    }`}>
                    Step {step.id}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Desktop Cards Grid (Hidden on Mobile) */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-4">
          {steps.map((step) => {
            const isCardActive = activeItems[`s${step.id}`];
            return (
              <div
                key={step.id}
                className={`glass-card-premium rounded-3xl p-7 border flex flex-col items-start bg-white transition-all duration-500 ${isCardActive
                    ? 'border-blue-normal/50 shadow-xl shadow-blue-normal/5 scale-[1.03] -translate-y-1'
                    : 'border-slate-200/60 opacity-50 hover:opacity-75 grayscale-[20%] hover:grayscale-0'
                  }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 ${isCardActive
                    ? 'bg-blue-normal text-white shadow-lg shadow-blue-normal/15 scale-105'
                    : 'bg-blue-light border border-blue-light-active text-blue-dark/70'
                  }`}>
                  {step.icon}
                </div>

                <h3 className={`font-cabinet font-bold text-lg mb-3 transition-colors duration-300 ${isCardActive ? 'text-slate-800 font-extrabold' : 'text-slate-500'
                  }`}>
                  {step.title}
                </h3>
                <p className={`text-sm leading-relaxed transition-colors duration-300 ${isCardActive ? 'text-slate-600' : 'text-slate-400'
                  }`}>
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Mobile Vertical Stepper Flow (Hidden on Desktop) */}
        <div className="md:hidden space-y-8 relative pl-9 before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-[3px] before:bg-slate-200/50 before:rounded-full">
          {/* Active vertical connector line */}
          <div
            className="absolute left-[17px] top-2 w-[3px] bg-gradient-to-b from-blue-normal via-blue-dark to-indigo-600 rounded-full transition-all duration-500 ease-out"
            style={{ height: getMobileProgressHeight() }}
          />

          {steps.map((step) => {
            const isCircleActive = activeItems[`c${step.id}`];
            const isCardActive = activeItems[`s${step.id}`];
            return (
              <div key={step.id} className="relative flex flex-col items-start">
                {/* Circle absolute positioned */}
                <div className={`absolute -left-[35px] top-1.5 w-8 h-8 rounded-full flex items-center justify-center border text-xs font-cabinet font-bold z-10 transition-all duration-500 ${isCircleActive
                    ? 'bg-blue-normal text-white border-blue-normal ring-4 ring-blue-light shadow-md shadow-blue-normal/20'
                    : 'bg-white text-slate-400 border-slate-200'
                  }`}>
                  {step.id}
                </div>

                {/* Card Container */}
                <div className={`w-full glass-card-premium rounded-2xl p-6 border flex flex-col items-start bg-white transition-all duration-500 ${isCardActive
                    ? 'border-blue-normal/50 shadow-lg'
                    : 'border-slate-200/60 opacity-60'
                  }`}>
                  <div className="flex items-center gap-4.5 mb-3.5">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${isCardActive
                        ? 'bg-blue-normal text-white shadow-md shadow-blue-normal/10'
                        : 'bg-blue-light border border-blue-light-active text-blue-dark/70'
                      }`}>
                      {step.icon}
                    </div>
                    <h3 className={`font-cabinet font-bold text-base transition-colors duration-300 ${isCardActive ? 'text-slate-800' : 'text-slate-500'
                      }`}>
                      {step.title}
                    </h3>
                  </div>
                  <p className={`text-xs leading-relaxed transition-colors duration-300 ${isCardActive ? 'text-slate-600' : 'text-slate-400'
                    }`}>
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

