require("dotenv").config();
const mysql = require("mysql");

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const con = mysql.createConnection({
  host: DB_HOST || "127.0.0.1",
  user: DB_USER || "root",
  password: DB_PASS || "",
  database: DB_NAME || "virtualPet",
  multipleStatements: true
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  let sql =
    "DROP TABLE if exists pets; CREATE TABLE pets(petID INT NOT NULL AUTO_INCREMENT, name VARCHAR(255), dateCreated DATETIME, PRIMARY KEY (petID));";
  con.query(sql, function(err, result) {
    if (err) throw err;

    console.log("Table creation `pets` was successful!");
  });

  // create dummy data for pets table
  sql = "INSERT INTO `pets` (name, dateCreated) VALUES ('Blob', NOW())";
  con.query(sql, function(err, result) {
    if (err) throw err;
    console.log("Dummy data added to pets table");
  });

  // create events table
  sql =
    "DROP TABLE if exists events; CREATE TABLE events(eventID INT NOT NULL AUTO_INCREMENT, petID INT, activity VARCHAR(255), timeActioned DATETIME, PRIMARY KEY(eventID));";
  con.query(sql, function(err, result) {
    if (err) throw err;
    console.log("Table creation `events` was successful!");
  });

  // create dummy data for events table
  sql =
    "INSERT INTO `events` (petID, activity, timeActioned) VALUES (1, 'lastFed', NOW())";
  con.query(sql, function(err, result) {
    if (err) throw err;
    console.log("Dummy data added to events table");
  });
  console.log("Closing...");
  con.end();
});
