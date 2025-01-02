// app/communication/page.tsx
import dynamic from 'next/dynamic';
import React from 'react';

const CommunicationPage = dynamic(() => import('../../src/Pages/Communication/CommunicationPage.tsx'), { ssr: false });

export default function Communication() {
    return <CommunicationPage />;
}
