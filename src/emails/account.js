const nodemailer = require("nodemailer");

const user = process.env.USER_NAME
const pass = process.env.PASSWORD

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user, // generated ethereal user
        pass  // generated ethereal password
    },
    tls: {
        rejectUnauthorized: false,
    }
});

const sendWelcomeMessage =async (email,name) => {
    let info = await transporter.sendMail({
        // from: `"CLUB MARVEL" < ${process.env.USER_NAME} >`, // sender address
        from: `"CLUB MARVEL" <${user}>`, // sender address
        to: email, // list of receivers
        subject: "MARVEL", // Subject line
        text: `welcom ${name} to MARVEL ! Wish you a good exprerience ^.^ `, // plain text body
        // html: "<b>Hello world?</b>", // html body
    });
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

const sendCancelationEmail = async (email,name) => {
    let info = await transporter.sendMail({
        // from: `"CLUB MARVEL" < ${process.env.USER_NAME} >`, // sender address
        from: `"CLUB MARVEL" <${user}>`, // sender address
        to: email, // list of receivers
        subject: "MARVEL", // Subject line
        text: `What is your matter ? ${name} . Hope you come back soon T_T `, // plain text body
        // html: "<b>Hello world?</b>", // html body
    });
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

module.exports = {
    sendWelcomeMessage,
    sendCancelationEmail
}