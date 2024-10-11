const userService = require("./userService");
const { matchPassword, geneateJWTtoken } = require("../utils/index");

const login = async ({ email, password }) => {
  const user = await userService.findUserByEmail(email);
  if (!user) {
    const error = new Error("Invalid Credential");
    error.status = 401;
    throw error;
  }
  const isMatched = matchPassword(password, user.password);
  if (!isMatched) {
    const error = new Error("Invalid Credential");
    error.status = 401;
    throw error;
  }

  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  };
  const token = geneateJWTtoken(payload);
  if (!token) {
    const error = new Error("Internal server error");
    error.status = 500;
    throw error;
  }
  return {
    name: user.name,
    email: user.email,
    accessToken: token,
  };
};

module.exports = {
  login,
};
