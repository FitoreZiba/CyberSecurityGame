export default function LoadingScreen({ message = 'INITIALIZING SYSTEM' }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-cyber-bg">
      <span className="font-mono text-cyber-green text-sm">
        {message}
          <span className="animate-blink">_</span>
      </span>
        </div>
    )
}