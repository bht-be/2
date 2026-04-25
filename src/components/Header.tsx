import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Search, Bell, User, Menu, Sparkles } from 'lucide-react';
import ThreeDIcon from './ThreeDIcon';
import { playSound } from '../lib/sounds';

interface HeaderProps {
  user: { name: string; role: string } | null;
  onToggleSidebar: () => void;
}

export default function Header({ user, onToggleSidebar }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-border-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Left: Logo & Toggle */}
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                playSound('click');
                onToggleSidebar();
              }}
              className="p-2 rounded-xl hover:bg-white/5 lg:hidden"
            >
              <Menu size={24} className="text-accent-gold" />
            </motion.button>
            
            <div className="flex items-center gap-3">
              <ThreeDIcon icon={GraduationCap} size={32} color="#d4af37" />
              <div className="hidden sm:block">
                <h1 className="text-xl font-display font-bold tracking-tight">THE SCHOLAR'S PORTAL</h1>
                <p className="text-[10px] font-sans text-accent-gold uppercase tracking-[0.2em] opacity-80">University of English Studies</p>
              </div>
            </div>
          </div>

          {/* Center: Search (Decorative for now) */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-accent-gold transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search archives, modules, or scholars..."
                className="w-full bg-bg-dark/50 border border-border-subtle rounded-full py-2.5 pl-12 pr-4 focus:outline-none focus:border-accent-gold transition-all font-sans text-sm"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                <kbd className="px-1.5 py-0.5 rounded border border-border-subtle bg-bg-panel text-[10px] text-text-muted">⌘</kbd>
                <kbd className="px-1.5 py-0.5 rounded border border-border-subtle bg-bg-panel text-[10px] text-text-muted">K</kbd>
              </div>
            </div>
          </div>

          {/* Right: User Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2.5 rounded-full hover:bg-white/5 text-text-muted hover:text-accent-gold transition-colors relative"
            >
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-accent-gold rounded-full pulse-glow" />
            </motion.button>

            <div className="h-8 w-px bg-border-subtle mx-1 hidden sm:block" />

            {user ? (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 pl-2"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-display font-bold leading-none">{user.name}</p>
                  <p className="text-[10px] font-sans text-accent-gold uppercase tracking-wider mt-1">{user.role}</p>
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-accent-gold p-0.5 relative">
                  <div className="w-full h-full rounded-full bg-bg-panel flex items-center justify-center overflow-hidden">
                    <User size={20} className="text-accent-gold" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-success-light w-3 h-3 rounded-full border-2 border-bg-dark" />
                </div>
              </motion.div>
            ) : (
              <button className="btn-premium py-2 text-sm flex items-center gap-2">
                <Sparkles size={16} />
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
