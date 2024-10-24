const formModel = require("../model/formModel");

const getFormsByTemplateId = async (templateId) => {
  try {
    const formsList = await formModel.find({ template: templateId }).populate([
      { path: "user", select: "name email" },
      { path: "template", select: "title description" },
    ]);
    return formsList;
  } catch (error) {
    throw error;
  }
};
const getFormsByUserId = async (userId) => {
  try {
    const formsList = await formModel.find({ user: userId }).populate([
      { path: "user", select: "name email" },
      { path: "template", select: "title description" },
    ]);
    return formsList;
  } catch (error) {
    throw error;
  }
};

const createForm = async (payload) => {
  try {
    const form = new formModel({ ...payload });
    const savedForm = await form.save();
    return savedForm;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createForm,
  getFormsByTemplateId,
  getFormsByUserId,
};
