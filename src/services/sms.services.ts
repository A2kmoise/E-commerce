import express, { Request, Response } from 'express';
import { Twilio } from 'twilio';
import dotenv from 'dotenv';
import { PrismaClient } from '../generated/prisma/client';

dotenv.config();
const prisma = new PrismaClient();

export const sendSMS = async (req: Request, res: Response) => {
  const { number } = req.body;

  const accountSid = process.env.ACCOUNT_SID;
  const authToken = process.env.AUTH_TOKEN;
  const senderNumber = process.env.SENDER_NUMBER;

  
  if (!accountSid || !authToken || !senderNumber) {
    return res.status(500).json({ error: 'Twilio credentials' });
  }

 
  if (!number) {
    return res.status(400).json({ error: " number is required " });
  }

  const client = new Twilio(accountSid, authToken);


  const predefinedMessage = "Welcome to Bebay! We're excited to have you.";

  try {
    const message = await client.messages.create({
      from: senderNumber,
      to: number,
      body: predefinedMessage,
    });

    console.log('Message sent:', message.sid);
    return res.status(200).json({ message: 'SMS sent successfully', sid: message.sid });
  } catch (error) {
    console.error('Failed to send SMS:', error);
    return res.status(500).json({ error: 'Failed to send SMS', details: error });
  }
};
