import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface ToastProps {
  type: 'success' | 'error';
  message: string;
  subMessage?: string;
  duration?: number;
  onClose: () => void;
  showCheckoutButton?: boolean;
}

const Toast: React.FC<ToastProps> = ({ 
  type, 
  message, 
  subMessage, 
  duration = 3000, 
  onClose, 
  showCheckoutButton = false 
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => prev - (100 / (duration / 50))); // Update progress bar
    }, 50);

    const timeout = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, duration);

    return () => {
      clearInterval(timer);
      clearTimeout(timeout);
    };
  }, [duration, onClose]);

  if (!isVisible) return null;

  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';

  return (
    <div className={`relative fixed top-4 right-4 ${bgColor} text-white px-4 py-2 rounded shadow-lg max-w-xs w-80`}>
      <p className="font-bold truncate">{message}</p>
      {subMessage && <p className="text-sm mt-1 truncate">{subMessage}</p>}
      {showCheckoutButton && (
        <Link href="/cart">
          <button className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full">
            Checkout
          </button>
        </Link>
      )}
      <div 
        className="absolute bottom-0 left-0 h-1 rounded-b"
        style={{ width: `${progress}%`, backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
      >
        <div className="h-full" style={{ backgroundColor: `${bgColor}` }} />
      </div>
    </div>
  );
};

export default Toast;
