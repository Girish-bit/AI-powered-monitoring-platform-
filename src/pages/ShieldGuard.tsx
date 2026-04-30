import { ShieldAlert, Globe, ArrowLeft, RefreshCcw, Lock } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function ShieldGuard() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center p-6">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="mb-8 relative"
      >
        <div className="absolute inset-0 bg-red-600/20 blur-[100px] animate-pulse" />
        <div className="p-8 bg-red-600 rounded-[2.5rem] shadow-2xl shadow-red-900/40 relative z-10 border-4 border-white/20">
          <ShieldAlert size={80} className="text-white" />
        </div>
      </motion.div>

      <h2 className="text-5xl font-black text-white tracking-tight uppercase mb-4">Access Restricted</h2>
      <div className="max-w-xl mx-auto space-y-6">
        <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl flex items-center justify-center gap-3">
          <Globe className="text-zinc-600" size={18} />
          <span className="text-red-400 font-mono text-sm break-all">https://social-auth-login.scam-verify.xyz/login</span>
        </div>

        <p className="text-zinc-400 text-lg leading-relaxed">
          GuardianAI has intercepted a request to a confirmed <span className="text-white font-bold underline decoration-red-500">Phishing Node</span>. 
          The browser extension prevented the execution of malicious scripts and credential harvesting.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8">
          <Link 
            to="/" 
            className="flex items-center justify-center gap-2 px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-xl transition-all border border-zinc-700"
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </Link>
          <button className="flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-900/20">
            <RefreshCcw size={18} />
            Run Deep System Scan
          </button>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        <div className="p-6 bg-zinc-900/40 border border-zinc-800 rounded-2xl">
          <h4 className="text-white font-bold mb-2 flex items-center gap-2">
            <Lock size={16} className="text-blue-400"/> Threat Identified
          </h4>
          <p className="text-xs text-zinc-500">Credential Phishing (Credential Harvester)</p>
        </div>
        <div className="p-6 bg-zinc-900/40 border border-zinc-800 rounded-2xl">
          <h4 className="text-white font-bold mb-2 flex items-center gap-2">
            <Lock size={16} className="text-blue-400"/> Prevention Action
          </h4>
          <p className="text-xs text-zinc-500">Domain blocked + Cookie isolation activated</p>
        </div>
        <div className="p-6 bg-zinc-900/40 border border-zinc-800 rounded-2xl">
          <h4 className="text-white font-bold mb-2 flex items-center gap-2">
            <Lock size={16} className="text-blue-400"/> Forensic State
          </h4>
          <p className="text-xs text-zinc-500">Log sent to secure incident repository</p>
        </div>
      </div>
    </div>
  );
}
