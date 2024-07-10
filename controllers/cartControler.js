
const Cart = require('../models/Cart')
const express = require("express");
const Product = require('../models/Product')
const mongoose = require('mongoose');


const addTocart = async (req, res) => {
    const productId = req.params.productId;
    const { userId, productname, price } = req.body;
    try {
        let cartItem = await Cart.findOne({ userId, productId });
        if (cartItem) {
            cartItem.quantity += 1;
        } else {
           
            cartItem = new Cart({ userId, productId, productname, price });
            
        }
       


        await cartItem.save();
        res.send('Product added to cart');
    } catch (error) {
        console.error('Error adding product to cart:', error);
        res.status(500).send('Error adding product to cart');
    }
};

const getCartData = async (req, res) => {
    const userId = req.query.userId; // Get userId from query parameters
    // console.log('Received userId:', userId, 'Type:', typeof userId); // Debugging line

    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: 'Invalid userId' });
        }

        // console.log('Fetching cart data for userId:', userId); // Debugging line
        // Correctly use new mongoose.Types.ObjectId to ensure the userId is in the right format
        const objectId = new mongoose.Types.ObjectId(userId);
        const cartItems = await Cart.find({ userId: objectId }).populate('productId');
        // console.log('Cart items fetched:', cartItems); // Debugging line
        res.json(cartItems); // Ensure this sends a valid JSON response
    } catch (error) {
        console.error('Error fetching cart data:', error);
        res.status(500).json({ error: 'Error fetching cart data' }); // Return error as JSON
    }
};

const decreaseQuantity = async (req, res) => {
    const productId = req.params.id;
    const { userId } = req.body;

    try {
        let cartItem = await Cart.findOne({ userId, productId });

        if (cartItem) {
            if (cartItem.quantity > 1) {
                // If quantity is greater than 1, decrease it by 1
                cartItem.quantity -= 1;
                await cartItem.save();
                res.send('Quantity decreased');
            } else {
                // If quantity is 1, you might want to remove the item from cart
                await Cart.deleteOne({ userId, productId });
                res.send('Item removed from cart');
            }
        } else {
            res.status(404).send('Cart item not found');
        }
    } catch (error) {
        console.error('Error decreasing quantity:', error);
        res.status(500).send('Error decreasing quantity');
    }
};

const clearCart = async (req, res) => {
    const userId = req.query.userId; // Get userId from query parameters

    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: 'Invalid userId' });
        }

        // Delete all cart items for the specified userId
        const result = await Cart.deleteMany({ userId: userId });

        if (result.deletedCount > 0) {
            res.send('Cart cleared successfully');
        } else {
            res.send('Cart is already empty');
        }
    } catch (error) {
        console.error('Error clearing cart:', error);
        res.status(500).json({ error: 'Error clearing cart' });
    }
};



module.exports = { addTocart, getCartData,decreaseQuantity,clearCart};
