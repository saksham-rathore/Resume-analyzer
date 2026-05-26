'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Simulator() {
  const [simulatorFlaws, setSimulatorFlaws] = useState({
    genericName: false,
    noMetrics: false,
    multiColumn: false,
    missingKeywords: false,
    unprofessionalEmail: false,
  });

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

  const toggleFlaw = (key: keyof typeof simulatorFlaws) => {
    setSimulatorFlaws((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const getRatingLabel = (score: number) => {
    if (score >= 80) return 'Highly Optimised';
    if (score >= 60) return 'Needs Fixes';
    return 'Blocked by ATS';
  };

  return (
    <section id="simulator" className="py-12 px-6 landing-content-width mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-light border border-blue-light-active text-blue-dark text-xs font-semibold uppercase mb-4">
          Interactive Tool
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tighter leading-[1.1] mb-4 text-slate-800">
          <span className="font-cabinet font-normal text-slate-800">How Much Do Small Errors </span>
          <span className="font-cormorant italic font-normal text-blue-dark tracking-wide pr-2">Cost You?</span>
        </h2>
        <p className="text-slate-500 text-base md:text-lg">
          Toggle the most common structural and content mistakes on a <span className="italic-accent text-slate-700">typical resume</span> below. See in real-time how modern <span className="italic-accent text-slate-700">ATS scanning bots</span> react and <span className="italic-accent text-slate-700">downgrade your score</span>.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="font-cabinet font-bold text-xl text-slate-800 mb-5 flex items-center gap-2.5">
              <svg className="w-5.5 h-5.5 text-blue-normal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              Select Common Resume Flaws
            </h3>

            <motion.button
              onClick={() => toggleFlaw('genericName')}
              whileHover={{ scale: 1.01, y: -2 }}
              whileTap={{ scale: 0.99 }}
              className={`w-full text-left p-4.5 rounded-2xl border transition-all duration-300 flex items-start gap-4 cursor-pointer focus:outline-none ${simulatorFlaws.genericName
                ? 'border-blue-normal bg-blue-light/30'
                : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
            >
              <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all ${simulatorFlaws.genericName
                ? 'border-blue-normal bg-blue-normal text-white'
                : 'border-slate-300 bg-white'
                }`}>
                <AnimatePresence initial={false}>
                  {simulatorFlaws.genericName && (
                    <motion.svg
                      initial={{ scale: 0.3, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.3, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </motion.svg>
                  )}
                </AnimatePresence>
              </div>
              <div>
                <h4 className="font-cabinet font-bold text-sm text-slate-800 mb-0.5">Generic File Naming</h4>
                <p className="text-xs text-slate-500">Uploading files named like `Resume_2026_Final_v3.pdf` instead of incorporating your name and job role.</p>
              </div>
              <span className="ml-auto text-xs font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-md shrink-0 border border-red-100">
                -8 Score
              </span>
            </motion.button>

            <motion.button
              onClick={() => toggleFlaw('noMetrics')}
              whileHover={{ scale: 1.01, y: -2 }}
              whileTap={{ scale: 0.99 }}
              className={`w-full text-left p-4.5 rounded-2xl border transition-all duration-300 flex items-start gap-4 cursor-pointer focus:outline-none ${simulatorFlaws.noMetrics
                ? 'border-blue-normal bg-blue-light/30'
                : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
            >
              <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all ${simulatorFlaws.noMetrics
                ? 'border-blue-normal bg-blue-normal text-white'
                : 'border-slate-300 bg-white'
                }`}>
                <AnimatePresence initial={false}>
                  {simulatorFlaws.noMetrics && (
                    <motion.svg
                      initial={{ scale: 0.3, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.3, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </motion.svg>
                  )}
                </AnimatePresence>
              </div>
              <div>
                <h4 className="font-cabinet font-bold text-sm text-slate-800 mb-0.5">No Quantitative Achievements</h4>
                <p className="text-xs text-slate-500">Describing general tasks instead of impact (e.g. lack of percentages, dollars, or performance numbers).</p>
              </div>
              <span className="ml-auto text-xs font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-md shrink-0 border border-red-100">
                -15 Score
              </span>
            </motion.button>

            <motion.button
              onClick={() => toggleFlaw('multiColumn')}
              whileHover={{ scale: 1.01, y: -2 }}
              whileTap={{ scale: 0.99 }}
              className={`w-full text-left p-4.5 rounded-2xl border transition-all duration-300 flex items-start gap-4 cursor-pointer focus:outline-none ${simulatorFlaws.multiColumn
                ? 'border-blue-normal bg-blue-light/30'
                : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
            >
              <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all ${simulatorFlaws.multiColumn
                ? 'border-blue-normal bg-blue-normal text-white'
                : 'border-slate-300 bg-white'
                }`}>
                <AnimatePresence initial={false}>
                  {simulatorFlaws.multiColumn && (
                    <motion.svg
                      initial={{ scale: 0.3, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.3, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </motion.svg>
                  )}
                </AnimatePresence>
              </div>
              <div>
                <h4 className="font-cabinet font-bold text-sm text-slate-800 mb-0.5">Complex Multi-Column Layout</h4>
                <p className="text-xs text-slate-500">Using graphic designer resume layouts, circular charts, columns, or tables that scramble traditional parsers.</p>
              </div>
              <span className="ml-auto text-xs font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-md shrink-0 border border-red-100">
                -12 Score
              </span>
            </motion.button>

            <motion.button
              onClick={() => toggleFlaw('missingKeywords')}
              whileHover={{ scale: 1.01, y: -2 }}
              whileTap={{ scale: 0.99 }}
              className={`w-full text-left p-4.5 rounded-2xl border transition-all duration-300 flex items-start gap-4 cursor-pointer focus:outline-none ${simulatorFlaws.missingKeywords
                ? 'border-blue-normal bg-blue-light/30'
                : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
            >
              <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all ${simulatorFlaws.missingKeywords
                ? 'border-blue-normal bg-blue-normal text-white'
                : 'border-slate-300 bg-white'
                }`}>
                <AnimatePresence initial={false}>
                  {simulatorFlaws.missingKeywords && (
                    <motion.svg
                      initial={{ scale: 0.3, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.3, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </motion.svg>
                  )}
                </AnimatePresence>
              </div>
              <div>
                <h4 className="font-cabinet font-bold text-sm text-slate-800 mb-0.5">Lack of Target Job Keywords</h4>
                <p className="text-xs text-slate-500">Failing to include specific keywords found directly in target job descriptions (e.g. Kubernetes, React).</p>
              </div>
              <span className="ml-auto text-xs font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-md shrink-0 border border-red-100">
                -18 Score
              </span>
            </motion.button>

            <motion.button
              onClick={() => toggleFlaw('unprofessionalEmail')}
              whileHover={{ scale: 1.01, y: -2 }}
              whileTap={{ scale: 0.99 }}
              className={`w-full text-left p-4.5 rounded-2xl border transition-all duration-300 flex items-start gap-4 cursor-pointer focus:outline-none ${simulatorFlaws.unprofessionalEmail
                ? 'border-blue-normal bg-blue-light/30'
                : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
            >
              <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all ${simulatorFlaws.unprofessionalEmail
                ? 'border-blue-normal bg-blue-normal text-white'
                : 'border-slate-300 bg-white'
                }`}>
                <AnimatePresence initial={false}>
                  {simulatorFlaws.unprofessionalEmail && (
                    <motion.svg
                      initial={{ scale: 0.3, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.3, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </motion.svg>
                  )}
                </AnimatePresence>
              </div>
              <div>
                <h4 className="font-cabinet font-bold text-sm text-slate-800 mb-0.5">Missing Key Contact Channels</h4>
                <p className="text-xs text-slate-500">Omitting clickable links to GitHub or LinkedIn, or utilizing old unprofessional email domains.</p>
              </div>
              <span className="ml-auto text-xs font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-md shrink-0 border border-red-100">
                -7 Score
              </span>
            </motion.button>
          </div>
        </div>

        <div className="lg:col-span-5 flex">
          <div className="glass-card-premium w-full rounded-3xl p-8 border flex flex-col justify-between shadow-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] -z-10 rounded-3xl"></div>

            <div>
              <h3 className="font-cabinet font-extrabold text-lg text-slate-800 mb-6 text-center">
                ATS Audit Simulator
              </h3>

              <div className="relative w-44 h-44 mx-auto flex items-center justify-center bg-white rounded-full border border-slate-100 shadow-md mb-8">
                <svg className="w-38 h-38 transform -rotate-90">
                  <circle cx="76" cy="76" r="64" stroke="#f1f5f9" strokeWidth="8" fill="transparent" />
                  <motion.circle
                    cx="76"
                    cy="76"
                    r="64"
                    stroke="#79a4ff"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={401.9}
                    animate={{ strokeDashoffset: 401.9 - (401.9 * currentScore) / 100 }}
                    transition={{ type: 'spring', damping: 22, stiffness: 75 }}
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center">
                  <motion.span
                    key={currentScore}
                    initial={{ scale: 0.85, opacity: 0.7 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-5xl font-cabinet font-black text-slate-800"
                  >
                    {currentScore}
                  </motion.span>
                  <span className="text-[10px] font-bold text-white tracking-widest mt-1 bg-blue-normal px-2.5 py-0.5 rounded-full shadow-sm shadow-blue-normal/20">
                    SCORE
                  </span>
                </div>
              </div>

              <div className="text-center mb-6 h-6 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={getRatingLabel(currentScore)}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className={`inline-flex px-3.5 py-1 rounded-full text-xs font-bold border transition-all duration-300 ${
                      currentScore >= 80
                        ? 'text-emerald-700 bg-emerald-50 border-emerald-100'
                        : currentScore >= 60
                        ? 'text-amber-700 bg-amber-50 border-amber-100'
                        : 'text-red-700 bg-red-50 border-red-100'
                    }`}
                  >
                    {getRatingLabel(currentScore)}
                  </motion.span>
                </AnimatePresence>
              </div>

              <div className="border-t border-slate-100 pt-5 space-y-4 text-left">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Live AI Recommendations
                </h4>

                <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1 overflow-x-hidden">
                  <AnimatePresence initial={false} mode="popLayout">
                    {Object.values(simulatorFlaws).every(v => !v) ? (
                      <motion.div
                        key="perfect-score-reco"
                        initial={{ opacity: 0, height: 0, y: 10 }}
                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -10 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                        className="flex gap-2.5 text-xs text-slate-500 items-start bg-slate-50 p-3 rounded-xl border border-slate-100"
                      >
                        <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Perfect setup! Make sure to maintain quantitative numbers in all bullet descriptions.</span>
                      </motion.div>
                    ) : (
                      <>
                        {simulatorFlaws.genericName && (
                          <motion.div
                            key="genericName"
                            initial={{ opacity: 0, height: 0, scale: 0.95 }}
                            animate={{ opacity: 1, height: 'auto', scale: 1 }}
                            exit={{ opacity: 0, height: 0, scale: 0.95 }}
                            transition={{ type: 'spring', stiffness: 220, damping: 22 }}
                            className="flex gap-2.5 text-xs text-slate-700 items-start bg-slate-50 p-3 rounded-xl border border-slate-100 overflow-hidden"
                          >
                            <span className="text-red-500 font-extrabold font-cabinet text-sm select-none">👉</span>
                            <span>Save files as `FirstName_LastName_Role.pdf`. Parsers look for structural name mappings immediately.</span>
                          </motion.div>
                        )}
                        {simulatorFlaws.noMetrics && (
                          <motion.div
                            key="noMetrics"
                            initial={{ opacity: 0, height: 0, scale: 0.95 }}
                            animate={{ opacity: 1, height: 'auto', scale: 1 }}
                            exit={{ opacity: 0, height: 0, scale: 0.95 }}
                            transition={{ type: 'spring', stiffness: 220, damping: 22 }}
                            className="flex gap-2.5 text-xs text-slate-700 items-start bg-slate-50 p-3 rounded-xl border border-slate-100 overflow-hidden"
                          >
                            <span className="text-red-500 font-extrabold font-cabinet text-sm select-none">👉</span>
                            <span>Replace &quot;Responsible for website sales&quot; with &quot;Led a team to scale monthly ecommerce sales by 35%, generating an extra $40K ARR&quot;.</span>
                          </motion.div>
                        )}
                        {simulatorFlaws.multiColumn && (
                          <motion.div
                            key="multiColumn"
                            initial={{ opacity: 0, height: 0, scale: 0.95 }}
                            animate={{ opacity: 1, height: 'auto', scale: 1 }}
                            exit={{ opacity: 0, height: 0, scale: 0.95 }}
                            transition={{ type: 'spring', stiffness: 220, damping: 22 }}
                            className="flex gap-2.5 text-xs text-slate-700 items-start bg-slate-50 p-3 rounded-xl border border-slate-100 overflow-hidden"
                          >
                            <span className="text-red-500 font-extrabold font-cabinet text-sm select-none">👉</span>
                            <span>Use standard single-column chronological formats. Tabular frameworks isolate details into unreadable segments for parsers.</span>
                          </motion.div>
                        )}
                        {simulatorFlaws.missingKeywords && (
                          <motion.div
                            key="missingKeywords"
                            initial={{ opacity: 0, height: 0, scale: 0.95 }}
                            animate={{ opacity: 1, height: 'auto', scale: 1 }}
                            exit={{ opacity: 0, height: 0, scale: 0.95 }}
                            transition={{ type: 'spring', stiffness: 220, damping: 22 }}
                            className="flex gap-2.5 text-xs text-slate-700 items-start bg-slate-50 p-3 rounded-xl border border-slate-100 overflow-hidden"
                          >
                            <span className="text-red-500 font-extrabold font-cabinet text-sm select-none">👉</span>
                            <span>Target specific technologies mentioned in the listing (e.g. AWS, Next.js). System searches look for strict acronym exact-matches.</span>
                          </motion.div>
                        )}
                        {simulatorFlaws.unprofessionalEmail && (
                          <motion.div
                            key="unprofessionalEmail"
                            initial={{ opacity: 0, height: 0, scale: 0.95 }}
                            animate={{ opacity: 1, height: 'auto', scale: 1 }}
                            exit={{ opacity: 0, height: 0, scale: 0.95 }}
                            transition={{ type: 'spring', stiffness: 220, damping: 22 }}
                            className="flex gap-2.5 text-xs text-slate-700 items-start bg-slate-50 p-3 rounded-xl border border-slate-100 overflow-hidden"
                          >
                            <span className="text-red-500 font-extrabold font-cabinet text-sm select-none">👉</span>
                            <span>Always place clickable, hyperlinked links to your Portfolio, LinkedIn, or GitHub at the very header of the page.</span>
                          </motion.div>
                        )}
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 mt-6 z-10">
              <a href="/signup" className="btn-designer w-full py-3.5 rounded-xl text-sm font-semibold justify-center shadow-md cursor-pointer">
                Claim Your Optimized Structure Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
