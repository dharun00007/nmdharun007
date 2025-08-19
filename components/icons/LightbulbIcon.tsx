import React from 'react';

export const LightbulbIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M15.09 14.53A6.5 6.5 0 0 1 12 22a6.5 6.5 0 0 1-3.09-8.47" />
    <path d="M9 16.05V22h6v-5.95" />
    <path d="M12 2a4.5 4.5 0 0 1 4.5 4.5c0 2.06-1.03 3.42-2.5 5.5H10c-1.47-2.08-2.5-3.44-2.5-5.5A4.5 4.5 0 0 1 12 2z" />
  </svg>
);