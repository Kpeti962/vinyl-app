'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import React, { useEffect, useState } from 'react';


interface VinylResult {
  id: number;
  title: string;
  cover_image: string;
}

const SearchClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<VinylResult[]>([]);
  const [loading, setLoading] = useState(false);

  const vinylsTable = async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        `https://api.discogs.com/database/search?q=${encodeURIComponent(
          query
        )}&type=master&token=${process.env.NEXT_PUBLIC_DISCOGS_TOKEN}`
      );
      const data = await res.json();
      setResults(data.results || []);
    } catch (error) {
      console.error('Search error', error);
    } finally {
      setLoading(false);
    }
  };

  // 🔁 Debounce hatás: várunk 500ms-ot gépelés után
  useEffect(() => {
     const delayDebounce = setTimeout(() => {
    if (search.trim()) {
      const query = new URLSearchParams();
      query.set('q', search);
      router.replace(`?${query.toString()}`); // frissíti az URL-t keresés közben
      vinylsTable(search);
    }
  }, 300);

  return () => clearTimeout(delayDebounce);
  }, [search]);

  useEffect(() => {
  const query = searchParams.get('q');
  if (query) {
    setSearch(query);
    vinylsTable(query);
  }
}, []);

  return (
    <div className='p-6 max-w-xl mx-auto'>
      <div className='mb-4 flex gap-2'>
        <input
          type='text'
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder='Search for vinyl...'
          className='border border-gray-300 px-3 py-2 w-full'
        />
        <button
          onClick={() => vinylsTable(search)}
          className='bg-blue-600 text-white px-4 py-2 rounded'
          disabled={loading || !search.trim()}
        >
          {loading ? 'Searching...' : 'Searching'}
        </button>
      </div>

      <ul className='space-y-4'>
        {results.map((item) => (
          
          <li key={item.id}>
            <div className='flex items-center justify-between' key={item.id}  >
              <div className='flex items-center gap-4'>

              <Image
                src={item.cover_image}
                alt={item.title}
                className='w-16 h-16 object-cover rounded'
                width={424}
                height={424}
                />
              <span className='text-gray-800 font-medium'>{item.title}</span>
                </div>
            <Link
              href={`/search/${item.id.toString()}`}
              className="ml-2 px-3 py-1 rounded bg-indigo-100 text-indigo-800 hover:bg-indigo-200 text-sm"              
            >
              Details
            </Link>
              </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchClient;