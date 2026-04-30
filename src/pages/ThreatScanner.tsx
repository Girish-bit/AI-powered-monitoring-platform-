import React, { useState, useRef } from 'react';
import { 
  Search, 
  ShieldAlert, 
  ShieldCheck, 
  Loader2, 
  Info, 
  AlertTriangle, 
  ArrowRight, 
  Image as ImageIcon,
  Link as LinkIcon,
  MessageSquare,
  Upload,
  X,
  Zap,
  Camera
} from 'lucide-react';
import { analyzeIncident, analyzeImage, ThreatAnalysis } from '../services/geminiService';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

type ScanMode = 'TEXT' | 'LINK' | 'IMAGE';

export default function ThreatScanner() {
  const [mode, setMode] = useState<ScanMode>('TEXT');
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<ThreatAnalysis | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleScan = async () => {
    setIsScanning(true);
    let analysis: ThreatAnalysis;
    
    if (mode === 'IMAGE' && selectedImage) {
      analysis = await analyzeImage(selectedImage);
    } else {
      analysis = await analyzeIncident(content);
    }
    
    setResult(analysis);
    setIsScanning(false);
    
    // Simulate "Preventative Action" if critical
    if (analysis.riskLevel === 'CRITICAL' || analysis.riskLevel === 'HIGH') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'CRITICAL': return 'text-red-500 border-red-500 bg-red-500/10';
      case 'HIGH': return 'text-amber-500 border-amber-500 bg-amber-500/10';
      case 'MEDIUM': return 'text-yellow-500 border-yellow-500 bg-yellow-500/10';
      default: return 'text-emerald-500 border-emerald-500 bg-emerald-500/10';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      <header className="text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600/10 border border-blue-500/20 rounded-full text-blue-400 text-xs font-bold uppercase tracking-widest mb-2"
        >
          <Zap size={12} className="fill-current" />
          Powered by Gemini 3 Flash
        </motion.div>
        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-[0.9]">Multi-Modal<br/>Threat Intelligence</h2>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-medium">
          Detection for cyberbullying, dangerous links, and malicious imagery in a single neural node.
        </p>
      </header>

      {/* Mode Switcher */}
      <div className="flex bg-zinc-900/50 p-1 rounded-2xl border border-zinc-800 backdrop-blur-md sticky top-20 z-20">
        <button 
          onClick={() => { setMode('TEXT'); setResult(null); }}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all text-sm",
            mode === 'TEXT' ? "bg-white text-black shadow-xl" : "text-zinc-500 hover:text-white"
          )}
        >
          <MessageSquare size={18} />
          Cyberbullying
        </button>
        <button 
          onClick={() => { setMode('LINK'); setResult(null); }}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all text-sm",
            mode === 'LINK' ? "bg-white text-black shadow-xl" : "text-zinc-500 hover:text-white"
          )}
        >
          <LinkIcon size={18} />
          Malicious Links
        </button>
        <button 
          onClick={() => { setMode('IMAGE'); setResult(null); }}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all text-sm",
            mode === 'IMAGE' ? "bg-white text-black shadow-xl" : "text-zinc-500 hover:text-white"
          )}
        >
          <ImageIcon size={18} />
          Image Forensics
        </button>
      </div>

      <section className="bg-zinc-900/50 border border-zinc-800 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 opacity-5 rotate-12">
          {mode === 'TEXT' && <MessageSquare size={300} />}
          {mode === 'LINK' && <LinkIcon size={300} />}
          {mode === 'IMAGE' && <ImageIcon size={300} />}
        </div>
        
        <div className="relative z-10 space-y-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-600 rounded-xl shadow-lg shadow-blue-500/20">
                {mode === 'TEXT' && <MessageSquare className="text-white" size={20} />}
                {mode === 'LINK' && <LinkIcon className="text-white" size={20} />}
                {mode === 'IMAGE' && <Camera className="text-white" size={20} />}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white uppercase tracking-tight">
                  {mode === 'TEXT' ? 'Sentiment Analysis' : mode === 'LINK' ? 'URL Reputation Scan' : 'Multi-Modal Forensic'}
                </h3>
                <p className="text-xs text-zinc-500 uppercase font-bold tracking-widest">
                  Analyzing {mode.toLowerCase()} node patterns
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {mode === 'IMAGE' ? (
              <div className="space-y-4">
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  ref={fileInputRef} 
                  onChange={handleImageUpload}
                />
                {!selectedImage ? (
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full aspect-video bg-zinc-950 border-2 border-dashed border-zinc-800 rounded-3xl flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-blue-500/50 hover:bg-zinc-900/50 transition-all group"
                  >
                    <div className="p-4 bg-zinc-900 rounded-2xl group-hover:scale-110 transition-transform">
                      <Upload className="text-zinc-600 group-hover:text-blue-500" size={32} />
                    </div>
                    <div className="text-center">
                      <p className="text-zinc-400 font-bold">Select suspect image</p>
                      <p className="text-zinc-600 text-xs">JPEG, PNG up to 10MB</p>
                    </div>
                  </div>
                ) : (
                  <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-zinc-800">
                    <img src={selectedImage} alt="Suspect" className="w-full h-full object-contain bg-black" />
                    <button 
                      onClick={() => setSelectedImage(null)}
                      className="absolute top-4 right-4 p-2 bg-black/60 backdrop-blur-md rounded-full text-white hover:bg-red-500 transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <textarea 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={mode === 'LINK' ? "Paste suspicious social media URLs or short-links here..." : "Paste messages, direct messages, or comments showing signs of bullying..."}
                className="w-full h-48 bg-zinc-950 border border-zinc-800 rounded-[2rem] p-8 text-zinc-100 placeholder:text-zinc-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none outline-none font-medium leading-relaxed shadow-inner"
              />
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-6 items-center justify-between pt-4">
            <div className="flex flex-wrap items-center gap-6 text-[10px] font-black font-mono text-zinc-500 uppercase tracking-tighter">
              <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Neural Scanning Enabled</span>
              <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Zero Trust Verified</span>
            </div>
            <button 
              onClick={handleScan}
              disabled={isScanning || (mode === 'IMAGE' ? !selectedImage : !content.trim())}
              className={cn(
                "w-full md:w-auto px-10 py-5 rounded-2xl font-black uppercase tracking-widest transition-all flex items-center justify-center gap-4 text-sm",
                isScanning || (mode === 'IMAGE' ? !selectedImage : !content.trim())
                  ? "bg-zinc-800 text-zinc-600 cursor-not-allowed" 
                  : "bg-white text-black hover:bg-blue-400 active:scale-95 shadow-2xl shadow-blue-500/20"
              )}
            >
              {isScanning ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Processing Node
                </>
              ) : (
                <>
                  Execute Intelligence Scan
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      <AnimatePresence mode="wait">
        {result && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-6"
          >
            <div className={cn(
              "p-8 md:p-12 rounded-[3rem] border flex flex-col md:flex-row gap-12 items-start relative overflow-hidden",
              result.riskLevel === 'SAFE' ? "border-emerald-500/20 bg-emerald-500/5" : 
              result.riskLevel === 'CRITICAL' ? "border-red-500/20 bg-red-500/10 shadow-[0_0_50px_-12px_rgba(239,68,68,0.3)]" : 
              "border-amber-500/20 bg-amber-500/5"
            )}>
              <div className="flex-1 space-y-8">
                <div className="flex flex-wrap items-center gap-4">
                  <div className={cn(
                    "px-6 py-2 rounded-full border-2 text-xs font-black tracking-[0.2em] uppercase",
                    getRiskColor(result.riskLevel)
                  )}>
                    RISK_STATUS: {result.riskLevel}
                  </div>
                  <div className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                    AI_CONFIDENCE: {(result.confidence * 100).toFixed(1)}%
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-3xl font-black text-white uppercase tracking-tighter">AI Analysis Verdict</h4>
                  <p className="text-zinc-400 text-lg leading-relaxed italic border-l-4 border-blue-500 pl-6 bg-blue-500/5 py-3">
                    "{result.explanation}"
                  </p>
                </div>

                <div className="p-8 bg-zinc-950/80 rounded-3xl border border-zinc-800 flex items-start gap-6 relative group">
                  <div className={cn(
                    "p-4 rounded-2xl shrink-0 transition-transform group-hover:scale-110",
                    result.riskLevel === 'SAFE' ? "bg-emerald-500/20" : "bg-red-500/20"
                  )}>
                    <ShieldCheck className={result.riskLevel === 'SAFE' ? "text-emerald-400" : "text-red-400"} size={32} />
                  </div>
                  <div className="space-y-1">
                    <h5 className="font-black text-white uppercase tracking-widest text-xs mb-2">Preventative Protection Activated</h5>
                    <p className="text-zinc-400 leading-relaxed font-medium">
                      {result.suggestedAction}
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-80 space-y-6">
                <div className="bg-zinc-950 p-8 rounded-[2.5rem] border border-zinc-800 text-center space-y-6">
                  {result.riskLevel === 'SAFE' ? (
                    <div className="space-y-4">
                      <div className="inline-flex p-6 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                        <ShieldCheck className="text-emerald-500" size={48} />
                      </div>
                      <h5 className="text-emerald-400 font-black uppercase text-sm tracking-[0.2em]">Validated_Safe</h5>
                      <p className="text-xs text-zinc-500 leading-relaxed">No malicious patterns identified. This node is clear for interaction.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="inline-flex p-6 bg-red-500/10 rounded-full border border-red-500/20 animate-pulse">
                        <AlertTriangle className="text-red-500" size={48} />
                      </div>
                      <h5 className="text-red-400 font-black uppercase text-sm tracking-[0.2em]">Threat_Detected</h5>
                      <p className="text-xs text-zinc-500 leading-relaxed">This node has been flagged. Browsing extension has blocked navigation.</p>
                    </div>
                  )}
                  
                  <div className="h-[1px] w-full bg-zinc-800" />
                  
                  <div className="space-y-4 pt-2">
                    <button className="w-full py-4 bg-zinc-900 hover:bg-zinc-800 text-white font-bold rounded-2xl border border-zinc-800 text-xs uppercase tracking-widest transition-all">
                      Report to Platform
                    </button>
                    {(result.riskLevel === 'CRITICAL' || result.riskLevel === 'HIGH') && (
                      <button className="w-full py-2 text-red-500 text-[10px] font-black uppercase tracking-widest hover:underline transition-all">
                        Isolate Device Node
                      </button>
                    )}
                  </div>
                </div>
                
                <button 
                  onClick={() => { setResult(null); setContent(''); setSelectedImage(null); }}
                  className="w-full py-4 border border-zinc-800 text-zinc-500 text-[10px] font-black rounded-2xl hover:text-white hover:border-zinc-700 transition-colors uppercase tracking-[0.3em]"
                >
                  Clear Session
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
