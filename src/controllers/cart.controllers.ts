import express from "express";
import { Request,Response } from "express";
import { PrismaClient } from "../generated/prisma/client";

const prisma = new PrismaClient();

export const cart_get = (req:Request, res:Response) => {
res.send('All items in cart');
};
export const cart_post = (req:Request, res:Response) => {
res.send('Add items in cart');  
};
export const cart_put = (req:Request, res:Response) => {
res.send('Update your cart');  
};
export const cart_delete = (req:Request, res:Response) => {
res.send('Delete all items in cart');  
};
export const cart_deleteById = (req:Request, res:Response) => {
res.send('Delete one specific item');  
};