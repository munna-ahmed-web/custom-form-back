const { Router } = require("express");
const userController = require("../controller/userController");
const authController = require("../controller/authController");
const messageController = require("../controller/messageController");

const router = Router();

//user routes
router.get("/users", userController.getUsers);
router.post("/register", userController.createUser);
router.post("/login", authController.login);

//conversation routes
router.get("/conversation", messageController.getConversation);
router.get("/conversation/:id", messageController.getConversationByUserId);
router.post("/conversation", messageController.createConversation);

//message routes
router.post("/message", messageController.createMessage);
router.get(
  "/message/conversationId",
  messageController.getMessageByConversationId
);

module.exports = router;
