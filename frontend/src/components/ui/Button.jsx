export default function Button({
                                   children, variant = 'primary', size = 'md',
                                   className = '', disabled, onClick, type = 'button'
                               }) {
    const base = 'inline-flex items-center justify-content gap-2 font-display font-semibold uppercase tracking-widest rounded transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed border'

    const variants = {
        primary:   'border-cyber-green   text-cyber-green   hover:bg-cyber-green   hover:text-cyber-bg hover:shadow-[0_0_20px_rgba(0,255,136,0.3)]',
        secondary: 'border-cyber-cyan    text-cyber-cyan    hover:bg-cyber-cyan    hover:text-cyber-bg hover:shadow-[0_0_20px_rgba(0,212,255,0.3)]',
        danger:    'border-cyber-danger  text-cyber-danger  hover:bg-cyber-danger  hover:text-white',
        ghost:     'border-cyber-muted   text-cyber-secondary hover:border-cyber-secondary hover:text-white',
        amber:     'border-cyber-amber   text-cyber-amber   hover:bg-cyber-amber   hover:text-cyber-bg',
    }

    const sizes = {
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-6 py-2.5 text-sm',
        lg: 'px-8 py-3 text-base',
    }

    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
        >
            {children}
        </button>
    )
}