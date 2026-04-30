import { 
  AlertCircle, 
  CheckCircle2, 
  Activity, 
  ShieldAlert, 
  TrendingUp, 
  Clock,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

const data = [
  { name: 'Mon', threats: 12, resolved: 10 },
  { name: 'Tue', threats: 19, resolved: 18 },
  { name: 'Wed', threats: 15, resolved: 14 },
  { name: 'Thu', threats: 22, resolved: 20 },
  { name: 'Fri', threats: 30, resolved: 28 },
  { name: 'Sat', threats: 10, resolved: 10 },
  { name: 'Sun', threats: 8, resolved: 8 },
];

const feed = [
  { id: 1, type: 'SCAM', content: 'Suspicious DM detected from user_5521', time: '2m ago', risk: 'HIGH' },
  { id: 2, type: 'CYBERBULLYING', content: 'Abusive language flagged in comment thread #402', time: '15m ago', risk: 'MEDIUM' },
  { id: 3, type: 'LINK', content: 'Phishing URL blocked on external platform link', time: '1h ago', risk: 'CRITICAL' },
  { id: 4, type: 'SAFE', content: 'Regular system health check completed', time: '3h ago', risk: 'LOW' },
];

function StatCard({ label, value, icon: Icon, trend, color }: { label: string, value: string, icon: any, trend?: string, color: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl hover:border-zinc-700 transition-colors group"
    >
      <div className="flex justify-between items-start mb-4">
        <div className={cn("p-2.5 rounded-xl", color)}>
          <Icon size={24} className="text-white" />
        </div>
        {trend && (
          <span className="flex items-center gap-1 text-emerald-400 text-xs font-bold bg-emerald-400/10 px-2 py-1 rounded-full">
            <TrendingUp size={12} />
            {trend}
          </span>
        )}
      </div>
      <div className="space-y-1">
        <p className="text-zinc-500 text-sm font-medium tracking-wide uppercase">{label}</p>
        <p className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">{value}</p>
      </div>
    </motion.div>
  );
}

export default function Dashboard() {
  return (
    <div className="space-y-8 pb-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-1">Security Dashboard</h2>
          <p className="text-zinc-400">Total protection status and real-time threat monitoring.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-xs font-mono">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            LIVE_PROTECTION: ON
          </div>
          <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg text-sm font-medium transition-colors border border-zinc-700">
            Export Report
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Threats Prevented" value="1,284" icon={ShieldCheck} trend="+12%" color="bg-emerald-600" />
        <StatCard label="Critical Alerts" value="03" icon={AlertCircle} trend="-5%" color="bg-red-600" />
        <StatCard label="Active Monitors" value="24" icon={Activity} color="bg-blue-600" />
        <StatCard label="AI Confidence" value="98.2%" icon={Zap} color="bg-amber-600" />
      </div>

      <section className="space-y-6">
        <h3 className="text-xl font-bold text-white uppercase tracking-tighter">Command Directives</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/scanner" className="group bg-zinc-900 border border-zinc-800 p-8 rounded-3xl hover:border-blue-500 transition-all shadow-xl hover:shadow-blue-500/10">
            <div className="p-4 bg-zinc-800 rounded-2xl w-fit mb-6 group-hover:bg-blue-600 transition-colors">
              <ShieldAlert className="text-white" size={24} />
            </div>
            <h4 className="text-xl font-bold text-white mb-2">Cyberbullying Detect</h4>
            <p className="text-zinc-500 text-sm leading-relaxed">Neural sentiment analysis to detect toxic behavior in social threads.</p>
          </Link>
          <Link to="/scanner" className="group bg-zinc-900 border border-zinc-800 p-8 rounded-3xl hover:border-amber-500 transition-all shadow-xl hover:shadow-amber-500/10">
            <div className="p-4 bg-zinc-800 rounded-2xl w-fit mb-6 group-hover:bg-amber-600 transition-colors">
              <ShieldAlert className="text-white" size={24} />
            </div>
            <h4 className="text-xl font-bold text-white mb-2">Link Interceptor</h4>
            <p className="text-zinc-500 text-sm leading-relaxed">Reputation scanning for phishing nodes and social engineering vectors.</p>
          </Link>
          <Link to="/scanner" className="group bg-zinc-900 border border-zinc-800 p-8 rounded-3xl hover:border-emerald-500 transition-all shadow-xl hover:shadow-emerald-500/10">
            <div className="p-4 bg-zinc-800 rounded-2xl w-fit mb-6 group-hover:bg-emerald-600 transition-colors">
              <ShieldAlert className="text-white" size={24} />
            </div>
            <h4 className="text-xl font-bold text-white mb-2">Image Forensics</h4>
            <p className="text-zinc-500 text-sm leading-relaxed">Multi-modal AI analysis of visual media for hidden threats and abuse.</p>
          </Link>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 overflow-hidden">
            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
              <TrendingUp className="text-blue-500" />
              Incident Trends (Weekly)
            </h3>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorThreats" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#71717a" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    dy={10}
                  />
                  <YAxis 
                    stroke="#71717a" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', borderRadius: '12px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="threats" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorThreats)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
              <h4 className="text-lg font-bold text-white mb-4">Security Tip of the Day</h4>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                "Enable Two-Factor Authentication (2FA) on all social media accounts. Most account takeovers happen due to weak passwords and lack of second-layer security."
              </p>
              <button className="text-blue-400 text-sm font-semibold hover:underline">Read more best practices</button>
            </div>
            <div className="bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border border-blue-500/20 rounded-2xl p-6 relative overflow-hidden group">
              <div className="relative z-10">
                <h4 className="text-lg font-bold text-white mb-2">Deep Scanning Active</h4>
                <p className="text-blue-200/70 text-sm mb-4">AI model 'Gemini-3-Flash' is currently processing background social feeds.</p>
                <div className="w-full bg-blue-900/40 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-400 h-full w-2/3 animate-progress transition-all duration-1000" />
                </div>
              </div>
              <ShieldAlert className="absolute -right-4 -bottom-4 w-32 h-32 text-blue-500/10 group-hover:scale-110 transition-transform duration-500" />
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <section className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 flex flex-col h-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Clock className="text-zinc-500" size={18} />
                Recent Alerts
              </h3>
              <button className="text-xs text-blue-400 font-medium hover:underline">View All</button>
            </div>
            
            <div className="space-y-4">
              {feed.map((item) => (
                <div key={item.id} className="p-4 bg-zinc-950 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <span className={cn(
                      "text-[10px] font-bold px-2 py-0.5 rounded tracking-widest",
                      item.risk === 'CRITICAL' ? "bg-red-500/10 text-red-500" :
                      item.risk === 'HIGH' ? "bg-amber-500/10 text-amber-500" :
                      "bg-blue-500/10 text-blue-500"
                    )}>
                      {item.type}
                    </span>
                    <span className="text-xs text-zinc-600">{item.time}</span>
                  </div>
                  <p className="text-sm text-zinc-300 mb-2">{item.content}</p>
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "w-1.5 h-1.5 rounded-full",
                      item.risk === 'CRITICAL' ? "bg-red-500" :
                      item.risk === 'HIGH' ? "bg-amber-500" :
                      "bg-emerald-500"
                    )} />
                    <span className="text-[10px] text-zinc-500 font-mono">STATUS: {item.risk}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-zinc-800">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-1">
                  <p className="text-sm font-bold text-white">Advanced Search Monitoring</p>
                  <p className="text-xs text-zinc-500">Scanning 1.2M nodes per hour</p>
                </div>
                <div className="p-2 bg-zinc-800 rounded-lg">
                  <ShieldAlert size={16} className="text-zinc-400" />
                </div>
              </div>
              <button className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-900/20 active:scale-95">
                Run Full System Scan
              </button>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
