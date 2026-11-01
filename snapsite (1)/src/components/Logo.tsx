import React from 'react';

interface LogoProps {
  className?: string;
  light?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', light = false }) => {
  return (
    <div className={`flex items-center gap-2.5 font-bold tracking-tight text-lg select-none ${className}`}>
      <div
        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-105 ${
          light ? 'bg-white text-[#0a1b3f]' : 'bg-[#0c2350] text-white shadow-sm'
        }`}
      >
        {/* Stylized graduation / tech shield mark */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4.5 h-4.5"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M4 12v5a8 8 0 0 0 16 0v-5" />
          <path d="M12 14v8" />
        </svg>
      </div>
      <span className={`font-semibold tracking-tight text-lg ${light ? 'text-white' : 'text-[#0c1f44]'}`}>
        Hire <span className={light ? 'text-blue-300 font-bold' : 'text-[#0c1f44] font-bold'}>Nest</span>
      </span>
    </div>
  );
};
