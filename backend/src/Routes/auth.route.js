import express from 'express';
import { loginController, logoutController, registerController ,updateProfileController} from '../Controllers/auth.controllers.js';
import { protectRouteMiddleware } from '../middleware/auth.middleware.js';
import { arcjetProtection } from '../middleware/arcjet.middleware.js';
const authRouter=express.Router();


authRouter.post("/register",arcjetProtection,registerController)
authRouter.post("/login",arcjetProtection,loginController)
authRouter.post("/logout",arcjetProtection,logoutController)
authRouter.put("/update-profile",arcjetProtection,protectRouteMiddleware,updateProfileController)

authRouter.get("/check",arcjetProtection,protectRouteMiddleware,(req,res)=>{
    res.status(201).json(req.user);
})

export default authRouter;