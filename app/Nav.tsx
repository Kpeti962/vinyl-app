'use client';
import Link from 'next/link';
import React, { useState } from 'react';

const NavBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative bg-gradient-to-r from-indigo-50 to-white shadow-lg px-6 py-1">
      <div className="flex items-center justify-between max-w-4xl mx-auto">

        {/* Logó kép */}
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/bakeliteka.png"
            alt="BakelitBázis logó"
            className="h-30 w-30  object-contain drop-shadow-md"
          />
          
        </Link>

        {/* Hamburger ikon */}
        <button
          className="md:hidden flex items-center p-2 rounded hover:bg-indigo-100 transition"
          onClick={() => setOpen(!open)}
          aria-label="Menü megnyitása"
        >
          <span className="w-7 h-7 flex flex-col justify-between">
            <span className="block w-7 h-0.5 bg-gray-800 mb-1 rounded"></span>
            <span className="block w-7 h-0.5 bg-gray-800 mb-1 rounded"></span>
            <span className="block w-7 h-0.5 bg-gray-800 rounded"></span>
          </span>
        </button>

        {/* Menü */}
        <nav
          className={`absolute top-full left-0 w-full bg-white md:static md:bg-transparent md:w-auto z-40 transition-all duration-300 ease-in-out ${
            open ? 'flex justify-center' : 'hidden md:flex'
          }`}
        >
          <ul className="flex flex-col md:flex-row gap-2 md:gap-8 text-gray-700 text-base font-medium py-3 md:py-0 px-2 md:px-0">
            <li>
              <Link
                href="/owned"
                onClick={() => setOpen(false)}
                className="block py-2 px-4 rounded hover:bg-indigo-100 hover:text-indigo-600 transition duration-200 text-center"
              >
                Saját gyűjtemény
              </Link>
            </li>
            <li>
              <Link
                href="/wishlist"
                onClick={() => setOpen(false)}
                className="block py-2 px-4 rounded hover:bg-indigo-100 hover:text-indigo-600 transition duration-200 text-center"
              >
                Kívánságlista
              </Link>
            </li>
            <li>
              <Link
                href="/search"
                onClick={() => setOpen(false)}
                className="block py-2 px-4 rounded hover:bg-indigo-100 hover:text-indigo-600 transition duration-200 text-center"
              >
                Böngészés
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      {/* Mobile menu background overlay */}
      {open && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-opacity-30 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </header>
  );
};

export default NavBar;
