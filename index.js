const express = require("express");
const crypto = require("crypto");
const mysql = require("mysql");
const path = require("path");
const bodyParser = require('body-parser')
const PORT = 5000;



require('dotenv').config()

const connectionDB = mysql.createConnection({
  host:process.env.HOST,
  user:process.env.USER,
  password:process.env.PASSWORD,
  database:process.env.DATABASE
});
const connectDB = (err)=>{
  if (err) return console.error(`Errorfdfds:  ${err.message}`);
  else {
    console.log("Connect to MySQL DB successfully");
  }
}
connectionDB.connect(connectDB);
const app = express();

app.use("/css", express.static(path.join(__dirname, "css")));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/js", express.static(path.join(__dirname, "js")));
app.use( bodyParser.json() );   
app.use(bodyParser.urlencoded({     
  extended: true
}));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.post('/registration',(req,res)=>{

  const {email,login,password} = req.body
  const hash = crypto.createHash('sha256').update(password).digest('hex')
  
  connectionDB.query(`INSERT INTO user (email, login, password) VALUES ('${email}', '${login}', '${hash}')`,
  (error,results,fields)=>{
    if(error) throw error;

    res.sendStatus(200)
    
  })

})

app.listen(PORT, () => {
  console.log("server started ON PORT " + PORT);
});
