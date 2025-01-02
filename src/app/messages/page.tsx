// app/messages/page.tsx
import dynamic from 'next/dynamic';
import React from 'react';

const MessagePage = dynamic(() => import('../../src/Pages/Message/MessagePage.tsx'), { ssr: false });

export default function Messages() {
    return <MessagePage />;
}
