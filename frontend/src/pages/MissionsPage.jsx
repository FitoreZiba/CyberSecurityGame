import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { missionApi } from '../services/api'
import Alert from '../components/ui/Alert'
import ProgressBar from '../components/ui/ProgressBar'
import Badge from '../components/ui/Badge'

const MISSIONS = [
    {
        id: 1,
        title: 'Operation: Inbox Zero',
        desc: 'A company employee clicked a suspicious email. Trace the attack step by step.',
        levelRequired: 0,
        steps: 4,
        icon: '✉',
        color: 'amber',
    },
    {
        id: 2,
        title: 'Operation: Vault Breaker',
        desc: 'An attacker gained access to a corporate account via a weak password chain.',
        levelRequired: 1,
        steps: 4,
        icon: '🔐',
        color: 'green',
    },
    {
        id: 3,
        title: 'Operation: Ghost Signal',
        desc: 'An unknown process is consuming bandwidth. Identify the malware infection chain.',
        levelRequired: 2,
        steps: 5,
        icon: '☣',
        color: 'red',
    },
    {
        id: 4,
        title: 'Operation: Mirror Web',
        desc: 'Users are being redirected to fake websites. Map the full attack and shut it down.',
        levelRequired: 3,
        steps: 5,
        icon: '🌐',
        color: 'cyan',
    },
]

// ── Extract fields from MissionStepDto ──────────────
const getQuestion      = (step) => step?.question?.question ?? 'No question text found'
const getOptions       = (step) => step?.question?.options  ?? []
const getQuestionId    = (step) => step?.question?.id       ?? null
const getCorrectAnswer = (res)  => res?.correctAnswer       ?? null
const isCorrect        = (res)  => res?.correct             ?? false
const getExplanation   = (res)  => res?.explanation ?? res?.message ?? ''
const isMissionDone    = (res)  => res?.missionCompleted    ?? false

const BORDER_COLOR = {
    amber: 'border-l-cyber-amber',
    green: 'border-l-cyber-green',
    red:   'border-l-cyber-danger',
    cyan:  'border-l-cyber-cyan',
}

