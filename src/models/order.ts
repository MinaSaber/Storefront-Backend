import database_info from "../database";

export type Order = {
    user_id: number,
    status: string
}

export class orderStore {
    createOrderProduct(arg0: { orderId: number; productId: number; quantity: number; }): { order_id: any; product_id: any; quantity: any; } | PromiseLike<{ order_id: any; product_id: any; quantity: any; }> {
        throw new Error("Method not implemented.");
    }

    async index(): Promise<Order[]> {
        try {
          const sql = "SELECT * from orders";
          const conn = await database_info.connect();
          const result = await conn.query(sql);
    
          conn.release();
    
          return result.rows;
        } catch (err) {
          throw new Error(`Unable to get all orders. Error: ${err}`);
        }
      }

    async show(user_id: string): Promise<Order> {
        try {
            const conn = await database_info.connect()
            const sql = `SELECT * FROM orders WHERE id=($1)`
            const result = await conn.query(sql)
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error (`cannot find order ${user_id}. Error: ${err}`)
        }
    }

    async createOrder(o: Order): Promise<Order> {
        try {
          const sql =
            "INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *";
          const conn = await database_info.connect();
          const result = await conn.query(sql, [o.user_id, o.status]);
          const order = result.rows[0];
    
          conn.release();
    
          return order;
        } catch (err) {
          throw new Error(`Unable to create order. Error: ${err}`);
        }
    }
}