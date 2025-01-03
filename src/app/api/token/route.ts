import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
    const csrfToken = uuidv4();
    const cookieStore = cookies();
    cookieStore.set('csrf-token', csrfToken, { httpOnly: true, path: '/' });

    return NextResponse.json({ csrfToken });
}
