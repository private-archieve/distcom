'use client';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import useDataStore from '@/store/dataStore';
import { useQueryState } from 'nuqs';
import React from 'react';


const ModalAuth: React.FC = () => {
    const { isLoggedIn, connectWallet } = useDataStore();
    const [open, setOpen] = useQueryState('modal');
    return (
        <Dialog open={open === "auth"} onOpenChange={(e) => {
            setOpen(e ? "auth" : null);
        }}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Authentication Required</DialogTitle>
                    <DialogDescription>
                        Please connect your Mina Wallet to continue.
                    </DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                    <Button onClick={connectWallet}>Connect Mina Wallet</Button>
                </div>
            </DialogContent>
        </Dialog >

    )
};

export default ModalAuth;
