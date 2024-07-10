const addressController = require('../controllers/addressController');
const express = require('express');

const router = express.Router();

router.post('/addaddress',addressController.AddAddress);
router.get('/getaddress',addressController.getAddress);


module.exports=router