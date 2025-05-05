import express from 'express'
import {  order_get, order_getById, order_post} from '../controllers/order.controllers';
import { Router } from 'express'
import { requireAuth } from '../middleware/auth.middleware';

const ordersRouter = Router();

ordersRouter.post('/',requireAuth, order_post);
ordersRouter.get('/',requireAuth, order_get);
ordersRouter.get('/:id',requireAuth, order_getById);

export default ordersRouter;