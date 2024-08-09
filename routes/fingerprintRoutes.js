const express = require('express');
const router = express.Router();
const userFingerprintController = require('../controllers/fingerprintController');

// POST /fingerprint/Register
router.post('/Register', userFingerprintController.userFingerPrint);

module.exports = router;
