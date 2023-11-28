import express from 'express';
import http from 'http';
import * as handler from './socket-handler.js';
const {handleJoin,handleChatMessage,handleDisconnect} = handler;
import { Server as SocketIOServer } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server);



io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on("joinRoom",async(data)=>{
    await handleJoin(io,socket,data);
  })

  // Listen for chat messages
  socket.on('sendMessage', async(data) => {
    await handleChatMessage(io,socket,data);
    // const {message,senderId,currentTime} = data;
    // if(message !="" && sender !="")
    // {
    //     const newData = {
    //         message : message,
    //         senderId : senderId,
    //         receiverId : receiverId,
    //         seenBy : [],
    //         at : currentTime
    //     }
    //     const result = await create(process.env.messageStore,)
    // }
    // io.emit('chat message', msg); // Broadcast the message to all connected clients
  });

  // Handle disconnection
  socket.on('disconnect', async() => {
    await handleDisconnect(io,socket);
  });
});

// Start the server
const PORT =  8100;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
