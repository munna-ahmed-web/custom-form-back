const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    template: {
      type: Schema.Types.ObjectId,
      ref: "Template",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  { timestamps: true, id: true }
);

const commentModel = new model("Comment", commentSchema);

module.exports = commentModel;
