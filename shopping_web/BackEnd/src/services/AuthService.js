const Account = require("../models/Account");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateAccessToken, generateRefreshToken } = require("../utils/token");

const register = async ({ email, password, name }) => {
  const existing = await Account.findOne({ email });
  if (existing) throw new Error("Email already in use");

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await Account.create({ email, password: hashedPassword, name });

  return { message: "User registered successfully" };
};

const login = async ({ email, password }) => {
  const user = await Account.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid credentials");

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  user.refreshToken = refreshToken;
  await user.save();

  return {
    accessToken,
    refreshToken,
    user: { id: user._id, name: user.name, role: user.role },
  };
};

// const refreshAccessToken = async (refreshToken) => {
//   if (!refreshToken) throw new Error("No token provided");

//   const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
//   const user = await Account.findById(decoded.id);
//   if (!user || user.refreshToken !== refreshToken)
//     throw new Error("Invalid refresh token");

//   const newAccessToken = generateAccessToken(user);
//   return { accessToken: newAccessToken };
// };

const logout = async (userId) => {
  const user = await Account.findById(userId);
  if (user) {
    user.refreshToken = null;
    await user.save();
  }
};

module.exports = { register, login, logout };
