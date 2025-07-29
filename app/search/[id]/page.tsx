import { Metadata } from 'next';
import Image from 'next/image';
import { use } from 'react';
import WishlistButton from './WishListButton';

// ✅ NATÍV NEXT 15 PARAMS kezelés: Promise → use() használata

export function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  // használhatsz await-et vagy itt is use() – mindkettő jó
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
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-purple-100 px-6 py-10'>
      <div className='max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6'>
        <div className='flex flex-col md:flex-row gap-6 items-start'>
          <Image
            src={releaseData.images?.[0]?.resource_url || '/placeholder.jpg'}
            alt={masterData.title}
            width={256}
            height={256}
            className='rounded shadow-lg object-cover w-full'
          />

          <div className='flex-1'>
            <h1 className='text-3xl font-bold text-gray-900 mb-2'>
              {masterData.title}
            </h1>
            <p className='text-lg text-gray-700 mb-1 font-medium'>
              {masterData.artists?.map((artist: any) => artist.name).join(', ')}
            </p>
            {masterData.year && (
              <p className='text-sm text-gray-500 mb-4'>
                Megjelenés éve: {masterData.year}
              </p>
            )}

            {releaseData.labels?.length > 0 && (
              <p className='text-sm text-gray-500'>
                Kiadó:{' '}
                <span className='font-medium'>
                  {releaseData.labels[0].name}
                </span>
              </p>
            )}
            {releaseData.country && (
              <p className='text-sm text-gray-500'>
                Ország: {releaseData.country}
              </p>
            )}
          </div>
        </div>

        {/* Tracklista */}
        {masterData.tracklist && masterData.tracklist.length > 0 && (
          <div className='mt-8'>
            <h2 className='text-xl font-semibold text-gray-800 mb-4'>
              Tracklista
            </h2>
            <ul className='space-y-2 text-gray-700 list-disc list-inside'>
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
        <div className='mt-12 flex flex-wrap gap-4'>
          <WishlistButton
          id={masterData.id}
            author={masterData.artists?.[0]?.name ?? '-'}
            title={masterData.title}
          />
          <button
            type='button'
            className='text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 rounded-lg text-sm px-5 py-2.5'
          >
            Megszerezve
          </button>
        </div>
      </div>
    </div>
  );
}
