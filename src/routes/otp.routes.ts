import { Router }from 'express';
import { otpsend, otpVerify } from '../controllers/otp.controllers';

const otprouter = Router();

otprouter.post('/otp-s',otpsend);
otprouter.post('/ver-otp',otpVerify);


export default otprouter;
