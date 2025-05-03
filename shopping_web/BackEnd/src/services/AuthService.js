const Account = require("../models/Account");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateAccessToken, generateRefreshToken } = require("../utils/token");
const crypto = require("crypto");
const { sendVerificationEmail } = require("../utils/mailer");

// const register = async ({ email, password, name }) => {
//   const existing = await Account.findOne({ email });
//   if (existing) throw new Error("Email already in use");

//   const hashedPassword = await bcrypt.hash(password, 10);
//   const user = await Account.create({ email, password: hashedPassword, name });

//   return { message: "User registered successfully" };
// };

const register = async ({ email, password, name }) => {
  const existing = await Account.findOne({ email });
  if (existing) throw new Error("Email already in use");

  const hashedPassword = await bcrypt.hash(password, 10);
  const emailToken = crypto.randomBytes(32).toString("hex");

  const user = await Account.create({
    email,
    password: hashedPassword,
    name,
    emailToken,
  });

  await sendVerificationEmail(email, emailToken);

  return {
    message: "Đăng ký thành công, vui lòng kiểm tra email để xác thực.",
  };
};

const verifyEmail = async (token) => {
  const user = await Account.findOne({ emailToken: token });
  if (!user) throw new Error("Token không hợp lệ");

  user.emailToken = token;
  user.isVerified = true;
  await user.save();

  return { message: "Xác thực email thành công!" };
};

const login = async ({ email, password }) => {
  const user = await Account.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid credentials");
  if (!user.isVerified) {
    throw new Error("Tài khoản chưa được xác thực email");
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  //user.refreshToken = refreshToken;
  await user.save();

  return {
    accessToken,
    //refreshToken,
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

const changePassword = async ({ userId, oldPassword, newPassword }) => {
  const user = await Account.findById(userId);
  if (!user) throw new Error("User not found");

  const valid = await bcrypt.compare(oldPassword, user.password);
  if (!valid) throw new Error("Old password is incorrect");

  const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedNewPassword;
  user.updatedAt = new Date();
  await user.save();

  return { message: "Password changed successfully" };
};

const getAllAccounts = async () => {
  const accounts = await Account.find().select(
    "-password -refreshToken -emailToken"
  ); // ẩn các thông tin nhạy cảm
  return accounts;
};

const updateAccountById = async (id, updateData) => {
  return await Account.findByIdAndUpdate(id, updateData, { new: true });
};

module.exports = {
  register,
  login,
  logout,
  changePassword,
  verifyEmail,
  getAllAccounts,
  updateAccountById,
};
