// components/Modal.tsx
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Blurred Background */}
      <div className="absolute inset-0 backdrop-blur-md bg-black bg-opacity-80"></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-lg shadow-lg max-w-md w-full">
        {/* Header */}
        <div className="bg-orange-600 text-white p-4 rounded-t-lg flex justify-between items-center">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            className="text-white hover:text-gray-200"
            onClick={onClose}
            aria-label="Close Modal"
          >
            &times;
          </button>
        </div>
        {/* Body */}
        <div className="p-4">{children}</div>
        {/* Footer (optional) */}
        <div className="p-4 border-t text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 text-white bg-orange-600 rounded hover:bg-orange-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
