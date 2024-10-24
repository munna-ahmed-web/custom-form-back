const express = require("express");
var cors = require("cors");

const corsOption = {
  origin: ["http://localhost:5173", "https://custom-form-front.onrender.com"],
};

const applyMiddleWare = (app) => {
  app.use(express.json());
  app.use(cors(corsOption));
};

module.exports = applyMiddleWare;
