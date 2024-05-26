const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host:process.env.EMAIL_HOST,
    secure:true,
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    }
}
)

module.exports = transporter;