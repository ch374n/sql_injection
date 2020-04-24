// server.js
// where your node app starts

// init project
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cookieParser = require('cookie-parser') 
const jwt = require('jsonwebtoken') 
const fs = require("fs");
require('dotenv').config({ path: './.env'})


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser()) 

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// init sqlite db
const dbFile = "./.data/sqlite.db";
const exists = fs.existsSync(dbFile);
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(dbFile);

// if ./.data/sqlite.db does not exist, create it, otherwise print records to console
db.serialize(() => {
  if (!exists) {
    db.run(
      "CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, password TEXT)"
    );
    console.log("New table users created!");

    // insert default dreams
    db.serialize(() => {
      db.run(
        'INSERT INTO USERS (email, password) VALUES("admin@email.com", "password")'
      );
    });
  } else {
    console.log('Database "Users" ready to go!');
   
  }
});

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(`${__dirname}/views/index.html`);
});


app.post('/login', (req, res) => {
    
  console.log(req.body.email,req.body.password)
  
  
  
    db.all(`SELECT * FROM users WHERE email="${req.body.email}" AND PASSWORD="${req.body.password}"`, (err, rows) => {
        console.log(JSON.stringify(rows))
      
        if(!rows) return res.status(404).send({ message: "Incorrect credentials"})
        
        const [ user ] = rows 
        
        const token = jwt.sign({ uid : user.id }, SOME_SECRET) 
        res.cookie('token', )
        return res.status(200).send(JSON.stringify(rows))
    })
  
})


app.get('/me', (req, res) => {
    
    if(req.uid) {
        
    }
})


// listen for requests :)
var listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});