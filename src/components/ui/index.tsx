import React, { useState, useEffect } from 'react';
import { Eye, Shield } from 'lucide-react';
import { motion } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const ShieldedValue = ({ value, prefix = '', suffix = '', className = '' }: { value: string, prefix?: string, suffix?: string, className?: string }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [timer, setTimer] = useState(0);

  const handleReveal = () => {
    if (isRevealed) return;
    setIsRevealed(true);
    setTimer(30);
  };

  useEffect(() => {
    let interval: any;
    if (isRevealed && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsRevealed(false);
    }
    return () => clearInterval(interval);
  }, [isRevealed, timer]);

  return (
    <div className={cn("inline-flex items-center gap-2 font-mono group relative", className)}>
      <span className={cn(
        "transition-all duration-500", 
        !isRevealed && "blur-[6px] select-none opacity-40",
        isRevealed && "text-midnight-cyan neon-text-cyan"
      )}>
        {isRevealed ? `${prefix}${value}${suffix}` : "XXXXXXXX"}
      </span>
      <button 
        onClick={handleReveal}
        className={cn(
          "p-1 border border-transparent transition-all",
          isRevealed ? "text-midnight-cyan border-midnight-cyan/30 bg-midnight-cyan/10" : "text-midnight-muted hover:text-midnight-cyan hover:border-midnight-cyan/30"
        )}
      >
        {isRevealed ? <span className="text-[10px] font-bold px-1">{timer}s</span> : <Shield size={14} />}
      </button>
      {!isRevealed && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-midnight-cyan/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      )}
    </div>
  );
};

export const Scanner = ({ children, active = true, className = "" }: { children: React.ReactNode, active?: boolean, className?: string }) => (
  <div className={cn("relative overflow-hidden", className)}>
    {active && <div className="scanner-line" />}
    {children}
  </div>
);

export const TerminalText = ({ text, speed = 50, className = "" }: { text: string, speed?: number, className?: string }) => {
  const [displayedText, setDisplayedText] = useState("");
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return <span className={className}>{displayedText}<span className="animate-pulse">_</span></span>;
};

export const PrivacyShield = ({ level = "high" }: { level?: "low" | "medium" | "high" }) => {
  const colors = {
    low: "text-amber-500",
    medium: "text-midnight-cyan",
    high: "text-midnight-green"
  };
  
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3].map((i) => (
        <div 
          key={i} 
          className={cn(
            "w-1 h-3 rounded-full transition-all duration-500",
            i <= (level === "low" ? 1 : level === "medium" ? 2 : 3) 
              ? cn("bg-current", colors[level]) 
              : "bg-midnight-border"
          )} 
        />
      ))}
    </div>
  );
};

export const PageTransition = ({ children, transitionKey }: { children: React.ReactNode, transitionKey?: string }) => (
  <motion.div
    key={transitionKey}
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 10 }}
    transition={{ duration: 0.2, ease: "linear" }}
    className="w-full max-w-4xl mx-auto pt-8 pb-24"
  >
    {children}
  </motion.div>
);
