const multer = require('multer');
const express = require('express');
const panController = require('../controllers/panControlller');
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
router.post('/addpan', upload.single('image'), panController.AddPan);

module.exports = router;
