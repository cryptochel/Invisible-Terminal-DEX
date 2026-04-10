import { create } from 'zustand';

export type PrivacyMode = 'Standard' | 'Shielded' | 'Phantom';

interface Token {
  id: string;
  symbol: string;
  name: string;
  logo: string;
  balance: string;
  price: number;
}

interface Transaction {
  id: string;
  type: 'Swap' | 'Liquidity';
  pair: string;
  amount: string;
  status: 'Pending' | 'Completed' | 'Failed';
  proof: string;
  date: string;
}

interface Pool {
  id: string;
  pair: string;
  share: string;
  apr: string;
  lpTokens: string;
  assets: string[];
}

interface AppState {
  // Wallet
  isConnected: boolean;
  address: string | null;
  balance: string;
  connect: () => void;
  disconnect: () => void;

  // Privacy
  privacyMode: PrivacyMode;
  setPrivacyMode: (mode: PrivacyMode) => void;

  // Tokens
  tokens: Token[];
  updateTokenBalance: (id: string, newBalance: string) => void;

  // Pools
  pools: Pool[];
  addLiquidity: (poolId: string, amount: string) => void;
  removeLiquidity: (poolId: string, amount: string) => void;

  // Rewards
  rewards: {
    earned: string;
    pending: string;
  };
  claimRewards: () => void;

  // History
  history: Transaction[];
  addTransaction: (tx: Transaction) => void;
  updateTransactionStatus: (id: string, status: 'Completed' | 'Failed') => void;
}

export const useStore = create<AppState>((set) => ({
  isConnected: false,
  address: null,
  balance: '0.00',
  connect: () => set({ isConnected: true, address: '0x74...29', balance: '12,450.82' }),
  disconnect: () => set({ isConnected: false, address: null, balance: '0.00' }),

  privacyMode: 'Shielded',
  setPrivacyMode: (mode) => set({ privacyMode: mode }),

  tokens: [
    { id: 'inv', symbol: 'INV', name: 'Invisible Token', logo: '🕶️', balance: '25,000.00', price: 0.42 },
    { id: 'eth', symbol: 'ETH', name: 'Ethereum', logo: '💎', balance: '12.45', price: 2450.82 },
    { id: 'usdc', symbol: 'USDC', name: 'USD Coin', logo: '💵', balance: '5,240.00', price: 1.00 },
    { id: 'mid', symbol: 'MID', name: 'Midnight', logo: '🌑', balance: '1,200.00', price: 0.15 },
  ],
  updateTokenBalance: (id, newBalance) => set((state) => ({
    tokens: state.tokens.map((t) => t.id === id ? { ...t, balance: newBalance } : t)
  })),

  pools: [
    { id: '1', pair: 'INV / ETH', share: '0.45%', apr: '24.5%', lpTokens: '1,240.50', assets: ['INV', 'ETH'] },
    { id: '2', pair: 'ETH / USDC', share: '0.12%', apr: '18.2%', lpTokens: '450.20', assets: ['ETH', 'USDC'] },
  ],
  addLiquidity: (poolId, amount) => set((state) => ({
    pools: state.pools.map((p) => p.id === poolId ? { ...p, lpTokens: (parseFloat(p.lpTokens.replace(',', '')) + parseFloat(amount)).toLocaleString() } : p)
  })),
  removeLiquidity: (poolId, amount) => set((state) => ({
    pools: state.pools.map((p) => p.id === poolId ? { ...p, lpTokens: (parseFloat(p.lpTokens.replace(',', '')) - parseFloat(amount)).toLocaleString() } : p)
  })),

  rewards: {
    earned: '125.00',
    pending: '24.00',
  },
  claimRewards: () => set((state) => ({
    rewards: { earned: (parseFloat(state.rewards.earned) + parseFloat(state.rewards.pending)).toFixed(2), pending: '0.00' }
  })),

  history: [
    { id: '1', type: 'Swap', pair: 'USDC → ETH', amount: '120.00', status: 'Completed', proof: 'zk_7f2...a9', date: '2 mins ago' },
    { id: '2', type: 'Liquidity', pair: 'ETH/USDC', amount: 'Supply', status: 'Completed', proof: 'zk_2c4...d5', date: '1 hour ago' },
  ],
  addTransaction: (tx) => set((state) => ({ history: [tx, ...state.history] })),
  updateTransactionStatus: (id, status) => set((state) => ({
    history: state.history.map((tx) => tx.id === id ? { ...tx, status } : tx)
  })),
}));
