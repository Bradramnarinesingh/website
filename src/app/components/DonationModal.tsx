'use client';

import { useEffect } from 'react';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
}

export default function DonationModal({ isOpen, onClose, amount }: DonationModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="donation-modal-overlay" onClick={onClose}>
      <div className="donation-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="donation-modal-close" onClick={onClose}>
          ×
        </button>
        <div className="donation-modal-iframe-container">
          <iframe
            src={`https://www.zeffy.com/embed/donation-form/one-of-the-hundred?modal=true&amount=${amount}`}
            title="Donation Form"
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
