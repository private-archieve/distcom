// app/blogs/page.tsx
import dynamic from 'next/dynamic';
import React from 'react';

const BlogPage = dynamic(() => import('@pages/Blog/BlogPage.tsx'), { ssr: false });

export default function Blogs() {
    return <BlogPage />;
}
