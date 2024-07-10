const express = require('express');
const Review = require('../models/Review');


const AddReview = async(req,res)=>{

    const {fullName, email, stars , reviewTitle , review ,recommended} = req.body
    try {
        const newReview = new Review({
            fullName,
            email,
            stars,
            reviewTitle,
            review,
            recommended,
          });
                    await newReview.save();
          res.status(200).json({ message: "review added Succefully...!" });

    } catch (error) {
        console.error(error);
    res.status(500).json({ error: "internal server error" });
    }

};





const getReview = async (req,res)=>{

    try {
        const review = await Review.find();
        res.status(200).json({ review });
      
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }

}

module.exports={AddReview,getReview};
