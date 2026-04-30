import { Book, LifeBuoy, Users, Shield, ArrowRight, MessageCircle, ExternalLink, Play } from 'lucide-react';
import { motion } from 'motion/react';

const articles = [
  {
    id: 1,
    title: "Identifying Social Engineering",
    category: "Scams",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    description: "Learn how hackers use psychology to trick you into giving away your passwords."
  },
  {
    id: 2,
    title: "Help! I'm Being Harassed",
    category: "Prevention",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800",
    description: "A step-by-step guide on how to safely document and report online abuse."
  },
  {
    id: 3,
    title: "Digital Footprint Awareness",
    category: "Privacy",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1633265485732-d73c307edce4?auto=format&fit=crop&q=80&w=800",
    description: "What your social media accounts actually say about you to potential threats."
  },
  {
    id: 4,
    title: "The Anatomy of a Phishing Attack",
    category: "Scams",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800",
    description: "Breakdown of how malicious links are disguised as legitimate business emails."
  },
  {
    id: 5,
    title: "AI-Powered Harassment",
    category: "AI Trends",
    readTime: "10 min",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    description: "How bad actors are using deepfakes and LLMs to automate social engineering."
  },
  {
    id: 6,
    title: "Securing Your Personal Data",
    category: "Basics",
    readTime: "3 min",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
    description: "Essential checklist for enabling 2FA and checking your data breach status."
  }
];

export default function EducationalPortal() {
  return (
    <div className="space-y-16 pb-20">
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden rounded-[3rem] bg-zinc-900">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover"
            alt="Cybersecurity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-full text-blue-400 text-sm font-bold tracking-widest uppercase mb-4"
          >
            <Book size={16} />
            The Learning Hub
          </motion.div>
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[0.9] uppercase">
            Stay Aware.<br/>Stay Protected.
          </h2>
          <p className="text-zinc-300 text-xl max-w-2xl mx-auto leading-relaxed">
            Cybersecurity starts with human intelligence. Elevate your online safety with our curated guides and resources.
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article, idx) => (
          <motion.article 
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group cursor-pointer"
          >
            <div className="aspect-[16/10] overflow-hidden rounded-3xl mb-6 relative">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-widest border border-white/10">
                  {article.category}
                </span>
              </div>
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Play className="text-white fill-current" size={48} />
              </div>
            </div>
            <div className="space-y-3 px-2">
              <div className="flex items-center justify-between text-zinc-500 text-xs font-mono">
                <span>{article.readTime} READ</span>
                <span>VOL. 24 / ISSUE. 02</span>
              </div>
              <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors tracking-tight">
                {article.title}
              </h3>
              <p className="text-zinc-400 leading-relaxed text-sm">
                {article.description}
              </p>
              <div className="pt-2">
                <div className="h-[1px] w-full bg-zinc-800 mb-4 group-hover:bg-blue-500/50 transition-colors" />
                <button className="flex items-center gap-2 text-sm font-bold text-white group-hover:gap-4 transition-all">
                  Read Full Guide <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <section className="bg-blue-600 rounded-[3rem] p-12 md:p-20 text-white flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden relative">
        <div className="relative z-10 space-y-6 max-w-2xl">
          <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none">
            Need Immediate Assistance?
          </h3>
          <p className="text-blue-100 text-lg leading-relaxed">
            Our priority response team is standing by to help victims of online extortion, severe cyberbullying, and financial fraud. Don't face it alone.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-4 bg-white text-blue-600 font-bold rounded-2xl flex items-center gap-3 hover:bg-zinc-100 transition-colors">
              <LifeBuoy size={20} />
              Get Urgent Help
            </button>
            <button className="px-8 py-4 bg-blue-700/50 text-white font-bold rounded-2xl border border-blue-500 flex items-center gap-3 hover:bg-blue-700 transition-colors">
              <MessageCircle size={20} />
              Chat with Agent
            </button>
          </div>
        </div>
        <div className="relative shrink-0">
          <div className="w-64 h-64 md:w-80 md:h-80 bg-blue-400/20 rounded-full flex items-center justify-center p-8 backdrop-blur-2xl border border-white/10 animate-blob">
            <Shield size={160} className="text-white drop-shadow-2xl" />
          </div>
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-indigo-500/40 rounded-full blur-2xl" />
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-sky-400/40 rounded-full blur-3xl" />
        </div>
      </section>

      <footer className="pt-20 border-t border-zinc-800 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2 space-y-6">
          <div className="flex items-center gap-3">
            <Shield className="text-blue-500" size={32} />
            <h4 className="text-2xl font-bold text-white tracking-tight">GuardianAI Resources</h4>
          </div>
          <p className="text-zinc-500 max-w-md">
            The global leader in AI-driven cybersecurity education. Empowering 10M+ users to reclaim their digital safety.
          </p>
        </div>
        <div className="space-y-4">
          <h5 className="font-bold text-white uppercase text-xs tracking-widest text-zinc-400">Partners</h5>
          <ul className="space-y-3 text-sm text-zinc-500 font-medium">
            <li className="hover:text-blue-400 cursor-pointer flex items-center gap-2">Cyber Foundation <ExternalLink size={12}/></li>
            <li className="hover:text-blue-400 cursor-pointer flex items-center gap-2">Global Safety Org <ExternalLink size={12}/></li>
            <li className="hover:text-blue-400 cursor-pointer flex items-center gap-2">Privacy Shield Int. <ExternalLink size={12}/></li>
          </ul>
        </div>
        <div className="space-y-4">
          <h5 className="font-bold text-white uppercase text-xs tracking-widest text-zinc-400">Legal</h5>
          <ul className="space-y-3 text-sm text-zinc-500 font-medium">
            <li className="hover:text-blue-400 cursor-pointer">Privacy Policy</li>
            <li className="hover:text-blue-400 cursor-pointer">Terms of Service</li>
            <li className="hover:text-blue-400 cursor-pointer">Reporting Guidelines</li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
