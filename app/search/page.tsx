import { Suspense } from 'react';
import SearchClient from './SearchClient';

export default function Search() {
  return (
    <Suspense fallback={<div>Betöltés...</div>}>
      <SearchClient />
    </Suspense>
  );
}
