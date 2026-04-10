import React, { useState } from 'react';
import { X, Shield, Droplets, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../../store';
import { cn, TerminalText, Scanner } from '../ui';
import { toast } from 'sonner';

interface AddLiquidityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddLiquidityModal = ({ isOpen, onClose }: AddLiquidityModalProps) => {
  const { tokens, addLiquidity, addTransaction, isConnected } = useStore();
  const [amount0, setAmount0] = useState('');
  const [amount1, setAmount1] = useState('');
  const [isSupplying, setIsSupplying] = useState(false);

  const handleSupply = () => {
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }
    if (!amount0 || !amount1) {
      toast.error('Please enter amounts for both assets');
      return;
    }

    setIsSupplying(true);
    toast.info('Initializing Shielded Pool Deposit...', {
      description: 'Generating ZK-Proof for liquidity provision',
      duration: 2000,
    });

    setTimeout(() => {
      setIsSupplying(false);
      addLiquidity('1', amount0); // Mocking pool ID 1
      
      const newTx = {
        id: Math.random().toString(36).substr(2, 9),
        type: 'Liquidity' as const,
        pair: 'INV / ETH',
        amount: 'Supply',
        status: 'Completed' as const,
        proof: `zk_lp_${Math.random().toString(16).substr(2, 8)}`,
        date: 'Just now'
      };
      
      addTransaction(newTx);
      toast.success('Liquidity Provided Successfully', {
        description: `Shielded LP tokens minted: ${newTx.proof}`,
      });
      onClose();
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-midnight-bg/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg glass-panel border-midnight-cyan/30 overflow-hidden font-mono"
          >
            <div className="scanline opacity-5" />
            
            <div className="p-6 border-b border-midnight-border flex items-center justify-between relative">
              <div className="flex flex-col">
                <h3 className="text-lg font-bold tracking-[0.2em] uppercase neon-text-cyan">Initialize_Pool_Node</h3>
                <span className="text-[8px] text-midnight-muted uppercase tracking-[0.3em]">Protocol: Shielded_LP_v1</span>
              </div>
              <button onClick={onClose} className="p-1 hover:text-midnight-cyan transition-colors">
                <X size={20} />
              </button>
            </div>

            <Scanner active={isSupplying} className="p-6 space-y-6">
              <div className="space-y-4">
                {/* Asset 0 */}
                <div className="bg-midnight-bg/40 border border-midnight-border p-5 relative group">
                  <div className="flex justify-between mb-3">
                    <span className="text-[10px] text-midnight-muted font-bold uppercase tracking-widest">Asset_01</span>
                    <span className="text-[10px] text-midnight-muted uppercase tracking-widest">Bal: {tokens[0].balance}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <input 
                      type="number" 
                      placeholder="0.00" 
                      value={amount0}
                      onChange={(e) => setAmount0(e.target.value)}
                      className="bg-transparent border-none text-2xl font-bold focus:ring-0 w-full placeholder:text-midnight-muted/20"
                    />
                    <div className="flex items-center gap-2 bg-midnight-card px-3 py-2 border border-midnight-border">
                      <span className="text-xl">{tokens[0].logo}</span>
                      <span className="font-bold text-xs">{tokens[0].symbol}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center -my-4 relative z-10">
                  <div className="p-2 bg-midnight-bg border border-midnight-border text-midnight-cyan">
                    <Droplets size={16} />
                  </div>
                </div>

                {/* Asset 1 */}
                <div className="bg-midnight-bg/40 border border-midnight-border p-5 relative group">
                  <div className="flex justify-between mb-3">
                    <span className="text-[10px] text-midnight-muted font-bold uppercase tracking-widest">Asset_02</span>
                    <span className="text-[10px] text-midnight-muted uppercase tracking-widest">Bal: {tokens[1].balance}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <input 
                      type="number" 
                      placeholder="0.00" 
                      value={amount1}
                      onChange={(e) => setAmount1(e.target.value)}
                      className="bg-transparent border-none text-2xl font-bold focus:ring-0 w-full placeholder:text-midnight-muted/20"
                    />
                    <div className="flex items-center gap-2 bg-midnight-card px-3 py-2 border border-midnight-border">
                      <span className="text-xl">{tokens[1].logo}</span>
                      <span className="font-bold text-xs">{tokens[1].symbol}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-midnight-cyan/5 border border-midnight-cyan/20 space-y-2">
                <div className="flex justify-between text-[10px] uppercase tracking-widest">
                  <span className="text-midnight-muted">Est_Pool_Share:</span>
                  <span className="text-midnight-cyan">{"<"} 0.01%</span>
                </div>
                <div className="flex justify-between text-[10px] uppercase tracking-widest">
                  <span className="text-midnight-muted">Est_APR:</span>
                  <span className="text-midnight-green">24.5%</span>
                </div>
              </div>

              <button 
                onClick={handleSupply}
                disabled={isSupplying}
                className={cn(
                  "terminal-button w-full py-4 font-bold uppercase tracking-[0.2em] transition-all",
                  isSupplying 
                    ? "bg-midnight-border text-midnight-muted cursor-not-allowed" 
                    : "bg-midnight-cyan/10 text-midnight-cyan border border-midnight-cyan/30 hover:bg-midnight-cyan hover:text-midnight-bg"
                )}
              >
                {isSupplying ? (
                  <div className="flex items-center justify-center gap-3">
                    <motion.div 
                      animate={{ rotate: 360 }} 
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    >
                      <Shield size={18} />
                    </motion.div>
                    <TerminalText text="GENERATING_ZK_PROOF..." speed={30} />
                  </div>
                ) : "Supply_Liquidity"}
              </button>
            </Scanner>

            <div className="p-4 bg-midnight-bg/40 border-t border-midnight-border text-[8px] text-midnight-muted uppercase tracking-[0.2em] flex items-center gap-2">
              <Shield size={10} className="text-midnight-cyan" />
              <span>Your_Liquidity_Is_Shielded_From_Public_View</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
