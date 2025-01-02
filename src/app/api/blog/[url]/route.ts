import { NextResponse } from 'next/server';
import { getBlogPostByURL } from '../../../../lib/database';
import { cookies } from 'next/headers';

export async function GET(req: Request, { params }: { params: { url: string } }) {
    const csrfToken = (await cookies()).get('csrf-token')?.value;
    const csrfTokenFromHeader = req.headers.get('csrf-token');

    // CSRF protection
    if (!csrfToken || csrfToken !== csrfTokenFromHeader) {
        return NextResponse.json({ error: 'CSRF token invalid or missing.' }, { status: 403 });
    }

    try {
        const blogPost = await getBlogPostByURL(params.url);
        return NextResponse.json(blogPost);
    } catch (error) {
        console.error('Failed to fetch blog post:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
