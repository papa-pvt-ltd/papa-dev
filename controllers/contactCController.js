const express = require('express')
const ContactUs = require('../models/ContactUs')

const AddContact = async (req,res)=>{
const {name , email, message} =req.body 
try {
    const newConatct = new ContactUs({
        name , 
        email,
        message
    })
    await newConatct.save();
    res.status(200).json({ message: "Thanks for contacting us. We'll get back to you as soon as possible." });
    
} catch (error) {
    console.error(error);
    res.status(500).json({ error: "internal server error" });
}
}

module.exports = {AddContact}