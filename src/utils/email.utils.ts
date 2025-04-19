import { createTransport } from "nodemailer";
import { MailOptions } from "nodemailer/lib/json-transport";

export const sendMail = async (receiverEmail: string, resetLink: string) => {
  try {
    const transporter = createTransport({
      service: "gmail",
      auth: {
        user: "aabidmahat95@gmail.com",
        pass: "kwrj mpfb ighp cbaz",
      },
    });

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Poppins', Arial, sans-serif;
            background-color: #f5f7fa;
            color: #333;
            line-height: 1.6;
          }
          
          .email-wrapper {
            background-color: #f5f7fa;
            padding: 30px 15px;
            min-height: 100vh;
          }
          
          .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          }
          
          .email-header {
            background: linear-gradient(135deg, #3949ab 0%, #1e88e5 100%);
            color: white;
            padding: 30px 40px;
            text-align: center;
          }
          
          .logo {
            font-size: 28px;
            font-weight: 700;
            letter-spacing: 1px;
            margin-bottom: 10px;
          }
          
          .email-header p {
            font-size: 16px;
            opacity: 0.95;
          }
          
          .email-body {
            padding: 40px;
          }
          
          .greeting {
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 15px;
            color: #333;
          }
          
          .message {
            font-size: 15px;
            color: #555;
            margin-bottom: 30px;
          }
          
          .button-container {
            text-align: center;
            margin: 35px 0;
          }
          
          .reset-button {
            display: inline-block;
            background: linear-gradient(135deg, #3949ab 0%, #1e88e5 100%);
            color: white;
            text-decoration: none;
            padding: 14px 40px;
            border-radius: 50px;
            font-size: 16px;
            font-weight: 500;
            box-shadow: 0 4px 12px rgba(30, 136, 229, 0.3);
            transition: transform 0.3s, box-shadow 0.3s;
          }
          
          .reset-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(30, 136, 229, 0.4);
          }
          
          .expiry-notice {
            text-align: center;
            font-size: 13px;
            color: #888;
            margin-bottom: 30px;
          }
          
          .alternative {
            margin-top: 25px;
            font-size: 14px;
            color: #666;
          }
          
          .reset-link {
            word-break: break-all;
            color: #1e88e5;
            font-size: 13px;
            margin-top: 10px;
          }
          
          .divider {
            height: 1px;
            background-color: #eeeeee;
            margin: 30px 0;
          }
          
          .security-notice {
            background-color: #f8f9fa;
            border-left: 4px solid #ffca28;
            padding: 15px;
            font-size: 14px;
            color: #666;
            margin-bottom: 25px;
            border-radius: 0 4px 4px 0;
          }
          
          .security-notice strong {
            color: #555;
            display: block;
            margin-bottom: 5px;
          }
          
          .email-footer {
            background-color: #f5f7fa;
            padding: 20px 40px;
            text-align: center;
          }
          
          .company-info {
            font-size: 14px;
            color: #888;
            margin-bottom: 10px;
          }
          
          .footer-links {
            margin-top: 15px;
          }
          
          .footer-link {
            color: #1e88e5;
            text-decoration: none;
            font-size: 13px;
            margin: 0 10px;
          }
          
          .copyright {
            margin-top: 20px;
            font-size: 12px;
            color: #aaa;
          }
          
          @media only screen and (max-width: 600px) {
            .email-header, .email-body, .email-footer {
              padding: 20px;
            }
            
            .greeting {
              font-size: 18px;
            }
            
            .reset-button {
              padding: 12px 30px;
              font-size: 15px;
            }
          }
        </style>
      </head>
      <body>
        <div class="email-wrapper">
          <div class="email-container">
            <div class="email-header">
              <div class="logo">Collaboration</div>
              <p>Password Reset Request</p>
            </div>
            
            <div class="email-body">
              <div class="greeting">Hello there,</div>
              
              <p class="message">We received a request to reset your password for your Collaboration account. To create a new password, click the button below.</p>
              
              <div class="button-container">
                <a href="${resetLink}" class="reset-button">Reset My Password</a>
              </div>
              
              <p class="expiry-notice">This link is valid for the next 10 minutes only.</p>
              
              <div class="security-notice">
                <strong>Security tip:</strong>
                For your protection, if you did not request a new password or believe you received this email in error, please disregard this message or contact our support team immediately.
              </div>
              
              <p class="alternative">If you're having trouble with the button above, copy and paste the URL below into your web browser:</p>
              <p class="reset-link">http://localhost:4200/reset-password/${resetLink}</p>
              
              <div class="divider"></div>
              
              <p style="font-size: 15px; color: #555;">Thank you,<br><strong>The Collaboration Team</strong></p>
            </div>
            
            <div class="email-footer">
              <p class="company-info">Collaboration Inc. • Making teamwork seamless</p>
              <div class="footer-links">
                <a href="#" class="footer-link">Help Center</a>
                <a href="#" class="footer-link">Privacy Policy</a>
                <a href="#" class="footer-link">Terms of Service</a>
              </div>
              <p class="copyright">&copy; 2025 Collaboration. All rights reserved.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    const mailOptions: MailOptions = {
      from: "aabidmahat95@gmail.com",
      to: receiverEmail,
      subject: "Reset Your Collaboration Password",
      text:
        "We received a request to reset your password. This link is valid for 10 minutes: " +
        resetLink,
      html: htmlContent,
    };

    const mailSend = await transporter.sendMail(mailOptions);
    console.log(`http://localhost:4200/reset-password/${resetLink}`);

    console.log("Password reset email sent successfully:", mailSend.messageId);
  } catch (error) {
    console.error("Failed to send password reset email:", error);
  }
};

