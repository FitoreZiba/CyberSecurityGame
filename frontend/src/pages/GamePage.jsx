import { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { gameApi } from '../services/api'
import {
    CheckCircle, XCircle, ChevronRight,
    RefreshCw, Trophy, Zap, Target, Shield, Swords
} from 'lucide-react'

const CATEGORY_META = {
    1: { name: 'Spot the Phishing',  icon: '✉️', color: '#ffd740', glow: 'rgba(255,215,64,0.4)'  },
    2: { name: 'Password Power',     icon: '🔐', color: '#00e676', glow: 'rgba(0,230,118,0.4)'   },
    3: { name: 'Malware Hunter',     icon: '🦠', color: '#18ffff', glow: 'rgba(24,255,255,0.4)'  },
    4: { name: 'Fake Site Detective',icon: '🌐', color: '#e040fb', glow: 'rgba(224,64,251,0.4)'  },
}

const CORRECT_MSGS = [
    '🎉 Excellent work, Agent!',
    '⭐ Perfect answer!',
    '🚀 Outstanding!',
    '🏆 You nailed it!',
    '💥 Cyber genius move!',
]
const WRONG_MSGS = [
    '💡 Good try — learn from this!',
    '📚 Read the tip below!',
    '🔍 Check the explanation!',
    '💪 Keep going, Agent!',
]

export default function GamePage() {
    const { id }          = useParams()
    const { user, token, updateUser } = useAuth()
    const navigate        = useNavigate()

    const [questions,  setQuestions]  = useState([])
    const [current,    setCurrent]    = useState(0)
    const [selected,   setSelected]   = useState(null)
    const [result,     setResult]     = useState(null)
    const [loading,    setLoading]    = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [error,      setError]      = useState('')
    const [score,      setScore]      = useState(0)
    const [finished,   setFinished]   = useState(false)
    const [msg,        setMsg]        = useState('')
    const [showPoints, setShowPoints] = useState(false)

    const meta = CATEGORY_META[id] ?? { name: 'Challenge', icon: '🎯', color: '#00e676', glow: 'rgba(0,230,118,0.4)' }

    useEffect(() => {
        gameApi.getQuestions(id, token)
            .then(q => { setQuestions(q); setLoading(false) })
            .catch(e => { setError(e.message); setLoading(false) })
    }, [id, token])

    const q = questions[current]

    const submit = useCallback(async (option) => {
        if (selected || submitting) return
        setSelected(option)
        setSubmitting(true)
        try {
            const res = await gameApi.submitAnswer(
                { userId: user?.id, questionId: q?.id, selectedAnswer: option },
                token
            )
            setResult(res)
            if (res.correct) {
                setScore(s => s + 10)
                setMsg(CORRECT_MSGS[Math.floor(Math.random() * CORRECT_MSGS.length)])
                setShowPoints(true)
                setTimeout(() => setShowPoints(false), 1500)

                // ── Sync points AND level from backend response ──
                updateUser({
                    ...user,
                    points: res.newPoints ?? (user?.points ?? 0) + 10,
                    level:  res.newLevel  ?? user?.level ?? 0,
                })
            } else {
                setMsg(WRONG_MSGS[Math.floor(Math.random() * WRONG_MSGS.length)])
            }
        } catch (e) {
            setError(e.message)
        } finally {
            setSubmitting(false)
        }
    }, [selected, submitting, q, user, token, updateUser])

    const next = () => {
        if (current + 1 >= questions.length) { setFinished(true); return }
        setCurrent(c => c + 1)
        setSelected(null)
        setResult(null)
        setMsg('')
    }

    const restart = () => {
        setCurrent(0); setSelected(null); setResult(null)
        setScore(0); setFinished(false); setMsg('')
    }

    if (loading) return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center gap-5">
            <div className="text-7xl animate-float">{meta.icon}</div>
            <p className="font-display font-bold text-2xl" style={{ color: meta.color }}>
                Loading Mission<span className="animate-blink">...</span>
            </p>
        </div>
    )

    if (error) return (
        <div className="max-w-xl mx-auto px-6 py-20 text-center">
            <div className="text-6xl mb-4">😕</div>
            <p className="font-display text-2xl text-cyber-danger">{error}</p>
        </div>
    )

    /* ── Finished screen ── */
    if (finished) {
        const total = questions.length * 10
        const pct   = Math.round((score / total) * 100)
        const grade = pct >= 90 ? { label: 'S RANK', color: '#ffd740', icon: '👑' }
            : pct >= 70 ? { label: 'A RANK', color: '#00e676', icon: '🏆' }
                : pct >= 50 ? { label: 'B RANK', color: '#18ffff', icon: '🌟' }
                    :              { label: 'C RANK', color: '#e040fb', icon: '💪' }
        return (
            <div className="max-w-lg mx-auto px-6 py-16 text-center animate-fade-in">

                <div className="text-8xl mb-6 animate-float">{grade.icon}</div>

                <div
                    className="inline-block font-display font-black text-5xl tracking-widest mb-2 px-6 py-2 rounded-xl mb-6"
                    style={{
                        color: grade.color,
                        background: `${grade.color}15`,
                        border: `2px solid ${grade.color}40`,
                        boxShadow: `0 0 30px ${grade.color}40`,
                        textShadow: `0 0 20px ${grade.color}`,
                    }}
                >
                    {grade.label}
                </div>

                <h2 className="font-display font-black text-4xl mb-2" style={{ color: 'var(--text-primary)' }}>
                    Mission Complete!
                </h2>
                <p className="font-body text-lg mb-8" style={{ color: 'var(--text-secondary)' }}>
                    You scored {pct}% — {pct >= 70 ? 'Outstanding work, Agent!' : 'Keep training to improve!'}
                </p>

                {/* Score display */}
                <div
                    className="rounded-2xl p-8 mb-4 relative overflow-hidden"
                    style={{
                        background: 'var(--bg-card)',
                        border: `1px solid ${grade.color}30`,
                        boxShadow: `0 0 40px ${grade.color}15`,
                    }}
                >
                    <p className="font-mono text-xs tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>
                        FINAL SCORE
                    </p>
                    <p
                        className="font-display font-black text-7xl animate-count-up"
                        style={{ color: grade.color, textShadow: `0 0 30px ${grade.color}` }}
                    >
                        {score}
                    </p>
                    <p className="font-mono text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                        out of {total} points
                    </p>

                    {/* Progress bar */}
                    <div className="mt-4 h-3 rounded-full overflow-hidden" style={{ background: 'var(--bg-main)' }}>
                        <div
                            className="h-full rounded-full transition-all duration-1000"
                            style={{
                                width: `${pct}%`,
                                background: `linear-gradient(90deg, ${grade.color}, #18ffff)`,
                                boxShadow: `0 0 10px ${grade.color}`,
                            }}
                        />
                    </div>
                </div>

                <div className="flex gap-3 justify-center mt-6">
                    <button
                        onClick={restart}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl font-display font-bold text-sm tracking-widest uppercase transition-all"
                        style={{
                            background: 'linear-gradient(135deg, #00e676, #00b248)',
                            color: '#060d18',
                            boxShadow: '0 0 20px rgba(0,230,118,0.4)',
                        }}
                    >
                        <RefreshCw size={16} /> TRY AGAIN
                    </button>
                    <button
                        onClick={() => navigate('/categories')}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl font-display font-bold text-sm tracking-widest uppercase border-2 transition-all"
                        style={{ borderColor: '#18ffff', color: '#18ffff' }}
                    >
                        <Swords size={16} /> MORE CHALLENGES
                    </button>
                </div>
            </div>
        )
    }

    /* ── Active game ── */
    const progressPct = ((current + (selected ? 1 : 0)) / questions.length) * 100

    return (
        <div className="max-w-3xl mx-auto px-6 py-8 animate-fade-in">

            {/* +10 floating points animation */}
            {showPoints && (
                <div
                    className="fixed top-24 right-8 font-display font-black text-3xl animate-count-up pointer-events-none"
                    style={{ color: '#00e676', textShadow: '0 0 20px rgba(0,230,118,0.8)', zIndex: 9999 }}
                >
                    +10 XP
                </div>
            )}

            {/* HUD header */}
            <div
                className="rounded-2xl p-5 mb-6 flex items-center justify-between"
                style={{ background: 'var(--bg-panel)', border: '1px solid var(--border-dim)' }}
            >
                <div className="flex items-center gap-4">
                    <div
                        className="w-14 h-14 flex items-center justify-center rounded-xl text-3xl"
                        style={{ background: `${meta.color}15`, border: `1px solid ${meta.color}30` }}
                    >
                        {meta.icon}
                    </div>
                    <div>
                        <p className="font-mono text-xs tracking-widest mb-1" style={{ color: 'var(--text-muted)' }}>
                            ACTIVE CHALLENGE
                        </p>
                        <p className="font-display font-bold text-xl" style={{ color: 'var(--text-primary)' }}>
                            {meta.name}
                        </p>
                    </div>
                </div>

                {/* Score & question counter */}
                <div className="flex items-center gap-4">
                    <div className="text-center">
                        <p className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>QUESTION</p>
                        <p className="font-display font-black text-2xl" style={{ color: meta.color }}>
                            {current + 1}<span className="text-sm font-normal" style={{ color: 'var(--text-muted)' }}>/{questions.length}</span>
                        </p>
                    </div>
                    <div className="text-center">
                        <p className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>SCORE</p>
                        <div className="flex items-center gap-1">
                            <Zap size={14} className="text-cyber-amber" />
                            <p className="font-display font-black text-2xl text-cyber-amber">{score}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Progress bar */}
            <div className="h-2.5 rounded-full overflow-hidden mb-6" style={{ background: 'var(--bg-card)' }}>
                <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                        width: `${progressPct}%`,
                        background: `linear-gradient(90deg, ${meta.color}, #18ffff)`,
                        boxShadow: `0 0 10px ${meta.glow}`,
                    }}
                />
            </div>

            {/* Question card */}
            <div
                className="rounded-2xl p-8 mb-5"
                style={{
                    background: 'var(--bg-card)',
                    border: `1px solid ${meta.color}25`,
                    boxShadow: `0 0 40px ${meta.glow}08`,
                }}
            >
                {/* Difficulty badge */}
                <div className="flex items-center gap-2 mb-5">
          <span
              className="font-mono text-xs px-3 py-1.5 rounded-lg font-bold"
              style={{
                  background: `${meta.color}15`,
                  color: meta.color,
                  border: `1px solid ${meta.color}40`,
              }}
          >
            {q?.difficulty ?? 'BEGINNER'}
          </span>
                    <span className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
            {current + 1} of {questions.length}
          </span>
                </div>

                {/* Question */}
                <h2
                    className="font-display font-semibold text-2xl leading-relaxed mb-8"
                    style={{ color: 'var(--text-primary)' }}
                >
                    {q?.question}
                </h2>

                {/* Options */}
                <div className="flex flex-col gap-3">
                    {q?.options?.map((opt, i) => {
                        const isSelected = opt === selected
                        const isCorrect  = result && opt === result.correctAnswer
                        const isWrong    = result && opt === selected && !result.correct

                        let optStyle = {
                            background: 'var(--bg-main)',
                            borderColor: 'var(--border-dim)',
                            color: 'var(--text-primary)',
                            cursor: selected ? 'default' : 'pointer',
                        }

                        if (isCorrect) {
                            optStyle = { background: 'rgba(0,230,118,0.12)', borderColor: '#00e676', color: '#00e676', boxShadow: '0 0 20px rgba(0,230,118,0.2)' }
                        } else if (isWrong) {
                            optStyle = { background: 'rgba(255,82,82,0.12)', borderColor: '#ff5252', color: '#ff5252' }
                        } else if (selected && !isSelected) {
                            optStyle = { background: 'var(--bg-main)', borderColor: 'var(--border-dim)', color: 'var(--text-muted)', opacity: 0.5 }
                        } else if (!selected) {
                            optStyle.cursor = 'pointer'
                        }

                        return (
                            <button
                                key={i}
                                onClick={() => submit(opt)}
                                disabled={!!selected || submitting}
                                className="w-full text-left rounded-xl border-2 px-5 py-4 font-body text-base leading-relaxed transition-all duration-200 flex items-center gap-3 group"
                                style={optStyle}
                                onMouseEnter={e => {
                                    if (!selected) {
                                        e.currentTarget.style.borderColor = meta.color
                                        e.currentTarget.style.background = `${meta.color}08`
                                    }
                                }}
                                onMouseLeave={e => {
                                    if (!selected) {
                                        e.currentTarget.style.borderColor = 'var(--border-dim)'
                                        e.currentTarget.style.background = 'var(--bg-main)'
                                    }
                                }}
                            >
                <span
                    className="w-8 h-8 flex items-center justify-center rounded-lg font-mono text-sm font-bold shrink-0 transition-all"
                    style={{
                        background: isCorrect ? 'rgba(0,230,118,0.2)' : isWrong ? 'rgba(255,82,82,0.2)' : 'var(--bg-card)',
                        color: isCorrect ? '#00e676' : isWrong ? '#ff5252' : 'var(--text-muted)',
                    }}
                >
                  {isCorrect ? '✓' : isWrong ? '✗' : String.fromCharCode(65 + i)}
                </span>
                                {opt}
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Result feedback */}
            {result && (
                <div
                    className="rounded-2xl p-6 mb-5 animate-fade-in"
                    style={{
                        background: result.correct ? 'rgba(0,230,118,0.08)' : 'rgba(255,82,82,0.08)',
                        border: `2px solid ${result.correct ? 'rgba(0,230,118,0.4)' : 'rgba(255,82,82,0.4)'}`,
                    }}
                >
                    <div className="flex items-center gap-3 mb-3">
                        {result.correct
                            ? <CheckCircle size={24} className="text-cyber-green shrink-0" />
                            : <XCircle    size={24} className="text-cyber-danger shrink-0" />
                        }
                        <p
                            className="font-display font-bold text-xl"
                            style={{ color: result.correct ? '#00e676' : '#ff5252' }}
                        >
                            {msg}
                        </p>
                    </div>
                    <p className="font-body text-base leading-relaxed" style={{ color: 'var(--text-primary)', opacity: 0.85 }}>
                        💡 {result.explanation}
                    </p>
                </div>
            )}

            {/* Next button */}
            {result && (
                <div className="flex justify-end animate-fade-in">
                    <button
                        onClick={next}
                        className="flex items-center gap-2 px-8 py-4 rounded-xl font-display font-black text-base tracking-widest uppercase transition-all btn-neon-green"
                    >
                        {current + 1 >= questions.length
                            ? <><Trophy size={18} /> SEE RESULTS</>
                            : <><ChevronRight size={18} /> NEXT QUESTION</>
                        }
                    </button>
                </div>
            )}
        </div>
    )
}