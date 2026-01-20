import express from 'express';
import { loginController, logoutController, registerController } from '../Controllers/auth.controllers.js';
const authRouter=express.Router();

authRouter.get("/register",registerController)
authRouter.get("/login",loginController)
authRouter.get("/logout",logoutController)

export default authRouter;