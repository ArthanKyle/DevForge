'use client';

import { useState } from 'react';
import MilestoneModal from './MilestoneModal';

export default function MilestoneModalExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [totalCost] = useState(75000);
  const [currency] = useState('PHP');

  return (
    <div className="p-8">
      <h1 className="mb-4 text-2xl font-bold">MilestoneModal Example</h1>
      
      <div className="space-y-4">
        <div className="rounded-lg border border-gray-200 p-4">
          <p className="mb-2 text-sm text-gray-600">
            Total Project Cost: {currency === 'PHP' ? '₱' : '$'}
            {totalCost.toLocaleString()}
          </p>
          <button
            onClick={() => setIsOpen(true)}
            className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
          >
            Open Milestone Breakdown
          </button>
        </div>

        <div className="rounded-lg border border-gray-200 p-4">
          <h2 className="mb-2 font-semibold">Expected Breakdown:</h2>
          <ul className="space-y-1 text-sm text-gray-600">
            <li>30% Deposit: {currency === 'PHP' ? '₱' : '$'}{(totalCost * 0.3).toLocaleString()}</li>
            <li>40% Beta: {currency === 'PHP' ? '₱' : '$'}{(totalCost * 0.4).toLocaleString()}</li>
            <li>30% Final: {currency === 'PHP' ? '₱' : '$'}{(totalCost * 0.3).toLocaleString()}</li>
          </ul>
        </div>
      </div>

      <MilestoneModal
        totalCost={totalCost}
        currency={currency}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
}
