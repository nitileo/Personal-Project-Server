const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controller");
const validator = require("../middlewares/validator");
const { auth } = require("../middlewares/authentication");

router.post("/register", validator.registerValidator, authController.register);
router.post("/login", validator.loginValidator, authController.login);
router.post("/current-user", auth, authController.currentUser);
module.exports = router;
