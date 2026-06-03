import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Edingrad — Investment Advisory';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#161616',
          padding: '72px',
          color: '#ffffff',
          fontFamily: 'Georgia, serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 20, height: 20, borderRadius: 20, background: '#78a9ff' }} />
          <div style={{ fontSize: 30, letterSpacing: 6, color: '#78a9ff', fontFamily: 'sans-serif' }}>
            INVESTMENT ADVISORY · DUBAI
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 132, lineHeight: 1, fontWeight: 700 }}>Edingrad</div>
          <div style={{ fontSize: 40, color: '#c6c6c6', marginTop: 20, fontFamily: 'sans-serif' }}>
            Property, advised like a portfolio.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
