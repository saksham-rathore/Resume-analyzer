'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

interface ResumeAnalysis {
  id: number;
  score: number | null;
  feedback: string | null;
  strengths: string | null;
  weaknesses: string | null;
  suggestions: string | null;
  jobRole: string | null;
}

interface ResumeItem {
  id: number;
  userId: string;
  title: string;
  content: string;
  fileUrl: string;
  createdAt: string;
  analysis: ResumeAnalysis | null;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Resume state
  const [resumes, setResumes] = useState<ResumeItem[]>([]);
  const [isLoadingResumes, setIsLoadingResumes] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Upload widget state
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [scannedFile, setScannedFile] = useState<{ name: string; size: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Modal report state
  const [selectedResume, setSelectedResume] = useState<ResumeItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Protected route check
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signIn');
    }
  }, [status, router]);

  // Fetch reviews on mount & when session is available
  const fetchResumes = async () => {
    if (!session?.user?.id) return;
    try {
      setIsLoadingResumes(true);
      const res = await axios.get(`/api/Resume?userId=${session.user.id}`);
      setResumes(res.data);
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to load your resume reviews. Please refresh the page.");
    } finally {
      setIsLoadingResumes(false);
    }
  };

  useEffect(() => {
    if (session?.user?.id) {
      fetchResumes();
    }
  }, [session?.user?.id]);

  // Handle Drag & Drop Upload
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

  // Perform upload to serverless pipeline
  const startActualUpload = async (file: File) => {
    if (!session?.user?.id) return;

    setIsUploading(true);
    setUploadProgress(0);
    setUploadError(null);
    setScannedFile({
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
    });

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('userId', session.user.id);
      formData.append('title', file.name);
      formData.append('jobRole', 'Software Engineer'); // Default target

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
      setUploadError(err.response?.data?.error || 'Failed to upload and analyze resume.');
      console.error(err);
    }
  };

  // Poll analysis task progress
  const pollStatus = (resumeId: number) => {
    let attempts = 0;
    const interval = setInterval(async () => {
      attempts++;
      try {
        const res = await axios.get(`/api/auth/status?id=${resumeId}`);
        if (res.data.status === 'completed') {
          clearInterval(interval);
          setUploadProgress(100);
          setTimeout(() => {
            setIsUploading(false);
            setScannedFile(null);
            fetchResumes(); // Refresh dashboard data!
          }, 600);
        } else {
          setUploadProgress((prev) => (prev >= 99 ? 99 : prev + 1));
        }
      } catch (err) {
        clearInterval(interval);
        setIsUploading(false);
        setUploadError('Failed to fetch analysis progress.');
      }

      if (attempts > 40) {
        clearInterval(interval);
        setIsUploading(false);
        setUploadError('Analysis took too long. Please try again.');
      }
    }, 1500);
  };

  // Delete resume review
  const handleDeleteResume = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid opening report modal
    if (!confirm("Are you sure you want to delete this resume scan and its feedback report?")) return;

    try {
      await axios.delete(`/api/Resume?id=${id}`);
      setResumes((prev) => prev.filter((item) => item.id !== id));
      if (selectedResume?.id === id) {
        setSelectedResume(null);
        setIsModalOpen(false);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete the resume. Please try again.");
    }
  };

  // Compute overall dashboard stats
  const completedReviews = resumes.filter((r) => r.analysis?.score !== null && r.analysis?.score !== undefined);
  const totalScans = resumes.length;
  
  const averageScore = completedReviews.length > 0 
    ? Math.round(completedReviews.reduce((acc, curr) => acc + (curr.analysis?.score || 0), 0) / completedReviews.length)
    : 0;

  const highestScore = completedReviews.length > 0
    ? Math.max(...completedReviews.map((r) => r.analysis?.score || 0))
    : 0;

  const rolesAnalyzed = Array.from(
    new Set(completedReviews.map((r) => r.analysis?.jobRole).filter(Boolean))
  );

  // Formatting utility
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Helper to color code ATS score badges
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600 bg-emerald-50 border-emerald-100';
    if (score >= 60) return 'text-amber-600 bg-amber-50 border-amber-100';
    return 'text-red-600 bg-red-50 border-red-100';
  };

  if (status === 'loading') {
    return (
      <div className="mesh-bg min-h-screen flex flex-col items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-blue-light border-t-blue-normal animate-spin"></div>
          <p className="text-slate-500 font-cabinet font-semibold text-lg animate-pulse">
            Verifying Shield Authentication...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mesh-bg min-h-screen flex flex-col font-sans bg-slate-50/50">
      
      {/* HEADER NAV */}
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-slate-100/80 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => router.push('/')}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-normal to-blue-dark flex items-center justify-center shadow-sm">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <span className="font-cabinet font-extrabold text-xl text-slate-900 tracking-tight">
              CV<span className="text-blue-normal">Shield</span>
            </span>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden sm:flex flex-col items-end text-right">
              <span className="text-sm font-cabinet font-bold text-slate-800">{session?.user?.name || 'CVShield Member'}</span>
              <span className="text-[10px] font-semibold text-slate-400">{session?.user?.email}</span>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="btn-designer-outline px-4 py-2 rounded-xl text-xs sm:text-sm font-cabinet font-bold tracking-wide gap-2 group"
            >
              Log Out
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* DASHBOARD CONTENT CONTAINER */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10 z-10 relative">
        
        {/* WELCOME BANNER */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-cabinet font-extrabold text-3xl sm:text-4xl text-slate-800 leading-none">
              Dashboard Overview
            </h1>
            <p className="text-slate-500 font-satoshi text-sm sm:text-base mt-2 font-medium">
              Hello, <span className="text-slate-700 font-bold">{session?.user?.name || 'User'}</span>. Track, audit, and fortify your resume against parsing algorithms.
            </p>
          </div>
        </div>

        {/* METRIC ANALYSIS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          
          {/* STAT 1 */}
          <div className="glass-card-premium rounded-3xl p-6 border relative overflow-hidden flex items-center gap-5 hover:translate-y-0!">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-normal shrink-0">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-cabinet">Total Reviews</span>
              <span className="text-3xl font-cabinet font-extrabold text-slate-800 mt-1 block leading-none">{totalScans}</span>
            </div>
          </div>

          {/* STAT 2 */}
          <div className="glass-card-premium rounded-3xl p-6 border relative overflow-hidden flex items-center gap-5 hover:translate-y-0!">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500 shrink-0">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-cabinet">Average ATS Score</span>
              <span className="text-3xl font-cabinet font-extrabold text-slate-800 mt-1 block leading-none">
                {averageScore}%
              </span>
            </div>
          </div>

          {/* STAT 3 */}
          <div className="glass-card-premium rounded-3xl p-6 border relative overflow-hidden flex items-center gap-5 hover:translate-y-0!">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-500 shrink-0">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-cabinet">Highest Score</span>
              <span className="text-3xl font-cabinet font-extrabold text-slate-800 mt-1 block leading-none">
                {highestScore}%
              </span>
            </div>
          </div>

          {/* STAT 4 */}
          <div className="glass-card-premium rounded-3xl p-6 border relative overflow-hidden flex items-center gap-5 hover:translate-y-0!">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-500 shrink-0">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-cabinet">Identified Roles</span>
              <span className="text-sm font-cabinet font-extrabold text-slate-800 mt-1 block leading-tight truncate max-w-[170px]" title={rolesAnalyzed.join(', ') || 'N/A'}>
                {rolesAnalyzed.length > 0 ? rolesAnalyzed[0] : 'None'}
                {rolesAnalyzed.length > 1 && ` (+${rolesAnalyzed.length - 1})`}
              </span>
            </div>
          </div>

        </div>

        {/* WORKSPACE GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* UPLOAD WIDGET PANEL */}
          <div className="lg:col-span-4 space-y-6">
            <div className="glass-card-premium rounded-3xl p-6 border relative overflow-hidden hover:translate-y-0!">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-normal to-blue-dark animate-pulse"></div>
              
              <h3 className="font-cabinet font-extrabold text-xl text-slate-800 mb-2">
                Scan New Resume
              </h3>
              <p className="text-xs text-slate-400 font-satoshi mb-6 font-medium leading-relaxed">
                Add an updated CV here to evaluate improvements, test layouts, and identify keyword changes instantly.
              </p>

              {uploadError && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-xs px-4 py-2.5 rounded-xl mb-4 text-center font-semibold">
                  {uploadError}
                </div>
              )}

              {/* UPLOAD DRAGZONE */}
              {!isUploading ? (
                <div
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleFileDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 ${
                    isDragging
                      ? 'border-blue-normal bg-blue-light/50'
                      : 'border-slate-200 hover:border-blue-normal bg-slate-50/50 hover:bg-blue-light/10'
                  }`}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    accept=".pdf,.docx"
                    className="hidden"
                  />
                  
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-blue-normal mb-4 transition-transform duration-300 hover:scale-105">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  
                  <h4 className="font-cabinet font-bold text-sm text-slate-700 mb-1">Upload Resume</h4>
                  <p className="text-[11px] text-slate-400 font-satoshi max-w-[180px] leading-normal">
                    Drag file here or <span className="text-blue-normal font-bold underline">browse files</span>
                  </p>
                  <span className="text-[9px] text-slate-400 bg-slate-100 border border-slate-100 px-2 py-0.5 rounded-md mt-4 block">
                    PDF, DOCX (Max 10MB)
                  </span>
                </div>
              ) : (
                /* UPLOADING LOADER */
                <div className="py-8 px-4 flex flex-col items-center text-center">
                  <div className="relative w-16 h-20 bg-slate-50 border border-slate-200 rounded-lg shadow-xs flex items-center justify-center mb-6 overflow-hidden">
                    <svg className="w-10 h-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <div className="absolute left-0 w-full h-0.5 bg-blue-normal shadow-[0_0_8px_rgba(121,164,255,0.8)] animate-scan"></div>
                  </div>

                  <h4 className="font-cabinet font-bold text-sm text-slate-800 mb-1">Analyzing Document</h4>
                  <p className="text-[10px] text-slate-400 mb-5 leading-normal max-w-[200px]">
                    {scannedFile?.name || 'Parsing contents'}
                  </p>

                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mb-2">
                    <div
                      className="bg-gradient-to-r from-blue-normal to-blue-dark h-full transition-all duration-100"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <span className="text-xs font-bold text-blue-normal">{uploadProgress}%</span>
                </div>
              )}
            </div>
          </div>

          {/* HISTORICAL REVIEW DIRECTORY PANEL */}
          <div className="lg:col-span-8">
            <div className="glass-card-premium rounded-3xl p-6 border relative overflow-hidden hover:translate-y-0!">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100/60">
                <div>
                  <h3 className="font-cabinet font-extrabold text-xl text-slate-800">
                    Audit Directory
                  </h3>
                  <p className="text-xs text-slate-400 font-satoshi mt-1 font-medium">
                    Your parsed resume files and corresponding detailed ATS scans.
                  </p>
                </div>
                <button
                  onClick={fetchResumes}
                  className="p-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-slate-400 hover:text-slate-600 cursor-pointer active:scale-95"
                  title="Reload Directory"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H18.2" />
                  </svg>
                </button>
              </div>

              {errorMsg && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-xs px-4 py-3 rounded-xl mb-6 text-center font-medium">
                  {errorMsg}
                </div>
              )}

              {/* LISTING LOADING */}
              {isLoadingResumes ? (
                <div className="py-20 flex flex-col items-center justify-center text-center">
                  <div className="w-10 h-10 border-4 border-slate-100 border-t-blue-normal rounded-full animate-spin mb-4"></div>
                  <p className="text-xs text-slate-400 font-cabinet font-semibold">Retrieving review directory...</p>
                </div>
              ) : resumes.length === 0 ? (
                /* EMPTY DIRECTORY */
                <div className="py-20 flex flex-col items-center justify-center text-center border-2 border-dashed border-slate-150 rounded-2xl bg-slate-50/20">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-150 text-slate-400 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0l-3.586-3.586a1 1 0 00-1.414 0L11 12M4 13l3.586-3.586a1 1 0 011.414 0L13 13m0 0l-2 2H9" />
                    </svg>
                  </div>
                  <h4 className="font-cabinet font-extrabold text-base text-slate-700 mb-1">No scanned resumes</h4>
                  <p className="text-xs text-slate-400 font-satoshi max-w-xs leading-normal">
                    You haven't uploaded any resumes yet. Drop a PDF file in the scan widget to get a detailed review!
                  </p>
                </div>
              ) : (
                /* LIST OF RESUMES */
                <div className="divide-y divide-slate-100/60 max-h-[500px] overflow-y-auto pr-1">
                  {resumes.map((item) => {
                    const isPending = !item.analysis || item.analysis.score === null;
                    const score = item.analysis?.score || 0;
                    
                    return (
                      <div
                        key={item.id}
                        onClick={() => { if (!isPending) { setSelectedResume(item); setIsModalOpen(true); } }}
                        className={`flex flex-col sm:flex-row sm:items-center justify-between py-4 px-3.5 -mx-3.5 rounded-2xl hover:bg-slate-50/70 transition-all duration-300 group cursor-pointer ${
                          isPending ? 'pointer-events-none opacity-85' : ''
                        }`}
                      >
                        <div className="flex items-center gap-4 min-w-0">
                          {/* File Icon */}
                          <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-150 flex items-center justify-center text-slate-400 group-hover:bg-blue-light/50 group-hover:border-blue-light group-hover:text-blue-normal transition-colors shrink-0">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-cabinet font-bold text-sm text-slate-800 truncate max-w-[280px] group-hover:text-blue-normal transition-colors" title={item.title}>
                              {item.title}
                            </h4>
                            <div className="flex items-center gap-3.5 mt-1">
                              <span className="text-[10px] text-slate-400 font-semibold">{formatDate(item.createdAt)}</span>
                              {item.analysis?.jobRole && (
                                <>
                                  <span className="text-[10px] text-slate-200 font-bold">•</span>
                                  <span className="text-[10px] font-bold text-slate-400 bg-slate-100/50 border border-slate-150/40 px-2 py-0.5 rounded-md truncate max-w-[160px]">
                                    {item.analysis.jobRole}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-6 mt-4 sm:mt-0">
                          {/* ATS Score Badge / Loader */}
                          {isPending ? (
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50/50 border border-amber-100/70 text-amber-500 rounded-lg">
                              <span className="w-2.5 h-2.5 border-2 border-t-amber-500 border-amber-200 rounded-full animate-spin"></span>
                              <span className="text-[10px] font-bold uppercase tracking-widest font-cabinet">Analyzing</span>
                            </div>
                          ) : (
                            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border text-[10px] font-bold uppercase tracking-wider font-cabinet ${getScoreColor(score)}`}>
                              <span>ATS Score:</span>
                              <span className="text-xs font-black">{score}</span>
                            </div>
                          )}

                          {/* Delete Action */}
                          <button
                            onClick={(e) => handleDeleteResume(item.id, e)}
                            className="p-2 text-slate-350 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 cursor-pointer active:scale-95 group-hover:opacity-100"
                            title="Delete Scanned Resume"
                          >
                            <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

        </div>

      </main>

      {/* FOOTER */}
      <footer className="bg-white/80 border-t border-slate-100 py-6 px-6 text-center text-xs text-slate-400 font-semibold z-10">
        <div className="max-w-7xl mx-auto">
          © {new Date().getFullYear()} CVShield. Secure Real-Time ATS Auditing Platform. All rights reserved.
        </div>
      </footer>

      {/* DETAIL MODAL REPORT DRAWER */}
      <AnimatePresence>
        {isModalOpen && selectedResume && selectedResume.analysis && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          >
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 120 }}
              className="bg-white rounded-3xl w-full max-w-2xl border border-slate-200 overflow-hidden shadow-2xl relative"
            >
              {/* Colored Gradient Top Strip */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-normal to-blue-dark"></div>

              {/* Modal Header */}
              <div className="px-6 pt-8 pb-5 border-b border-slate-100 flex items-start justify-between">
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-md">
                    Parsed Analysis Complete
                  </span>
                  <h3 className="font-cabinet font-extrabold text-xl text-slate-800 mt-2.5 truncate max-w-[420px]" title={selectedResume.title}>
                    {selectedResume.title}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-semibold mt-1">
                    Audited: {formatDate(selectedResume.createdAt)}
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-1.5 rounded-xl border border-slate-200 text-slate-450 hover:bg-slate-50 transition-colors cursor-pointer active:scale-90 shrink-0"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Content Scrollable Area */}
              <div className="px-6 py-6 max-h-[60vh] overflow-y-auto space-y-6">
                
                {/* Gauge Score and Core Description */}
                <div className="flex flex-col sm:flex-row items-center gap-6 p-5 bg-slate-50 border border-slate-100 rounded-2xl">
                  {/* Circle Score Gauge */}
                  <div className="relative w-24 h-24 flex items-center justify-center bg-white rounded-full border border-slate-100 shadow-xs shrink-0">
                    <svg className="w-20 h-20 transform -rotate-90">
                      <circle cx="40" cy="40" r="32" stroke="#f1f5f9" strokeWidth="5.2" fill="transparent" />
                      <circle
                        cx="40"
                        cy="40"
                        r="32"
                        stroke="#79a4ff"
                        strokeWidth="5.2"
                        fill="transparent"
                        strokeDasharray={201}
                        strokeDashoffset={201 - (201 * (selectedResume.analysis.score || 0)) / 100}
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center">
                      <span className="text-2xl font-cabinet font-extrabold text-slate-800 leading-none">
                        {selectedResume.analysis.score}
                      </span>
                      <span className="text-[7px] font-cabinet tracking-widest text-slate-400 font-bold uppercase mt-0.5">ATS Score</span>
                    </div>
                  </div>

                  {/* Feedback summary */}
                  <div className="text-center sm:text-left">
                    <h4 className="font-cabinet font-bold text-sm text-slate-800 mb-1.5 uppercase tracking-wide">
                      {selectedResume.analysis.score && selectedResume.analysis.score >= 80 ? 'Excellent Match' : 'Review Required'}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed font-satoshi font-medium">
                      {selectedResume.analysis.feedback || 'Overall feedback is unavailable.'}
                    </p>
                  </div>
                </div>

                {/* Target Identified Role */}
                {selectedResume.analysis.jobRole && (
                  <div className="flex items-center gap-3 px-4 py-3 bg-indigo-50/40 border border-indigo-100/40 rounded-xl">
                    <div className="text-indigo-500 shrink-0">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block font-cabinet">Target Job Profile Fit</span>
                      <span className="text-sm font-cabinet font-bold text-indigo-700">{selectedResume.analysis.jobRole}</span>
                    </div>
                  </div>
                )}

                {/* Detailed Analysis Tabs */}
                <div className="space-y-4">
                  
                  {/* Strengths Card */}
                  {selectedResume.analysis.strengths && (
                    <div className="flex items-start gap-3.5 p-4 bg-emerald-50/50 border border-emerald-100/75 rounded-2xl">
                      <div className="w-7 h-7 rounded-lg bg-emerald-100/60 border border-emerald-200/50 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
                        <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                        </svg>
                      </div>
                      <div>
                        <h5 className="font-cabinet font-bold text-xs text-slate-800 uppercase tracking-wide">Key Strengths</h5>
                        <p className="text-xs text-slate-600 leading-relaxed font-satoshi mt-1.5 font-medium">
                          {selectedResume.analysis.strengths}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Weaknesses Card */}
                  {selectedResume.analysis.weaknesses && (
                    <div className="flex items-start gap-3.5 p-4 bg-amber-50/40 border border-amber-100/70 rounded-2xl">
                      <div className="w-7 h-7 rounded-lg bg-amber-100/60 border border-amber-200/50 flex items-center justify-center text-amber-500 shrink-0 mt-0.5">
                        <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <div>
                        <h5 className="font-cabinet font-bold text-xs text-slate-800 uppercase tracking-wide">Critical Layout & Text Failures</h5>
                        <p className="text-xs text-slate-600 leading-relaxed font-satoshi mt-1.5 font-medium">
                          {selectedResume.analysis.weaknesses}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Actionable Suggestions Card */}
                  {selectedResume.analysis.suggestions && (
                    <div className="flex items-start gap-3.5 p-4 bg-blue-light/40 border border-blue-light-active/40 rounded-2xl">
                      <div className="w-7 h-7 rounded-lg bg-blue-light-active/50 border border-blue-light-active flex items-center justify-center text-blue-normal shrink-0 mt-0.5">
                        <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <h5 className="font-cabinet font-bold text-xs text-slate-800 uppercase tracking-wide">Actionable Optimizations</h5>
                        <p className="text-xs text-slate-600 leading-relaxed font-satoshi mt-1.5 font-medium">
                          {selectedResume.analysis.suggestions}
                        </p>
                      </div>
                    </div>
                  )}

                </div>

              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex justify-end">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="btn-designer px-6 py-2.5 rounded-xl text-xs font-cabinet font-bold"
                >
                  Close Audit Report
                </button>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
