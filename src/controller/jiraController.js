const jiraService = require("../service/jiraService");

const getPriorityList = async (req, res, next) => {
  try {
    const list = await jiraService.getPriorityList();
    res.status(200).json({ message: "Success", data: list });
  } catch (error) {
    next(error);
  }
};
const getStatusList = async (req, res, next) => {
  try {
    const list = await jiraService.getStatusList();
    res.status(200).json({ message: "Success", data: list });
  } catch (error) {
    next(error);
  }
};

const getTicket = async (req, res, next) => {
  const { startAt, max } = req.query;
  try {
    const tickets = await jiraService.getTicket(startAt, max);
    res.status(200).json({ message: "Success", data: tickets });
  } catch (error) {
    console.log(error.response);
    next(error);
  }
};
const createTicket = async (req, res, next) => {
  const data = req.body;
  try {
    const ticketsList = await jiraService.createTicket(data);
    res.status(201).json({ message: "created", data: ticketsList });
  } catch (error) {
    console.log(error.response);
    next(error);
  }
};

module.exports = {
  getTicket,
  createTicket,
  getPriorityList,
  getStatusList,
};
