// netlify/functions/contact.js

require("dotenv").config();

const nodemailer = require("nodemailer");

exports.handler = async (event, context) => {
  try {
    const data = JSON.parse(event.body);

    // Configure your email transport (example using Gmail SMTP)
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // set in Netlify environment variables
        pass: process.env.EMAIL_PASS, // set in Netlify environment variables
      },
    });

    // Send the email
    await transporter.sendMail({
      from: `"Contact Form" <${process.env.EMAIL_USER}>`,
      to: "enyidavid87@gmail.com", // where you want to receive emails
      subject: "New Contact Form Submission",
      text: `Name: ${data.name}\nEmail: ${data.email}\nMessage: ${data.message}`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully!" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
