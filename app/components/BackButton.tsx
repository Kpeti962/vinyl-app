'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className='cursor-pointer inline-flex items-center text-sm text-black hover:text-gray-500 font-medium mb-6'
    >
      <svg
      className='mr-2 hover:scale-110 hover:rotate-360 transition-transform duration-500'
        fill='#000000'
        height='30px'
        width='30px'
        version='1.1'
        id='Layer_1'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 512 512'
      >
        <g id='SVGRepo_bgCarrier' stroke-width='0' />

        <g
          id='SVGRepo_tracerCarrier'
          stroke-linecap='round'
          stroke-linejoin='round'
        />

        <g id='SVGRepo_iconCarrier'>
          {' '}
          <g>
            {' '}
            <g>
              {' '}
              <polygon points='213.675,255.998 298.667,304.574 298.667,207.422 ' />{' '}
            </g>{' '}
          </g>{' '}
          <g>
            {' '}
            <g>
              {' '}
              <path d='M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M341.334,341.333h-0.001 c0,7.595-4.032,14.635-10.624,18.453c-3.307,1.92-6.997,2.88-10.709,2.88c-3.648,0-7.317-0.939-10.581-2.816l-149.333-85.333 c-6.656-3.797-10.752-10.859-10.752-18.517c0-7.658,4.096-14.72,10.752-18.517l149.333-85.333 c6.592-3.776,14.72-3.755,21.291,0.064c6.592,3.819,10.624,10.859,10.624,18.453V341.333z' />{' '}
            </g>{' '}
          </g>{' '}
        </g>
      </svg>
      Vissza
    </button>
  );
}
