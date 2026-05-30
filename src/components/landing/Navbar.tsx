import React from 'react'
import Logo from './Logo'
import Link from 'next/link'

export default function Navbar() {
    return (
        <div className='w-full py-5 px-6 md:px-0 border-b border-slate-100/50 bg-white/70 backdrop-blur-md sticky top-0 z-50'>
            <div className='mx-auto max-w-[900px] flex items-center justify-between'>
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
                        <Link href='/#pricing' className='hover:text-slate-900 transition-colors'>
                            Pricing
                        </Link>
                        <Link href='/#showcase' className='hover:text-slate-900 transition-colors'>
                            Showcase
                        </Link>
                    </nav>
                </div>

                {/* Right Side: Action Buttons */}
                <div className='flex items-center gap-4'>
                    <Link 
                        href='/signIn' 
                        className='px-5 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200/80 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:bg-slate-50 hover:border-slate-300 transition-all duration-200'
                    >
                        Sign In
                    </Link>
                    <Link 
                        href='/signup' 
                        className='px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-full shadow-[0_8px_16px_rgba(37,99,235,0.2)] hover:bg-blue-700 hover:shadow-[0_8px_20px_rgba(37,99,235,0.35)] transition-all duration-200 transform hover:-translate-y-0.5'
                    >
                        Get Started for Free
                    </Link>
                </div>
            </div>
        </div>
    )
}