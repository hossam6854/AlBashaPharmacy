// components/Toast.js
import { useEffect } from 'react';
import { FiCheckCircle } from 'react-icons/fi';

const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-6 bg-white shadow-xl border border-green-400 rounded-xl px-5 py-3 flex items-center gap-3 text-green-700 z-50 animate-slide-up">
      <FiCheckCircle size={20} />
      <span className="font-medium">{message}</span>
    </div>
  );
};

export default Toast;
