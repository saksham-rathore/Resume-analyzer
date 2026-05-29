import React from 'react'
import Logo from './Logo'

export default function Navbar() {
    return (
        <nav className='w-full flex justify-between items-center px-6 py-4'>
            <Logo size={12} />
            <h1 className='font-bitcount'>UDAAN</h1>

            
        </nav>
    )
}
