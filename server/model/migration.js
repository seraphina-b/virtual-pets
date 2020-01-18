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

  // creates PETS table
  //added column called timeFed to calculate if pet pooped
  let sql =
    "DROP TABLE if exists pets; CREATE TABLE pets(petID INT NOT NULL AUTO_INCREMENT, name VARCHAR(255), dateCreated DATETIME, satiety INT NOT NULL DEFAULT 15, happy INT NOT NULL DEFAULT 15, clean INT NOT NULL DEFAULT 15, play INT NOT NULL DEFAULT 15, timeFed DATETIME, PRIMARY KEY (petID));";
  con.query(sql, function(err, result) {
    if (err) throw err;

    console.log("Table creation `pets` was successful!");
  });

  // creates dummy data for PETS table
  sql = "INSERT INTO `pets` (name, dateCreated) VALUES ('Blob', NOW());";
  con.query(sql, function(err, result) {
    if (err) throw err;
    console.log("Dummy data added to pets table");
  });

  // creates EVENTS table
  sql =
    "DROP TABLE if exists events; CREATE TABLE events(eventID INT NOT NULL AUTO_INCREMENT, petID INT, activity VARCHAR(255), timeActioned DATETIME, PRIMARY KEY(eventID));";
  con.query(sql, function(err, result) {
    if (err) throw err;
    console.log("Table creation `events` was successful!");
  });

  // creates dummy data for EVENTS table
  sql =
    "INSERT INTO `events` (petID, activity, timeActioned) VALUES (1, 'lastFed', NOW()), (1, 'madeHappy', NOW()), (2, 'lastFed', NOW()), (2, 'madeHappy', NOW());";
  con.query(sql, function(err, result) {
    if (err) throw err;
    console.log("Dummy data added to events table");
  });

  // creates USERS table
  sql =
    "DROP TABLE if exists users; CREATE TABLE users(userID INT NOT NULL AUTO_INCREMENT, userName VARCHAR(30), firstName VARCHAR(30), lastName VARCHAR(30), emailAddress VARCHAR(30), password VARCHAR(30), PRIMARY KEY(userID));";
  con.query(sql, function(err, result) {
    if (err) throw err;
    console.log("Table creation `users` was successful!");
  });

  // creates dummy data for USERS table
  sql =
    "INSERT INTO users (userName, firstName, lastName, emailAddress, password) VALUES ('rihanna1', 'rihanna', 'fenty', 'rihanna.fenty@gmail.com', 'codeop');";
  con.query(sql, function(err, result) {
    if (err) throw err;
    console.log("Dummy data added to user table");
  });
  console.log("Closing...");

  con.end();
});
