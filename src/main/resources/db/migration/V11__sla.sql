ALTER TABLE comments
ADD COLUMN parent_comment_id BIGINT;

ALTER TABLE comments
ADD CONSTRAINT fk_comments_parent
FOREIGN KEY (parent_comment_id)
REFERENCES comments(id)
ON DELETE CASCADE;