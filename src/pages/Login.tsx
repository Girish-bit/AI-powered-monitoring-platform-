import React, { useState } from 'react';
import { Shield, Lock, ArrowRight, Fingerprint, Globe, Mail, Loader2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth, db } from '../lib/firebase';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { cn } from '../lib/utils';

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    const provider = new GoogleAuthProvider();
    
    try {
      const result = await signInWithPopup(auth, provider);
      
      // Check if user profile exists to handle createdAt
      const userDocRef = doc(db, 'users', result.user.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          uid: result.user.uid,
          email: result.user.email,
          createdAt: serverTimestamp(),
          lastActive: serverTimestamp()
        });
      } else {
        await setDoc(userDocRef, {
          lastActive: serverTimestamp()
        }, { merge: true });
      }
    } catch (err: any) {
      console.error("Google Auth error:", err);
      if (err.message?.includes('permission')) {
        setError("Database sync failed. Please ensure your account has sufficient permissions or try again.");
      } else {
        setError(err.message || "Google Sign-In failed.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await setPersistence(auth, browserLocalPersistence);
      
      if (isRegister) {
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        // Create user profile in Firestore
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          uid: userCredential.user.uid,
          email: formData.email,
          createdAt: serverTimestamp(),
          lastActive: serverTimestamp()
        });
      } else {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
      }
    } catch (err: any) {
      console.error("Auth error:", err);
      // More descriptive error messages
      if (err.code === 'auth/email-already-in-use') {
        setError("This email is already registered. Please sign in instead.");
      } else if (err.code === 'auth/weak-password') {
        setError("Password should be at least 6 characters.");
      } else if (err.code === 'auth/invalid-email') {
        setError("Please enter a valid email address.");
      } else {
        setError(err.message || "Authentication failed. Please check your credentials.");
      }
    } finally {
      setIsLoading(false);
    }
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
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase mb-2">Deep Guardian</h1>
          <p className="text-zinc-500 font-medium font-mono text-sm tracking-widest italic flex items-center justify-center gap-2">
            <Fingerprint size={14} /> SECURE_PROTOCOL_V4.2
          </p>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 backdrop-blur-xl">
          <div className="flex bg-zinc-950 p-1 rounded-xl border border-zinc-800 mb-8">
            <button 
              onClick={() => { setIsRegister(false); setError(null); }}
              className={cn(
                "flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all",
                !isRegister ? "bg-white text-black shadow-lg" : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              Sign In
            </button>
            <button 
              onClick={() => { setIsRegister(true); setError(null); }}
              className={cn(
                "flex-1 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all",
                isRegister ? "bg-white text-black shadow-lg" : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              Register
            </button>
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3"
              >
                <AlertCircle className="text-red-500 shrink-0" size={18} />
                <div>
                  <p className="text-[10px] text-red-500 font-black uppercase tracking-widest mb-1">Auth Error</p>
                  <p className="text-xs text-red-400 font-medium leading-relaxed">
                    {error.includes('invalid-credential') 
                      ? "Invalid credentials. Ensure your email/password is correct and Email/Password auth is enabled in Firebase Console." 
                      : error}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest ml-1">Secure Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-blue-500 transition-colors" size={18} />
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  disabled={isLoading}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-zinc-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:opacity-50"
                  placeholder="agent@guardian.ai"
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
                  disabled={isLoading}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-zinc-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:opacity-50"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="w-full py-4 bg-white text-black font-black uppercase tracking-widest rounded-xl flex items-center justify-center gap-3 hover:bg-blue-400 active:scale-95 transition-all shadow-xl shadow-white/5 disabled:bg-zinc-800 disabled:text-zinc-500 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Processing...
                </>
              ) : (
                <>
                  {isRegister ? 'Initialize Account' : 'Initialize Session'}
                  <motion.div animate={{ x: isHovered ? 5 : 0 }}>
                    <ArrowRight size={20} />
                  </motion.div>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 flex flex-col gap-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-800"></div>
              </div>
              <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest">
                <span className="bg-zinc-900 px-3 text-zinc-600">Secure Bridge</span>
              </div>
            </div>

            <button 
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full py-4 bg-zinc-950 border border-zinc-800 text-white font-bold uppercase tracking-widest rounded-xl flex items-center justify-center gap-3 hover:bg-zinc-900 active:scale-95 transition-all disabled:opacity-50"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
              Sign in with Google
            </button>
          </div>

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
          <span className="text-blue-500 underline cursor-pointer">Deep Guardian Defense framework</span> and <span className="text-blue-500 underline cursor-pointer">Zero Trust Policies</span>.
        </p>
      </motion.div>
    </div>
  );
}
