import { Metadata } from 'next';
import Image from 'next/image';
import { use } from 'react';
import WishlistButton from './WishListButton';
import BackButton from '@/app/components/BackButton';

export function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  return params.then(({ id }) => ({
    title: `Lemez: ${id}`,
  }));
}

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const masterData = use(
    fetch(`https://api.discogs.com/masters/${id}`).then((res) => res.json())
  );
  const releaseData = use(
    fetch(`https://api.discogs.com/releases/${masterData.main_release}`).then(
      (res) => res.json()
    )
  );

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-purple-100 px-4 py-10'>
      <div className='max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden p-6 md:p-10'>
        <BackButton /> 
        <div className='flex flex-col md:flex-row gap-8 items-start'>
          {/* Lemezborító */}
          <div className='w-full md:w-1/3'>
            <Image
              src={releaseData.images?.[0]?.resource_url || '/placeholder.jpg'}
              alt={masterData.title}
              width={400}
              height={400}
              className='rounded-xl shadow-md w-full object-cover aspect-square'
            />
          </div>

          {/* Lemez információk */}
          <div className='flex-1'>
            <h1 className='text-4xl font-bold text-center text-gray-900 mb-3'>
              {masterData.title}
            </h1>

            <p className='text-xl text-gray-700 mb-1 font-medium'>
              {masterData.artists?.map((artist: any) => artist.name).join(', ')}
            </p>

            {masterData.year && (
              <p className='text-sm text-gray-500 mb-2'>
                Megjelenés éve: <strong>{masterData.year}</strong>
              </p>
            )}

            <div className='text-sm text-gray-600 space-y-1 mt-4'>
              {releaseData.labels?.[0]?.name && (
                <p>
                  Kiadó: <strong>{releaseData.labels[0].name}</strong>
                </p>
              )}
              {releaseData.country && (
                <p>
                  Ország: <strong>{releaseData.country}</strong>
                </p>
              )}
              {masterData.genres && (
                <p>
                  Műfaj: <strong>{masterData.genres.join(', ')}</strong>
                </p>
              )}
              {masterData.styles && (
                <p>
                  Stílus: <strong>{masterData.styles.join(', ')}</strong>
                </p>
              )}
            </div>
          </div>
        </div>
        {/* Tracklista */}
        {masterData.tracklist?.length > 0 && (
          <div className='mt-10'>
            <h2 className='text-2xl font-semibold text-gray-800 mb-4'>
              Tracklista
            </h2>
            <ul className='grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-gray-700 text-sm list-disc list-inside'>
              {masterData.tracklist.map((track: any, idx: number) => (
                <li key={idx}>
                  {track.position && (
                    <span className='text-gray-500 mr-2'>{track.position}</span>
                  )}
                  {track.title}
                </li>
              ))}
            </ul>
          </div>
        )}
        {/* Gombok */}
        <div className='mt-12 flex flex-wrap gap-4'>
          <WishlistButton
            id={masterData.id}
            author={masterData.artists?.[0]?.name ?? '-'}
            title={masterData.title}
          />
          <button
            type='button'
            className='text-white bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 transition'
          >
            Megszerezve
          </button>
        </div>
      </div>
    </div>
  );
}
