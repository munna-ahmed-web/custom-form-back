const { Router } = require("express");
const userController = require("../controller/userController");
const authController = require("../controller/authController");
const templateController = require("../controller/templateController");
const { checkToken } = require("../middleware/auth");

const router = Router();

//public routes
router.post("/register", userController.createUser);
router.post("/login", authController.login);

// private routes for admin
router.get("/users", checkToken, userController.getUsers);
router.patch("/users/:id", checkToken, userController.updateUser);
router.delete("/users/:id", checkToken, userController.deleteUserById);

//private route
router.get("template", templateController.findAllTemplates);
router.post("template", checkToken, templateController.createTemplate);
router.post("template/:id", checkToken, templateController.updateTemplate);
router.delete(
  "template/:id",
  checkToken,
  templateController.deleteTemplateById
);

module.exports = router;
