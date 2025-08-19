import React from 'react';

export const LeafIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M11 20A7 7 0 0 1 4 13V8a7.99 7.99 0 0 1 14.5-2.5A4.5 4.5 0 0 1 16 9.5V13a7 7 0 0 1-5 7z" />
    <path d="M12 21a7 7 0 0 0 7-7h-4a3 3 0 0 0-3 3v4Z" />
  </svg>
);