const multer = require('multer');
const express = require('express');
const aadharController = require('../controllers/aadharController');
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
router.post('/addaadhar', upload.single('image'), aadharController.AddAadhaar);

module.exports = router;
