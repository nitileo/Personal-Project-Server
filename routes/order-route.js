const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order-controller");
const { auth } = require("../middlewares/authentication");

router.post("/", auth, orderController.createOrder);
router.get("/", auth, orderController.getOrderById);

module.exports = router;
