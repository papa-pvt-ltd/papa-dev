const express = require('express');
const Aadhaar = require('../models/Aadhaar');
const Vender = require('../models/Vender');
const multer = require('multer');
const path = require('path');



const AddAadhaar = async (req, res) => {
  try {
      const { name, aadhaarNumber, dob, currentAddress, permanentAddress } = req.body;
      const venderId = req.query.venderId;
      const image = req.file ? req.file.filename : undefined;

      console.log(name) //its showing undefined ?

      if (!name || !aadhaarNumber || !dob || !currentAddress || !permanentAddress) {
          return res.status(400).json({ message: 'Missing required fields' });
      }

      const vender = await Vender.findById(venderId);

      if (!vender) {
          return res.status(404).json({ message: 'Vender not found' });
      }

      const newAadhaar = new Aadhaar({
          name,
          aadhaarNumber,
          dob,
          currentAddress,
          permanentAddress,
          image,
          Vender: vender._id,
      });

      const savedAadhaar = await newAadhaar.save();
      vender.aadhaar.push(savedAadhaar);
      await vender.save();

      res.status(200).json({ message: 'Aadhaar uploaded successfully!' });
  } catch (error) {
      console.error('Error in AddAadhaar controller:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};

// const AddAadhaar = async (req, res) => {
//   console.log('Request body:', req.body);
//   console.log('Uploaded file:', req.file);

//   try {
//       const { name, aadhaarNumber, dob, currentAddress, permanentAddress } = req.body;
//       const venderId = req.query.venderId;
//       const image = req.file ? req.file.filename : undefined;

//       console.log(name); // Check if name is still undefined

//       // Rest of your code...
//   } catch (error) {
//       console.error('Error in AddAadhaar controller:', error);
//       res.status(500).json({ error: 'Internal server error' });
//   }
// };


module.exports = { AddAadhaar };
