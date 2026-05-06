export default function Card({ children, className = '', glow = false, cyan = false }) {
    return (
        <div className={`
      bg-cyber-card border rounded-xl p-6 transition-colors duration-200
      ${cyan
            ? 'border-cyber-cyan/20 hover:border-cyber-cyan/40'
            : 'border-cyber-green/10 hover:border-cyber-green/35'}
      ${glow ? 'shadow-[0_0_20px_rgba(0,255,136,0.1)]' : ''}
      ${className}
    `}>
            {children}
        </div>
    )
}