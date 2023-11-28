import pkg from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const {Schema,model,models} = pkg;

const tokenTable = process.env.tokenStore || "tokenstore"
const credSchema = new Schema({
    access_token : {type : String},
    refresh_token : {type : String},
    user_id : String,
    device_id : Number,
    createdAt : {type:Number,default : Date.now()}
})

export default models[tokenTable] || model(tokenTable, credSchema);





