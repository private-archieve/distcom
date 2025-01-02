// app/profile/[username]/page.tsx
'use client';

import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import React from 'react';

const ProfilePage = dynamic(() => import('../../src/Pages/Profile/Profile.tsx'), { ssr: false });

export default function ProfileDetailPage() {
    const params = useParams();
    const { username } = params;

    return <ProfilePage username={username} />;
}
