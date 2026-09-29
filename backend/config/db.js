import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Already connected
    if (mongoose.connection.readyState === 1) {
      return;
    }

    // Connection already being established
    if (mongoose.connection.readyState === 2) {
      return;
    }

    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(
      `✅ MongoDB Connected: ${conn.connection.host}`
    );

  } catch (error) {
    console.error(
      `❌ DB Connection Error: ${error.message}`
    );

    throw error;
  }
};

export default connectDB;