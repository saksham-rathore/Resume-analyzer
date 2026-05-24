'use client';

import React, { useState, useRef } from 'react';

export default function Hero() {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [scannedFile, setScannedFile] = useState<{ name: string; size: string } | null>(null);
  const [scanComplete, setScanComplete] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  return (
    <section className="relative px-6 landing-content-width mx-auto z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left Content */}
        <div className="lg:col-span-6 flex flex-col items-start text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-light border border-blue-light-active mb-6 animate-float">
            <span className="flex h-2 w-2 rounded-full bg-blue-normal"></span>
            <span className="text-xs font-semibold text-blue-dark tracking-wide uppercase">AI-Powered ATS Auditing</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl tracking-tighter leading-[1.1] mb-6 text-slate-800">
            <span className="font-satoshi font-normal text-slate-800">Perfect Your </span>
            <span className="font-playfair font-normal text-slate-800">Resume.</span><br />
            <span className="font-satoshi font-normal text-slate-800">Conquer the </span>
            <span className="font-playfair font-normal text-slate-800">ATS.</span>
          </h1>

          <p className="text-base md:text-lg text-slate-505 leading-relaxed mb-8 max-w-lg">
            Stop throwing your <span className="italic-accent text-slate-700">CV</span> into a black hole. Parse formats, score <span className="italic-accent text-slate-700">keyword match densities</span>, and optimize <span className="italic-accent text-slate-700">impact phrasing</span> in under 10 seconds. Built on advanced <span className="italic-accent text-slate-700">AI models</span>.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a href="#upload-widget" className="btn-designer px-8 py-4 rounded-xl text-base shadow-md justify-center">
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
          <div className="flex items-center gap-6 mt-10 text-xs text-slate-500 font-medium">
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
          <div className="glass-card-premium rounded-3xl p-8 border relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-normal to-blue-dark"></div>

            {!isUploading && !scanComplete ? (
              // Default Dropzone State
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleFileDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 ${
                  isDragging
                    ? 'border-blue-normal bg-blue-light/50'
                    : 'border-slate-300 hover:border-blue-normal bg-slate-50/50 hover:bg-blue-light/20'
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept=".pdf,.docx"
                  className="hidden"
                />
                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center border border-slate-100 text-blue-normal mb-5">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <h3 className="font-cabinet font-semibold text-lg text-slate-800 mb-2">Upload your resume</h3>
                <p className="text-sm text-slate-500 max-w-xs mb-4">
                  Drag & drop your file here, or <span className="text-blue-normal font-semibold underline">browse computer</span>
                </p>
                <span className="text-xs text-slate-500 bg-slate-100/80 px-2.5 py-1 rounded-md border border-slate-200/50">
                  Supports PDF, DOCX (Max 10MB)
                </span>
              </div>
            ) : isUploading ? (
              // Scanning State
              <div className="py-12 px-6 flex flex-col items-center text-center relative">
                <div className="relative w-28 h-36 bg-slate-50 border border-slate-200 rounded-xl shadow-sm flex items-center justify-center mb-8 overflow-hidden">
                  <svg className="w-16 h-16 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <div className="absolute left-0 w-full h-1 bg-blue-normal shadow-[0_0_12px_rgba(121,164,255,0.8)] animate-scan"></div>
                </div>

                <h3 className="font-cabinet font-semibold text-lg text-slate-800 mb-1">
                  Parsing & Analyzing Resume
                </h3>
                <p className="text-xs text-slate-500 mb-6">
                  Running formatting, layout, structure, and semantic checks...
                </p>

                <div className="w-full max-w-sm bg-slate-100 h-2 rounded-full overflow-hidden mb-2">
                  <div
                    className="bg-gradient-to-r from-blue-normal to-blue-dark h-full transition-all duration-100"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
                <span className="text-sm font-semibold text-blue-normal">{uploadProgress}%</span>
              </div>
            ) : (
              // Scanned Result State
              <div className="flex flex-col">
                <div className="flex items-start justify-between border-b border-slate-100 pb-5 mb-6">
                  <div>
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-md">
                      Analysis Complete
                    </span>
                    <h3 className="font-cabinet font-bold text-lg text-slate-800 mt-2 truncate max-w-[240px]" title={scannedFile?.name}>
                      {scannedFile?.name}
                    </h3>
                    <p className="text-xs text-slate-500">Size: {scannedFile?.size}</p>
                  </div>
                  <button onClick={resetUpload} className="text-xs font-semibold text-blue-normal hover:underline">
                    Upload another file
                  </button>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-6 p-5 bg-slate-50 border border-slate-100 rounded-2xl mb-6">
                  <div className="relative w-28 h-28 flex items-center justify-center bg-white rounded-full border border-slate-100 shadow-sm shrink-0">
                    <svg className="w-24 h-24 transform -rotate-90">
                      <circle cx="48" cy="48" r="40" stroke="#f1f5f9" strokeWidth="6" fill="transparent" />
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="#79a4ff"
                        strokeWidth="6"
                        fill="transparent"
                        strokeDasharray={251.2}
                        strokeDashoffset={251.2 - (251.2 * 64) / 100}
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center">
                      <span className="text-3xl font-cabinet font-extrabold text-slate-800">64</span>
                      <span className="text-[10px] font-semibold text-slate-500">ATS SCORE</span>
                    </div>
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <h4 className="font-cabinet font-bold text-sm text-slate-800 mb-1">
                      Needs Key Adjustments
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Your resume scored higher than 42% of applicants, but has major formatting and keyword density issues that could block automatic parsing.
                    </p>
                  </div>
                </div>

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

                <a href="/signup" className="btn-designer w-full py-3.5 rounded-xl text-sm font-semibold justify-center text-center shadow-md">
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
  );
}
