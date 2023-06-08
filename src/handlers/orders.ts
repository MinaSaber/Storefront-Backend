import express, { Request, Response } from 'express'
import { Order, orderStore } from '../models/order'
import verifyAuthToken from '../middleware/verifyAuthToken'

const store = new orderStore()

const index = async (_req: Request, res: Response) => {
  const orders = await store.index();
  res.json(orders);
}

const show = async (req: Request, res: Response) => {
   try {
    const order = await store.show(req.body.user_id)
    res.json(order)
   } catch (err) {
    res.status(500);
    res.json(err);
   }
}

const createOrder = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      user_id: (req.body.user_id as unknown) as number,
      status: req.body.status as string,
    };

    const newOrder = await store.createOrder(order);
    res.json(newOrder);
  } catch (err) {
    res.status(500);
    res.json(err);
  }
};

const orderRoutes = (app: express.Application) => {
  app.get("/orders", verifyAuthToken, index);
  app.get('/orders/:user_id', verifyAuthToken, show);
  app.post("/orders", verifyAuthToken, createOrder);
}

export default orderRoutes