import mongoose from "mongoose";

const MONGO_URL = "mongodb://localhost:27017/knowledge-boost-api";

export const connect = () => {
  if (!MONGO_URL)
    throw new Error(
      "MongoDB URL not found. Check your environment variable to ensure that the URL is set correctly."
    );

  mongoose.set("strictQuery", false);

  return mongoose.connect(MONGO_URL);
};

export const disconnect = () => mongoose.disconnect();
