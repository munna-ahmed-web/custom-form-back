const formModel = require("../model/formModel");

const getFormById = async (id) => {
  try {
    const form = await formModel.findById(id);
    return form;
  } catch (error) {
    throw error;
  }
};
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
const updateForm = async (user, id, payload) => {
  try {
    if (user.isAdmin) {
      const updatedForm = await formModel.findByIdAndUpdate(id, payload, {
        new: true,
      });
      if (!updatedForm) {
        const error = new Error("Form not found or could not be updated.");
        error.status = 404;
        throw error;
      }
      return updatedForm;
    } else {
      const form = await formModel.findById(id);
      if (!form) {
        const error = new Error("Form not found");
        error.status = 404;
        throw error;
      }
      const userId = user?.id?.toString();
      const formUserId = form.user.toString();

      if (userId !== formUserId) {
        const error = new Error("Unauthorized: You do not own this form");
        error.status = 403;
        throw error;
      }

      Object.assign(form, payload);
      const updatedForm = await form.save();
      console.log();
      return updatedForm;
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createForm,
  getFormsByTemplateId,
  getFormsByUserId,
  updateForm,
  getFormById,
};
