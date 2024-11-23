const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/authentication");
const cartController = require("../controllers/cart-controller");

router.get("/", auth, cartController.getCart);

router.post("/", auth, cartController.addProductCart);

router.patch("/:cartId", auth, cartController.updateProductOnCart);

router.delete("/:cartId", cartController.deleteProductOnCart);

module.exports = router;
