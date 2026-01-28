import jwt from 'jsonwebtoken'

export const generateToken=async(id,res)=>{
    const token=jwt.sign({userId:id},process.env.JWT_SECRET,{expiresIn:"7d"});

    res.cookie("jwt",token,{
        maxAge:7*24*60*60*60*1000,
        httpOnly:true,
        sameSite:"strict",
        secure:process.env.NODE_ENV==="develpment"?false:true,
    })
    return token;
}