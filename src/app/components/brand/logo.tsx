"use client"

interface OrbisLogoProps {
  size?: string;
  className?: string;
}

export function OrbisLogo({ size = "size-6", className = "" }: OrbisLogoProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none">
      <polygon
        points="50,32 68,50 50,68 32,50"
        stroke="#00F9FF"
        strokeWidth="1.5"
        opacity="1"
      />

      <ellipse
        cx="50"
        cy="50"
        rx="26"
        ry="12"
        stroke="#00F9FF"
        strokeWidth="1.6"
        opacity="0.8"
      />

      <circle cx="50" cy="50" r="4" fill="#00F9FF" />
    </svg>
  );
}