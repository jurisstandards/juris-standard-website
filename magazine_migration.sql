CREATE TABLE IF NOT EXISTS magazine_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_number INT NOT NULL,
  heading TEXT NOT NULL,
  content TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Note: The API uses the service role for admin writes and anon role for reads, so RLS policies are optional but good practice.
ALTER TABLE magazine_pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" ON magazine_pages
  FOR SELECT USING (true);

