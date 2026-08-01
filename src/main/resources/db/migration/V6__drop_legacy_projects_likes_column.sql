ALTER TABLE projects
    DROP COLUMN IF EXISTS likes;

ALTER TABLE projects
    ALTER COLUMN likes_count SET DEFAULT 0;

UPDATE projects
SET likes_count = COALESCE(likes_count, 0);
