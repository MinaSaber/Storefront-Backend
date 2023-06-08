CREATE TABLE users (
    id SERIAL PRIMARY KEY not null,
    firstName VARCHAR(50) not null,
    lastName VARCHAR(50) not null,
    password VARCHAR(100) not null
);