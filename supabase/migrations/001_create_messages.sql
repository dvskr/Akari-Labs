-- Akari Labs: messages table for contact form
-- Run this in the Supabase SQL Editor (https://supabase.com/dashboard → SQL Editor)

CREATE TABLE IF NOT EXISTS public.messages (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  subject text DEFAULT 'General',
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (contact form)
CREATE POLICY "Anyone can insert messages"
  ON public.messages
  FOR INSERT
  WITH CHECK (true);

-- Only service role can read (dashboard / admin)
CREATE POLICY "Service role can read messages"
  ON public.messages
  FOR SELECT
  USING (auth.role() = 'service_role');
