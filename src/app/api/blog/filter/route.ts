import { NextResponse } from 'next/server';
import { getBlogPosts } from '../../../lib/database';
import { cookies } from 'next/headers';

export async function GET(req: Request, { params }: { params: { filter: string } }) {
    const csrfToken = (await cookies()).get('csrf-token')?.value;
    const csrfTokenFromHeader = req.headers.get('csrf-token');

    // CSRF protection
    if (!csrfToken || csrfToken !== csrfTokenFromHeader) {
        return NextResponse.json({ error: 'CSRF token invalid or missing.' }, { status: 403 });
    }

    try {
        const filteredBlogs = await getBlogPosts(params.filter);
        return NextResponse.json(filteredBlogs);
    } catch (error) {
        console.error('Failed to fetch blog posts:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
