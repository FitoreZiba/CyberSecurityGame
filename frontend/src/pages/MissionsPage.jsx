import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { missionApi, progressApi } from '../services/api'

const MISSIONS = [
    {
        id: 1,
        title: 'Operation: Inbox Zero',
        icon: '✉️',
        color: 'amber',
        levelRequired: 0,
        steps: 4,
        briefing: {
            date: 'Monday, 09:14 AM',
            location: 'CyberCorp HQ — Finance Department',
            agent: 'Director Hayes',
            intro: `Agent, we have a situation.

This morning, Sarah from our Finance team received what looked like a routine email from the CEO asking her to urgently verify her login credentials. She clicked the link and entered her password before realising something was wrong.

Within minutes, three company bank transfers had been authorised and our internal systems were flagged for suspicious access. We believe this is a coordinated phishing attack targeting our executive team.

Your mission is to trace exactly how this attack unfolded — step by step — and identify every technique the attacker used. Understanding this attack is the only way we can prevent the next one.

The company is counting on you, Agent. Begin your investigation immediately.`,
            objectives: [
                'Identify the phishing technique used',
                'Trace the fake domain used by the attacker',
                'Identify the social engineering method',
                'Determine how credentials were harvested',
            ],
            threat: 'HIGH',
            category: 'PHISHING',
        },
    },
    {
        id: 2,
        title: 'Operation: Vault Breaker',
        icon: '🔐',
        color: 'green',
        levelRequired: 1,
        steps: 4,
        briefing: {
            date: 'Wednesday, 11:30 PM',
            location: 'DataVault Systems — Remote Access Logs',
            agent: 'Director Chen',
            intro: `Agent, we have detected a major breach.

At 11:30 PM last night, an unknown attacker gained full administrative access to DataVault Systems — a company storing sensitive medical records for over 200,000 patients. The attacker remained inside the system for six hours before being detected, and in that time downloaded everything.

Our forensics team has traced the entry point: a single employee account with a dangerously weak password that had never been changed since the company was founded. The attacker used an automated tool to crack it in under three seconds.

Your mission is to investigate exactly how this password-based attack worked — and identify every security failure that made it possible. Only by understanding the full chain of failure can we prevent the next breach.

Patient lives depend on the security of this data. Do not let us down.`,
            objectives: [
                'Identify the worst password security practice',
                'Understand how brute force attacks work',
                'Determine how rainbow tables cracked the hash',
                'Learn the most effective account protection',
            ],
            threat: 'CRITICAL',
            category: 'PASSWORD SECURITY',
        },
    },
    {
        id: 3,
        title: 'Operation: Ghost Signal',
        icon: '☣️',
        color: 'red',
        levelRequired: 2,
        steps: 5,
        briefing: {
            date: 'Friday, 03:22 AM',
            location: 'NovaTech Industries — Server Room',
            agent: 'Director Okafor',
            intro: `Agent — this one is serious. Wake up.

At 3 AM this morning our network monitoring system detected an unknown process consuming 87% of our processing power and sending large amounts of data to an unidentified server in Eastern Europe. By the time our IT team arrived at the office, three things had happened.

First — every file on the company network had been encrypted and renamed with a .ghost extension. Second — a message appeared on every screen demanding payment in cryptocurrency within 48 hours or all files would be permanently deleted. Third — we discovered that the initial infection occurred over two weeks ago through a pirated software download, and had been silently spreading through the network ever since.

This is a multi-stage malware attack. Your mission is to trace every step of the infection chain — from the original download to the final ransomware detonation. The clock is ticking.`,
            objectives: [
                'Identify how the malware first entered the system',
                'Detect the macro-based propagation method',
                'Identify the Remote Access Trojan behaviour',
                'Recognise the cryptominer stage',
                'Determine the best ransomware defence strategy',
            ],
            threat: 'CRITICAL',
            category: 'MALWARE',
        },
    },
    {
        id: 4,
        title: 'Operation: Mirror Web',
        icon: '🌐',
        color: 'cyan',
        levelRequired: 3,
        steps: 5,
        briefing: {
            date: 'Tuesday, 02:45 PM',
            location: 'Global — 47 Countries Affected',
            agent: 'Director Vasquez',
            intro: `Agent, this is our most complex case yet — and it is global.

Over the past 72 hours, we have received reports from 47 countries of users being redirected to near-perfect clones of major banking and shopping websites. Victims are entering their login credentials, card numbers, and personal details — completely unaware they are on a fake site. Estimated financial losses have already exceeded $4 million dollars.

Our intelligence team has identified the attack pattern. The criminals have registered dozens of typosquatted domains — website addresses that look almost identical to real ones but with tiny differences most people never notice. They have obtained real HTTPS certificates to display the padlock icon and make the sites look legitimate. They are using social media adverts and phishing emails to drive traffic to these fake pages.

Your mission is to learn every technique these criminals are using so we can educate the public and take these sites down. This is the most sophisticated web spoofing operation we have ever seen.

Study it carefully. Every detail matters.`,
            objectives: [
                'Identify typosquatting domain techniques',
                'Understand HTTPS misconceptions attackers exploit',
                'Learn to parse real domains from fake subdomains',
                'Identify malicious link destination techniques',
                'Recognise all signs of a fake webshop',
            ],
            threat: 'HIGH',
            category: 'FAKE WEBSITES',
        },
    },
]

