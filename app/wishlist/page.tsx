'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface Vinyl {
  id: number;
  author: string;
  title: string;
  acquired?: boolean;
}

const WishList = () => {
  const [data, setData] = useState<Vinyl[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const id = '';
  const author = '';
  const title = '';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const idNum = Number(id);
        const params = new URLSearchParams();
        if (!isNaN(idNum) && id !== '') {
          params.append('id', idNum.toString());
        }
        if (author) params.append('author', author);
        if (title) params.append('title', title);

        const response = await fetch(`/api/wishedvinyls?${params.toString()}`);
        if (!response.ok) throw new Error('Failed to fetch wishlist');

        const result: Vinyl[] = await response.json();
        setData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, author, title]);

  const deleteItem = async (id: number) => {
    try {
      await axios.delete(`/api/wishedvinyls/${id}`);
      setData((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error', error);
    }
  };

  const toggleAcquired = async (id: number) => {
    try {
      const item = data.find((d) => d.id === id);
      if (!item) return;

      if (!item.acquired) {
        await axios.post('/api/acquisition', { vinylId: id });
        setData((prev) =>
          prev.map((vinyl) =>
            vinyl.id === id ? { ...vinyl, acquired: true } : vinyl
          )
        );
      } else {
        await axios.delete(`/api/acquisition?vinylId=${id}`);
        setData((prev) =>
          prev.map((vinyl) =>
            vinyl.id === id ? { ...vinyl, acquired: false } : vinyl
          )
        );
      }
    } catch (error) {
      console.error('An error occurred while modifying the acquisition:', error);
    }
  };

  const wished = data.filter((vinyl) => !vinyl.acquired);
  const acquired = data.filter((vinyl) => vinyl.acquired);

  return (
    <div className='max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md'>
      <h1 className='text-3xl font-semibold mb-6 text-center text-indigo-700'>
        Wishlist
      </h1>

      {loading && <p className='text-center text-gray-500'>Loading...</p>}
      {error && (
        <p className='text-center text-red-600 font-medium'>{`Error: ${error}`}</p>
      )}

      {!loading && !error && data.length === 0 && (
        <p className='text-center text-gray-600'>There is no saved vinyl.</p>
      )}

      {!loading && !error && data.length > 0 && (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <h2 className='text-xl font-semibold text-indigo-800 mb-4'>
              Wishlist
            </h2>
            {wished.length === 0 ? (
              <p className='text-gray-500'>You got all the vinyls  🎉</p>
            ) : (
              <ul className='space-y-3'>
                {wished.map(({ id, author, title }) => (
                  <li
                    key={id}
                    className='flex flex-col sm:flex-row sm:justify-between items-center bg-indigo-50 rounded-md p-4 hover:bg-indigo-100 transition'
                  >
                    <a href={`/search/${id.toString()}`}>
                      <div>
                        <span className='font-medium text-indigo-900'>
                          {author}
                        </span>{' '}
                        -{' '}
                        <span className='text-indigo-700 italic'>{title}</span>
                      </div>
                    </a>
                    <div className='flex space-x-2'>
                      <button
                        onClick={() => toggleAcquired(id)}
                        className='px-3 py-1 rounded text-sm font-medium bg-gray-300 text-gray-700 hover:bg-gray-400 transition'
                      >
                        Acquired
                      </button>
                      <button
                        onClick={() => deleteItem(id)}
                        className='px-3 py-1 rounded text-sm font-medium text-red-700 bg-red-100 hover:bg-red-200 transition'
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <h2 className='text-xl font-semibold text-green-800 mb-4'>
              Acquired
            </h2>
            {acquired.length === 0 ? (
              <p className='text-gray-500'>Még semmit sem szereztél meg.</p>
            ) : (
              <ul className='space-y-3'>
                {acquired.map(({ id, author, title }) => (
                  <li
                    key={id}
                    className='flex flex-col sm:flex-row sm:justify-between items-center bg-green-50 rounded-md p-4 hover:bg-green-100 transition'
                  >
                    <a href={`/search/${id.toString()}`}>
                      <div>
                        <span className='font-medium text-green-900 line-through'>
                          {author}
                        </span>{' '}
                        -{' '}
                        <span className='text-green-700 italic line-through'>
                          {title}
                        </span>
                      </div>
                    </a>
                    <div className='flex space-x-2'>
                      <button
                        onClick={() => toggleAcquired(id)}
                        className='px-3 py-1 rounded text-sm font-medium bg-green-500 text-white hover:bg-green-600 transition'
                      >
                        Cancel
                      </button>
                     
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WishList;
