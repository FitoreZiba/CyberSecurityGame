import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { progressApi } from '../services/api'
import { getLevelLabel, getLevelColor, getXpProgress } from '../utils/levelUtils'
import {
    Star, BarChart2, CheckSquare, Crosshair,
    Mail, KeyRound, Bug, Globe, Zap, Target, HatGlasses
} from 'lucide-react'

const CATEGORIES = [
    {
        id: 1,
        Icon: Mail,
        name: 'Spot the Phishing',
        desc: 'Can you spot the fake email?',
        diff: 'EASY',
        accent: 'text-cyber-amber',
        border: 'border-cyber-amber/40',
    },
    {
        id: 2,
        Icon: KeyRound,
        name: 'Password Power',
        desc: 'Build the strongest password!',
        diff: 'EASY',
        accent: 'text-cyber-green',
        border: 'border-cyber-green/40',
    },
    {
        id: 3,
        Icon: Bug,
        name: 'Malware Hunter',
        desc: 'Detect the dangerous files!',
        diff: 'MEDIUM',
        accent: 'text-cyber-cyan',
        border: 'border-cyber-cyan/40',
    },
    {
        id: 4,
        Icon: Globe,
        name: 'Fake Site Detective',
        desc: 'Is this website real or fake?',
        diff: 'HARD',
        accent: 'text-cyber-purple',
        border: 'border-cyber-purple/40',
    },
]

const DIFF_STYLES = {
    EASY:   'bg-cyber-green/20  text-cyber-green  border-cyber-green/40',
    MEDIUM: 'bg-cyber-amber/20  text-cyber-amber  border-cyber-amber/40',
    HARD:   'bg-cyber-danger/20 text-cyber-danger border-cyber-danger/40',
}

