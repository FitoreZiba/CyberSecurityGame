import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { leaderboardApi } from '../services/api'
import { getLevelLabel, getLevelColor } from '../utils/levelUtils'
import Alert from '../components/ui/Alert'

const MEDALS = ['🥇', '🥈', '🥉']
const RANK_COLORS = [
    'text-cyber-amber border-cyber-amber/40 bg-cyber-amber/5',
    'text-cyber-secondary border-cyber-secondary/30 bg-cyber-secondary/5',
    'text-orange-400 border-orange-400/30 bg-orange-400/5',
]

export default function LeaderBoardPage() {
    const { user, token } = useAuth()
    const [leaders, setLeaders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error,   setError]   = useState('')

    useEffect(() => {
        leaderboardApi.getTop(token)
            .then(setLeaders)
            .catch(e => setError(e.message))
            .finally(() => setLoading(false))
    }, [token])

    return (
        <div className="max-w-4xl mx-auto px-6 py-10 animate-fade-in">

            <div className="mb-8">
                <p className="font-mono text-xs text-cyber-secondary mb-1.5">// GLOBAL RANKINGS</p>
                <h1 className="font-display font-bold text-3xl tracking-wide">LEADERBOARD</h1>
            </div>

            {error && <Alert variant="danger" className="mb-6">{error}</Alert>}

            {loading ? (
                <div className="flex items-center justify-center py-20">
          <span className="font-mono text-cyber-green text-sm">
            FETCHING RANKINGS<span className="animate-blink">_</span>
          </span>
                </div>
            ) : (
                <>
                    {/* Top 3 podium */}
                    {leaders.length >= 3 && (
                        <div className="grid grid-cols-3 gap-4 mb-8">
                            {[leaders[1], leaders[0], leaders[2]].map((u, i) => {
                                if (!u) return <div key={i} />
                                const podiumOrder = [2, 1, 3]
                                const podiumPos   = podiumOrder[i]
                                const heights     = ['h-24', 'h-32', 'h-20']
                                const colors      = ['bg-cyber-secondary/10 border-cyber-secondary/20', 'bg-cyber-amber/10 border-cyber-amber/30', 'bg-orange-400/10 border-orange-400/20']
                                return (
                                    <div key={u.id} className={`flex flex-col items-center justify-end rounded-xl border p-4 ${colors[i]} ${heights[i]} transition-all`}>
                                        <span className="text-2xl mb-1">{MEDALS[podiumPos - 1]}</span>
                                        <p className="font-display font-semibold text-sm text-white tracking-wide truncate max-w-full">{u.username || u.email}</p>
                                        <p className="font-mono text-xs text-cyber-green">{u.points?.toLocaleString()} pts</p>
                                        <p className="font-mono text-[10px] text-cyber-muted">#{podiumPos}</p>
                                    </div>
                                )
                            })}
                        </div>
                    )}

                    {/* Full table */}
                    <div className="bg-cyber-card border border-cyber-green/10 rounded-xl overflow-hidden">
                        {/* Table header */}
                        <div className="grid grid-cols-[3rem_1fr_8rem_7rem_7rem] gap-4 px-6 py-3 border-b border-cyber-green/10 bg-black/20">
                            {['RANK', 'OPERATIVE', 'LEVEL', 'POINTS', 'STATUS'].map(h => (
                                <span key={h} className="font-mono text-[10px] text-cyber-muted tracking-widest">{h}</span>
                            ))}
                        </div>

                        {leaders.map((u, idx) => {
                            const isMe    = u.id === user?.id
                            const lvlLabel = getLevelLabel(u.level ?? 0)
                            const lvlColor = getLevelColor(u.level ?? 0)
                            const rankStyle = idx < 3 ? RANK_COLORS[idx] : 'text-cyber-muted border-cyber-muted/20'
                            return (
                                <div
                                    key={u.id}
                                    className={`
                    grid grid-cols-[3rem_1fr_8rem_7rem_7rem] gap-4 px-6 py-4
                    border-b border-cyber-green/5 last:border-0 transition-colors
                    ${isMe ? 'bg-cyber-green/5' : 'hover:bg-white/2'}
                  `}
                                >
                                    <div className={`flex items-center justify-center w-8 h-8 rounded border font-mono text-xs font-bold ${rankStyle}`}>
                                        {idx < 3 ? MEDALS[idx] : idx + 1}
                                    </div>
                                    <div className="flex items-center gap-2 min-w-0">
                                        <div className="w-8 h-8 rounded-lg bg-cyber-green/10 flex items-center justify-center font-display font-bold text-cyber-green text-xs shrink-0">
                                            {(u.username || u.email || '?')[0].toUpperCase()}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="font-body text-sm text-white truncate">
                                                {u.username || u.email}
                                                {isMe && <span className="ml-2 font-mono text-[10px] text-cyber-green border border-cyber-green/30 rounded px-1">YOU</span>}
                                            </p>
                                        </div>
                                    </div>
                                    <span className={`font-mono text-xs self-center ${lvlColor}`}>{lvlLabel}</span>
                                    <span className="font-mono text-sm text-cyber-green self-center">{u.points?.toLocaleString()}</span>
                                    <span className="font-mono text-[10px] text-cyber-secondary self-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyber-green inline-block mr-1.5 shadow-[0_0_4px_rgba(0,255,136,0.8)]" />
                    ONLINE
                  </span>
                                </div>
                            )
                        })}
                    </div>
                </>
            )}
        </div>
    )
}