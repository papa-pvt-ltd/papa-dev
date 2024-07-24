const WishList = require('../models/Wishlist')
const express = require("express");
const Product = require('../models/Product')
const mongoose = require('mongoose');


const addToWishlist = async (req, res) => {
    const productId = req.params.productId;
    const { userId } = req.body;

    if (!userId || !productId) {
        return res.status(400).json({ error: 'User ID and Product ID are required' });
    }

    try {
        // Check if the item already exists in the wishlist
        let wishItem = await WishList.findOne({ userId, productId });

        if (wishItem) {
            return res.status(409).json({ warning: 'Product is already in wishlist' });
        }

        // Create a new wishlist item
        wishItem = new WishList({ userId, productId });

        await wishItem.save();
        return res.status(201).json({ message: 'Product added to wishlist' });
    } catch (error) {
        console.error('Error adding product to wishlist:', error);
        return res.status(500).json({ error: 'Error adding product to wishlist' });
    }
};


const getWishList = async (req, res) => {
    const userId = req.query.userId; // Get userId from query parameters
    // console.log('Received userId:', userId, 'Type:', typeof userId); // Debugging line

    try {
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: 'Invalid userId' });
        }

        // console.log('Fetching cart data for userId:', userId); // Debugging line
        // Correctly use new mongoose.Types.ObjectId to ensure the userId is in the right format
        const objectId = new mongoose.Types.ObjectId(userId);
        const WishItams = await WishList.find({ userId: objectId }).populate('productId');
        // console.log('Cart items fetched:', cartItems); // Debugging line
        res.json(WishItams); // Ensure this sends a valid JSON response
    } catch (error) {
        console.error('Error fetching wishlist data:', error);
        res.status(500).json({ error: 'Error fetching wishlist data' }); // Return error as JSON
    }
};

module.exports = { addToWishlist , getWishList};
