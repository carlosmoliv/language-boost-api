process.env.MONGO_URI = "mongodb://localhost:27017/knowledge-boost-api";

process.env.NODE_ENV = "development";
process.env.PORT = "4000";
process.env.JWT_SECRET =
  "4df1fcc8bd9357c52db1c2bf96cc0e2f36f2b687f3ecadfaa8c46aad87ad5607";

console.log(process.env.PORT);
console.log(process.env.NODE_ENV);
console.log(process.env.JWT_SECRET);
