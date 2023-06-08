### Storefront Backend Project

#### Summary
> The company's stakeholders have decided that they want to create an online store where their product ideas can be purchased – and they want me and a coworker to build it.
The stakeholders have compiled a list of prerequisites for this online store. My coworker will build the frontend, while I will `provide the backend`, and the requirements have been compiled into a requirements document.
I'll `build the database`, including tables and columns, to meet the data requirements, and then `write a RESTful API` to expose that information to the frontend developer.
In order to be ready for beta testing, my application needs to `have tests`, `secure user information`, and `provide user authentication tokens` that are ready to integrate with the frontend.

#### Run on local

```shell
$ cd Store Back
$ npm install
$ npm start
```

#### Initialize PostgreSQL and connect to database

```shell
# start PostgreSQL
$ psql -h localhost -U postgres

# create database for dev env
$ CREATE DATABASE products_db;

# list out all databases
$ \dt

# connect to database
$ \c products_db

# quit PostgreSQL
$ \q
```

#### Migration script for `test` database

```shell
$ npm run test
```

#### Migration script for `dev` database

```shell
$ npm run dev
```

#### Environment Variables

The environment variables are available in the `.env` file.

```shell
# port number
PORT=3000

# port of the database
PORT=5432

# default env
ENV=dev

# PostgreSQL database for dev
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=products_db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password123

# database for testing
POSTGRES_TEST_DB=products_db_test

# password encryption
SALT_ROUNDS=10
BCRYPT_PASSWORD=speak-friend-and-enter

# JWT
TOKEN_SECRET=alohomora123!
```

#### API Endpoints

Please check the `REQUIREMENTS.md` file.