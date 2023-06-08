# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
`GET /` - homepage

`GET /products` - READ all products\
`GET /products/:productName` - READ specific product by product name\
`POST /products` - CREATE product\

`GET /users` - READ all users\
`GET /users/:username` - READ specific user by username\
`POST /users/register` - CREATE user\
`POST /users/login` - LOGIN user\

`GET /orders` - READ all orders\
`GET /orders/:userId` - READ orders by user id\
`POST /orders` - CREATE order\
`POST /orders/products` - CREATE order with product quantity and product id\

## Data Shapes
#### Product
-  id
- name
- price

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- user_id
- status of order (active or complete)

#### order_products
- id
- order_id
- product_id
- quantity

### Database Schema

```shell
Table "public.products"
 Column |          Type          | Collation | Nullable |               Default                
--------+------------------------+-----------+----------+--------------------------------------
 id     | integer                |           | not null | nextval('products_id_seq'::regclass)
 name   | character varying(100) |           | not null | 
 price  | integer                |           | not null | 
Indexes:
    "products_pkey" PRIMARY KEY, btree (id)
```

```shell
Table "public.users"
Column    |          Type           | Collation | Nullable |              Default              
----------+-------------------------+-----------+----------+-----------------------------------
id        | integer                 |           | not null | nextval('users_id_seq'::regclass)
firstname | character varying(255)  |           |          |
lastname  | character varying(255)  |           |          |
id        | integer                 |           |          |
password  | character varying(1024) |           |          |
Indexes:
"users_pkey" PRIMARY KEY, btree (id)
Referenced by:
TABLE "orders" CONSTRAINT "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)
```

```shell
Table "public.orders"
Column  |          Type          | Collation | Nullable |              Default               
--------+------------------------+-----------+----------+--------------------------------------
id      | integer                |           | not null | nextval('orders_id_seq'::regclass)
status  | character varying(100) |           |          |
user_id | bigint                 |           |          |
Indexes:
"orders_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
"orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)
```

```shell
Table "public.order_products"
Column     |  Type   | Collation | Nullable |                  Default                   
-----------+---------+-----------+----------+--------------------------------------------------
id         | integer |           | not null | nextval('order_products_id_seq'::regclass)
quantity   | integer |           |          |
order_id   | bigint  |           |          |
product_id | bigint  |           |          |
Indexes:
"order_products_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
"order_products_order_id_fkey" FOREIGN KEY (order_id) REFERENCES orders(id)
"order_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id)
```
