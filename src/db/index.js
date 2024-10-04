const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.CONNECTIONSTR);
  } catch (error) {
    throw error;
  }
};

module.exports = connectDB;
