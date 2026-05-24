'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

export default function Home() {
  // --- Upload Mockup State ---
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [scannedFile, setScannedFile] = useState<{ name: string; size: string } | null>(null);
  const [scanComplete, setScanComplete] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Simulator State ---
  const [simulatorFlaws, setSimulatorFlaws] = useState({
    genericName: false,
    noMetrics: false,
    multiColumn: false,
    missingKeywords: false,
    unprofessionalEmail: false,
  });

  // Calculate simulated score based on toggles
  const calculateScore = () => {
    let score = 95;
    if (simulatorFlaws.genericName) score -= 8;
    if (simulatorFlaws.noMetrics) score -= 15;
    if (simulatorFlaws.multiColumn) score -= 12;
    if (simulatorFlaws.missingKeywords) score -= 18;
    if (simulatorFlaws.unprofessionalEmail) score -= 7;
    return Math.max(score, 20);
  };

  const currentScore = calculateScore();

  // Simulate file scanning
  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      startSimulatedScan(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      startSimulatedScan(e.target.files[0]);
    }
  };

  const startSimulatedScan = (file: File) => {
    setIsUploading(true);
    setScanComplete(false);
    setUploadProgress(0);
    setScannedFile({
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
    });

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            setScanComplete(true);
          }, 600);
          return 100;
        }
        return prev + 5;
      });
    }, 80);
  };

  const resetUpload = () => {
    setScannedFile(null);
    setScanComplete(false);
    setUploadProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const toggleFlaw = (key: keyof typeof simulatorFlaws) => {
    setSimulatorFlaws((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="mesh-bg min-h-screen flex flex-col font-sans selection:bg-brand-blue-500/10 selection:text-brand-blue-600">
      {/* 1. Header Navigation */}
      <header className="glass-nav sticky top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-blue-600 to-brand-indigo flex items-center justify-center shadow-md shadow-brand-blue-600/20">
              <svg className="w-5.5 h-5.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <span className="font-heading font-extrabold text-xl text-brand-dark tracking-tight">
              CV<span className="text-brand-blue-600">Shield</span>
            </span>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="nav-link text-sm font-medium">Features</a>
            <a href="#simulator" className="nav-link text-sm font-medium">ATS Simulator</a>
            <a href="#workflow" className="nav-link text-sm font-medium">How It Works</a>
            <a href="#testimonials" className="nav-link text-sm font-medium">Success Stories</a>
          </nav>

          {/* Nav Actions */}
          <div className="flex items-center gap-4">
            <a href="/signIn" className="text-sm font-semibold text-brand-slate hover:text-brand-blue-600 transition-colors">
              Sign In
            </a>
            <a href="/signup" className="btn-designer px-5 py-2.5 rounded-xl text-sm shadow-md">
              Get Started Free
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* 2. Hero Section */}
        <section className="relative pt-12 pb-24 px-6 max-w-7xl mx-auto z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-blue-50 border border-brand-blue-100 mb-6 animate-float">
                <span className="flex h-2 w-2 rounded-full bg-brand-blue-500 animate-pulse"></span>
                <span className="text-xs font-semibold text-brand-blue-700 tracking-wide uppercase">AI-Powered ATS Auditing</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold leading-[1.1] tracking-tight mb-6">
                Perfect Your Resume.<br />
                <span className="text-gradient-blue">Conquer the ATS.</span>
              </h1>

              <p className="text-lg text-brand-slate leading-relaxed mb-8 max-w-lg">
                Stop throwing your CV into a black hole. Parse formats, score keyword match densities, and optimize impact phrasing in under 10 seconds. Built on advanced AI models.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <a href="#upload-widget" className="btn-designer px-8 py-4 rounded-xl text-base shadow-lg justify-center">
                  Analyze Resume Now
                  <svg className="w-5 h-5 ml-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
                <a href="#simulator" className="btn-designer-outline px-8 py-4 rounded-xl text-base justify-center">
                  Try ATS Simulator
                </a>
              </div>

              {/* Quick Specs */}
              <div className="flex items-center gap-6 mt-10 text-xs text-brand-slate font-medium">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  No Credit Card Required
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  GDPR & Privacy Compliant
                </div>
              </div>
            </div>

            {/* Right Widget: Drag and Drop Mockup Uploader */}
            <div id="upload-widget" className="lg:col-span-6 w-full">
              <div className="glass-card-premium rounded-3xl p-8 shadow-xl border border-slate-200/80 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-brand-blue-500 to-brand-indigo"></div>

                {!isUploading && !scanComplete ? (
                  // Default Dropzone State
                  <div
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleFileDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 ${
                      isDragging
                        ? 'border-brand-blue-500 bg-brand-blue-50/50'
                        : 'border-slate-300 hover:border-brand-blue-500 bg-slate-50/50 hover:bg-brand-blue-50/20'
                    }`}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileSelect}
                      accept=".pdf,.docx"
                      className="hidden"
                    />
                    <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center border border-slate-100 text-brand-blue-500 mb-5">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <h3 className="font-heading font-semibold text-lg text-brand-dark mb-2">Upload your resume</h3>
                    <p className="text-sm text-brand-slate max-w-xs mb-4">
                      Drag & drop your file here, or <span className="text-brand-blue-600 font-semibold underline">browse computer</span>
                    </p>
                    <span className="text-xs text-brand-slate bg-slate-100/80 px-2.5 py-1 rounded-md border border-slate-200/50">
                      Supports PDF, DOCX (Max 10MB)
                    </span>
                  </div>
                ) : isUploading ? (
                  // Scanning State
                  <div className="py-12 px-6 flex flex-col items-center text-center relative">
                    {/* Simulated Document Scanning Graphic */}
                    <div className="relative w-28 h-36 bg-slate-50 border border-slate-200 rounded-xl shadow-md flex items-center justify-center mb-8 overflow-hidden">
                      <svg className="w-16 h-16 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      {/* Interactive scanning neon bar */}
                      <div className="absolute left-0 w-full h-1 bg-brand-blue-500 shadow-[0_0_12px_#3b82f6] animate-scan"></div>
                    </div>

                    <h3 className="font-heading font-semibold text-lg text-brand-dark mb-1">
                      Parsing & Analyzing Resume
                    </h3>
                    <p className="text-xs text-brand-slate mb-6">
                      Running formatting, layout, structure, and semantic checks...
                    </p>

                    {/* Progress Bar Container */}
                    <div className="w-full max-w-sm bg-slate-100 h-2 rounded-full overflow-hidden mb-2">
                      <div
                        className="bg-gradient-to-r from-brand-blue-500 to-brand-indigo h-full transition-all duration-100"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-semibold text-brand-blue-600">{uploadProgress}%</span>
                  </div>
                ) : (
                  // Scanned Result State
                  <div className="flex flex-col">
                    <div className="flex items-start justify-between border-b border-slate-100 pb-5 mb-6">
                      <div>
                        <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-md">
                          Analysis Complete
                        </span>
                        <h3 className="font-heading font-bold text-lg text-brand-dark mt-2 truncate max-w-[240px]" title={scannedFile?.name}>
                          {scannedFile?.name}
                        </h3>
                        <p className="text-xs text-brand-slate">Size: {scannedFile?.size}</p>
                      </div>
                      <button onClick={resetUpload} className="text-xs font-semibold text-brand-blue-600 hover:underline">
                        Upload another file
                      </button>
                    </div>

                    {/* ATS Score Radial Layout */}
                    <div className="flex flex-col md:flex-row items-center gap-6 p-5 bg-slate-50 border border-slate-150 rounded-2xl mb-6">
                      <div className="relative w-28 h-28 flex items-center justify-center bg-white rounded-full border border-slate-100 shadow-sm shrink-0">
                        {/* Radial Progress SVG */}
                        <svg className="w-24 h-24 transform -rotate-90">
                          <circle cx="48" cy="48" r="40" stroke="#f1f5f9" strokeWidth="6" fill="transparent" />
                          <circle
                            cx="48"
                            cy="48"
                            r="40"
                            stroke="#3b82f6"
                            strokeWidth="6"
                            fill="transparent"
                            strokeDasharray={251.2}
                            strokeDashoffset={251.2 - (251.2 * 64) / 100}
                            className="transition-all duration-1000 ease-out"
                          />
                        </svg>
                        <div className="absolute flex flex-col items-center justify-center">
                          <span className="text-3xl font-heading font-extrabold text-brand-dark">64</span>
                          <span className="text-[10px] font-semibold text-brand-slate">ATS SCORE</span>
                        </div>
                      </div>

                      <div className="flex-1 text-center md:text-left">
                        <h4 className="font-heading font-bold text-sm text-brand-dark mb-1">
                          Needs Key Adjustments
                        </h4>
                        <p className="text-xs text-brand-slate leading-relaxed">
                          Your resume scored higher than 42% of applicants, but has major formatting and keyword density issues that could block automatic parsing.
                        </p>
                      </div>
                    </div>

                    {/* Breakdown Warning Items */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-start gap-3 p-3 bg-red-50/50 border border-red-100 rounded-xl">
                        <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <div>
                          <h5 className="text-xs font-bold text-slate-800">Critical Formatting Error</h5>
                          <p className="text-[11px] text-slate-600 leading-relaxed">
                            Two-column structure and graphical timeline elements will cause major layout segmentation parsing issues.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 bg-amber-50/50 border border-amber-100 rounded-xl">
                        <svg className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <div>
                          <h5 className="text-xs font-bold text-slate-800">Low Keyword Matching</h5>
                          <p className="text-[11px] text-slate-600 leading-relaxed">
                            Missing essential industry-specific metrics and core software engineering keyword densities.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Conversion CTA */}
                    <a href="/signup" className="btn-designer w-full py-3.5 rounded-xl text-sm font-semibold justify-center text-center shadow-lg">
                      Fix These Errors - Get Detailed Review Now
                      <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* 3. Stats Dashboard Row */}
        <section className="bg-slate-50/60 border-y border-slate-200/50 py-12 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-4">
              <span className="block text-4xl md:text-5xl font-heading font-extrabold text-brand-dark mb-1">120,400+</span>
              <span className="text-sm font-medium text-brand-slate">Resumes Scanned & Audited</span>
            </div>
            <div className="p-4 border-y md:border-y-0 md:border-x border-slate-200/60">
              <span className="block text-4xl md:text-5xl font-heading font-extrabold text-brand-dark mb-1">+32%</span>
              <span className="text-sm font-medium text-brand-slate">Average Response Rate Boost</span>
            </div>
            <div className="p-4">
              <span className="block text-4xl md:text-5xl font-heading font-extrabold text-brand-dark mb-1">94.8%</span>
              <span className="text-sm font-medium text-brand-slate">Applicant Interview Placement Rate</span>
            </div>
          </div>
        </section>

        {/* 4. Interactive ATS Score Simulator Playground */}
        <section id="simulator" className="py-24 px-6 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-blue-50 border border-brand-blue-100 text-brand-blue-700 text-xs font-semibold uppercase mb-4">
              Interactive Tool
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-brand-dark mb-4">
              How Much Do Small Errors Cost You?
            </h2>
            <p className="text-brand-slate text-base md:text-lg">
              Toggle the most common structural and content mistakes on a typical resume below. See in real-time how modern ATS scanning bots react and downgrade your score.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            {/* Interactive Checklist (Left) */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="font-heading font-bold text-xl text-brand-dark mb-5 flex items-center gap-2.5">
                  <svg className="w-5.5 h-5.5 text-brand-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                  Select Common Resume Flaws
                </h3>

                {/* Checklist Item 1 */}
                <button
                  onClick={() => toggleFlaw('genericName')}
                  className={`w-full text-left p-4.5 rounded-2xl border transition-all duration-300 flex items-start gap-4 ${
                    simulatorFlaws.genericName
                      ? 'border-brand-blue-500 bg-brand-blue-50/30'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all ${
                    simulatorFlaws.genericName
                      ? 'border-brand-blue-500 bg-brand-blue-500 text-white'
                      : 'border-slate-300 bg-white'
                  }`}>
                    {simulatorFlaws.genericName && (
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm text-brand-dark mb-0.5">Generic File Naming</h4>
                    <p className="text-xs text-brand-slate">Uploading files named like `Resume_2026_Final_v3.pdf` instead of incorporating your name and job role.</p>
                  </div>
                  <span className="ml-auto text-xs font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-md shrink-0 border border-red-100">
                    -8 Score
                  </span>
                </button>

                {/* Checklist Item 2 */}
                <button
                  onClick={() => toggleFlaw('noMetrics')}
                  className={`w-full text-left p-4.5 rounded-2xl border transition-all duration-300 flex items-start gap-4 ${
                    simulatorFlaws.noMetrics
                      ? 'border-brand-blue-500 bg-brand-blue-50/30'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all ${
                    simulatorFlaws.noMetrics
                      ? 'border-brand-blue-500 bg-brand-blue-500 text-white'
                      : 'border-slate-300 bg-white'
                  }`}>
                    {simulatorFlaws.noMetrics && (
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm text-brand-dark mb-0.5">No Quantitative Achievements</h4>
                    <p className="text-xs text-brand-slate">Describing general tasks instead of impact (e.g. lack of percentages, dollars, or performance numbers).</p>
                  </div>
                  <span className="ml-auto text-xs font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-md shrink-0 border border-red-100">
                    -15 Score
                  </span>
                </button>

                {/* Checklist Item 3 */}
                <button
                  onClick={() => toggleFlaw('multiColumn')}
                  className={`w-full text-left p-4.5 rounded-2xl border transition-all duration-300 flex items-start gap-4 ${
                    simulatorFlaws.multiColumn
                      ? 'border-brand-blue-500 bg-brand-blue-50/30'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all ${
                    simulatorFlaws.multiColumn
                      ? 'border-brand-blue-500 bg-brand-blue-500 text-white'
                      : 'border-slate-300 bg-white'
                  }`}>
                    {simulatorFlaws.multiColumn && (
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm text-brand-dark mb-0.5">Complex Multi-Column Layout</h4>
                    <p className="text-xs text-brand-slate">Using graphic designer resume layouts, circular charts, columns, or tables that scramble traditional parsers.</p>
                  </div>
                  <span className="ml-auto text-xs font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-md shrink-0 border border-red-100">
                    -12 Score
                  </span>
                </button>

                {/* Checklist Item 4 */}
                <button
                  onClick={() => toggleFlaw('missingKeywords')}
                  className={`w-full text-left p-4.5 rounded-2xl border transition-all duration-300 flex items-start gap-4 ${
                    simulatorFlaws.missingKeywords
                      ? 'border-brand-blue-500 bg-brand-blue-50/30'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all ${
                    simulatorFlaws.missingKeywords
                      ? 'border-brand-blue-500 bg-brand-blue-500 text-white'
                      : 'border-slate-300 bg-white'
                  }`}>
                    {simulatorFlaws.missingKeywords && (
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm text-brand-dark mb-0.5">Lack of Target Job Keywords</h4>
                    <p className="text-xs text-brand-slate">Failing to include specific keywords found directly in target job descriptions (e.g. Kubernetes, React).</p>
                  </div>
                  <span className="ml-auto text-xs font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-md shrink-0 border border-red-100">
                    -18 Score
                  </span>
                </button>

                {/* Checklist Item 5 */}
                <button
                  onClick={() => toggleFlaw('unprofessionalEmail')}
                  className={`w-full text-left p-4.5 rounded-2xl border transition-all duration-300 flex items-start gap-4 ${
                    simulatorFlaws.unprofessionalEmail
                      ? 'border-brand-blue-500 bg-brand-blue-50/30'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all ${
                    simulatorFlaws.unprofessionalEmail
                      ? 'border-brand-blue-500 bg-brand-blue-500 text-white'
                      : 'border-slate-300 bg-white'
                  }`}>
                    {simulatorFlaws.unprofessionalEmail && (
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm text-brand-dark mb-0.5">Missing Key Contact Channels</h4>
                    <p className="text-xs text-brand-slate">Omitting clickable links to GitHub or LinkedIn, or utilizing old unprofessional email domains.</p>
                  </div>
                  <span className="ml-auto text-xs font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-md shrink-0 border border-red-100">
                    -7 Score
                  </span>
                </button>
              </div>
            </div>

            {/* Dynamic Results Display (Right) */}
            <div className="lg:col-span-5 flex">
              <div className="glass-card-premium w-full rounded-3xl p-8 border border-slate-200 flex flex-col justify-between shadow-lg relative">
                {/* Simulated Laser grid overlay */}
                <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] -z-10 rounded-3xl"></div>

                <div>
                  <h3 className="font-heading font-extrabold text-lg text-brand-dark mb-6 text-center">
                    ATS Audit Simulator
                  </h3>

                  {/* Radial Progress Display */}
                  <div className="relative w-44 h-44 mx-auto flex items-center justify-center bg-white rounded-full border border-slate-100 shadow-md mb-8">
                    <svg className="w-38 h-38 transform -rotate-90">
                      <circle cx="76" cy="76" r="64" stroke="#f1f5f9" strokeWidth="8" fill="transparent" />
                      <circle
                        cx="76"
                        cy="76"
                        r="64"
                        stroke={currentScore >= 80 ? '#10b981' : currentScore >= 60 ? '#f59e0b' : '#ef4444'}
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={401.9}
                        strokeDashoffset={401.9 - (401.9 * currentScore) / 100}
                        className="transition-all duration-500 ease-out"
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center">
                      <span className="text-5xl font-heading font-black text-brand-dark transition-all duration-300">
                        {currentScore}
                      </span>
                      <span className="text-xs font-bold text-brand-slate tracking-widest mt-1">SCORE</span>
                    </div>
                  </div>

                  {/* Dynamic Rating Message */}
                  <div className="text-center mb-6">
                    <span className={`inline-flex px-3.5 py-1 rounded-full text-xs font-bold border ${
                      currentScore >= 80
                        ? 'text-emerald-700 bg-emerald-50 border-emerald-100'
                        : currentScore >= 60
                        ? 'text-amber-700 bg-amber-50 border-amber-100'
                        : 'text-red-700 bg-red-50 border-red-100'
                    }`}>
                      {currentScore >= 80 ? 'Highly Optimised' : currentScore >= 60 ? 'Needs Fixes' : 'Blocked by ATS'}
                    </span>
                  </div>

                  {/* Live Feed recommendation */}
                  <div className="border-t border-slate-100 pt-5 space-y-4 text-left">
                    <h4 className="text-xs font-bold text-brand-slate uppercase tracking-wider">
                      Live AI Recommendations
                    </h4>

                    {Object.values(simulatorFlaws).every(v => !v) ? (
                      <div className="flex gap-2.5 text-xs text-brand-slate items-start bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Perfect setup! Make sure to maintain quantitative numbers in all bullet descriptions.</span>
                      </div>
                    ) : (
                      <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                        {simulatorFlaws.genericName && (
                          <div className="flex gap-2.5 text-xs text-slate-700 items-start bg-slate-50 p-3 rounded-xl border border-slate-100">
                            <span className="text-red-500 font-extrabold font-heading text-sm">👉</span>
                            <span>Save files as `FirstName_LastName_Role.pdf`. Parsers look for structural name mappings immediately.</span>
                          </div>
                        )}
                        {simulatorFlaws.noMetrics && (
                          <div className="flex gap-2.5 text-xs text-slate-700 items-start bg-slate-50 p-3 rounded-xl border border-slate-100">
                            <span className="text-red-500 font-extrabold font-heading text-sm">👉</span>
                            <span>Replace &quot;Responsible for website sales&quot; with &quot;Led a team to scale monthly ecommerce sales by 35%, generating an extra $40K ARR&quot;.</span>
                          </div>
                        )}
                        {simulatorFlaws.multiColumn && (
                          <div className="flex gap-2.5 text-xs text-slate-700 items-start bg-slate-50 p-3 rounded-xl border border-slate-100">
                            <span className="text-red-500 font-extrabold font-heading text-sm">👉</span>
                            <span>Use standard single-column chronological formats. Tabular frameworks isolate details into unreadable segments for parsers.</span>
                          </div>
                        )}
                        {simulatorFlaws.missingKeywords && (
                          <div className="flex gap-2.5 text-xs text-slate-700 items-start bg-slate-50 p-3 rounded-xl border border-slate-100">
                            <span className="text-red-500 font-extrabold font-heading text-sm">👉</span>
                            <span>Target specific technologies mentioned in the listing (e.g. AWS, Next.js). System searches look for strict acronym exact-matches.</span>
                          </div>
                        )}
                        {simulatorFlaws.unprofessionalEmail && (
                          <div className="flex gap-2.5 text-xs text-slate-700 items-start bg-slate-50 p-3 rounded-xl border border-slate-100">
                            <span className="text-red-500 font-extrabold font-heading text-sm">👉</span>
                            <span>Always place clickable, hyperlinked links to your Portfolio, LinkedIn, or GitHub at the very header of the page.</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 mt-6">
                  <a href="/signup" className="btn-designer w-full py-3.5 rounded-xl text-sm font-semibold justify-center shadow-md">
                    Claim Your Optimized Structure Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Features Showroom Grid */}
        <section id="features" className="py-24 px-6 bg-slate-50/50 border-y border-slate-200/40">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-blue-50 border border-brand-blue-100 text-brand-blue-700 text-xs font-semibold uppercase mb-4">
                Core Capabilities
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-brand-dark mb-4">
                Engineered for High-Conversion Resumes
              </h2>
              <p className="text-brand-slate text-base">
                Discover the deep analytical checks conducted automatically on every PDF uploaded to the CV-Shield engine.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Feature 1 */}
              <div className="glass-card-premium feature-card rounded-2xl p-6 border border-slate-200 flex flex-col items-start bg-white shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-brand-blue-50 border border-brand-blue-100 flex items-center justify-center text-brand-blue-600 mb-6">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="font-heading font-bold text-base text-brand-dark mb-3">ATS Format Validator</h3>
                <p className="text-xs text-brand-slate leading-relaxed">
                  Identifies parsing limitations like tables, graphics, fonts, header formats, and multi-column divisions.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="glass-card-premium feature-card rounded-2xl p-6 border border-slate-200 flex flex-col items-start bg-white shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-brand-blue-50 border border-brand-blue-100 flex items-center justify-center text-brand-blue-600 mb-6">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
                  </svg>
                </div>
                <h3 className="font-heading font-bold text-base text-brand-dark mb-3">Keyword & Match Audit</h3>
                <p className="text-xs text-brand-slate leading-relaxed">
                  Compares CV contents against hundreds of real job listings to highlight essential missing technologies.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="glass-card-premium feature-card rounded-2xl p-6 border border-slate-200 flex flex-col items-start bg-white shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-brand-blue-50 border border-brand-blue-100 flex items-center justify-center text-brand-blue-600 mb-6">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-heading font-bold text-base text-brand-dark mb-3">Actionable Impact Check</h3>
                <p className="text-xs text-brand-slate leading-relaxed">
                  Triggers alerts when descriptions lack metric milestones or rely heavily on passive, generic verbs.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="glass-card-premium feature-card rounded-2xl p-6 border border-slate-200 flex flex-col items-start bg-white shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-brand-blue-50 border border-brand-blue-100 flex items-center justify-center text-brand-blue-600 mb-6">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H18.5" />
                  </svg>
                </div>
                <h3 className="font-heading font-bold text-base text-brand-dark mb-3">Background Queueing</h3>
                <p className="text-xs text-brand-slate leading-relaxed">
                  Heavy analysis runs asynchronously on BullMQ and Redis, keeping your interface smooth and lag-free.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Workflow Timeline ("How it Works") */}
        <section id="workflow" className="py-24 px-6 max-w-7xl mx-auto relative">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-blue-50 border border-brand-blue-100 text-brand-blue-700 text-xs font-semibold uppercase mb-4">
              Our Process
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-brand-dark mb-4">
              Get Recruiter-Ready in 4 Simple Steps
            </h2>
            <p className="text-brand-slate text-base">
              Here is how we turn generic, filtered-out resumes into high-impact, interview-landing structures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="w-16 h-16 rounded-full bg-brand-blue-50 border border-brand-blue-100 flex items-center justify-center font-heading font-extrabold text-lg text-brand-blue-600 mb-6 shadow-sm">
                1
              </div>
              <h3 className="font-heading font-bold text-base text-brand-dark mb-2">Secure Upload</h3>
              <p className="text-xs text-brand-slate leading-relaxed px-2">
                Drop your resume in PDF/Doc format. It is stored securely in Drizzle databases.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="w-16 h-16 rounded-full bg-brand-blue-50 border border-brand-blue-100 flex items-center justify-center font-heading font-extrabold text-lg text-brand-blue-600 mb-6 shadow-sm">
                2
              </div>
              <h3 className="font-heading font-bold text-base text-brand-dark mb-2">Job Description Match</h3>
              <p className="text-xs text-brand-slate leading-relaxed px-2">
                Provide a target job description or title. We segment and isolate required skill keywords.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="w-16 h-16 rounded-full bg-brand-blue-50 border border-brand-blue-100 flex items-center justify-center font-heading font-extrabold text-lg text-brand-blue-600 mb-6 shadow-sm">
                3
              </div>
              <h3 className="font-heading font-bold text-base text-brand-dark mb-2">Deep AI Audit</h3>
              <p className="text-xs text-brand-slate leading-relaxed px-2">
                Redis and BullMQ processes run background models to verify formatting and score phrasing.
              </p>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="w-16 h-16 rounded-full bg-brand-blue-50 border border-brand-blue-100 flex items-center justify-center font-heading font-extrabold text-lg text-brand-blue-600 mb-6 shadow-sm">
                4
              </div>
              <h3 className="font-heading font-bold text-base text-brand-dark mb-2">Actionable Fixes</h3>
              <p className="text-xs text-brand-slate leading-relaxed px-2">
                Download line-by-line phrasing changes, optimized keywords, and a parsed resume.
              </p>
            </div>

            {/* Background Line Connector */}
            <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-brand-blue-200 via-brand-indigo/35 to-brand-blue-200 -z-0"></div>
          </div>
        </section>

        {/* 7. Testimonials Row */}
        <section id="testimonials" className="py-24 px-6 bg-slate-50/50 border-t border-slate-200/40">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-blue-50 border border-brand-blue-100 text-brand-blue-700 text-xs font-semibold uppercase mb-4">
                Testimonials
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-brand-dark mb-4">
                Real Outcomes from Real Job Seekers
              </h2>
              <p className="text-brand-slate text-base">
                Read how our users bypassed recruiter filtering blocks and landed interviews at top-tier companies.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Review 1 */}
              <div className="glass-card-premium rounded-3xl p-8 border border-slate-200/80 bg-white flex flex-col justify-between shadow-sm relative">
                <div>
                  <div className="flex items-center gap-1.5 mb-6 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="text-sm font-medium text-brand-dark leading-relaxed mb-6">
                    &quot;I submitted my CV over 80 times to software engineering roles without a single callback. Using CV-Shield, I realized my two-column layout was literally unreadable to standard systems. Fixed it in 5 minutes. Got 3 callbacks the following week.&quot;
                  </blockquote>
                </div>
                <div className="flex items-center gap-4 pt-4 border-t border-slate-100 mt-2">
                  <div className="w-11 h-11 rounded-full bg-brand-blue-100 flex items-center justify-center font-heading font-extrabold text-brand-blue-600 text-sm">
                    SK
                  </div>
                  <div>
                    <cite className="not-italic font-bold text-sm text-brand-dark block">Siddharth K.</cite>
                    <span className="text-xs text-brand-slate block">Software Engineer — landed at Coinbase</span>
                  </div>
                  <span className="ml-auto text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100 shrink-0">
                    Score: 48 ➔ 89
                  </span>
                </div>
              </div>

              {/* Review 2 */}
              <div className="glass-card-premium rounded-3xl p-8 border border-slate-200/80 bg-white flex flex-col justify-between shadow-sm relative">
                <div>
                  <div className="flex items-center gap-1.5 mb-6 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="text-sm font-medium text-brand-dark leading-relaxed mb-6">
                    &quot;As a Product Manager, I had plenty of experience but my resume lacked metrics. The AI scorecard pinpointed exactly which paragraphs needed quantifiable data and suggested exact templates. Landed an interview at Stripe in 3 days.&quot;
                  </blockquote>
                </div>
                <div className="flex items-center gap-4 pt-4 border-t border-slate-100 mt-2">
                  <div className="w-11 h-11 rounded-full bg-brand-blue-100 flex items-center justify-center font-heading font-extrabold text-brand-blue-600 text-sm">
                    EL
                  </div>
                  <div>
                    <cite className="not-italic font-bold text-sm text-brand-dark block">Elena L.</cite>
                    <span className="text-xs text-brand-slate block">Product Manager — landed at Stripe</span>
                  </div>
                  <span className="ml-auto text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100 shrink-0">
                    Score: 56 ➔ 92
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. Call to Action (CTA) Banner */}
        <section className="py-24 px-6 max-w-7xl mx-auto relative">
          {/* Radial visual glows under the container */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[70%] bg-gradient-to-tr from-brand-blue-500/20 to-brand-indigo/10 blur-[100px] -z-10"></div>

          <div className="bg-brand-dark rounded-3xl p-12 md:p-16 border border-slate-800 text-center relative overflow-hidden shadow-2xl">
            {/* Visual Grid Lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30"></div>

            <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
              <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white mb-6 tracking-tight leading-tight">
                Land More Interviews.<br />
                Bypass the ATS Blocks.
              </h2>
              <p className="text-slate-400 text-base md:text-lg mb-10 leading-relaxed">
                Join 50,000+ software developers, product managers, and designers who use CV-Shield to bypass initial system layers. Check your score now.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <a href="/signup" className="btn-designer px-8 py-4 rounded-xl text-base shadow-xl justify-center bg-white text-brand-dark hover:bg-slate-50 font-bold">
                  Analyze For Free
                </a>
                <a href="/signIn" className="btn-designer-outline px-8 py-4 rounded-xl text-base justify-center bg-transparent border-slate-700 text-slate-200 hover:bg-slate-800/50">
                  Sign In
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 9. Footer */}
      <footer className="border-t border-slate-200/60 bg-white py-16 px-6 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo & Slogan */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-blue-600 to-brand-indigo flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="font-heading font-extrabold text-base text-brand-dark tracking-tight">
                CV<span className="text-brand-blue-600">Shield</span>
              </span>
            </div>
            <p className="text-xs text-brand-slate max-w-xs">
              AI-Powered ATS resume analyzing and structural optimization engine.
            </p>
          </div>

          {/* Links & Quick Operations */}
          <div className="flex flex-wrap justify-center gap-8 text-xs font-semibold text-brand-slate">
            <a href="#features" className="hover:text-brand-blue-600 transition-colors">Features</a>
            <a href="#simulator" className="hover:text-brand-blue-600 transition-colors">ATS Simulator</a>
            <a href="#workflow" className="hover:text-brand-blue-600 transition-colors">Process</a>
            <a href="#testimonials" className="hover:text-brand-blue-600 transition-colors">Success Stories</a>
            <a href="/privacy" className="hover:text-brand-blue-600 transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-brand-blue-600 transition-colors">Terms of Service</a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-slate-100 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-brand-slate gap-4">
          <p>© {new Date().getFullYear()} CV-Shield / Resume Analyzer. All rights reserved.</p>
          <p>
            Powered by Drizzle, BullMQ, and deep career modeling engines.
          </p>
        </div>
      </footer>
    </div>
  );
}