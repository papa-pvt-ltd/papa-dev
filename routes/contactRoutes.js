const express = require('express');
const contactContrller = require('../controllers/contactCController')

const router = express.Router();

router.post('/addContact', contactContrller.AddContact)

module.exports =  router