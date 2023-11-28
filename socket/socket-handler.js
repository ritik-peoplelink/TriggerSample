import { BSON } from 'mongodb';
import {create,findOne,updateOne,deleteOne,deleteMany} from '../Database/queries/crud.js';
import dotenv from 'dotenv';
dotenv.config();
async function handleJoin(io,socket,data) {
    const {roomName,userName,userId} = data;
    const findRoom = await findOne(process.env.roomStore,{roomName : roomName});
    if(!findRoom)
    {
        const newData = {
            roomName : roomName,
            joinedUser : [{
                userId : userId,
                userName : userName,
                socketId : `${socket.id}`
            }]
        }
        await create(process.env.roomStore,newData);
    }else{
        console.log("findRoom Data",findRoom)
        const roomId = new BSON.ObjectId(findRoom._id);
        let updated;
        if(findRoom && findRoom.joinedUser.userId === userId)
        {
            updated = {
                $set: { 'joinedUser.$.socketId': `${socket.id}` }
            }
            await updateOne(process.env.roomStore,{_id : roomId,joinedUser: { $elemMatch: { userId: userId } }},updated);
        }
        else{
            updated = {
                $addToSet: { joinedUser: {
                    userId : userId,
                    userName : userName,
                    socketId : `${socket.id}`
                } },
            }
            await updateOne(process.env.roomStore,{_id : roomId},updated);
        }
    }
    await socket.join(roomName);
    io.to(roomName).emit("userJoinedRoom",`${userName} Joined The Room ..!!`);
}

  async function handleChatMessage(io,socket, data) {
    //!senderId = userId ,groupId = groupName
    const {message,senderId,groupName} = data;
    const filter = {
        'joinedUser.userId' : userId
    }
    const roomData = await findOne(process.env.roomStore,filter,{roomName : 1,_id : 0});
    io.to(roomData.roomName).emit("getMessage",{message : message,senderUsername : sender,sentAt : Number(Date.now())});
  }
  
  async function handleDisconnect(io, socket) {
    try {
      const filter = {
        'joinedUser.socketId': `${socket.id}`
      };
      const [roomData, deleteResult] = await Promise.all([
        findOne(process.env.roomStore, filter),
        deleteMany(process.env.roomStore, filter, { $pull: { joinedUser: { socketId: `${socket.id}` } } })
      ]);
  
      if (roomData) {
        io.to(roomData.roomName).emit("userDisconnected", `${roomData.joinedUser.userName} is Disconnected..!!`);
      } else {
        console.error('Room data not found for the disconnected socket ID:', socket.id);
      }
  
      console.log('Delete result:', deleteResult);
    } catch (error) {
      console.error('Error in handleDisconnect:', error);
    }
  }
  

  export {
    handleJoin,handleChatMessage,handleDisconnect
  }
  
