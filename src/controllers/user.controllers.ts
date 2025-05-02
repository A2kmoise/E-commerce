import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import { login } from "../model/user.model";
import { PrismaClient } from "../generated/prisma/client";

const prisma = new PrismaClient


//creating tokens
const maxAge = 3 * 24 * 60 * 60
const createTokens = (id: string) => {
    const secret = process.env.JWT_SECRET_KEY;
    if (!secret) {
        throw new Error("JWT_SECRET_KEY is not defined in environment variables")
    }
    return jwt.sign({ id }, secret, { // or return jwt.sign({ id }, process.env.JWT_SECRET_KEY!, {
        expiresIn: maxAge
    })
}


export const signup_get = (req: Request, res: Response) => {
    res.send('New user signedup');
};


export const signup_post = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !validator.isEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = await prisma.users.create({
            data:
            {
                email,
                password: hashedPassword,
            }
        });
        const token = createTokens(user.id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })

        res.status(201).json({ message: 'User created', user });
    } catch (err) {

        res.status(500).json({ message: "Server error", details: err })
    }
};


export const login_get = (req: Request, res: Response) => {
    res.send('User loggedin');
};


export const login_post = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await login(email, password);
        const token = createTokens(user.id)
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 })
        res.status(201).json({ message: 'User loggedin', user });
    } catch (err) {
        res.status(500).json({ message: 'Server error', details: err })
    }
};


export const logout_get = (req: Request, res: Response) => {
    res.cookie('jwt', '', { httpOnly: true, maxAge: 1 });
    res.send('loggedout')
    //res.redirect('/login')
};