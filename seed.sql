-- Active: 1709114763108@@147.139.210.135@5432@eky01@public
CREATE TABLE recipe (
    id VARCHAR UNIQUE,
    title VARCHAR NOT NULL,
    ingredient TEXT NOT NULL,
    photo VARCHAR,
    created_at TIMESTAMP
);

ALTER TABLE recipe ADD COLUMN updated_at TIMESTAMP;

UPDATE recipe SET updated_at=NOW();

CREATE TABLE kategori (
    id VARCHAR UNIQUE,
    name VARCHAR(20) NOT NULL 
)

INSERT INTO kategori (id, name) VALUES('6890b27f-11c0-43da-975e-2a324d9ebae0b', 'dinner')

SELECT * FROM kategori

UPDATE kategori SET update_at=NOW()

INSERT into recipe (id,title,ingredient,photo,created_at) VALUES('1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', 'egg yolk', 'egg, salt, oil', 'https://placehold.co/600x400', NOW())

SELECT * FROM recipe

CREATE table users (
    id VARCHAR UNIQUE,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    date_of_birth DATE NOT NULL,
    address VARCHAR(30) NOT NULL
)

INSERT INTO users (id, first_name, last_name, date_of_birth, address) VALUES('6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b', 'Rizky', 'Syahputra', '2021-05-13', 'Jl. H. Tohir No.2, RT.2/RW.5', NOW())

ALTER TABLE users
ADD created_at TIMESTAMP WITH TIME ZONE

ALTER TABLE users
ADD COLUMN age VARCHAR (20)

SET TIMEZONE='Asia/Jakarta'



SELECT * FROM users WHERE first_name ILIKE '%eky%' ORDER BY updated_at DESC LIMIT 3 OFFSET 0;
SELECT COUNT(*) FROM users WHERE first_name ILIKE '%%';