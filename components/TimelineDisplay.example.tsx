'use client';

import { useState } from 'react';
import TimelineDisplay from './TimelineDisplay';

/**
 * Example demonstrating TimelineDisplay component usage
 * This shows how the component displays timelines in different scenarios
 */
export default function TimelineDisplayExample() {
  const [rushEnabled, setRushEnabled] = useState(false);

  // Example timelines (standard: 35 days, rush: 25 days)
  const standardDays = 35;
  const rushDays = 25;

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 p-8">
      <div className="max-w-2xl mx-auto flex flex-col gap-8">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
            TimelineDisplay Component Examples
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Demonstrating different timeline display states
          </p>
        </div>

        {/* Interactive Example */}
        <div className="flex flex-col gap-4 p-6 border-2 border-zinc-200 dark:border-zinc-700 rounded-lg">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Interactive Example
          </h2>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={rushEnabled}
              onChange={(e) => setRushEnabled(e.target.checked)}
              className="w-4 h-4 accent-zinc-950 dark:accent-zinc-50"
            />
            <span className="text-sm text-zinc-700 dark:text-zinc-300">
              Enable Rush Delivery
            </span>
          </label>

          <TimelineDisplay
            standardDays={standardDays}
            rushDays={rushDays}
            rushEnabled={rushEnabled}
          />
        </div>

        {/* Standard Timeline Only */}
        <div className="flex flex-col gap-4 p-6 border-2 border-zinc-200 dark:border-zinc-700 rounded-lg">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Standard Timeline Only
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            14 days (2 weeks)
          </p>
          <TimelineDisplay
            standardDays={14}
            rushDays={10}
            rushEnabled={false}
          />
        </div>

        {/* Rush Timeline Active */}
        <div className="flex flex-col gap-4 p-6 border-2 border-zinc-200 dark:border-zinc-700 rounded-lg">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Rush Timeline Active
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Standard: 28 days (4 weeks), Rush: 20 days (2 weeks 6 days)
          </p>
          <TimelineDisplay
            standardDays={28}
            rushDays={20}
            rushEnabled={true}
          />
        </div>

        {/* Short Timeline */}
        <div className="flex flex-col gap-4 p-6 border-2 border-zinc-200 dark:border-zinc-700 rounded-lg">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Short Timeline
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Standard: 5 days, Rush: 4 days
          </p>
          <TimelineDisplay
            standardDays={5}
            rushDays={4}
            rushEnabled={false}
          />
        </div>

        {/* Long Timeline */}
        <div className="flex flex-col gap-4 p-6 border-2 border-zinc-200 dark:border-zinc-700 rounded-lg">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Long Timeline with Rush
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Standard: 84 days (12 weeks), Rush: 59 days (8 weeks 3 days)
          </p>
          <TimelineDisplay
            standardDays={84}
            rushDays={59}
            rushEnabled={true}
          />
        </div>
      </div>
    </div>
  );
}
