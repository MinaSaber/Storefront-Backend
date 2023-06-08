import express, { Request, Response } from 'express'
import verifyAuthToken from '../middleware/verifyAuthToken'
import { Order_products , order_productsStore } from '../models/order_products'

const store = new order_productsStore()

const createOrderProduct = async (req: Request, res: Response) => {
    const orderProduct: Order_products = {
      order_id: (req.body.orderId as unknown) as number,
      product_id: (req.body.productId as unknown) as number,
      quantity: (req.body.quantity as unknown) as number,
    };
  
    try {
      const addedProduct = await store.createOrderProduct(orderProduct);
      res.json(addedProduct);
    } catch (err) {
      res.status(400);
      res.json(err);
    }
  };

  const order_productsRoutes = (app: express.Application) => {
    app.post("/orders/products", verifyAuthToken, createOrderProduct);
  }
  
  export default order_productsRoutes