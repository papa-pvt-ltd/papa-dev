const multer = require('multer');
const express = require('express');
const capturePersonImageController = require('../controllers/captureImageController');
const router = express.Router();
const path = require('path');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

// Use upload.fields() if you have multiple fields and a file
router.post('/addcaptureimage', upload.single('image'), capturePersonImageController.addcaptureimage);

module.exports = router;
