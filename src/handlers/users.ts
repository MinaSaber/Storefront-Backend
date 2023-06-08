import express, { Request, Response } from 'express'
import { User, userStore } from '../models/user'
import dotenv from "dotenv"
import bcrypt from "bcrypt"
import verifyAuthToken from '../middleware/verifyAuthToken'

dotenv.config();
const { BCRYPT_SALT_ROUNDS, BCRYPT_PEPPER, } = process.env;

const store = new userStore()

const index = async (_req: Request, res: Response) => {
  try {
    const users = await store.index()
    res.json(users)
  } catch(err) {
    res.status(400);
    res.json(err);
  }
}

const show = async (req: Request, res: Response) => {
   try {
    const user = await store.show(req.body.id)
    res.json(user)
   } catch (err) {
    res.status(400);
    res.json(err);
   }
}

const create = async (req: Request, res: Response) => {
    const pepperedPassword = `${req.body.password}${BCRYPT_PEPPER}`;
    const salt = await bcrypt.genSalt(parseInt(BCRYPT_SALT_ROUNDS as string));
    const hashPassword = bcrypt.hashSync(pepperedPassword, salt);
  
    try {
      const user: User = {
        id: req.body.id as number,
        firstName: req.body.firstname as string,
        lastName: req.body.lastname as string,
        password: hashPassword as string,
      };
  
      const { id, firstName } = await store.create(user);
      res.json({ id, firstName });
    } catch (err) {
      res.status(400);
      res.json(err);
    }
  };

  
const userRoutes = (app: express.Application) => {
  app.get('/users', index)
  app.get('/users/:id', show)
  app.post('/users', verifyAuthToken , create)
}

export default userRoutes