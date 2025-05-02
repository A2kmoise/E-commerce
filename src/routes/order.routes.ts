import express from 'express'
import {  order_get, order_getById, order_post} from '../controllers/order.controllers';
import { Router } from 'express'

const ordersRouter = Router();

ordersRouter.post('/', order_post);
ordersRouter.get('/', order_get);
ordersRouter.get('/:id', order_getById);

export default ordersRouter;