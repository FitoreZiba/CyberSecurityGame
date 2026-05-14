/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx}'],
    theme: {
        extend: {
            colors: {
                cyber: {
                    bg:        'var(--bg-main)',
                    panel:     'var(--bg-panel)',
                    card:      'var(--bg-card)',
                    cardHover: 'var(--bg-card-hover)',
                    green:     '#00e676',
                    cyan:      '#18ffff',
                    amber:     '#ffd740',
                    danger:    '#ff5252',
                    purple:    '#e040fb',
                    pink:      '#ff4081',
                    blue:      '#448aff',
                    muted:     'var(--text-muted)',
                    secondary: 'var(--text-secondary)',
                }
            },
            fontFamily: {
                mono:    ['"Share Tech Mono"', 'monospace'],
                display: ['Rajdhani', 'sans-serif'],
                body:    ['"Exo 2"', 'sans-serif'],
            },
            animation: {
                'fade-in':    'fadeIn 0.4s ease both',
                'slide-in':   'slideIn 0.3s ease both',
                'pulse-glow': 'pulseGlow 2s infinite',
                'blink':      'blink 1s infinite',
                'float':      'float 3s ease-in-out infinite',
                'shimmer':    'shimmer 2s infinite',
            },
            keyframes: {
                fadeIn:    { from: { opacity: 0, transform: 'translateY(12px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
                slideIn:   { from: { opacity: 0, transform: 'translateX(-20px)' }, to: { opacity: 1, transform: 'translateX(0)' } },
                pulseGlow: { '0%,100%': { boxShadow: '0 0 8px rgba(0,230,118,0.3)' }, '50%': { boxShadow: '0 0 24px rgba(0,230,118,0.7)' } },
                blink:     { '0%,100%': { opacity: 1 }, '50%': { opacity: 0 } },
                float:     { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
                shimmer:   { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
            }
        }
    },
    plugins: []
}