import mongoose from "mongoose";

const connectDB = async () => {
  const options = {
    autoIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, options);
    console.log(`MongoDB Connected: ${conn.connection.host} `);
  } catch (error) {
    console.error(`Error: ${error.message} `);
    process.exit(1);
  }
};

export default connectDB;
