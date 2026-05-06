import { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { gameApi } from '../services/api'

const CATEGORY_META = {
    1: { name: 'Spot the Phishing',  icon: '🎣', color: 'amber', accent: 'border-cyber-amber text-cyber-amber' },
    2: { name: 'Password Power',     icon: '🔐', color: 'green', accent: 'border-cyber-green text-cyber-green' },
    3: { name: 'Malware Hunter',     icon: '🦠', color: 'cyan',  accent: 'border-cyber-cyan  text-cyber-cyan'  },
    4: { name: 'Fake Site Detective',icon: '🌐', color: 'purple',accent: 'border-cyber-purple text-cyber-purple'},
}

const RESULT_MESSAGES_CORRECT = ['Excellent work, Agent! 🎉', 'Nailed it! 🚀', 'Perfect! Keep going! ⭐', 'Outstanding! 🏆', 'You are a cyber genius! 🧠']
const RESULT_MESSAGES_WRONG   = ['Not quite — but now you know! 💡', 'Good try! Check the tip below 👇', 'Keep learning, Agent! 📚', 'Almost! Read the explanation 🔍']

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
    const [resultMsg,  setResultMsg]  = useState('')

    const meta = CATEGORY_META[id] ?? { name: 'Challenge', icon: '◈', color: 'green', accent: 'border-cyber-green text-cyber-green' }

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
                setResultMsg(RESULT_MESSAGES_CORRECT[Math.floor(Math.random() * RESULT_MESSAGES_CORRECT.length)])

                updateUser({ ...user, points: (user?.points ?? 0) + 10 })
            } else {
                setResultMsg(RESULT_MESSAGES_WRONG[Math.floor(Math.random() * RESULT_MESSAGES_WRONG.length)])
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
        setResultMsg('')
    }

    const optionStyle = (opt) => {
        const base = 'w-full text-left px-6 py-5 rounded-2xl border-2 font-body text-base leading-relaxed transition-all duration-200 disabled:cursor-default'
        if (!selected) return `${base} border-white/15 text-white hover:border-cyber-green/60 hover:bg-cyber-green/8 hover:scale-101 cursor-pointer`
        if (opt === result?.correctAnswer) return `${base} border-cyber-green bg-cyber-green/15 text-cyber-green shadow-[0_0_20px_rgba(0,230,118,0.25)]`
        if (opt === selected && !result?.correct) return `${base} border-cyber-danger bg-cyber-danger/15 text-cyber-danger`
        return `${base} border-white/8 text-white/40`
    }

    if (loading) return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
            <div className="text-6xl animate-float">{meta.icon}</div>
            <span className="font-display text-cyber-green text-xl">
        Loading Challenge<span className="animate-blink">...</span>
      </span>
        </div>
    )

    if (error) return (
        <div className="max-w-2xl mx-auto px-6 py-20 text-center">
            <div className="text-6xl mb-4">😕</div>
            <p className="font-display text-cyber-danger text-xl">{error}</p>
        </div>
    )

    if (finished) {
        const total   = questions.length * 10
        const pct     = Math.round((score / total) * 100)
        const emoji   = pct >= 80 ? '🏆' : pct >= 60 ? '🌟' : pct >= 40 ? '👍' : '💪'
        const message = pct >= 80 ? 'Amazing work, Agent!' : pct >= 60 ? 'Great job! Keep it up!' : pct >= 40 ? 'Good effort! Practice more!' : 'Keep learning — you got this!'

        return (
            <div className="max-w-xl mx-auto px-6 py-16 text-center animate-fade-in">
                <div className="text-7xl mb-6 animate-float">{emoji}</div>
                <h2 className="font-display font-bold text-4xl tracking-wide mb-2 text-white">
                    Challenge Complete!
                </h2>
                <p className="font-body text-cyber-secondary text-lg mb-8">{message}</p>

                <div className="bg-cyber-card border-2 border-cyber-green/30 rounded-2xl p-8 mb-4 card-glow-green">
                    <p className="font-mono text-sm text-cyber-muted mb-2 tracking-widest">YOUR SCORE</p>
                    <p className="font-display font-bold text-7xl text-cyber-green glow-green mb-2">{score}</p>
                    <p className="font-body text-cyber-secondary">out of {total} points ({pct}%)</p>
                </div>

                <div className="h-4 bg-cyber-bg rounded-full overflow-hidden border border-cyber-green/20 mb-8">
                    <div
                        className="h-full bg-gradient-to-r from-cyber-green to-cyber-cyan rounded-full transition-all duration-1000 shadow-[0_0_12px_rgba(0,230,118,0.6)]"
                        style={{ width: `${pct}%` }}
                    />
                </div>

                <div className="flex gap-3 justify-center">
                    <button
                        onClick={() => { setCurrent(0); setSelected(null); setResult(null); setScore(0); setFinished(false) }}
                        className="px-6 py-3 font-display font-bold text-sm tracking-widest uppercase bg-cyber-green text-cyber-bg rounded-xl hover:shadow-[0_0_20px_rgba(0,230,118,0.4)] transition-all"
                    >
                        🔄 TRY AGAIN
                    </button>
                    <button
                        onClick={() => navigate('/categories')}
                        className="px-6 py-3 font-display font-bold text-sm tracking-widest uppercase border-2 border-cyber-cyan text-cyber-cyan rounded-xl hover:bg-cyber-cyan hover:text-cyber-bg transition-all"
                    >
                        🎮 MORE CHALLENGES
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-3xl mx-auto px-6 py-10 animate-fade-in">

            {/* Header */}
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                    <span className="text-3xl">{meta.icon}</span>
                    <div>
                        <p className="font-body text-cyber-secondary text-sm">{meta.name}</p>
                        <p className="font-display font-bold text-lg text-white">
                            Question {current + 1} of {questions.length}
                        </p>
                    </div>
                </div>
                <div className="bg-cyber-card border-2 border-cyber-amber/30 rounded-xl px-5 py-3 text-center">
                    <p className="font-mono text-xs text-cyber-muted">SCORE</p>
                    <p className="font-display font-bold text-2xl text-cyber-amber">{score}</p>
                </div>
            </div>

            {/* Progress bar */}
            <div className="h-3 bg-cyber-bg rounded-full overflow-hidden border border-white/10 mb-8">
                <div
                    className="h-full bg-gradient-to-r from-cyber-green to-cyber-cyan rounded-full transition-all duration-500"
                    style={{ width: `${((current + (selected ? 1 : 0)) / questions.length) * 100}%` }}
                />
            </div>

            {/* Question card */}
            <div className="bg-cyber-card border-2 border-white/10 rounded-2xl p-8 mb-6 shadow-xl">

                {/* Difficulty badge */}
                <div className="flex items-center gap-2 mb-5">
          <span className={`font-mono text-xs px-3 py-1.5 rounded-lg border-2 ${meta.accent} bg-current/10`}>
            {q?.difficulty ?? 'BEGINNER'}
          </span>
                    <span className="font-mono text-xs text-cyber-muted">
            Q{current + 1}/{questions.length}
          </span>
                </div>

                {/* Question text */}
                <h2 className="font-display font-semibold text-2xl leading-relaxed tracking-wide mb-8 text-white">
                    {q?.question}
                </h2>

                {/* Options */}
                <div className="flex flex-col gap-3">
                    {q?.options?.map((opt, i) => (
                        <button
                            key={i}
                            onClick={() => submit(opt)}
                            disabled={!!selected || submitting}
                            className={optionStyle(opt)}
                        >
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white/10 font-mono text-sm font-bold mr-3 shrink-0">
                {String.fromCharCode(65 + i)}
              </span>
                            {opt}
                        </button>
                    ))}
                </div>
            </div>

            {/* Result feedback */}
            {result && (
                <div className={`animate-fade-in mb-6 border-2 rounded-2xl p-6 ${result.correct ? 'bg-cyber-green/10 border-cyber-green/40' : 'bg-cyber-danger/10 border-cyber-danger/40'}`}>
                    <p className={`font-display font-bold text-xl mb-3 ${result.correct ? 'text-cyber-green' : 'text-cyber-danger'}`}>
                        {resultMsg}
                    </p>
                    <p className="font-body text-base text-white/80 leading-relaxed">
                        💡 {result.explanation}
                    </p>
                </div>
            )}

            {/* Next button */}
            {result && (
                <div className="flex justify-end animate-fade-in">
                    <button
                        onClick={next}
                        className="px-8 py-4 font-display font-bold text-base tracking-widest uppercase bg-cyber-green text-cyber-bg rounded-xl hover:shadow-[0_0_28px_rgba(0,230,118,0.5)] transition-all"
                    >
                        {current + 1 >= questions.length ? '🏁 SEE RESULTS →' : '⚡ NEXT QUESTION →'}
                    </button>
                </div>
            )}
        </div>
    )
}