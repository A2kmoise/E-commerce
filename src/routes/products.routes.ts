import express from 'express';
import { product_get, product_getById, product_post, product_put, product_delete } from '../controllers/products.controllers';
import { Router } from 'express';


const productsRouter = Router()

productsRouter.get('/', product_get)
productsRouter.get('/:id', product_getById)
productsRouter.post('/', product_post)
productsRouter.put('/:id', product_put)
productsRouter.delete('/:id', product_delete)

export default productsRouter;