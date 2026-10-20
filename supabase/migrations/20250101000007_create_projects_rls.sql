-- Enable Row Level Security on projects table
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users with admin or developer role to read all projects
CREATE POLICY "Allow authenticated read"
  ON projects FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'developer')
    )
  );

-- Allow admins full write access (INSERT, UPDATE, DELETE)
CREATE POLICY "Allow admin write"
  ON projects FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Allow developers to update only projects assigned to them
CREATE POLICY "Allow developer update assigned"
  ON projects FOR UPDATE
  TO authenticated
  USING (
    assigned_to = auth.uid()
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'developer'
    )
  );
