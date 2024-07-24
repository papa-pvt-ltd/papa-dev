const express = require("express");
const mongoose= require("mongoose");



const wishlistSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }
});


const Wish =mongoose.model('Wishlist', wishlistSchema)
module.exports = Wish