export default function MissionsPage() {
    const { user, token, updateUser } = useAuth()

    const [activeMission, setActiveMission] = useState(null)
    const [stepData,      setStepData]      = useState(null)
    const [selected,      setSelected]      = useState(null)
    const [result,        setResult]        = useState(null)
    const [submitting,    setSubmitting]    = useState(false)
    const [starting,      setStarting]      = useState(false)
    const [error,         setError]         = useState('')
    const [stepNum,       setStepNum]       = useState(1)
    const [completed,     setCompleted]     = useState(false)

    // ── Start mission ──────────────────────────────────
    const startMission = async (mission) => {
        setError('')
        setStarting(true)
        setActiveMission(mission)
        setCompleted(false)
        setStepNum(1)
        setSelected(null)
        setResult(null)
        setStepData(null)

        try {
            const res = await missionApi.startMission(mission.id, user?.id, token)
            console.log('Mission start response:', res)

            if (!res) {
                setError('Backend returned empty response. Check that missions are seeded in the database.')
                setActiveMission(null)
                return
            }
            setStepData(res)
        } catch (e) {
            console.error('Mission start error:', e)
            setError(`Failed to start mission: ${e.message}`)
            setActiveMission(null)
        } finally {
            setStarting(false)
        }
    }

    // ── Submit step answer ─────────────────────────────
    const submitStep = async (option) => {
        if (selected || submitting) return
        setSelected(option)
        setSubmitting(true)
        setError('')

        const questionId = getQuestionId(stepData)

        console.log('Submitting:', {
            userId: user?.id,
            questionId,
            missionId: activeMission?.id,
            selectedAnswer: option,
        })

        try {
            const res = await missionApi.submitStep(
                {
                    userId: user?.id,
                    questionId,
                    missionId: activeMission?.id,
                    selectedAnswer: option,
                },
                token
            )
            console.log('Step result:', res)
            setResult(res)

            // Only award points if correct
            if (isCorrect(res)) {
                updateUser({ ...user, points: (user?.points ?? 0) + 10 })
            }
        } catch (e) {
            console.error('Submit step error:', e)
            setError(`Failed to submit answer: ${e.message}`)
            setSelected(null) // unblock so user can retry
        } finally {
            setSubmitting(false)
        }
    }

    // ── Next step / Try again ──────────────────────────
    const nextStep = () => {
        // Wrong answer — reset so user can try again on same question
        if (!isCorrect(result)) {
            setSelected(null)
            setResult(null)
            return
        }

        // Mission fully complete
        if (isMissionDone(result)) {
            setCompleted(true)
            return
        }

        // Advance — result contains the next question
        if (result?.question) {
            setStepData(result)
            setSelected(null)
            setResult(null)
            setStepNum(n => n + 1)
        } else {
            setCompleted(true)
        }
    }

    const resetAll = () => {
        setActiveMission(null)
        setStepData(null)
        setSelected(null)
        setResult(null)
        setError('')
        setStepNum(1)
        setCompleted(false)
    }

    const optionStyle = (opt) => {
        const base = 'w-full text-left px-6 py-5 rounded-2xl border-2 font-body text-base leading-relaxed transition-all duration-200 disabled:cursor-default'
        if (!selected) return `${base} border-white/15 text-white hover:border-cyber-green/60 hover:bg-cyber-green/8 cursor-pointer`
        if (opt === getCorrectAnswer(result)) return `${base} border-cyber-green bg-cyber-green/15 text-cyber-green shadow-[0_0_20px_rgba(0,230,118,0.25)]`
        if (opt === selected && !isCorrect(result)) return `${base} border-cyber-danger bg-cyber-danger/15 text-cyber-danger`
        return `${base} border-white/8 text-white/40`
    }

    // ── LOADING ────────────────────────────────────────
    if (starting) return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
            <div className="text-5xl animate-float">🕵️</div>
            <span className="font-display text-cyber-green text-xl">
        Starting Mission<span className="animate-blink">...</span>
      </span>
        </div>
    )

    // ── MISSION COMPLETE ───────────────────────────────
    if (completed) return (
        <div className="max-w-xl mx-auto px-6 py-20 text-center animate-fade-in">
            <div className="text-7xl mb-6 animate-float">🎯</div>
            <h2 className="font-display font-bold text-4xl tracking-wide mb-2 text-cyber-green glow-green">
                Mission Complete!
            </h2>
            <p className="font-display text-xl text-cyber-secondary mb-2">
                {activeMission?.title}
            </p>
            <p className="font-mono text-sm text-cyber-muted mb-8">
                // Case closed. Threat neutralized. Outstanding work, Agent!
            </p>

            <div className="bg-cyber-card border-2 border-cyber-green/30 rounded-2xl p-6 mb-8">
                <p className="font-mono text-xs text-cyber-muted mb-1 tracking-widest">STEPS COMPLETED</p>
                <p className="font-display font-bold text-5xl text-cyber-green glow-green">{stepNum}</p>
            </div>

            <button
                onClick={resetAll}
                className="px-8 py-4 font-display font-bold text-base tracking-widest uppercase bg-cyber-cyan text-cyber-bg rounded-xl hover:shadow-[0_0_28px_rgba(24,255,255,0.5)] transition-all"
            >
                ← BACK TO MISSIONS
            </button>
        </div>
    )

    // ── ACTIVE MISSION STEP ────────────────────────────
    if (activeMission && stepData) {
        const question = getQuestion(stepData)
        const options  = getOptions(stepData)

        return (
            <div className="max-w-3xl mx-auto px-6 py-10 animate-fade-in">

                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                    <div>
                        <p className="font-mono text-sm text-cyber-secondary">
                            {activeMission.title}
                        </p>
                        <p className="font-display font-bold text-lg text-white tracking-wide">
                            Step {stepNum} of {activeMission.steps}
                        </p>
                    </div>
                    <button
                        onClick={resetAll}
                        className="font-mono text-xs text-cyber-muted border-2 border-cyber-muted/30 rounded-xl px-4 py-2 hover:text-cyber-danger hover:border-cyber-danger transition-all"
                    >
                        ✕ ABORT MISSION
                    </button>
                </div>

                {/* Progress bar */}
                <div className="h-3 bg-cyber-bg rounded-full overflow-hidden border border-white/10 mb-8">
                    <div
                        className="h-full bg-gradient-to-r from-cyber-cyan to-cyber-green rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(24,255,255,0.5)]"
                        style={{ width: `${(stepNum / activeMission.steps) * 100}%` }}
                    />
                </div>

                {error && (
                    <div className="bg-cyber-danger/10 border-2 border-cyber-danger/40 rounded-xl px-5 py-4 text-cyber-danger font-body text-sm mb-4">
                        ⚠ {error}
                    </div>
                )}

                {/* Question card */}
                <div className="bg-cyber-card border-2 border-cyber-cyan/25 rounded-2xl p-8 mb-6">

                    <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs text-cyber-cyan border border-cyber-cyan/40 rounded-lg px-3 py-1.5">
              STEP {stepNum}
            </span>
                        <span className="font-mono text-xs text-cyber-muted">
              {activeMission.title}
            </span>
                    </div>

                    <h2 className="font-display font-semibold text-2xl leading-relaxed tracking-wide mb-8 text-white">
                        {question}
                    </h2>

                    {/* Options */}
                    {options.length === 0 ? (
                        <div className="bg-cyber-amber/10 border-2 border-cyber-amber/40 rounded-xl p-4 text-cyber-amber font-body text-sm">
                            ⚠ No options returned. Check your MissionStepDto fields.
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {options.map((opt, i) => (
                                <button
                                    key={i}
                                    onClick={() => submitStep(opt)}
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
                    )}
                </div>

                {/* Result feedback */}
                {result && (
                    <div className={`
            animate-fade-in mb-6 border-2 rounded-2xl p-6
            ${isCorrect(result)
                        ? 'bg-cyber-green/10 border-cyber-green/40'
                        : 'bg-cyber-danger/10 border-cyber-danger/40'}
          `}>
                        <p className={`font-display font-bold text-xl mb-3 ${isCorrect(result) ? 'text-cyber-green' : 'text-cyber-danger'}`}>
                            {isCorrect(result)
                                ? '✅ Correct! Great work, Agent!'
                                : '❌ Not quite right — read the explanation below!'}
                        </p>
                        <p className="font-body text-base text-white/85 leading-relaxed mb-2">
                            💡 {getExplanation(result)}
                        </p>
                        {!isCorrect(result) && getCorrectAnswer(result) && (
                            <div className="mt-3 bg-cyber-green/10 border border-cyber-green/30 rounded-xl px-4 py-3">
                                <p className="font-mono text-sm text-cyber-green">
                                    ✓ Correct answer: <span className="font-bold">{getCorrectAnswer(result)}</span>
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {/* Next / Try Again button */}
                {result && (
                    <div className="flex justify-between items-center animate-fade-in">
            <span className="font-mono text-xs text-cyber-muted">
              {isMissionDone(result)
                  ? '// Mission complete!'
                  : isCorrect(result)
                      ? `// Step ${stepNum} done — next step ready`
                      : '// Try again — you can do it!'}
            </span>

                        {isCorrect(result) ? (
                            <button
                                onClick={nextStep}
                                className="px-8 py-4 font-display font-bold text-base tracking-widest uppercase bg-cyber-green text-cyber-bg rounded-xl hover:shadow-[0_0_28px_rgba(0,230,118,0.5)] transition-all"
                            >
                                {isMissionDone(result) ? '🏁 COMPLETE MISSION →' : '⚡ NEXT STEP →'}
                            </button>
                        ) : (
                            <button
                                onClick={nextStep}
                                className="px-8 py-4 font-display font-bold text-base tracking-widest uppercase bg-cyber-danger/20 border-2 border-cyber-danger text-cyber-danger rounded-xl hover:bg-cyber-danger hover:text-white transition-all"
                            >
                                🔄 TRY AGAIN
                            </button>
                        )}
                    </div>
                )}

            </div>
        )
    }

    // ── MISSION SELECT ─────────────────────────────────
    return (
        <div className="max-w-7xl mx-auto px-6 py-10 animate-fade-in">

            <div className="mb-10">
                <p className="font-mono text-cyber-green text-sm mb-2">● MISSION CONTROL</p>
                <h1 className="font-display font-bold text-5xl text-white mb-3">
                    🕵️ Active <span className="text-gradient-green">Missions</span>
                </h1>
                <p className="font-body text-cyber-secondary text-lg">
                    Multi-step cybersecurity case investigations. Complete every step correctly to close the case!
                </p>
            </div>

            {!user?.id && (
                <div className="bg-cyber-amber/10 border-2 border-cyber-amber/40 rounded-xl px-5 py-4 text-cyber-amber font-body text-sm mb-6">
                    ⚠ User ID not found in session. Try logging out and back in.
                </div>
            )}

            {error && (
                <div className="bg-cyber-danger/10 border-2 border-cyber-danger/40 rounded-xl px-5 py-4 text-cyber-danger font-body text-sm mb-6">
                    ⚠ {error}
                </div>
            )}

            <div className="flex flex-col gap-5">
                {MISSIONS.map((mission, i) => {
                    const userLevel = user?.level ?? 0
                    const locked    = userLevel < mission.levelRequired

                    return (
                        <div
                            key={mission.id}
                            className={`
                flex items-center gap-6 bg-cyber-card border-l-4 border
                rounded-2xl p-7 transition-all duration-200 animate-fade-in
                ${locked
                                ? 'border-cyber-muted/10 opacity-50 cursor-not-allowed'
                                : 'border-cyber-green/15 hover:border-cyber-green/40 hover:scale-[1.01]'}
                ${BORDER_COLOR[mission.color]}
              `}
                            style={{ animationDelay: `${i * 0.1}s` }}
                        >
                            {/* Icon */}
                            <div className="w-18 h-18 shrink-0 flex items-center justify-center bg-black/30 rounded-2xl text-4xl w-20 h-20">
                                {locked ? '🔒' : mission.icon}
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-3 mb-2">
                                    <h2 className="font-display font-bold text-2xl tracking-wide">
                                        {mission.title}
                                    </h2>
                                    {locked ? (
                                        <span className="font-mono text-xs px-2 py-1 rounded-lg border border-cyber-muted/40 text-cyber-muted">
                      LEVEL {mission.levelRequired} REQUIRED
                    </span>
                                    ) : (
                                        <span className="font-mono text-xs px-2 py-1 rounded-lg border border-cyber-cyan/40 text-cyber-cyan">
                      ACTIVE
                    </span>
                                    )}
                                </div>
                                <p className="font-body text-cyber-secondary text-base leading-relaxed mb-3">
                                    {mission.desc}
                                </p>
                                <div className="flex items-center gap-6">
                  <span className="font-mono text-sm text-cyber-muted">
                    📋 {mission.steps} Steps
                  </span>
                                    <span className="font-mono text-sm text-cyber-muted">
                    🎯 Min Level: {mission.levelRequired}
                  </span>
                                </div>
                            </div>

                            {/* Launch */}
                            {!locked && (
                                <button
                                    onClick={() => startMission(mission)}
                                    className="shrink-0 px-7 py-4 font-display font-bold text-base tracking-widest uppercase bg-cyber-green text-cyber-bg rounded-xl hover:shadow-[0_0_28px_rgba(0,230,118,0.5)] transition-all"
                                >
                                    LAUNCH →
                                </button>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}