export default function Dashboard() {
    const { user, token, updateUser } = useAuth()
    const [progress,    setProgress]    = useState(null)
    const [loadingProg, setLoadingProg] = useState(true)

    useEffect(() => {
        if (!user?.id) { setLoadingProg(false); return }

        setLoadingProg(true)
        progressApi.getProgress(user.id, token)
            .then(data => {
                setProgress(data)
                if (data.totalPoints !== user.points || data.level !== user.level) {
                    updateUser({ ...user, points: data.totalPoints, level: data.level })
                }
            })
            .catch(() => {})
            .finally(() => setLoadingProg(false))

    }, [user?.id, user?.points, user?.level])

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
                        <p className="font-mono text-cyber-green text-sm mb-2 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-cyber-green animate-pulse inline-block" />
                            AGENT STATUS: ONLINE
                        </p>
                        <h1 className="font-display font-bold text-5xl mb-2" style={{ color: 'var(--text-primary)' }}>
                            Hey,{' '}
                            <span className="text-gradient-green glow-green">
                {user?.username || 'Agent'}!
              </span>
                        </h1>
                        <p className="font-body text-lg" style={{ color: 'var(--text-secondary)' }}>
                            Ready to solve some cyber mysteries? Let's go!
                        </p>
                    </div>

                    <div className="border-2 border-cyber-green/30 rounded-2xl px-8 py-5 text-center"
                         style={{ background: 'var(--bg-main)' }}>
                        <p className="font-mono text-xs tracking-widest mb-1" style={{ color: 'var(--text-muted)' }}>
                            RANK
                        </p>
                        <p className="font-display font-bold text-3xl text-cyber-green glow-green">
                            {lvlLabel}
                        </p>
                        <p className="font-mono text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                            Level {level}
                        </p>
                    </div>
                </div>

                {/* XP bar */}
                <div className="relative mt-6">
                    <div className="flex justify-between mb-2">
            <span className="font-body text-sm flex items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}>
              <Zap size={14} className="text-cyber-green" />
              XP Progress to Next Level
            </span>
                        <span className="font-mono text-sm text-cyber-green font-bold">{xp} / 100 XP</span>
                    </div>
                    <div className="h-4 rounded-full overflow-hidden border border-cyber-green/20"
                         style={{ background: 'var(--bg-main)' }}>
                        <div
                            className="h-full bg-gradient-to-r from-cyber-green to-cyber-cyan rounded-full transition-all duration-700 shadow-[0_0_12px_rgba(0,230,118,0.6)]"
                            style={{ width: `${xp}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mb-8">

                <div className="bg-cyber-card border-2 border-cyber-amber/20 hover:border-cyber-amber/50 rounded-2xl p-6 text-center hover:scale-105 transition-all duration-200">
                    <Star size={28} className="text-cyber-amber mx-auto mb-2" />
                    <p className="font-display font-bold text-4xl text-cyber-amber mb-1">
                        {points.toLocaleString()}
                    </p>
                    <p className="font-body text-sm" style={{ color: 'var(--text-secondary)' }}>Total Points</p>
                </div>

                <div className="bg-cyber-card border-2 border-cyber-cyan/20 hover:border-cyber-cyan/50 rounded-2xl p-6 text-center hover:scale-105 transition-all duration-200">
                    <BarChart2 size={28} className="text-cyber-cyan mx-auto mb-2" />
                    <p className="font-display font-bold text-4xl text-cyber-cyan mb-1">{level}</p>
                    <p className="font-body text-sm" style={{ color: 'var(--text-secondary)' }}>Your Level</p>
                </div>

                <div className="bg-cyber-card border-2 border-cyber-green/20 hover:border-cyber-green/50 rounded-2xl p-6 text-center hover:scale-105 transition-all duration-200">
                    <CheckSquare size={28} className="text-cyber-green mx-auto mb-2" />
                    <p className="font-display font-bold text-4xl text-cyber-green mb-1">
                        {loadingProg ? '...' : (progress?.completedCases ?? 0)}
                    </p>
                    <p className="font-body text-sm" style={{ color: 'var(--text-secondary)' }}>Cases Solved</p>
                </div>

                <div className="bg-cyber-card border-2 border-purple-400/20 hover:border-purple-400/50 rounded-2xl p-6 text-center hover:scale-105 transition-all duration-200">
                    <Crosshair size={28} className="text-purple-400 mx-auto mb-2" />
                    <p className="font-display font-bold text-4xl text-purple-400 mb-1">
                        {loadingProg ? '...' : `${progress?.accuracy ?? 0}%`}
                    </p>
                    <p className="font-body text-sm" style={{ color: 'var(--text-secondary)' }}>Accuracy</p>
                </div>

            </div>

            {/* Categories */}
            <h2 className="font-display font-bold text-2xl mb-5" style={{ color: 'var(--text-primary)' }}>
                Choose Your Challenge
            </h2>

            <div className="grid grid-cols-2 gap-5 mb-8">
                {CATEGORIES.map((cat, i) => {
                    const CatIcon = cat.Icon
                    return (
                        <Link
                            key={cat.id}
                            to={`/game/${cat.id}`}
                            className={`
                flex items-center gap-5 bg-cyber-card border-2 ${cat.border}
                hover:scale-[1.02] rounded-2xl p-6 no-underline
                transition-all duration-200 animate-fade-in
              `}
                            style={{ color: 'var(--text-primary)', animationDelay: `${i * 0.1}s` }}
                        >
                            <div
                                className="w-16 h-16 flex items-center justify-center rounded-2xl border border-white/10 shrink-0"
                                style={{ background: 'var(--bg-main)' }}
                            >
                                <CatIcon size={30} className={cat.accent} />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-1">
                                    <h3 className="font-display font-bold text-xl">{cat.name}</h3>
                                    <span className={`font-mono text-xs px-2 py-0.5 rounded-lg border  pt-1 ${DIFF_STYLES[cat.diff]}`}>
                    {cat.diff}
                  </span>
                                </div>
                                <p className="font-body text-sm" style={{ color: 'var(--text-secondary)' }}>
                                    {cat.desc}
                                </p>
                            </div>
                        </Link>
                    )
                })}
            </div>

            {/* Mission */}
            <div className="bg-cyber-panel border-2 border-cyber-cyan/30 rounded-2xl p-8 flex items-center justify-between gap-6 card-glow-cyan">
                <div>
                    <h3 className="font-display font-bold text-2xl mb-2" style={{ color: 'var(--text-primary)' }}>
                       <span className="text-gradient-cyber glow-cyan flex flex-row"> <HatGlasses size={25} color="cyan" className="mr-3"/> Secret Missions Await!</span>
                    </h3>
                    <p className="font-body text-base" style={{ color: 'var(--text-secondary)' }}>
                        Take on full cyber case investigations. Solve each clue to crack the case and earn bonus XP!
                    </p>
                </div>
                <Link
                    to="/missions"
                    className="shrink-0 px-8 py-4 font-display font-bold text-base tracking-widest uppercase bg-cyber-cyan text-[color:var(--text-mission)] rounded-xl hover:shadow-[0_0_28px_rgba(24,255,255,0.5)] transition-all no-underline whitespace-nowrap flex items-center gap-2">
                    <Target size={18} />
                    START MISSION
                </Link>
            </div>

        </div>
    )

}