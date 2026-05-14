import { Link } from 'react-router-dom'
import Badge from '../components/ui/Badge'

const CATEGORIES = [
    {
        id: 1, icon: '✉', name: 'Spot the Phishing', diff: 'BEGINNER', color: 'amber',
        desc: 'Analyze suspicious emails and determine if they are legitimate, spam, or dangerous phishing attempts targeting your credentials.',
        skills: ['Email Analysis', 'Social Engineering', 'Sender Verification'],
    },
    {
        id: 2, icon: '🔐', name: 'Build a Strong Password', diff: 'BEGINNER', color: 'green',
        desc: 'Learn what makes passwords uncrackable. Understand entropy, common attacks, and best practices for credential security.',
        skills: ['Entropy', 'Brute Force Defense', 'Password Managers'],
    },
    {
        id: 3, icon: '⚠', name: 'Detect Malware', diff: 'INTERMEDIATE', color: 'red',
        desc: 'Decide whether files, downloads, and system behaviors are safe or indicators of infection. Identify ransomware, trojans, and spyware.',
        skills: ['File Analysis', 'Behavioral Detection', 'Safe Downloading'],
    },
    {
        id: 4, icon: '🌐', name: 'Fake Website Checker', diff: 'ADVANCED', color: 'cyan',
        desc: 'Inspect URLs, SSL certificates, and page layouts to identify fraudulent websites designed to steal your credentials.',
        skills: ['URL Analysis', 'SSL Certificates', 'Domain Spoofing'],
    },
]

const DIFF_BADGE  = { BEGINNER: 'green', INTERMEDIATE: 'amber', ADVANCED: 'red' }
const LEFT_ACCENT = { amber: 'border-l-cyber-amber', green: 'border-l-cyber-green', red: 'border-l-cyber-danger', cyan: 'border-l-cyber-cyan' }
const BTN_STYLE   = {
    green: 'border-cyber-green  text-cyber-green  hover:bg-cyber-green  hover:text-cyber-bg hover:shadow-[0_0_20px_rgba(0,255,136,0.3)]',
    amber: 'border-cyber-amber  text-cyber-amber  hover:bg-cyber-amber  hover:text-cyber-bg',
    red:   'border-cyber-danger text-cyber-danger hover:bg-cyber-danger hover:text-white',
    cyan:  'border-cyber-cyan   text-cyber-cyan   hover:bg-cyber-cyan   hover:text-cyber-bg hover:shadow-[0_0_20px_rgba(0,212,255,0.3)]',
}

export default function CategoriesPage() {
    return (
        <div className="max-w-6xl mx-auto px-6 py-10 pb-20 animate-fade-in">

            <div className="mb-8">
                <p className="font-mono text-cyber-green text-sm mb-2">●  SELECT CHALLENGE</p>
                <h1 className="font-display font-bold text-3xl tracking-wide text-[color:var(--text-primary)]">CHALLENGE CATEGORIES</h1>
            </div>

            <div className="flex flex-col gap-5">
                {CATEGORIES.map((cat, i) => (
                    <div
                        key={cat.id}
                        className={`
              flex items-center gap-6 bg-cyber-card border-l-4 border border-cyber-green/10
              hover:border-cyber-green/30 rounded-xl p-6 transition-all duration-200
              animate-fade-in ${LEFT_ACCENT[cat.color]}
            `}
                        style={{ animationDelay: `${i * 0.08}s` }}
                    >
                        {/* Icon */}
                        <div className="w-16 h-16 shrink-0 flex items-center justify-center bg-[color:var(--bg-card-mission)] rounded-xl text-3xl">
                            {cat.icon}
                        </div>

                        {/* Body */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                                <h2 className="font-display font-bold text-xl tracking-wide text-[color:var(--text-primary)]">{cat.name}</h2>
                                <Badge variant={DIFF_BADGE[cat.diff]}>{cat.diff}</Badge>
                            </div>
                            <p className="text-cyber-secondary text-sm leading-relaxed mb-3">{cat.desc}</p>
                            <div className="flex gap-2 flex-wrap">
                                {cat.skills.map(s => (
                                    <span key={s} className="font-mono text-[10px] text-cyber-muted border border-cyber-muted/30 rounded px-2 py-0.5">
                    {s}
                  </span>
                                ))}
                            </div>
                        </div>

                        {/* CTA */}
                        <Link
                            to={`/game/${cat.id}`}
                            className={`
                shrink-0 px-5 py-2 font-display font-semibold text-sm tracking-widest uppercase
                border rounded-lg transition-all duration-150 no-underline
                ${BTN_STYLE[cat.color]}
              `}
                        >
                            START →
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}