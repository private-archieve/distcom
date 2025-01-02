// app/profile/page.tsx
import dynamic from 'next/dynamic';
import React from 'react';

const ProfilePage = dynamic(() => import('../../src/Pages/Profile/Profile.tsx'), { ssr: false });

export default function Profile() {
    return <ProfilePage />;
}
