
import React from 'react';

export const SoilIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M2 17h20" />
    <path d="M12 2v15" />
    <path d="M7 8l-4 4 4 4" />
    <path d="M17 8l4 4-4 4" />
    <path d="M12 17a2 2 0 0 0-2 2h4a2 2 0 0 0-2-2z" />
  </svg>
);
