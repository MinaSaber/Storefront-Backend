import dotenv from 'dotenv'
import {Pool} from 'pg'

dotenv.config()

const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    POSTGRES_TEST_DB,
    ENV,
} = process.env

let database_info: Pool
  
database_info = new Pool({
  host: POSTGRES_HOST,
  database: ENV === "dev" ? POSTGRES_DB : POSTGRES_TEST_DB,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
});

export default database_info