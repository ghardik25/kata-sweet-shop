const mongoose = require("mongoose");

async function connectDB() {
  if (process.env.NODE_ENV === "test") return;

  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected");
}

module.exports = connectDB;
