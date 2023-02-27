import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL;

export const connect = () => {
  if (!MONGO_URL)
    throw Error(
      "MongoDB URL not found. Check your environment variable to ensure that the URL is set correctly."
    );

  mongoose.set("strictQuery", false);

  return mongoose.connect(MONGO_URL);
};
