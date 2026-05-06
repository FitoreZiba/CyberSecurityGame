export const LEVEL_LABELS  = ['RECRUIT', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT']
export const LEVEL_COLORS  = [
    'text-cyber-secondary',
    'text-cyber-green',
    'text-cyber-cyan',
    'text-cyber-amber',
    'text-cyber-danger',
]
export const LEVEL_BORDERS = [
    'border-cyber-muted',
    'border-cyber-green',
    'border-cyber-cyan',
    'border-cyber-amber',
    'border-cyber-danger',
]

export const getLevelLabel  = (level) => LEVEL_LABELS[Math.min(level, LEVEL_LABELS.length - 1)]
export const getLevelColor  = (level) => LEVEL_COLORS[Math.min(level, LEVEL_COLORS.length - 1)]
export const getLevelBorder = (level) => LEVEL_BORDERS[Math.min(level, LEVEL_BORDERS.length - 1)]

// XP needed to reach a level: every 100 points = 1 level
export const getXpProgress = (points) => points % 100
export const getXpToNext   = (points) => 100 - (points % 100)