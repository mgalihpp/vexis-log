import type { SVGProps } from "react";
import { cn } from "@/lib/utils";

interface LogoProps extends SVGProps<SVGSVGElement> {
    className?: string;
    size?: number | string;
}

export function Logo({ className, size = 32, ...props }: LogoProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            width={size}
            height={size}
            className={cn("text-primary", className)}
            fill="none"
            {...props}
        >
            <defs>
                <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="currentColor" />
                    <stop offset="100%" stopColor="#2563EB" /> {/* Blue-600 equivalent fallback */}
                </linearGradient>
            </defs>

            {/* Abstract V shape with trading chart influence */}
            <path
                d="M6 8L16 28L26 8"
                stroke="url(#logo-gradient)"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-20"
            />

            {/* Main defined shape */}
            <path
                d="M9 10L16 24L23 10"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {/* Accent dot aimed at growth/top-right */}
            <circle cx="23" cy="10" r="2" fill="currentColor" />
        </svg>
    );
}
