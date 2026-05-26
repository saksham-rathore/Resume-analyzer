'use client';

import React, { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

export default function SignInPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const callbackUrl = searchParams.get('callbackUrl') || '/Dashboard';
  const urlError = searchParams.get('error');

  useEffect(() => {
    if (status === 'authenticated') {
      router.push(callbackUrl);
    }
  }, [status, router, callbackUrl]);

  useEffect(() => {
    if (urlError) {
      if (urlError === 'OAuthSignin' || urlError === 'OAuthCallback') {
        setErrorMsg('Failed to sign in with OAuth provider.');
      } else {
        setErrorMsg('An error occurred during authentication.');
      }
    }
  }, [urlError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl,
      });

      if (res?.error) {
        setErrorMsg(res.error === 'CredentialsSignin' ? 'Invalid email or password.' : res.error);
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      setErrorMsg('Something went wrong. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthSignIn = (provider: 'google' | 'github') => {
    setIsLoading(true);
    signIn(provider, { callbackUrl });
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  return (
    <div className="w-full min-h-screen grid grid-cols-1 lg:grid-cols-12 overflow-hidden bg-white text-slate-800 font-sans">

      <div className="lg:col-span-5 xl:col-span-5 flex flex-col justify-between p-8 sm:p-12 md:p-16 lg:p-10 xl:p-14 min-h-screen bg-white">

        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-normal to-blue-dark flex items-center justify-center shadow-sm">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <span className="font-cabinet font-extrabold text-xl text-slate-900 tracking-tight">
            CV<span className="text-blue-normal">Shield</span>
          </span>
        </div>

        <motion.div
          className="my-auto py-10 w-full max-w-md mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="space-y-2 mb-8">
            <h1 className="font-cabinet font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight leading-tight">
              Welcome Back
            </h1>
            <p className="text-slate-500 text-sm sm:text-base font-medium">
              Welcome back! Please enter your details to sign in
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              onClick={() => handleOAuthSignIn('google')}
              className="flex items-center justify-center gap-2 px-4 py-3 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 shadow-xs cursor-pointer active:scale-98"
            >
              <svg className="w-4.5 h-4.5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              Google
            </button>

            <button
              type="button"
              onClick={() => handleOAuthSignIn('github')}
              className="flex items-center justify-center gap-2 px-4 py-3 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 shadow-xs cursor-pointer active:scale-98"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              GitHub
            </button>
          </motion.div>

          <motion.div variants={itemVariants} className="relative flex items-center justify-center my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <span className="relative px-4 text-xs font-semibold text-slate-400 bg-white uppercase tracking-wider">
              or
            </span>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <AnimatePresence mode="wait">
              {errorMsg && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  className="bg-red-50 border border-red-200 text-red-600 text-xs sm:text-sm px-4 py-3 rounded-xl font-medium"
                >
                  {errorMsg}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div variants={itemVariants} className="space-y-1.5">
              <label className="text-xs sm:text-sm font-semibold text-slate-700">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-normal/20 focus:border-blue-normal transition-all text-sm bg-slate-50/50"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-1.5 relative">
              <div className="flex justify-between items-center">
                <label className="text-xs sm:text-sm font-semibold text-slate-700">Password</label>
                <a href="#" className="text-xs sm:text-sm font-semibold text-blue-normal hover:text-blue-dark transition-colors">
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-4 pr-11 py-3.5 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-normal/20 focus:border-blue-normal transition-all text-sm bg-slate-50/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1 cursor-pointer"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded-sm border-slate-300 text-blue-normal focus:ring-blue-normal/20 accent-blue-normal"
                />
                <span className="text-xs sm:text-sm font-semibold text-slate-500">Keep me logged in</span>
              </label>
            </motion.div>

            <motion.button
              variants={itemVariants}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-slate-900 hover:bg-slate-950 text-white font-semibold py-3.5 rounded-xl shadow-md transition-all duration-200 cursor-pointer active:scale-98 flex items-center justify-center gap-2 relative overflow-hidden"
            >
              {isLoading ? (
                <div className="w-5 h-5 rounded-full border-2 border-t-white border-slate-700 animate-spin" />
              ) : (
                'Sign In'
              )}
            </motion.button>
          </form>

          <motion.p variants={itemVariants} className="text-center text-xs sm:text-sm text-slate-500 font-semibold mt-6">
            Don't have an account?{' '}
            <a href="/signup" className="text-blue-normal hover:text-blue-dark transition-colors font-bold">
              Sign Up
            </a>
          </motion.p>
        </motion.div>

        <div className="text-center lg:text-left text-xs text-slate-400 font-medium">
          © {new Date().getFullYear()} CVShield. Secure ATS Resume Analytics.
        </div>

      </div>

      <div className="hidden lg:flex lg:col-span-7 xl:col-span-7 relative h-screen bg-slate-950 flex-col items-center justify-center p-4 sm:p-6 lg:p-6 xl:p-8 overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-slate-950/10 z-10 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 0.9, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="w-full h-full max-h-[92%] lg:max-h-[94%] xl:max-h-[96%] flex items-center justify-center select-none z-10"
        >
          <svg width="100%" height="100%" viewBox="0 0 680 560" role="img" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <title>Resume Analyser Animation</title>
            <desc>Animated SVG showing the resume analysis pipeline: upload, parse, AI scoring, and results</desc>
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </marker>
              <style>{`
                @keyframes scanEffect {
                  0%, 100% { transform: translateY(0); }
                  50% { transform: translateY(76px); }
                }
                @keyframes pulseNode {
                  0%, 100% { opacity: 0.25; transform: scale(1); }
                  50% { opacity: 0.85; transform: scale(1.15); }
                }
                @keyframes pulseDot {
                  0%, 100% { opacity: 0.2; }
                  50% { opacity: 1; }
                }
                @keyframes fillSkills {
                  from { width: 0; }
                  to { width: 110.5px; }
                }
                @keyframes fillExp {
                  from { width: 0; }
                  to { width: 139.4px; }
                }
                @keyframes fillEdu {
                  from { width: 0; }
                  to { width: 90.1px; }
                }
                @keyframes fillKeywords {
                  from { width: 0; }
                  to { width: 159.8px; }
                }
                @keyframes fillScore {
                  from { stroke-dashoffset: 239; }
                  to { stroke-dashoffset: 31; }
                }
                @keyframes ambientGlow {
                  0%, 100% { opacity: 0.15; transform: scale(1) translate(0px, 0px); }
                  50% { opacity: 0.35; transform: scale(1.05) translate(5px, -5px); }
                }
              `}</style>
            </defs>

            <rect x="20" y="20" width="640" height="520" rx="20" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

            <circle cx="150" cy="140" r="90" fill="rgba(255,255,255,0.04)" style={{ animation: 'ambientGlow 8s ease-in-out infinite', transformOrigin: '150px 140px' }} />
            <circle cx="530" cy="400" r="110" fill="rgba(255,255,255,0.03)" style={{ animation: 'ambientGlow 10s ease-in-out infinite', animationDelay: '1.2s', transformOrigin: '530px 400px' }} />

            <text x="340" y="58" textAnchor="middle" fontSize="17" fill="rgba(255,255,255,0.9)" fontFamily="var(--font-cabinet)" fontWeight="700">Resume Analyser</text>
            <text x="340" y="76" textAnchor="middle" fill="rgba(255, 255, 255, 0.65)" fontSize="12" fontFamily="var(--font-satoshi)">AI-powered candidate screening pipeline</text>
            <line x1="80" y1="88" x2="600" y2="88" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />

            <g>
              <rect x="44" y="102" width="130" height="162" rx="12" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.18)" strokeWidth="0.5" />
              <text x="109" y="122" textAnchor="middle" fill="rgba(255, 255, 255, 0.5)" fontSize="11" fontFamily="var(--font-cabinet)">01 — upload</text>

              <rect x="71" y="130" width="76" height="90" rx="6" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.7" />
              <line x1="81" y1="150" x2="137" y2="150" stroke="rgba(255,255,255,0.35)" strokeWidth="1.8" strokeLinecap="round" />
              <line x1="81" y1="162" x2="129" y2="162" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="81" y1="174" x2="137" y2="174" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="81" y1="186" x2="125" y2="186" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="81" y1="198" x2="117" y2="198" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" />
              <rect x="92" y="208" width="34" height="14" rx="4" fill="rgba(255,255,255,0.2)" />
              <text x="109" y="219" textAnchor="middle" fontSize="9.5" fontFamily="var(--font-cabinet)" fill="white" fontWeight="700">PDF</text>

              <text x="109" y="246" textAnchor="middle" fill="rgba(255, 255, 255, 0.65)" fontSize="12" fontFamily="var(--font-satoshi)">Resume file</text>
            </g>

            <line x1="174" y1="183" x2="192" y2="183" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" markerEnd="url(#arrow)" strokeDasharray="6 4" />

            <g>
              <rect x="196" y="102" width="130" height="162" rx="12" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.18)" strokeWidth="0.5" />
              <text x="261" y="122" textAnchor="middle" fill="rgba(255, 255, 255, 0.5)" fontSize="11" fontFamily="var(--font-cabinet)">02 — parse</text>

              <rect x="210" y="132" width="102" height="92" rx="5" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
              <line x1="218" y1="146" x2="304" y2="146" stroke="rgba(255,255,255,0.15)" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="218" y1="156" x2="294" y2="156" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeLinecap="round" />
              <line x1="218" y1="166" x2="300" y2="166" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeLinecap="round" />
              <line x1="218" y1="176" x2="288" y2="176" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeLinecap="round" />
              <line x1="218" y1="186" x2="298" y2="186" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeLinecap="round" />
              <line x1="218" y1="196" x2="282" y2="196" stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeLinecap="round" />
              
              <line x1="210" y1="134" x2="312" y2="134" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" style={{ animation: 'scanEffect 3s ease-in-out infinite' }} />

              <rect x="212" y="230" width="36" height="12" rx="3" fill="rgba(255,255,255,0.14)" />
              <text x="230" y="239.5" textAnchor="middle" fontSize="9" fontFamily="var(--font-satoshi)" fill="rgba(255,255,255,0.7)">Skills</text>
              <rect x="254" y="230" width="34" height="12" rx="3" fill="rgba(255,255,255,0.14)" />
              <text x="271" y="239.5" textAnchor="middle" fontSize="9" fontFamily="var(--font-satoshi)" fill="rgba(255,255,255,0.7)">Exp.</text>
              <rect x="294" y="230" width="26" height="12" rx="3" fill="rgba(255,255,255,0.14)" />
              <text x="307" y="239.5" textAnchor="middle" fontSize="9" fontFamily="var(--font-satoshi)" fill="rgba(255,255,255,0.7)">Edu</text>
              
              <text x="261" y="252" textAnchor="middle" fill="rgba(255, 255, 255, 0.65)" fontSize="11" fontFamily="var(--font-satoshi)">Extracted fields</text>
            </g>

            <line x1="326" y1="183" x2="344" y2="183" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" markerEnd="url(#arrow)" strokeDasharray="6 4" />

            <g>
              <rect x="348" y="102" width="130" height="162" rx="12" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.18)" strokeWidth="0.5" />
              <text x="413" y="122" textAnchor="middle" fill="rgba(255, 255, 255, 0.5)" fontSize="11" fontFamily="var(--font-cabinet)">03 — analyse</text>

              <circle cx="370" cy="146" r="6" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
              <circle cx="370" cy="169" r="6" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
              <circle cx="370" cy="192" r="6" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
              <circle cx="413" cy="139" r="7" fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.5)" strokeWidth="1" style={{ animation: 'pulseNode 3s ease-in-out infinite', transformOrigin: '413px 139px' }} />
              <circle cx="413" cy="163" r="7" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.4)" strokeWidth="1" style={{ animation: 'pulseNode 3s ease-in-out infinite', animationDelay: '0.4s', transformOrigin: '413px 163px' }} />
              <circle cx="413" cy="187" r="7" fill="rgba(255,255,255,0.3)" stroke="rgba(255,255,255,0.6)" strokeWidth="1" style={{ animation: 'pulseNode 3s ease-in-out infinite', animationDelay: '0.8s', transformOrigin: '413px 187px' }} />
              <circle cx="413" cy="211" r="7" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.35)" strokeWidth="1" style={{ animation: 'pulseNode 3s ease-in-out infinite', animationDelay: '1.2s', transformOrigin: '413px 211px' }} />
              <circle cx="456" cy="175" r="9" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" />
              <circle cx="456" cy="175" r="5" fill="rgba(255,255,255,0.35)" />

              <line x1="376" y1="146" x2="406" y2="139" stroke="rgba(255,255,255,0.15)" strokeWidth="0.6" />
              <line x1="376" y1="146" x2="406" y2="163" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />
              <line x1="376" y1="169" x2="406" y2="139" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />
              <line x1="376" y1="169" x2="406" y2="163" stroke="rgba(255,255,255,0.2)" strokeWidth="0.6" />
              <line x1="376" y1="169" x2="406" y2="187" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />
              <line x1="376" y1="192" x2="406" y2="163" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
              <line x1="376" y1="192" x2="406" y2="187" stroke="rgba(255,255,255,0.15)" strokeWidth="0.6" />
              <line x1="376" y1="192" x2="406" y2="211" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />
              <line x1="420" y1="139" x2="447" y2="171" stroke="rgba(255,255,255,0.15)" strokeWidth="0.6" />
              <line x1="420" y1="163" x2="447" y2="173" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />
              <line x1="420" y1="187" x2="447" y2="177" stroke="rgba(255,255,255,0.18)" strokeWidth="0.6" />
              <line x1="420" y1="211" x2="447" y2="179" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />

              <circle cx="398" cy="228" r="4" fill="rgba(255,255,255,0.5)" style={{ animation: 'pulseDot 1.5s ease-in-out infinite' }} />
              <circle cx="413" cy="228" r="4" fill="rgba(255,255,255,0.5)" style={{ animation: 'pulseDot 1.5s ease-in-out infinite', animationDelay: '0.3s' }} />
              <circle cx="428" cy="228" r="4" fill="rgba(255,255,255,0.5)" style={{ animation: 'pulseDot 1.5s ease-in-out infinite', animationDelay: '0.6s' }} />
              <text x="413" y="246" textAnchor="middle" fill="rgba(255, 255, 255, 0.65)" fontSize="11" fontFamily="var(--font-satoshi)">Processing…</text>
            </g>

            <line x1="478" y1="183" x2="496" y2="183" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" markerEnd="url(#arrow)" strokeDasharray="6 4" />

            <g>
              <rect x="500" y="102" width="130" height="162" rx="12" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.18)" strokeWidth="0.5" />
              <text x="565" y="122" textAnchor="middle" fill="rgba(255, 255, 255, 0.5)" fontSize="11" fontFamily="var(--font-cabinet)">04 — score</text>

              <circle cx="542" cy="198" r="2" fill="rgba(255,255,255,0.5)" style={{ animation: 'pulseDot 2s ease-in-out infinite', animationDelay: '0.2s' }} />
              <circle cx="565" cy="192" r="1.5" fill="rgba(255,255,255,0.4)" style={{ animation: 'pulseDot 2s ease-in-out infinite', animationDelay: '0.6s' }} />
              <circle cx="586" cy="204" r="2" fill="rgba(255,255,255,0.35)" style={{ animation: 'pulseDot 2s ease-in-out infinite', animationDelay: '1s' }} />

              <circle cx="565" cy="172" r="38" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="5" />
              <circle cx="565" cy="172" r="38" fill="none" stroke="#79a4ff" strokeWidth="5" strokeDasharray="239" strokeDashoffset="239" strokeLinecap="round" transform="rotate(-90 565 172)" style={{ animation: 'fillScore 1.8s cubic-bezier(0.16, 1, 0.3, 1) forwards', transformOrigin: '565px 172px' }} />

              <g>
                <text x="565" y="166" textAnchor="middle" fontSize="22" fontWeight="700" fontFamily="var(--font-cabinet)" fill="white">87</text>
                <text x="565" y="182" textAnchor="middle" fill="rgba(255, 255, 255, 0.5)" fontSize="11" fontFamily="var(--font-satoshi)">/ 100</text>
              </g>

              <text x="565" y="246" textAnchor="middle" fill="rgba(255, 255, 255, 0.65)" fontSize="11" fontFamily="var(--font-satoshi)">Match score</text>
            </g>

            <line x1="44" y1="292" x2="636" y2="292" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5" />

            <text x="44" y="314" fontSize="13" fill="rgba(255,255,255,0.75)" fontFamily="var(--font-cabinet)" fontWeight="500">Score breakdown</text>

            <text x="44" y="340" fill="rgba(255, 255, 255, 0.65)" fontSize="12" fontFamily="var(--font-satoshi)">Skills match</text>
            <rect x="160" y="329" width="170" height="11" rx="5" fill="rgba(255,255,255,0.08)" />
            <rect x="160" y="329" width="0" height="11" rx="5" fill="#79a4ff" style={{ animation: 'fillSkills 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards' }} />
            <text x="338" y="340" fill="rgba(255, 255, 255, 0.65)" fontSize="12" fontFamily="var(--font-satoshi)">65%</text>

            <text x="44" y="368" fill="rgba(255, 255, 255, 0.65)" fontSize="12" fontFamily="var(--font-satoshi)">Experience</text>
            <rect x="160" y="357" width="170" height="11" rx="5" fill="rgba(255,255,255,0.08)" />
            <rect x="160" y="357" width="0" height="11" rx="5" fill="#79a4ff" style={{ animation: 'fillExp 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards', animationDelay: '0.1s' }} />
            <text x="338" y="368" fill="rgba(255, 255, 255, 0.65)" fontSize="12" fontFamily="var(--font-satoshi)">82%</text>

            <text x="44" y="396" fill="rgba(255, 255, 255, 0.65)" fontSize="12" fontFamily="var(--font-satoshi)">Education</text>
            <rect x="160" y="385" width="170" height="11" rx="5" fill="rgba(255,255,255,0.08)" />
            <rect x="160" y="385" width="0" height="11" rx="5" fill="#79a4ff" style={{ animation: 'fillEdu 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards', animationDelay: '0.2s' }} />
            <text x="338" y="396" fill="rgba(255, 255, 255, 0.65)" fontSize="12" fontFamily="var(--font-satoshi)">53%</text>

            <text x="44" y="424" fill="rgba(255, 255, 255, 0.65)" fontSize="12" fontFamily="var(--font-satoshi)">Keywords</text>
            <rect x="160" y="413" width="170" height="11" rx="5" fill="rgba(255,255,255,0.08)" />
            <rect x="160" y="413" width="0" height="11" rx="5" fill="#79a4ff" style={{ animation: 'fillKeywords 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards', animationDelay: '0.3s' }} />
            <text x="338" y="424" fill="rgba(255, 255, 255, 0.65)" fontSize="12" fontFamily="var(--font-satoshi)">94%</text>

            <g>
              <rect x="388" y="314" width="248" height="121" rx="12" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
              <text x="404" y="335" fontSize="12" fontWeight="700" fill="rgba(255,255,255,0.9)" fontFamily="var(--font-cabinet)">AI Verdict</text>
              
              <rect x="546" y="322" width="78" height="18" rx="9" fill="rgba(52,211,153,0.15)" stroke="rgba(52,211,153,0.3)" strokeWidth="0.5" />
              <text x="585" y="334" textAnchor="middle" fontSize="9" fontWeight="700" fill="#34d399" fontFamily="var(--font-satoshi)">STRONG FIT</text>

              <circle cx="409" cy="362" r="5" fill="rgba(52,211,153,0.15)" stroke="#34d399" strokeWidth="0.8" />
              <path d="M407 362l1.5 1.5 2.5-3" fill="none" stroke="#34d399" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
              <text x="424" y="365" fontSize="10.5" fill="rgba(255,255,255,0.7)" fontFamily="var(--font-satoshi)">Excellent experience matching</text>

              <circle cx="409" cy="387" r="5" fill="rgba(52,211,153,0.15)" stroke="#34d399" strokeWidth="0.8" />
              <path d="M407 387l1.5 1.5 2.5-3" fill="none" stroke="#34d399" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
              <text x="424" y="390" fontSize="10.5" fill="rgba(255,255,255,0.7)" fontFamily="var(--font-satoshi)">Keywords alignment is above 90%</text>

              <circle cx="409" cy="412" r="5" fill="rgba(52,211,153,0.15)" stroke="#34d399" strokeWidth="0.8" />
              <path d="M407 412l1.5 1.5 2.5-3" fill="none" stroke="#34d399" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
              <text x="424" y="415" fontSize="10.5" fill="rgba(255,255,255,0.7)" fontFamily="var(--font-satoshi)">Recommended for immediate screening</text>
            </g>

            <text x="44" y="465" fontSize="13" fill="rgba(255,255,255,0.75)" fontFamily="var(--font-cabinet)" fontWeight="500">Detected skills</text>

            <g>
              <rect x="44" y="475" width="56" height="20" rx="10" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
              <text x="72" y="489" textAnchor="middle" fontSize="11" fontFamily="var(--font-satoshi)" fill="rgba(255,255,255,0.85)">Python</text>

              <rect x="108" y="475" width="46" height="20" rx="10" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
              <text x="131" y="489" textAnchor="middle" fontSize="11" fontFamily="var(--font-satoshi)" fill="rgba(255,255,255,0.85)">SQL</text>

              <rect x="162" y="475" width="56" height="20" rx="10" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
              <text x="190" y="489" textAnchor="middle" fontSize="11" fontFamily="var(--font-satoshi)" fill="rgba(255,255,255,0.85)">ML/AI</text>

              <rect x="226" y="475" width="72" height="20" rx="10" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
              <text x="262" y="489" textAnchor="middle" fontSize="11" fontFamily="var(--font-satoshi)" fill="rgba(255,255,255,0.85)">Leadership</text>

              <rect x="306" y="475" width="60" height="20" rx="10" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
              <text x="336" y="489" textAnchor="middle" fontSize="11" fontFamily="var(--font-satoshi)" fill="rgba(255,255,255,0.85)">AWS</text>
            </g>

            <g>
              <rect x="44" y="502" width="56" height="20" rx="10" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
              <text x="72" y="516" textAnchor="middle" fontSize="11" fontFamily="var(--font-satoshi)" fill="rgba(255,255,255,0.85)">React</text>

              <rect x="108" y="502" width="52" height="20" rx="10" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
              <text x="134" y="516" textAnchor="middle" fontSize="11" fontFamily="var(--font-satoshi)" fill="rgba(255,255,255,0.85)">Docker</text>

              <rect x="168" y="502" width="46" height="20" rx="10" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
              <text x="191" y="516" textAnchor="middle" fontSize="11" fontFamily="var(--font-satoshi)" fill="rgba(255,255,255,0.85)">Git</text>

              <rect x="222" y="502" width="56" height="20" rx="10" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
              <text x="250" y="516" textAnchor="middle" fontSize="11" fontFamily="var(--font-satoshi)" fill="rgba(255,255,255,0.85)">CI/CD</text>

              <rect x="286" y="502" width="62" height="20" rx="10" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
              <text x="317" y="516" textAnchor="middle" fontSize="11" fontFamily="var(--font-satoshi)" fill="rgba(255,255,255,0.85)">PyTorch</text>
            </g>

            <g>
              <rect x="388" y="456" width="248" height="66" rx="12" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
              <text x="404" y="475" fontSize="10" fontWeight="700" fill="rgba(255,255,255,0.4)" fontFamily="var(--font-cabinet)">PROCESSING METRICS</text>
              <text x="404" y="495" fontSize="11" fill="rgba(255,255,255,0.85)" fontFamily="var(--font-satoshi)">ATS Compatibility: <tspan fill="#34d399" fontWeight="700">PASS</tspan></text>
              <text x="404" y="512" fontSize="11" fill="rgba(255,255,255,0.85)" fontFamily="var(--font-satoshi)">Total Scan Time: <tspan fill="white" fontWeight="700">1.2 seconds</tspan></text>
              
              <g>
                <rect x="556" y="468" width="68" height="42" rx="8" fill="rgba(121,164,255,0.1)" stroke="rgba(121,164,255,0.2)" strokeWidth="0.8" />
                <text x="590" y="478" textAnchor="middle" fontSize="7" fontWeight="700" fill="rgba(121,164,255,0.7)" fontFamily="var(--font-satoshi)">GRADE</text>
                <text x="590" y="498" textAnchor="middle" fontSize="22" fontWeight="800" fill="#79a4ff" fontFamily="var(--font-cabinet)">A</text>
              </g>
            </g>
          </svg>
        </motion.div>

        <div className="absolute bottom-16 left-16 right-16 z-20 text-white max-w-lg">


        </div>

      </div>

    </div>
  );
}
