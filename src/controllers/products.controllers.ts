import express from "express";
import { Request, Response } from "express";
import cloudinary from "../../cloudinary/cloudinary";
import { PrismaClient } from "../generated/prisma/client";
import fs from 'fs';
import multer from 'multer';
import { json } from "stream/consumers";

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

    if ( !name || !price ) {
        return res.status(400).json({ message:"Name and price are required"});
    }
    

    const parsedPrice = parseInt(price, 10);
    if (isNaN(parsedPrice)) {
        return res.status(400).json({ message: "Price must be a valid number" });
    }


    if (!req.file) {
        return res.status(400).json({ message: "Image is required" });
    }

    const file = req.file!;
    const result = await cloudinary.uploader.upload(file.path, {
        transformation: [{
            folder: 'Items',
            resource_type: 'image'
        },
        {
            crop: 'auto',
            gravity: 'auto',
        }
        ]
    });

    const itemUrl = result.secure_url

    try {
        const product = await prisma.products.create({
            data: {
                name: name,
                price: parsedPrice,
                itemUrl: itemUrl
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
    } catch (err) {
        res.status(500).json({ message: "Server error", details: err })
    }
};


export const product_delete = async (req: Request, res: Response) => {
    const { id } = req.body;
    try {
        await prisma.products.deleteMany({
            where: { id }
        });
        res.status(200).json({ message: "Product deleted" });

    } catch (err) {
        res.status(500).json({ message: "Server error", details: err });
    }

}; 
