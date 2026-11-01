-- Project plans are separate from gallery photos and individual unit floor_plan images.
ALTER TABLE public.projects
  ADD COLUMN IF NOT EXISTS floor_plans text[] NOT NULL DEFAULT '{}'::text[];

COMMENT ON COLUMN public.projects.floor_plans IS
  'Ordered URLs of project floor plan images (2D or 3D), stored separately from gallery photos.';
