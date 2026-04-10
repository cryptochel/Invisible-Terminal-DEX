import React from 'react';
import { Trophy, History, ShieldCheck, Activity, Database, TrendingUp, Shield } from 'lucide-react';
import { motion } from 'motion/react';
import { useStore } from '../../store';
import { ShieldedValue, cn, Scanner, TerminalText } from '../ui';

export const PortfolioView = ({ onNavigate }: { onNavigate: (page: any) => void }) => {
  const { balance, tokens, history } = useStore();

  return (
    <div className="space-y-6 font-mono">
      <Scanner className="glass-panel p-10 flex flex-col items-center text-center relative border-midnight-cyan/20">
        <div className="absolute top-0 right-0 p-4">
          <button onClick={() => onNavigate('rewards')} className="flex items-center gap-2 bg-midnight-cyan/5 text-midnight-cyan px-4 py-2 border border-midnight-cyan/30 text-[10px] font-bold uppercase tracking-widest hover:bg-midnight-cyan hover:text-midnight-bg transition-all">
            <Trophy size={14} /> Rewards_Node
          </button>
        </div>
        
        <div className="flex flex-col items-center mb-10">
          <div className="w-12 h-12 border border-midnight-muted flex items-center justify-center mb-4 opacity-50">
            <Shield size={24} className="text-midnight-muted" />
          </div>
          <p className="text-[10px] text-midnight-muted uppercase tracking-[0.3em] font-bold mb-4">AGGREGATED_SHIELDED_VALUE</p>
          <ShieldedValue value={balance} prefix="$" className="text-5xl font-bold neon-text-cyan tracking-tighter" />
        </div>
        
        <div className="grid grid-cols-2 gap-4 w-full max-w-md">
          <button className="terminal-button py-3 bg-midnight-cyan/10 text-midnight-cyan border border-midnight-cyan/30 font-bold text-xs uppercase tracking-widest hover:bg-midnight-cyan hover:text-midnight-bg">
            Deposit_Asset
          </button>
          <button className="terminal-button py-3 border border-midnight-border text-midnight-muted font-bold text-xs uppercase tracking-widest hover:border-midnight-text hover:text-midnight-text">
            Withdraw_Asset
          </button>
        </div>
      </Scanner>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-6 border-midnight-border/50">
          <h3 className="text-[10px] text-midnight-muted font-bold uppercase tracking-[0.2em] mb-6">ENCRYPTED_ASSETS</h3>
          <div className="space-y-4">
            {tokens.map((token) => (
              <div key={token.id} className="flex items-center justify-between p-4 bg-midnight-bg/40 border border-midnight-border/50 hover:border-midnight-cyan/30 transition-all group">
                <div className="flex items-center gap-4">
                  <span className="text-2xl group-hover:scale-110 transition-transform">{token.logo}</span>
                  <div>
                    <p className="text-sm font-bold tracking-widest">{token.symbol}</p>
                    <p className="text-[8px] text-midnight-muted uppercase">{token.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <ShieldedValue value={token.balance} className="text-sm font-bold" />
                  <p className="text-[8px] text-midnight-muted font-mono uppercase tracking-tighter">Est_Val: ${(parseFloat(token.balance.replace(/,/g, '')) * token.price).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-6 border-midnight-border/50">
          <h3 className="text-[10px] text-midnight-muted font-bold uppercase tracking-[0.2em] mb-6">ACCESS_LOGS</h3>
          <div className="space-y-3">
            {history.slice(0, 5).map((tx) => (
              <div key={tx.id} className="flex items-center justify-between p-4 bg-midnight-bg/40 border border-midnight-border/50 hover:border-midnight-cyan/20 transition-all">
                <div>
                  <p className="text-sm font-bold tracking-widest">{tx.pair}</p>
                  <p className="text-[8px] text-midnight-muted uppercase">{tx.date}</p>
                </div>
                <div className="flex items-center gap-1.5 text-[8px] font-bold text-midnight-green uppercase tracking-widest">
                  <ShieldCheck size={12} /> {tx.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
