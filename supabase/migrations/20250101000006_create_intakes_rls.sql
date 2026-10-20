-- Enable Row Level Security on intakes table
ALTER TABLE intakes ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert intake records (public form submission)
CREATE POLICY "Allow anonymous insert"
  ON intakes FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users with admin or developer role to read all intakes
CREATE POLICY "Allow authenticated read"
  ON intakes FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'developer')
    )
  );

-- Allow admins to update intake records
CREATE POLICY "Allow admin update"
  ON intakes FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );
