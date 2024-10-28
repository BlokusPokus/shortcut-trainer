import React, { useState } from 'react';
import './TimeSelector.css';
import Modal from './common/modal';
import { usePalletContext } from '../PalletContext';

interface TimeSelectorProps {
  selectedTime: number;
  onTimeSelect: (time: number) => void;
}

const TimeSelector: React.FC<TimeSelectorProps> = ({ selectedTime, onTimeSelect }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { theme, setTheme } = usePalletContext();

    const timeOptions = [
    { label: '1 min', value: 60 },
    { label: '2 min', value: 120 },
    { label: '3 min', value: 180 },
    { label: '5 min', value: 300 },
    { label: 'None', value: Infinity }, // Add infinite option

  ];

  return (
    <div className={theme}>
    <button onClick={() => setIsModalOpen(true)}>Set timer</button>

    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Set Timer">
    <div className="time-selector">
      {timeOptions.map((option) => (
        <button
          key={option.value}
          className={`time-option ${selectedTime === option.value ? 'selected' : ''}`}
          onClick={() => onTimeSelect(option.value)}
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
