-- 1. Ativar a extensão de Trigramas de forma oficial via migration
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- 2. Garantir a existência da tabela global_search
CREATE TABLE IF NOT EXISTS global_search (
    id BIGSERIAL PRIMARY KEY,
    source_table VARCHAR(50) NOT NULL, 
    record_id BIGINT NOT NULL,        
    search_vector tsvector,               
    update_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 3. Índices necessários (Invertido GIN e Unicidade)
CREATE INDEX IF NOT EXISTS idx_global_search_vector ON global_search USING GIN (search_vector);
CREATE UNIQUE INDEX IF NOT EXISTS idx_global_search_origin_id ON global_search (source_table, record_id);

-- 4. Função da Trigger com tratamento LOWER para evitar erros de maiúsculas/minúsculas
CREATE OR REPLACE FUNCTION update_global_search()
RETURNS TRIGGER AS $$
BEGIN
    IF LOWER(TG_TABLE_NAME) = 'projects' THEN
        INSERT INTO global_search (source_table, record_id, search_vector, update_date)
        VALUES (
            'projects', 
             NEW.id, 
            setweight(to_tsvector('portuguese', COALESCE(NEW.name, '')), 'A') || 
            setweight(to_tsvector('portuguese', COALESCE(NEW.description, '')), 'B'),
            CURRENT_TIMESTAMP
        )
        ON CONFLICT (source_table, record_id) 
        DO UPDATE SET search_vector = EXCLUDED.search_vector, update_date = CURRENT_TIMESTAMP;
        
    ELSIF LOWER(TG_TABLE_NAME) = 'users' THEN
        INSERT INTO global_search (source_table, record_id, search_vector, update_date)
        VALUES (
            'users', 
            NEW.id, 
            setweight(to_tsvector('portuguese', COALESCE(NEW.username, '')), 'A') || 
            setweight(to_tsvector('portuguese', COALESCE(NEW.bio, '')), 'B'),
            CURRENT_TIMESTAMP
        )
        ON CONFLICT (source_table, record_id) 
        DO UPDATE SET search_vector = EXCLUDED.search_vector, update_date = CURRENT_TIMESTAMP;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 5. Criar os Gatilhos (Triggers) vinculados às tabelas minúsculas do \dt
DROP TRIGGER IF EXISTS trg_search_projects ON projects;
CREATE TRIGGER trg_search_projects
AFTER INSERT OR UPDATE ON projects
FOR EACH ROW EXECUTE FUNCTION update_global_search();

DROP TRIGGER IF EXISTS trg_search_users ON users;
CREATE TRIGGER trg_search_users
AFTER INSERT OR UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION update_global_search();

-- 6. Carga Inicial Automática (Lê seus 13 projetos e 4 usuários atuais e joga na busca)
INSERT INTO global_search (source_table, record_id, search_vector, update_date)
SELECT 
    'projects', 
    id, 
    setweight(to_tsvector('portuguese', COALESCE(name, '')), 'A') || 
    setweight(to_tsvector('portuguese', COALESCE(description, '')), 'B'),
    CURRENT_TIMESTAMP
FROM projects
ON CONFLICT (source_table, record_id) DO NOTHING;

INSERT INTO global_search (source_table, record_id, search_vector, update_date)
SELECT 
    'users', 
    id, 
    setweight(to_tsvector('portuguese', COALESCE(username, '')), 'A') || 
    setweight(to_tsvector('portuguese', COALESCE(bio, '')), 'B'),
    CURRENT_TIMESTAMP
FROM users
ON CONFLICT (source_table, record_id) DO NOTHING;
