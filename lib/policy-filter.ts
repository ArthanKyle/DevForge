export interface PolicyCheckResult {
  allowed: boolean;
  reason?: string;
}

// Prohibited keyword lists
const GAMBLING_KEYWORDS = [
  'gambling',
  'casino',
  'betting',
  'slots',
  'poker',
  'lottery',
  'jackpot',
  'wagering',
  'sportsbook',
  'bookmaker',
];

const PARTY_STREAMING_KEYWORDS = [
  'live party streaming',
  'party media',
  'live party media',
  'party streaming',
  'live streaming party',
];

/**
 * Check if a project description violates content policies
 * @param description - Project description to validate
 * @returns Policy check result with allowed flag and optional rejection reason
 */
export function checkProjectPolicy(description: string): PolicyCheckResult {
  const lowerDescription = description.toLowerCase();

  // Check for gambling keywords
  for (const keyword of GAMBLING_KEYWORDS) {
    if (lowerDescription.includes(keyword)) {
      return {
        allowed: false,
        reason: `Project Type Not Accepted: We do not accept gambling or betting applications. Please modify your project description or contact us for alternative solutions.`,
      };
    }
  }

  // Check for live-party streaming keywords
  for (const keyword of PARTY_STREAMING_KEYWORDS) {
    if (lowerDescription.includes(keyword)) {
      return {
        allowed: false,
        reason: `Project Type Not Accepted: We do not accept live-party media streaming applications. Please modify your project description or contact us for alternative solutions.`,
      };
    }
  }

  // Project passes all policy checks
  return {
    allowed: true,
  };
}
