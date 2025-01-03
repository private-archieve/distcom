'use client';
import ModalAuth from '@/pages/ModalAuth/ModalAuth';
import useDataStore from '@/store/dataStore';
import React, { ReactNode } from 'react';

interface AuthGuardProps {
    children: ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
    const { isLoggedIn } = useDataStore();

    return (
        <>
            {!isLoggedIn && <ModalAuth />}
            {isLoggedIn && children}
        </>
    );
};

export default AuthGuard;
