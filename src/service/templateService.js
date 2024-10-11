const templateModel = require("../model/templateModel");

const findAllTemplates = async () => {
  try {
    const templates = await templateModel.find({});
    return templates;
  } catch (error) {
    throw error;
  }
};

const createTemplate = async (userId, title, description = "") => {
  try {
    const template = new templateModel({ userId, title, description });
    const savedTemplate = await template.save();
    return savedTemplate;
  } catch (error) {
    throw error;
  }
};
const updateTemplate = async (user, templateId, updateData) => {
  try {
    if (user.isAdmin) {
      const updatedTemplate = await templateModel.findByIdAndUpdate(
        templateId,
        updateData,
        { new: true }
      );
      if (!updatedTemplate) {
        const error = new Error("Template not found");
        error.status = 404;
        throw error;
      }
      return updatedTemplate;
    } else {
      const template = await templateModel.findById(templateId);
      if (!template) {
        const error = new Error("Template not found");
        error.status = 404;
        throw error;
      }
      if (template.userId !== user.id) {
        const error = new Error("Unauthorized: You do not own this template");
        error.status = 403;
        throw error;
      }
      Object.assign(template, updateData);
      const updatedTemplate = await template.save();
      return updatedTemplate;
    }
  } catch (error) {
    throw error;
  }
};

const deleteTemplateById = async (user, templateId) => {
  try {
    const template = await templateModel.findByIdAndDelete(id);
    if (!template) {
      const error = new Error("Template not found");
      error.status = 404;
      throw error;

      return template;
    } else {
      const template = await templateModel.findById(templateId);
      if (!template) {
        const error = new Error("Template not found");
        error.status = 404;
        throw error;
      }
      if (template.userId !== user.id) {
        const error = new Error("Unauthorized: You do not own this template");
        error.status = 403;
        throw error;
      }
      await template.deleteOne();
      return true;
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  findAllTemplates,
  createTemplate,
  updateTemplate,
  deleteTemplateById,
};
