import React, { useState } from 'react';
import { 
  ArrowDownUp, 
  Settings, 
  ChevronDown, 
  Shield, 
  CheckCircle2, 
  Ticket, 
  ExternalLink, 
  ArrowRight 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { useStore } from '../../store';
import { ShieldedValue, Scanner, TerminalText, PrivacyShield, cn } from '../ui';
import { TokenSelector } from './TokenSelector';

export const SwapTerminal = () => {
  const { 
    isConnected, 
    privacyMode, 
    setPrivacyMode,
    tokens,
    addTransaction
  } = useStore();

  const [isSwapping, setIsSwapping] = useState(false);
  const [swapConfirmed, setSwapConfirmed] = useState(false);
  const [inputToken, setInputToken] = useState(tokens[1]); // USDC
  const [outputToken, setOutputToken] = useState(tokens[0]); // INV
  const [amount, setAmount] = useState('');
  const [isSelectingInput, setIsSelectingInput] = useState(false);
  const [isSelectingOutput, setIsSelectingOutput] = useState(false);

  const handleSwap = () => {
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    setIsSwapping(true);
    toast.info('Generating Zero-Knowledge Proof...', {
      description: 'Encrypting transaction data via Midnight layer',
      duration: 2000,
    });

    setTimeout(() => {
      setIsSwapping(false);
      setSwapConfirmed(true);
      
      const newTx = {
        id: Math.random().toString(36).substr(2, 9),
        type: 'Swap' as const,
        pair: `${inputToken.symbol} → ${outputToken.symbol}`,
        amount: amount,
        status: 'Completed' as const,
        proof: `zk_${Math.random().toString(16).substr(2, 8)}`,
        date: 'Just now'
      };
      
      addTransaction(newTx);
      toast.success('Swap Executed Successfully', {
        description: `Shielded transaction verified: ${newTx.proof}`,
      });
    }, 3000);
  };

  return (
    <Scanner active={isSwapping} className="glass-panel p-6 neon-border-purple relative overflow-hidden">
      <div className="flex items-center justify-between mb-8">
        <div className="flex flex-col">
          <h2 className="text-xl font-bold tracking-[0.2em] neon-text-purple">SWAP_INTERFACE</h2>
          <span className="text-[8px] text-midnight-muted uppercase tracking-[0.3em]">Module: Shielded_Exchange_v1</span>
        </div>
        <button className="p-2 text-midnight-muted hover:text-midnight-cyan transition-colors border border-midnight-border hover:border-midnight-cyan/30">
          <Settings size={18} />
        </button>
      </div>

      <div className="space-y-4">
        {/* Input Token */}
        <div className="bg-midnight-bg/40 border border-midnight-border p-5 focus-within:border-midnight-cyan transition-colors relative group">
          <div className="absolute top-0 left-0 w-1 h-full bg-midnight-cyan/10 group-focus-within:bg-midnight-cyan transition-colors" />
          <div className="flex justify-between mb-3">
            <span className="text-[10px] text-midnight-muted font-bold uppercase tracking-widest">Source_Asset</span>
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-midnight-muted uppercase tracking-widest">Bal:</span>
              <ShieldedValue value={inputToken.balance} suffix={` ${inputToken.symbol}`} className="text-[10px]" />
            </div>
          </div>
          <div className="flex items-center justify-between gap-4">
            <input 
              type="number" 
              placeholder="0.0000" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-transparent border-none text-3xl font-bold focus:ring-0 w-full placeholder:text-midnight-muted/20 font-mono"
            />
            <button 
              onClick={() => setIsSelectingInput(true)}
              className="flex items-center gap-2 bg-midnight-card hover:bg-midnight-border px-3 py-2 transition-colors border border-midnight-border"
            >
              <span className="text-xl">{inputToken.logo}</span>
              <span className="font-bold text-xs">{inputToken.symbol}</span>
              <ChevronDown size={14} />
            </button>
          </div>
        </div>

        {/* Swap Icon */}
        <div className="flex justify-center -my-6 relative z-10">
          <button 
            onClick={() => {
              const temp = inputToken;
              setInputToken(outputToken);
              setOutputToken(temp);
            }}
            className="p-3 bg-midnight-bg border border-midnight-border text-midnight-cyan hover:text-white hover:border-midnight-cyan transition-all duration-500 shadow-2xl group"
          >
            <ArrowDownUp size={18} className="group-hover:rotate-180 transition-transform duration-500" />
          </button>
        </div>

        {/* Output Token */}
        <div className="bg-midnight-bg/40 border border-midnight-border p-5 focus-within:border-midnight-cyan transition-colors relative group">
          <div className="absolute top-0 left-0 w-1 h-full bg-midnight-cyan/10 group-focus-within:bg-midnight-cyan transition-colors" />
          <div className="flex justify-between mb-3">
            <span className="text-[10px] text-midnight-muted font-bold uppercase tracking-widest">Target_Asset</span>
            <div className="flex items-center gap-1">
              <span className="text-[10px] text-midnight-muted uppercase tracking-widest">Bal:</span>
              <ShieldedValue value={outputToken.balance} suffix={` ${outputToken.symbol}`} className="text-[10px]" />
            </div>
          </div>
          <div className="flex items-center justify-between gap-4">
            <input 
              type="text" 
              placeholder="0.0000" 
              value={amount ? (parseFloat(amount) * (inputToken.price / outputToken.price)).toFixed(4) : ''}
              readOnly
              className="bg-transparent border-none text-3xl font-bold focus:ring-0 w-full placeholder:text-midnight-muted/20 font-mono"
            />
            <button 
              onClick={() => setIsSelectingOutput(true)}
              className="flex items-center gap-2 bg-midnight-card hover:bg-midnight-border px-3 py-2 transition-colors border border-midnight-border"
            >
              <span className="text-xl">{outputToken.logo}</span>
              <span className="font-bold text-xs">{outputToken.symbol}</span>
              <ChevronDown size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Privacy Level Selector */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[10px] text-midnight-muted uppercase tracking-widest font-bold">Privacy_Protocol</p>
          <PrivacyShield level={privacyMode === 'Standard' ? 'low' : privacyMode === 'Shielded' ? 'medium' : 'high'} />
        </div>
        <div className="grid grid-cols-3 gap-2 p-1 bg-midnight-bg/40 border border-midnight-border">
          {(['Standard', 'Shielded', 'Phantom'] as const).map((level) => (
            <button
              key={level}
              onClick={() => setPrivacyMode(level)}
              className={cn(
                "py-2 text-[10px] font-bold uppercase tracking-widest transition-all border border-transparent",
                privacyMode === level 
                  ? "bg-midnight-cyan/10 text-midnight-cyan border-midnight-cyan/30 neon-border-cyan" 
                  : "text-midnight-muted hover:text-midnight-text hover:bg-midnight-border/30"
              )}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      {/* Routing Info */}
      <div className="mt-6 p-4 bg-midnight-bg/20 border border-midnight-border space-y-3 font-mono text-[10px]">
        <div className="flex justify-between uppercase tracking-widest">
          <span className="text-midnight-muted">Route:</span>
          <span className="text-midnight-cyan flex items-center gap-1">
            Midnight_Pool <ArrowRight size={10} /> Private_Router
          </span>
        </div>
        <div className="flex justify-between uppercase tracking-widest">
          <span className="text-midnight-muted">Protocol_Fee:</span>
          <span className="text-midnight-text">0.25%</span>
        </div>
      </div>

      <button 
        onClick={handleSwap}
        disabled={isSwapping}
        className={cn(
          "terminal-button w-full mt-6 py-4 font-bold uppercase tracking-[0.2em] transition-all",
          isSwapping 
            ? "bg-midnight-border text-midnight-muted cursor-not-allowed" 
            : "bg-midnight-cyan/10 text-midnight-cyan border-midnight-cyan/30 hover:bg-midnight-cyan hover:text-midnight-bg"
        )}
      >
        {isSwapping ? (
          <div className="flex items-center justify-center gap-3">
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <Shield size={18} />
            </motion.div>
            <TerminalText text="GENERATING_ZK_PROOF..." speed={30} />
          </div>
        ) : "INITIALIZE_SWAP"}
      </button>

      {/* Confirmation Overlay */}
      <AnimatePresence>
        {swapConfirmed && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-midnight-bg/95 backdrop-blur-xl flex flex-col items-center justify-center p-8 text-center z-20 terminal-grid"
          >
            <div className="scanline" />
            <div className="w-20 h-20 border-2 border-midnight-green flex items-center justify-center mb-8 relative">
              <CheckCircle2 size={40} className="text-midnight-green" />
              <div className="absolute -top-1 -left-1 w-2 h-2 bg-midnight-green" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-midnight-green" />
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-midnight-green" />
              <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-midnight-green" />
            </div>
            
            <h3 className="text-2xl font-bold mb-2 tracking-widest neon-text-cyan">SWAP_SUCCESS</h3>
            <div className="text-midnight-muted text-[10px] mb-8 uppercase tracking-widest font-mono">
              <TerminalText text="SHIELDED_TRANSACTION_VERIFIED_BY_MIDNIGHT_LAYER" speed={20} />
            </div>
            
            <div className="w-full space-y-3 mb-8 font-mono text-[10px]">
              <div className="flex justify-between uppercase tracking-widest border-b border-midnight-border pb-2">
                <span className="text-midnight-muted">Status:</span>
                <span className="text-midnight-green font-bold">ENCRYPTED_COMPLETED</span>
              </div>
              <div className="flex justify-between uppercase tracking-widest border-b border-midnight-border pb-2">
                <span className="text-midnight-muted">Privacy_Mode:</span>
                <span className="text-midnight-cyan">{privacyMode}</span>
              </div>
              <div className="flex justify-between uppercase tracking-widest border-b border-midnight-border pb-2">
                <span className="text-midnight-muted">Proof_Hash:</span>
                <span className="text-midnight-text">zk_7f2...a9</span>
              </div>
            </div>

            <div className="w-full">
              <div className="p-4 border border-midnight-border bg-midnight-card/50 flex items-center justify-between hover:border-midnight-cyan transition-colors cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="p-2 border border-midnight-cyan/20 text-midnight-cyan">
                    <Ticket size={20} />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-bold uppercase tracking-widest">zkReceipt_NFT_Issued</p>
                    <p className="text-[8px] text-midnight-muted uppercase">Proof of trade without data reveal</p>
                  </div>
                </div>
                <ExternalLink size={14} className="text-midnight-muted group-hover:text-midnight-cyan" />
              </div>
            </div>

            <button 
              onClick={() => setSwapConfirmed(false)}
              className="mt-8 terminal-button text-midnight-muted hover:text-midnight-cyan text-[10px] font-bold uppercase tracking-widest"
            >
              Terminate_Session
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <TokenSelector 
        isOpen={isSelectingInput}
        onClose={() => setIsSelectingInput(false)}
        onSelect={setInputToken}
        selectedTokenId={inputToken.id}
      />

      <TokenSelector 
        isOpen={isSelectingOutput}
        onClose={() => setIsSelectingOutput(false)}
        onSelect={setOutputToken}
        selectedTokenId={outputToken.id}
      />
    </Scanner>
  );
};
