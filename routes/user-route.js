const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/authentication");
const userController = require("../controllers/user-controller");

router.get("/info", auth, userController.getMe);

router.patch("/info", auth, userController.updateProfile);

router.get("/address", auth, userController.getAddress);

router.put("/address", auth, userController.updateAddress);

module.exports = router;
