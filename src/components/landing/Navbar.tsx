"use client";

import React, { useState, useEffect } from 'react'
import Logo from './Logo'
import Link from 'next/link'

export default function Navbar() {

    return (
        <div className="sticky top-0 z-50 w-full flex justify-center pt-4 px-4 sm:px-6">
            <div className="transition-all duration-300 flex items-center justify-between w-full max-w-[1120px] rounded-full border border-white/50 bg-white/50 backdrop-blur-xl py-4 px-8 shadow-[0_14px_50px_rgba(0,0,0,0.04)]">
                
                <div className='flex items-center gap-8'>
                    <Link href='/' className='flex items-center gap-3.5 hover:opacity-90 transition-opacity'>
                        <Logo size={38} />
                        <h1 className="text-3xl mt-1.5 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 bg-clip-text text-transparent leading-none">
                            C<span className="text-2xl ml-0.5">V</span> shield
                        </h1>
                    </Link>

               
                    <nav className='hidden md:flex items-center gap-6 text-sm font-semibold text-slate-500'>
                        <Link href='/#features' className='hover:text-slate-900 transition-colors duration-300'>
                            Features
                        </Link>
                        <Link href='/#simulator' className='hover:text-slate-900 transition-colors duration-300'>
                            ATS simulator
                        </Link>
                        <Link href='/#working' className='hover:text-slate-900 transition-colors duration-300'>
                            How It Works
                        </Link>
                    </nav>
                </div>

                
                <div className='flex items-center gap-4'>
                    <Link
                        href='/signIn'
                        className="px-6 py-2.5 text-center flex items-center justify-center rounded-full text-sm font-semibold text-slate-700 bg-white shadow-md border border-slate-100 hover:scale-[1.03] transition-all duration-300"
                    >
                        Sign In
                    </Link>
                    <Link
                        href='/signup'
                        className="group premium-gradient-btn px-7 py-3 text-sm font-semibold rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all duration-500"
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