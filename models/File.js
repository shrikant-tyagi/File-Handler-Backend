const mongoose = require('mongoose');
// require('dotenv').config();
// const nodemailer = require('nodemailer');
const transporter = require('../config/mailSender')

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    tags:{
        type:String
    },
    email:{
        type:String
    },
    fileUrl:{
        type:String,
        required:true
    },
    type:{
        type:String,
        enum:["video","image","reducedImage","localFile"],
        required:true
    },
})


fileSchema.post('save' , async function (doc){

    const response = await transporter.sendMail({
        from:"Shrikant Tyagi",
        to:`${doc.email}`,
        subject:"DOCUMENT",
        html:`<div>
        ${doc}</div>`
    });

    console.log(response);
})

module.exports = mongoose.model('File' , fileSchema);