const express = require('express');
const router = express.Router();

const {localFileUpload,imageUpload, videoUpload , reducedImageUpload} = require('../controllers/fileUpload');

router.post('/localFile' , localFileUpload);
router.post('/image',imageUpload);
router.post('/video',videoUpload);
router.post('/reduceImage' , reducedImageUpload);

module.exports = router