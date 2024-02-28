-- Active: 1709114763108@@147.139.210.135@5432@eky01@public
CREATE TABLE recipe (
    id VARCHAR UNIQUE,
    title VARCHAR NOT NULL,
    ingredient TEXT NOT NULL,
    photo VARCHAR,
    created_at TIMESTAMP
);

CREATE table users (
    id VARCHAR UNIQUE,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    date_of_birth DATE NOT NULL,
    address VARCHAR(30) NOT NULL
)


INSERT into recipe (id,title,ingredient,photo,created_at) VALUES('1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', 'egg yolk', 'egg, salt, oil', 'https://placehold.co/600x400', NOW())

INSERT INTO users (id, first_name, last_name, date_of_birth, address) VALUES('6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b', 'Rizky', 'Syahputra', '2021-05-13', 'Jl. H. Tohir No.2, RT.2/RW.5')

SELECT * FROM recipe

SELECT * FROM users