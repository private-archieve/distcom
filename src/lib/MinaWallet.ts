declare global {
  interface Window {
    mina?: any;
  }
}

type WalletProvider = {
  request: (args: { method: string; params?: any[] }) => Promise<any>;
  on?: (event: string, callback: (...args: any[]) => void) => void;
  removeListener?: (event: string, callback: (...args: any[]) => void) => void;
};

class MinaWallet {
  private provider: WalletProvider | null = null;
  private isConnected: boolean = false;
  private accounts: string[] = [];

  // Event callbacks
  public onAccountsChanged: ((accounts: string[]) => void) | null = null;
  public onDisconnect: (() => void) | null = null;

  constructor() {
    if (typeof window === 'undefined') {
      // Running on server
      console.warn('MinaWallet: Not initialized because window is undefined (SSR).');
      return;
    }

    this.provider = window.mina || null;
    if (this.provider) {
      this.setupListeners();
      this.checkConnectionStatus();
    } else {
      console.error('Mina wallet provider not found. Please install a Mina-compatible wallet.');
    }
  }

  /**
   * Initialize event listeners for account and network changes
   */
  private setupListeners() {
    if (this.provider && this.provider.on) {
      this.provider.on('accountsChanged', this.handleAccountsChanged.bind(this));
      this.provider.on('chainChanged', this.handleChainChanged.bind(this));
      this.provider.on('disconnect', this.handleDisconnect.bind(this));
    }
  }

  /**
   * Handle account changes
   * @param accounts - Array of new accounts
   */
  private handleAccountsChanged(accounts: string[]) {
    if (this.onAccountsChanged) {
      this.onAccountsChanged(accounts);
    }

    if (accounts.length === 0) {
      // User disconnected their wallet
      this.isConnected = false;
      this.accounts = [];
      console.log('Mina wallet disconnected.');
    } else {
      this.isConnected = true;
      this.accounts = accounts;
      console.log('Mina wallet connected:', accounts[0]);
    }
  }

  /**
   * Handle network changes
   * @param chainId - The new chain ID
   */
  private handleChainChanged(chainId: string) {
    console.log('Chain changed to:', chainId);
    // Add logic here to handle chain/network changes if needed
  }

  /**
   * Handle wallet disconnect
   */
  private handleDisconnect() {
    if (this.onDisconnect) {
      this.onDisconnect();
    }
    this.isConnected = false;
    this.accounts = [];
    console.log('Mina wallet disconnected.');
  }

  /**
   * Check if the user is already connected
   */
  private async checkConnectionStatus() {
    if (!this.provider) return;

    try {
      const accounts = await this.provider.request({ method: 'mina_accounts' });
      if (accounts && accounts.length > 0) {
        this.isConnected = true;
        this.accounts = accounts;
        console.log('Mina wallet is already connected:', accounts[0]);
        if (this.onAccountsChanged) {
          this.onAccountsChanged(accounts);
        }
      }
    } catch (error) {
      console.error('Error checking connection status:', error);
    }
  }

  /**
   * Connect to the Mina Wallet
   * @returns Promise resolving to the user's account address
   */
  public async connect(): Promise<string | null> {
    if (!this.provider) {
      console.error('Mina wallet provider not found.');
      return null;
    }

    try {
      const accounts: string[] = await this.provider.request({
        method: 'mina_requestAccounts',
      });

      if (accounts && accounts.length > 0) {
        this.isConnected = true;
        this.accounts = accounts;
        console.log('Connected to Mina wallet:', accounts[0]);
        if (this.onAccountsChanged) {
          this.onAccountsChanged(accounts);
        }
        return accounts[0];
      } else {
        console.warn('No accounts found.');
        return null;
      }
    } catch (error) {
      console.error('Error connecting to Mina wallet:', error);
      return null;
    }
  }

  /**
   * Disconnect from the Mina Wallet
   * Note: Many wallet providers do not support programmatic disconnection.
   * This method clears the connection status locally.
   */
  public disconnect(): void {
    if (this.provider && this.provider.removeListener) {
      this.provider.removeListener('accountsChanged', this.handleAccountsChanged.bind(this));
      this.provider.removeListener('chainChanged', this.handleChainChanged.bind(this));
      this.provider.removeListener('disconnect', this.handleDisconnect.bind(this));
    }
    this.isConnected = false;
    this.accounts = [];
    console.log('Disconnected from Mina wallet.');
    if (this.onDisconnect) {
      this.onDisconnect();
    }
  }

  /**
   * Check if the user is logged in (connected)
   * @returns boolean indicating connection status
   */
  public isLoggedIn(): boolean {
    return this.isConnected;
  }

  /**
   * Get the connected account address
   * @returns The first account address or null
   */
  public getAccount(): string | null {
    return this.accounts.length > 0 ? this.accounts[0] : null;
  }

  /**
   * Optional: Sign a message with the user's wallet
   * @param message - The message to sign
   * @returns The signed message
   */
  public async signMessage(message: string): Promise<string | null> {
    if (!this.provider || !this.isConnected) {
      console.error('Mina wallet is not connected.');
      return null;
    }

    try {
      const signature: string = await this.provider.request({
        method: 'mina_signMessage',
        params: [message],
      });
      return signature;
    } catch (error) {
      console.error('Error signing message:', error);
      return null;
    }
  }

  /**
   * Optional: Get the current network chain ID
   * @returns The chain ID as a string
   */
  public async getChainId(): Promise<string | null> {
    if (!this.provider) {
      console.error('Mina wallet provider not found.');
      return null;
    }

    try {
      const chainId: string = await this.provider.request({ method: 'mina_chainId' });
      return chainId;
    } catch (error) {
      console.error('Error getting chain ID:', error);
      return null;
    }
  }
}

export default MinaWallet;
