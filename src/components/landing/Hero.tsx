import React from 'react';

export default function Hero() {
  return (
    <div className="w-full max-w-[1100px] mx-auto mt-20 transition-all duration-500">

      <div className="w-full rounded-[2.5rem] bg-[oklch(90.8%_0.008_264.534)] p-3 md:p-4.5 shadow-2xl shadow-slate-300/30">


        <div className="w-full h-[540px] flex border border-slate-900/20 rounded-[1.5rem] overflow-hidden bg-white shadow-inner">

          <div className="w-[210px] flex-shrink-0 bg-slate-50/50 border-r border-slate-200/60 py-8 flex flex-col justify-between">
            <div>
              <div className="px-7 pb-6 border-b border-slate-100 mb-6">
                <p className="text-sm font-bold tracking-tight bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 bg-clip-text text-transparent">ResumeIQ</p>
                <span className="text-[11px] font-medium text-slate-400">ATS Simulator</span>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2.5 px-7 py-3.5 text-xs text-slate-900 font-semibold bg-white border-r-2 border-slate-900 cursor-pointer transition-all">
                  <svg className="w-4 h-4 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                    <rect x="3" y="3" width="7" height="9" rx="1" />
                    <rect x="14" y="3" width="7" height="5" rx="1" />
                    <rect x="3" y="16" width="7" height="5" rx="1" />
                    <rect x="14" y="12" width="7" height="9" rx="1" />
                  </svg>
                  Dashboard
                </div>

                <div className="flex items-center gap-2.5 px-7 py-3.5 text-xs text-slate-400 hover:bg-white hover:text-slate-900 hover:translate-x-0.5 transition-all duration-200 cursor-pointer">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Resume
                </div>

                <div className="flex items-center gap-2.5 px-7 py-3.5 text-xs text-slate-400 hover:bg-white hover:text-slate-900 hover:translate-x-0.5 transition-all duration-200 cursor-pointer">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="6" />
                    <circle cx="12" cy="12" r="2" />
                  </svg>
                  Job Match
                </div>

                <div className="flex items-center gap-2.5 px-7 py-3.5 text-xs text-slate-400 hover:bg-white hover:text-slate-900 hover:translate-x-0.5 transition-all duration-200 cursor-pointer">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
                  </svg>
                  Keywords
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5 px-7 py-3.5 text-xs text-slate-400 hover:bg-white hover:text-slate-900 hover:translate-x-0.5 transition-all duration-200 cursor-pointer mt-auto">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              Settings
            </div>
          </div>

          <div className="flex-1 flex flex-col min-w-0 bg-white">
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold tracking-wider uppercase bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 bg-clip-text text-transparent">ATS Analysis Report</span>
              <button className="flex items-center gap-2 text-xs px-4 py-2 border border-slate-200 rounded-full text-slate-600 bg-slate-50 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-300 cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Upload Resume
              </button>
            </div>

            <div className="flex-1 p-8 md:p-10 flex flex-col gap-10 overflow-hidden">

              <div className="grid grid-cols-4 gap-5">
                {[
                  { label: 'ATS Score', val: '78', badge: 'Good', badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
                  { label: 'Keyword Match', val: '63%', badge: 'Average', badgeColor: 'bg-amber-50 text-amber-700 border-amber-100' },
                  { label: 'Readability', val: '91', badge: 'Excellent', badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
                  { label: 'Job Fit', val: '71%', badge: 'Improve', badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-100' },
                ].map((card, idx) => (
                  <div key={idx} className="bg-slate-50/70 border border-slate-200/50 rounded-xl p-4 md:p-5 transition-all duration-300 hover:bg-white hover:border-slate-200 hover:shadow-lg hover:shadow-slate-100/50 group cursor-pointer">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">{card.label}</div>
                    <div className="text-3xl font-[700] tracking-tight bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 bg-clip-text text-transparent leading-none mt-3 transition-all duration-300 group-hover:scale-105 origin-left">{card.val}</div>
                    <span className={`inline-block text-[10px] font-bold px-2 py-0.5 border rounded-full mt-3 ${card.badgeColor}`}>{card.badge}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-6 flex-1 min-h-0">
                <div className="bg-white border border-slate-100 rounded-xl p-6 flex flex-col justify-between min-h-0 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-slate-200/85 transition-all duration-300">
                  <div>
                    <div className="text-[12px] font-bold text-slate-900">ATS Score</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Simulated parse</div>
                  </div>
                  <div className="flex justify-center items-center flex-1 py-3">
                    <svg width="115" height="115" viewBox="0 0 100 100" className="transition-transform duration-500 hover:scale-105 cursor-pointer">
                      <circle cx="50" cy="50" r="42" fill="none" stroke="#f8fafc" strokeWidth="8" />
                      <circle cx="50" cy="50" r="42" fill="none" stroke="oklch(0.278 0.033 256.848)" strokeWidth="8.5"
                        strokeDasharray="263.89" strokeDashoffset="58.05" strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                        transform="rotate(-90 50 50)" />
                      <text x="50" y="47" textAnchor="middle" fontSize="23" fontWeight="900" className="fill-slate-900">78</text>
                      <text x="50" y="61" textAnchor="middle" fontSize="11" fontWeight="600" className="fill-slate-400">/100</text>
                    </svg>
                  </div>
                </div>

                <div className="bg-white border border-slate-100 rounded-xl p-6 flex flex-col justify-between min-h-0 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-slate-200/85 transition-all duration-300">
                  <div>
                    <div className="text-[12px] font-bold text-slate-900">Keywords</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Top skills match</div>
                  </div>
                  <div className="flex flex-col gap-3 flex-1 justify-center mt-3">
                    {[
                      { name: 'React', val: '95%', color: 'bg-slate-900' },
                      { name: 'TypeScript', val: '85%', color: 'bg-slate-900' },
                      { name: 'Node.js', val: '70%', color: 'bg-slate-900' },
                      { name: 'CI/CD', val: '40%', color: 'bg-slate-200' },
                      { name: 'GraphQL', val: '20%', color: 'bg-slate-200' },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3.5 group cursor-pointer">
                        <span className="text-[11px] font-semibold text-slate-600 w-16 flex-shrink-0 truncate group-hover:text-slate-900 transition-colors">{item.name}</span>
                        <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full transition-all duration-500 group-hover:brightness-110 ${item.color}`} style={{ width: item.val }} />
                        </div>
                        <span className="text-[11px] font-bold text-slate-400 w-8 text-right group-hover:text-slate-600 transition-colors">{item.val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white border border-slate-100 rounded-xl p-6 flex flex-col justify-between min-h-0 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.01)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-slate-200/85 transition-all duration-300">
                  <div>
                    <div className="text-[12px] font-bold text-slate-900">Sections</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">ATS detection</div>
                  </div>
                  <div className="flex flex-col gap-2.5 flex-1 justify-center mt-3">
                    {[
                      { name: 'Contact Info', status: '✓', color: 'text-emerald-600 font-bold', dot: 'bg-emerald-500' },
                      { name: 'Experience', status: '✓', color: 'text-emerald-600 font-bold', dot: 'bg-emerald-500' },
                      { name: 'Education', status: '✓', color: 'text-emerald-600 font-bold', dot: 'bg-emerald-500' },
                      { name: 'Skills', status: '✓', color: 'text-emerald-600 font-bold', dot: 'bg-emerald-500' },
                      { name: 'Summary', status: '⚠', color: 'text-amber-600 font-bold', dot: 'bg-amber-500' },
                      { name: 'Certifications', status: '✗', color: 'text-rose-600 font-bold', dot: 'bg-rose-500' },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3.5 group cursor-pointer">
                        <span className={`w-2 h-2 rounded-full transition-transform duration-300 group-hover:scale-125 ${item.dot}`} />
                        <span className="text-[11px] font-semibold text-slate-600 flex-1 truncate group-hover:text-slate-900 transition-colors">{item.name}</span>
                        <span className={`text-[11px] ${item.color}`}>{item.status}</span>
                      </div>
                    ))}
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