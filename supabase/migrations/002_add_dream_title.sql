-- Add optional Dream Title per documentation 5.3
ALTER TABLE dream_recordings
ADD COLUMN IF NOT EXISTS title TEXT;
