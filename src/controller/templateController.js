const templateService = require("../service/templateService");

const findAllTemplates = async (req, res, next) => {
  try {
    const templates = await templateService.findAllTemplates();
    res.status(200).json({ message: "Success", data: templates });
  } catch (error) {
    next(error);
  }
};

const createTemplate = async (req, res, next) => {
  const { userId, title, description } = req.body;
  if (!userId || !title) {
    return res.status(400).json({ message: "All field are required" });
  }
  try {
    const template = await templateService.createTemplate(
      userId,
      title,
      description
    );
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
  if (!req.user.isAdmin) {
    return res
      .status(403)
      .json({ message: "You do not have permission to delete" });
  }
  try {
    const isDeleted = await templateService.deleteTemplateById(req.user, id);
    res.status(204).json({ message: "deleted Successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findAllTemplates,
  createTemplate,
  updateTemplate,
  deleteTemplateById,
};
