var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var petsRouter = require("./routes/pets");
var eventsRouter = require("./routes/events");
var usersRouter = require("./routes/users");
var loginRouter = require("./routes/login");
var jobRouter = require("./jobs/cron");
var sendNotificationRouter = require("./jobs/sendNotification");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/pets", petsRouter);
app.use("/", eventsRouter);
app.use("/", usersRouter);
app.use("/login", loginRouter);
app.use("/", jobRouter);
<<<<<<< HEAD
// app.use("/", sendNotificationRouter);
=======
//app.use("/", sendNotificationRouter);
>>>>>>> most updated version so far

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

module.exports = app;
