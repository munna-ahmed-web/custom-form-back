const formService = require("../service/formService");

const getFormsByUserId = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const forms = await formService.getFormsByUserId(userId);
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

module.exports = { createForm, getFormsByTemplateId, getFormsByUserId };
