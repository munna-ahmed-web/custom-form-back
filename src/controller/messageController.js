const messageService = require("../service/messageService");

const getConversation = async (req, res, next) => {
  try {
    const conversationList = await messageService.getConversation();
    res.status(200).json({
      message: "Conversation created successfully",
      data: conversationList,
    });
  } catch (error) {
    next(error);
  }
};
const getConversationByUserId = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const conversation = await messageService.getConversationByUserId(userId);
    res.status(200).json({
      message: "Success",
      data: conversation,
    });
  } catch (error) {
    next(error);
  }
};
const createConversation = async (req, res, next) => {
  const { senderId, reciverId } = req.body;
  if (!senderId || !reciverId) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const conversation = await messageService.createConversation(
      senderId,
      reciverId
    );
    res.status(200).json({ message: "Conversation created successfully" });
  } catch (error) {
    next(error);
  }
};
const createMessage = async (req, res, next) => {
  const { conversationId, senderId, message } = req.body;
  if (!conversationId || !senderId || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const conversation = await messageService.createMessage(
      conversationId,
      senderId,
      message
    );
    res
      .status(200)
      .json({ message: "Message created successfully", data: conversation });
  } catch (error) {
    next(error);
  }
};

const getMessageByConversationId = async (req, res, next) => {
  const conversationId = req.params.conversationId;
  try {
    const messages = await messageService.getMessageByConversationId(
      conversationId
    );
    res.status(200).json({ message: "success", data: messages });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createConversation,
  getConversation,
  getConversationByUserId,
  createMessage,
  getMessageByConversationId,
};
