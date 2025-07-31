import Image from 'next/image';
import Link from 'next/link';
import { use } from 'react';
import WishlistButton from './WishListButton';
import BackButton from '@/app/components/BackButton';
import { Metadata } from 'next';

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

  const priceSuggestions = use(
    fetch(
      `https://api.discogs.com/marketplace/price_suggestions/${releaseData.id}`,
      {
        headers: {
          Authorization: `Discogs token=${process.env.NEXT_PUBLIC_DISCOGS_TOKEN}`,
        },
        cache: 'force-cache',
      }
    ).then((res) => res.json())
  );

  // Átlagár kiszámítás helper
  const calculateAverage = () => {
    if (!priceSuggestions) return null;
    const values = Object.values(priceSuggestions)
      .map((info) => (info as { value: number }).value)
      .filter((v) => typeof v === 'number' && !isNaN(v));
    if (values.length === 0) return null;
    const sum = values.reduce((acc, curr) => acc + curr, 0);
    return Math.round((sum / values.length) * 100) / 100;
  };

  const avgPrice = calculateAverage();
  const currency = (Object.values(priceSuggestions)[0] as { currency?: string })?.currency || '';

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-purple-100 px-6 py-10'>
      <div className='max-w-6xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden p-8 md:p-12'>
        <BackButton />
        <div className='flex flex-col md:flex-row gap-10 items-center md:items-start '>
          {/* Lemezborító */}
          <div className='w-full md:w-1/3 rounded-xl overflow-hidden shadow-lg flex justify-center items-center bg-gray-100'>
            <Image
              src={releaseData.images?.[0]?.resource_url || '/placeholder.jpg'}
              alt={masterData.title}
              width={400}
              height={400}
              className='w-full h-auto object-cover'
              priority
            />
          </div>

          {/* Lemezinformációk és árak */}
          <div className='flex-1 flex flex-col gap-6'>
            <div>
              <h1 className='text-4xl font-extrabold text-gray-900 mb-2 text-center md:text-left'>
                {masterData.title}
              </h1>
              <p className='text-xl text-indigo-700 font-semibold mb-1 text-center md:text-left'>
                {masterData.artists
                  ?.map((artist: any) => artist.name)
                  .join(', ')}
              </p>

              <div className='text-sm text-gray-600 space-y-1 mt-4 max-w-md mx-auto md:mx-0'>
                {masterData.year && (
                  <p>
                    <span className='font-semibold'>Megjelenés éve:</span>{' '}
                    {masterData.year}
                  </p>
                )}

                {releaseData.labels?.[0]?.name && (
                  <p>
                    <span className='font-semibold'>Kiadó:</span>{' '}
                    {releaseData.labels[0].name}
                  </p>
                )}

                {releaseData.country && (
                  <p>
                    <span className='font-semibold'>Ország:</span>{' '}
                    {releaseData.country}
                  </p>
                )}

                {masterData.genres && (
                  <p>
                    <span className='font-semibold'>Műfaj:</span>{' '}
                    {masterData.genres.join(', ')}
                  </p>
                )}

                {masterData.styles && (
                  <p>
                    <span className='font-semibold'>Stílus:</span>{' '}
                    {masterData.styles.join(', ')}
                  </p>
                )}
              </div>
            </div>

            {/* Árak, price suggestions */}
            {priceSuggestions && Object.keys(priceSuggestions).length > 0 && (
              <section className='bg-indigo-50 p-5 rounded-lg shadow-inner max-w-md mx-auto md:mx-0'>
                <h2 className='text-2xl font-semibold text-indigo-900 mb-4 border-b border-indigo-300 pb-2'>
                  Ár-javaslatok (Discogs)
                </h2>

                {avgPrice !== null && (
                  <p className='text-lg font-bold mb-4 text-indigo-800'>
                    Átlagár: {avgPrice} {currency}
                  </p>
                )}

                <ul className='divide-y divide-indigo-200 max-h-88 overflow-y-auto'>
                  {Object.entries(priceSuggestions)
                    .reverse()
                    .map(([condition, info]) => {
                      const val = info as { value: number; currency: string };
                      const valueRounded = Math.round(val.value * 100) / 100;
                      return (
                        <li
                          key={condition}
                          className='flex justify-between py-2 px-3 hover:bg-indigo-100 rounded'
                        >
                          <span className='font-medium'>{condition}</span>
                          <span>
                            {valueRounded} {val.currency}
                          </span>
                        </li>
                      );
                    })}
                </ul>
              </section>
            )}
          </div>
        </div>

        {/* Tracklista */}
        {masterData.tracklist?.length > 0 && (
          <div className='mt-10 max-w-4xl mx-auto'>
            <h2 className='text-3xl text-center md:text-start font-semibold text-gray-800 mb-5 border-b border-gray-300 pb-2'>
              Tracklista
            </h2>
            <ul className='grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-gray-700 text-base list-disc list-inside'>
              {masterData.tracklist.map((track: any, idx: number) => (
                <li
                  key={idx}
                  className='hover:text-indigo-600 transition-colors'
                >
                  {track.position && (
                    <span className='text-gray-500 mr-3'>{track.position}</span>
                  )}
                  {track.title}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Gombok */}
        <div className='mt-12 flex flex-wrap gap-4 justify-center md:justify-start'>
          <WishlistButton
            id={masterData.id}
            author={masterData.artists?.[0]?.name ?? '-'}
            title={masterData.title}
          />
          <button
            type='button'
            className='bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-300 text-white font-semibold rounded-lg text-sm px-6 py-3 transition-shadow shadow-md'
          >
            Megszerezve
          </button>
        </div>
      </div>
    </div>
  );
}
