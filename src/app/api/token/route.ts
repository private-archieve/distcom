import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { cookies } from 'next/headers';

export async function GET() {
    const csrfToken = uuidv4();
    const cookieStore = cookies();
    cookieStore.set('csrf-token', csrfToken, { httpOnly: true, path: '/' });

    return NextResponse.json({ csrfToken });
}
