-- Migration: Create projects table
-- Description: Stores approved projects promoted from intakes with milestone payment tracking and Kanban status management
-- Requirements: 7.1, 8.1, 8.5, 10.1
-- Created: 2025-01-01

-- Create projects table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  intake_id UUID REFERENCES intakes(id) ON DELETE SET NULL,
  project_name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'intake_received' CHECK (
    status IN (
      'intake_received',
      'scope_approved',
      'deposit_verified',
      'dev_phase',
      'beta_review',
      'final_release'
    )
  ),
  
  -- Financial tracking
  total_cost NUMERIC(10, 2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'PHP' CHECK (currency IN ('PHP', 'USD')),
  deposit_paid BOOLEAN DEFAULT FALSE NOT NULL,
  deposit_amount NUMERIC(10, 2),
  beta_paid BOOLEAN DEFAULT FALSE NOT NULL,
  beta_amount NUMERIC(10, 2),
  final_paid BOOLEAN DEFAULT FALSE NOT NULL,
  final_amount NUMERIC(10, 2),
  
  -- Project details
  complexity_score INTEGER NOT NULL CHECK (complexity_score BETWEEN 1 AND 20),
  timeline INTEGER NOT NULL,
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  client_phone TEXT,
  
  -- Metadata
  assigned_to UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  completed_at TIMESTAMPTZ
);

-- Create indexes for efficient querying
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_assigned ON projects(assigned_to);
CREATE INDEX idx_projects_updated ON projects(updated_at DESC);

-- Add comment to table
COMMENT ON TABLE projects IS 'Approved projects promoted from intakes with Kanban status management and milestone payment tracking';

-- Add column comments
COMMENT ON COLUMN projects.id IS 'Primary key, unique identifier for each project';
COMMENT ON COLUMN projects.intake_id IS 'Foreign key to original intake record, nullable if intake is deleted';
COMMENT ON COLUMN projects.project_name IS 'Name/title assigned to the project';
COMMENT ON COLUMN projects.status IS 'Kanban pipeline status: intake_received, scope_approved, deposit_verified, dev_phase, beta_review, final_release';
COMMENT ON COLUMN projects.total_cost IS 'Total project cost from intake calculation';
COMMENT ON COLUMN projects.currency IS 'Currency code: PHP or USD';
COMMENT ON COLUMN projects.deposit_paid IS 'Whether the 30% deposit milestone has been paid';
COMMENT ON COLUMN projects.deposit_amount IS 'Amount for the 30% deposit milestone';
COMMENT ON COLUMN projects.beta_paid IS 'Whether the 40% beta milestone has been paid';
COMMENT ON COLUMN projects.beta_amount IS 'Amount for the 40% beta milestone';
COMMENT ON COLUMN projects.final_paid IS 'Whether the 30% final milestone has been paid';
COMMENT ON COLUMN projects.final_amount IS 'Amount for the 30% final milestone';
COMMENT ON COLUMN projects.complexity_score IS 'Complexity score (1-20) from original intake';
COMMENT ON COLUMN projects.timeline IS 'Project timeline in days from original intake calculation';
COMMENT ON COLUMN projects.client_name IS 'Client contact name';
COMMENT ON COLUMN projects.client_email IS 'Client contact email address';
COMMENT ON COLUMN projects.client_phone IS 'Optional client phone number';
COMMENT ON COLUMN projects.assigned_to IS 'Foreign key to profiles (developer or admin assigned to this project)';
COMMENT ON COLUMN projects.created_at IS 'Timestamp when project was created';
COMMENT ON COLUMN projects.updated_at IS 'Timestamp when project was last updated';
COMMENT ON COLUMN projects.completed_at IS 'Timestamp when project reached final_release status';

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Allow authenticated admins and developers to read all projects
CREATE POLICY "Allow authenticated read"
  ON projects
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'developer')
    )
  );

-- RLS Policy: Allow admins to insert projects
CREATE POLICY "Allow admin insert"
  ON projects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- RLS Policy: Allow admins to update any project
CREATE POLICY "Allow admin update"
  ON projects
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

-- RLS Policy: Allow developers to update their assigned projects
CREATE POLICY "Allow developer update assigned"
  ON projects
  FOR UPDATE
  TO authenticated
  USING (
    assigned_to = auth.uid()
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'developer'
    )
  )
  WITH CHECK (
    assigned_to = auth.uid()
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'developer'
    )
  );

-- RLS Policy: Allow admins to delete projects
CREATE POLICY "Allow admin delete"
  ON projects
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Create trigger to automatically update updated_at on row update
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create function to automatically set completed_at when status changes to final_release
CREATE OR REPLACE FUNCTION set_project_completed_at()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'final_release' AND OLD.status != 'final_release' THEN
    NEW.completed_at := NOW();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically set completed_at timestamp
CREATE TRIGGER set_projects_completed_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION set_project_completed_at();
