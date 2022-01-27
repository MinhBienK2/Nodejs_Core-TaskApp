const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    service : 'gmail',
    auth: {
        // user : process.env.USER_NAME, // generated ethereal user
        // pass : process.env.PASSWORD // generated ethereal password
        user : 'phamminhbien3333@gmail.com', // generated ethereal user
        pass : 'phamminhbien123' // generated ethereal password
    },
});

const sendWelcomeMessage =async (email,name) => {
    let info = await transporter.sendMail({
        // from: `"CLUB MARVEL" < ${process.env.USER_NAME} >`, // sender address
        from: `"CLUB MARVEL" <phamminhbien3333@gmail.com>`, // sender address
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
        from: `"CLUB MARVEL" <phamminhbien3333@gmail.com>`, // sender address
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