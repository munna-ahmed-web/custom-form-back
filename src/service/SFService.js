const SFUserModel = require("../model/SFUserModel");

const createSFUser = async (payload) => {
  try {
    const user = await SFUserModel.create(payload);
    return user;
  } catch (error) {
    throw error;
  }
};

const getSFUserByUserId = async (id) => {
  try {
    const user = await SFUserModel.find({ user: id });
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getSFUserByUserId,
  createSFUser,
};
