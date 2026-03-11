import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

export const sendMail = async (to, subject, html) => {
  try {

    const options = {
      from: process.env.MAIL_USER,
      to,
      subject,
      html
    };

    const info = await transporter.sendMail(options);

    return info;

  } catch (error) {
    console.log("Mail error:", error);
  }
};