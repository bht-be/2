import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GraduationCap, Lock, User, ArrowRight, Sparkles } from 'lucide-react';
import ThreeDIcon from './ThreeDIcon';
import { playSound } from '../lib/sounds';

interface LoginPortalProps {
  onLogin: (user: { name: string; role: string }) => void;
}

export default function LoginPortal({ onLogin }: LoginPortalProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;
    
    playSound('click');
    setIsSubmitting(true);
    
    // Simulate login delay
    setTimeout(() => {
      playSound('relic');
      onLogin({ name: username, role: "Scholar" });
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-gold/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -30, 0],
            y: [0, 40, 0]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="glass-panel w-full max-w-md p-8 rounded-3xl relative overflow-hidden"
      >
        {/* Decorative Corner */}
        <div className="absolute -top-12 -right-12 w-24 h-24 bg-accent-gold/20 rotate-45 blur-xl" />
        
        <div className="text-center mb-8">
          <motion.div
            animate={{ rotateY: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="inline-block mb-4"
          >
            <ThreeDIcon icon={GraduationCap} size={64} color="#d4af37" />
          </motion.div>
          <h1 className="text-3xl font-display font-bold mb-2">University Portal</h1>
          <p className="text-text-muted font-sans">Enter your credentials to access the archives</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-display font-semibold text-accent-gold uppercase tracking-wider ml-1">Username</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Scholar Name"
                className="w-full bg-bg-dark/50 border border-border-subtle rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-accent-gold transition-all font-sans"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-display font-semibold text-accent-gold uppercase tracking-wider ml-1">Access Key</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-bg-dark/50 border border-border-subtle rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-accent-gold transition-all font-sans"
                required
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
            className="btn-premium w-full flex items-center justify-center gap-2 py-4 text-lg"
          >
            {isSubmitting ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles size={24} />
              </motion.div>
            ) : (
              <>
                Initialize Session
                <ArrowRight size={20} />
              </>
            )}
          </motion.button>
        </form>

        <div className="mt-8 pt-6 border-t border-border-subtle text-center">
          <button 
            type="button"
            onClick={() => playSound('click')}
            className="text-text-muted hover:text-accent-gold transition-colors text-sm font-sans"
          >
            Forgot Access Key? Contact Registrar
          </button>
        </div>
      </motion.div>
    </div>
  );
}
