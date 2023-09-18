const express = require("express");
const crypto = require("crypto");
const mysql = require("mysql");
const path = require("path");
const PORT = 5000;

const connectionDB = mysql.createConnection({
  host: "92.246.214.15",
  user: "ais_aksentev1933_happypc",
  password: "JYycNjZFRTlbMq6hEAwNHcxJ",
  database: "ais_aksentev1933_happypc",
});

const app = express();
app.use("/css", express.static(path.join(__dirname, "css")));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/js", express.static(path.join(__dirname, "js")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
  // res.status(200).json("Server worked");
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
