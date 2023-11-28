import pkg from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const {Schema ,models,model} = pkg;

const storeTable = process.env.storeTable || "stores";

const storeSchema = new Schema({
  productName: { type: String },
  price: { type: Number }
});

export default models[storeTable] || model(storeTable, storeSchema);
