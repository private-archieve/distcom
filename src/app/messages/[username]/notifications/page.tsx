// app/[username]/notifications/page.tsx
'use client';

import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import React from 'react';

const NotificationsPage = dynamic(() => import('../../src/Pages/Notifications/NotificationsPage.tsx'), { ssr: false });

export default function Notifications() {
    const params = useParams();
    const { username } = params;

    return <NotificationsPage username={username} />;
}
