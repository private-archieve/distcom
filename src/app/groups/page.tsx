// app/groups/page.tsx
import dynamic from 'next/dynamic';
import React from 'react';

const GroupsPage = dynamic(() => import('../../src/Pages/Groups/GroupsPage.tsx'), { ssr: false });

export default function Groups() {
    return <GroupsPage />;
}
