const express = require("express");
const router = express.Router();
const UserController = require("../controller/user_controller");
const user = require("../models/user");
const auth = require("../middleware/auth");

router.get("/", auth, UserController.getAll);
router.post("/register", UserController.register);
router.post("/login", UserController.login);

module.exports = router;
