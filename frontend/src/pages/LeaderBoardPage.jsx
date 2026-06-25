import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { leaderboardApi } from '../services/api'
import { getLevelLabel, getLevelColor } from '../utils/levelUtils'
import { Trophy, Medal, Star, TrendingUp, Users } from 'lucide-react'

export default function LeaderboardPage() {
    const { user, token }   = useAuth()
    const [leaders, setLeaders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error,   setError]   = useState('')

    useEffect(() => {
        leaderboardApi.getTop(token)
            .then(setLeaders)
            .catch(e => setError(e.message))
            .finally(() => setLoading(false))
    }, [token])

    const myRank = leaders.findIndex(l => l.id === user?.id) + 1

    const MEDAL_COLORS = [
        'text-cyber-amber  border-cyber-amber/40  bg-cyber-amber/10',
        'text-cyber-secondary border-cyber-secondary/30 bg-cyber-secondary/5',
        'text-orange-400  border-orange-400/30  bg-orange-400/10',
    ]
    const MEDAL_ICONS = ['🥇', '🥈', '🥉']

    return (
        <div className="max-w-4xl mx-auto px-6 py-10 animate-fade-in">

            {/* Header */}
            <div className="mb-8">
                <p className="font-mono text-cyber-green text-sm mb-2 flex items-center gap-2">
                    <Users size={14} /> GLOBAL RANKINGS
                </p>
                <h1 className="font-display font-bold text-5xl mb-2" style={{ color: 'var(--text-primary)' }}>
                    🏆 <span className="text-gradient-green">Leaderboard</span>
                </h1>
                <p className="font-body text-lg" style={{ color: 'var(--text-secondary)' }}>
                    See how you compare against other cyber detectives!
                </p>
            </div>

            {/* My rank banner — shown when user is on the list */}
            {myRank > 0 && (
                <div className="bg-cyber-green/10 border-2 border-cyber-green/40 rounded-2xl p-5 mb-6 flex items-center justify-between animate-fade-in">
                    <div className="flex items-center gap-3">
                        <TrendingUp size={24} className="text-cyber-green" />
                        <div>
                            <p className="font-display font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
                                Your Current Rank
                            </p>
                            <p className="font-body text-sm" style={{ color: 'var(--text-secondary)' }}>
                                Keep solving challenges to climb higher!
                            </p>
                        </div>
                    </div>
                    <div className="text-center">
                        <p className="font-display font-bold text-5xl text-cyber-green glow-green">
                            #{myRank}
                        </p>
                        <p className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
                            of {leaders.length} players
                        </p>
                    </div>
                </div>
            )}

            {error && (
                <div className="bg-cyber-danger/10 border-2 border-cyber-danger/40 rounded-xl px-5 py-4 text-cyber-danger font-body text-sm mb-6">
                    ⚠ {error}
                </div>
            )}

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <Trophy size={48} className="text-cyber-amber animate-float" />
                    <span className="font-display text-cyber-green text-xl">
            Fetching Rankings<span className="animate-blink">...</span>
          </span>
                </div>
            ) : (
                <>
                    {/* Top 3 podium */}
                    {leaders.length >= 3 && (
                        <div className="grid grid-cols-3 gap-4 mb-8">
                            {[leaders[1], leaders[0], leaders[2]].map((u, i) => {
                                if (!u) return <div key={i} />
                                const podiumPos    = [2, 1, 3][i]
                                const podiumHeight = ['h-28', 'h-36', 'h-24'][i]
                                const colors       = [
                                    'border-cyber-secondary/30 bg-cyber-secondary/8',
                                    'border-cyber-amber/40 bg-cyber-amber/10',
                                    'border-orange-400/30 bg-orange-400/8',
                                ][i]
                                const isMe = u.id === user?.id
                                return (
                                    <div
                                        key={u.id}
                                        className={`
                      flex flex-col items-center justify-end rounded-2xl border-2 p-5
                      ${colors} ${podiumHeight} transition-all
                      ${isMe ? 'ring-2 ring-cyber-green ring-offset-2 ring-offset-transparent' : ''}
                    `}
                                    >
                                        <span className="text-3xl mb-1">{MEDAL_ICONS[podiumPos - 1]}</span>
                                        <p className="font-display font-bold text-base text-white truncate max-w-full">
                                            {u.username || u.email}
                                            {isMe && <span className="ml-1 text-cyber-green text-xs">★</span>}
                                        </p>
                                        <p className="font-mono text-sm text-cyber-green font-bold">
                                            {u.points?.toLocaleString()} pts
                                        </p>
                                        <p className="font-mono text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
                                            #{podiumPos}
                                        </p>
                                    </div>
                                )
                            })}
                        </div>
                    )}

                    {/* Full table */}
                    <div className="bg-cyber-card border-2 border-cyber-green/15 rounded-2xl overflow-hidden">

                        {/* Table header */}
                        <div className="grid grid-cols-[3.5rem_1fr_9rem_8rem_8rem] gap-4 px-6 py-4 border-b-2 border-cyber-green/10"
                             style={{ background: 'var(--bg-main)' }}>
                            {['RANK', 'OPERATIVE', 'LEVEL', 'POINTS', 'STATUS'].map(h => (
                                <span key={h} className="font-mono text-xs tracking-widest" style={{ color: 'var(--text-muted)' }}>
                  {h}
                </span>
                            ))}
                        </div>

                        {leaders.length === 0 ? (
                            <div className="py-16 text-center">
                                <Users size={48} className="mx-auto mb-4" style={{ color: 'var(--text-muted)' }} />
                                <p className="font-display font-bold text-xl mb-2" style={{ color: 'var(--text-secondary)' }}>
                                    No players yet!
                                </p>
                                <p className="font-body text-sm" style={{ color: 'var(--text-muted)' }}>
                                    Be the first to complete challenges and claim the top spot!
                                </p>
                            </div>
                        ) : (
                            leaders.map((u, idx) => {
                                const isMe     = u.id === user?.id
                                const lvlLabel = getLevelLabel(u.level ?? 0)
                                const lvlColor = getLevelColor(u.level ?? 0)
                                const rankStyle = idx < 3
                                    ? MEDAL_COLORS[idx]
                                    : 'text-cyber-muted border-cyber-muted/20 bg-transparent'

                                return (
                                    <div
                                        key={u.id}
                                        className={`
                      grid grid-cols-[3.5rem_1fr_9rem_8rem_8rem] gap-4 px-6 py-5
                      border-b border-cyber-green/8 last:border-0 transition-colors
                      ${isMe
                                            ? 'bg-cyber-green/8 border-l-4 border-l-cyber-green'
                                            : 'hover:bg-white/2'}
                    `}
                                    >
                                        {/* Rank */}
                                        <div className={`flex items-center justify-center w-9 h-9 rounded-xl border-2 font-mono text-sm font-bold ${rankStyle}`}>
                                            {idx < 3 ? MEDAL_ICONS[idx] : idx + 1}
                                        </div>

                                        {/* Name */}
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="w-9 h-9 rounded-xl bg-cyber-green/15 border border-cyber-green/30 flex items-center justify-center font-display font-bold text-cyber-green text-sm shrink-0">
                                                {(u.username || u.email || '?')[0].toUpperCase()}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-body text-base truncate" style={{ color: 'var(--text-primary)' }}>
                                                    {u.username || u.email}
                                                </p>
                                                {isMe && (
                                                    <span className="font-mono text-xs text-cyber-green border border-cyber-green/30 rounded px-1.5">
                            YOU
                          </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Level */}
                                        <span className={`font-mono text-sm self-center ${lvlColor}`}>
                      {lvlLabel}
                    </span>

                                        {/* Points */}
                                        <div className="flex items-center gap-1.5 self-center">
                                            <Star size={13} className="text-cyber-amber shrink-0" />
                                            <span className="font-mono text-base text-cyber-green font-bold">
                        {u.points?.toLocaleString()}
                      </span>
                                        </div>

                                        {/* Status */}
                                        <div className="flex items-center gap-2 self-center">
                                            <span className={`w-2 h-2 rounded-full shrink-0 ${isMe ? 'bg-cyber-green shadow-[0_0_6px_rgba(0,230,118,0.8)] animate-pulse' : 'bg-cyber-muted'}`} />
                                            <span className="font-mono text-xs" style={{ color: isMe ? 'var(--text-primary)' : 'var(--text-primary)' }}>
                        {isMe ? 'ONLINE' : 'OFFLINE'}
                      </span>
                                        </div>

                                    </div>
                                )
                            })
                        )}
                    </div>

                    {/* Bottom tip */}
                    <div className="mt-6 bg-cyber-panel border-2 border-cyber-amber/25 rounded-2xl p-5 flex items-center gap-4">
                        <Trophy size={32} className="text-cyber-amber shrink-0 animate-float" />
                        <div>
                            <p className="font-display font-bold text-base" style={{ color: 'var(--text-primary)' }}>
                                How to climb the ranks
                            </p>
                            <p className="font-body text-sm" style={{ color: 'var(--text-secondary)' }}>
                                Complete challenges and missions to earn points. Every correct answer = 10 pts.
                                Missions give bonus points for each step completed!
                            </p>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}