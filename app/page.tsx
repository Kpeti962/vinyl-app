import Image from 'next/image';
import React from 'react';

export default function Home() {
  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center bg-gradient-to-r from-indigo-100 via-white to-pink-100 py-12 px-4">
      {/* Lemez/logó kép */}
      <div className="mb-6">
        <Image
          src="/bakeliteka.png"
          alt="BakelitBázis logo"
          width={150}
          height={150}
          className="rounded-full shadow-lg border-4 border-white bg-white object-contain"
        />
      </div>

      {/* Főcím és szöveg */}
      <h1 className="text-4xl font-extrabold text-indigo-700 drop-shadow mb-2 tracking-tight text-center">
        Lemezeim
      </h1>
      <p className="text-gray-700 text-lg text-center max-w-xl mb-8">
        Fedezd fel, rendszerezd és bővítsd bakelitgyűjteményed a Bakeliteka oldalán!
      </p>

      {/* Akciógomb példának */}
      <a
        href="/owned"
        className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-full shadow transition"
      >
        Saját gyűjtemény megtekintése
      </a>
    </main>
  );
}
