import { createClient } from './client';
import type { Database } from './database.types';

type Client = ReturnType<typeof createClient>;
type AddOnRow = Database['public']['Tables']['add_ons']['Row'];
type IntakeInsert = Database['public']['Tables']['intakes']['Insert'];
type IntakeRow = Database['public']['Tables']['intakes']['Row'];
type ProjectRow = Database['public']['Tables']['projects']['Row'];
type ProjectUpdate = Database['public']['Tables']['projects']['Update'];
type ApiLogInsert = Database['public']['Tables']['api_logs']['Insert'];

/**
 * Fetch all active add-ons
 * @param client - Supabase client
 * @returns Array of active add-ons
 */
export async function fetchAddOns(
  client: Client
): Promise<AddOnRow[]> {
  const { data, error } = await client
    .from('add_ons')
    .select('*')
    .eq('active', true)
    .order('name');

  if (error) {
    throw new Error(`Failed to fetch add-ons: ${error.message}`);
  }

  return data || [];
}

/**
 * Generate a unique tracking reference for an intake
 * Format: DFP-YYYYMMDD-XXXX (where XXXX is random)
 * @returns Unique tracking reference
 */
function generateTrackingReference(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0');

  return `DFP-${year}${month}${day}-${random}`;
}

/**
 * Create a new intake record
 * @param client - Supabase client
 * @param intake - Intake data
 * @returns Created intake with tracking reference
 */
export async function createIntake(
  client: Client,
  intake: Omit<IntakeInsert, 'tracking_reference'>
): Promise<IntakeRow> {
  const trackingReference = generateTrackingReference();

  const { data, error } = await client
    .from('intakes')
    .insert([{
      ...intake,
      tracking_reference: trackingReference,
    }])
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create intake: ${error.message}`);
  }

  return data;
}

export interface FetchProjectsOptions {
  status?: ProjectRow['status'];
  limit?: number;
  offset?: number;
}

export interface FetchProjectsResult {
  projects: ProjectRow[];
  total: number;
}

/**
 * Fetch projects with optional filtering and pagination
 * @param client - Supabase client
 * @param options - Query options
 * @returns Projects and total count
 */
export async function fetchProjects(
  client: Client,
  options: FetchProjectsOptions = {}
): Promise<FetchProjectsResult> {
  const { status, limit = 50, offset = 0 } = options;

  let query = client.from('projects').select('*', { count: 'exact' });

  if (status) {
    query = query.eq('status', status);
  }

  query = query.order('updated_at', { ascending: false }).range(offset, offset + limit - 1);

  const { data, error, count } = await query;

  if (error) {
    throw new Error(`Failed to fetch projects: ${error.message}`);
  }

  return {
    projects: data || [],
    total: count || 0,
  };
}

/**
 * Update a project's status and other fields
 * @param client - Supabase client
 * @param projectId - Project ID
 * @param updates - Fields to update
 * @returns Updated project
 */
export async function updateProjectStatus(
  client: Client,
  projectId: string,
  updates: ProjectUpdate
): Promise<ProjectRow> {
  const { data, error } = await client
    .from('projects')
    .update([{
      ...updates,
      updated_at: new Date().toISOString(),
    }])
    .eq('id', projectId)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to update project: ${error.message}`);
  }

  return data;
}

/**
 * Log an API request
 * @param client - Supabase client
 * @param logEntry - API log data
 */
export async function logApiRequest(
  client: Client,
  logEntry: Omit<ApiLogInsert, 'created_at'>
): Promise<void> {
  const { error } = await client.from('api_logs').insert([logEntry]);

  if (error) {
    console.error('Failed to log API request:', error);
    // Don't throw - logging failures shouldn't break the request
  }
}
