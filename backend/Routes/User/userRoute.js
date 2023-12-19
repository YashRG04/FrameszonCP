const express = require("express");
const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getAllUser, getUserDetails } = require("../../Controllers/User/UserController");
const { isAuthenticatedUser } = require("../../Middleware/auth");

const router = express.Router();

router.route("/create").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);

router.route("/me").get(isAuthenticatedUser, getUserDetails)
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);

router.route("/admin/all").get(getAllUser);

module.exports = router