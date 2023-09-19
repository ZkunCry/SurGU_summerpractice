const express = require("express");
const crypto = require("crypto");
const mysql = require("mysql");
const path = require("path");
const PORT = 5000;
require('dotenv').config()
const connectionDB = mysql.createConnection({
  host:process.env.HOST,
  user:process.env.USER,
  password:process.env.PASSWORD,
  database:process.env.DATABASE
});

const app = express();
app.use("/css", express.static(path.join(__dirname, "css")));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/js", express.static(path.join(__dirname, "js")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/test", (req, res) => {
  connectionDB.connect((err) => {
    if (err) return console.error(`Ошибка:  ${err.message}`);
    else {
      console.log("Подключенеи к серверу MySQL");
    }
  });
  connectionDB.query(
    "SELECT * FROM `user` WHERE 1",
    (error, results, fields) => {
      if (error) throw error;
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(results, null, 2));
    }
  );
  connectionDB.end();
});
app.listen(PORT, () => {
  console.log("server started ON PORT " + PORT);
});
