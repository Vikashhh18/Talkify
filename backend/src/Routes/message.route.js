import express from 'express';
import { messageget, messageSend } from '../Controllers/message.controllers.js';

const messageRouter=express.Router();

messageRouter.get("/send",messageSend);
messageRouter.get("/get",messageget);

export default messageRouter;