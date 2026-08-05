CREATE TABLE global_search (
    id BIGSERIAL PRIMARY KEY,
    source_table VARCHAR(50) NOT NULL, 
    record_id BIGINT NOT NULL,        
    search_vector tsvector,               
    update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_global_search_vector ON busca_global USING GIN (search_vector);

CREATE UNIQUE INDEX idx_global_search_origin_id ON busca_global (source_table, record_id);


CREATE OR REPLACE FUNCTION update_global_search
RETURNS TRIGGER AS $$
BEGIN
    IF TG_TABLE_NAME = 'rojects' THEN
        INSERT INTO global_search (source_table, record_id, search_vector)
        VALUES (
            'projects', 
             NEW.id, 
            setweight(to_tsvector('portuguese', COALESCE(NEW.name, '')), 'A') || 
            setweight(to_tsvector('portuguese', COALESCE(NEW.description, '')), 'B')
        )
        ON CONFLICT (source_table, record_id) 
        DO UPDATE SET search_vector = EXCLUDED.search_vector, update_date = CURRENT_TIMESTAMP;
    ELSIF TG_TABLE_NAME = 'users' THEN
        INSERT INTO global_search (source_table, record_id, search_vector)
        VALUES (
            'users', 
            NEW.id, 
            setweight(to_tsvector('portuguese', COALESCE(NEW.username, '')), 'A') || 
            setweight(to_tsvector('portuguese', COALESCE(NEW.bio, '')), 'B')
            )
        ON CONFLICT (source_table, record_id) 
        DO UPDATE SET search_vector = EXCLUDED.search_vector, update_date = CURRENT_TIMESTAMP;
    END IF;

    RETURN NEW;
END

CREATE TRIGGER trg_search_projects
AFTER INSERT OR UPDATE ON projects
FOR EACH ROW EXECUTE FUNCTION update_global_search();

CREATE TRIGGER trg_search_users
AFTER INSERT OR UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION update_global_search();