const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../../Controllers/Product/ProductController.js");
const { isAuthenticatedUser, authorizeRoles } = require("../../Middleware/auth.js");

const router = express.Router();

router.route("/").get(getAllProducts);
router.route("/create").post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);
router.route("/update/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct);
router.route("/delete/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);
router.route("/product/:id").get(getProductDetails);

module.exports = router