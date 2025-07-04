import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    // Check if already connected
    if (mongoose.connection.readyState === 1) {
      console.log("MongoDB already connected");
      return mongoose.connection;
    }

    // Ensure MONGO_URI is defined
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    // Connect to MongoDB with database name and additional options
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: 'EduLift', // Specify the database name here
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected to database: ${conn.connection.db.databaseName}`);
    return conn;
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    throw error;
  }
}
