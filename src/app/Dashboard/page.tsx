"use client";
import React, { useEffect, useState } from 'react';
import {useSession} from 'next-auth/react';
import { 
  GraduationCap, 
  Briefcase, 
  Code, 
  Languages, 
  CheckCircle2, 
  AlertTriangle, 
  Cloud, 
  Monitor, 
  Cpu, 
  Sparkles,
  Award,
  UploadCloud,
  FileText,
  Loader2
} from 'lucide-react';

const DashboardComponent = () =>{
  const [step, setStep] = useState<'analyzing'|'upload'|'results'>('upload')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [jobrole, setjobrole] = useState<string>("")
  const {data: session} = useSession();
  const user = session?.user?.id as string;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>){
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  };

  const handleAnalyze = () => {
    if (!selectedFile) return; 
    
    
  }
}

  if (step === 'upload') {
    return (
      <div className="min-h-screen w-full bg-zinc-50 text-zinc-900 font-sans flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-2xl flex flex-col items-center">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-zinc-900 mb-3">Resume Analyzer</h1>
            <p className="text-zinc-500 max-w-md mx-auto">Upload your resume to get instant feedback on your ATS score, skills match, and job suggestions.</p>
          </div>
          
          <div className="w-full bg-white border-2 border-dashed border-zinc-300 hover:border-blue-500 transition-colors rounded-3xl p-12 flex flex-col items-center justify-center text-center group cursor-pointer relative shadow-sm">
            <input 
              type="file" 
              accept=".pdf,.doc,.docx"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              onChange={handleFileChange}
            />
            
            <div className="w-20 h-20 rounded-full bg-zinc-100 group-hover:bg-blue-50 flex items-center justify-center mb-6 transition-colors">
              {selectedFile ? (
                <FileText className="w-10 h-10 text-blue-500" />
              ) : (
                <UploadCloud className="w-10 h-10 text-zinc-400 group-hover:text-blue-500 transition-colors" />
              )}
            </div>
            
            {selectedFile ? (
              <>
                <h3 className="text-xl font-bold text-zinc-900 mb-2">{selectedFile.name}</h3>
                <p className="text-zinc-500 mb-6">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                <button 
                  onClick={handleAnalyze}
                  className="relative z-20 px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-full shadow-lg shadow-blue-500/30 transition-all transform hover:scale-105 active:scale-95"
                >
                  Analyze Resume
                </button>
              </>
            ) : (
              <>
                <h3 className="text-xl font-bold text-zinc-900 mb-2">Drag & drop your resume here</h3>
                <p className="text-zinc-500 mb-6">Supported formats: PDF, DOCX (Max 5MB)</p>
                <button className="px-6 py-2.5 bg-zinc-100 text-zinc-700 hover:bg-zinc-200 transition-colors font-medium rounded-full pointer-events-none">
                  Browse Files
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (step === 'analyzing') {
    return (
      <div className="min-h-screen w-full bg-zinc-50 text-zinc-900 font-sans flex flex-col items-center justify-center p-6">
        <div className="flex flex-col items-center">
          <Loader2 className="w-16 h-16 text-blue-500 animate-spin mb-6" />
          <h2 className="text-2xl font-bold text-zinc-900 mb-2">Analyzing your resume...</h2>
          <p className="text-zinc-500">Extracting skills, evaluating formatting, and matching jobs.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="md:h-screen w-full bg-zinc-50 text-zinc-900 font-sans antialiased p-4 md:p-6 flex flex-col md:overflow-hidden select-none">
      
      {/* Top Header */}
      <div className="flex justify-between items-center mb-5 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
            <FileText className="w-4 h-4 text-blue-600" />
          </div>
          <h1 className="text-xl font-bold text-zinc-900">Results for {selectedFile?.name || 'Resume'}</h1>
        </div>
        <button 
          onClick={() => { setStep('upload'); setSelectedFile(null); }}
          className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors px-4 py-2 bg-white border border-zinc-200 rounded-lg shadow-sm hover:shadow"
        >
          Analyze Another
        </button>
      </div>

      <div className="flex flex-col gap-5 flex-1 min-h-0">
        
        {/* Top Section: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 flex-1 min-h-0">
          
          {/* ================= COLUMN 1 ================= */}
          <div className="flex flex-col gap-4 h-full min-h-0">
            
            {/* Card 1: Overall Resume Score */}
            <div className="bg-white border border-zinc-200 rounded-2xl p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-5 h-5 text-zinc-400" />
                  <h2 className="text-sm font-bold text-zinc-800 tracking-wide">Overall resume score</h2>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center gap-6 xl:gap-8">
                  {/* Circular Progress Ring */}
                  <div className="relative flex items-center justify-center w-28 h-28 flex-shrink-0">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" className="stroke-zinc-100" strokeWidth="8" fill="transparent" />
                      <circle cx="50" cy="50" r="40" className="stroke-blue-500" strokeWidth="8" fill="transparent" strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * 78) / 100} strokeLinecap="round" />
                    </svg>
                    <div className="absolute flex flex-col items-center justify-center">
                      <span className="text-2xl font-extrabold text-zinc-900 tracking-tighter">78</span>
                      <span className="text-[10px] text-zinc-500 font-medium">/100</span>
                    </div>
                  </div>
                  
                  <div className="text-center sm:text-left">
                    <h3 className="text-sm font-bold text-zinc-900">Good Score</h3>
                    <p className="text-xs text-zinc-500 mt-1">Your resume has strong matching qualities and formatting structure.</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-5 mt-8">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-zinc-500">Skills match</span>
                    <span className="text-zinc-800">85%</span>
                  </div>
                  <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-zinc-500">Experience</span>
                    <span className="text-zinc-800">72%</span>
                  </div>
                  <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
                    <div className="h-full bg-lime-500 rounded-full" style={{ width: '72%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-zinc-500">Formatting</span>
                    <span className="text-zinc-800">90%</span>
                  </div>
                  <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-zinc-500">Keywords (ATS)</span>
                    <span className="text-zinc-800">60%</span>
                  </div>
                  <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Card 2: 2x2 Highlights Grid */}
            <div className="grid grid-cols-2 gap-3.5 h-auto">
              <div className="bg-white border border-zinc-200 rounded-xl p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-1.5 text-zinc-500">
                  <Briefcase className="w-4 h-4" />
                  <span className="text-[10px] font-bold tracking-wider uppercase">Experience</span>
                </div>
                <div className="text-xl font-bold text-zinc-900 mt-1.5">4.5 yrs</div>
              </div>
              <div className="bg-white border border-zinc-200 rounded-xl p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-1.5 text-zinc-500">
                  <GraduationCap className="w-4 h-4" />
                  <span className="text-[10px] font-bold tracking-wider uppercase">Education</span>
                </div>
                <div className="text-xl font-bold text-zinc-900 mt-1.5">B.Tech</div>
              </div>
              <div className="bg-white border border-zinc-200 rounded-xl p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-1.5 text-zinc-500">
                  <Cpu className="w-4 h-4" />
                  <span className="text-[10px] font-bold tracking-wider uppercase">Total Skills</span>
                </div>
                <div className="text-xl font-bold text-zinc-900 mt-1.5">18 skills</div>
              </div>
              <div className="bg-white border border-zinc-200 rounded-xl p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-1.5 text-zinc-500">
                  <Languages className="w-4 h-4" />
                  <span className="text-[10px] font-bold tracking-wider uppercase">Languages</span>
                </div>
                <div className="text-xl font-bold text-zinc-900 mt-1.5">2 lang</div>
              </div>
            </div>
            
          </div>
          
          {/* ================= COLUMN 2 ================= */}
          <div className="flex flex-col gap-4 h-full min-h-0">
            
            {/* Card 3: Tech Skills Rating */}
            <div className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-3">
                <Code className="w-4.5 h-4.5 text-zinc-400" />
                <h2 className="text-sm font-bold text-zinc-800 tracking-wide">Tech skills</h2>
              </div>
              
              <div className="flex gap-4 mb-4 text-[10px] text-zinc-500 font-semibold">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  <span>Strong</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  <span>Medium</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-zinc-400"></span>
                  <span>Mentioned</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <span className="px-2.5 py-1 rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-xs font-bold shadow-sm">React</span>
                <span className="px-2.5 py-1 rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-xs font-bold shadow-sm">Python</span>
                <span className="px-2.5 py-1 rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-xs font-bold shadow-sm">Node.js</span>
                <span className="px-2.5 py-1 rounded-full border border-green-200 bg-green-50 text-green-700 text-xs font-bold shadow-sm">TypeScript</span>
                <span className="px-2.5 py-1 rounded-full border border-green-200 bg-green-50 text-green-700 text-xs font-bold shadow-sm">MongoDB</span>
                <span className="px-2.5 py-1 rounded-full border border-green-200 bg-green-50 text-green-700 text-xs font-bold shadow-sm">Docker</span>
                <span className="px-2.5 py-1 rounded-full border border-zinc-200 bg-zinc-100 text-zinc-600 text-xs font-bold shadow-sm">AWS</span>
                <span className="px-2.5 py-1 rounded-full border border-zinc-200 bg-zinc-100 text-zinc-600 text-xs font-bold shadow-sm">Kubernetes</span>
              </div>
            </div>
            
            {/* Card 4: Job Suggestions */}
            <div className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex-1 flex flex-col min-h-0">
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-0.5">
                  <Sparkles className="w-4.5 h-4.5 text-zinc-400" />
                  <h2 className="text-sm font-bold text-zinc-800 tracking-wide">Job suggestions</h2>
                </div>
                <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider">based on your profile</p>
              </div>
              
              <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-thin">
                <div className="flex items-center justify-between p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl hover:border-blue-300 transition duration-150 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center border border-zinc-200 shadow-sm">
                      <Monitor className="w-4.5 h-4.5 text-blue-500" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-zinc-900">Frontend Developer</h4>
                      <p className="text-[10px] text-zinc-500 mt-0.5">React · Node.js · 3-5 yrs</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 text-[10px] font-bold text-emerald-700 bg-emerald-100 border border-emerald-200 rounded-full shadow-sm">92% match</span>
                </div>
                
                <div className="flex items-center justify-between p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl hover:border-blue-300 transition duration-150 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center border border-zinc-200 shadow-sm">
                      <Cpu className="w-4.5 h-4.5 text-green-500" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-zinc-900">Full Stack Engineer</h4>
                      <p className="text-[10px] text-zinc-500 mt-0.5">Python · MongoDB · Docker</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 text-[10px] font-bold text-emerald-700 bg-emerald-100 border border-emerald-200 rounded-full shadow-sm">85% match</span>
                </div>
                
                <div className="flex items-center justify-between p-3.5 bg-zinc-50 border border-zinc-200 rounded-xl hover:border-blue-300 transition duration-150 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center border border-zinc-200 shadow-sm">
                      <Cloud className="w-4.5 h-4.5 text-zinc-500" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-zinc-900">DevOps / Cloud</h4>
                      <p className="text-[10px] text-zinc-500 mt-0.5">AWS · Docker · K8s</p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 text-[10px] font-bold text-amber-700 bg-amber-100 border border-amber-200 rounded-full shadow-sm">68% match</span>
                </div>
              </div>
            </div>
            
          </div>
          
        </div>
        
        {/* ================= BOTTOM ROW ================= */}
        {/* Card 5: Improvement Tips */}
        <div className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex-shrink-0">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4.5 h-4.5 text-zinc-400" />
            <h2 className="text-sm font-bold text-zinc-800 tracking-wide">Improvement tips</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            <div className="flex gap-2.5 items-start">
              <CheckCircle2 className="w-4.5 h-4.5 text-green-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-zinc-700 leading-snug font-medium">Good use of action verbs and measurable results</p>
            </div>
            
            <div className="flex gap-2.5 items-start">
              <AlertTriangle className="w-4.5 h-4.5 text-amber-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-zinc-700 leading-snug font-medium">Add more ATS keywords — "CI/CD", "REST API", "Agile"</p>
            </div>
            
            <div className="flex gap-2.5 items-start">
              <AlertTriangle className="w-4.5 h-4.5 text-amber-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-zinc-700 leading-snug font-medium">Summary section is too short — expand to 3-4 lines</p>
            </div>
            
            <div className="flex gap-2.5 items-start">
              <AlertTriangle className="w-4.5 h-4.5 text-amber-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-zinc-700 leading-snug font-medium">Missing LinkedIn or GitHub profile link</p>
            </div>
            
            <div className="flex gap-2.5 items-start">
              <CheckCircle2 className="w-4.5 h-4.5 text-green-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-zinc-700 leading-snug font-medium">Consistent formatting and clean layout</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardComponent;
