// app/error/network-error/page.tsx
import dynamic from 'next/dynamic';
import React from 'react';

const ERR_NETWORKPage = dynamic(() => import('../../src/Pages/ErrorPages/Server/ERR_NETWORK.tsx'), { ssr: false });

export default function NetworkError() {
    return <ERR_NETWORKPage />;
}
