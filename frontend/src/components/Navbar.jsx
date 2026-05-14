import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth }  from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import {
    LayoutDashboard, BookOpen, Swords,
    Target, Trophy, User, Sun, Moon, LogOut, Shield, Zap
} from 'lucide-react'

const LINKS = [
    { to: '/dashboard',   label: 'Base',        Icon: LayoutDashboard },
    { to: '/learn',       label: 'Intel',        Icon: BookOpen        },
    { to: '/categories',  label: 'Challenges',   Icon: Swords          },
    { to: '/missions',    label: 'Missions',     Icon: Target          },
    { to: '/leaderboard', label: 'Rankings',     Icon: Trophy          },
    { to: '/profile',     label: 'Agent',        Icon: User            },
]

const LEVEL_COLORS = ['#6a9ab8','#00e676','#18ffff','#ffd740','#ff5252']
const LEVEL_LABELS = ['RECRUIT','BEGINNER','AGENT','EXPERT','ELITE']

export default function Navbar() {
    const { user, logout }        = useAuth()
    const { isDark, toggleTheme } = useTheme()
    const navigate                = useNavigate()
    const { pathname }            = useLocation()

    if (!user) return null

    const level      = user?.level ?? 0
    const points     = user?.points ?? 0
    const xp         = points % 100
    const levelColor = LEVEL_COLORS[Math.min(level, 4)]
    const levelLabel = LEVEL_LABELS[Math.min(level, 4)]

    return (
        <nav
            className="sticky top-0 z-50 backdrop-blur-xl border-b"
            style={{
                background: isDark
                    ? 'linear-gradient(180deg, rgba(6,13,24,0.98) 0%, rgba(10,22,40,0.95) 100%)'
                    : 'linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(238,244,251,0.95) 100%)',
                borderColor: 'var(--border-dim)',
            }}
        >
            {/* Top accent line */}
            <div className="h-0.5 bg-gradient-to-r from-transparent via-cyber-green to-cyber-cyan" />

            <div className="max-w-7xl mx-auto px-5 flex items-center gap-3" style={{ height: 65 }}>

                {/* Brand */}
                <Link to="/dashboard" className="flex items-center gap-2.5 shrink-0 no-underline group">
                    <div className="relative w-9 h-9 flex items-center justify-center">
                        <div className="absolute inset-0 rounded-lg bg-cyber-green/20 animate-pulse-glow" />
                        <Shield size={20} className="text-cyber-green relative z-10" />
                    </div>
                    <div className="flex flex-col leading-none">
            <span className="font-display font-black text-base tracking-[0.2em]" style={{ color: 'var(--text-primary)' }}>
              CYBER
            </span>
                        <span className="font-display font-black text-base tracking-[0.2em] text-gradient-green">
              DETECTIVE
            </span>
                    </div>
                </Link>

                {/* Divider */}
                <div className="h-8 w-px mx-1" style={{ background: 'var(--border-dim)' }} />

                {/* Nav links */}
                <div className="flex items-center gap-0.5 flex-1">
                    {LINKS.map(({ to, label, Icon }) => {
                        const active = pathname === to
                        return (
                            <Link
                                key={to}
                                to={to}
                                className={`
                  relative flex items-center gap-1.5 px-3 py-2 rounded-lg
                  font-display font-bold text-xs tracking-wider uppercase
                  transition-all duration-200 no-underline group
                  ${active ? 'text-cyber-bg' : ''}
                `}
                                style={{
                                    background: active ? '#00e676' : 'transparent',
                                    color: active ? '#060d18' : 'var(--text-secondary)',
                                    boxShadow: active ? '0 0 20px rgba(0,230,118,0.5)' : 'none',
                                }}
                            >
                                {!active && (
                                    <span
                                        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                        style={{ background: 'rgba(0,230,118,0.08)' }}
                                    />
                                )}
                                <Icon size={14} />
                                {label}
                                {active && (
                                    <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyber-green" />
                                )}
                            </Link>
                        )
                    })}
                </div>

                {/* HUD — player stats */}
                <div
                    className="flex items-center gap-3 px-4 py-2 rounded-xl border"
                    style={{ background: 'var(--bg-card)', borderColor: 'var(--border-dim)' }}
                >
                    {/* Avatar */}
                    <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center font-display font-black text-sm"
                        style={{ background: `${levelColor}22`, color: levelColor, border: `1px solid ${levelColor}44` }}
                    >
                        {(user.username || 'A')[0].toUpperCase()}
                    </div>

                    {/* Info */}
                    <div className="flex flex-col leading-none gap-1">
                        <div className="flex items-center gap-2">
              <span className="font-display font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
                {user.username || 'Agent'}
              </span>
                            <span
                                className="font-mono text-xs px-1.5 py-0.5 rounded font-bold"
                                style={{ background: `${levelColor}22`, color: levelColor, fontSize: '0.6rem' }}
                            >
                {levelLabel}
              </span>
                        </div>
                        {/* Mini XP bar */}
                        <div className="flex items-center gap-1.5">
                            <Zap size={9} className="text-cyber-amber shrink-0" />
                            <div className="w-20 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-main)' }}>
                                <div
                                    className="h-full xp-bar rounded-full transition-all duration-500"
                                    style={{ width: `${xp}%` }}
                                />
                            </div>
                            <span className="font-mono text-cyber-amber font-bold" style={{ fontSize: '0.6rem' }}>
                {points}
              </span>
                        </div>
                    </div>
                </div>

                {/* Theme toggle */}
                <button
                    onClick={toggleTheme}
                    className="w-9 h-9 flex items-center justify-center rounded-lg border transition-all duration-200 hover:scale-110"
                    style={{
                        background:  isDark ? 'rgba(255,215,64,0.1)' : 'rgba(0,100,200,0.1)',
                        borderColor: isDark ? 'rgba(255,215,64,0.4)' : 'rgba(0,100,200,0.3)',
                        color:       isDark ? '#ffd740'              : '#448aff',
                    }}
                >
                    {isDark ? <Sun size={15} /> : <Moon size={15} />}
                </button>

                {/* Logout */}
                <button
                    onClick={() => { logout(); navigate('/login') }}
                    className="w-9 h-9 flex items-center justify-center rounded-lg border transition-all duration-200 hover:scale-110"
                    style={{ borderColor: 'var(--text-muted)', color: 'var(--text-secondary)' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = '#ff5252'; e.currentTarget.style.color = '#ff5252' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--text-muted)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
                >
                    <LogOut size={15} />
                </button>

            </div>
        </nav>
    )
}