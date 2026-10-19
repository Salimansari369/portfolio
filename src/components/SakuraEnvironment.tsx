import React from 'react';

interface SakuraEnvironmentProps {
  reducedMotion: boolean;
}

const PETALS = [
  { id: 1, left: '7%', delay: '0s', duration: '14s', size: 13 },
  { id: 2, left: '18%', delay: '3.2s', duration: '17s', size: 10 },
  { id: 3, left: '31%', delay: '1.4s', duration: '15s', size: 14 },
  { id: 4, left: '46%', delay: '5.5s', duration: '18s', size: 11 },
  { id: 5, left: '59%', delay: '2.1s', duration: '16s', size: 12 },
  { id: 6, left: '73%', delay: '4.3s', duration: '15.5s', size: 14 },
  { id: 7, left: '86%', delay: '0.8s', duration: '16.5s', size: 11 },
  { id: 8, left: '93%', delay: '6.2s', duration: '19s', size: 10 },
];

export const SakuraEnvironment: React.FC<SakuraEnvironmentProps> = ({ reducedMotion }) => {
  if (reducedMotion) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-30"
      aria-hidden="true"
    >
      {PETALS.map((petal) => (
        <div
          key={petal.id}
          style={{
            position: 'absolute',
            top: '-24px',
            left: petal.left,
            width: `${petal.size}px`,
            height: `${petal.size}px`,
            animationName: 'petalFall',
            animationDuration: petal.duration,
            animationDelay: petal.delay,
            animationIterationCount: 'infinite',
            animationTimingFunction: 'linear',
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full opacity-75">
            <path
              d="M12 2C7.5 5.5 5 10.5 6.5 15.5C8 20.5 12 22 12 22C12 22 16 20.5 17.5 15.5C19 10.5 16.5 5.5 12 2ZM12 6.5C13 8 12 10 12 10C12 10 11 8 12 6.5Z"
              fill="url(#petalGrad)"
            />
            <defs>
              <linearGradient id="petalGrad" x1="6" y1="2" x2="18" y2="22" gradientUnits="userSpaceOnUse">
                <stop stopColor="#ffc4d6" />
                <stop offset="1" stopColor="#ff8fb1" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      ))}
    </div>
  );
};
