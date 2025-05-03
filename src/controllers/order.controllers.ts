import express from "express";
import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma/client";
import { json } from "stream/consumers";
import { connect } from "http2";

const prisma = new PrismaClient();

export const order_get = async (req: Request, res: Response) => {
  try {
  const orders = await prisma.order.findMany();

  res.status(200).json(orders)

  } catch (err) {
res.status(500).json({message: "Server error", details: err});
  }
};


export const order_getById = async (req: Request, res: Response) => {

  const {id} = req.body;

  try {
const order = await prisma.order.findUnique({
  where : {
    id,
  }
});

res.status(200).json(order)
  } catch (err) {
res.status(500).json({message: "Server error", details: err});
  }
};

export const order_post = async (req: Request, res: Response) => {
  const { userId,  totalPrice ,items} = req.body;

  if (!userId || !items || !totalPrice) {
    return res.status(400).json({ message: "Missing order data." });
  }

  try {
    const newOrder = await prisma.order.create({
      data: {
        userId,
        totalPrice,
        items: {
          create: items.map((item: { productId: string; totalPrice: number; }) => ({
            productId: item.productId,
          })),
        },
      },
    });


    res.status(201).json({ message: "Order created", newOrder });
  } catch (err) {
    res.status(500).json({ message: "Server error", details: err });
  }
};
