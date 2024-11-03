const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL,
    pass: process.env.GMAIL_PASS,
  },
});

const htmlTemplatePath = path.join(__dirname, "info", "index.html");
const htmlContent = fs.readFileSync(htmlTemplatePath, "utf8");

const recipientListPath = path.join(__dirname, "info", "recipients.txt");
const recipients = fs.readFileSync(recipientListPath, "utf8").split("\n");

for (let r of recipients) {
  try {
    transporter.sendMail(
      {
        from: process.env.EMAIL_USER,
        to: r,
        subject: "Congratulations on Completing the Study Jams!",
        html: htmlContent,
      },
      (error, info) => {
        if (error) {
          console.log("Error occurred:", error);
        } else {
          console.log("Email sent successfully:", info.response);
          console.log("Email sent to: ", r);
        }
      }
    );
  } catch (e) {
    console.log("Error occurred:", e);
    continue;
  }
}
