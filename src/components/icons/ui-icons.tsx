import type { SVGProps } from 'react';

/**
 * IBM-style UI icons, hand-drawn on a 32x32 grid: 2px stroke, square caps,
 * 2px corner radius, rounded exterior / 90-degree interior. They are
 * monochromatic and inherit the current text color (`currentColor`), so they
 * adapt to both themes. Pass `size`, `className`, `aria-label`, etc.
 */
export type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base(size: number | undefined, props: SVGProps<SVGSVGElement>) {
  const s = size ?? 32;
  return {
    width: s,
    height: s,
    viewBox: '0 0 32 32',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'square' as const,
    strokeLinejoin: 'miter' as const,
    'aria-hidden': props['aria-label'] ? undefined : true,
    role: props['aria-label'] ? 'img' : undefined,
    ...props,
  };
}

export function Analytics({ size, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}><line x1="6" y1="26" x2="26" y2="26"/><rect x="8" y="16" width="3.5" height="8" fill="currentColor" stroke="none"/><rect x="14.25" y="11" width="3.5" height="13" fill="currentColor" stroke="none"/><rect x="20.5" y="7" width="3.5" height="17" fill="currentColor" stroke="none"/></svg>
  );
}

export function Growth({ size, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}><polyline points="5,22 13,14 18,19 27,8"/><polyline points="21,8 27,8 27,14"/></svg>
  );
}

export function Portfolio({ size, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}><rect x="5" y="10" width="22" height="16" rx="1"/><path d="M12 10 V8 a1 1 0 0 1 1-1 h6 a1 1 0 0 1 1 1 V10"/></svg>
  );
}

export function Document({ size, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}><path d="M9 4 h9 l5 5 v19 h-14 Z"/><polyline points="18,4 18,9 23,9"/><line x1="12" y1="15" x2="20" y2="15"/><line x1="12" y1="19" x2="20" y2="19"/><line x1="12" y1="23" x2="17" y2="23"/></svg>
  );
}

export function Shield({ size, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}><path d="M16 4 l10 4 v7 c0 7 -5 11 -10 13 c-5 -2 -10 -6 -10 -13 V8 Z"/><polyline points="11,16 15,20 21,12"/></svg>
  );
}

export function Search({ size, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}><circle cx="14" cy="14" r="8"/><line x1="20" y1="20" x2="27" y2="27"/></svg>
  );
}

export function Settings({ size, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}><circle cx="16" cy="16" r="4"/><path d="M16 3 v3 M16 26 v3 M3 16 h3 M26 16 h3 M6.7 6.7 l2.1 2.1 M23.2 23.2 l2.1 2.1 M6.7 25.3 l2.1 -2.1 M23.2 8.8 l2.1 -2.1"/></svg>
  );
}

export function User({ size, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}><circle cx="16" cy="11" r="5"/><path d="M6 27 c0 -6 4.5 -9 10 -9 c5.5 0 10 3 10 9"/></svg>
  );
}

export function Globe({ size, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}><circle cx="16" cy="16" r="11"/><line x1="5" y1="16" x2="27" y2="16"/><ellipse cx="16" cy="16" rx="5" ry="11"/></svg>
  );
}

export function Lock({ size, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}><rect x="7" y="14" width="18" height="13" rx="1"/><path d="M11 14 V10 a5 5 0 0 1 10 0 V14"/><line x1="16" y1="19" x2="16" y2="22"/></svg>
  );
}

export function Mail({ size, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}><rect x="4" y="7" width="24" height="18" rx="1"/><polyline points="4,9 16,18 28,9"/></svg>
  );
}

export function Calendar({ size, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}><rect x="5" y="7" width="22" height="20" rx="1"/><line x1="5" y1="12" x2="27" y2="12"/><line x1="11" y1="4" x2="11" y2="9"/><line x1="21" y1="4" x2="21" y2="9"/></svg>
  );
}

export function Time({ size, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}><circle cx="16" cy="16" r="11"/><polyline points="16,9 16,16 21,19"/></svg>
  );
}

