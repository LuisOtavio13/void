ALTER TABLE Comments ADD COLUMN likes int not null default 0;
ALTER TABLE Comments ADD COLUMN dislikes int not null default 0;
