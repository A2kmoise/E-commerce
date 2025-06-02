import express from "express";
import { Twilio } from "twilio";
import { Request, Response } from "express";
import { sendSMS } from "../services/sms.services";

export const send_sms = async ( req:Request, res:Response) => {
  try {
    await sendSMS(req, res);
  } catch (error) {
    res.status(500).json({ error: "An unexpected error occurred.", details: error });
  }
};

export const verify_sms = ( req:Request, res:Response) => {
try {
  
} catch (error) {
  
}
}