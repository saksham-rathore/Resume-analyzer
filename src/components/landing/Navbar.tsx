import React from 'react'
import Logo from './Logo'
import Link from 'next/link'

export default function Navbar() {
    return (
        <div className='w-full py-5 px-6 md:px-0 border-b border-slate-100/50 bg-white/70 backdrop-blur-md sticky top-0 z-50'>
            <div className='mx-auto max-w-[1200px] flex items-center justify-between'>
                {/* Left Side: Logo, Title, and Nav Links */}
                <div className='flex items-center gap-8'>
                    <Link href='/' className='flex items-center gap-4 hover:opacity-90 transition-opacity'>
                        <Logo size={44} />
                        <h1 className='text-4xl mt-2 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 bg-clip-text text-transparent leading-none font-mono'>
                            C<span className='text-3xl ml-1'>V</span> shield
                        </h1>
                    </Link>

                    {/* Navigation Links */}
                    <nav className='hidden md:flex items-center gap-6 text-sm font-medium text-slate-500'>
                        <Link href='/#features' className='hover:text-slate-900 transition-colors'>
                            Features
                        </Link>
                        <Link href='/#simulator' className='hover:text-slate-900 transition-colors'>
                            ATS simulator
                        </Link>
                        <Link href='/#working' className='hover:text-slate-900 transition-colors'>
                            How It Works
                        </Link>
                        <a href='/#stories' className='hover:text-slate-900 transition-colors'>
                            Success Stories
                        </a>
                    </nav>
                </div>

                {/* Right Side: Action Buttons */}
                <div className='flex items-center gap-4'>
                    <Link
                        href='/signIn'
                        className='px-5 py-2.5 text-center flex rounded-full text-base font-semibold text-slate-700 bg-white bg-white text-black px-6 py-2 rounded-full shadow-lg'
                    >
                        Sign In
                    </Link>
                    <Link
                        href='/signup'
                        className='group premium-gradient-btn px-6 py-2.5 text-sm font-medium rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all duration-300'
                    >
                        <span className='flex items-center'>
                            Get Started for Free
                            <svg
                                className='w-0 h-3.5 opacity-0 -translate-x-2 ml-0 group-hover:w-3.5 group-hover:opacity-100 group-hover:translate-x-0 group-hover:ml-1.5 transition-all duration-300 ease-out'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                                strokeWidth={3}
                            >
                                <path strokeLinecap='round' strokeLinejoin='round' d='M9 5l7 7-7 7' />
                            </svg>
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    )
}