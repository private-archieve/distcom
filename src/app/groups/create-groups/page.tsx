// app/groups/create-groups/page.tsx
import dynamic from 'next/dynamic';
import React from 'react';

const CreateGroupPage = dynamic(() => import('../../src/Pages/Groups/SubPage/CreateGroups/CreateGroupsPage.tsx'), { ssr: false });

export default function CreateGroups() {
    return <CreateGroupPage />;
}
