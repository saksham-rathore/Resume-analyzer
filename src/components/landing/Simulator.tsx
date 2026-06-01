"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles, FileText, CheckCircle2, AlertTriangle,
  ArrowUpRight, Award, Check, X, Terminal, Monitor
} from 'lucide-react';

interface RepairCheck {
  id: number;
  label: string;
  checked: boolean;
  points: number;
}

export default function Simulator() {
  const [animatedScore, setAnimatedScore] = useState(0);

  // Interactive checklist that dynamically raises the score on clicking
  const [repairs, setRepairs] = useState<RepairCheck[]>([
    { id: 1, label: "Add missing accessibility (WCAG) keyword", checked: false, points: 4 },
    { id: 2, label: "Resolve dense grid bullet layout format", checked: false, points: 3 },
    { id: 3, label: "Relocate phone contact coordinates to line 1", checked: false, points: 3 }
  ]);

  const baseScore = 88;
  const currentTotalScore = Math.min(98, baseScore + repairs.filter(r => r.checked).reduce((sum, item) => sum + item.points, 0));

  // Handle dial count-up animation
  useEffect(() => {
    let start = 0;
    const duration = 1000; // ms
    const stepTime = Math.abs(Math.floor(duration / currentTotalScore));

    // Reset back to zero and count up to target score
    setAnimatedScore(0);

    const timer = setInterval(() => {
      start += 1;
      setAnimatedScore(start);
      if (start >= currentTotalScore) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [currentTotalScore]);

  const toggleCheck = (id: number) => {
    setRepairs(prev =>
      prev.map(r => r.id === id ? { ...r, checked: !r.checked } : r)
    );
  };

  const foundSkills = ['React', 'TypeScript', 'Tailwind', 'Next.js', 'Redux', 'APIs', 'Git'];
  const missingSkills = ['Webpack', 'Jest testing', 'Web Accessibility (WCAG)'];

  return (
    <div id="simulator" className="scroll-mt-24 w-full mt-32 max-w-5xl mx-auto flex flex-col items-center select-none px-4">

      {/* ATS Simulator Badge - Styled like old filled badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-slate-50 text-slate-650 text-slate-600 border border-slate-200 shadow-[0_4px_12px_rgba(0,0,0,0.02)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
        <Sparkles className="w-3.5 h-3.5 text-[hsl(250,84%,54%)]" />
        <span className="text-slate-800">ATS Parser Showcase</span>
      </div>

      {/* Title - styled in premium dark-grey dashboard color */}
      <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 font-sans mt-6 text-center leading-tight">
        Test Your <span style={{ color: 'oklch(90.8% 0.008 264.534)' }}>Resume</span> Against <br className="hidden md:inline" />
        <span className="bg-gradient-to-r from-gray-900 via-slate-800 to-gray-900 bg-clip-text text-transparent">
          ATS Industry Filters
        </span>
      </h2>

      <p className="text-slate-500 mt-4 text-xs sm:text-sm max-w-lg text-center font-medium leading-relaxed">
        Our parsing engine extracts structure and benchmarks skills instantly. Here is what a typical deep diagnostic audit looks like:
      </p>

      {/* macOS Premium App Window Showcase Mockup */}
      <div className="w-full mt-12 bg-white rounded-[2rem] border border-slate-200 shadow-[0_25px_60px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col relative">

        {/* macOS Window Header Bar */}
        <div className="w-full h-12 bg-slate-50/80 border-b border-slate-200/80 px-6 flex items-center justify-between shrink-0 select-none">

          {/* Three Window Controls */}
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-400 border border-red-500/20" />
            <span className="w-3 h-3 rounded-full bg-yellow-400 border border-yellow-500/20" />
            <span className="w-3 h-3 rounded-full bg-emerald-400 border border-emerald-500/20" />
          </div>

          {/* Centered Document Name */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-200/40 text-slate-500 text-[10px] font-mono font-bold tracking-wider uppercase">
            <FileText className="w-3.5 h-3.5 text-slate-400" />
            <span>Resume_Lead_Frontend_Developer.pdf</span>
          </div>

          {/* Right Status Badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100/80 border border-slate-200/80 text-slate-500 text-[9px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-pulse" />
            <span>Parsed Active</span>
          </div>

        </div>

        {/* Dashboard Content Container */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-[460px]">

          {/* Left Panel: Score and interactive adjustments (using centered layout with unified gap-6 to fix positions) */}
          <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-slate-100 bg-slate-50/50 p-6 flex flex-col items-center justify-center gap-6 shrink-0">

            <div className="flex flex-col items-center w-full">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">ATS MATCH RATING</span>

              {/* Circular Gauge Score Dial */}
              <div className="relative w-36 h-36 mt-4 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#f1f5f9"
                    strokeWidth="5"
                    fill="transparent"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="hsl(250, 84%, 54%)"
                    strokeWidth="5"
                    fill="transparent"
                    strokeDasharray={251.2}
                    strokeDashoffset={251.2 - (251.2 * animatedScore) / 100}
                    strokeLinecap="round"
                  />
                </svg>

                {/* Score text */}
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-[2.2rem] font-extrabold text-slate-950 tracking-tight leading-none">{animatedScore}%</span>
                  <span className="text-[10px] font-extrabold text-slate-400/90 uppercase tracking-widest mt-1.5 leading-none">
                    {animatedScore >= 90 ? 'EXCELLENT' : 'COMPATIBLE'}
                  </span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="mt-4 flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[hsl(250,84%,54%)]" />
                <span className="text-xs font-bold text-slate-700">
                  ATS Compatible Node
                </span>
              </div>
            </div>

            {/* Simulated interactive checkbox panel */}
            <div className="w-full bg-white border border-slate-200/80 rounded-2xl p-4 shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
              <span className="text-[9px] font-bold text-[hsl(250,84%,54%)] uppercase tracking-wider block">Interactive repairs</span>
              <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Toggle fixes to adjust compatibility dial:</p>

              <div className="mt-3.5 space-y-2">
                {repairs.map((r) => (
                  <label
                    key={r.id}
                    className={`flex items-center gap-2.5 p-2 rounded-xl border text-[11px] font-semibold cursor-pointer select-none transition-all ${r.checked
                      ? 'bg-purple-50/30 border-[hsl(250,84%,54%)]/40 text-[hsl(250,84%,54%)] shadow-sm'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                  >
                    <input
                      type="checkbox"
                      checked={r.checked}
                      onChange={() => toggleCheck(r.id)}
                      className="w-3.5 h-3.5 rounded text-[hsl(250,84%,54%)] border-slate-300 focus:ring-[hsl(250,84%,54%)] cursor-pointer"
                    />
                    <span className="flex-1">{r.label}</span>
                    <span className="text-[9px] font-bold opacity-80 shrink-0">+{r.points}%</span>
                  </label>
                ))}
              </div>
            </div>

          </div>

          {/* Right Panel: pre-analyzed details */}
          <div className="flex-1 p-6 sm:p-8 overflow-y-auto max-h-[480px]">

            <div className="space-y-8">

              {/* 1. Keyword density check */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center justify-between">
                  <span>Keyword Density Benchmark (Frontend)</span>
                  <span className="text-[10px] text-slate-400 font-bold lowercase tracking-normal">
                    7 of 10 keywords matched
                  </span>
                </h4>

                {/* Found Badges */}
                <div className="mt-4">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Found Skills</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {foundSkills.map((kw, i) => (
                      <div
                        key={i}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100/50 shadow-sm"
                      >
                        <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                        {kw}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Missing Badges */}
                <div className="mt-4">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Skills Gaps Identified</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {missingSkills.map((kw, i) => {
                      const isFixed = (kw.includes("Accessibility") && repairs[0].checked);

                      return (
                        <div
                          key={i}
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold border shadow-sm transition-all duration-300 ${isFixed
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-100/50'
                            : 'bg-rose-50 text-rose-700 border-rose-100/50'
                            }`}
                        >
                          {isFixed ? (
                            <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                          ) : (
                            <X className="w-3 h-3 text-rose-600 shrink-0" />
                          )}
                          {kw}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* 2. Structural audits */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
                  Structural Node Parser Audit
                </h4>

                <div className="mt-3.5 space-y-2.5">
                  <div className="flex items-start gap-3 bg-slate-50/50 p-3.5 rounded-2xl border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-slate-900">Experience Segment Parser</span>
                      <p className="text-[11px] text-slate-500 mt-0.5 font-medium leading-relaxed">
                        PASSED: Core work experience headers and date coordinate grids parsed successfully.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-slate-50/50 p-3.5 rounded-2xl border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-slate-900">Education Details Node</span>
                      <p className="text-[11px] text-slate-500 mt-0.5 font-medium leading-relaxed">
                        PASSED: University profiles, degree indicators, and graduation dates indexed.
                      </p>
                    </div>
                  </div>

                  <div className={`flex items-start gap-3 p-3.5 rounded-2xl border transition-all duration-300 ${repairs[1].checked
                    ? 'bg-slate-50/50 border-slate-100'
                    : 'bg-yellow-50/30 border-yellow-100'
                    }`}>
                    {repairs[1].checked ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <span className={`text-xs font-bold ${repairs[1].checked ? 'text-slate-900' : 'text-yellow-800'}`}>
                        Layout Node Spacing
                      </span>
                      <p className="text-[11px] text-slate-500 mt-0.5 font-medium leading-relaxed">
                        {repairs[1].checked
                          ? "RESOLVED: Spacing indicators and tables adjusted for standard line parsers."
                          : "WARNING: Dense bullet layout styling blocks clean parser coordinate grids."}
                      </p>
                    </div>
                  </div>

                  <div className={`flex items-start gap-3 p-3.5 rounded-2xl border transition-all duration-300 ${repairs[2].checked
                    ? 'bg-slate-50/50 border-slate-100'
                    : 'bg-rose-50/30 border-rose-100'
                    }`}>
                    {repairs[2].checked ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <span className={`text-xs font-bold ${repairs[2].checked ? 'text-slate-900' : 'text-red-800'}`}>
                        Contact Coordinate Details
                      </span>
                      <p className="text-[11px] text-slate-500 mt-0.5 font-medium leading-relaxed">
                        {repairs[2].checked
                          ? "RESOLVED: Coordinates successfully shifted to line 1 of the metadata header."
                          : "DANGER: Contact metrics located far down. Automated parsers frequently fail to capture email nodes."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. AI Phrasing Optimizer */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
                  AI Phrasing Optimizer (Lead Frontend)
                </h4>

                <div className="mt-3.5 rounded-2xl border border-slate-200/80 overflow-hidden text-xs">
                  <div className="bg-red-50/40 p-4 border-b border-slate-100 flex items-start gap-2.5">
                    <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-red-700 uppercase tracking-wider text-[9px] block">Passive / Weak Wording</span>
                      <p className="text-slate-600 mt-1 font-medium italic">
                        "I was responsible for maintaining the website code and helped with UI items."
                      </p>
                    </div>
                  </div>
                  <div className="bg-emerald-50/40 p-4 flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-emerald-700 uppercase tracking-wider text-[9px] block">Active / Impact-driven Rewrite</span>
                      <p className="text-slate-800 mt-1 font-semibold">
                        "<span className="text-[hsl(250,84%,54%)] underline">Optimized</span> and <span className="text-[hsl(250,84%,54%)] underline">maintained</span> the core website architecture, decreasing initial page load lag by 15%."
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
