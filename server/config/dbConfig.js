import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`DB CONNECTION SUCCESS : ${conn.connection.name}`);
  } catch (error) {
    console.error(`Error in DB connection: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
