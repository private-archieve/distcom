import './globals.css';
import React from 'react';
import { DataProvider } from '../Base/Context/DataContext';
import { init } from '@instantdb/react';


export const metadata = {
    title: 'Distcom',
    description: 'Distcom is a social media platform for connecting with friends and family.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const db = init({ appId: process.env.NEXT_PUBLIC_DB_APP_ID || '' });

    return (
        <html lang="en">
            <body>
                <DataProvider>
                    <main>{children}</main>
                </DataProvider>
            </body>
        </html>
    );
}
