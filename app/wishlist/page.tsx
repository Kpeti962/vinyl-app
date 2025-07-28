'use client';

import React, { useEffect, useState } from 'react';

interface Vinyl {
  id: number;
  author: string;
  title: string;
  acquired?: boolean; // Megszerezve státusz
}

const WishList = () => {
  const [data, setData] = useState<Vinyl[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Ide akár propként vagy state-ként kapod meg a szűrőket
  const author = '';
  const title = '';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();
        if (author) params.append('author', author);
        if (title) params.append('title', title);

        const response = await fetch(`/api/myvinyls?${params.toString()}`, {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error('Hiba az adatlekérés során');
        }

        const result: Vinyl[] = await response.json();
        // Alapértelmezés szerint nincs megszerezve
        const withAcquired = result.map(vinyl => ({ ...vinyl, acquired: false }));
        setData(withAcquired);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [author, title]);

  // Törlés funkció
  const handleDelete = (id: number) => {
    setData((prev) => prev.filter(vinyl => vinyl.id !== id));
    // Itt tudnál API hívást is indítani, ha távoli törlés kell
  };

  // Megszerezve állapot kapcsolása
  const toggleAcquired = (id: number) => {
    setData((prev) =>
      prev.map(vinyl =>
        vinyl.id === id ? { ...vinyl, acquired: !vinyl.acquired } : vinyl
      )
    );
    // Itt API hívás szintén beilleszthető, ha backend oldalt is frissítenél
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold mb-6 text-center text-indigo-700">Kívánságlista</h1>

      {loading && (
        <p className="text-center text-gray-500">Betöltés...</p>
      )}

      {error && (
        <p className="text-center text-red-600 font-medium">{`Hiba: ${error}`}</p>
      )}

      {!loading && !error && data.length === 0 && (
        <p className="text-center text-gray-600">Nincs elmentett bakelit.</p>
      )}

      {!loading && !error && data.length > 0 && (
        <ul className="space-y-3">
          {data.map(({ id, author, title, acquired }) => (
            <li
              key={id}
              className="flex justify-between items-center bg-indigo-50 rounded-md p-4 hover:bg-indigo-100 transition"
            >
              <div>
                <span
                  className={`font-medium text-indigo-900 ${acquired ? 'line-through opacity-60' : ''}`}
                >
                  {author}
                </span>{' '}
                -{' '}
                <span className={`text-indigo-700 italic ${acquired ? 'line-through opacity-60' : ''}`}>
                  {title}
                </span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => toggleAcquired(id)}
                  className={`px-3 py-1 rounded text-sm font-medium transition ${
                    acquired
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                  }`}
                  aria-label={acquired ? 'Megszerezve visszavonása' : 'Megszerezve'}
                >
                  {acquired ? 'Megszerezve' : 'Megszerezve'}
                </button>
                <button
                  onClick={() => handleDelete(id)}
                  className="px-3 py-1 rounded text-sm font-medium text-red-700 bg-red-100 hover:bg-red-200 transition"
                  aria-label="Törlés"
                >
                  Törlés
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WishList;
