'use client';
import Link from 'next/link';
import React, { useState } from 'react';

const NavBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className='relative bg-white shadow-md px-6 py-4 flex items-center justify-between'>
        {/* Logo */}
        <div className='text-xl font-bold text-gray-800'>
          <Link href='/'>Logo</Link>
        </div>

        {/* Menü */}
        <nav className='opacity-85'>
          <ul
            className={`
            flex-col md:flex-row md:flex gap-8 text-gray-700 text-sm font-medium absolute
            left-0 top-full w-full bg-white md:static md:w-auto md:bg-transparent
            transition-all duration-300 ease-in-out
            ${open ? 'flex' : 'hidden md:flex'}
            `}
          >
            <li className='px-6 py-3 md:p-0 text-center hover:text-blue-600 cursor-pointer'>
              <Link onClick={() => setOpen(!open)} href='/owned'>Saját gyűjtemény</Link>
            </li>
            <li className='px-6 py-3 md:p-0 text-center hover:text-blue-600 cursor-pointer'>
              <Link onClick={() => setOpen(!open)} href='/wishlist'>Kívánságlista</Link>
            </li>
            <li className='px-6 py-3 md:p-0 text-center hover:text-blue-600 cursor-pointer'>
              <Link onClick={() => setOpen(!open)} href='/search'>Böngészés</Link>
            </li>
          </ul>
        </nav>
        {/* Hamburger ikon (csak mobilon) */}
        <button
          className='md:hidden flex items-center cursor-pointer'
          onClick={() => setOpen(!open)}
          aria-label='Menü megnyitása'
        >
          <span className='w-6 h-6 flex flex-col justify-between'>
            <span className='block w-6 h-0.5 bg-gray-800 mb-1'></span>
            <span className='block w-6 h-0.5 bg-gray-800 mb-1'></span>
            <span className='block w-6 h-0.5 bg-gray-800'></span>
          </span>
        </button>
      </div>
    </>
  );
};

export default NavBar;