const getQuestion      = (step) => step?.question?.question ?? 'No question text found'
const getOptions       = (step) => step?.question?.options  ?? []
const getQuestionId    = (step) => step?.question?.id       ?? null
const getCorrectAnswer = (res)  => res?.correctAnswer       ?? null
const isCorrect        = (res)  => res?.correct             ?? false
const getExplanation   = (res)  => res?.explanation ?? res?.message ?? ''
const isMissionDone    = (res)  => res?.missionCompleted    ?? false

const THREAT_COLORS = {
    HIGH:     { bg: 'rgba(255,215,64,0.15)',  border: 'rgba(255,215,64,0.5)',  text: '#ffd740' },
    CRITICAL: { bg: 'rgba(255,82,82,0.15)',   border: 'rgba(255,82,82,0.5)',   text: '#ff5252' },
    MEDIUM:   { bg: 'rgba(24,255,255,0.15)',  border: 'rgba(24,255,255,0.5)',  text: '#18ffff' },
}

const ACCENT_COLORS = {
    amber: { color: '#ffd740', glow: 'rgba(255,215,64,0.4)', border: 'rgba(255,215,64,0.3)' },
    green: { color: '#00e676', glow: 'rgba(0,230,118,0.4)',  border: 'rgba(0,230,118,0.3)'  },
    red:   { color: '#ff5252', glow: 'rgba(255,82,82,0.4)',  border: 'rgba(255,82,82,0.3)'  },
    cyan:  { color: '#18ffff', glow: 'rgba(24,255,255,0.4)', border: 'rgba(24,255,255,0.3)' },
}

