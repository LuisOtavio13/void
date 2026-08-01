CREATE TABLE likes (
    id BIGSERIAL PRIMARY KEY,
    is_like BOOLEAN NOT NULL,
    user_id BIGINT NOT NULL,
    project_id BIGINT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_likes_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_likes_project FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    CONSTRAINT uq_likes_user_project UNIQUE (user_id, project_id)
);

alter table projects drop column likes;
alter table projects add column likes_count INT NOT NULL DEFAULT 0;