import React, { useState } from 'react';
import { Shield, Lock, ArrowRight, Fingerprint, Globe, User, Mail } from 'lucide-react';
import { motion } from 'motion/react';

export default function Login({ onLogin }: { onLogin: () => void }) {
  const [isHovered, setIsHovered] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] animate-pulse delay-1000" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-12">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="inline-flex p-4 bg-blue-600 rounded-2xl shadow-2xl shadow-blue-900/40 mb-6"
          >
            <Shield className="text-white" size={40} />
          </motion.div>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase mb-2">GuardianAI</h1>
          <p className="text-zinc-500 font-medium font-mono text-sm tracking-widest italic flex items-center justify-center gap-2">
            <Fingerprint size={14} /> SECURE_PROTOCOL_V4.2
          </p>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-1">Work Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-blue-500 transition-colors" size={18} />
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-zinc-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="admin@guardian.ai"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-1">Encryption Key</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-blue-500 transition-colors" size={18} />
                <input 
                  type="password" 
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-zinc-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            <button 
              type="submit"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="w-full py-4 bg-white text-black font-black uppercase tracking-widest rounded-xl flex items-center justify-center gap-3 hover:bg-blue-400 active:scale-95 transition-all shadow-xl shadow-white/5"
            >
              Initialize Node
              <motion.div
                animate={{ x: isHovered ? 5 : 0 }}
              >
                <ArrowRight size={20} />
              </motion.div>
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-zinc-800 flex items-center justify-between">
            <button className="text-[10px] font-bold text-zinc-600 hover:text-white transition-colors uppercase tracking-widest flex items-center gap-1.5">
              <Globe size={12} /> External Auth
            </button>
            <button className="text-[10px] font-bold text-zinc-600 hover:text-white transition-colors uppercase tracking-widest">
              Forgot Protocol?
            </button>
          </div>
        </div>

        <p className="mt-8 text-center text-zinc-600 text-[10px] font-mono leading-relaxed uppercase tracking-tighter">
          By accessing this node, you agree to the <br/> 
          <span className="text-blue-500 underline cursor-pointer">Guardian Cybersecurity framework</span> and <span className="text-blue-500 underline cursor-pointer">Zero Trust Policies</span>.
        </p>
      </motion.div>
    </div>
  );
}
