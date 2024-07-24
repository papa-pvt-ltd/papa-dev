const addressController = require('../controllers/addressController');
const express = require('express');

const router = express.Router();

router.post('/addaddress',addressController.AddAddress);
router.get('/getaddress',addressController.getAddress);
router.delete('/deleteaddress',addressController.deleteAddress);
router.get('/getsingleaddress',addressController.getSingleAddress);
router.put('/editsingleaddress',addressController.editSingleAddress)







module.exports=router