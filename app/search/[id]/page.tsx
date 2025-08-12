import Image from 'next/image';
import Link from 'next/link';
import { use } from 'react';
import WishlistButton from './WishListButton';
import BackButton from '@/app/components/BackButton';
import { Metadata } from 'next';
import MarkOwnedButton from './MarkOwnedButton';

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
  console.log(releaseData, 'releasedate');

//youtube helper

function getEmbedUrl(video: any): string {
  try {
    const url = new URL(video.uri);
    if (
      url.hostname === 'www.youtube.com' ||
      url.hostname === 'youtube.com'
    ) {
      // watch?v=xxx => embed/xxx
      const id = url.searchParams.get('v');
      if (id) {
        return `https://www.youtube.com/embed/${id}`;
      }
      // playlist, stb. extra esetek kezelése...
    }
    if (url.hostname === 'youtu.be') {
      // youtu.be/xxx
      return `https://www.youtube.com/embed${url.pathname}`;
    }
    if (url.hostname.includes('vimeo.com')) {
      // vimeo.com/123456789
      const parts = url.pathname.split('/');
      const vimeoId = parts[parts.length - 1];
      return `https://player.vimeo.com/video/${vimeoId}`;
    }
    // Default: fallback az eredeti uri-ra
    return video.uri;
  } catch {
    return video.uri;
  }
}


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
                    <span className='font-semibold'>Year:</span>{' '}
                    {masterData.year}
                  </p>
                )}

                {releaseData.labels?.[0]?.name && (
                  <p>
                    <span className='font-semibold'>Publisher:</span>{' '}
                    {releaseData.labels[0].name}
                  </p>
                )}

                {releaseData.country && (
                  <p>
                    <span className='font-semibold'>Country:</span>{' '}
                    {releaseData.country}
                  </p>
                )}

                {masterData.genres && (
                  <p>
                    <span className='font-semibold'>Genre:</span>{' '}
                    {masterData.genres.join(', ')}
                  </p>
                )}

                {masterData.styles && (
                  <p>
                    <span className='font-semibold'>Style:</span>{' '}
                    {masterData.styles.join(', ')}
                  </p>
                )}
              </div>
            </div>

            {/* Árak, price suggestions */}
            {releaseData.lowest_price && (
              <p>
                <span className='font-semibold'>Lowest price: </span>{' '}
                {releaseData.lowest_price} USD
              </p>
            )}
          </div>
        </div>
        {/* Gombok */}
        <div className='mt-12 flex flex-wrap gap-4 justify-center md:justify-start'>
          <WishlistButton
            id={masterData.id}
            author={masterData.artists?.[0]?.name ?? '-'}
            title={masterData.title}
          />
          <MarkOwnedButton
            id={masterData.id}
            author={masterData.artists?.[0]?.name ?? ''}
            title={masterData.title}
          />
        </div>

        {/* Tracklista */}
        {masterData.tracklist?.length > 0 && (
          <div className='mt-10 max-w-4xl mx-auto'>
            <h2 className='text-3xl text-center md:text-start font-semibold text-gray-800 mb-5 border-b border-gray-300 pb-2'>
              Tracklist
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
        {/* Videók megjelenítése */}
        {releaseData.videos && releaseData.videos.length > 0 && (
  <section className='mt-10 max-w-4xl mx-auto'>
    <h2 className='text-3xl font-semibold text-gray-800 mb-5 border-b border-gray-300 pb-2 text-center md:text-start'>
      Videos
    </h2>
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
      {releaseData.videos.map((video: any, index: number) => (
        <div key={index} className='aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-md'>
          {video.title && (
            <p className='mb-2 mt-2 text-center text-sm text-gray-600 font-medium'>
              {video.title}
            </p>
          )}
          <iframe
            width='560'
            height='315'
            src={getEmbedUrl(video)}
            title={video.title ?? `Video ${index + 1}`}
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            referrerPolicy='strict-origin-when-cross-origin'
            allowFullScreen
            ></iframe>
        </div>
      ))}
    </div>
  </section>
)}


        
      </div>
    </div>
  );
}
