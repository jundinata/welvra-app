CREATE TABLE IF NOT EXISTS public.skin_analyses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  overall_score SMALLINT NOT NULL CHECK (overall_score BETWEEN 0 AND 100),
  skin_type VARCHAR(20),
  metrics JSONB NOT NULL,
  summary TEXT,
  primary_concern TEXT,
  photo_url TEXT
);

ALTER TABLE public.skin_analyses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own analyses" ON public.skin_analyses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own analyses" ON public.skin_analyses FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users delete own analyses" ON public.skin_analyses FOR DELETE USING (auth.uid() = user_id);
CREATE INDEX skin_analyses_user_created_idx ON public.skin_analyses (user_id, created_at DESC);
