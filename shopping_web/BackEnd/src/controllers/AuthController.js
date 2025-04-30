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

module.exports = {
  handleRegister,
  handleLogin,
  handleLogout,
  handleChangePassword,
  handleVerifyEmail,
};
