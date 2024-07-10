
const Razorpay =require('razorpay')
const dotenv = require('dotenv');


dotenv.config();

 const instance = new Razorpay({
    key_id: process.env.Key_Id,
    key_secret: process.env.Key_Secret,
  });

  module.exports = instance;
