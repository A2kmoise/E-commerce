import express from "express";
import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma/client";

const prisma = new PrismaClient();

export const product_get = (req: Request, res: Response) => {
    res.send('welcome on homepage');
};
export const product_getById = async (req: Request, res: Response) => {

    try {
        const { id } = req.body;
        const product = await prisma.products.findUnique({
            where: {
                id
            }
        });
        if (!product) {
            res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ product })
    } catch (error) {
        res.status(500).json({ message: "Server error" })
    }

};
export const product_post = async (req: Request, res: Response) => {
    const { name, price } = req.body;

    try {
        const product = await prisma.products.create({
            data: {
                name: name,
                price: price
            }
        });

        res.status(201).json({ message: "Product creates", product })
    } catch (err) {
        res.status(500).json({ message: "Not created", details: err })
    }
};

export const product_put = async (req: Request, res: Response) => {
    const { id } = req.body
    try {
        const updatedData = {
            name: req.body.name,
            price: req.body.price
        }
        const updatedProduct = await prisma.products.update({
            where: { id },
            data: updatedData,
        });
        res.status(200).json({ message: "Product Updated" })
    } catch (error) {
        res.status(500).json({ message: "server problem" })
    }
};


export const product_delete = async (req: Request, res: Response) => {
    const { id } = req.body;
    try {
        await prisma.products.delete({
            where: { id }
        });
        res.status(200).json({ message: "Product deleted" });

    } catch (err) {
        res.status(500).json({ message: "Server error", details: err });
    }

}; 
