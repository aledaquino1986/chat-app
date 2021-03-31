const express = require("express");
const { login, register } = require("../controllers/authController");

const { validate } = require("../validators");
const router = express.Router();
const { rules: registrationRules } = require("../validators/auth/register");
const { rules: loginRules } = require("../validators/auth/login");

router.post("/login", [loginRules, validate], login);

router.post("/register", [registrationRules, validate], register);

module.exports = router;
