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

const sendEmailActivated = async (email_user, url, username) => {
    const mailOption = {
        from: process.env.EMAIL_NAME,
        to: email_user,
        subject: `Hello ${username} Please Verification for Recipe Food App`,
        text: `Hello ${username}, Please Verification for Recipe Food App. This is your activated link ${url}`,
    };
    return await sendMail(mailOption);
};

module.exports = { sendEmailActivated };
