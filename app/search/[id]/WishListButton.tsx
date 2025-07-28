'use client';

import React, { useState } from 'react';

interface WishlistButtonProps {
  author: string;
  title: string;
}

export default function WishlistButton({ author, title }: WishlistButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const saveToWishlist = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch('/api/myvinyls', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author, title }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Hiba a mentés során');
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Hiba történt');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={saveToWishlist}
      disabled={loading}
      className="text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 rounded-lg text-sm px-5 py-2.5"
    >
      {loading ? 'Mentés...' : success ? 'Mentve!' : 'Kívánságlistához'}
      {error && <p className="text-red-400 mt-2 text-xs">{error}</p>}
    </button>
  );
}
