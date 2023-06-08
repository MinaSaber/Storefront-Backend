import database_info from "../database";

export type User = {
    id: number,
    firstName: string,
    lastName: string,
    password: string
}

export class userStore {

    async index(): Promise<User[]> {
        try {
            const conn = await database_info.connect()
            const sql = 'SELECT * FROM users'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error (`cannot get user ${err}`)
        }
    }

    async show(id: string): Promise<User> {
        try {
            const conn = await database_info.connect()
            const sql = `SELECT * FROM users WHERE id=($1)`
            const result = await conn.query(sql)
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error (`cannot find user ${id}. Error: ${err}`)
        }
    }

    async create(u: User): Promise<User> {
        try {
            const conn = await database_info.connect()
            const sql = 'INSERT INTO users (id , firstName , lastName , password) VALUES ($1 , $2 , $3 , $4) RETURNING'
            const result =  await conn.query(sql, [u.id , u.firstName , u.lastName , u.password])
            const user =  result.rows[0]
            conn.release()
            return user
        } catch (err) {
            throw new Error (`cannot add new user. Error: ${err}`)
        }
    }

    async login( firstName: number ): Promise<{ id: number; firstName: string; password: string }> {
        try {
          const sql = "SELECT * FROM users WHERE username=($1)";
          const conn = await database_info.connect();
          const result = await conn.query(sql, [firstName]);
          const user = result.rows[0];
    
          conn.release();
    
          return user;
        } catch (err) {
          throw new Error(`Unable to login user ${firstName}: ${err}`);
        }
      }
 }    