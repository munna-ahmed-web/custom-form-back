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
    topic: [String],
    imageUrl: {
      type: Schema.Types.String,
    },
    isPublic: {
      type: Schema.Types.Boolean,
      default: true,
    },
    questions: [
      {
        type: {
          type: Schema.Types.String,
          enum: ["string", "int"],
        },
        question: {
          type: Schema.Types.String,
        },
        isActive: {
          type: Schema.Types.Boolean,
          default: true,
        },
      },
    ],
  },
  { timestamps: true, id: true }
);

templateSchema.index({
  title: "text",
  description: "text",
  topic: "text",
  "questions.question": "text",
});

const templateModel = new model("Template", templateSchema);

module.exports = templateModel;
