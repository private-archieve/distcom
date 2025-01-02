// app/error/404/page.tsx
import dynamic from 'next/dynamic';
import React from 'react';

const NotFoundPage = dynamic(() => import('../../src/Pages/ErrorPages/404/404.tsx'), { ssr: false });

export default function Custom404() {
    return <NotFoundPage />;
}
