import { Logo } from '@/components/ui/logo'
import { Spinner } from '@/components/ui/spinner'

export function Splash() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-500">
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
          <Logo size={80} className="relative z-10" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-xl font-semibold tracking-tight text-foreground/80">
            Vexis Log
          </h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Spinner className="size-4" />
            <span>Loading workspace...</span>
          </div>
        </div>
      </div>
    </div>
  )
}
