const nodemailer = require("nodemailer");
const Email = require("../models/email");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (email) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Congratulations on Your Successful Subscription! 🎉",
    html: `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;">
            <h2 style="color: #333333; text-align: center;">Welcome to <strong>JYSTORE</strong>!</h2>
            <p>Congratulations! You have successfully subscribed to receive our special offers and updates.</p>
            <p>With this subscription, you’ll be the first to know about new products, promotional campaigns, and exclusive deals from <strong>JYSTORE</strong>.</p>
            
            <p>We’re excited to have you as part of our customer community and are committed to bringing you the best products and services.</p>
            
            <h3 style="color: #333333;">Thank you for joining us!</h3>
            
            <p>To learn more about our products or promotions, feel free to visit our website:</p>
            <p><a href="#" style="color: #007BFF;">Visit Our Website</a></p>

            <hr style="border: 1px solid #ddd;" />
            <p style="text-align: center; color: #777777; font-size: 0.9em;">If you have any questions, feel free to contact us via email: <a href="mailto:vietanh142004@gmail.com" style="color: #007BFF;">vietanh142004@gmail.com</a></p>
            <p style="text-align: center; color: #777777; font-size: 0.9em;">&copy; 2025 <strong>JYSTORE</strong> - All rights reserved.</p>
          </div>
        </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: "Email sent successfully!" };
  } catch (error) {
    console.error("Error: ", error);
    return { success: false, message: "Email sending failed!" };
  }
};

const subscribeEmail = async (email) => {
  const result = await sendEmail(email);

  if (result.success) {
    const newEmail = new Email({ email });
    await newEmail.save();
  }

  return result;
};

module.exports = { subscribeEmail };
