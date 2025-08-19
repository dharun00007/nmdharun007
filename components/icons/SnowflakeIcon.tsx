import React from 'react';

export const SnowflakeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <line x1="12" y1="2" x2="12" y2="22" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
    <line x1="19.07" y1="19.07" x2="4.93" y2="4.93" />
  </svg>
);
