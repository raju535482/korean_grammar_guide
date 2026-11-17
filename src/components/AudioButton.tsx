import React, { useState } from 'react';
import { Volume2, Volume1, Eye, EyeOff } from 'lucide-react';
import { speakKorean } from '../utils/speech';

interface AudioButtonProps {
  text: string;
  speed?: 1.0 | 0.7;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  variant?: 'primary' | 'subtle' | 'ghost';
}

export const AudioButton: React.FC<AudioButtonProps> = ({
  text,
  speed = 1.0,
  label,
  size = 'md',
  className = '',
  variant = 'subtle',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) return;
    setIsPlaying(true);
    await speakKorean(text, speed);
    setIsPlaying(false);
  };

  const sizeClasses = {
    sm: 'p-1.5 text-xs',
    md: 'p-2 text-sm',
    lg: 'px-4 py-2 text-base font-semibold',
  };

  const variantClasses = {
    primary: 'bg-amber-500 hover:bg-amber-600 text-white shadow-sm active:scale-95',
    subtle: 'bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 active:scale-95',
    ghost: 'hover:bg-amber-100 text-amber-700 active:scale-95',
  };

  return (
    <button
      onClick={handlePlay}
      title={`Listen in Korean (${speed}x speed)`}
      aria-label={`Listen in Korean: ${text}`}
      className={`inline-flex items-center gap-1.5 rounded-full transition-all duration-150 cursor-pointer ${
        sizeClasses[size]
      } ${variantClasses[variant]} ${isPlaying ? 'ring-2 ring-amber-400 animate-pulse' : ''} ${className}`}
    >
      {speed === 0.7 ? <Volume1 className="w-4 h-4 shrink-0" /> : <Volume2 className="w-4 h-4 shrink-0" />}
      {label && <span>{label}</span>}
    </button>
  );
};
