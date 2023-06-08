import database_info from "../database";
import { Order } from "./order";

export type Order_products = {
    order_id: number,
    product_id: number,
    quantity: number,
}

export class order_productsStore {
   
    async createOrderProduct(o: Order_products): Promise<Order> {
        try {
          const sql =
            "INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *";
          const conn = await database_info.connect();
          const result = await conn.query(sql, [o.order_id, o.product_id, o.quantity]);
          const order = result.rows[0];
    
          conn.release();
    
          return order;
        } catch (err) {
          throw new Error(
            `Unable to add product ${o.product_id} to order ${o.order_id}: ${err}`
          );
        }
      }
}