// app/search/[id]/page.tsx
import { Metadata } from 'next';
import Image from 'next/image';

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Lemez: ${params.id}`,
  };
}

export default async function ResultPage({ params }: Props) {
  const res = await fetch(`https://api.discogs.com/masters/${params.id}`);
  const data = await res.json();

  const mainReleaseId = data.main_release;
  const releaseRes = await fetch(
    `https://api.discogs.com/releases/${mainReleaseId}`
  );
  const releaseData = await releaseRes.json();

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-purple-100 px-6 py-10'>
      <div className='max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6'>
        {/* Fejlesztett fejléc */}
        <div className='flex flex-col md:flex-row gap-6 items-start'>
          <Image
            src={releaseData.images?.[0]?.resource_url || '/placeholder.jpg'}
            alt={data.title}
            className='w-full md:w-64 h-auto object-cover rounded shadow-lg'
          />

          {/* Album adatok */}
          <div className='flex-1'>
            <h1 className='text-3xl font-bold text-gray-900 mb-2'>
              {data.title}
            </h1>
            <p className='text-lg text-gray-700 mb-1 font-medium'>
              {data.artists?.map((artist: any) => artist.name).join(', ')}
            </p>
            {data.year && (
              <p className='text-sm text-gray-500 mb-4'>
                Megjelenés éve: {data.year}
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
        {data.tracklist && data.tracklist.length > 0 && (
          <div className='mt-8'>
            <h2 className='text-xl font-semibold text-gray-800 mb-4'>
              Tracklista
            </h2>
            <ul className='space-y-2 text-gray-700 list-disc list-inside'>
              {data.tracklist.map((track: any, idx: number) => (
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
        <div className='mt-12 flex flex-col md:flex-row w-full sm:w-2/3 md:w-full m-auto'>
          <button
            type='button'
            className='cursor-pointer text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'
          >
            Kívánságlistához
          </button>
          <button
            type='button'
            className='cursor-pointer focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900'
          >
            Megszerezve
          </button>
        </div>
      </div>
    </div>
  );
}
