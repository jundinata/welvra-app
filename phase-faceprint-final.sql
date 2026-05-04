-- Phase 4 final schema additions (idempotent)
ALTER TABLE public.skin_analyses ADD COLUMN IF NOT EXISTS photo_storage_path TEXT;
ALTER TABLE public.skin_analyses ADD COLUMN IF NOT EXISTS last_progress_report_at TIMESTAMPTZ;

CREATE INDEX IF NOT EXISTS idx_skin_analyses_photo_path
  ON public.skin_analyses (photo_storage_path) WHERE photo_storage_path IS NOT NULL;

-- Storage bucket policies for 'faceprint-photos' bucket
-- Run AFTER creating the bucket manually in Supabase Dashboard as Private

DROP POLICY IF EXISTS "Users can upload to own folder" ON storage.objects;
CREATE POLICY "Users can upload to own folder"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'faceprint-photos'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

DROP POLICY IF EXISTS "Users can view own photos" ON storage.objects;
CREATE POLICY "Users can view own photos"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'faceprint-photos'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

DROP POLICY IF EXISTS "Users can delete own photos" ON storage.objects;
CREATE POLICY "Users can delete own photos"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'faceprint-photos'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

DROP POLICY IF EXISTS "Users can update own photos" ON storage.objects;
CREATE POLICY "Users can update own photos"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'faceprint-photos'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );
