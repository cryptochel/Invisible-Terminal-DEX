import React, { useState } from 'react';
import { 
  ArrowDownUp, 
  LayoutGrid, 
  BarChart3, 
  User, 
  Shield, 
  ShieldCheck, 
  ShieldAlert, 
  Settings, 
  ChevronDown, 
  Zap, 
  Lock, 
  History, 
  TrendingUp, 
  Activity, 
  Users, 
  Trophy, 
  ArrowRight, 
  Database, 
  Cpu,
  Droplets,
  CheckCircle2,
  Menu,
  X
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { Toaster, toast } from 'sonner';
import { useStore } from './store';
import { useWeb3 } from './hooks/useWeb3';
import { ShieldedValue, PageTransition, cn, Scanner, TerminalText, PrivacyShield } from './components/ui';
import { WalletConnect } from './components/wallet/WalletConnect';
import { SwapTerminal } from './components/swap/SwapTerminal';
import { PortfolioView } from './components/portfolio/PortfolioView';
import { PoolsList } from './components/liquidity/PoolsList';
import { TradeTerminal } from './components/trade/TradeTerminal';
import { AgentsDashboard } from './components/agents/AgentsDashboard';
import { RewardsDashboard } from './components/rewards/RewardsDashboard';
import { ANALYTICS_DATA } from './constants';

type Page = 'landing' | 'swap' | 'pools' | 'trade' | 'portfolio' | 'settings' | 'rewards' | 'history' | 'add-liquidity' | 'agents' | 'analytics' | 'profile';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isConnected, address, privacyMode, history, tokens } = useStore();
  const { disconnect } = useWeb3();

  if (currentPage === 'landing') {
    return (
      <div className="min-h-screen bg-midnight-bg flex flex-col items-center relative overflow-x-hidden terminal-grid">
        <div className="scanline fixed pointer-events-none" />
        <div className="fixed top-0 left-0 w-full h-full bg-midnight-bg/20 pointer-events-none" />
        
        {/* Navigation for Landing */}
        <nav className="w-full max-w-7xl px-6 py-8 flex items-center justify-between z-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border border-midnight-cyan flex items-center justify-center neon-border-cyan">
              <Shield className="text-midnight-cyan" size={20} />
            </div>
            <span className="text-lg font-bold tracking-widest neon-text-cyan uppercase">Invisible_DEX</span>
          </div>
          <button 
            onClick={() => setCurrentPage('swap')}
            className="px-6 py-2 border border-midnight-cyan text-midnight-cyan text-[10px] font-bold uppercase tracking-widest hover:bg-midnight-cyan hover:text-midnight-bg transition-all"
          >
            Launch_App
          </button>
        </nav>

        {/* Hero Section */}
        <section className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center z-10 max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="crt-flicker"
          >
            <div className="flex flex-col items-center justify-center gap-6 mb-12">
              <div className="w-24 h-24 border-2 border-midnight-cyan flex items-center justify-center neon-border-cyan relative">
                <Shield className="text-midnight-cyan animate-pulse" size={48} />
                <div className="absolute -top-1 -left-1 w-2 h-2 bg-midnight-cyan" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-midnight-cyan" />
                <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-midnight-cyan" />
                <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-midnight-cyan" />
              </div>
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-bold tracking-[0.2em] neon-text-cyan uppercase leading-tight">
                  Trade_Without<br/>Being_Watched
                </h1>
                <p className="text-sm md:text-lg text-midnight-muted tracking-[0.3em] uppercase max-w-2xl mx-auto">
                  The first privacy-native DEX for Midnight.
                </p>
              </div>
            </div>

            <div className="glass-panel p-8 mb-12 border-midnight-cyan/20 relative max-w-xl mx-auto">
              <div className="absolute top-0 left-0 w-full h-1 bg-midnight-cyan/20" />
              <div className="text-left font-mono text-sm space-y-2 mb-8 text-midnight-muted">
                <p><span className="text-midnight-cyan">{">"}</span> INITIALIZING ENCRYPTION PROTOCOLS...</p>
                <p><span className="text-midnight-cyan">{">"}</span> ESTABLISHING ZERO-KNOWLEDGE TUNNEL...</p>
                <p><span className="text-midnight-cyan">{">"}</span> <TerminalText text="ACCESSING SHIELDED LIQUIDITY POOLS..." speed={30} /></p>
              </div>

              <button 
                onClick={() => setCurrentPage('swap')}
                className="terminal-button w-full py-5 bg-midnight-cyan/10 text-midnight-cyan font-bold uppercase tracking-widest hover:bg-midnight-cyan hover:text-midnight-bg transition-all text-sm"
              >
                Initialize_Connection
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 max-w-xl mx-auto">
              {[
                { label: 'Network', value: 'Midnight' },
                { label: 'Status', value: 'Encrypted' },
                { label: 'Security', value: 'ZK-Level 5' },
              ].map((item, i) => (
                <div key={i} className="border border-midnight-border p-4 text-left bg-midnight-bg/40">
                  <p className="text-[8px] text-midnight-muted uppercase tracking-widest mb-1">{item.label}</p>
                  <p className="text-xs font-bold text-midnight-text tracking-widest">{item.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-32 px-6 w-full max-w-7xl z-10">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="md:w-1/3 sticky top-32">
              <h2 className="text-4xl font-bold tracking-[0.2em] neon-text-cyan uppercase mb-6">Core_Features</h2>
              <p className="text-midnight-muted uppercase tracking-widest text-xs leading-relaxed">
                Invisible DEX leverages Midnight's Zero-Knowledge technology to provide a trading experience that is both powerful and private.
              </p>
            </div>
            <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: 'Shielded_Swaps', desc: 'Execute trades without revealing your wallet address or transaction amounts to the public.', icon: Shield },
                { title: 'Private_Liquidity', desc: 'Provide liquidity to pools and earn rewards while maintaining complete anonymity.', icon: Droplets },
                { title: 'Anti-MEV_Protection', desc: 'Shielded transactions are naturally resistant to front-running and sandwich attacks.', icon: Zap },
                { title: 'ZK-Proofs', desc: 'Every transaction is verified by Zero-Knowledge proofs, ensuring integrity without data leaks.', icon: Lock },
              ].map((feature, i) => (
                <div key={i} className="glass-panel p-8 border-midnight-border/50 hover:border-midnight-cyan/30 transition-all group">
                  <div className="w-12 h-12 border border-midnight-border flex items-center justify-center mb-6 group-hover:border-midnight-cyan transition-colors">
                    <feature.icon className="text-midnight-muted group-hover:text-midnight-cyan transition-colors" size={24} />
                  </div>
                  <h3 className="text-lg font-bold tracking-widest uppercase mb-4 group-hover:neon-text-cyan transition-all">{feature.title}</h3>
                  <p className="text-xs text-midnight-muted uppercase tracking-tighter leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Privacy Explanation */}
        <section className="py-32 px-6 w-full max-w-7xl z-10">
          <Scanner className="glass-panel p-12 border-midnight-cyan/20 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold tracking-[0.2em] neon-text-cyan uppercase mb-8">The_Privacy_Layer</h2>
                <div className="space-y-6 text-sm text-midnight-muted font-mono">
                  <p><span className="text-midnight-cyan">{"["}01{"]"}</span> Traditional DEXs leak your entire trading history, balance, and strategy to anyone with a block explorer.</p>
                  <p><span className="text-midnight-cyan">{"["}02{"]"}</span> Invisible DEX uses Midnight's DUST protocol to obfuscate transaction metadata while maintaining regulatory compliance through selective disclosure.</p>
                  <p><span className="text-midnight-cyan">{"["}03{"]"}</span> Your data remains yours. You decide who sees what, when, and how.</p>
                </div>
                <div className="mt-12 flex items-center gap-6">
                  <div className="flex flex-col">
                    <span className="text-[8px] text-midnight-muted uppercase mb-2">Security_Protocol</span>
                    <PrivacyShield level="high" />
                  </div>
                  <div className="h-12 w-[1px] bg-midnight-border" />
                  <div className="flex flex-col">
                    <span className="text-[8px] text-midnight-muted uppercase mb-2">Encryption_Standard</span>
                    <span className="text-xs font-bold text-midnight-text tracking-widest uppercase">ZK-SNARKs_v2</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-midnight-cyan/5 animate-pulse" />
                <div className="border border-midnight-cyan/30 p-8 relative">
                  <div className="absolute -top-1 -left-1 w-2 h-2 bg-midnight-cyan" />
                  <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-midnight-cyan" />
                  <div className="space-y-4 font-mono text-[10px] text-midnight-cyan/60">
                    <p>{">"} ENCRYPTING_PAYLOAD...</p>
                    <p>{">"} GENERATING_ZK_PROOF...</p>
                    <p>{">"} OBFUSCATING_SENDER_ADDR...</p>
                    <p>{">"} OBFUSCATING_AMOUNT...</p>
                    <p className="text-midnight-green">{">"} PROOF_VERIFIED_SUCCESSFULLY</p>
                    <div className="h-24 w-full bg-midnight-cyan/10 border border-midnight-cyan/20 flex items-center justify-center">
                      <ShieldCheck size={48} className="text-midnight-cyan animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Scanner>
        </section>

        {/* INV Token Section */}
        <section className="py-32 px-6 w-full max-w-7xl z-10">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <div className="w-20 h-20 border border-midnight-accent flex items-center justify-center neon-border-purple mb-8">
                <span className="text-4xl">🕶️</span>
              </div>
              <h2 className="text-4xl font-bold tracking-[0.2em] neon-text-purple uppercase mb-6">The_INV_Token</h2>
              <p className="text-midnight-muted uppercase tracking-widest text-xs leading-relaxed mb-8">
                Invisible Token (INV) is the governance and utility engine of the Invisible DEX ecosystem.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Fee_Discounts', value: 'Up to 50%' },
                  { label: 'Governance', value: 'DAO Voting' },
                  { label: 'Staking_Rewards', value: '12% APR' },
                  { label: 'Privacy_Mining', value: 'Earn INV' },
                ].map((item, i) => (
                  <div key={i} className="p-4 border border-midnight-border bg-midnight-bg/40">
                    <p className="text-[8px] text-midnight-muted uppercase tracking-widest mb-1">{item.label}</p>
                    <p className="text-sm font-bold text-midnight-accent tracking-widest">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 w-full">
              <div className="glass-panel p-8 border-midnight-accent/20 relative overflow-hidden">
                <div className="scanline opacity-5" />
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-sm font-bold tracking-widest uppercase">Token_Distribution</h3>
                  <Trophy size={18} className="text-midnight-accent" />
                </div>
                <div className="space-y-6">
                  {[
                    { label: 'Community_Rewards', value: 45, color: 'bg-midnight-accent' },
                    { label: 'Liquidity_Mining', value: 25, color: 'bg-midnight-cyan' },
                    { label: 'Ecosystem_Growth', value: 20, color: 'bg-midnight-muted' },
                    { label: 'Core_Contributors', value: 10, color: 'bg-midnight-border' },
                  ].map((item, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-[10px] uppercase tracking-widest font-bold">
                        <span>{item.label}</span>
                        <span>{item.value}%</span>
                      </div>
                      <div className="h-1 w-full bg-midnight-bg border border-midnight-border">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.value}%` }}
                          className={cn("h-full", item.color)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-32 px-6 w-full max-w-3xl text-center z-10">
          <div className="glass-panel p-12 border-midnight-cyan/30 relative">
            <div className="absolute -top-1 -left-1 w-2 h-2 bg-midnight-cyan" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-midnight-cyan" />
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-midnight-cyan" />
            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-midnight-cyan" />
            
            <h2 className="text-3xl md:text-5xl font-bold tracking-[0.2em] neon-text-cyan uppercase mb-8 leading-tight">
              Ready_To_Enter<br/>The_Shadows?
            </h2>
            <p className="text-xs text-midnight-muted uppercase tracking-[0.3em] mb-12 max-w-md mx-auto">
              Join the first privacy-native liquidity layer on Midnight.
            </p>
            <button 
              onClick={() => setCurrentPage('swap')}
              className="terminal-button px-12 py-5 bg-midnight-cyan/10 text-midnight-cyan font-bold uppercase tracking-widest hover:bg-midnight-cyan hover:text-midnight-bg transition-all text-sm"
            >
              Initialize_Terminal
            </button>
          </div>
        </section>

        {/* Footer for Landing */}
        <footer className="w-full py-12 px-6 border-t border-midnight-border z-10 bg-midnight-bg/80 backdrop-blur-md">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 border border-midnight-border flex items-center justify-center">
                <Shield className="text-midnight-muted" size={16} />
              </div>
              <span className="text-sm font-bold tracking-widest text-midnight-muted uppercase">Invisible_DEX</span>
            </div>
            <div className="flex gap-8 text-[10px] text-midnight-muted uppercase tracking-widest font-bold">
              <a href="#" className="hover:text-midnight-cyan transition-colors">Documentation</a>
              <a href="#" className="hover:text-midnight-cyan transition-colors">Security_Audit</a>
              <a href="#" className="hover:text-midnight-cyan transition-colors">Privacy_Policy</a>
              <a href="#" className="hover:text-midnight-cyan transition-colors">Twitter</a>
            </div>
            <div className="text-[10px] text-midnight-muted uppercase tracking-widest">
              © 2026 Midnight_City_Agents
            </div>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-midnight-bg terminal-grid relative overflow-hidden">
      <div className="scanline" />
      <Toaster position="top-right" theme="dark" richColors closeButton />

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[100] bg-midnight-bg/95 backdrop-blur-md lg:hidden pt-24 px-6"
          >
            <div className="scanline opacity-10" />
            <div className="grid grid-cols-1 gap-4">
              {[
                { id: 'swap', icon: ArrowDownUp, label: 'SWAP' },
                { id: 'pools', icon: LayoutGrid, label: 'LIQUIDITY' },
                { id: 'trade', icon: Activity, label: 'TRADE' },
                { id: 'portfolio', icon: User, label: 'PORTFOLIO' },
                { id: 'rewards', icon: Trophy, label: 'REWARDS' },
                { id: 'agents', icon: Users, label: 'AGENTS' },
                { id: 'analytics', icon: BarChart3, label: 'STATS' },
                { id: 'settings', icon: Settings, label: 'CONFIG' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id as Page);
                    setIsMobileMenuOpen(false);
                  }}
                  className={cn(
                    "flex items-center gap-4 p-4 border transition-all duration-200 uppercase tracking-[0.2em] text-xs font-bold",
                    currentPage === item.id 
                      ? "border-midnight-cyan text-midnight-cyan bg-midnight-cyan/10 neon-border-cyan" 
                      : "border-midnight-border text-midnight-muted hover:border-midnight-cyan/30 hover:text-midnight-text"
                  )}
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
            
            <div className="mt-12 p-6 border border-midnight-border bg-midnight-card/30">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] text-midnight-muted uppercase tracking-widest">Privacy_Node</span>
                <span className="text-[10px] text-midnight-green font-bold uppercase">Active</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-midnight-muted uppercase tracking-widest">Network</span>
                <span className="text-[10px] text-midnight-text font-bold uppercase tracking-widest">Midnight_Mainnet</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <nav className="terminal-header px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4 cursor-pointer group" onClick={() => setCurrentPage('landing')}>
          <div className="w-10 h-10 border border-midnight-cyan flex items-center justify-center neon-border-cyan group-hover:bg-midnight-cyan/10 transition-all">
            <Shield className="text-midnight-cyan" size={20} />
          </div>
          <div className="hidden sm:block">
            <span className="text-lg font-bold tracking-widest neon-text-cyan block leading-none">MIDNIGHT</span>
            <span className="text-[8px] text-midnight-muted tracking-[0.3em] uppercase">Terminal v4.0.2</span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-2">
          {[
            { id: 'swap', icon: ArrowDownUp, label: 'SWAP' },
            { id: 'pools', icon: LayoutGrid, label: 'LIQUIDITY' },
            { id: 'trade', icon: Activity, label: 'TRADE' },
            { id: 'portfolio', icon: User, label: 'PORTFOLIO' },
            { id: 'rewards', icon: Trophy, label: 'REWARDS' },
            { id: 'agents', icon: Users, label: 'AGENTS' },
            { id: 'analytics', icon: BarChart3, label: 'STATS' },
            { id: 'settings', icon: Settings, label: 'CONFIG' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentPage(item.id as Page);
                setIsMobileMenuOpen(false);
              }}
              className={cn(
                "flex items-center gap-2 px-4 py-2 border border-transparent transition-all duration-200 uppercase tracking-widest text-[10px] font-bold",
                currentPage === item.id 
                  ? "border-midnight-cyan text-midnight-cyan bg-midnight-cyan/5 neon-border-cyan" 
                  : "text-midnight-muted hover:text-midnight-text hover:bg-midnight-border/30"
              )}
            >
              <item.icon size={14} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 border border-midnight-border text-midnight-muted hover:text-midnight-cyan transition-all"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="hidden xl:flex items-center gap-3 px-3 py-1.5 border border-midnight-border bg-midnight-card/50">
            <div className="flex flex-col items-end">
              <span className="text-[8px] text-midnight-muted uppercase">Privacy Level</span>
              <span className="text-[10px] text-midnight-green font-bold">MAXIMUM</span>
            </div>
            <PrivacyShield level="high" />
          </div>
          <WalletConnect />
        </div>
      </nav>

      <main className="flex-1 px-6 py-8 relative z-10">
        <AnimatePresence mode="wait">
          {currentPage === 'swap' && (
            <PageTransition transitionKey="swap">
              <div className="max-w-md mx-auto">
                <SwapTerminal />
              </div>
            </PageTransition>
          )}

          {currentPage === 'pools' && (
            <PageTransition transitionKey="pools">
              <div className="max-w-2xl mx-auto">
                <PoolsList onAddLiquidity={() => setCurrentPage('add-liquidity')} />
              </div>
            </PageTransition>
          )}

          {currentPage === 'trade' && (
            <PageTransition transitionKey="trade">
              <TradeTerminal />
            </PageTransition>
          )}

          {currentPage === 'portfolio' && (
            <PageTransition transitionKey="portfolio">
              <div className="max-w-4xl mx-auto">
                <PortfolioView onNavigate={setCurrentPage} />
              </div>
            </PageTransition>
          )}

          {currentPage === 'agents' && (
            <PageTransition transitionKey="agents">
              <div className="max-w-4xl mx-auto">
                <AgentsDashboard />
              </div>
            </PageTransition>
          )}

          {currentPage === 'analytics' && (
            <PageTransition transitionKey="analytics">
              <div className="space-y-6 font-mono">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: 'Total_Liquidity', value: '$12M – $15M', icon: Droplets, trend: '+2.4%' },
                    { label: '24h_Volume', value: '$800K – $1.1M', icon: BarChart3, trend: '+15.8%' },
                    { label: 'Active_Pools', value: '42', icon: LayoutGrid, trend: '+2' },
                    { label: 'Swap_Activity', value: 'High', icon: Activity, trend: 'Steady' },
                  ].map((stat, i) => (
                    <div key={i} className="glass-panel p-4 border-midnight-border/50">
                      <div className="flex items-center justify-between mb-2">
                        <div className="p-2 border border-midnight-border bg-midnight-card text-midnight-cyan">
                          <stat.icon size={16} />
                        </div>
                        <span className="text-[8px] font-bold text-midnight-green uppercase tracking-widest">{stat.trend}</span>
                      </div>
                      <p className="text-[8px] text-midnight-muted uppercase tracking-widest mb-1">{stat.label}</p>
                      <p className="text-lg font-bold tracking-tighter">{stat.value}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Scanner className="glass-panel p-6 h-[400px] flex flex-col border-midnight-cyan/20">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-bold text-sm tracking-widest uppercase">Aggregated_Volume_24h</h3>
                      <div className="flex items-center gap-2 text-[8px] text-midnight-muted uppercase tracking-widest">
                        <Shield size={10} className="text-midnight-cyan" /> Privacy_Obfuscated
                      </div>
                    </div>
                    <div className="flex-1 relative">
                      <div className="absolute inset-0 pointer-events-none opacity-5 terminal-grid" />
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={ANALYTICS_DATA}>
                          <defs>
                            <linearGradient id="colorVol" x1="0" y1="0" x2="0" y2="1">
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
                          <Area type="monotone" dataKey="vol" stroke="#00f2ff" fillOpacity={1} fill="url(#colorVol)" strokeWidth={1} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </Scanner>

                  <Scanner className="glass-panel p-6 h-[400px] flex flex-col border-midnight-cyan/20">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="font-bold text-sm tracking-widest uppercase">Liquidity_Distribution</h3>
                      <div className="flex items-center gap-2 text-[8px] text-midnight-muted uppercase tracking-widest">
                        <Shield size={10} className="text-midnight-cyan" /> Privacy_Obfuscated
                      </div>
                    </div>
                    <div className="flex-1 relative">
                      <div className="absolute inset-0 pointer-events-none opacity-5 terminal-grid" />
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={ANALYTICS_DATA}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#1a1a2e" vertical={false} />
                          <XAxis dataKey="name" stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                          <YAxis hide />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#0a0a0f', border: '1px solid #1a1a2e', borderRadius: '0px' }}
                            itemStyle={{ color: '#00f2ff' }}
                          />
                          <Bar dataKey="liq" fill="#00f2ff" radius={[0, 0, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </Scanner>
                </div>
              </div>
            </PageTransition>
          )}

          {currentPage === 'rewards' && (
            <PageTransition transitionKey="rewards">
              <div className="max-w-4xl mx-auto">
                <RewardsDashboard />
              </div>
            </PageTransition>
          )}

          {currentPage === 'settings' && (
            <PageTransition transitionKey="settings">
              <div className="glass-panel p-8 max-w-2xl mx-auto border-midnight-cyan/20 font-mono">
                <h2 className="text-2xl font-bold tracking-[0.2em] uppercase neon-text-cyan mb-12">TERMINAL_CONFIG</h2>
                
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-[10px] text-midnight-muted font-bold uppercase tracking-[0.2em]">Wallet_&_Network</h3>
                    <div className="flex items-center justify-between p-4 bg-midnight-bg/40 border border-midnight-border">
                      <div className="flex items-center gap-3">
                        <div className={cn("w-8 h-8 border flex items-center justify-center", isConnected ? "border-midnight-green text-midnight-green bg-midnight-green/5" : "border-midnight-border text-midnight-muted")}>
                          {isConnected ? <CheckCircle2 size={16} /> : <ShieldAlert size={16} />}
                        </div>
                        <div>
                          <p className="text-xs font-bold tracking-widest uppercase">{isConnected ? "Connected_Node" : "Offline"}</p>
                          <p className="text-[8px] text-midnight-muted uppercase tracking-tighter">{isConnected ? `${address} (Midnight_Mainnet)` : "Please initialize connection"}</p>
                        </div>
                      </div>
                      {isConnected ? (
                        <button onClick={disconnect} className="text-[10px] font-bold text-rose-500 hover:text-rose-400 uppercase tracking-widest">Disconnect</button>
                      ) : (
                        <button onClick={() => setCurrentPage('swap')} className="text-[10px] font-bold text-midnight-cyan hover:text-white uppercase tracking-widest">Connect</button>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-[10px] text-midnight-muted font-bold uppercase tracking-[0.2em]">Privacy_Controls</h3>
                    <div className="space-y-3">
                      {[
                        { label: 'Default_Privacy_Level', value: 'Shielded', type: 'select' },
                        { label: 'Transaction_Delay', value: 'Randomized', type: 'toggle', active: true },
                        { label: 'Gas_Obfuscation', value: 'ON', type: 'toggle', active: true },
                        { label: 'Decoy_Transactions', value: 'ON', type: 'toggle', active: true },
                        { label: 'Terminal_CRT_Effect', value: 'ON', type: 'toggle', active: true },
                      ].map((setting, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-midnight-bg/40 border border-midnight-border hover:border-midnight-cyan/20 transition-all">
                          <span className="text-xs font-bold tracking-widest uppercase">{setting.label}</span>
                          {setting.type === 'toggle' ? (
                            <button className={cn("w-10 h-5 border relative transition-all", setting.active ? "border-midnight-cyan bg-midnight-cyan/10" : "border-midnight-border bg-midnight-bg")}>
                              <div className={cn("absolute top-1 w-2 h-2 transition-all", setting.active ? "right-1 bg-midnight-cyan" : "left-1 bg-midnight-muted")} />
                            </button>
                          ) : (
                            <button className="flex items-center gap-2 text-[10px] font-bold text-midnight-cyan uppercase tracking-widest">
                              {setting.value} <ChevronDown size={14} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-8 border-t border-midnight-border">
                    <button 
                      onClick={() => setCurrentPage('history')}
                      className="w-full flex items-center justify-between p-4 border border-midnight-border hover:border-midnight-cyan/50 hover:bg-midnight-cyan/5 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <History size={18} className="text-midnight-muted" />
                        <span className="text-xs font-bold tracking-widest uppercase">Access_Private_History_Logs</span>
                      </div>
                      <ArrowRight size={14} className="text-midnight-muted" />
                    </button>
                  </div>
                </div>
              </div>
            </PageTransition>
          )}

          {currentPage === 'history' && (
            <PageTransition transitionKey="history">
              <div className="glass-panel p-8 max-w-2xl mx-auto border-midnight-cyan/20 font-mono relative overflow-hidden">
                <div className="scanline opacity-5" />
                <div className="flex items-center gap-4 mb-12">
                  <button onClick={() => setCurrentPage('settings')} className="p-2 border border-midnight-border hover:border-midnight-cyan text-midnight-muted hover:text-midnight-cyan transition-all">
                    <ArrowRight size={20} className="rotate-180" />
                  </button>
                  <h2 className="text-2xl font-bold tracking-[0.2em] uppercase neon-text-cyan">ACCESS_LOGS</h2>
                </div>

                <div className="space-y-4">
                  {history.map((tx) => (
                    <div key={tx.id} className="p-5 bg-midnight-bg/40 border border-midnight-border hover:border-midnight-cyan/30 transition-all group">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={cn("p-2 border", tx.status === 'Completed' ? "border-midnight-green text-midnight-green bg-midnight-green/5" : "border-midnight-cyan text-midnight-cyan bg-midnight-cyan/5")}>
                            {tx.type === 'Swap' ? <ArrowDownUp size={16} /> : <Droplets size={16} />}
                          </div>
                          <div>
                            <p className="text-sm font-bold tracking-widest uppercase group-hover:neon-text-cyan transition-all">{tx.pair}</p>
                            <p className="text-[8px] text-midnight-muted uppercase tracking-tighter">{tx.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={cn("text-[10px] font-bold uppercase tracking-widest", tx.status === 'Completed' ? "text-midnight-green" : "text-midnight-cyan")}>{tx.status}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-midnight-border/50">
                        <div className="flex items-center gap-2">
                          <span className="text-[8px] text-midnight-muted uppercase tracking-widest font-bold">Amount:</span>
                          <ShieldedValue value={tx.amount} className="text-[10px] font-mono" />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[8px] text-midnight-muted uppercase tracking-widest font-bold">Proof:</span>
                          <span className="text-[10px] font-mono text-midnight-text tracking-tighter">{tx.proof}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </PageTransition>
          )}
        </AnimatePresence>
      </main>

      <footer className="terminal-header !border-t border-b-0 px-6 py-3 flex items-center justify-between text-[10px] text-midnight-muted uppercase tracking-[0.2em] font-bold">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-midnight-green shadow-[0_0_8px_rgba(16,185,129,0.6)]"></div>
            <span>NODE: MIDNIGHT-MAINNET-01</span>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <Shield size={12} className="text-midnight-cyan" />
            <span>SHIELDED EXECUTION: ACTIVE</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden md:block">BLOCK: #12,405,291</span>
          <div className="flex items-center gap-2 px-2 py-1 border border-midnight-cyan/20 text-midnight-cyan bg-midnight-cyan/5">
            <Zap size={10} />
            <span>ANTI-MEV PROTOCOL</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
