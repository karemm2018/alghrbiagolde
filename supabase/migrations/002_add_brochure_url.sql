-- ============================================================
-- Golden Western Real Estate — Migration: Add brochure_url to projects
-- Run this in the Supabase SQL Editor
-- ============================================================

ALTER TABLE projects ADD COLUMN IF NOT EXISTS brochure_url TEXT;
