import { Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma/client';
import { generateOtp, saveOtpToDB, sendOtpEmail } from '../services/otp.services';
import validator from 'validator';

const prisma = new PrismaClient();

export const otpsend = async (req: Request, res: Response) => {
  const { email } = req.body;


  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }
  if (typeof email !== 'string' || !validator.isEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  };

  
  const user = await prisma.users.findUnique({
    where: { email }
  });

  if (!user) {
    return res.status(404).send("User not registered");
  }


  const otp = generateOtp();

  try {
    await saveOtpToDB(email, otp);
    await sendOtpEmail(email, otp);

    res.status(201).json({ message: "OTP sent successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", details: err });
  }
};

export const otpVerify = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  try {
    const otpData = await prisma.otp.findFirst({
      where: { email, otp },
      orderBy: { createdAt: 'desc' }
    });

    const isExpired =otpData && Date.now() - new Date(otpData.createdAt).getTime() > 3 * 60 * 1000;

    if (!otpData || isExpired) {
      return res.status(400).json({ message: "OTP not correct or expired" });
    }

    res.status(200).json({ message: "OTP verified" });
  } catch (err) {
    res.status(500).json({ message: "Server error", details: err });
  }
};
