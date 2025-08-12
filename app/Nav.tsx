'use client';
import Link from 'next/link';
import React, { useState } from 'react';

const NavBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative bg-gradient-to-r from-indigo-900 via-zinc-900 to-black shadow-xl px-6 py-2">
      <div className="flex items-center justify-between max-w-4xl mx-auto">

        {/* Logó */}
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/vinylbase.png"
            alt="BakelitBázis logó"
            className="h-10 w-40  shadow-lg object-contain border border-zinc-700 bg-white rounded-lg"
          />
          
        </Link>

        {/* Hamburger ikon */}
        <button
          className="md:hidden flex items-center p-2 rounded hover:bg-zinc-800 transition"
          onClick={() => setOpen(!open)}
          aria-label="Menü megnyitása"
        >
          <span className="w-7 h-7 flex flex-col justify-between">
            <span className="block w-7 h-0.5 bg-gray-200 mb-1 rounded"></span>
            <span className="block w-7 h-0.5 bg-gray-200 mb-1 rounded"></span>
            <span className="block w-7 h-0.5 bg-gray-200 rounded"></span>
          </span>
        </button>

        {/* Menümobil/sötét, üveges dizájn */}
        <nav
          className={`absolute top-full left-0 w-full md:static md:w-auto z-40
            transition-all duration-300 ease-in-out
            ${
              open
                ? 'flex justify-center bg-zinc-900/95 backdrop-blur-sm shadow-xl'
                : 'hidden md:flex bg-transparent'
            }`}
        >
          <ul className="
            flex flex-col md:flex-row gap-2 md:gap-10 text-gray-200 text-base font-semibold py-4 md:py-0 px-2 md:px-0
            ">
            <li>
              <Link
                href="/owned"
                onClick={() => setOpen(false)}
                className="
                  block py-2 px-5 rounded-xl text-center
                  hover:bg-indigo-700 hover:text-white transition duration-200
                  hover:scale-105 active:bg-indigo-950
                "
              >
                My collection
              </Link>
            </li>
            <li>
              <Link
                href="/wishlist"
                onClick={() => setOpen(false)}
                className="
                  block py-2 px-5 rounded-xl text-center
                  hover:bg-indigo-700 hover:text-white transition duration-200
                  hover:scale-105 active:bg-indigo-950
                "
              >
                Wishlist
              </Link>
            </li>
            <li>
              <Link
                href="/search"
                onClick={() => setOpen(false)}
                className="
                  block py-2 px-5 rounded-xl text-center
                  hover:bg-indigo-700 hover:text-white transition duration-200
                  hover:scale-105 active:bg-indigo-950
                "
              >
                Search
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      {/* Mobile menu dark overlay */}
      {open && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-zinc-900/70 backdrop-blur-md z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </header>
  );
};

export default NavBar;
