// app/[username]/activity/page.tsx
'use client';

import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import React from 'react';

const ActivityPage = dynamic(() => import('../../src/Pages/Activity/ActivityPage.tsx'), { ssr: false });

export default function Activity() {
    const params = useParams();
    const { username } = params;

    return <ActivityPage username={username} />;
}
