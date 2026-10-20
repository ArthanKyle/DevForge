-- Create api_logs table for API request logging and rate limiting
CREATE TABLE api_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  endpoint TEXT NOT NULL,
  method TEXT NOT NULL,
  ip_address INET NOT NULL,
  user_id UUID REFERENCES auth.users,
  status_code INTEGER NOT NULL,
  response_time_ms INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for efficient querying
CREATE INDEX idx_api_logs_created ON api_logs(created_at DESC);
CREATE INDEX idx_api_logs_ip ON api_logs(ip_address, created_at DESC);
