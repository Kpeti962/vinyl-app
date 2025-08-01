import Image from 'next/image';
import React from 'react';

export default function Home() {
  return (
    <main
      className='
      min-h-[calc(100vh-56px)] flex flex-col items-center justify-center
      bg-gradient-to-br from-indigo-950 via-zinc-900 to-black
      py-16 px-4'
    >
      {/* Lemez/logó kép */}
      <div className='mb-7 drop-shadow-2xl'>
        <svg
          className='animate-spin-slow'
          fill='#BBBBBB'
          height='250px'
          width='250px'
          version='1.1'
          id='Layer_1'
          xmlns='http://www.w3.org/2000/svg'
          xmlnsXlink='http://www.w3.org/1999/xlink'
          viewBox='0 0 512 512'
          xmlSpace='preserve'
        >
          <g>
            <g>
              <path
                d='M256,0C114.84,0,0,114.84,0,256s114.84,256,256,256s256-114.84,256-256S397.16,0,256,0z M435.852,248c4.416,0,8,3.584,8,8
			c0,103.584-84.268,187.852-187.852,187.852c-4.416,0-8-3.584-8-8c0-4.416,3.584-8,8-8c94.756,0,171.852-77.092,171.852-171.852
			C427.852,251.584,431.432,248,435.852,248z M404.108,248c4.416,0,8,3.584,8,8c0,86.08-70.032,156.108-156.108,156.108
			c-4.416,0-8-3.584-8-8c0-4.416,3.584-8,8-8c77.256,0,140.108-62.852,140.108-140.108C396.108,251.584,399.692,248,404.108,248z
			 M371.784,248c4.416,0,8,3.584,8,8c0,68.252-55.532,123.784-123.784,123.784c-4.416,0-8-3.584-8-8c0-4.416,3.584-8,8-8
			c59.432,0,107.784-48.352,107.784-107.784C363.784,251.584,367.368,248,371.784,248z M44.492,264c-4.416,0-8-3.584-8-8
			c0-121.036,98.472-219.508,219.508-219.508c4.416,0,8,3.584,8,8s-3.584,8-8,8C143.784,52.492,52.492,143.784,52.492,256
			C52.492,260.416,48.912,264,44.492,264z M76.148,264c-4.416,0-8-3.584-8-8c0-103.584,84.268-187.852,187.852-187.852
			c4.416,0,8,3.584,8,8c0,4.416-3.584,8-8,8C161.244,84.148,84.148,161.24,84.148,256C84.148,260.416,80.568,264,76.148,264z
			 M107.892,264c-4.416,0-8-3.584-8-8c0-86.08,70.032-156.108,156.108-156.108c4.416,0,8,3.584,8,8c0,4.416-3.584,8-8,8
			c-77.256,0-140.108,62.852-140.108,140.108C115.892,260.416,112.308,264,107.892,264z M140.216,264c-4.416,0-8-3.584-8-8
			c0-68.252,55.532-123.784,123.784-123.784c4.416,0,8,3.584,8,8s-3.584,8-8,8c-59.432,0-107.784,48.352-107.784,107.784
			C148.216,260.416,144.632,264,140.216,264z M176.288,256c0-43.952,35.756-79.712,79.712-79.712s79.712,35.76,79.712,79.712
			c0,43.952-35.76,79.712-79.712,79.712C212.048,335.712,176.288,299.952,176.288,256z M256,475.508c-4.416,0-8-3.584-8-8
			c0-4.416,3.584-8,8-8c112.216,0,203.508-91.292,203.508-203.508c0-4.416,3.584-8,8-8c4.416,0,8,3.584,8,8
			C475.508,377.036,377.036,475.508,256,475.508z'
              />
            </g>
          </g>
          <g>
            <g>
              <path
                d='M256,236.112c-10.968,0-19.892,8.92-19.892,19.888s8.92,19.888,19.892,19.888c10.964,0,19.888-8.92,19.888-19.888
			C275.888,245.032,266.964,236.112,256,236.112z'
              />
            </g>
          </g>
        </svg>
      </div>

      {/* Főcím és szöveg */}
      <h1 className='text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-3 tracking-tight text-center'>
        Lemezeim
      </h1>
      <p className='text-indigo-100 text-lg md:text-2xl text-center max-w-2xl mb-10 font-medium'>
        Fedezd fel, rendszerezd és bővítsd bakelitgyűjteményed a{' '}
        <span className='text-pink-300 font-semibold'>Bakeliteka</span> oldalán!
      </p>

      {/* Akciógomb (ikon, átmenet, árnyék) */}
      <a
        href='/owned'
        className='
    inline-flex items-center gap-2
    bg-gradient-to-r from-indigo-900 via-zinc-900 to-black
    hover:from-indigo-800 hover:via-zinc-800 hover:to-black
    text-white font-bold py-3 px-10 rounded-full shadow-2xl transition-all duration-200
    text-lg tracking-wide group
  '
      >
        {/* Ikont ha szeretnél, bent hagyhatod */}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='w-6 h-6 mr-2 group-hover:scale-110 transition-transform duration-200'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={2}
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M12 8v4l3 3' />
          <circle
            cx='12'
            cy='12'
            r='10'
            stroke='currentColor'
            strokeWidth='2'
            fill='none'
          />
        </svg>
        Saját gyűjtemény megtekintése
      </a>
    </main>
  );
}
