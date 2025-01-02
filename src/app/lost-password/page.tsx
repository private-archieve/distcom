// app/lost-password/page.tsx
import dynamic from 'next/dynamic';
import React from 'react';

const LostPasswordPage = dynamic(() => import('../../src/Pages/LostPassword/LostPasswordPage.tsx'), { ssr: false });

export default function LostPassword() {
    return <LostPasswordPage />;
}
