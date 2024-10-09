const jwt = require("jsonwebtoken");
const { findUserByEmail } = require("../service/userService");

const checkToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "You are unauthorized user. Please log in" });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Invalid token format. Please log in again" });
    }
    const decodedUser = jwt.verify(token, process.env.ACCESSTOKENSECRET);
    const user = await findUserByEmail(decodedUser.email);
    if (!user) {
      return res
        .status(401)
        .json({ message: "You are unauthorized user. Please log in again" });
    }
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res
        .status(401)
        .json({ message: "Invalid token. Please log in again." });
    }
    console.error("Auth error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { checkToken };
