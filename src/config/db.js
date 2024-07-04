import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.info("connected to db");
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDb;
