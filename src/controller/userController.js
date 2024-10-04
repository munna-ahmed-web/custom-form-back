const userService = require("../service/userService");

const getUsers = async (req, res, next) => {
  const page = parseInt(req.query.page) - 1 || 0;
  const limit = parseInt(req.query.limit) || 20;

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
    return res.status(400).json({ message: "All field required" });
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

module.exports = {
  getUsers,
  createUser,
};
