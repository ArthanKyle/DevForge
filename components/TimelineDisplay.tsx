'use client';

interface TimelineDisplayProps {
  standardDays: number;
  rushDays: number;
  rushEnabled?: boolean;
}

/**
 * Converts days to human-readable weeks/days format
 * Returns object with separate day count and week description
 */
function formatTimeline(days: number): { days: string; description: string } {
  const weeks = Math.floor(days / 7);
  const remainingDays = days % 7;

  // Handle zero or negative days
  if (days <= 0) {
    return { days: `${days}`, description: `${days} days` };
  }

  // Only days, no full weeks
  if (weeks === 0) {
    return {
      days: `${days}`,
      description: days === 1 ? '1 day' : `${days} days`,
    };
  }

  // Perfect week multiple
  if (remainingDays === 0) {
    return {
      days: `${days}`,
      description: weeks === 1 ? '1 week' : `${weeks} weeks`,
    };
  }

  // Mixed weeks and days
  const weekPart = weeks === 1 ? '1 week' : `${weeks} weeks`;
  const dayPart = remainingDays === 1 ? '1 day' : `${remainingDays} days`;
  return {
    days: `${days}`,
    description: `${weekPart} ${dayPart}`,
  };
}

export default function TimelineDisplay({
  standardDays,
  rushDays,
  rushEnabled = false,
}: TimelineDisplayProps) {
  const standardFormat = formatTimeline(standardDays);
  const rushFormat = formatTimeline(rushDays);
  const daysSaved = standardDays - rushDays;

  return (
    <div className="flex flex-col gap-4 w-full">
      <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
        Project Timeline
      </label>

      {!rushEnabled ? (
        // Display only standard timeline when rush is disabled
        <div className="p-5 rounded-lg border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900">
          <div className="flex items-center gap-3">
            <svg
              className="w-5 h-5 text-zinc-700 dark:text-zinc-300"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Standard Delivery
              </p>
              <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                <span>{standardFormat.days}</span>
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {standardFormat.description}
              </p>
            </div>
          </div>
        </div>
      ) : (
        // Display both timelines when rush is enabled
        <div className="flex flex-col gap-3">
          {/* Standard Timeline - Deemphasized */}
          <div className="p-4 rounded-lg border-2 border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 opacity-75">
            <div className="flex items-center gap-3">
              <svg
                className="w-5 h-5 text-zinc-500 dark:text-zinc-400"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div className="flex-1">
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Standard Delivery
                </p>
                <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 line-through">
                  <span>{standardFormat.days}</span>
                </p>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 line-through">
                  {standardFormat.description}
                </p>
              </div>
            </div>
          </div>

          {/* Rush Timeline - Highlighted */}
          <div className="p-5 rounded-lg border-2 border-zinc-950 dark:border-zinc-50 bg-white dark:bg-zinc-900">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-zinc-950 dark:text-zinc-50"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Rush Delivery
                  </p>
                  <p className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    <span>{rushFormat.days}</span>
                  </p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {rushFormat.description}
                  </p>
                </div>
              </div>
              <span className="text-xs font-semibold text-zinc-950 dark:text-zinc-50 bg-zinc-200 dark:bg-zinc-700 px-2 py-1 rounded">
                ACTIVE
              </span>
            </div>
            
            {/* Time Savings Indicator */}
            <div className="mt-3 pt-3 border-t border-zinc-200 dark:border-zinc-700">
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                  {daysSaved} days saved
                </span>{' '}
                · 30% faster delivery
              </p>
            </div>
          </div>
        </div>
      )}

      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        Estimated timeline based on project complexity and selected options
      </p>
    </div>
  );
}
