import express from 'express';
import { getAllChats, getAllContacts, getMessageByUserId, sendMessage } from '../Controllers/message.controllers.js';
import { protectRouteMiddleware } from '../middleware/auth.middleware.js';
import { arcjetProtection } from '../middleware/arcjet.middleware.js';

const messageRouter=express.Router();

// this middleware are use to hanle rate limit per minute with user id authenticate or not 
messageRouter.use(arcjetProtection,protectRouteMiddleware)

messageRouter.get("/contacts",getAllContacts);
messageRouter.get("/chats",getAllChats);
messageRouter.get("/chat/:id",getMessageByUserId);
messageRouter.post("/send/:id",sendMessage)

export default messageRouter;