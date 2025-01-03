"use client";

import { Button } from "@/components/ui/button";
import useDataStore from '@/store/dataStore';
import { Fingerprint } from 'lucide-react';
import { useRouter } from "next/navigation";
import { useQueryState } from 'nuqs';
import React from 'react';

const ConnectWalletButton: React.FC = () => {
    const { isLoggedIn, connectWallet, disconnectWallet } = useDataStore();
    const router = useRouter();
    const handleConnect = async () => {
        await connectWallet();
    };

    const handleDisconnect = () => {
        disconnectWallet();
    };
    const [modal, setModal] = useQueryState('modal');

    return (
        <Button
            variant="outline"
            className="ml-4 hidden md:flex items-center gap-2"
            onClick={isLoggedIn ? () => setModal("profile") : handleConnect}
        >
            <Fingerprint className="h-4 w-4" />
            {isLoggedIn ? "My Profile" : "Connect"}
        </Button>
    );
};

export default ConnectWalletButton;
