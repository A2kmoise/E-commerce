import express from "express";
import { Request,Response } from "express";
import { PrismaClient } from "../generated/prisma/client";
import { create } from "domain";

const prisma = new PrismaClient();

export const cart_get = async (req:Request, res:Response) => {
try {
    const cart =  await prisma.cart.findMany();
    return res.status(200).json(cart);

} catch (err) {
    res.status(500).json({ message: "Server error", details: err});
}
};


export const cart_post = async (req: Request, res: Response) => {
    const { itemIds, ownerId } = req.body;

    
    if (!ownerId || !itemIds || !Array.isArray(itemIds) || itemIds.length === 0) {
        return res.status(400).json({ message: "Data is missing" });
    }

    try {
        
        const items = await prisma.products.findMany({
            where: {
                id: { in: itemIds },
            },
        });

        if (items.length !== itemIds.length) {
            return res.status(400).json({ message: "Invalid request" });
        }

        
        const userExist = await prisma.users.findUnique({
            where: {
                id: ownerId,
            },
        });

        if (!userExist) {
            return res.status(400).json({ message: "Invalid user" });
        }

      
        const cart = await prisma.cart.create({
            data: {
                ownerId,
                item: {
                    create: itemIds.map((item: { productId: string; }) => ({
                      product: { connect: { id: item.productId } }, 
                      order: { connect: { id: ''} },  
                    })),
                  },
                }     
        });

        res.status(201).json({ message: "Cart created", cart });

    } catch (err) {
        res.status(500).json({ message: "Server error", details: err });
    }
};

export const cart_put = (req:Request, res:Response) => {
const { id, itemIds } = req.body;
try {
     const updatedCart = {
        id,
        itemIds
     };

     res.status(200).json({message: "Cart updated"});

} catch (err) {
 res.status(500).json({message: "Server error", details: err});  
}
};


export const cart_delete = async (req:Request, res:Response) => {
    const {id} = req.body;
try {
    await prisma.cart.delete({
        where: {
            id,
        }
    });
 res.status(200).json({message:"Cart deleted already"});
} catch (err) {
    res.status(500).json({message:"Server error"})
}
};
export const cart_deleteById = (req:Request, res:Response) => {

};