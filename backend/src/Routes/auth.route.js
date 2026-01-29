import express from 'express';
import { loginController, logoutController, registerController ,updateProfileController} from '../Controllers/auth.controllers.js';
import { protectRouteMiddleware } from '../middleware/auth.middleware.js';
const authRouter=express.Router();

authRouter.post("/register",registerController)
authRouter.post("/login",loginController)
authRouter.post("/logout",logoutController)
authRouter.put("/update-profile",protectRouteMiddleware,updateProfileController)

authRouter.get("/check",protectRouteMiddleware,(req,res)=>{
    res.status(201).json(req.user);
})

export default authRouter;