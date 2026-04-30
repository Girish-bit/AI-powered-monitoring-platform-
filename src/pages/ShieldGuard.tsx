import React, { useEffect, useState } from 'react';
import { 
  ShieldAlert, 
  Trash2, 
  Calendar, 
  Tag, 
  AlertCircle,
  Clock,
  Loader2,
  Lock,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { db, auth } from '../lib/firebase';
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  deleteDoc, 
  doc 
} from 'firebase/firestore';
import { cn, handleFirestoreError, OperationType } from '../lib/utils';
import { Link } from 'react-router-dom';

interface Incident {
  id: string;
  type: string;
  riskLevel: string;
  content: string;
  category: string;
  explanation: string;
  timestamp: any;
}

export default function ShieldGuard() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!auth.currentUser) return;

    const path = `users/${auth.currentUser.uid}/incidents`;
    const q = query(
      collection(db, path),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Incident[];
      setIncidents(data);
      setIsLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    if (!auth.currentUser) return;
    try {
      await deleteDoc(doc(db, `users/${auth.currentUser.uid}/incidents`, id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `users/${auth.currentUser.uid}/incidents/${id}`);
    }
  };

  const getRiskStyles = (level: string) => {
    switch (level) {
      case 'CRITICAL': return 'bg-red-500/10 border-red-500/50 text-red-500';
      case 'HIGH': return 'bg-amber-500/10 border-amber-500/50 text-amber-500';
      case 'MEDIUM': return 'bg-yellow-500/10 border-yellow-500/50 text-yellow-500';
      default: return 'bg-emerald-500/10 border-emerald-500/50 text-emerald-500';
    }
  };

  return (
    <div className="space-y-8 pb-20">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-600/10 border border-red-500/20 rounded-full text-red-400 text-xs font-bold uppercase tracking-widest">
            <Lock size={12} /> Secure Log Node
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">Blocked History</h2>
          <p className="text-zinc-500 font-medium">Audit trail of intercepted threats and malicious patterns.</p>
        </div>
        
        <div className="flex bg-zinc-900 border border-zinc-800 rounded-2xl p-4 gap-8">
          <div className="text-center px-4">
            <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-1">Total Threats</p>
            <p className="text-2xl font-black text-white">{incidents.length}</p>
          </div>
          <div className="w-[1px] bg-zinc-800" />
          <div className="text-center px-4">
            <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-1">Alert Status</p>
            <p className={cn(
              "text-2xl font-black",
              incidents.some(i => i.riskLevel === 'CRITICAL') ? "text-red-500" : "text-emerald-500"
            )}>
              {incidents.some(i => i.riskLevel === 'CRITICAL') ? 'ACTIVE' : 'STABLE'}
            </p>
          </div>
        </div>
      </header>

      {isLoading ? (
        <div className="min-h-[400px] flex flex-col items-center justify-center gap-4 bg-zinc-900/30 rounded-[3rem] border border-zinc-800 border-dashed">
          <Loader2 className="text-blue-500 animate-spin" size={40} />
          <p className="text-zinc-600 font-mono text-sm uppercase tracking-widest">Hydrating Log Database...</p>
        </div>
      ) : incidents.length === 0 ? (
        <div className="min-h-[400px] flex flex-col items-center justify-center gap-6 bg-zinc-900/30 rounded-[3rem] border border-zinc-800 border-dashed text-center px-8">
          <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-500">
            <ShieldAlert size={48} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Zero Threats Detected</h3>
            <p className="text-zinc-500 max-w-sm">No malicious activity has been logged for this operator session. Stay vigilant.</p>
          </div>
          <Link to="/scanner" className="px-8 py-4 bg-white text-black font-black uppercase tracking-widest rounded-xl hover:bg-blue-400 transition-all flex items-center gap-2">
            Initiate Scan <ArrowRight size={18} />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          <AnimatePresence mode="popLayout">
            {incidents.map((incident) => (
              <motion.div
                key={incident.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-zinc-900/50 border border-zinc-800 p-6 md:p-8 rounded-[2rem] hover:border-zinc-700 transition-all group"
              >
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className={cn(
                    "p-5 rounded-2xl shrink-0 transition-transform group-hover:scale-110",
                    getRiskStyles(incident.riskLevel)
                  )}>
                    <AlertCircle size={32} />
                  </div>

                  <div className="flex-1 space-y-4">
                    <div className="flex flex-wrap items-center gap-4">
                      <span className={cn(
                        "px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border",
                        getRiskStyles(incident.riskLevel)
                      )}>
                        {incident.riskLevel}
                      </span>
                      <span className="flex items-center gap-1.5 text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
                        <Tag size={12} /> {incident.type}
                      </span>
                      <span className="flex items-center gap-1.5 text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
                        <Clock size={12} /> {incident.timestamp?.toDate().toLocaleTimeString()}
                      </span>
                      <span className="flex items-center gap-1.5 text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
                        <Calendar size={12} /> {incident.timestamp?.toDate().toLocaleDateString()}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold text-white mb-2 uppercase tracking-tight">{incident.category || 'Unknown Threat'}</h4>
                      <p className="text-zinc-400 font-medium leading-relaxed italic border-l-2 border-zinc-800 pl-4">
                        "{incident.explanation}"
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-zinc-800/50">
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Intercepted Content</p>
                        <p className="text-xs text-zinc-300 font-mono truncate max-w-md">{incident.content}</p>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => handleDelete(incident.id)}
                    className="p-4 text-zinc-600 hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all"
                    title="Purge Record"
                  >
                    <Trash2 size={24} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
