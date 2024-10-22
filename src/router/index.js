const { Router } = require("express");
const userController = require("../controller/userController");
const authController = require("../controller/authController");
const templateController = require("../controller/templateController");
const formController = require("../controller/formController");
const { checkToken } = require("../middleware/auth");

const router = Router();

//public routes------------------------------------------------------------
router.post("/register", userController.createUser);
router.post("/login", authController.login);

// user management routes for admin-----------------------------------------
router.get("/users", checkToken, userController.getUsers);
router.patch("/users/:id", checkToken, userController.updateUser);
router.delete("/users/:id", checkToken, userController.deleteUserById);

//template route-------------------------------------------------------------
router.get("/template", templateController.findAllTemplates);
router.get("/searchTemplates", templateController.searchTemplates);
router.get("/template/:id", templateController.findSingleTemplateById);
//private
router.get(
  "/template/user/:userId",
  checkToken,
  templateController.findTemplatesByUserId
);
router.post("/template", checkToken, templateController.createTemplate);
router.patch("/template/:id", checkToken, templateController.updateTemplate);
router.delete(
  "/template/:id",
  checkToken,
  templateController.deleteTemplateById
);

//form route-------------------------------------------------------------
router.get("/form/:templateId", formController.getFormsByTemplateId);
//private
router.post("/form/create", checkToken, formController.createForm);

module.exports = router;
