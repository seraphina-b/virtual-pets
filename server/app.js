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
var sendNotification = require("./jobs/sendNotification");
var petBars = require("./jobs/petBars");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/pets", petsRouter);
app.use("/events", eventsRouter);
app.use("/users", usersRouter);
app.use("/login", loginRouter);
//app.use("/", sendNotificationRouter);

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

// cron job - running every minute
cron.schedule("* * * * *", function() {
  console.log("running a task every minute");
  sendNotification();
});

// cron job - reduce the pet bars
cron.schedule("*/2 * * * *", function() {
  console.log("running a task every another minute");
  petBars();
});

module.exports = app;
