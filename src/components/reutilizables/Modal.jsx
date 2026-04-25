import React from 'react';
import { X } from 'lucide-react';
import Boton from './Boton';

const Modal = ({ isOpen, onClose, titulo, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>{titulo}</h3>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
        <div className="modal-footer">
          <Boton onClick={onClose}>Cerrar</Boton>
        </div>
      </div>
    </div>
  );
};

export default Modal;
