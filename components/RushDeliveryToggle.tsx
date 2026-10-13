'use client';

import { useState } from 'react';

interface RushDeliveryToggleProps {
  onChange: (enabled: boolean) => void;
  initialEnabled?: boolean;
}

export default function RushDeliveryToggle({
  onChange,
  initialEnabled = false,
}: RushDeliveryToggleProps) {
  const [enabled, setEnabled] = useState<boolean>(initialEnabled);

  const handleToggle = () => {
    const newEnabled = !enabled;
    setEnabled(newEnabled);
    onChange(newEnabled);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
        Rush Delivery
      </label>

      <button
        type="button"
        onClick={handleToggle}
        className={`
          flex flex-col gap-3 p-5 rounded-lg border-2 transition-all text-left
          ${
            enabled
              ? 'border-zinc-950 dark:border-zinc-50 bg-zinc-50 dark:bg-zinc-800'
              : 'border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-600'
          }
        `}
        aria-pressed={enabled}
        aria-label="Toggle Rush Delivery"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                ${
                  enabled
                    ? 'bg-zinc-950 dark:bg-zinc-50'
                    : 'bg-zinc-300 dark:bg-zinc-600'
                }
              `}
            >
              <span
                className={`
                  inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                  ${enabled ? 'translate-x-6' : 'translate-x-1'}
                `}
              />
            </div>
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              Enable Rush Delivery
            </h3>
          </div>

          {enabled && (
            <span className="text-xs font-semibold text-zinc-950 dark:text-zinc-50 bg-zinc-200 dark:bg-zinc-700 px-2 py-1 rounded">
              ACTIVE
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2 ml-14">
          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-zinc-700 dark:text-zinc-300"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm text-zinc-700 dark:text-zinc-300">
              <span className="font-semibold">20% surcharge</span> on subtotal
            </span>
          </div>

          <div className="flex items-center gap-2">
            <svg
              className="w-4 h-4 text-zinc-700 dark:text-zinc-300"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="text-sm text-zinc-700 dark:text-zinc-300">
              <span className="font-semibold">30% faster delivery</span>
            </span>
          </div>
        </div>

        <p className="text-xs text-zinc-500 dark:text-zinc-400 ml-14">
          Expedite your project timeline with priority development and accelerated delivery
        </p>
      </button>
    </div>
  );
}
