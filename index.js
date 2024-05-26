const express = require('express');
const app = express();
require('dotenv').config();
const fileUpload = require('express-fileupload');
const {cloudinaryConnect} = require('./config/cloudinary');
const {dbConnect} = require('./config/database');
const route = require('./routes/FileUpload');

const port = process.env.PORT || 4000;

app.listen(port , () => {
    console.log(`Successfully connected to Port ${port}`)
})

app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
app.use(express.json());

app.use('/api/v1/upload' , route);

dbConnect();
cloudinaryConnect();