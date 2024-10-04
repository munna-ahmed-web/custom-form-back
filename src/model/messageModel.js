const { Schema, model } = require("mongoose");

const messageSchema = new Schema(
  {
    conversationId: {
      type: String,
    },
    senderId: {
      type: String,
    },
    message: {
      type: String,
    },
  },
  { timestamps: true, id: true }
);

const messageModel = model("Message", messageSchema);

module.exports = messageModel;
