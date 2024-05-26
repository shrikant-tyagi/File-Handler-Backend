const File = require('../models/File');
const cloudinary = require('cloudinary').v2;

async function uploadToCloudinary(file,folder,quality){
    const options = {folder};
    options.resource_type = "auto";

    if(quality){
        options.quality = quality;
    }

    return await cloudinary.uploader.upload(file.tempFilePath , options);
}

exports.localFileUpload = async(req,res) => {
    try {

        const file = req.files.file;
        console.log(file);

        const path = __dirname + '/files/' + Date.now() + `.${file.name.split('.').at(-1)}`;

        file.mv(path , (err) => {
            console.error(err);
        })

        const newFile = await File.create({
            name : "Local File",fileUrl:path , type:"localFile"
        });

        res.json({
            success:true,
            newFile,
            message:"File uploaded successfully"
        })
        
    } catch (error) {
        console.log("Unable to upload");
        console.log(error);
    }
}

exports.imageUpload = async(req,res) => {
    try {
        const {name , tags , email} = req.body;
        const file = req.files.imageFile;

        console.log(file);

        //validation
        const validFormat = ['jpg','jpeg','png'];
        const type = file.name.split('.').at(-1);
        

        if(!validFormat.includes(type)){
            return res.json({
                success:false,
                message:"Image is not of valid format"
            })
        }
       
        const response = await uploadToCloudinary(file , "Files");
        console.log(response);

        await File.create({
            name , tags , email , fileUrl:response.secure_url , type:'image'
        })

        return res.json({
            success:true,
            message:"Uploaded successfully",
            response
        })


    } catch (error) {
        console.error(error);
        console.log(error);
    }
}

exports.reducedImageUpload = async(req,res) => {
    try {
        const {name , tags , email} = req.body;
        const file = req.files.imageFile;

        console.log(file);

        //validation
        const validFormat = ['jpg','jpeg','png'];
        const type = file.name.split('.').at(-1);

        

        if(!validFormat.includes(type)){
            return res.json({
                success:false,
                message:"Image is not of valid format"
            })
        }
       
        const response = await uploadToCloudinary(file , "Files" , 20);
        console.log(response);

        await File.create({
            name , tags , email , fileUrl:response.secure_url
        })

        return res.json({
            success:true,
            message:"Uploaded successfully",
            response
        })


    } catch (error) {
        console.error(error);
        console.log(error);
    }
}

exports.videoUpload = async(req,res) => {
    try {
        const {name , tags , email} = req.body;
        const file = req.files.videoFile;

        console.log(file);

        //validation
        const validFormat = ['mp4','mov'];
        const type = file.name.split('.').at(-1);


        if(!validFormat.includes(type)){
            return res.json({
                success:false,
                message:"Video is not of valid format"
            })
        }
       
        try {
            const response = await uploadToCloudinary(file , "Files");
            console.log(response);
        } catch (error) {
            return res.json({
                success:false,
                message:error
            })
        }

        await File.create({
            name , tags , email , fileUrl:response.secure_url
        })

        res.json({
            success:true,
            message:"Uploaded successfully",
            response
        })


    } catch (error) {
        console.error(error);
        console.log(error);
        res.json({
            success:false,
            message:"something went wrong"
        })
    }
}