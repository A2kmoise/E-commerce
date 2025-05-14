import express from "express";
import { send_sms, verify_sms } from "../controllers/sms.controllers";
import { Router } from "express";

const smsRouter = Router();

smsRouter.post('/sms-send', send_sms);
smsRouter.post('/sms-verify', verify_sms);


export default smsRouter;