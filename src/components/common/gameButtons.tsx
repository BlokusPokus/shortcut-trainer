import React from 'react';
import { LucideIcon } from 'lucide-react';

interface GameButtonProps {
  onClick: () => void;
  disabled: boolean;
  Icon: LucideIcon;
  className?: string;
}

export const GameButton: React.FC<GameButtonProps> = ({
  onClick,
  disabled,
  Icon,
  className = '',
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`p-1.5 bg-transparent border-none hover:text-highlight transition-colors
              disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
  >
    <Icon />
  </button>
);
