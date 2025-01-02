// app/groups/[groupname]/page.tsx
'use client';

import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import React from 'react';

const GroupDetail = dynamic(() => import('../../src/Base/Details/GroupsDetails/GroupDetail.tsx'), { ssr: false });

export default function GroupDetailPage() {
    const params = useParams();
    const { groupname } = params;

    return <GroupDetail groupname={groupname} />;
}
