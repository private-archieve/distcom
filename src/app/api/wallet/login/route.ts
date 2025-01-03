import { NextResponse } from 'next/server';
import { checkUserExists, LoginUserWallet } from '@lib/database';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
    const { walletAddress } = await req.json();

    const csrfToken = (await cookies()).get('csrf-token')?.value;
    const csrfTokenFromHeader = req.headers.get('csrf-token');

    // CSRF protection
    if (!csrfToken || csrfToken !== csrfTokenFromHeader) {
        return NextResponse.json({ error: 'CSRF token invalid or missing.' }, { status: 403 });
    }

    if (!walletAddress) {
        return NextResponse.json({ message: 'Wallet address is required.', status: 'Bad Request' }, { status: 400 });
    }

    try {
        const userExists = await checkUserExists(walletAddress);
        console.log("User exists: ", userExists);
        if (userExists) {
            const token = await LoginUserWallet(walletAddress);
            return NextResponse.json({ message: 'Login successful!', token, status: 'Ok' }, { status: 200 });
        } else {
            return NextResponse.json({ message: 'User does not exist!', status: 'Not Found' }, { status: 404 });
        }
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ message: 'Login failed!', status: 'Error' }, { status: 500 });
    }
}
