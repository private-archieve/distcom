import { NextResponse } from 'next/server';
import { checkUserExists, RegisterUserWallet } from '../../../../lib/database';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
    const body = await req.json();
    const walletAddress = body.RegisterRequest?.walletAddress;

    const csrfToken = cookies().get('csrf-token')?.value;
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
        if (!userExists) {
            await RegisterUserWallet(walletAddress);
            return NextResponse.json({ message: 'Successfully Registered!', status: 'Ok' }, { status: 201 });
        } else {
            return NextResponse.json({ message: 'User already exists!', status: 'Conflict' }, { status: 409 });
        }
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json({ message: 'Registration failed!', status: 'Error' }, { status: 500 });
    }
}
