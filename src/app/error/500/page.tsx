// app/error/500/page.tsx
import dynamic from 'next/dynamic';
import React from 'react';

const ServerErrorPage = dynamic(() => import('../../src/Pages/ErrorPages/500/500.tsx'), { ssr: false });

export default function Custom500() {
    return <ServerErrorPage />;
}
