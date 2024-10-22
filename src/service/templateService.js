const templateModel = require("../model/templateModel");
const mongoose = require("mongoose");

const searchTemplates = async (searchTerm) => {
  try {
    const templates = await templateModel
      .find(
        { $text: { $search: searchTerm } },
        { score: { $meta: "textScore" } }
      )
      .sort({ score: { $meta: "textScore" } });
    return templates;
  } catch (error) {
    throw error;
  }
};

const findAllTemplates = async () => {
  try {
    const templates = await templateModel.find({});
    return templates;
  } catch (error) {
    throw error;
  }
};
const findSingleTemplateById = async (id) => {
  try {
    const template = await templateModel.findById(id);
    return template;
  } catch (error) {
    throw error;
  }
};

const findTemplatesByUserId = async (user, userId) => {
  const objectId = mongoose.Types.ObjectId.isValid(userId)
    ? new mongoose.Types.ObjectId(userId)
    : userId;
  const filter = user.isAdmin ? {} : { userId: objectId };
  try {
    const templates = await templateModel.find(filter);
    return templates;
  } catch (error) {
    throw error;
  }
};

const createTemplate = async (payload) => {
  try {
    const template = new templateModel({ ...payload });
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
      const objectId = template.userId;
      const tempUserId = objectId.toHexString();
      const userId = user._id.toHexString();

      if (tempUserId !== userId) {
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
    if (user.isAdmin) {
      const template = await templateModel.findByIdAndDelete(templateId);
      if (!template) {
        const error = new Error("Template not found");
        error.status = 404;
        throw error;
      }
      return template;
    } else {
      const template = await templateModel.findById(templateId);

      if (!template) {
        const error = new Error("Template not found");
        error.status = 404;
        throw error;
      }
      const objectId = template.userId;
      const tempUserId = objectId.toHexString();
      const userId = user._id.toHexString();

      if (tempUserId !== userId) {
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
  findSingleTemplateById,
  searchTemplates,
  findTemplatesByUserId,
};
