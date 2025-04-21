require("dotenv").config();
const mongoose = require("mongoose");
async function connect() {
  const dbURI = process.env.MONGO_DB_URI;
  try {
    await mongoose.connect(dbURI);
    console.log("Connected to database!");
  } catch (error) {
    console.error("Connect failure!", error);
  }
}

module.exports = { connect };
