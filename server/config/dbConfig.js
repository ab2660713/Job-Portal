import mongoose from "mongoose";

let cachedConnection = null;

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not configured on the server");
    }

    if (cachedConnection) {
      return cachedConnection;
    }

    const conn = await mongoose.connect(process.env.MONGO_URI);
    cachedConnection = conn;
    console.log(`DB CONNECTION SUCCESS : ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`Error in DB connection: ${error.message}`);
    throw error;
  }
};

export default connectDB;
