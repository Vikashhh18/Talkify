import User from "../models/User.js";
import jwt from 'jsonwebtoken'

export const protectRouteMiddleware=async(req,res,next)=>{
    try {
        const token=req.cookies.jwt;
        // console.log("Cookies:", req.cookies," done ji ");
        if(!token)return res.status(201).json({message:"Unauthorized access - no token"});

        const verifyToken=jwt.verify(token,process.env.JWT_SECRET);
        // console.log(verifyToken);

        if(!verifyToken)return res.status(201).json({message:"Unauthorized access- Token is invalid"});

        const user=await User.findById(verifyToken.userId).select("-password");
        if(!user)return res.status(200).json({message:"USer not found"});

        req.user=user;
        next();
    } catch (error) {
        console.log("Error accur in auth middleware: ",error)
    }
}