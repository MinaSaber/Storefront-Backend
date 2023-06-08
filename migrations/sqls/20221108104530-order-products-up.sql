CREATE TABLE order_products (
    order_id SERIAL PRIMARY KEY not null,
    product_id int not null,
    FOREIGN KEY (product_id) REFERENCES products(id),
    quantity int not null
)