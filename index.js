const express = require("express");
const crypto = require("crypto");
const mysql = require("mysql");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const PORT = 5000;
const app = express();
require("dotenv").config();

const connectionDB = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});
const connectDB = (err) => {
  if (err) return console.error(`Errorfdfds:  ${err.message}`);
  else {
    console.log("Connect to MySQL DB successfully");
  }
};
connectionDB.connect(connectDB);

app.use("/css", express.static(path.join(__dirname, "css")));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/js", express.static(path.join(__dirname, "js")));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.set("view engine", "ejs");
app.get("/", (req, res) => {
  console.log(req.cookies);
  res.render("index", {
    login: req.cookies.login,
  });
  // res.sendFile(path.join(__dirname, "index.html"));
});
app.post("/registration", (req, res) => {
  const { email, login, password } = req.body;
  const hash = crypto.createHash("sha256").update(password).digest("hex");

  connectionDB.query(
    `SELECT * FROM user WHERE email LIKE BINARY '${email}' OR login LIKE BINARY '${login}'`,
    (error, results, fields) => {
      if (error) throw error;
      if (results.length > 0) {
        res.sendStatus(400).send("User is already exist");
        return;
      }
      connectionDB.query(
        `INSERT INTO user (email, login, password) VALUES ('${email}', '${login}', '${hash}')`,
        (error, results, fields) => {
          console.log(`Results: ${results}`);
          if (error) throw error;
          if (results) {
            connectionDB.query(
              `SELECT * FROM user WHERE email LIKE BINARY '${email}' AND login LIKE BINARY '${login}'`,
              (error, results, fields) => {
                const randomNum = crypto
                  .createHash("sha256")
                  .update(req.body.password + req.body.email)
                  .digest("hex");
                console.log(results);
                res.cookie("cookie", randomNum, {
                  maxAge: 90000,
                  httpOnly: true,
                });
                res.cookie("id", results[0].id);
                res.cookie("login", results[0].login);
                res.status(200).send("Success registration");
                return;
              }
            );
          }
          return;
        }
      );
      return;
    }
  );
});
app.post("/login", (req, res) => {
  const { login, email, password } = req.body;
  console.log(login);
  const hash = crypto.createHash("sha256").update(password).digest("hex");
  connectionDB.query(
    `SELECT * FROM user WHERE email LIKE BINARY '${email}' AND login LIKE BINARY '${login}' AND password LIKE BINARY '${hash}'`,
    (error, results, fields) => {
      console.log(`Login result : ${results}`);
      if (error) throw error;
      if (results.length > 0) {
        const randomNum = crypto
          .createHash("sha256")
          .update(req.body.password + req.body.email)
          .digest("hex");
        res.cookie("cookie", randomNum, { maxAge: 90000, httpOnly: true });
        res.cookie("id", results[0].id);
        res.cookie("login", results[0].login);
        res.status(200).send("Success login");
      } else {
        res.status(400).send("User is not exist");
        return;
      }
    }
  );
});
app.listen(PORT, () => {
  console.log("server started ON PORT " + PORT);
});
