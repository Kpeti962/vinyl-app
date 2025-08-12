'use client';

import React, { useState } from 'react';

interface MarkOwnedButtonProps {
  id: number;
  author: string;
  title: string;
}

export default function MarkOwnedButton({
  id,
  
}: MarkOwnedButtonProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleMarkOwned = async () => {
    setLoading(true);
    setSuccess(false);
    setError(null);

    try {
      const wishlistRes = await fetch('/api/wishedvinyls', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: id,
          
        }),
      });

      if (!wishlistRes.ok) {
        const data = await wishlistRes.json();
        throw new Error(data.error || 'Error occurred while adding to wishlist');
      }

      const acquisitionRes = await fetch('/api/acquisition', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vinylId: id,
        }),
      });

      if (!acquisitionRes.ok) {
        const data = await acquisitionRes.json();
        throw new Error(data.error || 'Error occurred while marking as owned');
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
    console.log('MarkOwnedButton: posting to wishlist with id:', id);
  };

  return (
    <div>
      <button
        type='button'
        className={`text-white font-semibold rounded-lg text-sm px-6 py-3 transition-shadow shadow-md ${
          loading
            ? 'bg-yellow-300 cursor-wait'
            : success
            ? 'bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-400'
            : 'bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-300'
        }`}
        onClick={handleMarkOwned}
        disabled={loading}
        aria-live="polite"
      >
        {loading
          ? 'Loading...'
          : success
          ? 'Acquired!'
          : 'Acquired'}
      </button>
      {error && <p className='mt-2 text-red-500 text-sm'>Error: {error}</p>}
    </div>
  );
}
