'use client';

import { useState } from 'react';
import RushDeliveryToggle from './RushDeliveryToggle';

export default function RushDeliveryToggleExample() {
  const [rushEnabled, setRushEnabled] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
            RushDeliveryToggle Component Example
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Toggle rush delivery to add a 20% surcharge and reduce timeline by 30%
          </p>
        </div>

        <div className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-6">
          <RushDeliveryToggle
            onChange={(enabled) => {
              setRushEnabled(enabled);
              console.log('Rush delivery enabled:', enabled);
            }}
          />
        </div>

        <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            Current State
          </h2>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-zinc-600 dark:text-zinc-400">
                Rush Delivery Enabled:
              </span>
              <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {rushEnabled ? 'Yes' : 'No'}
              </span>
            </div>
            {rushEnabled && (
              <>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">
                    Surcharge:
                  </span>
                  <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    +20%
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">
                    Timeline Reduction:
                  </span>
                  <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    30% faster
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Pricing Example
          </h2>
          <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-6 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-zinc-600 dark:text-zinc-400">
                Base + Complexity + Add-ons:
              </span>
              <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                ₱50,000
              </span>
            </div>
            {rushEnabled && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-zinc-600 dark:text-zinc-400">
                  Rush Surcharge (20%):
                </span>
                <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  ₱10,000
                </span>
              </div>
            )}
            <div className="flex justify-between items-center pt-3 border-t border-zinc-200 dark:border-zinc-800">
              <span className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                Total Cost:
              </span>
              <span className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                ₱{rushEnabled ? '60,000' : '50,000'}
              </span>
            </div>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-6 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-zinc-600 dark:text-zinc-400">
                Standard Timeline:
              </span>
              <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                60 days
              </span>
            </div>
            {rushEnabled && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-zinc-600 dark:text-zinc-400">
                  Rush Timeline (30% faster):
                </span>
                <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  42 days
                </span>
              </div>
            )}
            <div className="flex justify-between items-center pt-3 border-t border-zinc-200 dark:border-zinc-800">
              <span className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                Delivery Timeline:
              </span>
              <span className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                {rushEnabled ? '42 days' : '60 days'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
