import React from 'react';

export default function Features() {
  const features = [
    {
      title: "ATS Compatibility Auditing",
      description: "Instantly cross-check your resume format, structure, and section headers against multiple standard ATS parser profiles.",
      icon: (
        <svg className="w-5 h-5 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      )
    },
    {
      title: "Interactive Skill Matching",
      description: "Extract existing keywords and benchmark them against targeted job roles to pinpoint and resolve critical keyword gaps.",
      icon: (
        <svg className="w-5 h-5 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2zM12 11V7m0 4v4m0-4H8m4 0h4" />
        </svg>
      )
    },
    {
      title: "AI Action-Verb Optimizations",
      description: "Automatically rewrite passive bullet points into high-impact, results-driven accomplishments backed by data.",
      icon: (
        <svg className="w-5 h-5 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      title: "Layout & Font Diagnostics",
      description: "Flag layout hazards like multi-column templates, grid text boxes, unreadable cursive fonts, or decorative images.",
      icon: (
        <svg className="w-5 h-5 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
        </svg>
      )
    },
    {
      title: "Multi-Role Fitment Scoring",
      description: "Dynamically calculate your fitment score percentage across Frontend, Backend, or Product Management templates.",
      icon: (
        <svg className="w-5 h-5 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.003 9.003 0 1020.945 13H11V3.055z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
        </svg>
      )
    },
    {
      title: "Actionable Repair Checklists",
      description: "Review detailed checklist alerts to fix unparsable contact coordinates, naming conventions, or bullet structures.",
      icon: (
        <svg className="w-5 h-5 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    }
  ];

  return (
    <>
      <div id="features" className="mt-32 max-w-3xl mx-auto scroll-mt-24">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-slate-800 to-gray-900 bg-clip-text text-transparent font-sans">
          Engineered to pass ATS filters
        </h2>
        <p className="text-slate-500 mt-4 text-sm sm:text-base max-w-lg mx-auto font-medium leading-relaxed">
          CV Shield delivers a comprehensive diagnostic audit of your resume structure, keyword density matches, and AI phrasing.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-5xl mx-auto mt-16 border-t border-slate-200 border-dotted mb-12">
        {features.map((feature, i) => (
          <div
            key={i}
            className={`p-8 sm:p-12 text-left border-b border-slate-200 border-dotted flex flex-col items-start ${i % 2 === 0 ? 'md:border-r' : ''
              }`}
          >
            <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-900 border border-slate-200/50 shadow-sm">
              {feature.icon}
            </div>

            <h3 className="font-bold bg-gradient-to-r from-gray-900 via-slate-800 to-gray-900 bg-clip-text text-transparent mt-6 text-lg tracking-tight">
              {feature.title}
            </h3>

            <p className="text-slate-500 mt-2.5 text-xs sm:text-sm leading-relaxed font-medium">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
