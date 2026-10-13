/**
 * Example usage of the AddOnConfigurator component
 * 
 * This component fetches add-ons from Supabase and allows users to select
 * multiple add-ons via checkboxes. It emits the selected add-on IDs via
 * the onChange callback.
 */

'use client';

import { useState } from 'react';
import AddOnConfigurator from './AddOnConfigurator';

export default function AddOnConfiguratorExample() {
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([]);
  const [currency, setCurrency] = useState<'PHP' | 'USD'>('PHP');

  const handleAddOnChange = (ids: string[]) => {
    console.log('Selected add-on IDs:', ids);
    setSelectedAddOnIds(ids);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Add-on Configurator Example</h1>

      {/* Currency Toggle */}
      <div className="mb-6">
        <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-2 block">
          Display Currency
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrency('PHP')}
            className={`px-4 py-2 rounded ${
              currency === 'PHP'
                ? 'bg-zinc-950 text-white dark:bg-zinc-50 dark:text-black'
                : 'bg-zinc-200 text-zinc-900 dark:bg-zinc-700 dark:text-zinc-100'
            }`}
          >
            PHP
          </button>
          <button
            onClick={() => setCurrency('USD')}
            className={`px-4 py-2 rounded ${
              currency === 'USD'
                ? 'bg-zinc-950 text-white dark:bg-zinc-50 dark:text-black'
                : 'bg-zinc-200 text-zinc-900 dark:bg-zinc-700 dark:text-zinc-100'
            }`}
          >
            USD
          </button>
        </div>
      </div>

      {/* AddOnConfigurator Component */}
      <AddOnConfigurator
        onChange={handleAddOnChange}
        currency={currency}
        initialSelectedIds={[]}
      />

      {/* Display Selected IDs */}
      <div className="mt-6 p-4 bg-zinc-100 dark:bg-zinc-800 rounded">
        <h2 className="text-lg font-semibold mb-2">Selected Add-ons:</h2>
        {selectedAddOnIds.length === 0 ? (
          <p className="text-zinc-600 dark:text-zinc-400">None selected</p>
        ) : (
          <ul className="list-disc list-inside">
            {selectedAddOnIds.map((id) => (
              <li key={id} className="text-zinc-900 dark:text-zinc-100">
                {id}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
