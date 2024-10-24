const commentModel = require("../model/commentModel");

const getCommentByTemplateId = async (templateId) => {
  try {
    const commentsList = await commentModel
      .find({ template: templateId })
      .populate({ path: "user", select: "name email" });

    return commentsList;
  } catch (error) {
    throw error;
  }
};

const createComment = async (payload) => {
  try {
    const comment = await commentModel.create(payload);
    return comment;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createComment,
  getCommentByTemplateId,
};
