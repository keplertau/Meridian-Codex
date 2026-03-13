import { SVGProps } from 'react';

export default function ApertureIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M14.5 3.5 A 9 9 0 1 0 20.5 9.5" />
    </svg>
  );
}
