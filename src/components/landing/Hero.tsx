'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { usePathname } from "next/navigation";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 22 },
  },
};

export default function Hero() {
  const { data: session } = useSession();
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [scannedFile, setScannedFile] = useState<{ name: string; size: string } | null>(null);
  const [scanComplete, setScanComplete] = useState(false);
  const [isAnalysing, setIsAnalysing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      startActualUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      startActualUpload(e.target.files[0]);
    }
  };

  const startActualUpload = async (file: File) => {
    if (!session?.user?.id) {
      startSimulatedScan(file);
      return;
    }

    setIsUploading(true);
    setScanComplete(false);
    setUploadProgress(0);
    setError(null);
    setAnalysisResult(null);
    setScannedFile({
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
    });

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('userId', session.user.id);
      formData.append('title', file.name);
      formData.append('jobRole', 'Software Engineer');

      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => (prev >= 90 ? 90 : prev + 10));
      }, 150);

      const response = await axios.post('/api/Resume', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      clearInterval(progressInterval);
      setUploadProgress(95);

      const resumeId = response.data.resumeId;
      pollStatus(resumeId);

    } catch (err: any) {
      setIsUploading(false);
      setError(err.response?.data?.error || 'Failed to upload and analyze resume.');
      console.error(err);
    }
  };

  const pollStatus = (resumeId: number) => {
    let attempts = 0;
    const interval = setInterval(async () => {
      attempts++;
      try {
        const res = await axios.get(`/api/auth/status?id=${resumeId}`);
        if (res.data.status === 'completed') {
          clearInterval(interval);
          setUploadProgress(100);
          setAnalysisResult(res.data.analysis);
          setTimeout(() => {
            setIsUploading(false);
            setScanComplete(true);
          }, 600);
        } else {
          setUploadProgress((prev) => (prev >= 99 ? 99 : prev + 1));
        }
      } catch (err) {
        clearInterval(interval);
        setIsUploading(false);
        setError('Failed to fetch analysis progress.');
      }

      if (attempts > 40) {
        clearInterval(interval);
        setIsUploading(false);
        setError('Analysis took too long. Please try again.');
      }
    }, 1500);
  };

  const startSimulatedScan = (file: File) => {
    setIsUploading(true);
    setScanComplete(false);
    setUploadProgress(0);
    setError(null);
    setAnalysisResult(null);
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


  const pathname = usePathname();
  return (
    <section key={pathname} className="relative px-6 landing-content-width mx-auto z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-6 flex flex-col items-start text-left"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/70 border border-blue-light-active/40 shadow-sm backdrop-blur-md mb-8 animate-float"
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-normal opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-normal"></span>
            </span>
            <span className="text-[10px] font-bold text-blue-dark tracking-wider uppercase font-cabinet">
              AI-Powered ATS Auditing
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-6xl lg:text-7xl leading-[1.08] mb-6 not-italic"
          >
            <span className="font-cabinet tracking-tight font-normal text-slate-800 block">
              Perfect Your{' '}
              <span className="font-instrument italic text-blue-dark tracking-normal">Resume.</span>
            </span>
            <span className="font-cabinet tracking-tight font-normal text-slate-800 block">
              Conquer the{' '}
              <span className="font-instrument italic text-blue-dark tracking-normal">ATS.</span>
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg text-slate-500 leading-relaxed mb-10 max-w-lg font-satoshi font-normal"
          >
            Stop throwing your <span className="font-cormorant italic text-lg text-slate-800 tracking-wide font-normal">CV</span> into a black hole. Parse formats, score <span className="font-cormorant italic text-lg text-slate-800 tracking-wide font-normal">keyword match densities</span>, and optimize <span className="font-cormorant italic text-lg text-slate-800 tracking-wide font-normal">impact phrasing</span> in under 10 seconds. Built on advanced <span className="font-cormorant italic text-lg text-slate-800 tracking-wide font-normal">AI models</span>.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <a href="#upload-widget" className="btn-designer px-8 py-4 rounded-2xl text-base shadow-lg justify-center font-cabinet font-semibold tracking-wide gap-2 group">
              Analyze Resume Now
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            <a href="#simulator" className="btn-designer-outline px-8 py-4 rounded-2xl text-base justify-center font-cabinet font-semibold tracking-wide hover:shadow-md transition-all duration-300">
              Try ATS Simulator
            </a>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex items-center gap-6 mt-10 text-xs text-slate-500 font-medium"
          >
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
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', damping: 25, stiffness: 100, delay: 0.3 }}
          id="upload-widget"
          className="lg:col-span-6 w-full"
        >
          <div className="glass-card-premium rounded-3xl p-8 border relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-normal to-blue-dark"></div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-xs px-4 py-3 rounded-xl mb-6 text-center font-medium">
                {error}
              </div>
            )}

            <AnimatePresence mode="wait">
              {!isUploading && !scanComplete ? (
                <motion.div
                  key="dropzone"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleFileDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 ${isDragging
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
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-md flex items-center justify-center border border-slate-100/80 text-blue-normal mb-5 transition-transform duration-300 hover:scale-110 hover:rotate-3">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <h3 className="font-cormorant italic text-2xl text-slate-800 mb-2 font-normal">Upload your resume</h3>
                  <p className="text-sm text-slate-500 max-w-xs mb-4 font-satoshi">
                    Drag & drop your file here, or <span className="text-blue-normal font-semibold underline hover:text-blue-normal-hover transition-colors">browse computer</span>
                  </p>
                  <span className="text-xs text-slate-500 bg-slate-100/80 px-2.5 py-1 rounded-md border border-slate-200/50">
                    Supports PDF, DOCX (Max 10MB)
                  </span>
                </motion.div>
              ) : isUploading ? (
                <motion.div
                  key="scanning"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="py-12 px-6 flex flex-col items-center text-center relative"
                >
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
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col"
                >
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
                    <button onClick={resetUpload} className="text-xs font-semibold text-blue-normal hover:underline cursor-pointer">
                      Upload another file
                    </button>
                  </div>

                  <div className="flex flex-col md:flex-row items-center gap-6 p-5 bg-slate-50 border border-slate-100 rounded-2xl mb-6">
                    <div className="relative w-28 h-28 flex items-center justify-center bg-white rounded-full border border-slate-100 shadow-sm shrink-0">
                      <svg className="w-24 h-24 transform -rotate-90">
                        <circle cx="48" cy="48" r="40" stroke="#f1f5f9" strokeWidth="6" fill="transparent" />
                        <motion.circle
                          cx="48"
                          cy="48"
                          r="40"
                          stroke="#79a4ff"
                          strokeWidth="6"
                          fill="transparent"
                          strokeDasharray={251.2}
                          initial={{ strokeDashoffset: 251.2 }}
                          animate={{ strokeDashoffset: 251.2 - (251.2 * (analysisResult ? analysisResult.score : 64)) / 100 }}
                          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                        />
                      </svg>
                      <div className="absolute flex flex-col items-center justify-center">
                        <span className="text-3.5xl font-cabinet font-bold text-slate-800 leading-none">
                          {analysisResult ? analysisResult.score : 64}
                        </span>
                        <span className="text-[9px] font-cabinet tracking-widest text-slate-400 font-bold uppercase mt-1">ATS Score</span>
                      </div>
                    </div>

                    <div className="flex-1 text-center md:text-left">
                      <h4 className="font-cormorant italic text-base text-slate-800 mb-1 font-semibold">
                        {analysisResult ? (analysisResult.score >= 80 ? 'Excellent Match' : 'Needs Key Adjustments') : 'Needs Key Adjustments'}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {analysisResult ? analysisResult.feedback : 'Your resume scored higher than 42% of applicants, but has major formatting and keyword density issues that could block automatic parsing.'}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <motion.div
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
                      className={`flex items-start gap-3 p-3 border rounded-xl ${analysisResult ? 'bg-emerald-50/50 border-emerald-100' : 'bg-red-50/50 border-red-100'
                        }`}
                    >
                      {analysisResult ? (
                        <svg className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      )}
                      <div>
                        <h5 className="text-xs font-bold text-slate-800">
                          {analysisResult ? 'Key Strengths' : 'Critical Formatting Error'}
                        </h5>
                        <p className="text-[11px] text-slate-600 leading-relaxed">
                          {analysisResult ? analysisResult.strengths : 'Two-column structure and graphical timeline elements will cause major layout segmentation parsing issues.'}
                        </p>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4, type: 'spring', stiffness: 100 }}
                      className="flex items-start gap-3 p-3 bg-amber-50/50 border border-amber-100 rounded-xl"
                    >
                      <svg className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <div>
                        <h5 className="text-xs font-bold text-slate-800">
                          {analysisResult ? 'Areas to Improve' : 'Low Keyword Matching'}
                        </h5>
                        <p className="text-[11px] text-slate-600 leading-relaxed">
                          {analysisResult ? analysisResult.weaknesses : 'Missing essential industry-specific metrics and core software engineering keyword densities.'}
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  <motion.a
                    href={session ? "/Dashboard" : "/signup"}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="btn-designer w-full py-3.5 rounded-xl text-sm font-semibold justify-center text-center shadow-md cursor-pointer"
                  >
                    {session ? "Go to Dashboard for Full Report" : "Fix These Errors - Get Detailed Review Now"}
                    <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </motion.a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
