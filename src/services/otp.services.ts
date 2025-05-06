import otpGenerator from 'otp-generator';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { PrismaClient } from '../generated/prisma/client';


dotenv.config();
const prisma = new PrismaClient();

export const generateOtp = () => {
  return otpGenerator.generate(6, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false
  });
};

export const saveOtpToDB = async (email: string, otp: string) => {
  return await prisma.otp.create({
    data: {
      email,
      otp
    }
  });
};

export const sendOtpEmail = async (email: string, otp: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });


  return await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Shop OTP Verification',
    text: `Your OTP verification code is: ${otp}`
  });
};
