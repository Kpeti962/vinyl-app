'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface OwnedVinyl {
  id: number;
  author: string;
  title: string;
  acquiredAt: string; // vagy Date, ha akarod feldolgozni
}

const OwnedVinyls = () => {
  const [data, setData] = useState<OwnedVinyl[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOwnedVinyls = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('/api/ownedVinyls');
        setData(response.data);
      } catch (err: any) {
        setError(err.message || 'Hiba történt az adatok lekérésekor');
      } finally {
        setLoading(false);
      }
    };

    fetchOwnedVinyls();
  }, []);

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold mb-6 text-center text-indigo-700">Acquired vinyls</h1>

      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-600 font-medium">Error: {error}</p>}
      {!loading && !error && data.length === 0 && <p className="text-center text-gray-600">No acquired vinyls.</p>}

      <ul className="space-y-3">
        {data.map(({ id, author, title, acquiredAt }) => (
          <li key={id} className="bg-indigo-50 rounded-md p-4 hover:bg-indigo-100 transition">
            <div className="flex justify-between">
              <div>
                <span className="font-medium text-indigo-900">{author}</span> - <span className="italic text-indigo-700">{title}</span>
              </div>
              <time className="text-sm text-gray-500" dateTime={acquiredAt}>
                {new Date(acquiredAt).toLocaleDateString()}
              </time>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OwnedVinyls;
