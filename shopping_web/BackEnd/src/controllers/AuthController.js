const authService = require("../services/AuthService");

const handleRegister = async (req, res) => {
  try {
    const result = await authService.register(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const handleLogin = async (req, res) => {
  try {
    const result = await authService.login(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

// const handleRefresh = async (req, res) => {
//   try {
//     const { refreshToken } = req.body;
//     const result = await authService.refreshAccessToken(refreshToken);
//     res.status(200).json(result);
//   } catch (err) {
//     res.status(403).json({ message: err.message });
//   }
// };

const handleLogout = async (req, res) => {
  try {
    await authService.logout(req.body.userId);
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const handleChangePassword = async (req, res) => {
  try {
    const result = await authService.changePassword(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const handleVerifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    const result = await authService.verifyEmail(token);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAllAccounts = async (req, res) => {
  try {
    const accounts = await authService.getAllAccounts();
    res.status(200).json(accounts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await authService.updateAccountById(id, req.body);
    res.status(200).json(updated);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Cập nhật tài khoản thất bại", error: err });
  }
};

module.exports = {
  handleRegister,
  handleLogin,
  handleLogout,
  handleChangePassword,
  handleVerifyEmail,
  getAllAccounts,
  updateAccount,
};
