const express = require("express");
const { getAllCategories, createCategory, updateCategory, deleteCategory, createSpecial, updateSpecial, deleteSpecial, createBrand, updateBrand, deleteBrand, createShape, updateShape, deleteShape, createGender, updateGender, deleteGender } = require("../../Controllers/Product/CategoryController.js");
const { isAuthenticatedUser, authorizeRoles } = require("../../Middleware/auth.js");

const router = express.Router();

router.route("/").get(getAllCategories);

// Category
router.route("/category").post(isAuthenticatedUser, authorizeRoles("admin"), createCategory);
router.route("/category/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateCategory).delete(isAuthenticatedUser, authorizeRoles("admin"), deleteCategory);

// Special
router.route("/special").post(isAuthenticatedUser, authorizeRoles("admin"), createSpecial);
router.route("/special/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateSpecial).delete(isAuthenticatedUser, authorizeRoles("admin"), deleteSpecial);

// Brand
router.route("/brand").post(isAuthenticatedUser, authorizeRoles("admin"), createBrand);
router.route("/brand/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateBrand).delete(isAuthenticatedUser, authorizeRoles("admin"), deleteBrand);

// Shape
router.route("/shape").post(isAuthenticatedUser, authorizeRoles("admin"), createShape);
router.route("/shape/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateShape).delete(isAuthenticatedUser, authorizeRoles("admin"), deleteShape);

// Gender
router.route("/gender").post(isAuthenticatedUser, authorizeRoles("admin"), createGender);
router.route("/gender/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateGender).delete(isAuthenticatedUser, authorizeRoles("admin"), deleteGender);

module.exports = router