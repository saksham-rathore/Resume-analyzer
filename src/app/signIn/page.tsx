'use client';

import React, { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import Logo from '@/components/landing/Logo';
import Link from 'next/link';
import { Sparkles, FileText, CheckCircle2, X, Check, Lock, Mail, Eye, EyeOff, ShieldAlert } from 'lucide-react';

export default function SignInPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

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
    <div className="w-full min-h-screen flex flex-col justify-between p-6 sm:p-10 bg-slate-50 text-slate-800 font-sans items-center justify-center relative overflow-hidden">
      
      {/* Subtle Background Glows */}
      <div className="absolute w-[300px] h-[300px] rounded-full bg-blue-500/5 blur-[100px] top-12 left-12 pointer-events-none" />
      <div className="absolute w-[300px] h-[300px] rounded-full bg-indigo-500/5 blur-[100px] bottom-12 right-12 pointer-events-none" />

      {/* Main card */}
      <div className="w-full max-w-md my-auto flex flex-col items-start">
        
        {/* Brand Header */}
        <Link href="/" className="flex items-center gap-3.5 hover:opacity-90 transition-opacity mb-8 self-start">
          <Logo size={38} color="#0f172a" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 bg-clip-text text-transparent leading-none">
            C<span className="text-xl ml-0.5">V</span> shield
          </h1>
        </Link>

        {/* Form Card */}
        <motion.div
          key={pathname}
          className="w-full bg-white rounded-[2rem] border border-slate-200/80 shadow-[0_12px_40px_rgba(0,0,0,0.03)] p-8 sm:p-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header Title */}
          <motion.div variants={itemVariants} className="space-y-2.5 mb-8 text-left">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight leading-tight">
              Welcome Back
            </h2>
            <p className="text-slate-500 text-sm font-semibold">
              Enter your details to access your secure diagnostics dashboard.
            </p>
          </motion.div>

          {/* Social Auth Buttons */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3.5 mb-6">
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
              <svg className="w-5 h-5 text-slate-800" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              GitHub
            </button>
          </motion.div>

          <motion.div variants={itemVariants} className="relative flex items-center justify-center my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <span className="relative px-4 text-xs font-bold text-slate-400 bg-white uppercase tracking-wider">
              or use credentials
            </span>
          </motion.div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <AnimatePresence mode="wait">
              {errorMsg && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  className="bg-rose-50 border border-rose-200 text-rose-600 text-xs sm:text-sm px-4 py-3 rounded-xl font-semibold flex items-center gap-2"
                >
                  <ShieldAlert className="w-4.5 h-4.5 text-rose-500 shrink-0" />
                  <span>{errorMsg}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email Field */}
            <motion.div variants={itemVariants} className="space-y-2">
              <label className="text-xs sm:text-sm font-bold text-slate-700 block">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm bg-slate-50/50 font-medium"
                />
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4.5 h-4.5" />
              </div>
            </motion.div>

            {/* Password Field */}
            <motion.div variants={itemVariants} className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs sm:text-sm font-bold text-slate-700">Password</label>
                <a href="#" className="text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">
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
                  className="w-full pl-11 pr-11 py-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm bg-slate-50/50 font-medium"
                />
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4.5 h-4.5" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>
            </motion.div>

            {/* Remember Me */}
            <motion.div variants={itemVariants} className="flex items-center">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="w-4.5 h-4.5 rounded-md border-slate-300 text-blue-600 focus:ring-blue-500/15 accent-blue-600 cursor-pointer"
                />
                <span className="text-xs sm:text-sm font-semibold text-slate-500">Keep me logged in</span>
              </label>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              variants={itemVariants}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-slate-900 hover:bg-slate-950 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all duration-300 cursor-pointer active:scale-98 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 rounded-full border-2 border-t-white border-slate-700 animate-spin" />
              ) : (
                'Sign In'
              )}
            </motion.button>
          </form>

          {/* Switch to SignUp */}
          <motion.p variants={itemVariants} className="text-center text-xs sm:text-sm text-slate-500 font-semibold mt-6">
            Don't have an account?{' '}
            <Link href="/signup" className="text-blue-600 hover:text-blue-700 transition-colors font-bold">
              Sign Up
            </Link>
          </motion.p>
        </motion.div>

      </div>

      {/* Footer */}
      <div className="text-center text-[10px] sm:text-xs text-slate-400 font-semibold self-center mt-8">
        © {new Date().getFullYear()} CVShield. Secure ATS Resume Analytics.
      </div>

    </div>
  );
}
