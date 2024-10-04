const userModel = require("../model/userModel");
const { generateHash } = require("../utils/index");

const getUsers = async (page, limit) => {
  try {
    const userList = await userModel
      .find({})
      .skip(limit * page)
      .limit(limit);
    const count = await userModel.countDocuments({});
    return {
      userList,
      count,
    };
  } catch (err) {
    const error = new Error("Server Error Occured");
    error.status = 500;
    throw error;
  }
};

const createUser = async (name, email, password) => {
  const hashedPassword = generateHash(password);
  try {
    const user = new userModel({ name, email, password: hashedPassword });
    await user.save();
    const { password, ...userWithoutPassword } = user.toObject();
    return userWithoutPassword;
  } catch (err) {
    const error = new Error("Server Error Occured");
    error.status = 500;
    throw error;
  }
};

const findUserByEmail = async (email) => {
  return userModel.findOne({ email });
};

module.exports = { getUsers, createUser, findUserByEmail };
