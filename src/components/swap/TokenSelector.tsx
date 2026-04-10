import React, { useState } from 'react';
import { Search, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '../../store';
import { cn } from '../ui';

interface TokenSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (token: any) => void;
  selectedTokenId?: string;
}

export const TokenSelector = ({ isOpen, onClose, onSelect, selectedTokenId }: TokenSelectorProps) => {
  const { tokens } = useStore();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTokens = tokens.filter(token => 
    token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    token.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            className="relative w-full max-w-md glass-panel border-midnight-cyan/30 overflow-hidden font-mono"
          >
            <div className="scanline opacity-5" />
            
            <div className="p-6 border-b border-midnight-border flex items-center justify-between relative">
              <h3 className="text-lg font-bold tracking-[0.2em] uppercase neon-text-cyan">Select_Asset</h3>
              <button onClick={onClose} className="p-1 hover:text-midnight-cyan transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-4">
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-midnight-muted" size={18} />
                <input
                  type="text"
                  placeholder="Search_by_name_or_address..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-midnight-bg/60 border border-midnight-border py-3 pl-10 pr-4 focus:border-midnight-cyan focus:ring-0 text-sm uppercase tracking-widest"
                />
              </div>

              <div className="max-h-[400px] overflow-y-auto space-y-2 custom-scrollbar pr-2">
                {filteredTokens.length > 0 ? (
                  filteredTokens.map((token) => (
                    <button
                      key={token.id}
                      onClick={() => {
                        onSelect(token);
                        onClose();
                      }}
                      className={cn(
                        "w-full flex items-center justify-between p-4 border transition-all group",
                        selectedTokenId === token.id
                          ? "border-midnight-cyan bg-midnight-cyan/5"
                          : "border-midnight-border hover:border-midnight-cyan/30 hover:bg-midnight-card"
                      )}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 border border-midnight-border flex items-center justify-center text-2xl bg-midnight-bg group-hover:border-midnight-cyan/50 transition-colors">
                          {token.logo}
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-sm tracking-widest uppercase group-hover:text-midnight-cyan transition-colors">
                            {token.symbol}
                          </p>
                          <p className="text-[10px] text-midnight-muted uppercase tracking-tighter">
                            {token.name}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold font-mono">{token.balance}</p>
                        {selectedTokenId === token.id && (
                          <Check size={14} className="text-midnight-cyan ml-auto mt-1" />
                        )}
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="py-12 text-center text-midnight-muted uppercase tracking-widest text-[10px]">
                    No_Assets_Found_In_Registry
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 bg-midnight-bg/40 border-t border-midnight-border text-[8px] text-midnight-muted uppercase tracking-[0.2em] flex justify-between">
              <span>Registry: Midnight_Mainnet_v1</span>
              <span>Verified_Assets_Only</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
