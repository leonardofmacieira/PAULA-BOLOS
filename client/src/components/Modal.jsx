import React from "react";

const Modal = ({ open, onClose, children }) => {
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto relative transform transition-transform duration-300 scale-100">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold leading-none w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
          onClick={onClose}
          aria-label="Fechar"
        >
          ×
        </button>
        <div className="pt-2">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;

// Adicione as animações no seu CSS global (ex: index.css):
// .animate-fadeIn { animation: fadeIn 0.3s; }
// @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
// .animate-modalPop { animation: modalPop 0.3s; }
// @keyframes modalPop { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
