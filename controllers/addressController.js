const express = require('express');
const Address = require('../models/Address');
const User = require('../models/User')


const AddAddress = async(req,res)=>{

    const {countryCode, firstName, lastName,userId , phone , address1 ,address2,city,zone,pinCode} = req.body

    const user = await User.findById(userId);

   
// console.log(user)
    try {

        if(!user){
            return res.status(404).json({ message: "Vender not found" });
        }

        const newAddress = new Address({
            countryCode,
            firstName,
            lastName,
            phone,
            address1,
            address2,
            city,
            zone,
            pinCode,
            User:user._id
          });


                   const savedAddress= await newAddress.save();
                    user.Address.push(savedAddress);
                    await user.save();
                
          res.status(200).json({ message: "Address added Succefully...!" ,firmId: savedAddress._id});

    } catch (error) {
        console.error(error);
    res.status(500).json({ error: "internal server error" });
    }

};





const getAddress = async (req,res)=>{

    try {
        const address = await Address.find();
        res.status(200).json({ address });
      
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }

}

module.exports={AddAddress,getAddress};
