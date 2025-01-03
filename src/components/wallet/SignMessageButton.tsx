"use client";

import { Button } from "@/components/ui/button";
import useDataStore from '@/store/dataStore';
import React, { useState } from 'react';

const SignMessageButton: React.FC = () => {
    const { signMessage, isLoggedIn } = useDataStore();
    const [signature, setSignature] = useState<string | null>(null);
    const [message, setMessage] = useState<string>('Hello Mina!');

    const handleSign = async () => {
        const signedMsg = await signMessage(message);
        if (signedMsg) {
            setSignature(signedMsg);
        }
    };

    if (!isLoggedIn) {
        return <p>Please connect your wallet to sign messages.</p>;
    }

    return (
        <div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter message to sign"
            />
            <Button onClick={handleSign}>Sign Message</Button>
            {signature && (
                <div>
                    <h4>Signature:</h4>
                    <p>{signature}</p>
                </div>
            )}
        </div>
    );
};

export default SignMessageButton;
