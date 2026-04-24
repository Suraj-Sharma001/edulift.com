import mongoose from 'mongoose';

let cachedConnection = null;

export const connectDB = async () => {
  try {
    // Reuse existing connection when available.
    if (cachedConnection && mongoose.connection.readyState === 1) {
      return cachedConnection;
    }

    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    const conn = await mongoose.connect(process.env.MONGO_URI, { dbName: 'EduLift' });

    cachedConnection = conn.connection;
    return conn;
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    throw error;
  }
}
