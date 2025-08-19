
import React from 'react';

export const HarvestIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M12 2v5" />
    <path d="M12 17v5" />
    <path d="M22 12H2" />
    <path d="M17 2l-5 5-5-5" />
    <path d="M7 22l5-5 5 5" />
    <path d="M2 7l5 5-5 5" />
    <path d="M22 17l-5-5 5-5" />
  </svg>
);
