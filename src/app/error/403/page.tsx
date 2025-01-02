// app/error/403/page.tsx
import dynamic from 'next/dynamic';
import React from 'react';

const ForbiddenPage = dynamic(() => import('../../src/Pages/ErrorPages/403/403.tsx'), { ssr: false });

export default function Custom403() {
    return <ForbiddenPage />;
}
