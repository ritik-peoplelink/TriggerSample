import pkg from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const {Schema,model,models} = pkg;

const messageStore = process.env.messageStore;

const msgSchema = new Schema({
    message: String,
    senderId: String,
    groupId: String,
    seenBy: [{ type: String }],
    at : Number
});

export default models[messageStore] || model(messageStore,msgSchema);