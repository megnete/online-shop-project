const express = require('express');

const authoController = require("../controllers/auth.controller");

const router = express.Router();

router.get("/signup", authoController.getSignup)

router.get("/login", authoController.getLogin)

module.exports = router;