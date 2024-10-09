const { Schema, model } = require("mongoose");

const templateSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: Schema.Types.String,
      required: true,
    },
    description: {
      type: Schema.Types.String,
    },
    topic: {
      type: Schema.Types.String,
    },
    imageUrl: {
      type: Schema.Types.String,
    },
    isPublic: {
      type: Schema.Types.Boolean,
      default: true,
    },
  },
  { timestamps: true, id: true }
);

const templateModel = new model("Template", templateSchema);

module.exports = templateModel;
