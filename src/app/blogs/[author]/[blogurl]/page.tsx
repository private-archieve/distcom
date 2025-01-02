// app/blogs/[author]/[blogurl]/page.tsx
'use client';

import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import React from 'react';

const BlogDetail = dynamic(() => import('../../src/Base/Details/BlogDetails/BlogDetail.tsx'), { ssr: false });

export default function BlogDetailPage() {
    const params = useParams();
    const { author, blogurl } = params;

    return <BlogDetail author={author} blogurl={blogurl} />;
}
