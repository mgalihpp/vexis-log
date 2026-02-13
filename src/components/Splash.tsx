import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";

type Props = {
  zoomIn?: boolean;
  isExiting?: boolean;
};

export function Splash({ zoomIn = true, isExiting = false }: Props) {
  return (
    <div
      className={cn(
        "flex h-screen w-full flex-col items-center justify-center bg-background overflow-visible relative transition-[opacity,filter] duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
        {
          "opacity-0 blur-[3px] pointer-events-none": isExiting,
        },
      )}
    >
      <div
        className={cn(
          "flex flex-col items-center gap-6 relative z-10 transition-[transform,opacity,filter] duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform",
          {
            "animate-in fade-in zoom-in duration-500": zoomIn && !isExiting,
            "scale-110 opacity-0 blur-lg": isExiting,
          },
        )}
      >
        <div className="relative flex items-center justify-center">
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
          <Logo size={80} className="relative z-10" />

          {/* Shine effect */}
          <div
            className={cn(
              "absolute inset-0 z-20 pointer-events-none transition-[opacity,transform,filter] duration-[950ms] ease-[cubic-bezier(0.19,1,0.22,1)] will-change-transform",
              {
                "opacity-0 scale-105 blur-[3px]": isExiting,
              },
            )}
            style={{
              maskImage: 'url("/logo.png")',
              maskSize: "100% 100%",
              maskRepeat: "no-repeat",
              maskPosition: "center",
              WebkitMaskImage: 'url("/logo.png")',
              WebkitMaskSize: "100% 100%",
              WebkitMaskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              transitionDelay: isExiting ? "60ms" : "0ms",
            }}
          >
            <div className="absolute top-0 bottom-0 -left-[45%] w-[190%] animate-[logo-shimmer-sweep_2.4s_cubic-bezier(0.4,0,0.2,1)_infinite]">
              <div className="w-full h-full bg-gradient-to-r from-transparent via-white/28 to-transparent -skew-x-12" />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="relative">
            <h1 className="text-xl font-semibold tracking-tight text-foreground/80">
              Vexis Log
            </h1>
            <h1
              className={cn(
                "absolute inset-0 text-xl font-semibold tracking-tight text-transparent bg-gradient-to-r from-transparent via-white/50 to-transparent bg-clip-text bg-[length:200%_100%] animate-[text-shimmer_1.6s_linear_infinite] transition-opacity duration-[850ms] ease-[cubic-bezier(0.19,1,0.22,1)]",
                {
                  "opacity-0": isExiting,
                },
              )}
              aria-hidden="true"
            >
              Vexis Log
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
