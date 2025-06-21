import express, { NextFunction } from "express";
import jwt, { JsonWebTokenError, Jwt, JwtPayload } from 'jsonwebtoken';
import { Response, Request } from "express";
import cookieParser from "cookie-parser";


export const requireAuth = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err: JsonWebTokenError | null, decodedToken: JwtPayload | any) => {
            if (err) {
                console.log(err.message);
                res.redirect('/users/login');
            } else {
                console.log(decodedToken);
                next()
            };
        });
    } else {
        res.status(401).json({message:"Unauthorised"});
    }
}