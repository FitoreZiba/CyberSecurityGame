import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authApi } from '../services/api'
import { useAuth } from '../context/AuthContext'

export default function AuthPage() {
    const [mode, setMode]       = useState('login')
    const [form, setForm]       = useState({ username: '', email: '', password: '' })
    const [error, setError]     = useState('')
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()
    const navigate  = useNavigate()

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
        <div className="min-h-screen bg-cyber-bg flex items-center justify-center px-4 relative overflow-hidden">

            {/* Background grid */}
            <div className="fixed inset-0 bg-grid pointer-events-none opacity-60" />

            {/* Glowing orbs */}
            <div className="fixed top-1/4 left-1/4 w-72 h-72 bg-cyber-green/8 rounded-full blur-3xl pointer-events-none animate-float" />
            <div className="fixed bottom-1/4 right-1/4 w-72 h-72 bg-cyber-cyan/8 rounded-full blur-3xl pointer-events-none animate-float" style={{ animationDelay: '1.5s' }} />

            <div className="relative w-full max-w-lg animate-fade-in">

                {/* Top glow line */}
                <div className="h-1 bg-gradient-to-r from-transparent via-cyber-green to-cyber-cyan rounded-t-xl mb-0" />

                <div className="bg-cyber-panel border-2 border-cyber-green/25 rounded-b-2xl rounded-tr-2xl px-10 py-12 shadow-[0_8px_48px_rgba(0,0,0,0.4)]">

                    {/* Logo */}
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-cyber-green/15 border-2 border-cyber-green/40 mb-5 animate-float">
                            <span className="text-4xl">🔐</span>
                        </div>
                        <h1 className="font-display font-bold text-4xl tracking-widest mb-2">
                            <span className="text-white">CYBER</span>
                            <span className="text-gradient-green glow-green"> DETECTIVE</span>
                        </h1>
                        <p className="font-body text-cyber-secondary text-base">
                            {mode === 'login'
                                ? 'Welcome back, Agent! Ready to protect the web?'
                                : 'Join the mission — create your agent profile!'}
                        </p>
                    </div>

                    {/* Tabs */}
                    <div className="flex bg-cyber-bg rounded-xl overflow-hidden mb-8 border-2 border-cyber-green/20">
                        {['login', 'register'].map(m => (
                            <button
                                key={m}
                                onClick={() => { setMode(m); setError('') }}
                                className={`
                  flex-1 py-3 font-display font-bold text-sm tracking-widest uppercase
                  transition-all duration-200 border-none cursor-pointer
                  ${mode === m
                                    ? 'bg-cyber-green text-cyber-bg shadow-[0_0_16px_rgba(0,230,118,0.4)]'
                                    : 'bg-transparent text-cyber-muted hover:text-cyber-secondary'}
                `}
                            >
                                {m === 'login' ? '🔑 Login' : '🚀 Register'}
                            </button>
                        ))}
                    </div>

                    {/* Form */}
                    <form onSubmit={submit} className="flex flex-col gap-5">
                        {mode === 'register' && (
                            <div className="flex flex-col gap-2">
                                <label className="font-display font-bold text-sm tracking-wider uppercase text-cyber-secondary">
                                    🧑 Agent Name
                                </label>
                                <input
                                    type="text" name="username" required
                                    placeholder="Choose your agent name"
                                    value={form.username} onChange={handle}
                                    className="bg-cyber-bg border-2 border-cyber-muted/40 rounded-xl px-5 py-4 font-body text-base text-white placeholder-cyber-muted outline-none focus:border-cyber-green focus:shadow-[0_0_0_3px_rgba(0,230,118,0.15)] transition-all"
                                />
                            </div>
                        )}

                        <div className="flex flex-col gap-2">
                            <label className="font-display font-bold text-sm tracking-wider uppercase text-cyber-secondary">
                                📧 Email Address
                            </label>
                            <input
                                type="email" name="email" required
                                placeholder="your@email.com"
                                value={form.email} onChange={handle}
                                className="bg-cyber-bg border-2 border-cyber-muted/40 rounded-xl px-5 py-4 font-body text-base text-white placeholder-cyber-muted outline-none focus:border-cyber-green focus:shadow-[0_0_0_3px_rgba(0,230,118,0.15)] transition-all"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="font-display font-bold text-sm tracking-wider uppercase text-cyber-secondary">
                                🔒 Password
                            </label>
                            <input
                                type="password" name="password" required
                                placeholder="Enter your password"
                                value={form.password} onChange={handle}
                                className="bg-cyber-bg border-2 border-cyber-muted/40 rounded-xl px-5 py-4 font-body text-base text-white placeholder-cyber-muted outline-none focus:border-cyber-green focus:shadow-[0_0_0_3px_rgba(0,230,118,0.15)] transition-all"
                            />
                        </div>

                        {error && (
                            <div className="bg-cyber-danger/10 border-2 border-cyber-danger/40 rounded-xl px-5 py-4 text-cyber-danger font-body text-sm">
                                ⚠ {error}
                            </div>
                        )}

                        <button
                            type="submit" disabled={loading}
                            className="mt-2 w-full py-4 font-display font-bold text-lg tracking-widest uppercase bg-cyber-green text-cyber-bg rounded-xl hover:shadow-[0_0_28px_rgba(0,230,118,0.5)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 active:scale-98"
                        >
                            {loading
                                ? <span>CONNECTING<span className="animate-blink">...</span></span>
                                : mode === 'login' ? '🚀 ENTER THE MISSION' : '⚡ CREATE AGENT PROFILE'}
                        </button>
                    </form>

                    <p className="text-center font-body text-sm text-cyber-muted mt-6">
                        {mode === 'login'
                            ? "Don't have an account? Click Register above!"
                            : 'Already an agent? Click Login above!'}
                    </p>
                </div>
            </div>
        </div>
    )
}