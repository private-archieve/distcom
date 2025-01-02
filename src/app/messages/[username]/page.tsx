// app/messages/[username]/page.tsx
'use client';

import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import React from 'react';

const MessagePage = dynamic(() => import('../../src/Pages/Message/MessagePage.tsx'), { ssr: false });

export default function MessageDetailPage() {
    const params = useParams();
    const { username } = params;

    return <MessagePage username={username} />;
}
