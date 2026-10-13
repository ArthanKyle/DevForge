'use client';

import { useState } from 'react';

export interface ComplexitySliderValues {
  dbEntities: number;
  apisHardware: number;
  realtimeSecurity: number;
}

interface ComplexitySlidersProps {
  onChange: (values: ComplexitySliderValues) => void;
  initialValues?: ComplexitySliderValues;
}

const defaultValues: ComplexitySliderValues = {
  dbEntities: 1,
  apisHardware: 0,
  realtimeSecurity: 0,
};

export default function ComplexitySliders({
  onChange,
  initialValues = defaultValues,
}: ComplexitySlidersProps) {
  const [values, setValues] = useState<ComplexitySliderValues>(initialValues);

  const handleSliderChange = (
    field: keyof ComplexitySliderValues,
    value: number
  ) => {
    const newValues = { ...values, [field]: value };
    setValues(newValues);
    onChange(newValues);
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* DB Entities Slider */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <label
            htmlFor="db-entities"
            className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
          >
            DB Entities
          </label>
          <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 min-w-[2rem] text-right">
            {values.dbEntities}
          </span>
        </div>
        <input
          id="db-entities"
          type="range"
          min="1"
          max="10"
          step="1"
          value={values.dbEntities}
          onChange={(e) =>
            handleSliderChange('dbEntities', parseInt(e.target.value, 10))
          }
          className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer dark:bg-zinc-700 accent-zinc-950 dark:accent-zinc-50"
          aria-label="Database Entities (1-10)"
        />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Number of database tables/entities (1-10)
        </p>
      </div>

      {/* APIs/Hardware Slider */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <label
            htmlFor="apis-hardware"
            className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
          >
            APIs/Hardware
          </label>
          <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 min-w-[2rem] text-right">
            {values.apisHardware}
          </span>
        </div>
        <input
          id="apis-hardware"
          type="range"
          min="0"
          max="5"
          step="1"
          value={values.apisHardware}
          onChange={(e) =>
            handleSliderChange('apisHardware', parseInt(e.target.value, 10))
          }
          className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer dark:bg-zinc-700 accent-zinc-950 dark:accent-zinc-50"
          aria-label="APIs and Hardware Integration (0-5)"
        />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Third-party APIs and hardware integrations (0-5)
        </p>
      </div>

      {/* Real-time/Security Slider */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <label
            htmlFor="realtime-security"
            className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
          >
            Real-time/Security
          </label>
          <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 min-w-[2rem] text-right">
            {values.realtimeSecurity}
          </span>
        </div>
        <input
          id="realtime-security"
          type="range"
          min="0"
          max="5"
          step="1"
          value={values.realtimeSecurity}
          onChange={(e) =>
            handleSliderChange('realtimeSecurity', parseInt(e.target.value, 10))
          }
          className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer dark:bg-zinc-700 accent-zinc-950 dark:accent-zinc-50"
          aria-label="Real-time and Security Features (0-5)"
        />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Real-time features and security requirements (0-5)
        </p>
      </div>
    </div>
  );
}
