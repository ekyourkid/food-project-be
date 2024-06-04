const nodemailer = require("nodemailer");
require("dotenv").config();

let transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    secure: true,
    port: 456,
    auth: {
        user: process.env.EMAIL_NAME,
        pass: process.env.EMAIL_PASS,
    },
});

async function sendMail(mailOption) {
    try {
        const data = await transporter.sendMail(mailOption);
        console.log("email send : ", data, response ?? data);
        return data.response;
    } catch (err) {
        console.log("email error : ", err.message ?? err);
        return false;
    }
}

const sendEmailOTP = async (email, otp, name) => {
    const mailOption = {
        from: process.env.EMAIL_NAME,
        to: email,
        subject: `OTP Pijar Food`,
        text: `Hello ${name}, please use this OTP for reset your password:  ${otp}`,
    };
    return await sendMail(mailOption);
};

const sendEmailActivated = async (email, url, username) => {
    const mailOption = {
        from: process.env.EMAIL_NAME,
        to: email,
        subject: `Hello ${username} Please Verification for Recipe Food App`,
        text: `Hello ${username}, Please Verification for Recipe Food App. This is your activated link ${url}`,
    };
    return await sendMail(mailOption);
};

module.exports = { sendEmailActivated, sendEmailOTP };
