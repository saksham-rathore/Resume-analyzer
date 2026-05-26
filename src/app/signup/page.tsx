'use client';

import React, { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

export default function SignUpPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/Dashboard');
    }
  }, [status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!name || !email || !password) {
      setErrorMsg('All fields are required.');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    if (!agreeTerms) {
      setErrorMsg('You must agree to the Terms, Privacy Policy and Fees.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'An error occurred during registration.');
      }

      setSuccessMsg('Account created successfully! Logging you in...');

      const signinRes = await signIn('credentials', {
        email,
        password,
        redirect: false,
        callbackUrl: '/Dashboard',
      });

      if (signinRes?.error) {
        setErrorMsg('Registration succeeded, but login failed. Please sign in manually.');
        setIsLoading(false);
      } else {
        router.push('/Dashboard');
        router.refresh();
      }

    } catch (err: any) {
      setErrorMsg(err.message || 'Registration failed. Please check your credentials.');
      setIsLoading(false);
    }
  };

  const handleOAuthSignIn = (provider: 'google' | 'github') => {
    setIsLoading(true);
    signIn(provider, { callbackUrl: '/Dashboard' });
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
    <div className="w-full min-h-screen flex flex-col justify-between p-8 sm:p-12 md:p-16 lg:p-10 xl:p-14 bg-white text-slate-800 font-sans items-center justify-center">

      <div className="flex flex-col justify-between min-h-[calc(100vh-7rem)] w-full max-w-md mx-auto items-center">

        <div className="flex items-center justify-center gap-2.5">
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
          className="my-auto py-8 w-full max-w-md mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="space-y-2 mb-6">
            <h1 className="font-cabinet font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight leading-tight">
              Create your Account
            </h1>
            <p className="text-slate-500 text-sm sm:text-base font-medium">
              Let's get started with your 30 days free trial
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3 mb-5">
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
              <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              GitHub
            </button>
          </motion.div>

          <motion.div variants={itemVariants} className="relative flex items-center justify-center my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <span className="relative px-4 text-xs font-semibold text-slate-400 bg-white uppercase tracking-wider">
              or
            </span>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-4">
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
              {successMsg && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  className="bg-green-50 border border-green-200 text-green-600 text-xs sm:text-sm px-4 py-3 rounded-xl font-medium"
                >
                  {successMsg}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div variants={itemVariants} className="space-y-1">
              <label className="text-xs sm:text-sm font-semibold text-slate-700">Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-normal/20 focus:border-blue-normal transition-all text-sm bg-slate-50/50"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-1">
              <label className="text-xs sm:text-sm font-semibold text-slate-700">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-normal/20 focus:border-blue-normal transition-all text-sm bg-slate-50/50"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-1 relative">
              <label className="text-xs sm:text-sm font-semibold text-slate-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password (min. 6 chars)"
                  className="w-full pl-4 pr-11 py-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-blue-normal/20 focus:border-blue-normal transition-all text-sm bg-slate-50/50"
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542 7z" />
                    </svg>
                  )}
                </button>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-1">
              <label className="flex items-start gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4.5 h-4.5 rounded-sm border-slate-300 text-blue-normal focus:ring-blue-normal/20 accent-blue-normal mt-0.5"
                />
                <span className="text-xs sm:text-sm font-semibold text-slate-500 leading-tight">
                  I agree to all <a href="#" className="text-blue-normal hover:underline">Terms</a>,{' '}
                  <a href="#" className="text-blue-normal hover:underline">Privacy Policy</a> and{' '}
                  <a href="#" className="text-blue-normal hover:underline">Fees</a>.
                </span>
              </label>
            </motion.div>

            <motion.button
              variants={itemVariants}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-slate-900 hover:bg-slate-950 text-white font-semibold py-3.5 rounded-xl shadow-md transition-all duration-200 cursor-pointer active:scale-98 mt-2 flex items-center justify-center gap-2 relative overflow-hidden"
            >
              {isLoading ? (
                <div className="w-5 h-5 rounded-full border-2 border-t-white border-slate-700 animate-spin" />
              ) : (
                'Sign Up'
              )}
            </motion.button>
          </form>

          <motion.p variants={itemVariants} className="text-center text-xs sm:text-sm text-slate-500 font-semibold mt-6">
            Already have an account?{' '}
            <a href="/signIn" className="text-blue-normal hover:text-blue-dark transition-colors font-bold">
              Log in
            </a>
          </motion.p>
        </motion.div>

        <div className="text-center text-xs text-slate-400 font-medium">
          © {new Date().getFullYear()} CVShield. Secure ATS Resume Analytics.
        </div>

      </div>

    </div>
  );
}
