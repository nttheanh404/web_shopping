const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendVerificationEmail = async (email, token) => {
  const link = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Email Verification",
    html: `<p>Click the link below to verify your email:</p><a href="${link}">${link}</a>`,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendVerificationEmail };
