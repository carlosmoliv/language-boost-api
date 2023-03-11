import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

export const connect = () => {
  if (!MONGO_URI)
    throw new Error(
      "MongoDB URI not found. Check your environment variable to ensure that the URL is set correctly."
    );

  mongoose.set("strictQuery", false);

  return mongoose.connect(MONGO_URI);
};

export const disconnect = () => mongoose.disconnect();
