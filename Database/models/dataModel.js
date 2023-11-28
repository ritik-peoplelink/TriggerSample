import pkg from "mongoose";
const { Schema, models, model } = pkg;
import dotenv from 'dotenv';
dotenv.config();
const dataTable = process.env.dataTable;

const dataSchema = new Schema({
  _id: String,
  group_id: String,
  domain_id: String,
  client_app_id: String,
  name: String,
  location: String,
  deployment_model: String,
  last_used: Number,
  last_modified: Number,
  product: String,
  environment: String,
});

export default models[dataTable] || model(dataTable, dataSchema);
