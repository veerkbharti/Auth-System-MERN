import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    const db = await mongoose.connect(process.env.DB_URI);
    console.log(`MongoDB connected with server: ${db.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

export default connectDatabase;
