import { Users, Trophy, Zap, Shield, ArrowRight, TrendingUp, Activity, Cpu, CheckCircle2 } from 'lucide-react';
import { cn, Scanner, TerminalText } from '../ui';
import { useStore } from '../../store';
import { toast } from 'sonner';
import { useState } from 'react';

export const AgentsDashboard = () => {
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
      <Scanner className="glass-panel p-10 relative overflow-hidden border-midnight-cyan/20">
        <div className="absolute top-0 right-0 w-64 h-64 bg-midnight-cyan/5 blur-[80px] rounded-full -mr-32 -mt-32" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 border border-midnight-cyan text-midnight-cyan">
              <Cpu size={24} />
            </div>
            <h2 className="text-3xl font-bold tracking-[0.2em] neon-text-cyan uppercase">AGENT_ECONOMY</h2>
          </div>
          <p className="text-midnight-muted max-w-xl mb-8 leading-relaxed text-xs uppercase tracking-widest">
            <TerminalText text="BECOME AN INVISIBLE AGENT. RUN A NODE, PROVIDE DECOY LIQUIDITY, OR BUILD PRIVACY-PRESERVING TOOLS TO EARN PROTOCOL FEES AND INV REWARDS." speed={20} />
          </p>
          <div className="flex gap-4">
            <button className="terminal-button px-8 py-3 bg-midnight-cyan/10 text-midnight-cyan border border-midnight-cyan/30 font-bold text-xs uppercase tracking-widest hover:bg-midnight-cyan hover:text-midnight-bg transition-all">
              Initialize_Agent_Node
            </button>
            <button className="terminal-button px-8 py-3 border border-midnight-border text-midnight-muted font-bold text-xs uppercase tracking-widest hover:border-midnight-text hover:text-midnight-text transition-all">
              Read_Whitepaper
            </button>
          </div>
        </div>
      </Scanner>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 border-midnight-cyan/30 bg-midnight-cyan/5">
          <div className="p-2 border border-midnight-cyan w-fit mb-4 bg-midnight-card text-midnight-cyan">
            <Trophy size={20} />
          </div>
          <p className="text-[10px] text-midnight-muted uppercase tracking-[0.2em] font-bold mb-1">YOUR_REWARDS</p>
          <div className="flex items-end justify-between">
            <p className="text-2xl font-bold tracking-tighter neon-text-cyan">{rewards.pending} INV</p>
            <button 
              onClick={handleClaim}
              disabled={isClaiming || parseFloat(rewards.pending) === 0}
              className={cn(
                "text-[10px] font-bold uppercase tracking-widest px-3 py-1 border transition-all",
                isClaiming || parseFloat(rewards.pending) === 0
                  ? "border-midnight-border text-midnight-muted cursor-not-allowed"
                  : "border-midnight-cyan text-midnight-cyan hover:bg-midnight-cyan hover:text-midnight-bg"
              )}
            >
              {isClaiming ? "CLAIMING..." : "CLAIM_NOW"}
            </button>
          </div>
          <p className="text-[8px] text-midnight-muted uppercase mt-2">Total Earned: {rewards.earned} INV</p>
        </div>

        {[
          { label: 'ACTIVE_AGENTS', value: '1,240', icon: Users, color: 'text-midnight-cyan' },
          { label: 'NETWORK_SECURITY', value: '99.9%', icon: Shield, color: 'text-midnight-green' },
        ].map((stat, i) => (
          <div key={i} className="glass-panel p-6 border-midnight-border/50">
            <div className={cn("p-2 border border-midnight-border w-fit mb-4 bg-midnight-card", stat.color)}>
              <stat.icon size={20} />
            </div>
            <p className="text-[10px] text-midnight-muted uppercase tracking-[0.2em] font-bold mb-1">{stat.label}</p>
            <p className="text-2xl font-bold tracking-tighter">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-panel p-6 border-midnight-border/50">
          <h3 className="text-[10px] text-midnight-muted font-bold uppercase tracking-[0.2em] mb-6">MY_NODE_STATUS</h3>
          <div className="space-y-4">
            {[
              { label: 'Node_ID', value: 'AGN-7429-X', status: 'Online', icon: CheckCircle2 },
              { label: 'Uptime', value: '14d 02h 45m', status: 'Stable', icon: Activity },
              { label: 'Privacy_Score', value: '94.2', status: 'High', icon: Shield },
              { label: 'Protocol_Version', value: 'v4.0.2', status: 'Current', icon: Zap },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-midnight-bg/40 border border-midnight-border/50">
                <div className="flex items-center gap-3">
                  <item.icon size={16} className="text-midnight-cyan" />
                  <span className="text-[10px] text-midnight-muted uppercase tracking-widest">{item.label}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold tracking-widest">{item.value}</p>
                  <p className="text-[8px] text-midnight-green uppercase tracking-tighter">{item.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-6 border-midnight-border/50">
          <h3 className="text-[10px] text-midnight-muted font-bold uppercase tracking-[0.2em] mb-6">TOP_AGENTS_WEEKLY</h3>
          <div className="space-y-4">
            {[
              { rank: 1, name: 'Ghost_Protocol', score: 98.5, rewards: '1,200 INV' },
              { rank: 2, name: 'Shadow_Runner', score: 95.2, rewards: '950 INV' },
              { rank: 3, name: 'Midnight_Node', score: 92.8, rewards: '820 INV' },
            ].map((agent) => (
              <div key={agent.rank} className="flex items-center justify-between p-4 bg-midnight-bg/40 border border-midnight-border/50 hover:border-midnight-cyan/30 transition-all group">
                <div className="flex items-center gap-4">
                  <span className="text-lg font-bold text-midnight-muted tracking-tighter">#{agent.rank}</span>
                  <div>
                    <p className="text-sm font-bold tracking-widest group-hover:neon-text-cyan transition-all">{agent.name}</p>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-1 bg-midnight-border overflow-hidden">
                        <div className="h-full bg-midnight-cyan" style={{ width: `${agent.score}%` }} />
                      </div>
                      <span className="text-[8px] text-midnight-muted uppercase tracking-tighter">{agent.score} Privacy_Score</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-midnight-cyan">{agent.rewards}</p>
                  <p className="text-[8px] text-midnight-muted uppercase tracking-tighter">Accrued</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
