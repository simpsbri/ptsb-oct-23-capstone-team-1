import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log(
      `MondgoDb connected: ${conn.connection.host}`.cyan.underline.bold
    );
  } catch (error) {
    console.error(`Error: ${error.message}`.red.bold);
    process.exit();
  }
};

export default connectDB;
