import { 
  useState, 
  useEffect 
} from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Link, 
  useLocation 
} from 'react-router-dom';
import { 
  Shield, 
  LayoutDashboard, 
  Search, 
  BookOpen, 
  AlertTriangle, 
  Bell,
  Menu,
  Lock,
  Loader2
} from 'lucide-react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './lib/firebase';
import { cn } from './lib/utils';
import Dashboard from './pages/Dashboard';
import ThreatScanner from './pages/ThreatScanner';
import EducationalPortal from './pages/EducationalPortal';
import Login from './pages/Login';
import ShieldGuard from './pages/ShieldGuard';

function NavItem({ to, icon: Icon, label, active, onClick }: { to: string, icon: any, label: string, active: boolean, onClick?: () => void }) {
  return (
    <Link 
      to={to} 
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group relative",
        active 
          ? "bg-zinc-900 text-white shadow-lg shadow-black/20" 
          : "text-zinc-400 hover:text-white hover:bg-zinc-900/50"
      )}
    >
      <Icon size={20} className={cn("transition-transform duration-200 group-hover:scale-110", active ? "text-blue-400" : "")} />
      <span className="font-medium">{label}</span>
      {active && <div className="absolute left-0 w-1 h-6 bg-blue-500 rounded-r-full" />}
    </Link>
  );
}

function Sidebar({ isOpen, setIsOpen, user }: { isOpen: boolean, setIsOpen: (o: boolean) => void, user: any }) {
  const location = useLocation();

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={cn(
        "fixed top-0 left-0 bottom-0 w-64 bg-zinc-950 border-r border-zinc-800 z-50 transition-transform duration-300 transform lg:translate-x-0 p-6 flex flex-col gap-8",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-600 rounded-xl shadow-lg shadow-blue-900/20">
            <Shield className="text-white" size={24} />
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">Deep Guardian</h1>
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          <NavItem to="/" icon={LayoutDashboard} label="Dashboard" active={location.pathname === "/"} />
          <NavItem to="/scanner" icon={Search} label="AI Threat Scanner" active={location.pathname === "/scanner"} />
          <NavItem to="/education" icon={BookOpen} label="Learning Hub" active={location.pathname === "/education"} />
          <NavItem to="/blocked" icon={AlertTriangle} label="Blocked History" active={location.pathname === "/blocked"} />
        </nav>

        <div className="mt-auto pt-8 border-t border-zinc-800 flex flex-col gap-2">
          <div className="px-4 py-2 mb-2">
            <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-1">Operator</p>
            <p className="text-xs text-zinc-400 truncate font-mono">{user?.email}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors font-bold text-sm uppercase tracking-widest"
          >
            <Lock size={18} />
            <span>Lock Session</span>
          </button>
        </div>
      </aside>
    </>
  );
}

function Header({ setSidebarOpen }: { setSidebarOpen: (o: boolean) => void }) {
  return (
    <header className="sticky top-0 z-30 h-16 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 px-6 flex items-center justify-between">
      <button 
        onClick={() => setSidebarOpen(true)}
        className="p-2 text-zinc-400 hover:text-white lg:hidden"
      >
        <Menu size={24} />
      </button>

      <div className="flex-1 lg:ml-64 px-4">
        <div className="hidden md:flex items-center text-zinc-500 text-sm font-mono tracking-wider">
          <span className="text-blue-500 mr-2">SYS_MSG:</span>
          <span>SYSTEM_OPERATIONAL_READY</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-zinc-400 hover:text-white transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-zinc-950" />
        </button>
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-xs font-bold text-white uppercase border border-white/10">
          OP
        </div>
      </div>
    </header>
  );
}

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center gap-4">
        <Loader2 className="text-blue-500 animate-spin" size={48} />
        <p className="text-zinc-500 font-mono text-sm animate-pulse uppercase tracking-[0.3em]">Authenticating Node...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <Router>
        <Login />
      </Router>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-blue-500/30">
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} user={user} />
        
        <div className="flex flex-col min-h-screen">
          <Header setSidebarOpen={setSidebarOpen} />
          
          <main className={cn(
            "flex-1 p-6 lg:ml-64 transition-all duration-300",
            sidebarOpen ? "blur-sm md:blur-none" : ""
          )}>
            <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/scanner" element={<ThreatScanner />} />
                <Route path="/education" element={<EducationalPortal />} />
                <Route path="/blocked" element={<ShieldGuard />} />
                <Route path="*" element={<Dashboard />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
}
