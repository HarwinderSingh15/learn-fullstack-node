const express = require("express");

const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");

const app = express();

app.use(express.json());

app.use("/api/users", usersRoutes);

// route not found error handler middleware
app.use((req, res, next) => {
  const routeNotFound = new HttpError("Requested route not found!", 404);
  next(routeNotFound);
});

// error handling middleware
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unkown error occured" });
});

app.listen(5000);
