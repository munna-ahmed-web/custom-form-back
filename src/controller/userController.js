const userService = require("../service/userService");

const getUsers = async (req, res, next) => {
  const page = parseInt(req.query.page) - 1 || 0;
  const limit = parseInt(req.query.limit) || 20;
  const isAdmin = req.user.isAdmin;
  if (!isAdmin) {
    return res
      .status(403)
      .json({ message: "Forbidden, only admin can access this" });
  }

  try {
    const { userList, count } = await userService.getUsers(page, limit);
    res.status(200).json({
      message: "Success",
      total: count,
      page: page + 1,
      limit,
      data: userList,
    });
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  let { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const existedUser = await userService.findUserByEmail(email);
    if (existedUser) {
      return res
        .status(409)
        .json({ message: "User already exists with this email" });
    }
    const user = await userService.createUser(name, email, password);
    res.status(200).json({ message: "Success", data: user });
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  const isAdmin = req.user.isAdmin;
  const userId = req.params.id;
  const { adminStatus } = req.body;
  if (!isAdmin) {
    return res
      .status(403)
      .json({ message: "Forbidden, only admin can access this" });
  }
  try {
    const response = await userService.updateUserStatus(userId, adminStatus);
    const { password, ...userWithoutPasword } = response;
    res.status(200).json({ message: "success", data: userWithoutPasword });
  } catch (error) {
    next(error);
  }
};

const deleteUserById = async (req, res, next) => {
  const userId = req.params.id;
  const isAdmin = req.user.isAdmin;
  if (!isAdmin) {
    return res
      .status(403)
      .json({ message: "Forbidden, only admin can access this" });
  }
  try {
    const deletedUser = await userService.deleteUserById(userId);
    res.staus(200).json({ message: "Success", data: deletedUser });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUserById,
};
