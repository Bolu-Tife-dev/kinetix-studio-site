import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function KinetixMark({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} {...props}>
      <defs>
        <linearGradient id="kx-g" x1="4" y1="2" x2="28" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#C084FC" />
          <stop offset="0.55" stopColor="#A855F7" />
          <stop offset="1" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
      <rect x="1.25" y="1.25" width="29.5" height="29.5" rx="8.5" stroke="url(#kx-g)" strokeWidth="1.5" />
      <path
        d="M10.5 8.25v15.5"
        stroke="url(#kx-g)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M21.9 8.5 12.4 15.7c-.45.35-.45 1.05 0 1.4l9.5 7.2"
        stroke="url(#kx-g)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="23.4" cy="16" r="2.1" fill="#22D3EE" />
    </svg>
  );
}

export function WindowsIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M3 5.6 10.1 4.6v6.9H3V5.6Zm8.2-1.2L21 3v8.5h-9.8V4.4ZM3 12.5h7.1v6.9L3 18.4v-5.9Zm8.2 0H21V21l-9.8-1.4v-7.1Z" />
    </svg>
  );
}

export function GithubIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
    </svg>
  );
}

export function AppleIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M16.365 1.43c0 1.14-.47 2.25-1.23 3.06-.87.94-2.3 1.67-3.45 1.58-.13-1.1.42-2.28 1.16-3.05.83-.87 2.3-1.53 3.52-1.59ZM20.7 17.4c-.6 1.4-.9 2.02-1.67 3.26-1.08 1.73-2.6 3.88-4.48 3.9-1.67.02-2.1-1.09-4.37-1.08-2.27.01-2.74 1.1-4.41 1.08-1.88-.02-3.32-1.96-4.4-3.69C-1.6 17.9-1.94 12.2.98 9.2c1.37-1.42 3.3-2.31 5.16-2.31 1.88 0 3.06 1.03 4.61 1.03 1.5 0 2.42-1.03 4.6-1.03 1.64 0 3.38.9 4.62 2.45-4.06 2.23-3.4 8.03.73 8.06Z" />
    </svg>
  );
}

export function LinuxIcon({ className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} {...props}>
      <path
        d="M12 2.2c-2.6 0-4.2 2-4.2 4.9 0 1.9.2 3.1-.5 4.6-.8 1.6-2.3 3.4-2.3 5.6 0 .9.2 1.7.6 2.3.5-.7 1.3-1.1 2.2-1.1 1 0 1.7.5 2.4 1.2.7.8 1.4 1.6 2.6 1.6s1.9-.8 2.6-1.6c.7-.7 1.4-1.2 2.4-1.2.9 0 1.7.4 2.2 1.1.4-.6.6-1.4.6-2.3 0-2.2-1.5-4-2.3-5.6-.7-1.5-.5-2.7-.5-4.6 0-2.9-1.6-4.9-4.2-4.9Z"
        fill="currentColor"
      />
      <ellipse cx="10" cy="6.9" rx="1.05" ry="1.35" fill="#09090b" />
      <ellipse cx="14" cy="6.9" rx="1.05" ry="1.35" fill="#09090b" />
      <circle cx="10.05" cy="7.05" r="0.42" fill="currentColor" />
      <circle cx="14.05" cy="7.05" r="0.42" fill="currentColor" />
      <path
        d="M12 10.6c.85 0 1.55.5 1.55 1.1 0 .42-.28.78-.7.95l.55 1.75h-2.8l.55-1.75c-.42-.17-.7-.53-.7-.95 0-.6.7-1.1 1.55-1.1Z"
        fill="#09090b"
      />
    </svg>
  );
}
