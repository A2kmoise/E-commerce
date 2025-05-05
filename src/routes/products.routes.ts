import express from 'express';
import { product_get, product_getById, product_post, product_put, product_delete } from '../controllers/products.controllers';
import { Router } from 'express';
import  Multer from 'multer';
import multer from 'multer';
import { requireAuth } from '../middleware/auth.middleware';


const productsRouter = Router()
const upload = multer({dest:'/uploads'});

productsRouter.get('/', product_get)
productsRouter.get('/:id', product_getById)
productsRouter.post('/upload',requireAuth, upload.single('image'), product_post)
productsRouter.put('/:id',requireAuth, product_put)
productsRouter.delete('/:id',requireAuth, product_delete)

export default productsRouter;