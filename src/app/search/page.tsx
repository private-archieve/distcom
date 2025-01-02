// app/search/page.tsx
import dynamic from 'next/dynamic';
import React from 'react';

const SearchPage = dynamic(() => import('../../src/Pages/Search/SearchPage.tsx'), { ssr: false });

export default function Search() {
    return <SearchPage />;
}
