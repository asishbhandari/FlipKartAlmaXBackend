import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    // mongoose.connection.once("open", () => {
    //   console.log("connected to database");
    // });
    // mongoose.connection.on("error", () => {
    //   console.log("Error connecting to database");
    // });
    // mongoose.connection.on("disconnected", () => {
    //   console.log("disconnected from database");
    // });
    console.log("connected to db");
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDb;
