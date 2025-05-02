import express from "express";
import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma/client";
import { json } from "stream/consumers";
import { connect } from "http2";

const prisma = new PrismaClient();

export const order_get = ( req:Request, res:Response) => {
try {
    
} catch (err) {
    
}
};
export const order_getById = ( req:Request, res:Response) => {
try {
    
} catch (err) {
    
}
};

export const order_post = async (req: Request, res: Response) => {
    const { userId, items, totalPrice } = req.body;
  
    if (!userId || !items || !totalPrice) {
      return res.status(400).json({ message: "Missing order data." });
    }
  
    try {
      const newOrder = await prisma.order.create({
        data: {
          userId, 
          totalPrice,
          items : {
            create: items.map((item: { productId: string; totalPrice: number }) => ({
                product: { connect: { id: item.productId}},
                totalPrice: item.totalPrice,
            })),
          },
        },
      });
      
      res.status(201).json({ message: "Order created", newOrder });
    } catch (err) {
      res.status(500).json({ message: "Server error", details: err });
    }
  };
  