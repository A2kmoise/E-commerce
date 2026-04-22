import express from "express";
import { send_sms, verify_sms } from "../controllers/sms.controllers";
import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware";

const smsRouter = Router();

smsRouter.post('/sms-send',requireAuth,send_sms);
smsRouter.post('/sms-verify',requireAuth, verify_sms);


export default smsRouter;