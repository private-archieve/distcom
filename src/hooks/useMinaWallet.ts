import useDataStore from '@/store/dataStore';
import { useEffect } from 'react';

const useMinaWallet = () => {
    const { connectWallet, disconnectWallet, checkLoginStatus, isLoggedIn } = useDataStore();

    useEffect(() => {
        checkLoginStatus();
    }, [checkLoginStatus]);

    return {
        isLoggedIn,
        connectWallet,
        disconnectWallet,
        checkLoginStatus,
    };
};

export default useMinaWallet;
