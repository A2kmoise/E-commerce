import express from 'express';
import { cart_get, cart_post,cart_put,cart_delete, cart_deleteById } from '../controllers/cart.controllers';
import { } from '../controllers/cart.controllers';
import { Router } from 'express';

const cartRouter = Router();

cartRouter.get('/',cart_get);
cartRouter.post('/', cart_post);
cartRouter.put('/:itemId', cart_put);
cartRouter.delete('/:itemId', cart_deleteById);
cartRouter.delete('/', cart_delete);


export default cartRouter;
