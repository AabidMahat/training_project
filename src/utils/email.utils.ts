import { createTransport } from "nodemailer";
import { MailOptions } from "nodemailer/lib/json-transport";

import dotev from "dotenv";

dotev.config({
  path: "../config.env",
});

export const sendMail = async (receiverEmail: string, resetLink: string) => {
  try {
    const transporter = createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .email-container {
            background-color: #ffffff;
            margin: 20px auto;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            max-width: 600px;
          }
          .header {
            background-color: #4CAF50;
            padding: 10px;
            text-align: center;
            color: #ffffff;
            border-radius: 8px 8px 0 0;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
          }
          .content {
            padding: 20px;
            line-height: 1.6;
            color: #333333;
          }
          .button-container {
            text-align: center;
            margin-top: 20px;
          }
          .button {
            background-color: #4CAF50;
            color: #ffffff;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
            font-size: 16px;
          }
          .button:hover {
            background-color: #45a049;
          }
          .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 12px;
            color: #888888;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <h1>Collaboration</h1>
          </div>
          <div class="content">
            <p>Hi there,</p>
            <p>We received a request to reset your password. Please use the link below to set a new password. This link is valid for the next 10 minutes.</p>
            <div class="button-container">
              <a href="${resetLink}" class="button">Reset Password</a>
            </div>
            <p>If you did not request a password reset, please ignore this email or contact support if you have concerns.</p>
            <p>Thank you,<br>The Collaboration Team</p>
          </div>
          <div class="footer">
            <p>&copy; 2025 Collaboration. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const mailOptions: MailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: receiverEmail,
      subject: "Forgot Password (Valid for 10 mins)",
      text: "We received a request to reset your password. Please use the link below.",
      html: htmlContent, // Embed the HTML template here
    };

    const mailSend = await transporter.sendMail(mailOptions);

    console.log("Mail sent to ", mailSend.messageId);
  } catch (error) {
    console.log(error);
  }
};
