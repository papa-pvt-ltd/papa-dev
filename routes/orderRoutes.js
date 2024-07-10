const orderController = require('../controllers/orderController');
const express = require('express');

const router = express.Router();

router.post('/addorder',orderController.AddOrder);
router.get('/getorder',orderController.getOrder);
router.delete('/deleteorder/:orderId',orderController.deleteOrder)


module.exports=router