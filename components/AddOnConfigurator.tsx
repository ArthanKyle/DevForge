'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { fetchAddOns } from '@/lib/supabase/queries';
import type { Database } from '@/lib/supabase/database.types';

type AddOnRow = Database['public']['Tables']['add_ons']['Row'];

interface AddOnConfiguratorProps {
  onChange: (selectedIds: string[]) => void;
  initialSelectedIds?: string[];
  currency?: 'PHP' | 'USD';
}

export default function AddOnConfigurator({
  onChange,
  initialSelectedIds = [],
  currency = 'PHP',
}: AddOnConfiguratorProps) {
  const [addOns, setAddOns] = useState<AddOnRow[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>(initialSelectedIds);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAddOns = async () => {
      try {
        setLoading(true);
        setError(null);
        const client = createClient();
        const data = await fetchAddOns(client);
        setAddOns(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load add-ons');
      } finally {
        setLoading(false);
      }
    };

    loadAddOns();
  }, []);

  const handleCheckboxChange = (addOnId: string, checked: boolean) => {
    const newSelectedIds = checked
      ? [...selectedIds, addOnId]
      : selectedIds.filter((id) => id !== addOnId);

    setSelectedIds(newSelectedIds);
    onChange(newSelectedIds);
  };

  const formatCost = (addOn: AddOnRow) => {
    if (currency === 'PHP') {
      return `₱${addOn.cost_php.toLocaleString()}`;
    }
    return `$${addOn.cost_usd.toLocaleString()}`;
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-4 w-full">
        <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
          Add-on Services
        </label>
        <div className="flex items-center justify-center py-8">
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            Loading add-ons...
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-4 w-full">
        <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
          Add-on Services
        </label>
        <div className="flex items-center justify-center py-8">
          <span className="text-sm text-red-600 dark:text-red-400">
            {error}
          </span>
        </div>
      </div>
    );
  }

  if (addOns.length === 0) {
    return (
      <div className="flex flex-col gap-4 w-full">
        <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
          Add-on Services
        </label>
        <div className="flex items-center justify-center py-8">
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            No add-ons available
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
        Add-on Services
      </label>

      <div className="flex flex-col gap-3">
        {addOns.map((addOn) => {
          const isSelected = selectedIds.includes(addOn.id);

          return (
            <label
              key={addOn.id}
              className={`
                flex items-start gap-3 p-4 rounded-lg border-2 transition-all cursor-pointer
                ${
                  isSelected
                    ? 'border-zinc-950 dark:border-zinc-50 bg-zinc-50 dark:bg-zinc-800'
                    : 'border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-600'
                }
              `}
            >
              <input
                type="checkbox"
                checked={isSelected}
                onChange={(e) => handleCheckboxChange(addOn.id, e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-zinc-300 dark:border-zinc-600 text-zinc-950 dark:text-zinc-50 focus:ring-zinc-950 dark:focus:ring-zinc-50 cursor-pointer"
                aria-label={`Select ${addOn.name}`}
              />

              <div className="flex-1 flex flex-col gap-2">
                <div className="flex justify-between items-start gap-4">
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {addOn.name}
                  </h3>
                  <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 whitespace-nowrap">
                    {formatCost(addOn)}
                  </span>
                </div>

                {addOn.description && (
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">
                    {addOn.description}
                  </p>
                )}

                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    Timeline:
                  </span>
                  <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                    +{addOn.timeline_days} {addOn.timeline_days === 1 ? 'day' : 'days'}
                  </span>
                </div>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}
