const orderController = require('../controllers/orderController');
const express = require('express');

const router = express.Router();

router.post('/addorder',orderController.AddOrder);
router.get('/getorder',orderController.getOrder);
router.delete('/deleteorder/:orderId',orderController.deleteOrder)
router.get('/getallorder',orderController.getOrderByVender)
router.get('/getallorders',orderController.getAllOrder)


module.exports=router