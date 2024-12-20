const templateService = require("../service/templateService");

const searchTemplates = async (req, res, next) => {
  const { search } = req.query;
  try {
    if (search) {
      const templates = await templateService.searchTemplates(search);
      return res.status(200).json({ message: "Success", data: templates });
    } else {
      const templates = await templateService.findAllTemplates();
      return res.status(200).json({ message: "Success", data: templates });
    }
  } catch (error) {
    next(error);
  }
};

const findAllTemplates = async (req, res, next) => {
  try {
    const templates = await templateService.findAllTemplates();
    res.status(200).json({ message: "Success", data: templates });
  } catch (error) {
    next(error);
  }
};
const findSingleTemplateById = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).json({ message: "Id not found" });
  }
  try {
    const template = await templateService.findSingleTemplateById(id);
    res.status(200).json({ message: "Success", data: template });
  } catch (error) {
    next(error);
  }
};

const findTemplatesByUserId = async (req, res, next) => {
  const user = req.user;
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).json({ message: "User not found" });
  }
  try {
    const templates = await templateService.findTemplatesByUserId(user, userId);
    res.status(200).json({ message: "Success", data: templates });
  } catch (error) {
    next(error);
  }
};
const findTemplatesByUser = async (req, res, next) => {
  const user = req.user;
  try {
    const templates = await templateService.findTemplatesByUserId(
      user,
      user._id
    );
    res.status(200).json({ message: "Success", data: templates });
  } catch (error) {
    next(error);
  }
};

const createTemplate = async (req, res, next) => {
  const { userId, title, description } = req.body;
  const payload = req.body;
  if (!userId || !title) {
    return res.status(400).json({ message: "All field are required" });
  }
  try {
    const template = await templateService.createTemplate(payload);
    res.status(201).json({ message: "Success", data: template });
  } catch (error) {
    next(error);
  }
};
const updateTemplate = async (req, res, next) => {
  const { id } = req.params;
  const updateData = req.body;

  if (!updateData || Object.keys(updateData).length === 0) {
    return res.status(400).json({ messga: "No updated data provided" });
  }
  try {
    const updatedTemplate = await templateService.updateTemplate(
      req.user,
      id,
      updateData
    );
    res
      .status(201)
      .json({ message: "Updated Successfully", data: updatedTemplate });
  } catch (error) {
    next(error);
  }
};
const deleteTemplateById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const isDeleted = await templateService.deleteTemplateById(req.user, id);
    res.status(204).json({ message: "deleted Successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findAllTemplates,
  findSingleTemplateById,
  createTemplate,
  updateTemplate,
  deleteTemplateById,
  searchTemplates,
  findTemplatesByUserId,
  findTemplatesByUser,
};
