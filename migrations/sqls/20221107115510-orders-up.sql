CREATE TABLE orders (
    user_id int not null,
    FOREIGN KEY (user_id) REFERENCES users(id),
    status VARCHAR(50)
);