const Order = require('../models/Order');
const Product = require('../models/Product');
const mongoose = require('mongoose');
const moment = require('moment');



const AddOrder = async (req, res) => {
    const { userId, productIds, paymentMode, deliveryExpected,totalAmount } = req.body;
    const orderPlaced = moment().format('YYYY-MM-DD HH:mm:ss');

    // Logging the received productIds
    try {
       


        const order = new Order({
            totalAmount,
            userId,
            productIds,
            paymentMode,
            deliveryExpected,
            orderId: generateOrderId(),
            orderStatus: 'Order Confirmed',
            orderPlaced
        });

        // Save the order to the database
        await order.save();

        res.status(200).json({ message: "Order added successfully" });

    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).json({ error: 'Error placing order' });
    }
};

// Helper function to generate orderId (example implementation)
const generateOrderId = () => {
    const numericId = Math.floor(Math.random() * 1000000000); // Generate a random number up to 999,999,999
    return 'ORD_' + numericId.toString().padStart(9, '0'); // Example: ORD_123456789
};





const getOrder = async (req, res) => {
    const userId = req.query.userId;

    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            console.log('Invalid userId:', userId);
            return res.status(400).json({ error: 'Invalid userId' });
        }

        console.log('Fetching order data for userId:', userId);
        const objectId = new mongoose.Types.ObjectId(userId);

        const orders = await Order.find({ userId: objectId }).populate({
            path: 'productIds.productId',  // Adjust path to match your schema
            model: 'Product'    // Adjust model to match the referenced model
        });

        if (orders.length === 0) {
            return res.status(404).json({ error: 'No orders found' });
        } else {
            res.json(orders);
        }
    } catch (error) {
        console.error('Error fetching order data:', error);
        res.status(500).json({ error: 'Error fetching order data' });
    }
};


const deleteOrder = async (req, res) => {
    const orderId = req.params.orderId;

    try {
        const deletedOrder = await Order.findByIdAndDelete(orderId);

        if (!deletedOrder) {
            console.log('Order not found with orderId:', orderId);
            return res.status(404).json({ error: 'Order not found' });
        }

        res.status(200).json({ message: 'Order deleted successfully', deletedOrder });
    } catch (error) {
        console.error('Error deleting order:', error);
        res.status(500).json({ error: 'Error deleting order' });
    }
};


module.exports = { AddOrder, getOrder,deleteOrder };
