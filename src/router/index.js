const { Router } = require("express");
const userController = require("../controller/userController");
const authController = require("../controller/authController");

const router = Router();

//user routes
router.get("/users", userController.getUsers);
router.post("/register", userController.createUser);
router.post("/login", authController.login);

module.exports = router;
