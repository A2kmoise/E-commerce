import express from 'express';
import { product_get, product_getById, product_post, product_put, product_delete } from '../controllers/products.controllers';
import { Router } from 'express';
import  Multer from 'multer';
import multer from 'multer';


const productsRouter = Router()
const upload = multer({dest:'/uploads'});

productsRouter.get('/', product_get)
productsRouter.get('/:id', product_getById)
productsRouter.post('/upload', upload.single('image'), product_post)
productsRouter.put('/:id', product_put)
productsRouter.delete('/:id', product_delete)

export default productsRouter;