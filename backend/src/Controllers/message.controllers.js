import Message from "../models/message.js";
import User from "../models/User.js";
import cloudinary from "../utils/cloudinary.js";

export const getAllContacts=async(req,res)=>{
    try {
        const loggedInUserById=req.user._id;
        const getAllUsers=await User.find({_id:{$ne:loggedInUserById}}).select("-password");
        res.status(200).json(getAllUsers);
    } catch (error) {
        console.log("Error occured in getAllContacts controllers: ",error);
    }
}

export const getMessageByUserId=async(req,res)=>{
    try {
        const {id}=req.params;
        const myId=req.user._id;
        const userMessage=await Message.find({
            $or:[
                {senderId:myId,receverId:id},
                {senderId:id,receverId:myId}
            ],
        })
        // console.log(userMessage);
        return res.status(200).json(userMessage);
    } catch (error) {
        console.log("error occured in getMessageByUserId : ",error);
    }
}

export const sendMessage=async(req,res)=>{
    try {
        const {text,image}=req.body;
        const senderId=req.user._id;
        // console.log(first)
        const {id}=req.params;

        if(!text &&!image)return res.status(400).json({message:"Text or image is required"});
        let imageUrl;
        if(image){
            const uploadResponse=await cloudinary.uploader.upload(image);
            imageUrl=uploadResponse.secure_url;
        }
        const newMessage=await Message({
            senderId,
            receverId:id,
            text,
            image:imageUrl
        })
        await newMessage.save();

        // todo: addd WebSocket.io
        return res.status(200).json(newMessage);
    } catch (error) {
        console.log("error occured in sendMessage ,",error);
    }
}

export const getAllChats=async(req,res)=>{
    try {
        const loggedInUser=req.user._id;
        const messagePartner=await Message.find({$or:[{senderId:loggedInUser},{receverId:loggedInUser}]});
        const chartsUserId=[...new Set(messagePartner.map((msg)=>msg.senderId.toString()===loggedInUser.toString()?msg.receverId.toString():msg.senderId.toString()))];
        
        const chartPartner=await User.find({_id:{$in:chartsUserId}}).select("-password");
        return res.status(200).json(chartPartner);
    } catch (error) {
        console.log("Message occured in get AllCharte :",error);
    }
}