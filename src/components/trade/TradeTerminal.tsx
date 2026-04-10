import React, { useState } from 'react';
import { TrendingUp, Activity, Database, Cpu, ArrowRight, Shield, Zap } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { toast } from 'sonner';
import { ANALYTICS_DATA } from '../../constants';
import { cn, Scanner, TerminalText, PrivacyShield, ShieldedValue } from '../ui';
import { useStore } from '../../store';

export const TradeTerminal = () => {
  const { isConnected, addTransaction, tokens } = useStore();
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderType, setOrderType] = useState<'Buy' | 'Sell'>('Buy');
  const [price, setPrice] = useState('2449.95');
  const [size, setSize] = useState('');

  const ethToken = tokens.find(t => t.id === 'eth') || tokens[1];
  const usdcToken = tokens.find(t => t.id === 'usdc') || tokens[2];

  const handlePlaceOrder = () => {
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }
    if (!size || parseFloat(size) <= 0) {
      toast.error('Please enter a valid order size');
      return;
    }

    setIsOrdering(true);
    toast.info(`Initializing Shielded ${orderType} Order...`, {
      description: 'Generating ZK-proof for limit order execution',
      duration: 2000,
    });

    setTimeout(() => {
      setIsOrdering(false);
      
      const newTx = {
        id: Math.random().toString(36).substr(2, 9),
        type: 'Trade' as any,
        pair: `ETH / USDC (${orderType})`,
        amount: `${size} ETH @ ${price}`,
        status: 'Completed' as const,
        proof: `zk_tr_${Math.random().toString(16).substr(2, 8)}`,
        date: 'Just now'
      };
      
      addTransaction(newTx);
      toast.success('Order Placed Successfully', {
        description: `Limit order added to shielded book: ${newTx.proof}`,
      });
      setSize('');
    }, 3000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-mono">
      <div className="lg:col-span-2 space-y-6">
        <Scanner active={isOrdering} className="glass-panel p-6 h-[500px] flex flex-col border-midnight-cyan/20">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 bg-midnight-card flex items-center justify-center border border-midnight-bg text-sm">💎</div>
                <div className="w-8 h-8 bg-midnight-card flex items-center justify-center border border-midnight-bg text-sm">💵</div>
              </div>
              <div className="flex flex-col">
                <h3 className="font-bold text-sm tracking-widest">ETH / USDC</h3>
                <span className="text-midnight-green text-[10px] font-bold">+2.45% <span className="text-midnight-muted tracking-tighter">▲</span></span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {['1H', '4H', '1D', '1W'].map(t => (
                <button key={t} className={cn("px-2 py-1 border border-transparent text-[10px] font-bold transition-all", t === '1D' ? "border-midnight-cyan text-midnight-cyan bg-midnight-cyan/5" : "text-midnight-muted hover:text-midnight-text")}>{t}</button>
              ))}
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="absolute inset-0 pointer-events-none opacity-10 terminal-grid" />
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ANALYTICS_DATA}>
                <defs>
                  <linearGradient id="colorTrade" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00f2ff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00f2ff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1a1a2e" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0a0a0f', border: '1px solid #1a1a2e', borderRadius: '0px' }}
                  itemStyle={{ color: '#00f2ff' }}
                />
                <Area type="monotone" dataKey="liq" stroke="#00f2ff" fillOpacity={1} fill="url(#colorTrade)" strokeWidth={1} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Scanner>

        <div className="grid grid-cols-2 gap-6">
          <div className="glass-panel p-6 border-midnight-border/50">
            <h4 className="text-[10px] text-midnight-muted font-bold uppercase tracking-[0.2em] mb-4 flex items-center justify-between">
              Order_Book
              <span className="text-[8px] animate-pulse">LIVE</span>
            </h4>
            <div className="space-y-2">
              {[2450.82, 2450.45, 2450.12].map((p, i) => (
                <div key={i} className="flex justify-between text-[10px] font-mono group cursor-pointer">
                  <span className="text-rose-500 group-hover:neon-text-purple transition-all">{p.toFixed(2)}</span>
                  <span className="text-midnight-muted">0.452</span>
                </div>
              ))}
              <div className="py-2 border-y border-midnight-border/50 text-center font-bold text-sm text-midnight-cyan neon-text-cyan">2449.95</div>
              {[2449.80, 2449.45, 2449.12].map((p, i) => (
                <div key={i} className="flex justify-between text-[10px] font-mono group cursor-pointer">
                  <span className="text-midnight-green group-hover:neon-text-cyan transition-all">{p.toFixed(2)}</span>
                  <span className="text-midnight-muted">1.205</span>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-panel p-6 border-midnight-border/50">
            <h4 className="text-[10px] text-midnight-muted font-bold uppercase tracking-[0.2em] mb-4">Market_Metrics</h4>
            <div className="space-y-4">
              <div className="flex justify-between border-b border-midnight-border pb-2">
                <span className="text-[10px] text-midnight-muted uppercase">24h_High</span>
                <span className="text-xs font-bold text-midnight-text">2,482.10</span>
              </div>
              <div className="flex justify-between border-b border-midnight-border pb-2">
                <span className="text-[10px] text-midnight-muted uppercase">24h_Low</span>
                <span className="text-xs font-bold text-midnight-text">2,390.45</span>
              </div>
              <div className="flex justify-between border-b border-midnight-border pb-2">
                <span className="text-[10px] text-midnight-muted uppercase">24h_Vol</span>
                <span className="text-xs font-bold text-midnight-cyan">12.4M USDC</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <Scanner active={isOrdering} className="glass-panel p-6 border-midnight-cyan/20">
          <div className="flex gap-2 p-1 bg-midnight-bg/60 border border-midnight-border mb-6">
            <button 
              onClick={() => setOrderType('Buy')}
              className={cn(
                "flex-1 py-2 text-[10px] font-bold uppercase tracking-widest transition-all",
                orderType === 'Buy' ? "bg-midnight-cyan/10 text-midnight-cyan border border-midnight-cyan/30" : "text-midnight-muted hover:text-midnight-text"
              )}
            >
              Buy
            </button>
            <button 
              onClick={() => setOrderType('Sell')}
              className={cn(
                "flex-1 py-2 text-[10px] font-bold uppercase tracking-widest transition-all",
                orderType === 'Sell' ? "bg-rose-500/10 text-rose-500 border border-rose-500/30" : "text-midnight-muted hover:text-midnight-text"
              )}
            >
              Sell
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-[10px] text-midnight-muted font-bold uppercase tracking-widest block">Limit_Price</label>
                <div className="flex items-center gap-1">
                  <span className="text-[8px] text-midnight-muted uppercase tracking-widest">Bal:</span>
                  <ShieldedValue 
                    value={usdcToken.balance} 
                    suffix=" USDC" 
                    className={cn("text-[8px]", orderType === 'Buy' && "text-midnight-cyan")} 
                  />
                </div>
              </div>
              <div className="relative">
                <input 
                  type="text" 
                  value={price} 
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-midnight-bg/40 border border-midnight-border py-3 px-4 focus:border-midnight-cyan focus:ring-0 font-mono text-sm text-midnight-text" 
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-midnight-muted font-bold">USDC</span>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-[10px] text-midnight-muted font-bold uppercase tracking-widest block">Order_Size</label>
                <div className="flex items-center gap-1">
                  <span className="text-[8px] text-midnight-muted uppercase tracking-widest">Bal:</span>
                  <ShieldedValue 
                    value={ethToken.balance} 
                    suffix=" ETH" 
                    className={cn("text-[8px]", orderType === 'Sell' && "text-rose-500")} 
                  />
                </div>
              </div>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="0.0000" 
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="w-full bg-midnight-bg/40 border border-midnight-border py-3 px-4 focus:border-midnight-cyan focus:ring-0 font-mono text-sm text-midnight-text" 
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-midnight-muted font-bold">ETH</span>
              </div>
            </div>
            <div className="pt-4">
              <div className="flex justify-between text-[10px] font-bold uppercase mb-4 tracking-widest">
                <span className="text-midnight-muted">Est_Total:</span>
                <span className="text-midnight-cyan">
                  {size && price ? (parseFloat(size) * parseFloat(price)).toFixed(2) : '0.00'} USDC
                </span>
              </div>
              <button 
                onClick={handlePlaceOrder}
                disabled={isOrdering}
                className={cn(
                  "terminal-button w-full py-4 font-bold uppercase tracking-[0.2em] transition-all",
                  isOrdering 
                    ? "bg-midnight-border text-midnight-muted cursor-not-allowed" 
                    : orderType === 'Buy' 
                      ? "bg-midnight-cyan/10 text-midnight-cyan border border-midnight-cyan/30 hover:bg-midnight-cyan hover:text-midnight-bg"
                      : "bg-rose-500/10 text-rose-500 border border-rose-500/30 hover:bg-rose-500 hover:text-midnight-bg"
                )}
              >
                {isOrdering ? <TerminalText text="EXECUTING..." speed={30} /> : `Place_${orderType}_Order`}
              </button>
            </div>
          </div>
        </Scanner>

        <div className="glass-panel p-6 bg-midnight-cyan/5 border-midnight-cyan/20 relative overflow-hidden">
          <div className="scanline opacity-5" />
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-midnight-cyan">
              <Shield size={16} />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Privacy_Engine</span>
            </div>
            <PrivacyShield level="high" />
          </div>
          <div className="text-[10px] text-midnight-muted leading-relaxed font-mono">
            <TerminalText text="ALL TRADES EXECUTED VIA SHIELDED LAYER. ORDER SIZE AND PRICE OBFUSCATED FROM PUBLIC MEMPOOL." speed={20} />
          </div>
        </div>
      </div>
    </div>
  );
};
