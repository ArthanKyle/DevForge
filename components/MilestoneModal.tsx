'use client';

import { useEffect } from 'react';

interface MilestoneModalProps {
  totalCost: number;
  currency: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function MilestoneModal({
  totalCost,
  currency,
  isOpen,
  onClose,
}: MilestoneModalProps) {
  const depositAmount = totalCost * 0.3;
  const betaAmount = totalCost * 0.4;
  const finalAmount = totalCost * 0.3;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

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

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 transition-opacity duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="milestone-modal-title"
    >
      <div
        className="relative w-full max-w-lg animate-fadeIn rounded-lg bg-white p-6 shadow-xl transition-transform duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close modal"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2
          id="milestone-modal-title"
          className="mb-6 text-2xl font-bold text-gray-900"
        >
          Payment Milestones
        </h2>

        <div className="space-y-4">
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">
                  30% Deposit
                </h3>
                <p className="text-sm text-gray-600">
                  Due upon project approval
                </p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-gray-900">
                  {currency === 'PHP' ? '₱' : '$'}
                  {formatCurrency(depositAmount)}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">
                  40% Beta Release
                </h3>
                <p className="text-sm text-gray-600">
                  Due upon beta version delivery
                </p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-gray-900">
                  {currency === 'PHP' ? '₱' : '$'}
                  {formatCurrency(betaAmount)}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">
                  30% Final Release
                </h3>
                <p className="text-sm text-gray-600">
                  Due upon final delivery
                </p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-gray-900">
                  {currency === 'PHP' ? '₱' : '$'}
                  {formatCurrency(finalAmount)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-200 pt-4">
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-gray-900">
              Total Project Cost
            </span>
            <span className="text-2xl font-bold text-blue-600">
              {currency === 'PHP' ? '₱' : '$'}
              {formatCurrency(totalCost)}
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  );
}
