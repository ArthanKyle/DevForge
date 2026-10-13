'use client';

import { useState } from 'react';

export type Track = 'student' | 'enterprise';

interface TrackSelectorProps {
  onChange: (track: Track) => void;
  initialTrack?: Track;
}

const trackInfo = {
  student: {
    title: 'Student Track',
    description: 'Perfect for capstone projects and academic work',
    baseCost: '₱15,000',
    complexityRate: '₱1,200 per complexity point',
    currency: 'PHP',
  },
  enterprise: {
    title: 'Enterprise Track',
    description: 'Professional solutions for business applications',
    baseCost: '₱50,000',
    complexityRate: '₱8,000 per complexity point',
    currency: 'USD or PHP',
  },
};

export default function TrackSelector({
  onChange,
  initialTrack = 'student',
}: TrackSelectorProps) {
  const [selectedTrack, setSelectedTrack] = useState<Track>(initialTrack);

  const handleTrackChange = (track: Track) => {
    setSelectedTrack(track);
    onChange(track);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
        Select Track
      </label>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Student Track */}
        <button
          type="button"
          onClick={() => handleTrackChange('student')}
          className={`
            flex flex-col gap-3 p-5 rounded-lg border-2 transition-all text-left
            ${
              selectedTrack === 'student'
                ? 'border-zinc-950 dark:border-zinc-50 bg-zinc-50 dark:bg-zinc-800'
                : 'border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-600'
            }
          `}
          aria-pressed={selectedTrack === 'student'}
          aria-label="Select Student Track"
        >
          <div className="flex items-center gap-3">
            <div
              className={`
                w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all
                ${
                  selectedTrack === 'student'
                    ? 'border-zinc-950 dark:border-zinc-50'
                    : 'border-zinc-300 dark:border-zinc-600'
                }
              `}
            >
              {selectedTrack === 'student' && (
                <div className="w-3 h-3 rounded-full bg-zinc-950 dark:bg-zinc-50" />
              )}
            </div>
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              {trackInfo.student.title}
            </h3>
          </div>

          <p className="text-sm text-zinc-600 dark:text-zinc-400 ml-8">
            {trackInfo.student.description}
          </p>

          <div className="flex flex-col gap-1 ml-8">
            <div className="flex items-baseline gap-2">
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                Base Cost:
              </span>
              <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {trackInfo.student.baseCost}
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                Complexity Rate:
              </span>
              <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                {trackInfo.student.complexityRate}
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                Currency:
              </span>
              <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                {trackInfo.student.currency}
              </span>
            </div>
          </div>
        </button>

        {/* Enterprise Track */}
        <button
          type="button"
          onClick={() => handleTrackChange('enterprise')}
          className={`
            flex flex-col gap-3 p-5 rounded-lg border-2 transition-all text-left
            ${
              selectedTrack === 'enterprise'
                ? 'border-zinc-950 dark:border-zinc-50 bg-zinc-50 dark:bg-zinc-800'
                : 'border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-600'
            }
          `}
          aria-pressed={selectedTrack === 'enterprise'}
          aria-label="Select Enterprise Track"
        >
          <div className="flex items-center gap-3">
            <div
              className={`
                w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all
                ${
                  selectedTrack === 'enterprise'
                    ? 'border-zinc-950 dark:border-zinc-50'
                    : 'border-zinc-300 dark:border-zinc-600'
                }
              `}
            >
              {selectedTrack === 'enterprise' && (
                <div className="w-3 h-3 rounded-full bg-zinc-950 dark:bg-zinc-50" />
              )}
            </div>
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
              {trackInfo.enterprise.title}
            </h3>
          </div>

          <p className="text-sm text-zinc-600 dark:text-zinc-400 ml-8">
            {trackInfo.enterprise.description}
          </p>

          <div className="flex flex-col gap-1 ml-8">
            <div className="flex items-baseline gap-2">
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                Base Cost:
              </span>
              <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {trackInfo.enterprise.baseCost}
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                Complexity Rate:
              </span>
              <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                {trackInfo.enterprise.complexityRate}
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                Currency:
              </span>
              <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                {trackInfo.enterprise.currency}
              </span>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
