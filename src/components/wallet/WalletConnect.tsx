import React from 'react';
import { Zap, Lock, Power } from 'lucide-react';
import { useWeb3 } from '../../hooks/useWeb3';
import { useStore } from '../../store';
import { cn } from '../ui';

export const WalletConnect = () => {
  const { connect, disconnect, isConnected } = useWeb3();
  const { address } = useStore();

  return (
    <button 
      onClick={() => isConnected ? disconnect() : connect()}
      className={cn(
        "flex items-center gap-2 px-4 py-2 border transition-all font-bold text-[10px] uppercase tracking-widest font-mono",
        isConnected 
          ? "bg-midnight-cyan/10 border-midnight-cyan text-midnight-cyan neon-border-cyan" 
          : "bg-midnight-bg border-midnight-border text-midnight-muted hover:text-midnight-cyan hover:border-midnight-cyan"
      )}
    >
      {isConnected ? <Lock size={14} /> : <Power size={14} />}
      {isConnected ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Initialize_Wallet"}
    </button>
  );
};
