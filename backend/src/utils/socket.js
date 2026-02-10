import express from 'express';
import http from 'http'
import { Server } from 'socket.io';
import { socketAuthMiddleware } from '../middleware/socket.auth.middleware.js';

const app=express();
const server= http.createServer(app);


// craete a server using socket io 
const io=new Server(server,{
    cors:{
        origin:[process.env.CLIENT_URL],
        credentials:true
    }
})
// we just use middleware 
io.use(socketAuthMiddleware);

export function getReceiverSocketId(userId){
    return userSocketMap[userId];
}

const userSocketMap = {}; // {userId:socketId}

io.on("connection", (socket) => {
  console.log("A user connected", socket.user.fullName);

  const userId = socket.userId;
  userSocketMap[userId] = socket.id;

  // io.emit() is used to send events to all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));




  // with socket.on we listen for events from clients
  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.user.fullName);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});


export {io,app,server};