const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin-controller");
const { auth } = require("../middlewares/authentication");

router.get("/member", auth, adminController.listMember);

router.patch("/member/:memberId", auth, adminController.updateMember);

router.delete("/member/:memberId", auth, adminController.removeMember);

router.patch(
  "/member/unbanned/:memberId",
  auth,
  adminController.unBannedMember
);

router.get("/product", auth, adminController.getAllProduct);

router.post("/product", auth, adminController.createProduct);

router.put("/product/:productId", auth, adminController.updateProduct);

router.delete("/product/:productId", auth, adminController.deleteProduct);

router.patch(
  "/product/reactive/:productId",
  auth,
  adminController.reactiveProduct
);

router.get("/order", auth, adminController.getAllOrder);

router.patch("/order/:orderId", auth, adminController.updateOrder);

router.delete("/order/:orderId", auth, adminController.cancelOrder);

module.exports = router;
