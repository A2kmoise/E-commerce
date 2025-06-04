import express from "express";
import { Twilio } from "twilio";
import { Request, Response } from "express";
import { sendSMS } from "../services/sms.services";
import { error } from "console";


const twilioClient = new Twilio(
process.env.TWILIO_ACCOUNT_SID!,
process.env.TWILIO_AUTH_TOKEN!
)

const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID!;

export const send_sms = async ( req:Request, res:Response) => {
  try {
  const { number } = req.body;
  if (!number || typeof number !== "string"){ return res.status(401).json({message: "A valid phone number is required"})};

    await sendSMS(req, res);
  } catch (error) {
    res.status(500).json({ error: "An unexpected error occurred.", details: error });
  }
};

export const verify_sms = async ( req:Request, res:Response) => {
  const {sms, number} = req.body;
try {
  if (!sms || typeof sms !== "string"){return res.status(401).json({message:"A valid Sms code missing"})};

  if (!number || typeof number !== "string"){return res.status(401).json({message:"A valid number is required"})};


  const verificationCheck = await twilioClient.verify.v2
  .services(verifyServiceSid)
  .verificationChecks.create({
    to:number,
    code:sms
  });


  if(verificationCheck.status === "approved"){
    return res.status(201).json({message:"Verification successfull"});
  } else {
    return res.status(400).json({message:"Invalid or expired code"});
  } 

} catch (error) {
  return res.status(500).json({message:"Server error", details: (error as Error).message}); 
}
}