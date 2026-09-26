ALTER TABLE likes
    ALTER COLUMN project_id DROP NOT NULL;

ALTER TABLE likes
    ADD COLUMN comment_id BIGINT;

ALTER TABLE comments
    DROP COLUMN IF EXISTS likes;

ALTER TABLE comments
    DROP COLUMN IF EXISTS dislikes;

ALTER TABLE likes
    ADD CONSTRAINT fk_likes_comment
        FOREIGN KEY (comment_id)
        REFERENCES comments(id)
        ON DELETE CASCADE;

ALTER TABLE likes
    ADD CONSTRAINT ck_likes_target
        CHECK (
            (project_id IS NOT NULL AND comment_id IS NULL)
            OR
            (project_id IS NULL AND comment_id IS NOT NULL)
        );

ALTER TABLE likes
    DROP CONSTRAINT uq_likes_user_project;

CREATE UNIQUE INDEX uq_likes_user_project
    ON likes (user_id, project_id)
    WHERE project_id IS NOT NULL;

CREATE UNIQUE INDEX uq_likes_user_comment
    ON likes (user_id, comment_id)
    WHERE comment_id IS NOT NULL;