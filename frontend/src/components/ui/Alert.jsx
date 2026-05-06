const VARIANTS = {
    success: 'bg-cyber-green/5  border-l-cyber-green  text-green-200',
    danger:  'bg-cyber-danger/5 border-l-cyber-danger text-red-200',
    info:    'bg-cyber-cyan/5   border-l-cyber-cyan   text-cyan-200',
    warning: 'bg-cyber-amber/5  border-l-cyber-amber  text-amber-200',
}

export default function Alert({ children, variant = 'info', className = '' }) {
    return (
        <div className={`border-l-4 px-4 py-3 rounded text-sm leading-relaxed ${VARIANTS[variant]} ${className}`}>
            {children}
        </div>
    )
}