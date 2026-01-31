const express = require('express');

const authoController = require("../controllers/auth.controller");

const router = express.Router();

router.get("/signup", authoController.getSignup)

router.post("/signup", authoController.signup)

router.get("/login", authoController.getLogin)

router.post("/login", authoController.login);

router.post("/logout", authoController.logout);

module.exports = router;