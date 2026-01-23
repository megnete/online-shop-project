const express = require('express');

const authoController = require("../controllers/auth.controller");

const router = express.Router();

console.log(authoController);


router.get("/signup", authoController.getSignup)

router.post("/signup", authoController.signup)

router.get("/login", authoController.getLogin)

module.exports = router;