export const sendVerifyAccountMail = async (
  receiverEmail: string,
  otp: string
) => {
  try {
    const transporter = createTransport({
      service: "gmail",
      auth: {
        user: "aabidmahat95@gmail.com",
        pass: "kwrj mpfb ighp cbaz",
      },
    });

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Account Verification</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Poppins', Arial, sans-serif;
            background-color: #f5f7fa;
            color: #333;
            line-height: 1.6;
          }
          
          .email-wrapper {
            background-color: #f5f7fa;
            padding: 30px 15px;
          }
          
          .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          }
          
          .email-header {
            background: linear-gradient(135deg, #3949ab 0%, #1e88e5 100%);
            color: white;
            padding: 30px 40px;
            text-align: center;
          }
          
          .logo {
            font-size: 28px;
            font-weight: 700;
            letter-spacing: 1px;
            margin-bottom: 10px;
          }
          
          .email-header p {
            font-size: 16px;
            opacity: 0.95;
          }
          
          .email-body {
            padding: 40px;
          }
          
          .greeting {
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 15px;
            color: #333;
          }
          
          .message {
            font-size: 15px;
            color: #555;
            margin-bottom: 30px;
          }
          
          .otp-container {
            text-align: center;
            margin: 35px 0;
          }
          
          .otp-code {
            letter-spacing: 10px;
            font-size: 32px;
            font-weight: 700;
            color: #333;
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            border: 1px dashed #ddd;
            display: inline-block;
            min-width: 240px;
            text-align: center;
          }
          
          .expiry-notice {
            text-align: center;
            font-size: 14px;
            color: #888;
            margin: 25px 0;
          }
          
          .divider {
            height: 1px;
            background-color: #eeeeee;
            margin: 30px 0;
          }
          
          .security-notice {
            background-color: #f8f9fa;
            border-left: 4px solid #ffca28;
            padding: 15px;
            font-size: 14px;
            color: #666;
            margin-bottom: 25px;
            border-radius: 0 4px 4px 0;
          }
          
          .security-notice strong {
            color: #555;
            display: block;
            margin-bottom: 5px;
          }
          
          .email-footer {
            background-color: #f5f7fa;
            padding: 20px 40px;
            text-align: center;
          }
          
          .company-info {
            font-size: 14px;
            color: #888;
            margin-bottom: 10px;
          }
          
          .footer-links {
            margin-top: 15px;
          }
          
          .footer-link {
            color: #1e88e5;
            text-decoration: none;
            font-size: 13px;
            margin: 0 10px;
          }
          
          .copyright {
            margin-top: 20px;
            font-size: 12px;
            color: #aaa;
          }
          
          @media only screen and (max-width: 600px) {
            .email-header, .email-body, .email-footer {
              padding: 20px;
            }
            
            .greeting {
              font-size: 18px;
            }
            
            .otp-code {
              font-size: 24px;
              letter-spacing: 8px;
              padding: 15px;
              min-width: 200px;
            }
          }
        </style>
      </head>
      <body>
        <div class="email-wrapper">
          <div class="email-container">
            <div class="email-header">
              <div class="logo">Collaboration</div>
              <p>Account Verification</p>
            </div>
            
            <div class="email-body">
              <div class="greeting">Hello,</div>
              
              <p class="message">Thank you for signing up! To complete your registration and verify your account, please use the following verification code:</p>
             
              <div class="otp-container">
                <div class="otp-code">${otp}</div>
              </div>
              
              <p class="expiry-notice">This verification code will expire in 10 minutes.</p>
              
              <div class="security-notice">
                <strong>Security note:</strong>
                If you didn't request this verification code, please ignore this email or contact our support team immediately. Someone may have entered your email address by mistake.
              </div>
              
              <div class="divider"></div>
              
              <p style="font-size: 15px; color: #555;">Thank you,<br><strong>The Collaboration Team</strong></p>
            </div>
            
            <div class="email-footer">
              <p class="company-info">Collaboration Inc. • Making teamwork seamless</p>
              <div class="footer-links">
                <a href="#" class="footer-link">Help Center</a>
                <a href="#" class="footer-link">Privacy Policy</a>
                <a href="#" class="footer-link">Terms of Service</a>
              </div>
              <p class="copyright">&copy; 2025 Collaboration. All rights reserved.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: "aabidmahat95@gmail.com",
      to: receiverEmail,
      subject: "Verification Code for Your Collaboration Account",
      text: `Your verification code is: ${otp}. This code will expire in 10 minutes.`,
      html: htmlContent,
    };

    const mailSend = await transporter.sendMail(mailOptions);

    console.log(
      "OTP verification email sent successfully:",
      mailSend.messageId
    );
  } catch (error) {
    console.error("Failed to send OTP verification email:", error);
  }
};

