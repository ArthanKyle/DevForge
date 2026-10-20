-- Enable Row Level Security on add_ons table
ALTER TABLE add_ons ENABLE ROW LEVEL SECURITY;

-- Allow public (anonymous and authenticated) to read active add-ons
CREATE POLICY "Allow public read active"
  ON add_ons FOR SELECT
  TO anon, authenticated
  USING (active = true);

-- Allow admins to manage add-ons (INSERT, UPDATE, DELETE)
CREATE POLICY "Allow admin write"
  ON add_ons FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );
