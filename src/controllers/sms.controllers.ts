import express from "express";
import { Twilio } from "twilio";
import { Request, Response } from "express";

export const send_sms = ( req:Request, res:Response) => {
res.send('Sms sent to client');
}

export const verify_sms = ( req:Request, res:Response) => {
res.send('Sms verified');
}