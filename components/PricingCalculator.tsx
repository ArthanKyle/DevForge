'use client';

import { useState, useMemo, useEffect } from 'react';
import ComplexitySliders, {
  ComplexitySliderValues,
} from './ComplexitySliders';
import TrackSelector, { Track } from './TrackSelector';
import AddOnConfigurator from './AddOnConfigurator';
import RushDeliveryToggle from './RushDeliveryToggle';
import TimelineDisplay from './TimelineDisplay';
import { calculatePrice, PricingInput, AddOn } from '@/lib/pricing-engine';
import { calculateTimeline } from '@/lib/timeline-calculator';
import { createClient } from '@/lib/supabase/client';
import type { Database } from '@/lib/supabase/database.types';

type AddOnRow = Database['public']['Tables']['add_ons']['Row'];

interface PricingCalculatorProps {
  onPricingChange?: (pricing: ReturnType<typeof calculatePrice>) => void;
  onTimelineChange?: (timeline: ReturnType<typeof calculateTimeline>) => void;
}

export default function PricingCalculator({
  onPricingChange,
  onTimelineChange,
}: PricingCalculatorProps) {
  // State for all pricing inputs
  const [track, setTrack] = useState<Track>('student');
  const [currency, setCurrency] = useState<'PHP' | 'USD'>('PHP');
  const [complexity, setComplexity] = useState<ComplexitySliderValues>({
    dbEntities: 1,
    apisHardware: 0,
    realtimeSecurity: 0,
  });
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([]);
  const [rushDelivery, setRushDelivery] = useState<boolean>(false);
  const [addOnsData, setAddOnsData] = useState<AddOnRow[]>([]);

  // Fetch add-ons data for cost calculation
  useEffect(() => {
    const fetchAddOns = async () => {
      const client = createClient();
      const { data, error } = await client
        .from('add_ons')
        .select('*')
        .eq('active', true);

      if (data && !error) {
        setAddOnsData(data);
      }
    };

    fetchAddOns();
  }, []);

  // Update currency when track changes
  useEffect(() => {
    // Enterprise can use USD or PHP, Student only uses PHP
    if (track === 'student') {
      setCurrency('PHP');
    }
  }, [track]);

  // Calculate pricing using useMemo for optimization (recalculates within 100ms)
  const pricing = useMemo(() => {
    // Map selected add-on IDs to AddOn objects
    const selectedAddOns: AddOn[] = addOnsData
      .filter((addOn) => selectedAddOnIds.includes(addOn.id))
      .map((addOn) => ({
        id: addOn.id,
        name: addOn.name,
        cost_php: addOn.cost_php,
        cost_usd: addOn.cost_usd,
        timeline_days: addOn.timeline_days,
      }));

    const input: PricingInput = {
      track,
      dbEntities: complexity.dbEntities,
      apisHardware: complexity.apisHardware,
      realtimeSecurity: complexity.realtimeSecurity,
      addOns: selectedAddOns,
      rushDelivery,
      currency,
    };

    return calculatePrice(input);
  }, [track, complexity, selectedAddOnIds, rushDelivery, currency, addOnsData]);

  // Calculate timeline using useMemo for optimization
  const timeline = useMemo(() => {
    return calculateTimeline({
      complexityScore: pricing.complexityScore,
      addOnsCount: selectedAddOnIds.length,
      rushDelivery,
    });
  }, [pricing.complexityScore, selectedAddOnIds.length, rushDelivery]);

  // Notify parent components of changes
  useEffect(() => {
    if (onPricingChange) {
      onPricingChange(pricing);
    }
  }, [pricing, onPricingChange]);

  useEffect(() => {
    if (onTimelineChange) {
      onTimelineChange(timeline);
    }
  }, [timeline, onTimelineChange]);

  const formatCurrency = (amount: number) => {
    if (currency === 'PHP') {
      return `₱${amount.toLocaleString()}`;
    }
    return `$${amount.toLocaleString()}`;
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Project Cost Estimator
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Configure your project requirements and get an instant cost estimate
        </p>
      </div>

      {/* Track Selector */}
      <TrackSelector onChange={setTrack} initialTrack={track} />

      {/* Currency Selector (Enterprise only) */}
      {track === 'enterprise' && (
        <div className="flex flex-col gap-4 w-full">
          <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            Currency
          </label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setCurrency('PHP')}
              className={`
                flex-1 p-3 rounded-lg border-2 transition-all text-center font-medium
                ${
                  currency === 'PHP'
                    ? 'border-zinc-950 dark:border-zinc-50 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100'
                    : 'border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-600'
                }
              `}
              aria-pressed={currency === 'PHP'}
            >
              PHP (₱)
            </button>
            <button
              type="button"
              onClick={() => setCurrency('USD')}
              className={`
                flex-1 p-3 rounded-lg border-2 transition-all text-center font-medium
                ${
                  currency === 'USD'
                    ? 'border-zinc-950 dark:border-zinc-50 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100'
                    : 'border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-600'
                }
              `}
              aria-pressed={currency === 'USD'}
            >
              USD ($)
            </button>
          </div>
        </div>
      )}

      {/* Complexity Sliders */}
      <ComplexitySliders onChange={setComplexity} initialValues={complexity} />

      {/* Add-on Configurator */}
      <AddOnConfigurator
        onChange={setSelectedAddOnIds}
        initialSelectedIds={selectedAddOnIds}
        currency={currency}
      />

      {/* Rush Delivery Toggle */}
      <RushDeliveryToggle
        onChange={setRushDelivery}
        initialEnabled={rushDelivery}
      />

      {/* Pricing Breakdown */}
      <div className="flex flex-col gap-4 w-full">
        <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
          Cost Breakdown
        </label>

        <div className="p-6 rounded-lg border-2 border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900">
          <div className="flex flex-col gap-3">
            {/* Base Cost */}
            <div className="flex justify-between items-center">
              <span className="text-sm text-zinc-600 dark:text-zinc-400">
                Base Cost
              </span>
              <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {formatCurrency(pricing.baseCost)}
              </span>
            </div>

            {/* Complexity Add-on */}
            <div className="flex justify-between items-center">
              <span className="text-sm text-zinc-600 dark:text-zinc-400">
                Complexity Add-on{' '}
                <span className="text-xs text-zinc-500">
                  (Score: {pricing.complexityScore})
                </span>
              </span>
              <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {formatCurrency(pricing.complexityAddon)}
              </span>
            </div>

            {/* Add-ons Cost */}
            {pricing.addOnsCost > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-zinc-600 dark:text-zinc-400">
                  Add-ons Cost{' '}
                  <span className="text-xs text-zinc-500">
                    ({selectedAddOnIds.length} selected)
                  </span>
                </span>
                <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {formatCurrency(pricing.addOnsCost)}
                </span>
              </div>
            )}

            {/* Rush Surcharge */}
            {pricing.rushSurcharge > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-zinc-600 dark:text-zinc-400">
                  Rush Surcharge{' '}
                  <span className="text-xs text-zinc-500">(20%)</span>
                </span>
                <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {formatCurrency(pricing.rushSurcharge)}
                </span>
              </div>
            )}

            {/* Divider */}
            <div className="border-t border-zinc-200 dark:border-zinc-700 my-2" />

            {/* Total Cost */}
            <div className="flex justify-between items-center">
              <span className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                Total Cost
              </span>
              <span className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                {formatCurrency(pricing.totalCost)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Display */}
      <TimelineDisplay
        standardDays={timeline.standardDays}
        rushDays={timeline.rushDays}
        rushEnabled={rushDelivery}
      />
    </div>
  );
}
