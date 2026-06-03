'use client';

import { useTheme } from '@/lib/theme';

export function ThemeToggle() {
  const { toggle } = useTheme();
  return (
    <button type="button" className="hbtn" id="themeBtn" aria-label="Toggle light or dark theme" onClick={toggle}>
      <svg className="ic ic-sun" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="4.2" />
        <path d="M12 2v2.4M12 19.6V22M2 12h2.4M19.6 12H22M4.9 4.9l1.7 1.7M17.4 17.4l1.7 1.7M19.1 4.9l-1.7 1.7M6.6 17.4l-1.7 1.7" />
      </svg>
      <svg className="ic ic-moon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.5 14.3A8 8 0 1 1 9.7 3.5a6.4 6.4 0 0 0 10.8 10.8z" />
      </svg>
    </button>
  );
}
