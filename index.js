const express = require("express");
const applyMiddleWare = require("./src/middleware/index");
const connectDB = require("./src/db");
const router = require("./src/router/index");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 8000;

applyMiddleWare(app);
app.use("/api/v1", router);

app.get("/", (_req, res) => {
  res.status(200).json({ message: "Working fine" });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Server error occured",
    error: err.errors,
  });
});

const main = async () => {
  try {
    await connectDB();
    console.log("Database connected successfully");
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
    console.log("Something went wrong while connecting database");
  }
};

main();
