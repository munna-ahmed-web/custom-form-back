const { Schema, model } = require("mongoose");

const conversationSchema = new Schema(
  {
    members: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true, id: true }
);

const conversationModel = model("Conversation", conversationSchema);

module.exports = conversationModel;
