const formService = require("../service/formService");

const getFormById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const form = await formService.getFormById(id);
    res.status(200).json({ message: "success", data: form });
  } catch (error) {
    next(error);
  }
};
const getFormsByUserId = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const forms = await formService.getFormsByUserId(req.user, userId);
    res.status(200).json({ message: "success", data: forms });
  } catch (error) {
    next(error);
  }
};
const getFormsByTemplateId = async (req, res, next) => {
  const { templateId } = req.params;

  try {
    const forms = await formService.getFormsByTemplateId(templateId);
    res.status(200).json({ message: "success", data: forms });
  } catch (error) {
    next(error);
  }
};

const createForm = async (req, res, next) => {
  const formData = req.body;
  try {
    const form = formService.createForm(formData);
    res.status(201).json({ message: "Success", data: form });
  } catch (error) {
    next(error);
  }
};
const updateForm = async (req, res, next) => {
  const { id } = req.params;
  const updatePayload = req.body;
  if (!updatePayload) {
    return res.status(400).json({ message: "No data provided for update" });
  }
  try {
    const updatedForm = formService.updateForm(req.user, id, updatePayload);
    res.status(201).json({ message: "Success", data: updatedForm });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createForm,
  getFormsByTemplateId,
  getFormsByUserId,
  updateForm,
  getFormById,
};
