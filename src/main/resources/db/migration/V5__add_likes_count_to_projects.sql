ALTER TABLE projects
    ADD COLUMN IF NOT EXISTS likes_count INT NOT NULL DEFAULT 0;

UPDATE projects p
SET likes_count = COALESCE((
    SELECT COUNT(*)
    FROM likes l
    WHERE l.project_id = p.id
), 0);
