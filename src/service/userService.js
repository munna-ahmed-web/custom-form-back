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

const updateUserStatus = async (userId, adminStatus) => {
  try {
    const user = await findUserById(userId);
    if (!user) {
      const error = new Error("User Not Found");
      error.status = 404;
      throw error;
    }
    user.isAdmin = adminStatus;
    const response = await user.save();
    return response;
  } catch (err) {
    const error = new Error("Server Error Occured");
    error.status = 500;
  }
};
const deleteUserById = async (id) => {
  try {
    const deletedUser = await userModel.findByIdAndDelete(id);
    if (!deletedUser) {
      const error = new Error("User not found");
      error.status = 404;
    }
    return deletedUser;
  } catch (error) {
    throw error;
  }
};

const findUserByEmail = async (email) => {
  return userModel.findOne({ email });
};
const findUserById = async (id) => {
  return userModel.findById(id);
};

module.exports = {
  getUsers,
  createUser,
  findUserByEmail,
  updateUserStatus,
  findUserById,
  deleteUserById,
};
