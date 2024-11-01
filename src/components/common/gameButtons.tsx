import React from 'react';
import { LucideIcon } from 'lucide-react';

interface GameButtonProps {
    onClick: () => void;
    disabled: boolean;
    Icon: LucideIcon;
}

export const GameButton: React.FC<GameButtonProps> = ({ 
    onClick, 
    disabled, 
    Icon 
}) => (
    <button 
        onClick={onClick} 
        disabled={disabled}
        className={disabled ? 'disabled' : ''}
    >
        <Icon />
    </button>
);