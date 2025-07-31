'use client';

import React, { useState } from 'react';

interface MarkOwnedButtonProps {
  releaseId: number;
  author: string;
  title: string;
}

export default function MarkOwnedButton({
  releaseId,
  author,
  title,
}: MarkOwnedButtonProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleMarkOwned = async () => {
    setLoading(true);
    setSuccess(false);
    setError(null);

    try {
      const res = await fetch('/api/acquisition', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vinylId: releaseId,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Hiba a megszerzés során');
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Ismeretlen hiba történt');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        type='button'
        className={`text-white font-semibold rounded-lg text-sm px-6 py-3 transition-shadow shadow-md ${
          loading
            ? 'bg-yellow-300 cursor-wait'
            : 'bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-300'
        }`}
        onClick={handleMarkOwned}
        disabled={loading}
      >
        {loading ? 'Feldolgozás...' : success ? 'Megszerezve!' : 'Megszerezve'}
      </button>
      {error && <p className='mt-2 text-red-500 text-sm'>Hiba: {error}</p>}
    </div>
  );
}
