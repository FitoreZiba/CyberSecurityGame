import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { authApi } from '../services/api'
import { useAuth } from '../context/AuthContext'
import { Shield, Mail, Lock, User, ArrowRight, Eye, EyeOff } from 'lucide-react'

const FLOATING_ICONS = ['🔐', '🛡️', '🔍', '⚡', '🎯', '🦠', '🌐', '✉️']

export default function AuthPage() {
    const [mode,       setMode]       = useState('login')
    const [form,       setForm]       = useState({ username: '', email: '', password: '' })
    const [error,      setError]      = useState('')
    const [loading,    setLoading]    = useState(false)
    const [showPass,   setShowPass]   = useState(false)
    const [particles,  setParticles]  = useState([])
    const { login } = useAuth()
    const navigate  = useNavigate()

    // Generate floating background particles
    useEffect(() => {
        setParticles(
            Array.from({ length: 12 }, (_, i) => ({
                id: i,
                icon: FLOATING_ICONS[i % FLOATING_ICONS.length],
                x: Math.random() * 90 + 5,
                y: Math.random() * 90 + 5,
                delay: Math.random() * 3,
                duration: 3 + Math.random() * 3,
                size: 20 + Math.random() * 20,
            }))
        )
    }, [])

    const handle = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

    const submit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)
        try {
            const res = mode === 'login'
                ? await authApi.login({ email: form.email, password: form.password })
                : await authApi.register({ username: form.username, email: form.email, password: form.password })
            login(res, res.token ?? res.jwt ?? res.accessToken ?? '')
            navigate('/dashboard')
        } catch (err) {
            setError(err.message || 'Something went wrong — try again!')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div
            className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
            style={{ background: 'var(--bg-main)' }}
        >
            {/* Animated background grid */}
            <div className="fixed inset-0 bg-grid opacity-60 pointer-events-none" />

            {/* Floating background icons */}
            {particles.map(p => (
                <div
                    key={p.id}
                    className="fixed pointer-events-none select-none"
                    style={{
                        left: `${p.x}%`,
                        top:  `${p.y}%`,
                        fontSize: p.size,
                        opacity: 0.06,
                        animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite`,
                    }}
                >
                    {p.icon}
                </div>
            ))}

            {/* Glow orbs */}
            <div className="fixed top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none"
                 style={{ background: 'radial-gradient(circle, rgba(0,230,118,0.08) 0%, transparent 70%)' }} />
            <div className="fixed bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none"
                 style={{ background: 'radial-gradient(circle, rgba(24,255,255,0.06) 0%, transparent 70%)' }} />

            {/* Main card */}
            <div className="relative w-full max-w-md animate-fade-in" style={{ zIndex: 10 }}>

                {/* Glowing top border */}
                <div className="h-1 rounded-t-2xl bg-gradient-to-r from-cyber-green via-cyber-cyan to-cyber-purple" />

                <div
                    className="rounded-b-2xl px-10 py-10 border border-t-0"
                    style={{
                        background: 'var(--bg-panel)',
                        borderColor: 'var(--border-dim)',
                        boxShadow: '0 24px 64px rgba(0,0,0,0.4), inset 0 1px 0 rgba(0,230,118,0.05)',
                    }}
                >
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <div className="relative inline-flex items-center justify-center w-20 h-20 mb-5">
                            <div className="absolute inset-0 rounded-2xl bg-cyber-green/15 animate-pulse-glow" />
                            <div className="absolute inset-2 rounded-xl bg-cyber-green/10 animate-spin-slow" style={{ borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }} />
                            <Shield size={36} className="text-cyber-green relative z-10" />
                        </div>
                        <h1 className="font-display font-black text-4xl tracking-widest mb-2">
                            <span style={{ color: 'var(--text-primary)' }}>CYBER</span>
                            <span className="text-gradient-green glow-green"> DETECTIVE</span>
                        </h1>
                        <p className="font-mono text-sm" style={{ color: 'var(--text-secondary)' }}>
                            {mode === 'login' ? '// AGENT AUTHENTICATION REQUIRED' : '// INITIALIZE NEW AGENT PROFILE'}
                        </p>
                    </div>

                    {/* Mode tabs */}
                    <div
                        className="flex rounded-xl overflow-hidden mb-8 p-1 gap-1"
                        style={{ background: 'var(--bg-main)' }}
                    >
                        {['login', 'register'].map(m => (
                            <button
                                key={m}
                                onClick={() => { setMode(m); setError('') }}
                                className="flex-1 py-2.5 rounded-lg font-display font-bold text-sm tracking-widest uppercase transition-all duration-200 cursor-pointer border-0"
                                style={{
                                    background: mode === m
                                        ? 'linear-gradient(135deg, #00e676, #00b248)'
                                        : 'transparent',
                                    color: mode === m ? '#060d18' : 'var(--text-muted)',
                                    boxShadow: mode === m ? '0 0 16px rgba(0,230,118,0.4)' : 'none',
                                }}
                            >
                                {m === 'login' ? '🔑 Login' : '🚀 Register'}
                            </button>
                        ))}
                    </div>

                    {/* Form */}
                    <form onSubmit={submit} className="flex flex-col gap-5">
                        {mode === 'register' && (
                            <div className="flex flex-col gap-2">
                                <label className="flex items-center gap-2 font-display font-bold text-xs tracking-widest uppercase"
                                       style={{ color: 'var(--text-secondary)' }}>
                                    <User size={12} /> Agent Codename
                                </label>
                                <input
                                    type="text" name="username" required
                                    placeholder="Choose your codename"
                                    value={form.username} onChange={handle}
                                    className="rounded-xl px-4 py-3.5 font-body text-base outline-none transition-all duration-200"
                                    style={{
                                        background: 'var(--bg-main)',
                                        border: '2px solid var(--border-dim)',
                                        color: 'var(--text-primary)',
                                    }}
                                    onFocus={e => e.target.style.borderColor = '#00e676'}
                                    onBlur={e => e.target.style.borderColor = 'var(--border-dim)'}
                                />
                            </div>
                        )}

                        <div className="flex flex-col gap-2">
                            <label className="flex items-center gap-2 font-display font-bold text-xs tracking-widest uppercase"
                                   style={{ color: 'var(--text-secondary)' }}>
                                <Mail size={12} /> Email Address
                            </label>
                            <input
                                type="email" name="email" required
                                placeholder="agent@cyberunit.io"
                                value={form.email} onChange={handle}
                                className="rounded-xl px-4 py-3.5 font-body text-base outline-none transition-all duration-200"
                                style={{
                                    background: 'var(--bg-main)',
                                    border: '2px solid var(--border-dim)',
                                    color: 'var(--text-primary)',
                                }}
                                onFocus={e => e.target.style.borderColor = '#00e676'}
                                onBlur={e => e.target.style.borderColor = 'var(--border-dim)'}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="flex items-center gap-2 font-display font-bold text-xs tracking-widest uppercase"
                                   style={{ color: 'var(--text-secondary)' }}>
                                <Lock size={12} /> Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPass ? 'text' : 'password'} name="password" required
                                    placeholder="Enter your password"
                                    value={form.password} onChange={handle}
                                    className="w-full rounded-xl px-4 py-3.5 font-body text-base outline-none transition-all duration-200 pr-12"
                                    style={{
                                        background: 'var(--bg-main)',
                                        border: '2px solid var(--border-dim)',
                                        color: 'var(--text-primary)',
                                    }}
                                    onFocus={e => e.target.style.borderColor = '#00e676'}
                                    onBlur={e => e.target.style.borderColor = 'var(--border-dim)'}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPass(s => !s)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100 transition-opacity"
                                    style={{ color: 'var(--text-secondary)', background: 'none', border: 'none', cursor: 'pointer' }}
                                >
                                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div
                                className="rounded-xl px-4 py-3 font-body text-sm flex items-center gap-2"
                                style={{ background: 'rgba(255,82,82,0.1)', border: '1px solid rgba(255,82,82,0.4)', color: '#ff5252' }}
                            >
                                ⚠ {error}
                            </div>
                        )}

                        <button
                            type="submit" disabled={loading}
                            className="btn-neon-green w-full py-4 rounded-xl font-display font-black text-base tracking-widest uppercase flex items-center justify-center gap-3 mt-2 cursor-pointer"
                            style={{ opacity: loading ? 0.7 : 1 }}
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-cyber-bg/30 border-t-cyber-bg rounded-full animate-spin" />
                                    CONNECTING...
                                </>
                            ) : (
                                <>
                                    <ArrowRight size={18} />
                                    {mode === 'login' ? 'ENTER THE MISSION' : 'JOIN THE AGENCY'}
                                </>
                            )}
                        </button>
                    </form>

                    <p className="text-center font-body text-sm mt-5" style={{ color: 'var(--text-muted)' }}>
                        {mode === 'login'
                            ? "New agent? Click Register to join!"
                            : 'Already an agent? Click Login!'}
                    </p>
                </div>
            </div>
        </div>
    )
}