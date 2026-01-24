const path = require("path");
const express = require("express");

const db = require("./data/database");
const authController = require("./controllers/auth.controller");

const app = express();

/* ---------- middleware ---------- */
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

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
