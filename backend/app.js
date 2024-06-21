require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./config/database");
const indexRouter = require("./routes/index");
const corsMiddleware = require("./middleware/corsMiddleware");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Log every request
app.use((req, res, next) => {
  console.log(`Request URL: ${req.url}`);
  next();
});

// Middleware to set the current route
app.use((req, res, next) => {
  res.locals.currentRoute = req.path;
  next();
});

// CORS Middleware
app.use(corsMiddleware);

app.get("/", (req, res) => {
  res.send("Selamat datang di aplikasi klinik!");
});

app.use("/features", indexRouter);

// Handle 404 - Not Found
app.use((req, res, next) => {
  res.status(404).render("layouts/404", { currentRoute: req.path });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
