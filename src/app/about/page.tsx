// app/about/page.tsx
import dynamic from 'next/dynamic';
import React from 'react';

const AboutPage = dynamic(() => import('../../src/Pages/About/About.tsx'), { ssr: false });

export default function About() {
    return <AboutPage />;
}
