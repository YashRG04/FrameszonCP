const nodemailer = require("nodemailer");

exports.sendEmail = async(options) => {

    // For this to work allow less secure app access in email

    const transporter = nodemailer.createTransport({
        host: process.env.SMPT_HOST,
        prt: process.env.SMPT_PORT,
        service: process.env.SMPT_SERVICE,
        auth: {
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD
        }
    })

    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    transporter.sendMail(mailOptions)
}