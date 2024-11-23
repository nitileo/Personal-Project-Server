const express = require("express");
const router = express.Router();
const productController = require("../controllers/product-controller");

router.get("/", productController.listProduct);

router.get("/category", productController.listCategory);

router.post("/search", productController.searchFilters);

router.get("/new-release", productController.newRelease);

router.get("/best-seller", productController.bestSeller);

router.get("/recommend", productController.recommend);

module.exports = router;
