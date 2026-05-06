export default function ProgressBar({ value = 0, max = 100, color = 'green', className = '' }) {
    const pct = Math.min(Math.round((value / max) * 100), 100)
    const fills = {
        green: 'bg-cyber-green shadow-[0_0_8px_rgba(0,255,136,0.6)]',
        cyan:  'bg-cyber-cyan  shadow-[0_0_8px_rgba(0,212,255,0.6)]',
        amber: 'bg-cyber-amber',
    }
    return (
        <div className={`h-1 bg-cyber-green/15 rounded-full overflow-hidden ${className}`}>
            <div
                className={`h-full rounded-full transition-all duration-500 ${fills[color]}`}
                style={{ width: `${pct}%` }}
            />
        </div>
    )
}