const path = require("path");
const express = require("express");

const db = require("./data/database");
const addCsrfToken = require("./middlewares/csrf-token");
const authController = require("./controllers/auth.controller");
const handleError = require("./middlewares/error-handler");
const app = express();
const csrf = require('csurf');

/* ---------- middleware ---------- */
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(csrf());

app.use(addCsrfToken);

app.use(handleError);
/* ---------- routes ---------- */
app.get("/signup", authController.getSignup);
app.post("/signup", authController.signup);
app.get("/login", authController.getLogin);

/* ---------- start server AFTER DB connects ---------- */
db.connectToDatabase()
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(3000);
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed");
    console.error(err);
  });