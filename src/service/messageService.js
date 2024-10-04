const conversationModel = require("../model/conversationModel");
const userModel = require("../model/userModel");
const messageModel = require("../model/messageModel");

const getConversation = async () => {
  try {
    const conversationList = await conversationModel.find({});
    return conversationList;
  } catch (err) {
    const error = new Error("Server Error Occured");
    error.status = 500;
    return error;
  }
};

const getConversationByUserId = async (id) => {
  try {
    const conversations = await conversationModel.find({
      members: { $in: [id] },
    });
    const conversationUserData = Promise.all(
      conversations.map(async (conversation) => {
        const reciverId = conversation.members.find((member) => member !== id);
        const user = await userModel.findById(reciverId).select("-password");
        return { user: { ...user._doc }, conversationId: conversation._id };
      })
    );
    return await conversationUserData;
  } catch (err) {
    const error = new Error("Server Error Occured");
    error.status = 500;
    throw error;
  }
};
const createConversation = async (senderId, reciverId) => {
  try {
    const conversation = new conversationModel({
      members: [senderId, reciverId],
    });
    await conversation.save();
    return conversation;
  } catch (err) {
    const error = new Error("Server Error Occured");
    error.status = 500;
    return error;
  }
};
const createMessage = async (conversationId, senderId, message) => {
  try {
    const messageRes = new messageModel({
      conversationId,
      senderId,
      message,
    });
    await messageRes.save();
    return messageRes;
  } catch (err) {
    const error = new Error("Server Error Occured");
    error.status = 500;
    return error;
  }
};

const getMessageByConversationId = async (conversationId) => {
  try {
    const message = await messageModel.find({ conversationId });
  } catch (error) {
    const err = new Error("Server error occured");
    err.status = 500;
    throw err;
  }
};

module.exports = {
  createConversation,
  getConversation,
  getConversationByUserId,
  createMessage,
  getMessageByConversationId,
};
