// Run the messages table migration via Supabase Management API
const sql = `
CREATE TABLE IF NOT EXISTS public.messages (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  subject text DEFAULT 'General',
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'messages' AND policyname = 'Anyone can insert messages') THEN
    CREATE POLICY "Anyone can insert messages" ON public.messages FOR INSERT WITH CHECK (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'messages' AND policyname = 'Service role can read messages') THEN
    CREATE POLICY "Service role can read messages" ON public.messages FOR SELECT USING (auth.role() = 'service_role');
  END IF;
END $$;
`;

async function run() {
  // Use the Supabase project ref to get the management API
  const projectRef = 'fgduvpkepacruwdraqck';
  const dbPass = 'rk8gIco7NZJ6H9kN';

  // Connect via pg directly
  const { default: pg } = await import('pg');
  const client = new pg.Client({
    connectionString: `postgresql://postgres.${projectRef}:${dbPass}@aws-0-us-east-1.pooler.supabase.com:5432/postgres`,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    console.log('Connected to Supabase database');
    const result = await client.query(sql);
    console.log('Migration complete:', result);
  } catch (err) {
    console.error('Migration failed:', err.message);
    // Try alternative connection string
    try {
      const client2 = new pg.Client({
        connectionString: `postgresql://postgres:${dbPass}@db.${projectRef}.supabase.co:5432/postgres`,
        ssl: { rejectUnauthorized: false },
      });
      await client2.connect();
      console.log('Connected (alt) to Supabase database');
      const result = await client2.query(sql);
      console.log('Migration complete:', result);
      await client2.end();
    } catch (err2) {
      console.error('Alt connection also failed:', err2.message);
    }
  } finally {
    await client.end().catch(() => {});
  }
}

run();
