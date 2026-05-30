import React from 'react';

export default function Content() {
  return (
    <div className="w-full flex flex-col items-center text-center pt-20 pb-32">

      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold bg-slate-50 text-slate-600 border border-slate-200 shadow-[0_4px_12px_rgba(0,0,0,0.02)] transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-pulse" />
          Protect & Perfect Your Resume
        </span>
      </div>


      <h1 className="text-5xl md:text-7xl font-[500] tracking-tight bg-gradient-to-r from-gray-900 via-slate-800 to-gray-900 bg-clip-text text-transparent leading-[1.12] max-w-4xl mx-auto mt-10">
        Turn Resumes into <br className="hidden md:inline" />
        Strong Shields
      </h1>


      <p className="text-lg text-slate-500 max-w-xl mx-auto mt-8 leading-snug">
        CV Shield scans, analyzes, and optimizes your resume to pass ATS filters and increase your chances of landing interviews.
      </p>


      <div className="flex flex-col sm:flex-row items-center gap-4 mt-10 justify-center">
        <a
          href="/signup"
          className="group premium-gradient-btn px-8 py-3.5 text-base font-semibold rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.06)] transition-all duration-300"
        >
          <span className="flex items-center">
            Get Started for Free
            <svg
              className="w-0 h-4 opacity-0 -translate-x-2 ml-0 group-hover:w-4 group-hover:opacity-100 group-hover:translate-x-0 group-hover:ml-2 transition-all duration-300 ease-out"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </a>
        <a
          href="/#simulator"
          className="text-center flex rounded-full px-8 py-3.5 text-base font-semibold text-slate-700 bg-white bg-white text-black px-6 py-2 rounded-full shadow-lg"
        >
          ATS Simulator
        </a>
      </div>
    </div>
  );
}
