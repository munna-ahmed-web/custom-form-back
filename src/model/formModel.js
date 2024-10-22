const { Schema, model } = require("mongoose");

const formSchema = new Schema(
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
    answers: [
      {
        question: Schema.Types.Mixed,
        answer: Schema.Types.Mixed,
      },
    ],
  },
  { timestamps: true, id: true }
);

const formModel = new model("Form", formSchema);

module.exports = formModel;
