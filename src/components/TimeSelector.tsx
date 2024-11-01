import React, { useState } from 'react';
import './styles/TimeSelector.css';
import Modal from './common/modal';
import { usePalletContext } from '../PalletContext';
import { Timer } from 'lucide-react';

interface TimeSelectorProps {
  selectedTime: number;
  onTimeSelect: (time: number) => void;
  gameStarted: boolean;
}

const TimeSelector: React.FC<TimeSelectorProps> = ({ selectedTime, onTimeSelect, gameStarted }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleTimeSelect = (time: number) => {
        onTimeSelect(time);
        setIsModalOpen(false);
    };

    const timeOptions = [
        { label: '30 sec', value: 30 },
        { label: '1 min', value: 60 },
        { label: '2 min', value: 120 },
        { label: '3 min', value: 180 },
        { label: '5 min', value: 300 },
        { label: 'No limit', value: Infinity },
    ];

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
                    {timeOptions.map((option) => (
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
