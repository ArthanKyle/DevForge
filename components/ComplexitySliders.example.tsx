/**
 * Example usage of ComplexitySliders component
 * 
 * This file demonstrates how to integrate the ComplexitySliders component
 * into a parent component or page.
 */

'use client';

import { useState } from 'react';
import ComplexitySliders, { ComplexitySliderValues } from './ComplexitySliders';

export default function ComplexitySlidersExample() {
  const [sliderValues, setSliderValues] = useState<ComplexitySliderValues>({
    dbEntities: 1,
    apisHardware: 0,
    realtimeSecurity: 0,
  });

  const handleSliderChange = (values: ComplexitySliderValues) => {
    setSliderValues(values);
    console.log('Complexity values changed:', values);
  };

  // Calculate complexity score as per requirements
  const complexityScore =
    sliderValues.dbEntities +
    sliderValues.apisHardware +
    sliderValues.realtimeSecurity;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-zinc-900 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-zinc-100">
        Project Complexity Calculator
      </h2>
      
      <ComplexitySliders onChange={handleSliderChange} />

      <div className="mt-6 p-4 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 text-zinc-900 dark:text-zinc-100">
          Current Configuration
        </h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-zinc-600 dark:text-zinc-400">DB Entities:</p>
            <p className="font-bold text-zinc-900 dark:text-zinc-100">
              {sliderValues.dbEntities}
            </p>
          </div>
          <div>
            <p className="text-zinc-600 dark:text-zinc-400">APIs/Hardware:</p>
            <p className="font-bold text-zinc-900 dark:text-zinc-100">
              {sliderValues.apisHardware}
            </p>
          </div>
          <div>
            <p className="text-zinc-600 dark:text-zinc-400">Real-time/Security:</p>
            <p className="font-bold text-zinc-900 dark:text-zinc-100">
              {sliderValues.realtimeSecurity}
            </p>
          </div>
          <div>
            <p className="text-zinc-600 dark:text-zinc-400">Complexity Score:</p>
            <p className="font-bold text-xl text-zinc-900 dark:text-zinc-100">
              {complexityScore}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
