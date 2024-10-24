const commentService = require("../service/commentService");

const getCommentByTemplateId = async (req, res, next) => {
  const { templateId } = req.query;

  try {
    const commentsList = await commentService.getCommentByTemplateId(
      templateId
    );
    res.status(200).json({ message: "Success", data: commentsList });
  } catch (error) {
    next(error);
  }
};

const createComment = async (req, res, next) => {
  const payload = req.body;
  try {
    const comment = await commentService.createComment(payload);
    res.status(201).json({ message: "Success", data: comment });
  } catch (error) {
    next(error);
  }
};

module.exports = { createComment, getCommentByTemplateId };
