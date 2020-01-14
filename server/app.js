var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cron = require("node-cron");

var petsRouter = require("./routes/pets");
var eventsRouter = require("./routes/events");
var usersRouter = require("./routes/users");
var loginRouter = require("./routes/login");
var petBars = require("./jobs/petBars");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "react/build")));

app.use("/pets", petsRouter);
app.use("/events", eventsRouter);
app.use("/users", usersRouter);
app.use("/login", loginRouter);
//app.use("/", sendNotificationRouter);

app.use("*", () => {
  res.sendFile(path.join(__dirname + "react/build/index.html"));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send("error");
});

// cron job - reduce the pet bars
cron.schedule("0 * * * *", function() {
  console.log("running a task every hour!");
  petBars();
});

module.exports = app;
