'use client';

import React, { useEffect, useState } from 'react';

interface Vinyl {
  id: number;
  author: string;
  title: string;
}

const WishList = () => {
  const [data, setData] = useState<Vinyl[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Ha szeretnél paramétereket (author, title), azt query stringben kell küldeni
  const author = ''; // vagy állapotból, vagy propként kapod
  const title = '';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Építsd meg a query stringet, ha author vagy title van
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
        setData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [author, title]);

  if (loading) return <p>Betöltés...</p>;
  if (error) return <p className='text-red-500'>Hiba: {error}</p>;

  return (
    <div>
      <h1>Kívánságlista</h1>
      {data.length === 0 && <p>Nincs elmentett bakelit.</p>}
      <ul>
        {data.map((vinyl) => (
          <li key={vinyl.id}>
            {vinyl.author} - {vinyl.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WishList;
