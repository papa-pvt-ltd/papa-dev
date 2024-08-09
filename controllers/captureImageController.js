const express = require('express');
const CapturePersonImage = require('../models/CapturePersonImage');
const Vender = require('../models/Vender');
const multer = require('multer');
const path = require('path');



const addcaptureimage = async (req, res) => {
  try {
      const venderId = req.query.venderId;
      const image = req.file ? req.file.filename : undefined;

      const vender = await Vender.findById(venderId);

      if (!vender) {
          return res.status(404).json({ message: 'Vender not found' });
      }

      const newCaptureImages = new CapturePersonImage({
          image,
          Vender: vender._id,
      });

      const savedImages = await newCaptureImages.save();
      vender.capturePersonImage.push(savedImages);
      await vender.save();

      res.status(200).json({ message: 'Person Image uploaded successfully!' });
  } catch (error) {
      console.error('Error in addCaptureImage controller:', error);
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


module.exports = { addcaptureimage };
