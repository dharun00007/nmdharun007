import React from 'react';

export const CloudRainIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M20 16.2A4.5 4.5 0 0 0 17.5 8h-1.8A7 7 0 1 0 4 14.9" />
    <line x1="8" y1="18" x2="8" y2="22" />
    <line x1="12" y1="20" x2="12" y2="24" />
    <line x1="16" y1="18" x2="16" y2="22" />
  </svg>
);
