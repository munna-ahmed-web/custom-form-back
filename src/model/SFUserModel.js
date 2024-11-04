const { Schema, model } = require("mongoose");

const SFUserSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true, id: true }
);

const SFUserModel = new model("SFUser", SFUserSchema);

module.exports = SFUserModel;
