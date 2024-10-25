import React from 'react';
import { usePalletContext } from '../../PalletContext';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const { theme } = usePalletContext();
  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${theme}`}>
      <div className="modal-content">
        <h2 className="modal-title">{title}</h2>
        <button onClick={onClose} className="modal-close-button">Close</button>
        {children}
      </div>
    </div>
  );
};



export default Modal;