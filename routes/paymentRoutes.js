const express = require('express');
const { checkout, paymentVerification } = require('../controllers/paymentController');
const dotenv = require('dotenv');

dotenv.config();

const router = express.Router();

// Define routes
router.post('/checkout', checkout);
router.post('/paymentverification', paymentVerification);

router.get('/getkey', (req, res) => {
  res.status(200).json({ key: process.env.Key_Id });
});

module.exports = router;
