import React from 'react'
import Logo from './Logo'

export default function Navbar() {
    return (
        <nav className='flex items-center justify-center gap-6'>
            <Logo size={50} />
            <h1 className='font-bitcount text-5xl tracking-widest mt-2'>
                UDAAN
            </h1>
        </nav>
    )
}
