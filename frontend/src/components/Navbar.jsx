import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const LINKS = [
    { to: '/dashboard',   label: 'Home',        icon: '⌂' },
    { to: '/learn',       label: 'Learn',      icon: '📚' },
    { to: '/categories',  label: 'Challenges',  icon: '◎' },
    { to: '/missions',    label: 'Missions',    icon: '◈' },
    { to: '/leaderboard', label: 'Leaderboard', icon: '★' },
    { to: '/profile',     label: 'Profile',     icon: '◉' },
]

export default function Navbar() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const { pathname } = useLocation()

    if (!user) return null

    return (
        <nav className="sticky top-0 z-50 bg-cyber-panel/95 border-b-2 border-cyber-green/30 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-6 flex items-center gap-6" style={{ height: 70 }}>

                {/* Brand */}
                <Link to="/dashboard" className="flex items-center gap-3 shrink-0 no-underline">
                    <div className="w-10 h-10 rounded-xl bg-cyber-green/20 border-2 border-cyber-green/50 flex items-center justify-center text-cyber-green text-xl font-bold animate-pulse-glow">
                        ◈
                    </div>
                    <div>
            <span className="font-display font-bold text-xl tracking-widest text-white">
              CYBER
            </span>
                        <span className="font-display font-bold text-xl tracking-widest text-gradient-green">
              DETECTIVE
            </span>
                    </div>
                </Link>

                {/* Links */}
                <div className="flex items-center gap-1 flex-1 ml-4">
                    {LINKS.map(({ to, label, icon }) => (
                        <Link
                            key={to}
                            to={to}
                            className={`
                flex items-center gap-2 font-display font-semibold text-sm
                tracking-wider uppercase px-4 py-2 rounded-xl border-2
                transition-all duration-200 no-underline
                ${pathname === to
                                ? 'text-cyber-bg bg-cyber-green border-cyber-green shadow-[0_0_16px_rgba(0,230,118,0.4)]'
                                : 'text-cyber-secondary border-transparent hover:text-cyber-green hover:border-cyber-green/30 hover:bg-cyber-green/10'}
              `}
                        >
                            <span className="text-base">{icon}</span>
                            {label}
                        </Link>
                    ))}
                </div>

                {/* User info */}
                <div className="flex items-center gap-3 shrink-0">
                    <div className="flex items-center gap-3 px-4 py-2 bg-cyber-card border-2 border-cyber-green/25 rounded-xl">
                        <div className="w-2 h-2 rounded-full bg-cyber-green shadow-[0_0_8px_rgba(0,230,118,1)] animate-pulse" />
                        <span className="font-display font-semibold text-sm text-white">
              {user.username || user.email}
            </span>
                        <span className="font-mono text-sm text-cyber-green font-bold">
              {user.points ?? 0} pts
            </span>
                    </div>
                    <button
                        onClick={() => { logout(); navigate('/login') }}
                        className="w-10 h-10 flex items-center justify-center border-2 border-cyber-muted/50 text-cyber-secondary rounded-xl hover:border-cyber-danger hover:text-cyber-danger hover:bg-cyber-danger/10 transition-all text-lg"
                    >
                        ⏻
                    </button>
                </div>

            </div>
        </nav>
    )
}