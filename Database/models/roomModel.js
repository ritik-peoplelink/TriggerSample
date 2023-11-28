import pkg from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const {Schema,model,models} = pkg;

const roomStore = process.env.roomStore;

const roomSchema = new Schema({
   roomName : String,
   joinedUser : [{userId : String,userName : String,socketId:String}]
});

export default models[roomStore] || model(roomStore,roomSchema);