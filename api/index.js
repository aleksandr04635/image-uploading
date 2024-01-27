const cors = require("cors");
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log(`DB connected to ${process.env.MONGODB_URI}`))
  .catch((err) => console.log("DB error", err));
const app = express();

global.__basedir = __dirname;
/*
origin: Configures the Access-Control-Allow-Origin CORS header. Possible values:
    Boolean - set origin to true to reflect the request origin, as defined by req.header('Origin'), or set it to false to disable CORS.
    String - set origin to a specific origin. For example if you set it to "http://example.com" 
      only requests from “http://example.com” will be allowed.
    RegExp - set origin to a regular expression pattern which will be used to test the request origin. 
      If it’s a match, the request origin will be reflected. For example the pattern /example\.com$/ will 
      reflect any request that is coming from an origin ending with “example.com”.
    Array - set origin to an array of valid origins. Each origin can be a String or a RegExp. 
      For example ["http://example1.com", /\.example2\.com$/] will accept any request from 
      “http://example1.com” or from a subdomain of “example2.com”.
*/
var corsOptions = {
  //origin: "http://localhost:8081",
  // origin: process.env.FRONT_URL,
};
app.use(cors(corsOptions));

//test
app.get("/server/files-from-cloud", function (req, res) {
  console.log("/server/files-from-cloud");
  res.json({});
});

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "build"))); //react dep

//const initRoutes = require("./src/routes");
//initRoutes(app);

const upRouter = require("./routes/indexRouter");
app.use("/api/", upRouter);

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html")); //only after build integration
});

let port = process.env.PORT || 8080;
app.listen(port, () => {
  if (process.env.NODE_ENV !== "production") {
    console.log(`Running at localhost:${port}`);
  }
});
module.exports = app;
