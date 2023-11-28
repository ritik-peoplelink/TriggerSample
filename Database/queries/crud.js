import pkg from 'mongoose';
const { models} = pkg;
import { connectToDatabase } from "../connection/db_connection.js";

async function create(tableName, data, options = null) {
  return new Promise(async (resolve, reject) => {
    try {
      await connectToDatabase();
      if (!models[tableName]) throw new Error("Model not found");
      const model = models[tableName];
      const result = await model.create(data);
      resolve(result);
    } catch (err) {
      reject(err);
    }
  });
}
async function updateOne(tableName, filter, update, options = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        await connectToDatabase();
        if (!models[tableName]) throw new Error("Model not found");
        const model = models[tableName];
        const result = await model.findOneAndUpdate(filter, update, options);
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
}

async function findOne(tableName, filter, projection = {}, options = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        await connectToDatabase();
        if (!models[tableName]) throw new Error("Model not found");
        const model = models[tableName];
        const result = await model.findOne(filter, projection, options);
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
}
async function deleteOne(tableName, filter, options = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        await connectToDatabase();
        if (!models[tableName]) throw new Error("Model not found");
        const model = models[tableName];
        const result = await model.deleteOne(filter, options);
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  }
  async function deleteMany(tableName, filter, options = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        await connectToDatabase();
        if (!models[tableName]) throw new Error("Model not found");
        const model = models[tableName];
        const result = await model.deleteMany(filter, options);
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  }
async function count(tableName, filter) {
    return new Promise(async (resolve, reject) => {
      try {
        await connectToDatabase();
        if (!models[tableName]) throw new Error("Model not found");
        const model = models[tableName];
        const result = await model.count(filter);
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  }

  async function aggregrate(tableName, pipeline, options = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        await connectToDatabase();
        if (!models[tableName]) throw new Error("Model not found");
        const model = models[tableName];
        const result = await model.aggregate(pipeline, options);
        resolve(result);
      } catch (err) {
        console.log('aggregation error.......', err)
        reject(err);
      }
    });
  }
  
export{
    create,
    updateOne,
    findOne,count,deleteOne,deleteMany,aggregrate
}