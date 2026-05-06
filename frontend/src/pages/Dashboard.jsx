import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { progressApi } from '../services/api'
import { getLevelLabel, getLevelColor, getXpProgress } from '../utils/levelUtils'

const CATEGORIES = [
    { id: 1, icon: '🎣', name: 'Spot the Phishing',   desc: 'Can you spot the fake email?',      diff: 'EASY',   color: 'amber', border: 'border-cyber-amber', glow: 'card-glow-amber' },
    { id: 2, icon: '🔐', name: 'Password Power',       desc: 'Build the strongest password!',     diff: 'EASY',   color: 'green', border: 'border-cyber-green', glow: 'card-glow-green' },
    { id: 3, icon: '🦠', name: 'Malware Hunter',       desc: 'Detect the dangerous files!',       diff: 'MEDIUM', color: 'cyan',  border: 'border-cyber-cyan',  glow: 'card-glow-cyan'  },
    { id: 4, icon: '🌐', name: 'Fake Site Detective',  desc: 'Is this website real or fake?',     diff: 'HARD',   color: 'purple',border: 'border-cyber-purple',glow: ''                },
]

const DIFF_STYLES = {
    EASY:   'bg-cyber-green/20  text-cyber-green  border-cyber-green/40',
    MEDIUM: 'bg-cyber-amber/20  text-cyber-amber  border-cyber-amber/40',
    HARD:   'bg-cyber-danger/20 text-cyber-danger border-cyber-danger/40',
}

export default function Dashboard() {
    const { user, token } = useAuth()
    const [progress, setProgress]   = useState(null)
    const [loading,  setLoading]    = useState(true)

    useEffect(() => {
        if (user?.id) {
            progressApi.getProgress(user.id, token)
                .then(setProgress).catch(() => {}).finally(() => setLoading(false))
        } else setLoading(false)
    }, [user, token])

    const level    = user?.level  ?? 0
    const points   = user?.points ?? 0
    const xp       = getXpProgress(points)
    const lvlLabel = getLevelLabel(level)

    return (
        <div className="max-w-7xl mx-auto px-6 py-10 pb-20 animate-fade-in">

            {/* Hero */}
            <div className="bg-cyber-panel border-2 border-cyber-green/25 rounded-2xl p-8 mb-8 relative overflow-hidden card-glow-green">
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyber-green/5 rounded-full blur-3xl pointer-events-none" />
                <div className="relative flex items-center justify-between gap-6 flex-wrap">
                    <div>
                        <p className="font-mono text-cyber-green text-sm mb-2">
                            ● AGENT STATUS: ONLINE
                        </p>
                        <h1 className="font-display font-bold text-5xl mb-2">
                            Hey, <span className="text-gradient-green glow-green">{user?.username || 'Agent'}!</span>
                        </h1>
                        <p className="font-body text-cyber-secondary text-lg">
                            Ready to solve some cyber mysteries? Let's go! 🚀
                        </p>
                    </div>
                    <div className="bg-cyber-bg border-2 border-cyber-green/30 rounded-2xl px-8 py-5 text-center">
                        <p className="font-mono text-xs text-cyber-muted mb-1 tracking-widest">RANK</p>
                        <p className="font-display font-bold text-3xl text-cyber-green glow-green">{lvlLabel}</p>
                        <p className="font-mono text-xs text-cyber-muted mt-1">Level {level}</p>
                    </div>
                </div>

                {/* XP Bar */}
                <div className="relative mt-6">
                    <div className="flex justify-between mb-2">
                        <span className="font-body text-sm text-cyber-secondary">XP Progress to Next Level</span>
                        <span className="font-mono text-sm text-cyber-green font-bold">{xp} / 100 XP</span>
                    </div>
                    <div className="h-4 bg-cyber-bg rounded-full overflow-hidden border border-cyber-green/20">
                        <div
                            className="h-full bg-gradient-to-r from-cyber-green to-cyber-cyan rounded-full transition-all duration-700 shadow-[0_0_12px_rgba(0,230,118,0.6)]"
                            style={{ width: `${xp}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mb-8">
                {[
                    { label: 'Total Points', value: points.toLocaleString(), icon: '⭐', color: 'text-cyber-amber',  border: 'border-cyber-amber/30'  },
                    { label: 'Your Level',   value: level,                   icon: '🎯', color: 'text-cyber-cyan',   border: 'border-cyber-cyan/30'   },
                    { label: 'Cases Solved', value: loading ? '...' : (progress?.completedCases ?? 0), icon: '✅', color: 'text-cyber-green', border: 'border-cyber-green/30' },
                    { label: 'Accuracy',     value: loading ? '...' : `${progress?.accuracy ?? 0}%`,  icon: '🎯', color: 'text-cyber-purple',border: 'border-cyber-purple/30'},
                ].map(({ label, value, icon, color, border }) => (
                    <div key={label} className={`bg-cyber-card border-2 ${border} rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-200`}>
                        <div className="text-3xl mb-2">{icon}</div>
                        <p className={`font-display font-bold text-4xl ${color} mb-1`}>{value}</p>
                        <p className="font-body text-sm text-cyber-secondary">{label}</p>
                    </div>
                ))}
            </div>

            {/* Category Cards */}
            <h2 className="font-display font-bold text-2xl text-white mb-5">
                🎮 Choose Your Challenge
            </h2>
            <div className="grid grid-cols-2 gap-5 mb-8">
                {CATEGORIES.map((cat, i) => (
                    <Link
                        key={cat.id}
                        to={`/game/${cat.id}`}
                        className={`
              flex items-center gap-5 bg-cyber-card border-2 ${cat.border}/30
              hover:${cat.border} rounded-2xl p-6 no-underline text-white
              hover:scale-102 hover:shadow-lg transition-all duration-200
              animate-fade-in
            `}
                        style={{ animationDelay: `${i * 0.1}s` }}
                    >
                        <div className="w-16 h-16 flex items-center justify-center bg-cyber-bg rounded-2xl text-4xl shrink-0 border border-white/10">
                            {cat.icon}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                                <h3 className="font-display font-bold text-xl">{cat.name}</h3>
                                <span className={`font-mono text-xs px-2 py-0.5 rounded-lg border ${DIFF_STYLES[cat.diff]}`}>
                  {cat.diff}
                </span>
                            </div>
                            <p className="font-body text-cyber-secondary text-sm">{cat.desc}</p>
                        </div>
                        <span className="text-cyber-secondary text-2xl shrink-0">→</span>
                    </Link>
                ))}
            </div>

            {/* Mission CTA */}
            <div className="bg-cyber-panel border-2 border-cyber-cyan/30 rounded-2xl p-8 flex items-center justify-between gap-6 card-glow-cyan">
                <div>
                    <h3 className="font-display font-bold text-2xl mb-2">
                        🕵️ <span className="text-gradient-cyber glow-cyan">Secret Missions Await!</span>
                    </h3>
                    <p className="font-body text-cyber-secondary text-base">
                        Take on full cyber case investigations. Solve each clue to crack the case and earn bonus XP!
                    </p>
                </div>
                <Link
                    to="/missions"
                    className="shrink-0 px-8 py-4 font-display font-bold text-base tracking-widest uppercase bg-cyber-cyan text-cyber-bg rounded-xl hover:shadow-[0_0_28px_rgba(24,255,255,0.5)] transition-all no-underline whitespace-nowrap"
                >
                    START MISSION →
                </Link>
            </div>

        </div>
    )
}