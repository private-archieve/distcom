// app/settings/page.tsx
import dynamic from 'next/dynamic';
import React from 'react';

const SettingsPage = dynamic(() => import('../../src/Pages/Settings/SettingsPage.tsx'), { ssr: false });

export default function Settings() {
    return <SettingsPage />;
}
