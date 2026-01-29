import User from "../models/User.js";
import bcrypt from 'bcrypt'
import { generateToken } from "../utils/util.js";
import "dotenv/config";
import { sendWelcomeEmail } from "../Email/emailHandler.js";

export const loginController = async (req, res) => {
    const {email,password}=req.body;
    try {
        if(!email ||!password){
            return res.status(400).json({message:"fill all require field"});
        }

        const userExist=await User.findOne({email});
        if(!userExist){
            return res.status(400).json({message:"Email not be registered"});
        }

        const passwordCheck=await bcrypt.compare(password,userExist.password);
        if(!passwordCheck){
            return res.status(400).json({message:"Passowrd is not matched"});
        }

        generateToken(userExist._id,res);
        res.status(200).json({
            _id:userExist._id,
            fullName:userExist.fullName,
            email:userExist.email,
            profilePic:userExist.profilePic
        });

    } catch (error) {
        console.log("Error in login part: ",error)
    }
}

export const registerController = async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // to validate the given email 
        const simpleRegex =
            /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/im;

        if (!simpleRegex.test(email)) {
            return res.status(400).json({ message: "Email invalid" });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "this email is already exisit" });
        }

        if (password.length < 6) return res.status(400).json({ message: "Passowrd must have at least 6 length" });


        // hashed the password by using bcrypt module
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        });

        if (newUser) {
            const savedUser = await newUser.save();
            generateToken(savedUser._id, res);

            try {
                await sendWelcomeEmail(
                    savedUser.email,
                    savedUser.fullName,
                    process.env.CLIENT_URL
                );
                console.log("Email sent successfully");
            } catch (error) {
                console.log("Something went wrong to send welcome email", error);
            }

            res.status(201).json({
                _id: savedUser._id,
                fullName: savedUser.fullName,
                email: savedUser.email,
                profilePic: savedUser.profilePic,
            });

        }
        else {
            return res.status(400).json({ message: "Something went wrong" });
        }
    } catch (error) {
        console.log("Error occured in register Controllers ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const logoutController = async (req, res) => {
    res.cookie("jwt","",{maxAge:0});
    res.status(200).json({message:"User Logout Successfully"});
}