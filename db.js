require("dotenv").config();
const mongoose = require("mongoose");

const db = mongoose.connect(
  process.env.DATABASE_URL,{useNewUrlParser:true}
);

db ? console.log("Database connected") : console.log("error");

module.exports = db;