export default function MissionsPage() {
    const { user, token, updateUser } = useAuth()

    const [activeMission,   setActiveMission]   = useState(null)
    const [showBriefing,    setShowBriefing]    = useState(false)
    const [stepData,        setStepData]        = useState(null)
    const [selected,        setSelected]        = useState(null)
    const [result,          setResult]          = useState(null)
    const [submitting,      setSubmitting]      = useState(false)
    const [starting,        setStarting]        = useState(false)
    const [error,           setError]           = useState('')
    const [stepNum,         setStepNum]         = useState(1)
    const [completed,       setCompleted]       = useState(false)
    const [levelUp,         setLevelUp]         = useState(false)

    const openBriefing = (mission) => {
        setActiveMission(mission)
        setShowBriefing(true)
    }

    const startMission = async () => {
        setShowBriefing(false)
        setError('')
        setStarting(true)
        setCompleted(false)
        setStepNum(1)
        setSelected(null)
        setResult(null)
        setStepData(null)

        try {
            const res = await missionApi.startMission(activeMission.id, user?.id, token)
            if (!res) {
                setError('Backend returned empty response.')
                setActiveMission(null)
                return
            }
            setStepData(res)
        } catch (e) {
            setError(`Failed to start mission: ${e.message}`)
            setActiveMission(null)
        } finally {
            setStarting(false)
        }
    }

    const submitStep = async (option) => {
        if (selected || submitting) return
        setSelected(option)
        setSubmitting(true)
        setError('')

        const questionId = getQuestionId(stepData)

        try {
            const res = await missionApi.submitStep(
                { userId: user?.id, questionId, missionId: activeMission?.id, selectedAnswer: option },
                token
            )
            setResult(res)

            if (isCorrect(res)) {
                const newPoints  = (user?.points ?? 0) + 10
                const newLevel   = Math.min(Math.floor(newPoints / 100), 4)
                const didLevelUp = newLevel > (user?.level ?? 0)
                updateUser({ ...user, points: newPoints, level: newLevel })

                if (didLevelUp) {
                    setLevelUp(true)
                    setTimeout(() => setLevelUp(false), 3000)
                }

                if (isMissionDone(res)) {
                    progressApi.getProgress(user.id, token)
                        .then(data => {
                            updateUser({ ...user, points: data.totalPoints, level: data.level })
                            console.log('>>> Cases solved after mission:', data.completedCases)
                        })
                        .catch(() => {})
                }
            }
        } catch (e) {
            setError(`Failed to submit answer: ${e.message}`)
            setSelected(null)
        } finally {
            setSubmitting(false)
        }
    }

    const nextStep = () => {
        if (!isCorrect(result)) { setSelected(null); setResult(null); return }
        if (isMissionDone(result)) { setCompleted(true); return }
        if (result?.question) {
            setStepData(result); setSelected(null); setResult(null); setStepNum(n => n + 1)
        } else {
            setCompleted(true)
        }
    }

    const resetAll = () => {
        setActiveMission(null); setStepData(null); setSelected(null)
        setResult(null); setError(''); setStepNum(1)
        setCompleted(false); setShowBriefing(false); setLevelUp(false)
    }

    const optionStyle = (opt) => {
        const base = 'w-full text-left px-6 py-5 rounded-2xl border-2 font-body text-base leading-relaxed transition-all duration-200 disabled:cursor-default'
        if (!selected) return `${base} border-white/15 hover:border-cyber-green/60 hover:bg-cyber-green/8 cursor-pointer`
        if (opt === getCorrectAnswer(result)) return `${base} border-cyber-green bg-cyber-green/15 text-cyber-green`
        if (opt === selected && !isCorrect(result)) return `${base} border-cyber-danger bg-cyber-danger/15 text-cyber-danger`
        return `${base} border-white/8 opacity-40`
    }

    // ── LEVEL UP BANNER (shown everywhere) ────────────
    const LevelUpBanner = () => levelUp ? (
        <div
            className="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-count-up px-8 py-4 rounded-2xl font-display font-black text-2xl tracking-widest text-center pointer-events-none"
            style={{
                background: 'linear-gradient(135deg, #ffd740, #ff6d00)',
                color: '#060d18',
                boxShadow: '0 0 40px rgba(255,215,64,0.8)',
            }}
        >
            ⚡ LEVEL UP! ⚡
        </div>
    ) : null

    // ── LOADING ────────────────────────────────────────
    if (starting) return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
            <div className="text-6xl animate-float">🕵️</div>
            <p className="font-display font-bold text-2xl text-cyber-green">
                Initializing Mission<span className="animate-blink">...</span>
            </p>
        </div>
    )

    // ── MISSION BRIEFING SCREEN ────────────────────────
    if (showBriefing && activeMission) {
        const accent  = ACCENT_COLORS[activeMission.color]
        const threat  = THREAT_COLORS[activeMission.briefing.threat]
        const briefing = activeMission.briefing

        return (
            <div className="max-w-3xl mx-auto px-6 py-10 animate-fade-in">
                <LevelUpBanner />

                {/* Back button */}
                <button
                    onClick={resetAll}
                    className="flex items-center gap-2 font-mono text-sm mb-8 hover:opacity-80 transition-opacity"
                    style={{ color: 'var(--text-secondary)', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                    ← BACK TO MISSIONS
                </button>

                {/* Classified header */}
                <div
                    className="rounded-2xl p-1 mb-6"
                    style={{ background: `linear-gradient(135deg, ${accent.color}, transparent)` }}
                >
                    <div className="rounded-xl p-6" style={{ background: 'var(--bg-panel)' }}>
                        <div className="flex items-start justify-between gap-4 mb-4">
                            <div className="flex items-center gap-3">
                                <span className="text-4xl">{activeMission.icon}</span>
                                <div>
                                    <p className="font-mono text-xs tracking-widest mb-1" style={{ color: accent.color }}>
                                        ● MISSION BRIEFING — CLASSIFIED
                                    </p>
                                    <h1 className="font-display font-black text-3xl" style={{ color: 'var(--text-primary)' }}>
                                        {activeMission.title}
                                    </h1>
                                </div>
                            </div>
                            <div
                                className="shrink-0 px-4 py-2 rounded-xl font-display font-bold text-sm tracking-widest"
                                style={{ background: threat.bg, border: `1px solid ${threat.border}`, color: threat.text }}
                            >
                                {activeMission.briefing.threat} THREAT
                            </div>
                        </div>

                        {/* Meta info */}
                        <div
                            className="grid grid-cols-3 gap-4 p-4 rounded-xl mb-4"
                            style={{ background: 'var(--bg-main)' }}
                        >
                            {[
                                { label: 'DATE', value: briefing.date },
                                { label: 'LOCATION', value: briefing.location },
                                { label: 'DIRECTOR', value: briefing.agent },
                            ].map(({ label, value }) => (
                                <div key={label}>
                                    <p className="font-mono text-xs tracking-widest mb-1" style={{ color: 'var(--text-muted)' }}>
                                        {label}
                                    </p>
                                    <p className="font-body text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                                        {value}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Category tag */}
                        <div className="flex items-center gap-2 mb-2">
              <span
                  className="font-mono text-xs px-3 py-1 rounded-lg font-bold"
                  style={{ background: `${accent.color}15`, color: accent.color, border: `1px solid ${accent.color}40` }}
              >
                {briefing.category}
              </span>
                            <span className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
                {activeMission.steps} STEPS
              </span>
                        </div>
                    </div>
                </div>

                {/* Briefing text — typewriter feel */}
                <div
                    className="rounded-2xl p-8 mb-6 border"
                    style={{ background: 'var(--bg-card)', borderColor: 'var(--border-dim)' }}
                >
                    <p className="font-mono text-xs tracking-widest mb-4" style={{ color: accent.color }}>
                        // DIRECTOR'S BRIEFING
                    </p>
                    {briefing.intro.split('\n\n').map((para, i) => (
                        <p
                            key={i}
                            className="font-body text-base leading-relaxed mb-4 last:mb-0"
                            style={{ color: 'var(--text-primary)', opacity: 0.9 }}
                        >
                            {para}
                        </p>
                    ))}
                </div>

                {/* Objectives */}
                <div
                    className="rounded-2xl p-6 mb-8 border"
                    style={{
                        background: `${accent.color}08`,
                        borderColor: accent.border,
                    }}
                >
                    <p className="font-mono text-xs tracking-widest mb-4" style={{ color: accent.color }}>
                        // MISSION OBJECTIVES
                    </p>
                    <div className="flex flex-col gap-3">
                        {briefing.objectives.map((obj, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <div
                                    className="w-6 h-6 rounded-lg flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5"
                                    style={{ background: `${accent.color}20`, color: accent.color }}
                                >
                                    {i + 1}
                                </div>
                                <p className="font-body text-base" style={{ color: 'var(--text-primary)' }}>
                                    {obj}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Accept mission button */}
                <button
                    onClick={startMission}
                    className="w-full py-5 rounded-2xl font-display font-black text-xl tracking-widest uppercase transition-all duration-200 hover:scale-[1.02]"
                    style={{
                        background: `linear-gradient(135deg, ${accent.color}, ${accent.color}aa)`,
                        color: '#060d18',
                        boxShadow: `0 0 40px ${accent.glow}`,
                    }}
                >
                    ⚡ ACCEPT MISSION — BEGIN INVESTIGATION
                </button>
            </div>
        )
    }

    // ── MISSION COMPLETE ───────────────────────────────
    if (completed && activeMission) {
        const accent = ACCENT_COLORS[activeMission.color]
        return (
            <div className="max-w-xl mx-auto px-6 py-16 text-center animate-fade-in">
                <LevelUpBanner />
                <div className="text-8xl mb-6 animate-float">🏆</div>
                <p className="font-mono text-sm tracking-widest mb-2" style={{ color: accent.color }}>
                    ● CASE CLOSED
                </p>
                <h2
                    className="font-display font-black text-5xl mb-3"
                    style={{ color: accent.color, textShadow: `0 0 30px ${accent.glow}` }}
                >
                    Mission Complete!
                </h2>
                <p className="font-display font-bold text-2xl mb-2" style={{ color: 'var(--text-primary)' }}>
                    {activeMission.title}
                </p>
                <p className="font-body text-lg mb-8" style={{ color: 'var(--text-secondary)' }}>
                    Outstanding work, Agent. The threat has been neutralized. Your findings have been submitted to the Director.
                </p>

                <div
                    className="rounded-2xl p-8 mb-8 border"
                    style={{
                        background: 'var(--bg-card)',
                        borderColor: accent.border,
                        boxShadow: `0 0 40px ${accent.glow}15`,
                    }}
                >
                    <p className="font-mono text-xs tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>
                        STEPS COMPLETED
                    </p>
                    <p
                        className="font-display font-black text-6xl"
                        style={{ color: accent.color, textShadow: `0 0 20px ${accent.glow}` }}
                    >
                        {stepNum}/{activeMission.steps}
                    </p>
                    <p className="font-mono text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
                        +{stepNum * 10} XP EARNED
                    </p>
                </div>

                <button
                    onClick={resetAll}
                    className="px-8 py-4 rounded-xl font-display font-black text-base tracking-widest uppercase transition-all hover:scale-105"
                    style={{
                        background: `${accent.color}15`,
                        border: `2px solid ${accent.color}`,
                        color: accent.color,
                        boxShadow: `0 0 20px ${accent.glow}`,
                    }}
                >
                    ← BACK TO MISSION CONTROL
                </button>
            </div>
        )
    }

    // ── ACTIVE MISSION STEP ────────────────────────────
    if (activeMission && stepData) {
        const question = getQuestion(stepData)
        const options  = getOptions(stepData)
        const accent   = ACCENT_COLORS[activeMission.color]

        return (
            <div className="max-w-3xl mx-auto px-6 py-8 animate-fade-in">
                <LevelUpBanner />

                {/* HUD header */}
                <div
                    className="rounded-2xl p-5 mb-5 flex items-center justify-between border"
                    style={{ background: 'var(--bg-panel)', borderColor: 'var(--border-dim)' }}
                >
                    <div className="flex items-center gap-4">
                        <div
                            className="w-12 h-12 flex items-center justify-center rounded-xl text-2xl shrink-0"
                            style={{ background: `${accent.color}15`, border: `1px solid ${accent.border}` }}
                        >
                            {activeMission.icon}
                        </div>
                        <div>
                            <p className="font-mono text-xs tracking-widest mb-0.5" style={{ color: accent.color }}>
                                ● ACTIVE INVESTIGATION
                            </p>
                            <p className="font-display font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
                                {activeMission.title}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-center">
                            <p className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>STEP</p>
                            <p className="font-display font-black text-2xl" style={{ color: accent.color }}>
                                {stepNum}<span className="text-sm" style={{ color: 'var(--text-muted)' }}>/{activeMission.steps}</span>
                            </p>
                        </div>
                        <button
                            onClick={resetAll}
                            className="font-mono text-xs border rounded-xl px-4 py-2 transition-all"
                            style={{ borderColor: 'var(--text-muted)', color: 'var(--text-muted)', background: 'none', cursor: 'pointer' }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = '#ff5252'; e.currentTarget.style.color = '#ff5252' }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--text-muted)'; e.currentTarget.style.color = 'var(--text-muted)' }}
                        >
                            ✕ ABORT
                        </button>
                    </div>
                </div>

                {/* Progress bar */}
                <div className="h-2.5 rounded-full overflow-hidden mb-6" style={{ background: 'var(--bg-card)' }}>
                    <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                            width: `${(stepNum / activeMission.steps) * 100}%`,
                            background: `linear-gradient(90deg, ${accent.color}, #18ffff)`,
                            boxShadow: `0 0 10px ${accent.glow}`,
                        }}
                    />
                </div>

                {error && (
                    <div className="bg-cyber-danger/10 border-2 border-cyber-danger/40 rounded-xl px-5 py-4 text-cyber-danger font-body text-sm mb-4">
                        ⚠ {error}
                    </div>
                )}

                {/* Question card */}
                <div
                    className="rounded-2xl p-8 mb-5 border"
                    style={{
                        background: 'var(--bg-card)',
                        borderColor: accent.border,
                        boxShadow: `0 0 30px ${accent.glow}08`,
                    }}
                >
                    <div className="flex items-center gap-3 mb-5">
            <span
                className="font-mono text-xs px-3 py-1.5 rounded-lg font-bold"
                style={{ background: `${accent.color}15`, color: accent.color, border: `1px solid ${accent.border}` }}
            >
              STEP {stepNum} — CLUE
            </span>
                    </div>

                    <h2 className="font-display font-semibold text-2xl leading-relaxed tracking-wide mb-8"
                        style={{ color: 'var(--text-primary)' }}>
                        {question}
                    </h2>

                    {options.length === 0 ? (
                        <div className="bg-cyber-amber/10 border-2 border-cyber-amber/40 rounded-xl p-4 text-cyber-amber">
                            ⚠ No options returned from backend.
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {options.map((opt, i) => (
                                <button
                                    key={i}
                                    onClick={() => submitStep(opt)}
                                    disabled={!!selected || submitting}
                                    className={optionStyle(opt)}
                                    style={{ color: 'var(--text-primary)' }}
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

                {/* Result */}
                {result && (
                    <div
                        className="animate-fade-in mb-5 border-2 rounded-2xl p-6"
                        style={{
                            background: isCorrect(result) ? 'rgba(0,230,118,0.08)' : 'rgba(255,82,82,0.08)',
                            borderColor: isCorrect(result) ? 'rgba(0,230,118,0.4)' : 'rgba(255,82,82,0.4)',
                        }}
                    >
                        <p
                            className="font-display font-bold text-xl mb-3"
                            style={{ color: isCorrect(result) ? '#00e676' : '#ff5252' }}
                        >
                            {isCorrect(result) ? '✅ Correct! Case evidence confirmed!' : '❌ Incorrect — review the evidence!'}
                        </p>
                        <p className="font-body text-base leading-relaxed mb-3" style={{ color: 'var(--text-primary)', opacity: 0.9 }}>
                            💡 {getExplanation(result)}
                        </p>
                        {!isCorrect(result) && getCorrectAnswer(result) && (
                            <div className="bg-cyber-green/10 border border-cyber-green/30 rounded-xl px-4 py-3">
                                <p className="font-mono text-sm text-cyber-green">
                                    ✓ Correct answer: <span className="font-bold">{getCorrectAnswer(result)}</span>
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {/* Next / Try again */}
                {result && (
                    <div className="flex justify-between items-center animate-fade-in">
            <span className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
              {isMissionDone(result)
                  ? '// Investigation complete'
                  : isCorrect(result)
                      ? `// Clue ${stepNum} solved — next evidence`
                      : '// Re-examine the evidence'}
            </span>
                        {isCorrect(result) ? (
                            <button
                                onClick={nextStep}
                                className="px-8 py-4 rounded-xl font-display font-black text-base tracking-widest uppercase transition-all hover:scale-105"
                                style={{
                                    background: `linear-gradient(135deg, ${accent.color}, ${accent.color}aa)`,
                                    color: '#060d18',
                                    boxShadow: `0 0 20px ${accent.glow}`,
                                }}
                            >
                                {isMissionDone(result) ? '🏁 CLOSE THE CASE →' : '🔍 NEXT CLUE →'}
                            </button>
                        ) : (
                            <button
                                onClick={nextStep}
                                className="px-8 py-4 rounded-xl font-display font-black text-base tracking-widest uppercase border-2 border-cyber-danger text-cyber-danger hover:bg-cyber-danger hover:text-white transition-all"
                            >
                                🔄 RE-EXAMINE
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
            <LevelUpBanner />

            <div className="mb-10">
                <p className="font-mono text-cyber-green text-sm mb-2">● MISSION CONTROL — CLASSIFIED</p>
                <h1 className="font-display font-black text-5xl mb-3" style={{ color: 'var(--text-primary)' }}>
                    🕵️ Active <span className="text-gradient-green">Investigations</span>
                </h1>
                <p className="font-body text-lg" style={{ color: 'var(--text-secondary)' }}>
                    Each mission is a real-world cyber case. Read the briefing, investigate the evidence, and close the case.
                </p>
            </div>

            {error && (
                <div className="bg-cyber-danger/10 border-2 border-cyber-danger/40 rounded-xl px-5 py-4 text-cyber-danger font-body text-sm mb-6">
                    ⚠ {error}
                </div>
            )}

            <div className="grid grid-cols-2 gap-5">
                {MISSIONS.map((mission, i) => {
                    const userLevel = user?.level ?? 0
                    const locked    = userLevel < mission.levelRequired
                    const accent    = ACCENT_COLORS[mission.color]
                    const threat    = THREAT_COLORS[mission.briefing.threat]

                    return (
                        <div
                            key={mission.id}
                            className="rounded-2xl overflow-hidden transition-all duration-200 animate-fade-in"
                            style={{
                                background: 'var(--bg-card)',
                                border: `1px solid ${locked ? 'var(--border-dim)' : accent.border}`,
                                opacity: locked ? 0.55 : 1,
                                animationDelay: `${i * 0.1}s`,
                                boxShadow: locked ? 'none' : `0 0 30px ${accent.glow}08`,
                            }}
                        >
                            {/* Mission banner */}
                            <div
                                className="px-6 py-4 flex items-center justify-between"
                                style={{
                                    background: locked ? 'var(--bg-main)' : `${accent.color}10`,
                                    borderBottom: `1px solid ${locked ? 'var(--border-dim)' : accent.border}`,
                                }}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-3xl">{locked ? '🔒' : mission.icon}</span>
                                    <div>
                                        <p
                                            className="font-mono text-xs tracking-widest"
                                            style={{ color: locked ? 'var(--text-muted)' : accent.color }}
                                        >
                                            {locked ? `LOCKED — LEVEL ${mission.levelRequired} REQUIRED` : '● AVAILABLE'}
                                        </p>
                                        <p className="font-display font-black text-xl" style={{ color: 'var(--text-primary)' }}>
                                            {mission.title}
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className="shrink-0 px-3 py-1.5 rounded-lg font-mono text-xs font-bold"
                                    style={{ background: threat.bg, border: `1px solid ${threat.border}`, color: threat.text }}
                                >
                                    {mission.briefing.threat}
                                </div>
                            </div>

                            {/* Mission body */}
                            <div className="p-6">
                                <p className="font-body text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                                    {mission.briefing.intro.split('\n\n')[0]}
                                </p>

                                <div className="flex items-center gap-4 mb-5">
                  <span
                      className="font-mono text-xs px-2.5 py-1 rounded-lg"
                      style={{
                          background: `${accent.color}15`,
                          color: accent.color,
                          border: `1px solid ${accent.border}`,
                      }}
                  >
                    {mission.briefing.category}
                  </span>
                                    <span className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
                    {mission.steps} STEPS
                  </span>
                                    <span className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
                    +{mission.steps * 10} XP
                  </span>
                                </div>

                                {!locked && (
                                    <button
                                        onClick={() => openBriefing(mission)}
                                        className="w-full py-3.5 rounded-xl font-display font-black text-sm tracking-widest uppercase transition-all hover:scale-[1.02]"
                                        style={{
                                            background: `linear-gradient(135deg, ${accent.color}, ${accent.color}88)`,
                                            color: '#060d18',
                                            boxShadow: `0 0 20px ${accent.glow}`,
                                        }}
                                    >
                                        📋 READ BRIEFING & ACCEPT
                                    </button>
                                )}

                                {locked && (
                                    <div
                                        className="w-full py-3.5 rounded-xl font-display font-bold text-sm tracking-widest uppercase text-center"
                                        style={{
                                            background: 'var(--bg-main)',
                                            border: '1px solid var(--border-dim)',
                                            color: 'var(--text-muted)',
                                        }}
                                    >
                                        🔒 REACH LEVEL {mission.levelRequired} TO UNLOCK
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}