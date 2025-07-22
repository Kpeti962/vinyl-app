'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface VinylResult {
  id: number;
  title: string;
  cover_image: string;
}

const Search = () => {
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
          query,
        )}&type=master&token=lAvbnLFabuhjRNFvCpGyJbDNfdRCcdwpKZePCXov`,
      );
      const data = await res.json();
      setResults(data.results || []);
    } catch (error) {
      console.error('Hiba történt a keresés során:', error);
    } finally {
      setLoading(false);
    }
  };

  // 🔁 Debounce hatás: várunk 500ms-ot gépelés után
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      vinylsTable(search);
    }, 100); // 500 milisec várakozás

    return () => clearTimeout(delayDebounce);
  }, [search]);



  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder="Keresés"
          className="border border-gray-300 px-3 py-2 w-full"
        />
        <button
          onClick={() => vinylsTable(search)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading || !search.trim()}
        >
          {loading ? 'Keresés...' : 'Keresés'}
        </button>
      </div>

      <ul className="space-y-4">
        {results.map((item) => (
          <li key={item.id}>
            <Link
              href={`/search/${item.id}`}
              className="flex items-center gap-4 border-b pb-2"
              target="_blank"
            >
              <Image
                src={item.cover_image}
                alt={item.title}
                className="w-16 h-16 object-cover rounded"
                width={424}
                height={424}
              />
              <span className="text-gray-800 font-medium">{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
