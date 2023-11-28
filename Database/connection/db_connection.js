import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
import * as models from '../models/index.js';
let isConnected;
const uri = process.env.mongoConnUrl;
export async function connectToDatabase() {
  if (isConnected) {
    console.log("Existing DataBase Connection!!");
    return Promise.resolve();
  }
  try {
    const db = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName : "StreamTest"
    });
    isConnected = db.connections[0].readyState;
    console.log("DataBase Connected Successfully--------------->");
  } catch (error) {
    console.error("Error In DB Connection:", error);
    throw error;
  }
}
export async function disconnectFromDatabase() {
  if (!isConnected) {
    return Promise.resolve();
  }

  await mongoose.disconnect();
  isConnected = false;
  console.log("=> database disconnected");
}
