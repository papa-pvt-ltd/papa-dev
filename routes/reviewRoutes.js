const reviewController = require('../controllers/reviewController');
const express = require('express');

const router = express.Router();

router.post('/addreview',reviewController.AddReview);
router.get('/getreview',reviewController.getReview);


module.exports=router