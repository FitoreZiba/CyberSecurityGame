import { useEffect, useState } from 'react'
import {
    Target,
    Eye,
    Lock,
    ShieldAlert,
    Star,
    Trophy,
    User,
    Mail,
    Zap,
    Shield,
} from 'lucide-react'

import { useAuth } from '../context/AuthContext'
import { progressApi } from '../services/api'
import { getLevelLabel, getLevelColor, getXpProgress } from '../utils/levelUtils'

import ProgressBar from '../components/ui/ProgressBar'
import Badge from '../components/ui/Badge'
import Alert from '../components/ui/Alert'
import Card from '../components/ui/Card'

const ACHIEVEMENTS = [
    {
        id: 'first_blood',
        icon: Target,
        label: 'First Case',
        desc: 'Completed your first challenge',
        condition: (p) => (p?.completedCases ?? 0) >= 1,
        color: 'text-cyber-amber',
    },
    {
        id: 'sharp_eye',
        icon: Eye,
        label: 'Sharp Eye',
        desc: 'Spotted 5 phishing emails',
        condition: (p) => (p?.phishingCaught ?? 0) >= 5,
        color: 'text-cyber-cyan',
    },
    {
        id: 'locksmith',
        icon: Lock,
        label: 'Locksmith',
        desc: 'Aced the password challenge',
        condition: (p) => (p?.passwordScore ?? 0) >= 10,
        color: 'text-cyber-green',
    },
    {
        id: 'ghost',
        icon: ShieldAlert,
        label: 'Ghost Hunter',
        desc: 'Detected 3 malware threats',
        condition: (p) => (p?.malwareDetected ?? 0) >= 3,
        color: 'text-cyber-danger',
    },
    {
        id: 'expert',
        icon: Star,
        label: 'Cyber Expert',
        desc: 'Reached Expert clearance level',
        condition: (_, u) => (u?.level ?? 0) >= 4,
        color: 'text-purple-400',
    },
    {
        id: 'centurion',
        icon: Trophy,
        label: 'Centurion',
        desc: 'Scored 100+ total points',
        condition: (_, u) => (u?.points ?? 0) >= 100,
        color: 'text-cyber-amber',
    },
]