export function Download({ size, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}><line x1="16" y1="5" x2="16" y2="21"/><polyline points="9,15 16,22 23,15"/><polyline points="6,26 26,26"/></svg>
  );
}

export function Upload({ size, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}><line x1="16" y1="27" x2="16" y2="11"/><polyline points="9,17 16,10 23,17"/><polyline points="6,6 26,6"/></svg>
  );
}

export function Filter({ size, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}><polygon points="5,7 27,7 19,16 19,25 13,28 13,16"/></svg>
  );
}

export function Data({ size, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}><ellipse cx="16" cy="8" rx="10" ry="4"/><path d="M6 8 v8 c0 2.2 4.5 4 10 4 s10 -1.8 10 -4 V8"/><path d="M6 16 v8 c0 2.2 4.5 4 10 4 s10 -1.8 10 -4 V16"/></svg>
  );
}

export function ChartPie({ size, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}><path d="M16 4 a12 12 0 1 0 12 12 H16 Z"/><path d="M16 4 V16 H28 A12 12 0 0 0 16 4 Z"/></svg>
  );
}

export function Idea({ size, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}><path d="M16 4 a9 9 0 0 1 6 15 c-1 1 -1.5 2 -1.5 3.5 h-9 c0 -1.5 -.5 -2.5 -1.5 -3.5 a9 9 0 0 1 6 -15 Z"/><line x1="12.5" y1="27" x2="19.5" y2="27"/><line x1="14" y1="30" x2="18" y2="30"/></svg>
  );
}

export function Link({ size, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}><path d="M13 19 l6 -6"/><path d="M11 15 l-3 3 a4.2 4.2 0 0 0 6 6 l3 -3"/><path d="M21 17 l3 -3 a4.2 4.2 0 0 0 -6 -6 l-3 3"/></svg>
  );
}

export function Checkmark({ size, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}><circle cx="16" cy="16" r="12"/><polyline points="10,16 14,20 22,12"/></svg>
  );
}

export function Warning({ size, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}><path d="M16 5 L29 27 H3 Z" strokeLinejoin="round"/><line x1="16" y1="13" x2="16" y2="20"/><rect x="15" y="22.5" width="2" height="2" fill="currentColor" stroke="none"/></svg>
  );
}

export function Add({ size, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}><circle cx="16" cy="16" r="12"/><line x1="16" y1="10" x2="16" y2="22"/><line x1="10" y1="16" x2="22" y2="16"/></svg>
  );
}

export function ArrowRight({ size, ...props }: IconProps) {
  return (
    <svg {...base(size, props)}><line x1="5" y1="16" x2="26" y2="16"/><polyline points="19,9 26,16 19,23"/></svg>
  );
}


import type { ComponentType } from 'react';
export interface IconEntry { name: string; Comp: ComponentType<IconProps>; }
export const ICON_LIBRARY: { category: string; icons: IconEntry[] }[] = [
  { category: 'Navigation', icons: [{ name: 'Arrow right', Comp: ArrowRight }, { name: 'Search', Comp: Search }, { name: 'Filter', Comp: Filter }, { name: 'Link', Comp: Link }, { name: 'Settings', Comp: Settings }, { name: 'User', Comp: User }] },
  { category: 'Action', icons: [{ name: 'Add', Comp: Add }, { name: 'Download', Comp: Download }, { name: 'Upload', Comp: Upload }, { name: 'Checkmark', Comp: Checkmark }, { name: 'Warning', Comp: Warning }, { name: 'Time', Comp: Time }] },
  { category: 'Object', icons: [{ name: 'Document', Comp: Document }, { name: 'Portfolio', Comp: Portfolio }, { name: 'Mail', Comp: Mail }, { name: 'Calendar', Comp: Calendar }, { name: 'Lock', Comp: Lock }, { name: 'Shield', Comp: Shield }] },
  { category: 'Concept', icons: [{ name: 'Analytics', Comp: Analytics }, { name: 'Growth', Comp: Growth }, { name: 'Data', Comp: Data }, { name: 'Chart pie', Comp: ChartPie }, { name: 'Globe', Comp: Globe }, { name: 'Idea', Comp: Idea }] },
];
