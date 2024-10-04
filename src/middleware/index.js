const express = require("express");
var cors = require("cors");

const applyMiddleWare = (app) => {
  app.use(express.json());
  app.use(cors());
};

module.exports = applyMiddleWare;
