import express from "express";
import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma/client";

const prisma = new PrismaClient();

export const order_get = ( req:Request, res:Response) => {
res.send('all orders');
};
export const order_getById = ( req:Request, res:Response) => {
res.send("One current user's order"); 
};
export const order_post = ( req:Request, res:Response)  => {
res.send('Create an order');
};