import React from 'react';
import ReactDOM from 'react-dom';
import { usePalletContext } from '../../PalletContext';
import './modal.css'

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const { theme } = usePalletContext();
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={`modal-overlay ${theme}`}>
      <div className="modal-content">
        <h2 className="modal-title">{title}
          <button onClick={onClose} className="modal-close-button">Cancel</button>
        </h2>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;