ALTER TABLE users
ADD COLUMN IF NOT EXISTS banner_url VARCHAR(1000);

UPDATE users
SET banner_url = 'https://i.pinimg.com/736x/06/0c/55/060c55db8f1c3a1246fcebed10755f62.jpg'
WHERE banner_url IS NULL;

ALTER TABLE users
ALTER COLUMN banner_url SET DEFAULT 'https://i.pinimg.com/736x/06/0c/55/060c55db8f1c3a1246fcebed10755f62.jpg';

ALTER TABLE users
ALTER COLUMN banner_url SET NOT NULL;