export const sendWorkspaceNotification = async (
  ownerEmail: string,
  newMemberName: string,
  workspaceName: string,
  memberRole: string
) => {
  try {
    const transporter = createTransport({
      service: "gmail",
      auth: {
        user: "aabidmahat95@gmail.com",
        pass: "kwrj mpfb ighp cbaz",
      },
    });

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Workspace Member</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Poppins', Arial, sans-serif;
            background-color: #f5f7fa;
            color: #333;
            line-height: 1.6;
          }
          
          .email-wrapper {
            background-color: #f5f7fa;
            padding: 30px 15px;
            min-height: 100vh;
          }
          
          .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
          }
          
          .email-header {
            background: linear-gradient(135deg, #3949ab 0%, #1e88e5 100%);
            color: white;
            padding: 30px 40px;
            text-align: center;
          }
          
          .logo {
            font-size: 28px;
            font-weight: 700;
            letter-spacing: 1px;
            margin-bottom: 10px;
          }
          
          .email-header p {
            font-size: 16px;
            opacity: 0.95;
          }
          
          .email-body {
            padding: 40px;
          }
          
          .greeting {
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 15px;
            color: #333;
          }
          
          .message {
            font-size: 15px;
            color: #555;
            margin-bottom: 20px;
          }
          
          .member-info {
            background-color: #f8f9fa;
            border-left: 4px solid #1e88e5;
            padding: 15px;
            margin: 25px 0;
            border-radius: 0 4px 4px 0;
          }
          
          .member-detail {
            font-size: 15px;
            color: #555;
            margin: 5px 0;
          }
          
          .highlight {
            color: #1e88e5;
            font-weight: 500;
          }
          
          .button-container {
            text-align: center;
            margin: 35px 0;
          }
          
          .view-button {
            display: inline-block;
            background: linear-gradient(135deg, #3949ab 0%, #1e88e5 100%);
            color: white;
            text-decoration: none;
            padding: 14px 40px;
            border-radius: 50px;
            font-size: 16px;
            font-weight: 500;
            box-shadow: 0 4px 12px rgba(30, 136, 229, 0.3);
            transition: transform 0.3s, box-shadow 0.3s;
          }
          
          .view-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(30, 136, 229, 0.4);
          }
          
          .divider {
            height: 1px;
            background-color: #eeeeee;
            margin: 30px 0;
          }
          
          .email-footer {
            background-color: #f5f7fa;
            padding: 20px 40px;
            text-align: center;
          }
          
          .company-info {
            font-size: 14px;
            color: #888;
            margin-bottom: 10px;
          }
          
          .footer-links {
            margin-top: 15px;
          }
          
          .footer-link {
            color: #1e88e5;
            text-decoration: none;
            font-size: 13px;
            margin: 0 10px;
          }
          
          .copyright {
            margin-top: 20px;
            font-size: 12px;
            color: #aaa;
          }
          
          @media only screen and (max-width: 600px) {
            .email-header, .email-body, .email-footer {
              padding: 20px;
            }
            
            .greeting {
              font-size: 18px;
            }
            
            .view-button {
              padding: 12px 30px;
              font-size: 15px;
            }
          }
        </style>
      </head>
      <body>
        <div class="email-wrapper">
          <div class="email-container">
            <div class="email-header">
              <div class="logo">Collaboration</div>
              <p>New Workspace Member</p>
            </div>
            
            <div class="email-body">
              <div class="greeting">Hello,</div>
              
              <p class="message">A new member has joined your workspace.</p>
              
              <div class="member-info">
                <p class="member-detail"><strong>Member:</strong> <span class="highlight">${newMemberName}</span></p>
                <p class="member-detail"><strong>Workspace:</strong> <span class="highlight">${workspaceName}</span></p>
                <p class="member-detail"><strong>Role:</strong> <span class="highlight">${memberRole}</span></p>
                <p class="member-detail"><strong>Joined:</strong> <span class="highlight">${new Date().toLocaleDateString()}</span></p>
              </div>
              
              <p class="message">You can manage workspace members and their permissions from your workspace settings.</p>
              
              
              
              <div class="divider"></div>
              
              <p style="font-size: 15px; color: #555;">Thank you,<br><strong>The Collaboration Team</strong></p>
            </div>
            
            <div class="email-footer">
              <p class="company-info">Collaboration Inc. • Making teamwork seamless</p>
              <div class="footer-links">
                <a href="#" class="footer-link">Help Center</a>
                <a href="#" class="footer-link">Privacy Policy</a>
                <a href="#" class="footer-link">Terms of Service</a>
              </div>
              <p class="copyright">&copy; 2025 Collaboration. All rights reserved.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: "aabidmahat95@gmail.com",
      to: ownerEmail,
      subject: `New Member Added to ${workspaceName}`,
      text: `${newMemberName} has joined your workspace "${workspaceName}" as a ${memberRole}.`,
      html: htmlContent,
    };

    const mailSend = await transporter.sendMail(mailOptions);
    console.log(
      "Workspace notification email sent successfully:",
      mailSend.messageId
    );
    return true;
  } catch (error) {
    console.error("Failed to send workspace notification email:", error);
    return false;
  }
};
