-- Migration: Create intakes table
-- Description: Stores client-submitted project requests from the public form
-- Requirements: 5.3, 8.1, 8.2
-- Created: 2025-01-01

-- Create intakes table
CREATE TABLE intakes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tracking_reference TEXT UNIQUE NOT NULL,
  project_description TEXT NOT NULL,
  track TEXT NOT NULL CHECK (track IN ('student', 'enterprise')),
  complexity_score INTEGER NOT NULL CHECK (complexity_score BETWEEN 1 AND 20),
  db_entities INTEGER NOT NULL CHECK (db_entities BETWEEN 1 AND 10),
  apis_hardware INTEGER NOT NULL CHECK (apis_hardware BETWEEN 0 AND 5),
  realtime_security INTEGER NOT NULL CHECK (realtime_security BETWEEN 0 AND 5),
  add_ons JSONB DEFAULT '[]'::jsonb NOT NULL,
  rush_delivery BOOLEAN DEFAULT FALSE NOT NULL,
  total_cost NUMERIC(10, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'PHP' CHECK (currency IN ('PHP', 'USD')),
  timeline INTEGER NOT NULL,
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  client_phone TEXT,
  status TEXT DEFAULT 'intake_received' NOT NULL,
  rejection_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  ip_address INET
);

-- Create indexes for efficient querying
CREATE INDEX idx_intakes_status ON intakes(status);
CREATE INDEX idx_intakes_tracking ON intakes(tracking_reference);
CREATE INDEX idx_intakes_created_at ON intakes(created_at DESC);

-- Add comment to table
COMMENT ON TABLE intakes IS 'Client-submitted project intakes from the public form with complexity scoring, pricing, and contact information';

-- Add column comments
COMMENT ON COLUMN intakes.id IS 'Primary key, unique identifier for each intake';
COMMENT ON COLUMN intakes.tracking_reference IS 'Unique tracking reference for clients to query intake status';
COMMENT ON COLUMN intakes.project_description IS 'Client-provided description of the project requirements';
COMMENT ON COLUMN intakes.track IS 'Pricing track: student (₱15k base) or enterprise (₱50k base)';
COMMENT ON COLUMN intakes.complexity_score IS 'Calculated complexity score (1-20) from slider inputs';
COMMENT ON COLUMN intakes.db_entities IS 'Number of database entities/models (1-10)';
COMMENT ON COLUMN intakes.apis_hardware IS 'Number of API integrations or hardware connections (0-5)';
COMMENT ON COLUMN intakes.realtime_security IS 'Real-time features or security requirements level (0-5)';
COMMENT ON COLUMN intakes.add_ons IS 'JSONB array of selected add-on service IDs';
COMMENT ON COLUMN intakes.rush_delivery IS 'Whether rush delivery (30% timeline reduction, 20% cost increase) was selected';
COMMENT ON COLUMN intakes.total_cost IS 'Total calculated cost including complexity, add-ons, and rush surcharge';
COMMENT ON COLUMN intakes.currency IS 'Currency code: PHP or USD';
COMMENT ON COLUMN intakes.timeline IS 'Calculated timeline in days';
COMMENT ON COLUMN intakes.client_name IS 'Client contact name';
COMMENT ON COLUMN intakes.client_email IS 'Client contact email address';
COMMENT ON COLUMN intakes.client_phone IS 'Optional client phone number';
COMMENT ON COLUMN intakes.status IS 'Current intake status (defaults to intake_received)';
COMMENT ON COLUMN intakes.rejection_reason IS 'Reason for rejection if filtered by policy';
COMMENT ON COLUMN intakes.created_at IS 'Timestamp when intake was submitted';
COMMENT ON COLUMN intakes.ip_address IS 'IP address of the client submitting the intake';

-- Enable Row Level Security
ALTER TABLE intakes ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Allow anonymous users to insert intakes (public intake form)
CREATE POLICY "Allow anonymous insert"
  ON intakes
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- RLS Policy: Allow authenticated admins and developers to read all intakes
CREATE POLICY "Allow authenticated read"
  ON intakes
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'developer')
    )
  );

-- RLS Policy: Allow admins to update intakes
CREATE POLICY "Allow admin update"
  ON intakes
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

-- RLS Policy: Allow admins to delete intakes
CREATE POLICY "Allow admin delete"
  ON intakes
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Create function to generate unique tracking reference
CREATE OR REPLACE FUNCTION generate_tracking_reference()
RETURNS TEXT AS $$
DECLARE
  chars TEXT := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; -- Exclude similar-looking characters
  result TEXT := 'DF-';
  i INTEGER;
BEGIN
  FOR i IN 1..8 LOOP
    result := result || substr(chars, floor(random() * length(chars) + 1)::integer, 1);
  END LOOP;
  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Create function to automatically generate tracking reference if not provided
CREATE OR REPLACE FUNCTION set_tracking_reference()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.tracking_reference IS NULL OR NEW.tracking_reference = '' THEN
    NEW.tracking_reference := generate_tracking_reference();
    -- Ensure uniqueness (retry up to 10 times if collision occurs)
    FOR i IN 1..10 LOOP
      IF NOT EXISTS (SELECT 1 FROM intakes WHERE tracking_reference = NEW.tracking_reference) THEN
        EXIT;
      END IF;
      NEW.tracking_reference := generate_tracking_reference();
    END LOOP;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically set tracking reference on insert
CREATE TRIGGER set_intakes_tracking_reference
  BEFORE INSERT ON intakes
  FOR EACH ROW
  EXECUTE FUNCTION set_tracking_reference();
