// server.js
// where your node app starts

// init project
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fs = require("fs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
    
  console.log(req.body.password)
  
  
  
    db.all(`SELECT * FROM users WHERE email="${req.body.email}" AND PASSWORD="${req.body.password}"`, (err, rows) => {
        console.log(JSON.stringify(rows))
        if(!rows.length) return res.status(404).send({ message: "please sign in"})
        return res.status(200).send(JSON.stringify(rows))
    })
  
})


// endpoint to get all the dreams in the database
// app.get("/getDreams", (request, response) => {
//   db.all("SELECT * from Dreams", (err, rows) => {
//     response.send(JSON.stringify(rows));
//   });
// });

// endpoint to add a dream to the database
// app.post("/addDream", (request, response) => {
//   console.log(`add to dreams ${request.body}`);

//   // DISALLOW_WRITE is an ENV variable that gets reset for new projects so you can write to the database
//   if (!process.env.DISALLOW_WRITE) {
//     const cleansedDream = cleanseString(request.body.dream);
//     db.run(`INSERT INTO Dreams (dream) VALUES (?)`, cleansedDream, error => {
//       if (error) {
//         response.send({ message: "error!" });
//       } else {
//         response.send({ message: "success" });
//       }
//     });
//   }
// });

// // endpoint to clear dreams from the database
// app.get("/clearDreams", (request, response) => {
//   // DISALLOW_WRITE is an ENV variable that gets reset for new projects so you can write to the database
//   if (!process.env.DISALLOW_WRITE) {
//     db.each(
//       "SELECT * from Dreams",
//       (err, row) => {
//         console.log("row", row);
//         db.run(`DELETE FROM Dreams WHERE ID=?`, row.id, error => {
//           if (row) {
//             console.log(`deleted row ${row.id}`);
//           }
//         });
//       },
//       err => {
//         if (err) {
//           response.send({ message: "error!" });
//         } else {
//           response.send({ message: "success" });
//         }
//       }
//     );
//   }
// });

// // helper function that prevents html/css/script malice
// const cleanseString = function(string) {
//   return string.replace(/</g, "&lt;").replace(/>/g, "&gt;");
// };

// listen for requests :)
var listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});