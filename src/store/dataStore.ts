// src/store/dataStore.ts

import MinaWallet from '@/lib/MinaWallet';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Define the shape of your store's state
interface DataStoreState {
    // Wallet States
    isLoggedIn: boolean;
    userAuthID: string | null;
    userAuthToken: string | null;
    csrfToken: string | null;

    // Other states
    data: any;
    isLoading: boolean;
    siteData: any;
    chatData: any;
    notes: any;

    // Wallet Actions
    connectWallet: () => Promise<void>;
    disconnectWallet: () => void;
    checkLoginStatus: () => void;
    getAccount: () => string | null;
    signMessage: (message: string) => Promise<string | null>;

    // Other Actions
    setLoginStatus: (status: boolean) => void;
    setUserAuthID: (id: string | null) => void;
    setUserAuthToken: (token: string | null) => void;
    setCsrfToken: (token: string | null) => void;
    setSiteData: (data: any) => void;
    setData: (data: any) => void;
    setIsLoading: (loading: boolean) => void;
    setChatData: (chat: any) => void;
    setNotes: (notes: any) => void;
}

// Create a Zustand store with persistence
const useDataStore = create<DataStoreState>()(
    persist(
        (set, get) => {
            // Variable to hold the MinaWallet instance
            let minaWallet: MinaWallet | null = null;

            // Function to initialize MinaWallet
            const initializeMinaWallet = () => {
                console.log("Initializing MinaWallet");
                if (minaWallet === null && typeof window !== 'undefined') {
                    minaWallet = new MinaWallet();

                    // Set up event callbacks to update the store
                    minaWallet.onAccountsChanged = (accounts: string[]) => {
                        if (accounts.length === 0) {
                            // User disconnected their wallet
                            console.log("User disconnected their wallet");
                            set({ isLoggedIn: false, userAuthID: null, userAuthToken: null });
                        } else {
                            // User connected or changed account
                            console.log("User connected or changed account");
                            set({ isLoggedIn: true, userAuthID: accounts[0] });
                            // Optionally, fetch and set userAuthToken here if applicable
                        }
                    };

                    minaWallet.onDisconnect = () => {
                        console.log("User disconnected their wallet via disconnect event");
                        set({ isLoggedIn: false, userAuthID: null, userAuthToken: null });
                    };
                }
            };

            return {
                // Initial States
                isLoggedIn: false,
                userAuthID: null,
                userAuthToken: null,
                csrfToken: null,
                data: null,
                isLoading: false,
                siteData: null,
                chatData: null,
                notes: null,

                // Wallet Actions
                connectWallet: async () => {
                    initializeMinaWallet();
                    if (!minaWallet) {
                        console.error('MinaWallet is not initialized.');
                        return;
                    }
                    const account = await minaWallet.connect();
                    if (account) {
                        console.log(`Connected wallet account: ${account}`);
                        set({ isLoggedIn: true, userAuthID: account });
                        // Optionally, retrieve and set userAuthToken here
                        // const token = await fetchUserAuthToken(account);
                        // set({ userAuthToken: token });
                    }
                },

                disconnectWallet: () => {
                    if (!minaWallet) {
                        console.error('MinaWallet is not initialized.');
                        return;
                    }
                    minaWallet.disconnect();
                    set({ isLoggedIn: false, userAuthID: null, userAuthToken: null });
                },

                checkLoginStatus: () => {
                    initializeMinaWallet();
                    if (!minaWallet) {
                        console.warn('MinaWallet is not initialized. Resetting authentication state.');
                        // Reset authentication state
                        set({ isLoggedIn: false, userAuthID: null, userAuthToken: null });
                        return;
                    }
                    const isLoggedIn = minaWallet.isLoggedIn();
                    const account = minaWallet.getAccount();
                    console.log(`Login status - isLoggedIn: ${isLoggedIn}, account: ${account}`);
                    set({ isLoggedIn, userAuthID: account });
                },

                getAccount: () => {
                    if (!minaWallet) {
                        console.warn('MinaWallet is not initialized.');
                        return null;
                    }
                    return minaWallet.getAccount();
                },

                signMessage: async (message: string) => {
                    if (!minaWallet) {
                        console.error('MinaWallet is not initialized.');
                        return null;
                    }
                    return await minaWallet.signMessage(message);
                },

                // Other Actions
                setLoginStatus: (status: boolean) => set({ isLoggedIn: status }),
                setUserAuthID: (id: string | null) => set({ userAuthID: id }),
                setUserAuthToken: (token: string | null) => set({ userAuthToken: token }),
                setCsrfToken: (token: string | null) => set({ csrfToken: token }),
                setSiteData: (data: any) => set({ siteData: data }),
                setData: (data: any) => set({ data }),
                setIsLoading: (loading: boolean) => set({ isLoading: loading }),
                setChatData: (chat: any) => set({ chatData: chat }),
                setNotes: (notes: any) => set({ notes }),
            };
        },
        {
            name: 'data-store', // unique name
            // Define which parts of the state to persist
            partialize: (state) => ({
                isLoggedIn: state.isLoggedIn,
                userAuthID: state.userAuthID,
                userAuthToken: state.userAuthToken,
                csrfToken: state.csrfToken,
                // Include other states if needed
            }),
        }
    )
);

export default useDataStore;