export default function ProfilePage() {
    const { user, token } = useAuth()

    const [progress, setProgress] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        if (user?.id) {
            progressApi.getProgress(user.id, token)
                .then(setProgress)
                .catch(e => setError(e.message))
                .finally(() => setLoading(false))
        } else {
            setLoading(false)
        }
    }, [user, token])

    const level = user?.level ?? 0
    const points = user?.points ?? 0

    const lvlLabel = getLevelLabel(level)
    const lvlColor = getLevelColor(level)

    const xp = getXpProgress(points)

    const STATS = [
        {
            label: 'TOTAL POINTS',
            value: points.toLocaleString(),
            color: 'text-cyber-green',
        },
        {
            label: 'CURRENT LEVEL',
            value: level,
            color: 'text-cyber-cyan',
        },
        {
            label: 'CASES SOLVED',
            value: progress?.completedCases ?? '—',
            color: 'text-cyber-amber',
        },
        {
            label: 'ACCURACY',
            value:
                progress?.accuracy != null
                    ? `${progress.accuracy}%`
                    : '—',
            color: 'text-purple-400',
        },
    ]

    return (
        <div className="max-w-5xl mx-auto px-6 py-10 pb-20 animate-fade-in">

            {error && (
                <Alert variant="danger" className="mb-6">
                    {error}
                </Alert>
            )}

            {/* HERO */}
            <Card className="mb-6 overflow-hidden relative">

                {/* subtle glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyber-green/5 via-transparent to-cyber-cyan/5 pointer-events-none" />

                <div className="relative flex flex-col md:flex-row md:items-center gap-8">

                    {/* Avatar */}
                    <div className="
                        w-24 h-24 shrink-0 rounded-3xl
                        bg-gradient-to-br from-cyber-green/15 to-cyber-cyan/15
                        border border-cyber-green/25
                        flex items-center justify-center
                        shadow-[0_0_40px_rgba(0,230,118,0.12)]
                    ">
                        <Shield className="w-11 h-11 text-cyber-green" />
                    </div>

                    {/* User info */}
                    <div className="flex-1 min-w-0">

                        <div className="flex flex-wrap items-center gap-3 mb-2">
                            <h1 className="
                                font-display font-bold text-3xl tracking-wide
                                text-[color:var(--text-primary)]
                            ">
                                {user?.username || 'Anonymous'}
                            </h1>

                            <Badge
                                variant={
                                    lvlColor
                                        .replace('text-cyber-', '')
                                        .replace('text-', '')
                                }
                            >
                                {lvlLabel}
                            </Badge>
                        </div>

                        <div className="flex items-center gap-2 text-cyber-secondary mb-5">
                            <Mail className="w-4 h-4" />
                            <p className="font-mono text-xs break-all">
                                {user?.email}
                            </p>
                        </div>

                        {/* XP */}
                        <div className="flex items-center gap-2 mb-2">
                            <Zap className="w-4 h-4 text-cyber-green" />

                            <span className="font-mono text-xs text-cyber-muted tracking-widest">
                                XP PROGRESS
                            </span>

                            <span className="font-mono text-xs text-cyber-green">
                                {xp}/100
                            </span>
                        </div>

                        <ProgressBar
                            value={xp}
                            max={100}
                            className="max-w-md"
                        />
                    </div>

                    {/* Role */}
                    <div className="shrink-0 md:text-right">
                        <p className="font-mono text-[10px] text-cyber-muted mb-1 tracking-widest">
                            ROLE
                        </p>

                        <Badge variant="cyan">
                            {user?.role ?? 'USER'}
                        </Badge>
                    </div>

                </div>
            </Card>

            {/* STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

                {STATS.map(({ label, value, color }) => (
                    <div
                        key={label}
                        className="
                            bg-cyber-card
                            border border-cyber-green/10
                            hover:border-cyber-green/35
                            rounded-2xl
                            p-5
                            transition-all duration-200
                            hover:-translate-y-1
                        "
                    >
                        <p className="
                            font-mono text-xs tracking-[0.2em]
                            text-cyber-muted mb-2
                        ">
                            {label}
                        </p>

                        <p className={`
                            font-display font-bold text-4xl
                            ${color}
                        `}>
                            {loading ? '—' : value}
                        </p>
                    </div>
                ))}

            </div>

            {/* ACHIEVEMENTS */}
            <Card>

                <div className="flex items-center gap-2 mb-6">
                    <Trophy className="w-5 h-5 text-cyber-amber" />

                    <h2 className="
                        font-display font-semibold text-sm
                        tracking-[0.25em]
                        text-cyber-secondary
                        uppercase
                    ">
                        Achievements
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

                    {ACHIEVEMENTS.map(({
                                           id,
                                           icon: Icon,
                                           label,
                                           desc,
                                           condition,
                                           color,
                                       }) => {

                        const unlocked = condition(progress, user)

                        return (
                            <div
                                key={id}
                                className={`
                                    group relative overflow-hidden
                                    flex items-start gap-4
                                    p-5 rounded-2xl border
                                    transition-all duration-300

                                    ${
                                    unlocked
                                        ? `
                                                border-cyber-green/25
                                                bg-cyber-green/10
                                                hover:border-cyber-green/50
                                                hover:shadow-[0_0_30px_rgba(0,230,118,0.08)]
                                              `
                                        : `
                                                border-cyber-green
                                                opacity-50 grayscale
                                              `
                                }
                                `}
                            >

                                {/* icon */}
                                <div
                                    className={`
                                        shrink-0 w-12 h-12 rounded-2xl
                                        flex items-center justify-center
                                        border transition-all

                                        ${
                                        unlocked
                                            ? 'bg-cyber-green/30 border-cyber-green/35'
                                            : 'bg-black/10 border-white/10 '
                                    }
                                    `}
                                >
                                    <Icon className={`w-5 h-5 ${color}`} />
                                </div>

                                {/* text */}
                                <div className="min-w-0">

                                    <p className="
                                        font-display font-semibold text-base
                                        text-[color:var(--text-primary)] mb-1">
                                        {label}
                                    </p>

                                    <p className="
                                        font-mono text-[11px]
                                        text-[color:var(--text-primary)]
                                        leading-relaxed
                                    ">
                                        {desc}
                                    </p>

                                    {unlocked && (
                                        <span className="
                                            mt-3 inline-flex items-center gap-1
                                            font-mono text-[10px]
                                            text-cyber-green
                                            tracking-widest
                                        ">
                                            ✓ UNLOCKED
                                        </span>
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