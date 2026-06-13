interface BlobProps {
  color: string;
  face?: boolean;
}

export function Blob({ color, face = true }: BlobProps) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <path
        d="M50 8 C70 8 88 22 90 45 C92 68 78 90 50 92 C24 94 8 74 9 48 C10 24 30 8 50 8 Z"
        fill={color}
      />
      {face && (
        <g fill="#1e293b">
          <circle cx="40" cy="52" r="3.2" />
          <circle cx="60" cy="52" r="3.2" />
          <path d="M42 62 Q50 68 58 62" stroke="#1e293b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </g>
      )}
    </svg>
  );
}
