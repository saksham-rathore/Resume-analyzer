import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function Dashboard() {
  return (
    <div className="w-full max-w-5xl mx-auto mt-16 rounded-2xl border border-slate-200 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden text-left">
      <div className="flex flex-col md:flex-row min-h-[500px]">
        
        {/* Sidebar */}
        <aside className="w-full md:w-56 border-b md:border-b-0 md:border-r border-slate-200 bg-slate-50/50 p-5 flex flex-col gap-1.5 shrink-0">
          <div className="px-3 py-2 mb-4">
            <span className="font-sans font-bold text-xs uppercase tracking-wider text-slate-400">
              Workspace
            </span>
          </div>
          <nav className="flex flex-col gap-1">
            <a className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-slate-100 text-slate-900 font-semibold text-sm cursor-pointer transition-all">
              <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
              </svg>
              Dashboard
            </a>
            <a className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50 text-sm font-medium cursor-pointer transition-all">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Resumes
            </a>
            <a className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50 text-sm font-medium cursor-pointer transition-all">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
              Job Matching
            </a>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 sm:p-8 flex flex-col gap-6 bg-slate-50/30">
          
          {/* Header Title inside Dashboard Mock */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-800 tracking-tight">System Analytics</h2>
              <p className="text-xs text-slate-400 mt-1">Real-time resume pipeline overview</p>
            </div>
            <Badge className="bg-purple-50 text-purple-700 border border-purple-200/50 hover:bg-purple-50 font-semibold px-2.5 py-1">
              Active Session
            </Badge>
          </div>

          {/* Metric cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.01)] bg-white">
              <CardContent className="pt-4">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Total Resumes</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">124</p>
              </CardContent>
            </Card>

            <Card className="border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.01)] bg-white">
              <CardContent className="pt-4">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Avg ATS Score</p>
                <p className="text-2xl font-bold text-slate-800 mt-1">82%</p>
              </CardContent>
            </Card>

            <Card className="border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.01)] bg-white">
              <CardContent className="pt-4">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Optimized</p>
                <p className="text-2xl font-bold text-emerald-600 mt-1">89</p>
              </CardContent>
            </Card>

            <Card className="border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.01)] bg-white">
              <CardContent className="pt-4">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Need Audits</p>
                <p className="text-2xl font-bold text-amber-500 mt-1">35</p>
              </CardContent>
            </Card>
          </div>

          {/* Skill match + candidate list */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            
            {/* Recent Candidates Card */}
            <Card className="border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.01)] bg-white">
              <CardHeader className="pb-3 border-b border-slate-100">
                <CardTitle className="text-sm font-bold text-slate-800">Recent Resumes Audited</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="flex flex-col gap-3.5">
                  
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-purple-55 bg-purple-50 text-purple-600 flex items-center justify-center font-bold shrink-0">
                        PDF
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-800 truncate max-w-[160px]">Resume_SoftwareEngineeer.pdf</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">2 mins ago • Software Engineer</p>
                      </div>
                    </div>
                    <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-100/50 hover:bg-emerald-50 text-[10px] font-bold">
                      94% Match
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-bold shrink-0">
                        PDF
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-800 truncate max-w-[160px]">CV_ProductManager_2026.pdf</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">1 hour ago • Product Manager</p>
                      </div>
                    </div>
                    <Badge className="bg-amber-50 text-amber-700 border border-amber-100/50 hover:bg-amber-50 text-[10px] font-bold">
                      78% Match
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-bold shrink-0">
                        DOCX
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-800 truncate max-w-[160px]">Data_Analyst_Portfolio.docx</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">5 hours ago • Data Analyst</p>
                      </div>
                    </div>
                    <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-100/50 hover:bg-emerald-50 text-[10px] font-bold">
                      85% Match
                    </Badge>
                  </div>

                </div>
              </CardContent>
            </Card>

            {/* Skill Match Card */}
            <Card className="border border-slate-200/60 shadow-[0_2px_8px_rgba(0,0,0,0.01)] bg-white">
              <CardHeader className="pb-3 border-b border-slate-100">
                <CardTitle className="text-sm font-bold text-slate-800">Keyword Density & Skill Match</CardTitle>
              </CardHeader>
              <CardContent className="pt-5 flex flex-col gap-4">
                
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700">React / Next.js</span>
                    <span className="font-mono font-bold text-slate-500">95%</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress value={95} className="flex-1 h-1.5 bg-slate-100 [&>[data-slot=progress-indicator]]:bg-purple-600" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700">TypeScript & Node.js</span>
                    <span className="font-mono font-bold text-slate-500">88%</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress value={88} className="flex-1 h-1.5 bg-slate-100 [&>[data-slot=progress-indicator]]:bg-purple-600" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700">System Design & APIs</span>
                    <span className="font-mono font-bold text-slate-500">72%</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress value={72} className="flex-1 h-1.5 bg-slate-100 [&>[data-slot=progress-indicator]]:bg-purple-600" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-700">AWS & Docker</span>
                    <span className="font-mono font-bold text-slate-500">55%</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress value={55} className="flex-1 h-1.5 bg-slate-100 [&>[data-slot=progress-indicator]]:bg-purple-600" />
                  </div>
                </div>

              </CardContent>
            </Card>

          </div>
        </main>
      </div>
    </div>
  )
}