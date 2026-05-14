const VARIANTS = {
    green:  'border-cyber-green  text-cyber-green',
    cyan:   'border-cyber-cyan   text-cyber-cyan',
    amber:  'border-cyber-amber  text-cyber-amber',
    red:    'border-cyber-danger text-cyber-danger',
    purple: 'border-cyber-purple text-cyber-purple',
    muted:  'border-cyber-muted  text-cyber-secondary',
}

export default function Badge({ children, variant = 'green', className = '' }) {
    return (
        <span className={`font-mono text-xs px-2 py-0.5 border rounded-sm pt-1 ${VARIANTS[variant]} ${className}`}>
      {children}
    </span>
    )
}