import React, { useState } from 'react';
import { LayoutGrid, Droplets, ArrowRight, Shield } from 'lucide-react';
import { useStore } from '../../store';
import { ShieldedValue, cn, Scanner, TerminalText } from '../ui';
import { AddLiquidityModal } from './AddLiquidityModal';

export const PoolsList = ({ onAddLiquidity }: { onAddLiquidity: () => void }) => {
  const { tokens, pools } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mapping store pools to UI structure
  const POOLS = pools.map(p => ({
    id: p.id,
    token0: tokens.find(t => t.symbol === p.assets[0]) || tokens[0],
    token1: tokens.find(t => t.symbol === p.assets[1]) || tokens[1],
    tvl: '$12.4M', // Mocked TVL
    apr: p.apr,
    myLiquidity: parseFloat(p.lpTokens.replace(',', '')) > 0 ? { 
      t0: (parseFloat(p.lpTokens.replace(',', '')) * 0.5).toFixed(2), 
      t1: (parseFloat(p.lpTokens.replace(',', '')) * 10).toFixed(2) 
    } : null
  }));

  return (
    <div className="space-y-6 font-mono">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold tracking-[0.2em] uppercase neon-text-cyan">LIQUIDITY_POOLS</h2>
          <span className="text-[8px] text-midnight-muted uppercase tracking-[0.3em]">Status: Shielded_Pools_Active</span>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="terminal-button bg-midnight-cyan/10 text-midnight-cyan border border-midnight-cyan/30 px-6 py-2 font-bold text-xs uppercase tracking-widest hover:bg-midnight-cyan hover:text-midnight-bg"
        >
          + Initialize_Pool
        </button>
      </div>

      <Scanner className="glass-panel p-6 border-midnight-cyan/20">
        <h3 className="text-[10px] text-midnight-muted font-bold uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
          <Shield size={12} className="text-midnight-cyan" />
          ACTIVE_POSITIONS
        </h3>
        <div className="space-y-4">
          {POOLS.filter(p => p.myLiquidity).map((pool) => (
            <div key={pool.id} className="bg-midnight-bg/40 border border-midnight-border p-5 hover:border-midnight-cyan/50 transition-all relative group">
              <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-100 transition-opacity">
                <div className="w-1 h-1 bg-midnight-cyan animate-pulse" />
              </div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                    <div className="w-10 h-10 border border-midnight-border bg-midnight-card flex items-center justify-center text-xl shadow-2xl">{pool.token0.logo}</div>
                    <div className="w-10 h-10 border border-midnight-border bg-midnight-card flex items-center justify-center text-xl shadow-2xl">{pool.token1.logo}</div>
                  </div>
                  <div>
                    <p className="font-bold text-lg tracking-widest">{pool.token0.symbol} / {pool.token1.symbol}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-[8px] text-midnight-green font-bold border border-midnight-green/30 bg-midnight-green/5 px-2 py-0.5 uppercase tracking-widest">SHIELDED</span>
                      <span className="text-[8px] text-midnight-muted uppercase">Yield: {pool.apr}</span>
                    </div>
                  </div>
                </div>
                <button className="px-4 py-2 border border-midnight-border hover:border-midnight-cyan text-[10px] font-bold uppercase tracking-widest transition-all hover:bg-midnight-cyan/5">
                  Manage_Node
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-midnight-bg/60 border border-midnight-border/50">
                  <p className="text-[8px] text-midnight-muted uppercase tracking-widest mb-2">Shielded_Liquidity</p>
                  <div className="flex flex-col gap-1">
                    <ShieldedValue value={pool.myLiquidity?.t0 || '0'} suffix={` ${pool.token0.symbol}`} className="text-xs font-bold" />
                    <ShieldedValue value={pool.myLiquidity?.t1 || '0'} suffix={` ${pool.token1.symbol}`} className="text-xs font-bold" />
                  </div>
                </div>
                <div className="p-3 bg-midnight-bg/60 border border-midnight-border/50">
                  <p className="text-[8px] text-midnight-muted uppercase tracking-widest mb-2">Total_Value_Locked</p>
                  <p className="text-sm font-bold text-midnight-cyan">{pool.tvl}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Scanner>

      <div className="glass-panel p-6 border-midnight-border/50">
        <h3 className="text-[10px] text-midnight-muted font-bold uppercase tracking-[0.2em] mb-6">AVAILABLE_MARKETS</h3>
        <div className="space-y-3">
          {POOLS.map((pool) => (
            <div key={pool.id} className="flex items-center justify-between p-4 bg-midnight-bg/40 border border-midnight-border/50 hover:border-midnight-cyan/30 transition-all group">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 border border-midnight-border bg-midnight-card flex items-center justify-center text-sm">{pool.token0.logo}</div>
                  <div className="w-8 h-8 border border-midnight-border bg-midnight-card flex items-center justify-center text-sm">{pool.token1.logo}</div>
                </div>
                <div>
                  <p className="text-sm font-bold tracking-widest">{pool.token0.symbol} / {pool.token1.symbol}</p>
                  <p className="text-[8px] text-midnight-muted uppercase">TVL: {pool.tvl}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="text-sm font-bold text-midnight-green">{pool.apr}</p>
                  <p className="text-[8px] text-midnight-muted uppercase tracking-widest">Est_APR</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="p-2 border border-midnight-border hover:border-midnight-cyan hover:text-midnight-cyan transition-all text-midnight-muted"
                >
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AddLiquidityModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
