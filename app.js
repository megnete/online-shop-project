const path = require("path");
const express = require("express");

const db = require("./data/database");
const addCsrfToken = require("./middlewares/csrf-token");
const authController = require("./controllers/auth.controller");
const handleError = require("./middlewares/error-handler");
const app = express();
const csrf = require('csurf');
const expressSession = require("express-session");
const authRoutes = require("./routes/auth.routes");
const checkAuth = require("./middlewares/check-auth");
const productsRoutes = require("./routes/products.routes");
const baseRoutes = require("./routes/base.routes");

/* ---------- middleware ---------- */
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const createSessionConfig = require("./config/session");

const sessionConfig = createSessionConfig();
app.use(expressSession(sessionConfig));
app.use(csrf());

app.use(addCsrfToken);
app.use(checkAuth);

app.use(authRoutes);
app.use(productsRoutes);
app.use(baseRoutes);  

/* ---------- error handling ---------- */
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