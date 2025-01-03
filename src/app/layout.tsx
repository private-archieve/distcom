import { Toaster } from '@/components/ui/toaster';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import React from 'react';
import './globals.css';


export const metadata = {
    title: 'Distcom',
    description: 'Distcom is a social media platform for connecting with friends and family.',
    icons: {
        icon: '/favicon.ico',
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {

    //const db = init({ appId: process.env.NEXT_PUBLIC_DB_APP_ID || '' });

    return (
        <html lang="en">
            <head>
                <meta name="apple-mobile-web-app-title" content="Distcom" />
            </head>
            <body>
                <main>
                    <NuqsAdapter>{children}</NuqsAdapter>
                </main>
                <Toaster />
            </body>
        </html>
    );
}
