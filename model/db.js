const mongoose = require("mongoose");
require("dotenv").config();

const uriDb = process.env.URI_DB;

const db = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //
  maxPoolSize: 5,
});

mongoose.connection.on("error", (err) => {
  console.log("Mongoose error", err.message);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnnected");
});

process.on("SIGINT", async () => {
  mongoose.connection.close(() => {
    console.log("Connection to db closed", app - terminated);
    process.exit(1);
  });
});

module.exports = db;
