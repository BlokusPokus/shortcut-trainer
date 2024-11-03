//#region Imports
// React and Third-party Libraries
import React, { useState } from 'react';
import { Timer } from 'lucide-react';
// Styles
import './styles/TimeSelector.css';
// Constants
import { TIME_OPTIONS } from './constants/timeOptions';
// Components
import Modal from './common/modal';
// Hooks and Context
import { usePalletContext } from '../PalletContext';
// Types
import { TimeSelectorProps } from './types/types';
//#endregion


const TimeSelector: React.FC<TimeSelectorProps> = ({ selectedTime, onTimeSelect, gameStarted }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleTimeSelect = (time: number) => {
        onTimeSelect(time);
        setIsModalOpen(false);
    };

    return (
        <div >
            <button 
                className={gameStarted ? 'disabled' : ''} 
                onClick={() => !gameStarted && setIsModalOpen(true)}
            >
                <Timer/>
            </button>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Set Timer">
                <div className="time-selector">
                    {TIME_OPTIONS.map((option) => (
                        <button
                            key={option.value}
                            className={`time-option ${selectedTime === option.value ? 'selected' : ''}`}
                            onClick={() => handleTimeSelect(option.value)}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </Modal>
        </div>
    );
};

export default TimeSelector;
