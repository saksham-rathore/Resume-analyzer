"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, FileText, CheckCircle2, AlertTriangle, 
  UploadCloud, Check, X, ShieldCheck, Search, Cpu, Sparkle
} from 'lucide-react';

interface Step {
  id: number;
  label: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
}

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const [isInteracted, setIsInteracted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const steps: Step[] = [
    {
      id: 1,
      label: "01",
      title: "Secure Document Scan",
      desc: "Drag & drop your PDF or DOCX file. Our secure node-parser decodes raw text and maps layout grids instantly.",
      icon: <UploadCloud className="w-5 h-5" />
    },
    {
      id: 2,
      label: "02",
      title: "Structural Outline Audit",
      desc: "CV Shield scans for key parsing milestones: contact coordinate headers, experience blocks, and layout parsing hazards.",
      icon: <Search className="w-5 h-5" />
    },
    {
      id: 3,
      label: "03",
      title: "Career Keyword Match",
      desc: "We benchmark your content against targeting standards, pinpointing exact keyword gaps and semantic matches.",
      icon: <Cpu className="w-5 h-5" />
    },
    {
      id: 4,
      label: "04",
      title: "AI Phrasing Optimizer",
      desc: "Instantly rewrite weak passive wording into results-driven accomplishments backed by data metrics.",
      icon: <Sparkles className="w-5 h-5" />
    }
  ];

  // Auto-rotation every 6 seconds
  useEffect(() => {
    if (isInteracted) return;

    intervalRef.current = setInterval(() => {
      setActiveStep((prev) => (prev === steps.length - 1 ? 0 : prev + 1));
    }, 6000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isInteracted]);

  const handleStepClick = (index: number) => {
    setIsInteracted(true);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setActiveStep(index);
  };

  return (
    <div id="working" className="scroll-mt-24 w-full mt-32 max-w-5xl mx-auto flex flex-col items-center select-none px-4">
      
      {/* Process Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-slate-50 text-slate-650 text-slate-600 border border-slate-200 shadow-[0_4px_12px_rgba(0,0,0,0.02)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
        <Sparkle className="w-3.5 h-3.5 text-[hsl(250,84%,54%)]" />
        <span className="text-slate-800">Process Flow</span>
      </div>

      {/* Heading */}
      <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 font-sans mt-6 text-center leading-tight">
        How It Works: <br className="hidden md:inline" />
        <span style={{ color: 'oklch(90.8% 0.008 264.534)' }}>The Auditing Pipeline</span>
      </h2>
      
      <p className="text-slate-500 mt-4 text-xs sm:text-sm max-w-lg text-center font-medium leading-relaxed">
        Four architectural steps CV Shield uses to parse, evaluate, and bulletproof your resume for applicant tracking networks.
      </p>

      {/* Side-by-Side Stepper Deck */}
      <div className="w-full mt-16 flex flex-col md:flex-row items-center gap-12 md:gap-16">
        
        {/* Left Column: Progress Timeline navigation */}
        <div className="w-full md:w-[45%] flex flex-col relative text-left">
          
          {/* Vertical progress line for desktop (centered through the middle of the w-12 bubbles at 40px / left-10) */}
          <div className="hidden md:block absolute left-10 top-6 bottom-6 w-[2px] bg-slate-200/60 rounded-full z-0">
            {/* Glowing sliding active progress indicator */}
            <motion.div 
              className="w-full bg-[hsl(250,84%,54%)] rounded-full shadow-[0_0_8px_rgba(99,102,241,0.6)]"
              animate={{ 
                top: `${(activeStep / (steps.length - 1)) * 88}%`,
                height: '12%'
              }}
              style={{ position: 'absolute' }}
              transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            />
          </div>

          <div className="space-y-6 z-10 w-full">
            {steps.map((step, idx) => {
              const isActive = activeStep === idx;
              
              return (
                <div
                  key={step.id}
                  onClick={() => handleStepClick(idx)}
                  className={`group flex items-start gap-4 p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isActive 
                      ? 'bg-white border-slate-200 shadow-[0_8px_24px_rgba(0,0,0,0.03)] scale-[1.01]' 
                      : 'border-transparent opacity-50 hover:opacity-85 hover:bg-slate-50/40'
                  }`}
                >
                  {/* Step bubble */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-300 ${
                    isActive 
                      ? 'bg-[hsla(250,84%,54%,0.06)] text-[hsl(250,84%,54%)] border-[hsla(250,84%,54%,0.15)] shadow-[0_2px_8px_rgba(99,102,241,0.04)] scale-105' 
                      : 'bg-slate-50 text-slate-400 border-slate-200 group-hover:text-slate-600'
                  }`}>
                    {step.icon}
                  </div>

                  <div className="flex-1 text-left">
                    <span className={`text-[10px] font-bold tracking-wider uppercase ${
                      isActive ? 'text-[hsl(250,84%,54%)]' : 'text-slate-400'
                    }`}>
                      Step {step.label}
                    </span>
                    
                    <h3 className="font-bold text-slate-900 mt-1 text-base tracking-tight leading-tight group-hover:text-[hsl(250,84%,54%)] transition-colors">
                      {step.title}
                    </h3>
                    
                    <p className="text-slate-500 mt-2 text-xs leading-relaxed font-semibold">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Right Column: High-fidelity animated visual mockup panel inside macOS window */}
        <div className="w-full md:flex-1">
          <div className="bg-white rounded-[1.8rem] border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col relative w-full aspect-[4/3] max-w-[500px] mx-auto">
            
            {/* macOS Mockup header */}
            <div className="w-full h-10 bg-slate-50/80 border-b border-slate-200 px-4 flex items-center justify-between shrink-0 select-none">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400 border border-red-500/10" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 border border-yellow-500/10" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 border border-emerald-500/10" />
              </div>
              <div className="px-3 py-0.5 rounded bg-slate-200/50 text-slate-500 text-[9px] font-mono font-bold tracking-wide">
                CV_SHIELD_ENGINE.EXE
              </div>
              <div className="w-8" />
            </div>

            {/* Simulated mock interface area */}
            <div className="flex-1 bg-slate-50/30 p-6 flex flex-col justify-center relative overflow-hidden">
              <AnimatePresence mode="wait">
                
                {/* Step 1 Visualizer: Glowing file upload scanner */}
                {activeStep === 0 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35 }}
                    className="flex-1 flex flex-col items-center justify-center relative w-full h-full"
                  >
                    {/* Glowing Document Card */}
                    <div className="w-36 h-48 bg-white border border-slate-200 rounded-2xl shadow-[0_12px_30px_rgba(0,0,0,0.03)] relative overflow-hidden flex flex-col items-center justify-center p-4">
                      
                      {/* Laser scanner grid overlay line */}
                      <motion.div 
                        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[hsl(250,84%,54%)] to-transparent z-10 shadow-[0_0_8px_rgba(99,102,241,0.8)]"
                        animate={{ top: ['0%', '100%', '0%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      />

                      <div className="w-12 h-12 rounded-xl bg-[hsla(250,84%,54%,0.06)] text-[hsl(250,84%,54%)] flex items-center justify-center border border-[hsla(250,84%,54%,0.15)] mb-3">
                        <FileText className="w-6 h-6" />
                      </div>
                      <span className="font-bold text-slate-900 text-xs truncate max-w-full">Resume_Audit.pdf</span>
                      <span className="text-slate-400 font-semibold text-[9px] mt-1">Parsing nodes...</span>
                    </div>

                    {/* Progress tracking badge overlay */}
                    <div className="absolute bottom-2 bg-white border border-slate-200/80 rounded-xl px-4 py-2 shadow-lg flex items-center gap-2 max-w-[200px]">
                      <div className="w-3 h-3 rounded-full border-2 border-[hsl(250,84%,54%)] border-t-transparent animate-spin" />
                      <span className="text-[9px] font-bold text-slate-800 font-mono tracking-tight leading-none uppercase">Isolating metadata...</span>
                    </div>
                  </motion.div>
                )}

                {/* Step 2 Visualizer: Checkmarks parsing structural list */}
                {activeStep === 1 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35 }}
                    className="flex-1 flex flex-col justify-center space-y-3 w-full max-w-[320px] mx-auto text-left"
                  >
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Milestone Structural Nodes</span>
                    
                    <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200/80 shadow-[0_4px_12px_rgba(0,0,0,0.01)] hover:scale-[1.01] transition-transform">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span className="text-xs font-bold text-slate-900 flex-1">Work History Segments</span>
                      <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 uppercase">PASS</span>
                    </div>

                    <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200/80 shadow-[0_4px_12px_rgba(0,0,0,0.01)] hover:scale-[1.01] transition-transform">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span className="text-xs font-bold text-slate-900 flex-1">Academic Credentials</span>
                      <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 uppercase">PASS</span>
                    </div>

                    <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-200/80 shadow-[0_4px_12px_rgba(0,0,0,0.01)] hover:scale-[1.01] transition-transform">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span className="text-xs font-bold text-slate-900 flex-1">Metadata Contact Coordinates</span>
                      <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 uppercase">PASS</span>
                    </div>
                  </motion.div>
                )}

                {/* Step 3 Visualizer: Keyword benchmarking grids */}
                {activeStep === 2 && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.35 }}
                    className="flex-1 flex flex-col justify-center w-full max-w-[340px] mx-auto text-left"
                  >
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Role Fitment Benchmark</span>
                    
                    {/* Glowing progress matching rating */}
                    <div className="mt-3 bg-white border border-slate-200 p-3.5 rounded-2xl shadow-sm">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                        <span>Frontend Keyword density</span>
                        <span className="text-[hsl(250,84%,54%)]">83% Match</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mt-2 relative">
                        <motion.div 
                          className="h-full bg-[hsl(250,84%,54%)] rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: "83%" }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                      </div>
                    </div>

                    <div className="mt-5 space-y-3">
                      <div>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Found Core Keywords</span>
                        <div className="flex flex-wrap gap-1.5 mt-1.5">
                          {['React', 'TypeScript', 'Tailwind', 'Next.js'].map((kw) => (
                            <span key={kw} className="text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-full">
                              {kw}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Identified Skill gaps</span>
                        <div className="flex flex-wrap gap-1.5 mt-1.5">
                          {['Webpack', 'Jest testing'].map((kw) => (
                            <span key={kw} className="text-[9px] font-bold bg-rose-50 text-rose-700 border border-rose-100 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                              <X className="w-2.5 h-2.5 text-rose-500" />
                              {kw}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 4 Visualizer: Side-by-side passive-to-active text rewrite */}
                {activeStep === 3 && (
                  <motion.div
                    key="step-4"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.35 }}
                    className="flex-1 flex flex-col justify-center space-y-4 w-full max-w-[340px] mx-auto text-left"
                  >
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">AI Phrasing Optimizer</span>
                    
                    <div className="bg-red-50/40 p-4 border border-red-100 rounded-2xl flex items-start gap-2.5 text-[11px] shadow-sm">
                      <X className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-red-700 uppercase tracking-wider text-[8px] block">Passive wording</span>
                        <p className="text-slate-650 text-slate-600 mt-0.5 font-medium italic">
                          "I was responsible for maintaining the website code and helped with UI items."
                        </p>
                      </div>
                    </div>

                    <div className="bg-emerald-50/40 p-4 border border-emerald-100 rounded-2xl flex items-start gap-2.5 text-[11px] shadow-sm">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-emerald-700 uppercase tracking-wider text-[8px] block">Active / metrics-driven Rewrite</span>
                        <p className="text-slate-800 mt-0.5 font-semibold">
                          "<span className="text-[hsl(250,84%,54%)] underline">Optimized</span> and <span className="text-[hsl(250,84%,54%)] underline">maintained</span> the core website architecture, decreasing initial page load lag by 15%."
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* Glowing background matrix dot details */}
            <div className="absolute inset-0 card-dot-grid-purple opacity-40 z-0 pointer-events-none" />

          </div>
        </div>

      </div>
    </div>
  );
}
