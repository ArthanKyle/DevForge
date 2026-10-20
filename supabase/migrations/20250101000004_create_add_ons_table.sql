-- Migration: Create add_ons table
-- Description: Stores configurable add-on services catalog that clients can select during intake
-- Requirements: 11.1, 11.4
-- Created: 2025-01-01

-- Create add_ons table
CREATE TABLE add_ons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  cost_php NUMERIC(10, 2) NOT NULL,
  cost_usd NUMERIC(10, 2) NOT NULL,
  timeline_days INTEGER NOT NULL DEFAULT 7,
  active BOOLEAN DEFAULT TRUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create indexes for efficient querying
CREATE INDEX idx_add_ons_active ON add_ons(active);
CREATE INDEX idx_add_ons_name ON add_ons(name);

-- Add comment to table
COMMENT ON TABLE add_ons IS 'Configurable add-on services catalog with dual-currency pricing that clients can select during project intake';

-- Add column comments
COMMENT ON COLUMN add_ons.id IS 'Primary key, unique identifier for each add-on service';
COMMENT ON COLUMN add_ons.name IS 'Display name of the add-on service';
COMMENT ON COLUMN add_ons.description IS 'Optional description explaining what the add-on service provides';
COMMENT ON COLUMN add_ons.cost_php IS 'Cost of the add-on in Philippine Pesos (PHP)';
COMMENT ON COLUMN add_ons.cost_usd IS 'Cost of the add-on in US Dollars (USD)';
COMMENT ON COLUMN add_ons.timeline_days IS 'Additional timeline in days added when this add-on is selected (defaults to 7)';
COMMENT ON COLUMN add_ons.active IS 'Whether this add-on is currently available for selection (active services only shown to clients)';
COMMENT ON COLUMN add_ons.created_at IS 'Timestamp when add-on was created';

-- Enable Row Level Security
ALTER TABLE add_ons ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Allow anyone (anonymous and authenticated) to read active add-ons
CREATE POLICY "Allow public read active"
  ON add_ons
  FOR SELECT
  TO anon, authenticated
  USING (active = true);

-- RLS Policy: Allow admins to read all add-ons (including inactive)
CREATE POLICY "Allow admin read all"
  ON add_ons
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- RLS Policy: Allow admins to insert add-ons
CREATE POLICY "Allow admin insert"
  ON add_ons
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- RLS Policy: Allow admins to update add-ons
CREATE POLICY "Allow admin update"
  ON add_ons
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- RLS Policy: Allow admins to delete add-ons
CREATE POLICY "Allow admin delete"
  ON add_ons
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Insert seed data for standard add-on services
INSERT INTO add_ons (name, description, cost_php, cost_usd, timeline_days) VALUES
  ('SEO Optimization', 'Search engine optimization and meta tags', 5000.00, 100.00, 7),
  ('Analytics Integration', 'Google Analytics and tracking setup', 3000.00, 60.00, 7),
  ('Advanced Security', 'Enhanced security features and auditing', 10000.00, 200.00, 14),
  ('Email Notifications', 'Automated email notification system', 4000.00, 80.00, 7);

