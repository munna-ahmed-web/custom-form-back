const { Router } = require("express");
const userController = require("../controller/userController");
const authController = require("../controller/authController");
const templateController = require("../controller/templateController");
const formController = require("../controller/formController");
const commentController = require("../controller/commentController");
const salesforceController = require("../controller/salesforceController");
const jiraController = require("../controller/jiraController");
const { checkToken } = require("../middleware/auth");

const router = Router();

//public routes------------------------------------------------------------
router.post("/register", userController.createUser);
router.post("/login", authController.login);

// user management routes for admin-----------------------------------------
router.get("/users", checkToken, userController.getUsers);
router.patch("/users/:id", checkToken, userController.updateUser);
router.delete("/users/:id", checkToken, userController.deleteUserById);
router.get("/usersIfo/:userId", checkToken, userController.getUserInfoById);

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
//private
router.get("/form/:id", checkToken, formController.getFormById);
router.get("/form/user/:userId", checkToken, formController.getFormsByUserId);
router.get(
  "/form/template/:templateId",
  checkToken,
  formController.getFormsByTemplateId
);
router.post("/form/create", checkToken, formController.createForm);
router.patch("/form/update/:id", checkToken, formController.updateForm);

//form route-------------------------------------------------------------;
router.get("/comment", commentController.getCommentByTemplateId);
//private
router.post("/comment/create", checkToken, commentController.createComment);

//Salesforce route-------------------------------------------------------------;
router.post(
  "/salesforce/create",
  checkToken,
  salesforceController.createSalesForce
);

// ---------------jira route-----------------------
router.post("/ticket/create", checkToken, jiraController.createTicket);
router.get("/ticket", checkToken, jiraController.getTicket);
router.get("/priority", jiraController.getPriorityList);
router.get("/status", jiraController.getStatusList);

// ---------------oddo route-----------------------
router.get(
  "/templateByUser",
  checkToken,
  templateController.findTemplatesByUser
);

module.exports = router;
