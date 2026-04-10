import React, { useState } from 'react';
import { Trophy, Zap, Shield, ArrowRight, TrendingUp, Activity, Cpu, Gift, ExternalLink } from 'lucide-react';
import { cn, Scanner, TerminalText } from '../ui';
import { useStore } from '../../store';
import { toast } from 'sonner';
import { motion } from 'motion/react';

export const RewardsDashboard = () => {
  const { rewards, claimRewards, isConnected } = useStore();
  const [isClaiming, setIsClaiming] = useState(false);

  const handleClaim = () => {
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }
    setIsClaiming(true);
    toast.info('Initiating Reward Claim...', {
      description: 'Verifying agent activity proofs',
      duration: 2000,
    });

    setTimeout(() => {
      claimRewards();
      setIsClaiming(false);
      toast.success('Rewards Claimed Successfully', {
        description: 'INV tokens transferred to your shielded balance',
      });
    }, 2500);
  };

  return (
    <div className="space-y-8 font-mono">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold tracking-[0.2em] uppercase neon-text-cyan">REWARDS_DASHBOARD</h2>
          <span className="text-[8px] text-midnight-muted uppercase tracking-[0.3em]">Protocol: INV_Yield_Engine_v1.2</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 border border-midnight-border bg-midnight-bg/40">
            <p className="text-[8px] text-midnight-muted uppercase tracking-widest mb-1">Current_APR</p>
            <p className="text-sm font-bold text-midnight-green tracking-widest">24.5%</p>
          </div>
          <div className="px-4 py-2 border border-midnight-border bg-midnight-bg/40">
            <p className="text-[8px] text-midnight-muted uppercase tracking-widest mb-1">Total_Distributed</p>
            <p className="text-sm font-bold text-midnight-cyan tracking-widest">1.2M INV</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Scanner active={isClaiming} className="lg:col-span-2 glass-panel p-8 border-midnight-cyan/30 bg-midnight-cyan/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Trophy size={120} />
          </div>
          <div className="relative z-10">
            <h3 className="text-lg font-bold tracking-widest uppercase mb-8 flex items-center gap-3">
              <Gift className="text-midnight-cyan" size={20} />
              Accrued_Protocol_Rewards
            </h3>
            
            <div className="flex flex-col md:flex-row items-center gap-12 mb-12">
              <div className="text-center md:text-left">
                <p className="text-[10px] text-midnight-muted uppercase tracking-[0.2em] font-bold mb-2">PENDING_CLAIM</p>
                <p className="text-5xl font-bold tracking-tighter neon-text-cyan">{rewards.pending} <span className="text-xl">INV</span></p>
                <p className="text-[10px] text-midnight-muted uppercase mt-2 tracking-widest">≈ ${(parseFloat(rewards.pending) * 0.42).toFixed(2)} USD</p>
              </div>
              
              <div className="hidden md:block h-20 w-[1px] bg-midnight-border" />
              
              <div className="text-center md:text-left">
                <p className="text-[10px] text-midnight-muted uppercase tracking-[0.2em] font-bold mb-2">LIFETIME_EARNINGS</p>
                <p className="text-3xl font-bold tracking-tighter text-midnight-text">{rewards.earned} <span className="text-sm">INV</span></p>
                <p className="text-[10px] text-midnight-muted uppercase mt-2 tracking-widest">Verified_On_Chain</p>
              </div>
            </div>

            <button 
              onClick={handleClaim}
              disabled={isClaiming || parseFloat(rewards.pending) === 0}
              className={cn(
                "terminal-button w-full py-4 font-bold uppercase tracking-[0.2em] transition-all text-sm",
                isClaiming || parseFloat(rewards.pending) === 0
                  ? "bg-midnight-border text-midnight-muted cursor-not-allowed"
                  : "bg-midnight-cyan/10 text-midnight-cyan border border-midnight-cyan/30 hover:bg-midnight-cyan hover:text-midnight-bg"
              )}
            >
              {isClaiming ? "VERIFYING_PROOFS..." : "CLAIM_SHIELDED_REWARDS"}
            </button>
          </div>
        </Scanner>

        <div className="glass-panel p-6 border-midnight-border/50 flex flex-col justify-between">
          <div>
            <h3 className="text-[10px] text-midnight-muted font-bold uppercase tracking-[0.2em] mb-6">REWARD_STREAMS</h3>
            <div className="space-y-4">
              {[
                { label: 'Liquidity_Mining', value: '12.40 INV', status: 'Active' },
                { label: 'Agent_Node_Fees', value: '8.20 INV', status: 'Active' },
                { label: 'Governance_Bonus', value: '3.40 INV', status: 'Pending' },
              ].map((stream, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-midnight-bg/40 border border-midnight-border/50">
                  <span className="text-[10px] text-midnight-muted uppercase tracking-widest">{stream.label}</span>
                  <div className="text-right">
                    <p className="text-xs font-bold tracking-widest">{stream.value}</p>
                    <p className={cn("text-[8px] uppercase tracking-tighter", stream.status === 'Active' ? 'text-midnight-green' : 'text-midnight-muted')}>{stream.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 p-4 bg-midnight-card border border-midnight-border text-[10px] text-midnight-muted uppercase tracking-widest leading-relaxed">
            Rewards are distributed every 24 hours based on your shielded activity score.
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-6 border-midnight-border/50">
          <h3 className="text-[10px] text-midnight-muted font-bold uppercase tracking-[0.2em] mb-6">YIELD_OPTIMIZATION</h3>
          <div className="space-y-4">
            {[
              { title: 'Boost_Multiplier', value: '1.2x', desc: 'Stake INV to increase rewards' },
              { title: 'Privacy_Mining', value: 'Active', desc: 'Earn for providing decoy liquidity' },
              { title: 'Referral_Node', value: '0 Active', desc: 'Invite agents to earn 5% of their fees' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 p-4 bg-midnight-bg/40 border border-midnight-border/50">
                <div className="p-2 border border-midnight-border bg-midnight-card text-midnight-cyan">
                  <Zap size={16} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-xs font-bold tracking-widest uppercase">{item.title}</p>
                    <span className="text-[10px] text-midnight-cyan font-bold">{item.value}</span>
                  </div>
                  <p className="text-[10px] text-midnight-muted uppercase tracking-tighter">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-6 border-midnight-border/50">
          <h3 className="text-[10px] text-midnight-muted font-bold uppercase tracking-[0.2em] mb-6">CLAIM_HISTORY</h3>
          <div className="space-y-2">
            {[
              { date: '2026-04-08', amount: '45.00 INV', proof: 'zk_cl_7f2...a9' },
              { date: '2026-04-01', amount: '80.00 INV', proof: 'zk_cl_2c4...d5' },
            ].map((claim, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-midnight-bg/40 border border-midnight-border/50 hover:border-midnight-cyan/20 transition-all group">
                <div>
                  <p className="text-xs font-bold tracking-widest">{claim.amount}</p>
                  <p className="text-[8px] text-midnight-muted uppercase">{claim.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[8px] text-midnight-muted font-mono uppercase tracking-tighter">{claim.proof}</span>
                  <ExternalLink size={10} className="text-midnight-muted group-hover:text-midnight-cyan" />
                </div>
              </div>
            ))}
            <button className="w-full py-2 text-[8px] text-midnight-muted uppercase tracking-[0.3em] hover:text-midnight-cyan transition-colors mt-2">
              View_All_Claims
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
