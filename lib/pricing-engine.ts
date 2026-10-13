export interface AddOn {
  id: string;
  name: string;
  cost_php: number;
  cost_usd: number;
  timeline_days: number;
}

export interface PricingInput {
  track: 'student' | 'enterprise';
  dbEntities: number;        // 1-10
  apisHardware: number;      // 0-5
  realtimeSecurity: number;  // 0-5
  addOns: AddOn[];
  rushDelivery: boolean;
  currency: 'PHP' | 'USD';
}

export interface PricingOutput {
  baseCost: number;
  complexityScore: number;
  complexityAddon: number;
  addOnsCost: number;
  subtotal: number;
  rushSurcharge: number;
  totalCost: number;
  currency: string;
}

/**
 * Calculate project pricing based on track, complexity, add-ons, and rush delivery
 * @param input - Pricing configuration
 * @returns Detailed pricing breakdown
 */
export function calculatePrice(input: PricingInput): PricingOutput {
  // Calculate complexity score (1-20)
  const complexityScore = input.dbEntities + input.apisHardware + input.realtimeSecurity;

  // Calculate base cost based on track
  let baseCost: number;
  let complexityAddon: number;

  if (input.track === 'student') {
    baseCost = 15000; // PHP 15,000
    complexityAddon = complexityScore * 1200; // PHP 1,200 per complexity point
  } else {
    // Enterprise track
    baseCost = 50000; // PHP 50,000 or USD 50,000
    complexityAddon = complexityScore * 8000; // PHP/USD 8,000 per complexity point
  }

  // Calculate add-ons cost
  const addOnsCost = input.addOns.reduce((total, addOn) => {
    const cost = input.currency === 'USD' ? addOn.cost_usd : addOn.cost_php;
    return total + cost;
  }, 0);

  // Calculate subtotal before rush surcharge
  const subtotal = baseCost + complexityAddon + addOnsCost;

  // Calculate rush surcharge (20% if enabled)
  const rushSurcharge = input.rushDelivery ? subtotal * 0.20 : 0;

  // Calculate total cost
  const totalCost = subtotal + rushSurcharge;

  return {
    baseCost,
    complexityScore,
    complexityAddon,
    addOnsCost,
    subtotal,
    rushSurcharge,
    totalCost,
    currency: input.currency,
  };
}
