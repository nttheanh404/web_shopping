const { subscribeEmail } = require("../services/EmailService");

const subscribeNewsletter = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Invalid email!" });
  }

  try {
    const result = await subscribeEmail(email);

    if (result.success) {
      return res.status(200).json({ message: result.message });
    } else {
      return res.status(500).json({ message: result.message });
    }
  } catch (error) {
    console.error("Error: ", error);
    return res
      .status(500)
      .json({ message: "An error occurred, please try again!" });
  }
};

module.exports = { subscribeNewsletter };
