import database_info from "../database";

export type Product = {
    id: number,
    name: string,
    price: number
}

export class productStore {

    async index(): Promise<Product[]> {
        try {
            const conn = await database_info.connect()
            const sql = 'SELECT * FROM products'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error (`cannot get product ${err}`)
        }
    }

    async show(id: string): Promise<Product> {
        try {
            const conn = await database_info.connect()
            const sql = `SELECT * FROM products WHERE id=($1)`
            const result = await conn.query(sql)
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error (`cannot find product ${id}. Error: ${err}`)
        }
    }

    async create(p: Product): Promise<Product> {
        try {
            const conn = await database_info.connect()
            const sql = 'INSERT INTO products (id , name , price) VALUES ($1 , $2 , $3) RETURNING'
            const result =  await conn.query(sql, [p.id , p.name , p.price])
            const product =  result.rows[0]
            conn.release()
            return product
        } catch (err) {
            throw new Error (`cannot add new product. Error: ${err}`)
        }
    }
}