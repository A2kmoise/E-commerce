import express from 'express';
import { signup_get, signup_post, login_get, login_post, logout_get } from '../controllers/user.controllers';
import { Router } from 'express';

const userRouter = Router();

userRouter.get('/signup', signup_get)
userRouter.post('/signup', signup_post)
userRouter.get('/login', login_get)
userRouter.post('/login', login_post)
userRouter.get('/logout', logout_get)


export default userRouter;