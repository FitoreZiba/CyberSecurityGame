import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { progressApi } from '../services/api'
import { getLevelLabel, getLevelColor, getXpProgress } from '../utils/levelUtils'
import ProgressBar from '../components/ui/ProgressBar'
import Badge from '../components/ui/Badge'
import Alert from '../components/ui/Alert'
import Card from '../components/ui/Card'

const ACHIEVEMENTS = [
    { id: 'first_blood', icon: '🎯', label: 'First Case',      desc: 'Completed your first challenge',     condition: (p) => (p?.completedCases ?? 0) >= 1 },
    { id: 'sharp_eye',   icon: '👁',  label: 'Sharp Eye',       desc: 'Spotted 5 phishing emails',          condition: (p) => (p?.phishingCaught ?? 0)  >= 5 },
    { id: 'locksmith',   icon: '🔐', label: 'Locksmith',       desc: 'Aced the password challenge',         condition: (p) => (p?.passwordScore ?? 0)   >= 10 },
    { id: 'ghost',       icon: '☣',  label: 'Ghost Hunter',    desc: 'Detected 3 malware threats',          condition: (p) => (p?.malwareDetected ?? 0) >= 3 },
    { id: 'expert',      icon: '⭐',  label: 'Cyber Expert',    desc: 'Reached Expert clearance level',      condition: (_, u) => (u?.level ?? 0) >= 4 },
    { id: 'centurion',   icon: '💯', label: 'Centurion',       desc: 'Scored 100+ total points',            condition: (_, u) => (u?.points ?? 0) >= 100 },
]

export default function ProfilePage() {
    const { user, token } = useAuth()
    const [progress, setProgress] = useState(null)
    const [loading,  setLoading]  = useState(true)
    const [error,    setError]    = useState('')

    useEffect(() => {
        if (user?.id) {
            progressApi.getProgress(user.id, token)
                .then(setProgress)
                .catch(e => setError(e.message))
                .finally(() => setLoading(false))
        } else { setLoading(false) }
    }, [user, token])

    const level     = user?.level  ?? 0
    const points    = user?.points ?? 0
    const lvlLabel  = getLevelLabel(level)
    const lvlColor  = getLevelColor(level)
    const xp        = getXpProgress(points)
    const initials  = ((user?.username || user?.email) ?? '?')[0].toUpperCase()

    const STATS = [
        { label: 'TOTAL POINTS',  value: points.toLocaleString(),              color: 'text-cyber-green'    },
        { label: 'CURRENT LEVEL', value: level,                                 color: 'text-cyber-cyan'     },
        { label: 'CASES SOLVED',  value: progress?.completedCases  ?? '—',     color: 'text-cyber-amber'    },
        { label: 'ACCURACY',      value: progress?.accuracy != null ? `${progress.accuracy}%` : '—', color: 'text-purple-400' },
    ]

    return (
        <div className="max-w-5xl mx-auto px-6 py-10 pb-20 animate-fade-in">

            {error && <Alert variant="danger" className="mb-6">{error}</Alert>}

            {/* Profile hero */}
            <Card className="mb-6 flex items-center gap-8">
                {/* Avatar */}
                <div className="w-20 h-20 shrink-0 rounded-2xl bg-cyber-green/10 border border-cyber-green/30 flex items-center justify-center font-display font-bold text-3xl text-cyber-green">
                    {initials}
                </div>

                {/* Info */}
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                        <h1 className="font-display font-bold text-2xl tracking-wide">
                            {user?.username || 'Anonymous'}
                        </h1>
                        <Badge variant={lvlColor.replace('text-cyber-', '').replace('text-', '') } as any>{lvlLabel}</Badge>
                    </div>
                    <p className="font-mono text-xs text-cyber-secondary mb-3">{user?.email}</p>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs text-cyber-muted">XP PROGRESS</span>
                        <span className="font-mono text-xs text-cyber-green">{xp}/100</span>
                    </div>
                    <ProgressBar value={xp} max={100} className="max-w-xs" />
                </div>

                {/* Role badge */}
                <div className="shrink-0 text-right">
                    <p className="font-mono text-[10px] text-cyber-muted mb-1">ROLE</p>
                    <Badge variant="cyan">{user?.role ?? 'USER'}</Badge>
                </div>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-3 mb-6">
                {STATS.map(({ label, value, color }) => (
                    <div key={label} className="bg-cyber-card border border-cyber-green/10 hover:border-cyber-green/35 rounded-xl p-5 transition-colors">
                        <p className="font-mono text-xs text-cyber-muted tracking-widest mb-1.5">{label}</p>
                        <p className={`font-display font-bold text-3xl ${color}`}>{loading ? '—' : value}</p>
                    </div>
                ))}
            </div>

            {/* Achievements */}
            <Card>
                <h2 className="font-display font-semibold text-sm tracking-widest text-cyber-secondary uppercase mb-5">
                    ACHIEVEMENTS
                </h2>
                <div className="grid grid-cols-3 gap-4">
                    {ACHIEVEMENTS.map(({ id, icon, label, desc, condition }) => {
                        const unlocked = condition(progress, user)
                        return (
                            <div
                                key={id}
                                className={`
                  flex items-start gap-3 p-4 rounded-xl border transition-all
                  ${unlocked
                                    ? 'border-cyber-green/30 bg-cyber-green/5'
                                    : 'border-cyber-muted/15 opacity-40 grayscale'}
                `}
                            >
                                <span className="text-2xl shrink-0">{icon}</span>
                                <div>
                                    <p className="font-display font-semibold text-sm text-white mb-0.5">{label}</p>
                                    <p className="font-mono text-[10px] text-cyber-secondary leading-relaxed">{desc}</p>
                                    {unlocked && (
                                        <span className="font-mono text-[10px] text-cyber-green mt-1 inline-block">✓ UNLOCKED</span>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </Card>

        </div>
    )
}