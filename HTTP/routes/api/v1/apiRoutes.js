const express = require("express");
const router = express.Router();
const productsController = require("../../../controllers/api/v1/products.js");
router.get("/products", productsController.searchProducts);
module.exports = router;
