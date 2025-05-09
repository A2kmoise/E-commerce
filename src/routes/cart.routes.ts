import express from 'express';
import { cart_get, cart_post,cart_put,cart_delete, cart_deleteById } from '../controllers/cart.controllers';
import { Router } from 'express';
import { requireAuth } from '../middleware/auth.middleware';

const cartRouter = Router();

cartRouter.get('/',requireAuth,cart_get);
cartRouter.post('/',requireAuth,cart_post);
cartRouter.put('/:itemId',requireAuth, cart_put);
cartRouter.delete('/:itemId',requireAuth, cart_deleteById);
cartRouter.delete('/',requireAuth, cart_delete);


export default cartRouter;
